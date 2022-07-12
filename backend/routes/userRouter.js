const express = require("express");
const userModel = require("../schema/userSchema");
let router = express.Router();

router.post("", async (req, res) => {
  try {
    let user = await userModel.create({
      username: req.body.username,
      fullname: req.body.fullname,
      password: req.body.password,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message: "post request failed to create user",
      error: err,
    });
  }
});

module.exports = router;
