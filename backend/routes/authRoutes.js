const express = require("express");
const { login, signup } = require("../controllers/authController");

const router = express.Router();

// Get data for the user's selected country
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
