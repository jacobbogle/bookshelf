import { ref } from "vue";

const BookShelf = () => {
  const state = ref({
    books: {},
    bookshelf: {},
    postInput: "",
    username: "",
  });

  const getBooks = async function () {
    let response = await fetch("/api/bookshelves/books", {
      methods: "GET",
      credentials: "include",
    });
    let data = await response.json();
    state.value.books = data.listOfBooks;
  };

  const getBookshelf = async function () {
    let response = await fetch("/api/bookshelves", {
      credentials: "include",
    });
    let data = await response.json();
    state.value.bookshelf = data.bookshelf;
  };

  const deleteBook = async function (bookID) {
    await fetch(`/api/bookshelves/${bookID}`, {
      method: "DELETE",
      credentials: "include",
    });
    this.getBooks();
  };

  const postPosts = async function() {
    let newPost = {
      comment: state.value.postInput,
      bookshelf_id: state.value.bookshelf._id,
    };
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    getBookshelf();
    state.value.postInput = "";
  };

  const getSession = async function () {
    let response = await fetch("/session", {
      credentials: "include",
    });
    if (response.status == 200) {
      let data = await response.json();
      state.value.username = data.username;
    }
  };

  const compareName = function (name) {
    if (name === state.value.username) {
      return true;
    } else {
      return false;
    }
  };

  const patchBookShelfPublic = async function () {
    let requestBody = {};
    if (state.value.bookshelf.public === true) {
      requestBody["public"] = false;
    } else {
      requestBody["public"] = true;
    }
    await fetch("/api/bookshelves", {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getBookshelf();
  };

  const deletePost = async function (postID, bookshelfID) {
    await fetch(
      `/api/posts/${postID}/bookshelf/${bookshelfID}`,
      {
        method: "DELETE",
        credentials: "include",
      });
    getBookshelf();
  };

  return {
    state,
    getBooks,
    deleteBook,
    getBookshelf,
    getSession,
    postPosts,
    compareName,
    patchBookShelfPublic,
    deletePost
  };
};

export default BookShelf;
