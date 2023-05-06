const Table = require("../models/table");
const express = require("express");
const router = express.Router();

// Get all Table objects
router.get("/", async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific Table object by ID
router.get("/:tableId", async (req, res) => {
  try {
    const table = await Table.findById(req.params.tableId);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new Table object
router.post("/", async (req, res) => {
  try {
    const table = new Table({
      tableNum: req.body.tableNum,
      contestant1: req.body.contestant1,
      contestant2: req.body.contestant2,
      userWhoWon: req.body.userWhoWon,
    });
    const newTable = await table.save();
    res.status(201).json(newTable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a specific Table object by ID
router.patch("/:tableId", async (req, res) => {
  try {
    const table = await Table.findById(req.params.tableId);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    // Only update fields that were actually passed in the request body
    if (req.body.contestant1 != null) {
      table.contestant1 = req.body.contestant1;
    }
    if (req.body.contestant2 != null) {
      table.contestant2 = req.body.contestant2;
    }
    if (req.body.userWhoWon != null) {
      table.userWhoWon = req.body.userWhoWon;
    }
    const updatedTable = await table.save();
    res.json(updatedTable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a specific Table object by ID
router.delete("/:tableId", async (req, res) => {
  try {
    const table = await Table.findById(req.params.tableId);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    await table.remove();
    res.json({ message: "Table deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
