const express = require("express");
const route = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

const getPost = require("../postRoutes/getPost");
const createPost = require("../postRoutes/createPost");
const getUserPost = require("../postRoutes/getUserPost");
const getOnePost = require("../postRoutes/getOnePost");
const Post = require("../models/Post");

route.get("/", getPost);
route.get("/my_post", getUserPost);
route.get("/:id", getOnePost);
route.patch("/:id", async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!post) return res.status(404);
  return res.status(200).json({
    post,
  });
});
route.post("/", upload.single("picture"), createPost);

module.exports = route;
