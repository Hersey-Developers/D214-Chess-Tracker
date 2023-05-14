const Match = require("../models/match");
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");



// id = 644d95e8f47c263fa531de7c
// {
//     "name": "JHHS vs. PHS 4/1 Meet",
//     "round": 3,
//     "_id": "644d95e8f47c263fa531de7c",
//     "__v": 0
// }


// id = 644d960af47c263fa531de7e
// {
//     "name": "BG vs. PHS 4/2 Meet",
//     "round": 2,
//     "_id": "644d960af47c263fa531de7e",
//     "__v": 0
// }

// id = 644d961e8ff3de3745f7940c
// {
//     "name": "EG vs. GBN 4/3 Meet",
//     "round": 5,
//     "_id": "644d961e8ff3de3745f7940c",
//     "__v": 0
// }

router.get('/', authenticateToken, async (req, res) => {
    try {
        const Matches = await Match.find();
        res.json(Matches);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const Match1 = new Match({
        name:req.body.name,
        round:req.body.round
    });

    try {
        const SavedMatch = await Match1.save();
        res.json(SavedMatch); 
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:matchId', authenticateToken, async (req, res) => {
    try {
        const Match1 = await Match.findById(req.params.matchId);
        console.log(Match1);
        res.json(Match1);
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
});

router.patch('/:matchId', authenticateToken, async (req, res) => {
    try {
        const Match1 = await Match.findById(req.params.matchId);
        
        if (req.body.name) {
            Match1.name = req.body.name;
        }

        if (req.body.round) {
            Match1.round = req.body.round;
        }
        const SavedMatch1 = await Match1.save();
        res.json(Match1);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/:matchId', authenticateToken, async (req, res) => {
    try {
        const RemovedMatch = await Match.deleteOne({ _id: req.params.matchId});
        res.json(RemovedMatch);
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
});

module.exports = router;
