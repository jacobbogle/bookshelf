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

  const callBook = function () {
    return state.value.book
  }
  return {
    state,
    setBook,
    callBook
  };
};

export default Book;