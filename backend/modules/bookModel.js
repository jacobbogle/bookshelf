const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    min: 1,
    max: 150
  },
  title: {
    type: String,
    required: true,
    min: 1,
    max: 25
  },
  series: {
    type: String,
    required: true,
    min: 1,
    max: 25
  },
  author: {
    type: String,
    required: true,
    min: 1,
    max: 25
  },
  link: {
    type: String,
    required: true,
    min: 1,
    max: 150
  },
  description: {
    type: String
  },
});

const bookModel = mongoose.model("book", bookSchema);

module.exports = bookModel;