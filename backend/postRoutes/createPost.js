const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const post = await Post.findOne({ title: req.body.title });
    if (post) {
      return res.status(400).json({
        message: "Post has already been created",
      });
    }
    const token = req.headers["authorization"];
    const final = token.split(" ");
    jwt.verify(final[1], process.env.SECRET_KEY, async (e, token) => {
      if (e) {
        return res.status(400).json({
          message: "Anonymous user, Authentication failed",
        });
      }
      const posts = await Post.create({
        author: token.user_id,
        title: req.body.title,
        category: req.body.category,
        body: req.body.body,
        image: req.file.originalname,
      });
      return res.status(201).json({
        posts,
      });
    });
  } catch (e) {
    res.status(500).json({
      message: "there is an error. please try again later",
    });
  }
};
