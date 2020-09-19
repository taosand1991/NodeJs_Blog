const jwt = require("jsonwebtoken");
const brcypt = require("bcrypt");

const User = require("../models/User");

module.exports = async (req, res, next) => {
  let password = req.body.password;
  const password2 = req.body.password2;
  const email = req.body.email;
  const username = req.body.username;
  const privateKey = "secret";
  if (password !== password2) {
    return res.status(400).json({
      message: "password does not match",
    });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({
      message: "user with the email already exists",
    });
  }
  brcypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(400).json({
        message: "error saving the password",
      });
    } else {
      password = hash;
      User.create({
        email,
        password,
        username,
      })
        .then((user) => {
          const payload = {
            user_id: user._id,
            email: user.email,
            username: user.username,
          };
          const token = jwt.sign(payload, privateKey, {
            expiresIn: "1h",
          });
          res.status(201).json({
            message: "user created",
            token,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};
