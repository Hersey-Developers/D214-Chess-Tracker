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

  // --------- DELETE THIS CONTENT --------
  res.send({
    message: "Hello World",
  });
  // -------------------------------------
});

// Get a specific Contestant object
router.get("/:contestantId", async (req, res) => {
  // --- YOUR CODE GOES UNDER THIS LINE ---

  // --------- DELETE THIS CONTENT --------
  res.send({
    message: "Hello World",
  });
  // -------------------------------------
});

// Create a new Contestant object
router.post("/", async (req, res) => {
  // --- YOUR CODE GOES UNDER THIS LINE ---

  // --------- DELETE THIS CONTENT --------
  res.send({
    message: "Hello World",
  });
  // -------------------------------------
});

// Update a specific Contestant object
router.patch("/:contestantId", async (req, res) => {
  // --- YOUR CODE GOES UNDER THIS LINE ---

  // --------- DELETE THIS CONTENT --------
  res.send({
    message: "Hello World",
  });
  // -------------------------------------
});

// Delete a specific Contestant object
router.delete("/:contestantId", async (req, res) => {
  // --- YOUR CODE GOES UNDER THIS LINE ---

  // --------- DELETE THIS CONTENT --------
  res.send({
    message: "Hello World",
  });
  // -------------------------------------
});

module.exports = router;

//this is a test
