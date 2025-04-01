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
    await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    fetchUsers();
}

async function deleteUser(id) {
    await fetch(`/users/${id}`, { method: 'DELETE' });
    fetchUsers();
}

fetchUsers();
