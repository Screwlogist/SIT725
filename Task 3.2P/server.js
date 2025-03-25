// Import express
const express = require('express');
const path = require('path');

// Create express app
const app = express();
const port = 3000;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Simple endpoint to add two numbers using query parameters
// Example: GET /add?num1=5&num2=10
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    // Calculate sum
    const sum = num1 + num2;

    // Return result
    res.json({
        result: sum
    });
});

// Simple endpoint to subtract two numbers using query parameters
// Example: GET /subtract?num1=15&num2=5
app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    // Calculate difference
    const difference = num1 - num2;

    // Return result
    res.json({
        result: difference
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Try these URLs:`);
    console.log(`- Addition: http://localhost:${port}/add?num1=5&num2=10`);
    console.log(`- Subtraction: http://localhost:${port}/subtract?num1=15&num2=5`);
});