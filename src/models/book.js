import { ref } from "vue";

const Book = () => {
  const state = ref({
    book: {},
  });

  const setBook = function (bookObj) {
    console.log(bookObj)
    state.value.book = bookObj;
    console.log(state.value.book)
  }
  return {
    state,
    setBook,
  };
};

export default Book;