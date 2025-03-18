// Import express
const express = require('express');
const path = require('path');

// Create express app
const app = express();
const port = 3000;

// Serve static files from 'public' folder
app.use(express.static('public'));

// Simple API endpoint
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});