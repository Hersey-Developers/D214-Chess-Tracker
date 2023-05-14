const Table = require("../models/table");
const Contestant = require("../models/contestant");
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");


// Reset tables
router.post("/reset-tables", authenticateToken, async (req, res) => {
  try {
    const tables = await Table.find();
    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      table.contestant1 = "";
      table.contestant2 = "";
      table.userWhoWon = 0;
      await table.save();
    }
    
    res.json({ message: "Tables reset" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Table objects
router.get("/", async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generate the match results
router.get("/results", async (req, res) => {
  try {
    const tables = await Table.find()
    let contestants = await Contestant.find()
    let contestantObj = {};

    for (const contestant of contestants) {
      contestantObj[contestant._id.toString()] = contestant;
    }
  

    console.log('tables', contestantObj);

    let results = {};
    let resultsTbk = {};

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      const contestant1 = contestantObj[table.contestant1] || undefined;
      const contestant2 = contestantObj[table.contestant2] || undefined;

      if (table.userWhoWon === 1 && contestant1) {
        const school = contestant1.school;
        if (results[school]) {
          results[school] += 1;
          resultsTbk[school] += (1 * table.tableNum);
        }
        else {
          results[school] = 1;
          resultsTbk[school] = (1 * table.tableNum);
        }
      } else if (table.userWhoWon === 2 && contestant2) {
        const school = contestant2.school;
        if (results[school]) {
          results[school] += 1;
          resultsTbk[school] += (1 * table.tableNum);
        }
        else {
          results[school] = 1;
          resultsTbk[school] = (1 * table.tableNum);
        }
      }
    }

    let resultsTable = [];

    for (let school in results) {
      resultsTable.push({ school: school, wins: results[school], tbk: resultsTbk[school] });
    }
    
    let sortedResults = resultsTable.sort((a, b) => {
      if (a.wins < b.wins) {
        return 1;
      } else if (a.wins > b.wins) {
        return -1;
      } else {
        if (a.tbk < b.tbk) {
          return 1;
        } else if (a.tbk > b.tbk) {
          return -1;
        } else {
          return 0;
        }
      }
    });

    // add a rank field

    for (let i = 0; i < sortedResults.length; i++) {
      sortedResults[i].rank = i + 1;
    }

    res.json(sortedResults);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
})

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
router.post("/", authenticateToken, async (req, res) => {
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
router.patch("/:tableId", authenticateToken, async (req, res) => {
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
router.delete("/:tableId", authenticateToken, async (req, res) => {
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
