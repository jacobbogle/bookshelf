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
    } else {
      book = testBookInDatabase;
    }

    console.log("book id: ", book._id);
  } catch (err) {
    console.log("book in database already");
    // res.status(500).json({
    //   message: "could not create book, possibly already in database",
    //   error: err,
    // });
    // return;
  }
  let userID = req.user.id;
  try {
    let bookshelfobject = await BookShelf.findOne({ user_id: userID });
    if (!bookshelfobject) {
      let bookshelftest = await BookShelf.create({
        user_id: userID,
        books: [],
      });
      console.log("bookshelf TEST: ", bookshelftest);
    }
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
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "could not create bookshelf",
      error: err,
    });
  }
});

// router.get("/:id", async (req, res) => {
//   let id = req.params.id;
//   if (!req.user) {
//     res.status(401).json({ message: "unauthenticated" });
//     return;
//   }

//   let bookshelf;
//   try {
//     bookshelf = await BookShelf.findOne({ user_id: id });
//     console.log(bookshelf);
//     res.status(200).json({ bookshelf });
//   } catch (err) {
//     res.status(500).json({
//       message: "failed to get bookshelf from id",
//     });
//   }
// });

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
