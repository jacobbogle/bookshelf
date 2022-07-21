import { ref } from "vue";
const api = require("../../api.config");

//google stuff
const googleApiKey = api["API_KEY"];
const googleBooksURL = "https://www.googleapis.com/books/v1";

const SearchBar = () => {
  const state = ref({
    searchTitle: "",
    books: {},
  });

  //makes the querystring and adds the needed api string for the GET of google books api
  //example : [?q=<searchTitle>&key=<googleApiKey>]
  //this needs to be appended to the url
  function urlString() {
    let title = encodeURIComponent(state.value.searchTitle);
    let key = googleApiKey;
    return "?q=" + title + "&maxResults=11" + "&key=" + key;
  }

  //returns a json file of related books from searchTitle
  const searchByTitle = async () => {
    try {
      let URLSTRING = urlString();
      await fetch(googleBooksURL + "/volumes" + URLSTRING)
        .then((res) => {
          let response = res.json();
          return response;
        })
        .then((data) => {
          state.value.books = shuffle(data.items)
          console.log(state.value.books);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //shuffle
  const shuffle = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  const postBook = async function (book) {
    let newBook = {
      image: book.image,
      title: book.title,
      rating: book.rating,
      authors: book.authors,
      link: book.link,
      description: book.description,
      isbn: book.isbn,
    };
    console.log("newBook: ", newBook);
    let response = await fetch("http://localhost:3000/bookshelves", {
      method: "POST",
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    let data = await response.json();
    console.log(data);
  };

  return {
    state,
    searchByTitle,
    postBook,
    shuffle
  };
};

export default SearchBar;
