const express = require("express");
const { BookShelf } = require("../schema/bookShelf-schema");

let router = express.Router();

router.post("", async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "unauthenticated" });
    return;
  }

  let bookshelf;

  try {
    bookshelf = await BookShelf.findByIdAndUpdate(
      req.body.bookshelf_id,
      {
        $push: {
          posts: {
            user_id: req.user.id,
            comment: req.body.comment,
            bookshelf_id: req.body.bookshelf_id,
          },
        },
      },
      { new: true }
    );

    if (!bookshelf) {
      res.status(404).json({
        message: "bookshelf not found",
        id: req.params.bookshelf_id,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "failed to insert post",
      error: err,
    });
  }
  res.status(201).json(bookshelf.posts[bookshelf.posts.length - 1]);
});

router.delete("/:post_id/bookshelf/:bookshelf_id", async (req, res) => {
  let bookshelf;
  let post;

  if (!req.user) {
    res.status(401).json({ message: "unathenticated" });
    return;
  }

  try {
    bookshelf = await BookShelf.findOne({
      _id: req.params.bookshelf_id,
    });
  } catch (err) {
    res.status(500).json({
      message: "error finding bookshelf when deleting post",
      error: err,
    });
    return;
  }

  if (!bookshelf) {
    res.status(404).json({
      message: "bookshelf not found when deleting post",
      bookshelf_id: req.params.bookshelf_id,
    });
  }

  let authorizedToDelete = false;

  console.log("bookshelf you are trying to delete: ", bookshelf);
  //   if (req.user.id == bookshelf.user_id) authorizedToDelete = true;

  for (let i in bookshelf.posts) {
    if (bookshelf.posts[i]._id == req.params.post_id) {
      post = bookshelf.posts[i];
      if (bookshelf.posts[i].user_id == req.user.id) {
        authorizedToDelete = true;
      }
    }
  }

  if (!authorizedToDelete) {
    res.status(401).json({ message: "not authorized to delete this post" });
    return;
  }

  try {
    await BookShelf.findByIdAndUpdate(req.params.bookshelf_id),
      {
        $pull: {
          posts: {
            _id: req.params.post_id,
          },
        },
      };
  } catch (err) {
    res.status(500).json({
      message: "error deleting post",
      error: err,
    });
    return;
  }
  res.status(200).json(post);
});

module.exports = router;
