require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

//Middle wear
app.use(express.json());
app.use(cors());

//Routes
const booksRoute = require("./routes/bookRouter");
app.use("/books", booksRoute);

//Set up default mongoose connection
const mongoDB = process.env.SERVER_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send(booksRoute);
});

//start server and show port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
