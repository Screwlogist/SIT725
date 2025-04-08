const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Routes - Connect URLs to controller methods
// Main page
router.get("/", userController.serveHomePage);

// API routes
router.post("/register", userController.register);
router.get("/users", userController.getUsers);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;