const jwt = require("jsonwebtoken");
const brcypt = require("bcrypt");

const User = require("../models/User");

const handler = async (req, res) => {
  const token = jwt.sign({ ismaheel: "choke" }, "secret");
  const users = await User.find({});
  res.status(200).json({ token: token, users: users });
};

module.exports = handler;
