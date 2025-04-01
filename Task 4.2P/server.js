const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

// Connect to database
connectDB();

// Initialize express
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Manual CORS headers (replacing cors package)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/tasks', require('./routes/tasks'));

// Serve the main HTML file for all other routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Port config (hardcoded without dotenv)
const PORT = 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});