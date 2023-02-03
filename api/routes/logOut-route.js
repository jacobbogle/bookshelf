const express = require("express");
let router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.get("", (req, res) => {
  res.clearCookie('connect.sid');
  res.clearCookie('username');
  res.clearCookie('email');
  res.clearCookie('id');
  res.send(req.cookies('username'));
  res.send(req.cookies('email'));
  res.send(req.cookies('id'));
  res.send("Logout successful");
});

module.exports = router;
