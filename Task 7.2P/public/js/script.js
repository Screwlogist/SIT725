// Initialize Socket.io connection
const socket = io();

// Handle socket connection events
socket.on('connect', () => {
    console.log('Connected to server with ID:', socket.id);
});

// Handle real-time user activity updates
socket.on('userActivity', (data) => {
    console.log('User activity:', data);
    addActivityNotification(data);

    // Refresh the user list when users are registered or deleted
    if (data.action === 'registered' || data.action === 'deleted') {
        console.log('Refreshing user list due to:', data.action);
        fetchUsers();
    }
});

// Add notification to the activity list
function addActivityNotification(data) {
    const activityList = document.getElementById('activityList');
    const li = document.createElement('li');
    let message = '';
    let notificationClass = '';

    switch(data.action) {
        case 'registered':
            message = `User "${data.username}" was registered`;
            notificationClass = 'notification-register';
            break;
        case 'deleted':
            message = `A user was deleted`;
            notificationClass = 'notification-delete';
            break;
        case 'connected':
            message = `New user connected`;
            notificationClass = 'notification-connect';
            break;
        case 'disconnected':
            message = `User disconnected`;
            notificationClass = 'notification-disconnect';
            break;
    }

    li.textContent = message;
    li.className = notificationClass;

    // Timestamp
    const timestamp = document.createElement('span');
    timestamp.textContent = new Date().toLocaleTimeString();
    timestamp.style.fontSize = '0.8em';
    timestamp.style.color = '#666';
    timestamp.style.marginLeft = '10px';
    li.appendChild(timestamp);

    // Add to top of list
    activityList.prepend(li);

    // Limit list to 10 items
    if (activityList.children.length > 10) {
        activityList.removeChild(activityList.lastChild);
    }
}

// Client-side script - Acts as the view's controller
async function fetchUsers() {
    const response = await fetch('/users');
    const users = await response.json();
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.username;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteUser(user._id);
        li.appendChild(deleteBtn);
        userList.appendChild(li);
    });
}

async function addUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Debug - check values
    console.log("Attempting to add user:", { username, password });

    // Make sure both fields have values
    if (!username || !password) {
        alert("Both username and password are required");
        return;
    }

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        // Check if response is ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to register user');
        }

        const userData = await response.json();
        console.log("User registered successfully:", userData);

        // Emit socket event for user registration
        socket.emit('userRegistered', {
            username: userData.username,
            id: userData._id
        });
        console.log("Emitted userRegistered event:", { username: userData.username, id: userData._id });

        // Clear inputs after success
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        // Update local list first, don't wait for the socket event
        await fetchUsers();
    } catch (error) {
        console.error("Error adding user:", error);
        alert(error.message);
    }
}

async function deleteUser(id) {
    try {
        const response = await fetch(`/users/${id}`, { method: 'DELETE' });
        if (response.ok) {
            // Emit socket event for user deletion
            socket.emit('userDeleted', id);
            fetchUsers();
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
    }
}

// Load users when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);