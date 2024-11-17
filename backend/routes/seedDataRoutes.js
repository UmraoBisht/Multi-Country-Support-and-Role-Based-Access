const express = require("express");
const Data = require("../models/Data");
const { default: mongoose } = require("mongoose");
const router = express.Router();

const seedData = async (req, res) => {
  const data = [
    {
      name: "USA Data 1",
      description: "Sample data related to the United States.",
      country: "USA",
    },
    {
      name: "India Data 1",
      description: "Sample data related to India.",
      country: "India",
    },
    {
      name: "Canada Data 1",
      description: "Sample data related to Canada.",
      country: "Canada",
    },
    {
      name: "Germany Data 1",
      description: "Administrative data related to Germany.",
      country: "Germany",
    },
    {
      name: "UK Data 1",
      description: "Sample data related to the United Kingdom.",
      country: "UK",
    },
    {
      name: "USA Data 1",
      description: "Sample data related to the United States.",
      country: "USA",
    },
    {
      name: "India Data 1",
      description: "Sample data related to India.",
      country: "India",
    },
    {
      name: "Canada Data 1",
      description: "Sample data related to Canada.",
      country: "Canada",
    },
    {
      name: "Germany Data 1",
      description: "Administrative data related to Germany.",
      country: "Germany",
    },
    {
      name: "UK Data 1",
      description: "Sample data related to the United Kingdom.",
      country: "UK",
    },
    {
      name: "Australia Data 1",
      description: "Financial reports for Australia.",
      country: "Australia",
    },
    {
      name: "France Data 1",
      description: "Cultural data for France.",
      country: "France",
    },
    {
      name: "Japan Data 1",
      description: "Market trends in Japan.",
      country: "Japan",
    },
    {
      name: "Brazil Data 1",
      description: "Agricultural statistics for Brazil.",
      country: "Brazil",
    },
    {
      name: "China Data 1",
      description: "Technology advancements in China.",
      country: "China",
    },
    {
      name: "South Africa Data 1",
      description: "Wildlife data for South Africa.",
      country: "South Africa",
    },
    {
      name: "Italy Data 1",
      description: "Tourism data related to Italy.",
      country: "Italy",
    },
    {
      name: "Russia Data 1",
      description: "Energy resources data for Russia.",
      country: "Russia",
    },
    {
      name: "Mexico Data 1",
      description: "Economic indicators for Mexico.",
      country: "Mexico",
    },
    {
      name: "Argentina Data 1",
      description: "Sports data from Argentina.",
      country: "Argentina",
    },
  ];

  try {
    await Data.insertMany(data);
    res.json({ message: "Data seeded successfully!" });
    console.log("Data seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

router.post("/", seedData);

module.exports = router;
