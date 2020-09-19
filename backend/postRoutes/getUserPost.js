const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

const getUserPost = async (req, res) => {
  try {
    const authToken = req.headers["authorization"].split(" ");
    const token = jwt.verify(authToken[1], process.env.SECRET_KEY);
    console.log(token.user_id);
    const post = await Post.find({ author: token.user_id }).populate({
      path: "author category",
      select: "username email name",
    });
    if (!post) return res.sendStatus(404);
    return res.json({
      post,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};
module.exports = getUserPost;
