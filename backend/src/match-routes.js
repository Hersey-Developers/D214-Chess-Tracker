const Match = require('../models/match');
const express = require('express');
const router = express.Router();

// generate the GET, POST, GET /:id, PATCH /:id, and DELETE /:id routes for the Match model

router.get('/', async (req, res) => {
    res.send({
        message: "Hello World"
    })
});

router.post('/', async (req, res) => {
    res.send({
        message: "Hello World"
    })
});

router.get('/:matchId', async (req, res) => {
    res.send({
        message: "Hello World"
    })
});

router.patch('/:matchId', async (req, res) => {
    res.send({
        message: "Hello World"
    })
});

router.delete('/:matchId', async (req, res) => {
    res.send({
        message: "Hello World"
    })
});

module.exports = router;