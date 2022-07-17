const express = require("express");
const bookModel = require("../schema/bookSchema");
const { BookShelf } = require("../schema/bookShelfSchema");

let router = express.Router();

router.post("", async (req, res) => {
  if (!req.user) {
    res.status(401).json({
      message: "UNAUTHENTICATED",
    });
    return;
  }
  let book;
  try {
    let testBookInDatabase = await bookModel.findOne({
      isbn: req.body.isbn,
    });
    if (!testBookInDatabase) {
      book = await bookModel.create({
        image: req.body.image,
        title: req.body.title,
        rating: req.body.rating,
        authors: req.body.authors,
        link: req.body.link,
        description: req.body.description,
        isbn: req.body.isbn,
      });
    } else if (testBookInDatabase) {
      book = testBookInDatabase;
    }
  console.log("book id: " + book._id);
  } catch (err) {
    console.log("book in database already");
  }
  let userID = req.user.id;
  try {
    let bookshelfObject = await BookShelf.findOne({ user_id: req.user.id });
    if (!bookshelfObject) {
      let bookshelftest = await BookShelf.create({
        user_id: userID,
        books: [book._id],
      });
      console.log("bookshelf TEST: ", bookshelftest);
    } else if (bookshelfObject) {
      console.log(bookshelfObject.books)
      if (bookshelfObject.books.includes(book._id)) {
        console.log("you already have this book in your bookshelf")
      } else {
        let bookshelf = await BookShelf.findOneAndUpdate(
          { user_id: userID },
          {
            $push: { books: book._id },
          },
          { new: true }
        );
        res.status(200).json({
          message: bookshelf,
        });
        console.log("added: " + book._id)
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "could not create bookshelf or add",
      error: err,
    });
  }
});


router.get("", async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "unauthenticated" });
    return;
  }
  let id = req.user.id;
  let bookshelf;
  try {
    bookshelf = await BookShelf.findOne({ user_id: id });
    let listOfBooks = [];
    for (book in bookshelf.books) {
      currentBook = await bookModel.findOne({
        _id: bookshelf.books[book].toString(),
      });
      listOfBooks.push(currentBook);
    }
    res.status(200).json({ listOfBooks });
  } catch (err) {
    res.status(500).json({
      message: "failed to get bookshelf from id",
    });
  }
});
module.exports = router;
