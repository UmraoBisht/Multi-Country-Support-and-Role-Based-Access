const express = require("express");
const {
  getData,
  createData,
  updateData,
  deleteData,
} = require("../controllers/dataController");
const { verifyJwt } = require("../middlewares/auth");

const router = express.Router();

// Get data for the user's selected country
router.get("/", verifyJwt, getData);

// Admin routes for data management
router.post("/", verifyJwt, createData);
router.put("/:id", verifyJwt, updateData);
router.delete("/:id", verifyJwt, deleteData);

module.exports = router;
