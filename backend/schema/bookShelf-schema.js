const mongoose = require("mongoose");

const bookShelfSchema = new mongoose.Schema({
  books: {
    type: [String],
  },
  user_id: {
    type: String,
  },
  public: {
    type: Boolean,
    default: false,
  },
});

const BookShelf = mongoose.model("BookShelf", bookShelfSchema);

module.exports = { BookShelf };
