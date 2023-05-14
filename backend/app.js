const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const contestantRoutes = require("./src/contestant-routes");
const tableRoutes = require("./src/table-routes");
const userRoutes = require("./src/user-routes");
const dummyRoutes = require("./src/dummy-routes");
const matchRoutes = require("./src/match-routes");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

app.use("/contestants", contestantRoutes);
app.use("/tables", tableRoutes);
app.use("/", userRoutes);
app.use("/dummies", dummyRoutes);
app.use("/matches", matchRoutes);

app.use((req, res) => {
  const error = new Error("Could not find this route.");
  error.status = 404;

  res.status(404).json({ message: error.message });
  
});

module.exports = app;
