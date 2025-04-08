const User = require("../models/User");

// Controller - Handles business logic
const userController = {
    // Register a new user
    register: async (req, res) => {
        try {
            const { username, password } = req.body;
            const newUser = new User({ username, password });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Get all users
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Delete a user
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.json({ message: "User deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Serve the main HTML page
    serveHomePage: (req, res) => {
        res.sendFile('index.html', { root: './views' });
    }
};

module.exports = userController;