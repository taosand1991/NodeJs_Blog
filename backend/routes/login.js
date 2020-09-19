const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

route.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (result) {
            const payload = {
              user_id: user._id,
              username: user.username,
              email: user.email,
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: "1h",
            });
            return res.status(200).json({
              user,
              token,
            });
          } else {
            return res.status(400).json({
              message: "Password or Email is incorrect",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return res.status(400).json({
        message: "Password or Email is incorrect",
      });
    }
  } catch (e) {
    res.status(400).json({
      message: "Authentication failed",
    });
  }
});

module.exports = route;
