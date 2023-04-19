const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user"); // import the user model
const { authenticateToken } = require("../middleware/auth"); //import the authentication middleware

const router = express.Router();

//Test user objects

//Coach User:
//ID: 6407fed2f0dc8c869555af28
//Email: test@test.com
//Password: 12345
//Admin User:
//ID: 6407ff410dc8c869555af2a
//Email: test2@test.com
//Password 123456

// User login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and sign a JSON Web Token (JWT)
    const token = jwt.sign({ id: user._id }, "test", {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Return the token to the client
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User logout route
router.post("/logout", (req, res) => {
  // Invalidate the user's token on the server side
  // This can be done in various ways, such as storing the invalidated token
  // in a database, or using a middleware that checks if the token is still valid
  // before allowing access to protected routes.

  // For this example, we will simply send a response to the client indicating that
  // the user has been logged out.
  res.status(200).json({ message: "User logged out successfully" });
});

module.exports = router;
