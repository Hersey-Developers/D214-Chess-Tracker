const User = require('../models/user');
const express = require('express');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();


// Test user objects

// Coach User:
    // ID: 6407fed2f0dc8c869555af28
    // Email: test@test.com
    // Password: 12345
// Admin User:
    // ID: 6407ff41f0dc8c869555af2a
    // Email: test2@test.com
    // Password: 123456

// ========================================

// Create a new user account
router.post("/signup", async (req, res) => {
    const { email, password, accessLevel } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        email,
        passwordHash: hashedPassword,
        accessLevel: accessLevel
    })

    try {
        await user.save();
    } catch (error) {
        console.log("Error creating user: ", error)
        return res.status(500).send({
            message: "Error creating user"
        })
    }

    res.status(201).send({
        message: "User created"
    })
});

// Log in the user
router.post("/login", async (req, res) => {
    // --- YOUR CODE GOES UNDER THIS LINE --- 

    // --------- DELETE THIS CONTENT --------
    res.send({
        message: "Hello World"
    })
    // -------------------------------------
});

// Log out the user
router.post("/logout", async (req, res) => {
    // --- YOUR CODE GOES UNDER THIS LINE --- 

    // --------- DELETE THIS CONTENT --------
    res.send({
        message: "Hello World"
    })
    // -------------------------------------
});

module.exports = router;