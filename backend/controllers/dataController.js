const Data = require("../models/Data");
const User = require("../models/User");

// Middleware to check if the user has access to data
const hasCountryAccess = (user, dataCountry) => {
  // Admins can access any country; Viewers are limited to their own country
  return user.role === "Admin" || user.country === dataCountry;
};

// Fetch data: Admins can view all; Viewers see only their country's data
exports.getData = async (req, res) => {
  try {
    // const { role, country } = req.user;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const filter = user.role === "Admin" ? {} : { country: user.country }; // No filter for Admins; country filter for Viewers
    const data = await Data.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

// Create data: Data is tagged with the user's selected country
exports.createData = async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!hasCountryAccess(user, req.body.country)) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const newData = new Data({
      ...req.body,
      country: user.role === "Admin" ? req.body.country : user.country, // Admin can set any country; Viewer uses their own
    });

    await newData.save();
    res.status(201).json({ message: "Data created successfully", newData });
  } catch (error) {
    res.status(500).json({ message: "Error creating data", error });
  }
};

// Update data: Admins can update any country data; Viewers restricted to their country
exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = await Data.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    if (!hasCountryAccess(user, data.country)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedData = await Data.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ message: "Data updated successfully", updatedData });
  } catch (error) {
    res.status(500).json({ message: "Error updating data", error });
  }
};

// Delete data: Admins can delete any country data; Viewers restricted to their country
exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const data = await Data.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    if (!hasCountryAccess(user, data.country)) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Data.findByIdAndDelete(id);
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data", error });
  }
};
