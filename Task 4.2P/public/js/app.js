const API_URL = '/api/tasks';

// DOM Elements
const addTaskForm = document.getElementById('add-task-form');
const editForm = document.getElementById('edit-form');
const tasksList = document.getElementById('tasks-list');
const messageDiv = document.getElementById('message');

// Show Message Function
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

// Fetch and Display Tasks
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();

        tasksList.innerHTML = '';

        if (tasks.length === 0) {
            tasksList.innerHTML = '<p>No tasks found. Add a task to get started!</p>';
            return;
        }

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';

            li.innerHTML = `
                <h3>${task.title}</h3>
                <div class="task-description">${task.description || 'No description'}</div>
                <div>Created: ${new Date(task.createdAt).toLocaleString()}</div>
                <button class="complete-btn">${task.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;

            // Complete Button
            li.querySelector('.complete-btn').addEventListener('click', () => {
                toggleTaskCompletion(task._id, !task.completed);
            });

            // Edit Button
            li.querySelector('.edit-btn').addEventListener('click', () => {
                document.getElementById('edit-id').value = task._id;
                document.getElementById('edit-title').value = task.title;
                document.getElementById('edit-description').value = task.description || '';
                document.getElementById('edit-completed').checked = task.completed;

                // Show edit form, hide add form
                editForm.style.display = 'block';
                addTaskForm.style.display = 'none';
            });

            // Delete Button
            li.querySelector('.delete-btn').addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this task?')) {
                    deleteTask(task._id);
                }
            });

            tasksList.appendChild(li);
        });

    } catch (error) {
        showMessage(`Error: ${error.message}`, 'error');
    }
}

// Add New Task
async function addTask(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description
            })
        });

        if (!response.ok) {
            throw new Error('Failed to add task');
        }

        document.getElementById('title').value = '';
        document.getElementById('description').value = '';

        showMessage('Task added successfully!', 'success');
        fetchTasks();

    } catch (error) {
        showMessage(`Error: ${error.message}`, 'error');
    }
}

// Update Task
async function updateTask(event) {
    event.preventDefault();

    const id = document.getElementById('edit-id').value;
    const title = document.getElementById('edit-title').value;
    const description = document.getElementById('edit-description').value;
    const completed = document.getElementById('edit-completed').checked;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                completed
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update task');
        }

        showMessage('Task updated successfully!', 'success');

        // Reset and hide edit form
        editForm.style.display = 'none';
        addTaskForm.style.display = 'block';

        fetchTasks();

    } catch (error) {
        showMessage(`Error: ${error.message}`, 'error');
    }
}

// Toggle Task Completion
async function toggleTaskCompletion(id, completed) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        });

        if (!response.ok) {
            throw new Error('Failed to update task');
        }

        showMessage('Task updated successfully!', 'success');
        fetchTasks();

    } catch (error) {
        showMessage(`Error: ${error.message}`, 'error');
    }
}

// Delete Task
async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }

        showMessage('Task deleted successfully!', 'success');
        fetchTasks();

    } catch (error) {
        showMessage(`Error: ${error.message}`, 'error');
    }
}

// Event Listeners
addTaskForm.addEventListener('submit', addTask);
editForm.addEventListener('submit', updateTask);
document.getElementById('cancel-edit').addEventListener('click', () => {
    editForm.style.display = 'none';
    addTaskForm.style.display = 'block';
});

// Fetch tasks when page loads
document.addEventListener('DOMContentLoaded', fetchTasks);