const Match = require('../models/match');
const express = require('express');
const router = express.Router();

// generate the GET, POST, GET /:id, PATCH /:id, and DELETE /:id routes for the Match model

router.get('/', async (req, res) => {
    try {
        const Matches = await Match.find();
        res.json(Matches);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const Match1 = new Match({
        name:req.body.name,
        age:req.body.age,
        address:req.body.address,
    });

    try {
        const SavedMatch = await Match1.save();
        res.json(SavedMatch); 
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:matchId', async (req, res) => {
    try {
        const Match1 = await Match.findById(req.params.matchId);
        console.log(Match1);
        res.json(Match1);
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
});

router.patch('/:matchId', async (req, res) => {
    try {
        const Match1 = await Match.findById(req.params.matchId);
        
        if (req.body.name) {
            Match1.name = req.body.name;
        }

        if (req.body.age) {
            Match1.age = req.body.age;
        }

        if (req.body.address) {
            Match1.address = req.body.address;
        }
        const SavedMatch1 = await Match1.save();
        res.json(Match1);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/:matchId', async (req, res) => {
    try {
        const RemovedMatch = await Match.deleteOne({ _id: req.params.matchId});
        res.json(RemovedMatch);
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
});

module.exports = router;