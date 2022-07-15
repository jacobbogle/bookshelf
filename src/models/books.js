import { ref } from "vue";

const BookShelf = () => {
  const state = ref({
    searchTitle: "",
    searchAuthor: "",
    searchISBN: "",
    bookObject: {},
    books: {},
  });

  const getBooks = async function () {
    let response = await fetch("http://localhost:3000/bookshelves", {
      credentials: "include",
    });
    let data = await response.json();
    state.value.books = data.bookshelf.books;
    console.log(data);
  };

  return {
    state,
    getBooks,
  };
};

export default BookShelf;
