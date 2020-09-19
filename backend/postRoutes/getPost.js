const Post = require("../models/Post");

const getPost = async (req, res) => {
  try {
    const post = await Post.find({}).populate({
      path: "author category",
      select: "username email name",
    });
    return res.json({
      post,
    });
  } catch (e) {
    res.sendStatus(400).json({
      e,
    });
  }
};

module.exports = getPost;
