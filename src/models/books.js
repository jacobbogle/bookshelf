import { ref } from "vue";

const BookShelf = () => {
  const state = ref({
    books: {},
    bookshelf: {},
  });

  const getBooks = async function () {
    let response = await fetch("http://localhost:3000/bookshelves/books", {
      credentials: "include",
    });
    let data = await response.json();
    state.value.books = data.listOfBooks;
    console.log("data", data);
  };

  const getBookshelf = async function () {
    let response = await fetch("http://localhost:3000/bookshelves", {
      credentials: "include",
    });
    let data = await response.json();
    state.value.bookshelf = data.bookshelf;
    console.log("bookshelf data", data);
  };

  const deleteBook = async function (bookID) {
    console.log(bookID);
    let response = await fetch(`http://localhost:3000/bookshelves/${bookID}`, {
      method: "DELETE",
      credentials: "include",
    });
    let data = await response.json();
    console.log("data: ", data);
    this.getBooks();
  };

  return {
    state,
    getBooks,
    deleteBook,
    getBookshelf,
  };
};

export default BookShelf;
