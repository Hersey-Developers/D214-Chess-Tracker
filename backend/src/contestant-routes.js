// implement CRUD templates

const req = require("express/lib/request");
const Contestant = require("../models/contestant");

const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth");

// Contestants Test Objects in MongoDB

// 6408011cfd69db9696927cb3
// name: "John Doe"
// active: false

// Get all Contestant objects

router.post("/reset-participants", authenticateToken, async (req, res) => {
  // Your code goes in here
  try {
    const removedContestants = await Contestant.deleteMany({ _id: req.params.contestantId });
    res.json(removedContestants);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  // --- YOUR CODE GOES UNDER THIS LINE ---
  try {
    const Contestants = await Contestant.find();
    res.json(Contestants);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get a specific Contestant object
router.get("/:contestantId", async (req, res) => {
  // --- YOUR CODE GOES UNDER THIS LINE ---
  try {
      const contestant1 = await Contestant.findById(req.params.contestantId);
      console.log(contestant1);
      res.json(contestant1);
  } catch (err) {
      console.log(err);
      res.json({ message: err });

  }
  
});

// Create a new Contestant object
router.post("/", async (req, res) => {
  // --- YOUR CODE GOES UNDER THIS LINE ---
  const contestant1 = new Contestant({
    name: req.body.name,
    active: req.body.active,
    school: req.body.school,
  });

  try {
    const savedContestant = await contestant1.save();
    res.json(savedContestant);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a specific Contestant object
router.patch("/:contestantId", async (req, res) => {
    try {
        const contestant1 = await Contestant.findById(req.params.contestantId);

        if (req.body.name) {
            contestant1.name = req.body.name;
        }

        if (req.body.active === true) {
          contestant1.active = req.body.active;
        }

        else if (req.body.active === false ) {
          contestant1.active = req.body.active; 
        }

        if (req.body.school) {
          contestant1.school = req.body.school;
        }
        const savedcontestant1 = await contestant1.save();
        res.json(contestant1);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete a specific Contestant object
router.delete("/:contestantId", async (req, res) => {
  // --- YOUR CODE GOES UNDER THIS LINE ---
  try {
    const removedContestant = await Contestant.deleteOne({ _id: req.params.contestantId });
    res.json(removedContestant);
  } catch (err) {
      console.log(err);
      res.json({ message: err });
  }
});

module.exports = router;
