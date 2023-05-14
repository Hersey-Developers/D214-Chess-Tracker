const jwt = require("jsonwebtoken");
const express = require("express");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "test", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


module.exports = authenticateToken;
