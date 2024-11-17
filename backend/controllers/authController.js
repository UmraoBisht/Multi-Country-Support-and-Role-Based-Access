const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  // console.log(user);

  const token = await generateToken(user);
  res.json({ token, user });
};

exports.signup = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  await newUser.save();
  const token = await generateToken(newUser);
  res.json({ token, user: newUser });
};
