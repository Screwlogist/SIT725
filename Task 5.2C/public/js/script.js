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

        // Clear inputs after success
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        fetchUsers();
    } catch (error) {
        console.error("Error adding user:", error);
        alert(error.message);
    }
}

async function deleteUser(id) {
    await fetch(`/users/${id}`, { method: 'DELETE' });
    fetchUsers();
}

// Load users when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);