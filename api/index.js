require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const setUpAuth = require("./server/auth");
const setUpSession = require("./server/session");
// app.use(express.static("public"))


//Middle wear
app.use(express.json());

var corsOptions = {
  origin: "*",
  credentials: true
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header("origin"));
  next();
});

setUpSession(app);
setUpAuth(app);

//Routes
const booksRoute = require("./routes/book-route");
const usersRoute = require("./routes/user-route");
const bookshelvesRoute = require("./routes/bookShelves-route");
const logOutRoute = require("./routes/logOut-route");
const friendsRoute = require("./routes/friends-route");
const postRoute = require("./routes/post-route");
app.use("/api/books", booksRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookshelves", bookshelvesRoute);
app.use("/api/logout", logOutRoute);
app.use("/api/friends", friendsRoute);
app.use("/api/posts", postRoute);

//Set up default mongoose connection
mongoose.connect(process.env.SERVER_URL);

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));


module.exports = app;

