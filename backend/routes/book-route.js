const express = require("express");
const bookModel = require("../schema/book-schema");
let router = express.Router();

router.get("", async (req, res) => {
  let books;
  try {
    books = await bookModel.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({
      message: "could not get /books",
      error: err,
    });
  }
});

module.exports = router;
