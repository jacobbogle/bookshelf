const express = require("express");
const  User  = require("../schema/user-schema");
let router = express.Router();
const bcrypt = require("bcrypt");

router.post("", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message: "post request failed to create user",
      error: err,
    });
    console.log(err);
  }
});

router.get("", async (req, res) => {
  let listOfUsers;
  try {
    listOfUsers = await User.find({}, { password: 0, email: 0, fullname: 0 });
    res.status(200).json(listOfUsers);
  } catch (err) {
    res.status(500).json({ message: "could not get users" });
  }
});

module.exports = router;
