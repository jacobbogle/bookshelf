const express = require("express");
const { User } = require("../schema/userSchema");
let router = express.Router();
const bcrypt =require('bcrypt')


router.post("", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    let user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
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

module.exports = router;
