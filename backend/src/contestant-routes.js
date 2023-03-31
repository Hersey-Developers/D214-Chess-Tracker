// implement CRUD templates

const Contestant = require("../models/contestant");

const express = require("express");
const router = express.Router();

// Contestants Test Objects in MongoDB

// 6408011cfd69db9696927cb3
// name: "John Doe"
// active: false

// Get all Contestant objects
router.get("/", async (req, res) => {
  // --- YOUR CODE GOES UNDER THIS LINE ---
  try {
    const Contestants = await Contestant.find();
    res.json(Contestants);
  } catch (err) {
    res.json({ message: err});
  }
});

// Get a specific Contestant object
router.get("/:contestantId", async (req, res) => {
  // --- YOUR CODE GOES UNDER THIS LINE ---
  try {
      const Contestant = await Contestant.find(req.params.contestantId);
      res.json(Contestant);
  } catch (err) {
      res.json({ message: err });
  }
});

// Create a new Contestant object
router.post("/", async (req, res) => {
  // --- YOUR CODE GOES UNDER THIS LINE ---
  const contestant1 = new Contestant({
    name: req.body.name,
    active: req.body.active,
  });

  try {
    const savedContestant = await contestant1.save();
    res.json(savedContestant);
  } catch (err) {
    res.json({ message: err});
  }
});

// Update a specific Contestant object
router.patch("/:contestantId", async (req, res) => {
    try {
        const Contestant = await Contestant.find(req.params.contestantId);

        if (req.body.name) {
            Contestant.name = req.body.name;
        }

        if (req.body.age) {
          Contestant.age = req.body.age;
        }

        if (req.body.address) {
          dummy.address = req.body.address;
        }
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete a specific Contestant object
router.delete("/:contestantId", async (req, res) => {
  // --- YOUR CODE GOES UNDER THIS LINE ---
  try {
    const removedContestant = await Contestant.remove({ _id: req.params.contestantId });
    res.json(removedContestant);
  } catch (err) {
      res.json({ message: err });
  }
});

module.exports = router;

//this is a test
