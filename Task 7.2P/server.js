const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server for Socket.io
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/', userRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/usermanagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Emit event when a user connects
    io.emit('userActivity', { action: 'connected', socketId: socket.id });

    // Listen for user registration
    socket.on('userRegistered', (userData) => {
        console.log('User registered:', userData.username);
        // Broadcast to all clients except sender
        socket.broadcast.emit('userActivity', {
            action: 'registered',
            username: userData.username
        });
    });

    // Listen for user deletion
    socket.on('userDeleted', (userId) => {
        console.log('User deleted, ID:', userId);
        // Broadcast to all clients
        io.emit('userActivity', {
            action: 'deleted',
            userId: userId
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        io.emit('userActivity', { action: 'disconnected', socketId: socket.id });
    });
});

// Start the server
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});