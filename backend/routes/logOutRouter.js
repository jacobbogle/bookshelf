const express = require("express");
let router = express.Router();

router.get("", (req, res) => {
  req.session.destroy();
  res.send(200).json({
    message: "successfully logged out",
  });
});

module.exports = router;
