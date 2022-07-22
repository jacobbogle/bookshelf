import { ref } from "vue";

const BookShelf = () => {
  const state = ref({
    books: {},
    reviews: {}
  });

  const setBook = async function (bookObj) {
    state.value.books = bookObj;
    let response = await fetch("http://localhost:3000/bookshelves/books", {
      credentials: "include",
    });
    let data = await response.json();
    state.value.reviews = data;
    console.log("reviews", data);
  };


  return {
    state,
    setBook,
  };
};

export default BookShelf;