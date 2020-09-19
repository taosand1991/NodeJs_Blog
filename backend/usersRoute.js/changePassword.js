const jwt = require("jsonwebtoken");
const brcypt = require("bcrypt");

const User = require("../models/User");

module.exports = async (req, res) => {
  const old_password = req.body.old_password;
  let new_password = req.body.new_password;
  try {
    const authToken = req.headers["authorization"].split(" ");
    const token = jwt.verify(authToken[1], process.env.SECRET_KEY);
    const user = await User.findById(token.user_id);
    if (!user)
      return res.status(404).json({ message: "No user found with the id" });
    const hash = await brcypt.compare(old_password, user.password);
    if (!hash) {
      return res
        .status(400)
        .json({ message: "Your old password does not match" });
    } else {
      const hash_password = await brcypt.hash(new_password, 10);
      new_password = hash_password;
      await User.findByIdAndUpdate(token.user_id, {
        password: hash_password,
      });
      return res.status(200).json({ message: "password has been updated" });
    }
  } catch (e) {
    console.log(e.message);
  }
};
