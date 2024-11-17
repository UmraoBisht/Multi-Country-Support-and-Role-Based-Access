const express = require("express");
const { setCountry } = require("../controllers/userController");
const { verifyJwt } = require("../middlewares/auth");

const router = express.Router();

// Get data for the user's selected country
router.post("/update", verifyJwt, setCountry);

module.exports = router;
