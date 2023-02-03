require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../schema/user-schema");
const bcrypt =require('bcrypt')
// var session = require('express-session');
//local
passport.use(
  new LocalStrategy(async (email, password, done) => {
    let user;
    try {
      user = await User.findOne({ email: email });
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false)
      }
    } catch (err) {
      return done(err);
    }
  })
);

//runs in server
const setUpAuth = function (app) {
  app.use(passport.initialize());
  app.use(passport.authenticate("session"));

  passport.serializeUser(function (user, cb) {
    cb(null, {
      id: user._id,
      username: user.username,
      email: user.email,
    });
  });
  passport.deserializeUser(function (user, cb) {
    return cb(null, user);
  });

  
  const cookieParser = require("cookie-parser");
  app.use(cookieParser());


  app.post("/session", passport.authenticate("local"), (req, res) => {
    let myObjectId = req.user._id
    res.cookie("username", req.user.username)
    res.cookie("email", req.user.email)
    res.cookie("id", myObjectId.toString())
    res.status(200).json({
      message: "successfully create session",
      username: req.user.username,
      email: req.user.email,
    });
  });

  app.get("/session", (req, res) => {
    if (!req.cookies.username) {
      res.status(401).json({ message: "unauthenticated" });
      return;
    }
    res.status(200).json({ message: "authenticated", username: req.cookies.username });
  });
}

module.exports = setUpAuth;
