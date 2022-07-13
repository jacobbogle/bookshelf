const express = require("express");
const { User } = require("../schema/userSchema");
let router = express.Router();

// const corsOptions = {
//   origin: "http://localhost:3001",
//   credentials: true,
// };
// router.use(cors(corsOptions));

router.post("", async (req, res) => {
  console.log("body: ", req.body);
  try {
    let user = await User.create({
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
    console.log(err);
  }
});

module.exports = router;
