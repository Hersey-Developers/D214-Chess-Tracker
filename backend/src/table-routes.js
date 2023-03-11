const Table = require('../models/table');

const express = require('express');
const router = express.Router();

// Tables Test Objects in MongoDB

// 6408007f019b5db9eae79afd
    // tableNum: 4
    // contestant1: "2349j230r9j230r"
    // contestant2: "92f3j2039fj0293fj23f"
    // userWhoWon: 0

// Get all Table objects

router.get('/', async (req, res) => {
    // --- YOUR CODE GOES UNDER THIS LINE --- 

    // --------- DELETE THIS CONTENT --------
    res.send({
        message: "Hello World"
    })
    // -------------------------------------
});

// Get a specific Table object
router.get('/:tableId', async (req, res) => {
    // --- YOUR CODE GOES UNDER THIS LINE --- 

    // --------- DELETE THIS CONTENT --------
    res.send({
        message: "Hello World"
    })
    // -------------------------------------
});

// Create a new Table object
router.post('/', async (req, res) => {
    // --- YOUR CODE GOES UNDER THIS LINE --- 

    // --------- DELETE THIS CONTENT --------
    res.send({
        message: "Hello World"
    })
    // -------------------------------------
});

// Update a specific Table object
router.patch('/:tableId', async (req, res) => {
    // --- YOUR CODE GOES UNDER THIS LINE --- 

    // --------- DELETE THIS CONTENT --------
    res.send({
        message: "Hello World"
    })
    // -------------------------------------
});

// Delete a specific Table object
router.delete('/:tableId', async (req, res) => {
    // --- YOUR CODE GOES UNDER THIS LINE --- 

    // --------- DELETE THIS CONTENT --------
    res.send({
        message: "Hello World"
    })
    // -------------------------------------
});

module.exports = router;