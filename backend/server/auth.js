//might need to change env setup when its actualy running
require("dotenv").config({ path: "../../.env" });
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require("../schema/userSchema");
const bcrypt =require('bcrypt')

//google
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_AUTH_REDIRECT_URL,
//   passReqToCallback: true,
// },
// function(accessToken, refreshToken, profile, cb) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));

//local
passport.use(
  new LocalStrategy(async (username, password, done) => {
    let user;
    try {
      user = await User.findOne({ username: username });
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

  app.post("/session", passport.authenticate("local"), (req, res) => {
    res.status(201).json({
      message: "successfully create session",
      username: req.user.username,
      email: req.user.email,
    });
  });

  app.get("/session", (req, res) => {
    if (!req.user) {
      res.status(401).json({ message: "unauthenticated" });
      return;
    }
    res
      .status(200)
      .json({ message: "authenticated", username: req.user.username });
  });

  //google
//   app.get('/auth/google',
//   passport.authenticate('google', { scope: ['email', 'profile'] }));

//   app.get('/auth/google/callback', 
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function(req, res) {
//       // Successful authentication, redirect home.
//       res.redirect('/books');
//     });
};


module.exports = setUpAuth;
