const mongoose = require("mongoose");

// Model - Handles data structure and business rules
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);