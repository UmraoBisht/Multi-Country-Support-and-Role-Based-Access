const User = require("../models/User");

exports.setCountry = async (req,res) => {

  const user = await User.findOneAndUpdate(
    { _id: req.userId },
    { country: req.body.country },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({ message: "User not found or access denied" });
  }
  res.json({ message: "Country updated successfully", user });
};
