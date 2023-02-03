require('dotenv').config()
const session = require("express-session");
const setUpSession = function (app) {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
};

module.exports = setUpSession;