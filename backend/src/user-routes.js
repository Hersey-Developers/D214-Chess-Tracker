const User = require("../models/user");
const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Test user objects

// Coach User:
// ID: 6407fed2f0dc8c869555af28
// Email: test@test.com
// Password: 12345
// Admin User:
// ID: 6407ff41f0dc8c869555af2a
// Email: test2@test.com
// Password: 123456

// ========================================

// Create a new user account
router.post("/signup", async (req, res) => {
  const { email, password, accessLevel } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    passwordHash: hashedPassword,
    accessLevel: accessLevel,
  });

  try {
    await user.save();
  } catch (error) {
    console.log("Error creating user: ", error);
    return res.status(500).send({
      message: "Error creating user",
    });
  }

  res.status(201).send({
    message: "User created",
  });
});

// Log in the user
router.post("/login", async (req, res) => {
  const user = await user.findOne({ email: req.body.e, ail });

  if (!user || !user.comparePassword(req.body.password))
    return res.status(400).send("Incorrect Login Information");

  const token = jwt.sign(
    {
      _id: user._id,
    },
    "CHANGEME!"
  );

  res.send({ token });

  router.get("/profile", [jwtMiddleware], async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    res.send(user);
  });

  router.post(
    "/sign-up",
    [...signUpValidators, handleValidationErrors],
    async (req, res) => {
      const userExists = await User.findOne({ email: req.body.email });

      if (userExists) return res.status(400).send("E-mail already exists");
      if ((req.body.password !== req.body.email, req.body.passwordConfirm))
        return res.status(400).send("Passwords do not match");

      const user = await User.signUp(req.body.email, req.body.password);
      res.status(201).send(user.sanatize());
    }
  );

  router.post(
    "login",
    [...loginValidatorsm, handleValidationErrors],
    async (req, res) => {
      const user = await User.findOne({ email: req.body.email });

      if (!user || !user.comparePassword(req.body.password))
        return res.status(400).send("Invalid Login Information");

      const token = jwt.sign(
        {
          _id: isSecureContext._id,
        },
        "CHANGEME!"
      );

      res, send({ token });
    }
  );

  router.get("/profile", [jwtMiddleware], async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });

    res.send(user);
  });

  // --- YOUR CODE GOES UNDER THIS LINE ---
});

// Log out the user
router.get("/logout", function (req, res, next) {
  // remove the req.user property and clear the login session
  req.logout();

  // destroy session data
  req.session = null;

  // redirect to homepage
  res.redirect("/");
});

router.get("/logout", middleware.isLogedIn, (req, res) => {
  User.findById(req.user._id).then((rUser) => {
    rUser.online = false;
    rUser.save();
  });
  req.logout();
  res.redirect("/");
});

//Destroys the session to logout the user
app.get("/logout", function (req, res) {
  req.session.destroy(() => {
    req.logout();
    res.redirect("/"); //Inside a callback… bulletproof!
  });
});

app.get("/logout", function (req, res) {
  //clear the remember me cookie when logging out
  res.clearCookie("remember_me");
  req.logout();
  res.redirect("/");
});

router.get("/signout", function (req, res) {
  req.logout();
  if (!req.session) {
    req.session.destroy(function (err) {
      res.redirect("login");
    });
  } else {
    res.redirect("/login");
  }
});

router.get("logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.get("/logout", function (req, res) {
  req.logout();
  res.status(200).json({
    status: "Bye!",
  });
});

//logout logic and route
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Successfully logged out!");
  res.redirect("/campgrounds");
});

logoutRouter.get("/", (req, res) => {
  req.logout();
  return res.redirect(HOME);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.session = null;
  res.redirect(loggedOutHome);
});

//logout
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//Logout Route

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "You are logged out of your account");
  res.redirect("/");
});

// --- YOUR CODE GOES UNDER THIS LINE ---

module.exports = router;
