require("dotenv").config({ path: "../../.env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const setUpAuth = require("./auth");
const setUpSession = require("./session");

//Middle wear
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header("origin"));
  next();
});

setUpSession(app);
setUpAuth(app);


//Routes
const booksRoute = require("../routes/bookRouter");
const usersRoute = require("../routes/userRouter");
const bookshelvesRoute = require("../routes/bookshelvesRouter");
app.use("/books", booksRoute);
app.use("/users", usersRoute);
app.use("/bookshelves", bookshelvesRoute);

//Set up default mongoose connection
const mongoDB = process.env.SERVER_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//start server and show port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
