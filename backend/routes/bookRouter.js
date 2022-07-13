const express = require("express");
const bookModel = require("../schema/bookSchema");
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

router.post("", async (req, res) => {
  try {
    let book = await bookModel.create({
      image: req.body.image,
      title: req.body.title,
      rating: req.body.rating,
      authors: req.body.authors,
      link: req.body.link,
      description: req.body.description,
    });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({
      message: "could not create thread",
      error: err,
    });
  }
});

module.exports = router;
