const express = require("express");
const route = express.Router();

const getUser_list = require("../usersRoute.js/getUser");
const createUser_list = require("../usersRoute.js/createUser");
const changePassword = require("../usersRoute.js/changePassword");

route.get("/", getUser_list);
route.post("/", createUser_list);
route.post("/change/password", changePassword);

module.exports = route;
