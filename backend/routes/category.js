const { request } = require("express");
const express = require("express");
const route = express.Router();

const Category = require("../models/Category");

route.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    name.toLowerCase();
    const cat = await Category.findOne({ name: name });
    if (cat) {
      return res.status(400).json({
        message: "The category has been added already",
      });
    }
    const category = await Category.create(req.body);
    return res.status(201).json({ category });
  } catch (e) {
    console.log(e);
  }
});

route.get("/", async (req, res) => {
  const category = await Category.find({});
  return res.status(200).json({
    category,
  });
});

module.exports = route;
