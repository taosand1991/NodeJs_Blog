const Post = require("../models/Post");

module.exports = async (req, res) => {
  const post = await Post.findById(req.params.id).populate({
    path: "author category",
    select: "username email name",
  });
  if (!post) return res.status(404);
  return res.status(200).json({
    post,
  });
};
