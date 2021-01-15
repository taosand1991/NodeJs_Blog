const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gridMsg = require("@sendgrid/mail");
gridMsg.setApiKey(process.env.SEND_GRID_API_KEY);

const User = require("../models/User");
const url = "http://localhost:3000/";

route.post("/password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(404)
        .json({ message: "There is no user with the email" });
    const payload = {
      user_id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "30m",
    });

    await User.findByIdAndUpdate(user._id, {
      refreshToken: token,
    });

    const msg = {
      to: user.email,
      from: "tadesina26@gmail.com",
      subject: "Reset Password",
      text: "This is a good one believe me",
      html: `<p>http://localhost:3000/reset/password/${user._id}/${token}</p>`,
    };

    sendMessage = async () => {
      try {
        await gridMsg.send(msg);
        return res.status(200).json({
          message:
            "Instructions has been sent to your email on how to reset your email",
        });
      } catch (e) {
        console.log(e.response.body);
      }
    };
    sendMessage();
  } catch (e) {
    console.log(e);
  }
});

route.get("/password/:id/:token", async (req, res) => {
  const id = req.params.id;
  const token = req.params.token;
  try {
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ message: "No user found with the id" });
    if (user.refreshToken !== token)
      return res.status(400).json({
        message: "Invalid Token",
      });
    const getToken = jwt.verify(token, process.env.RESET_PASSWORD_KEY);
    if (getToken) {
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

route.post("/password/:id/:token", async (req, res) => {
  const id = req.params.id;
  const token = req.params.token;
  let password = req.body.new_password;
  try {
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ message: "No user found with the id" });
    if (user.refreshToken !== token)
      return res.status(400).json({
        message: "Invalid Token",
      });
    const getToken = jwt.verify(token, process.env.RESET_PASSWORD_KEY);
    if (getToken) {
      const hash = await bcrypt.hash(password, 10);
      password = hash;
      await User.findByIdAndUpdate(id, {
        refreshToken: "",
        password: password,
      });
      return res
        .status(200)
        .json({ message: "Your password has been updated success" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

module.exports = route;
