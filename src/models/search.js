import { ref } from "vue";
const api = require("../../api.config");

//google stuff
const googleApiKey = api["API_KEY"];
const googleBooksURL = "https://www.googleapis.com/books/v1";

const Search = () => {
  const state = ref({
    searchTitle: "",
    books: {},
    lengthOfBooks: null
  });

  //makes the querystring and adds the needed api string for the GET of google books api
  //example : [?q=<searchTitle>&key=<googleApiKey>]
  //this needs to be appended to the url
  function urlString() {
    let title = encodeURIComponent(state.value.searchTitle);
    let key = googleApiKey;
    return "?q=" + title + "&maxResults=10" + "&key=" + key;
  }

  //returns a json file of related books from searchTitle
  const searchByTitle = async () => {
    try {
      let URLSTRING =  await urlString();
      await fetch(googleBooksURL + "/volumes" + URLSTRING)
        .then((res) => {
          let response = res.json();
          return response;
        })
        .then((data) => {
          state.value.books = data;
          state.value.lengthOfBooks = (data.items).length
          console.log(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const newObjectkGetter = async (listOfLinks) => {
    console.log(listOfLinks)
    let NewBooksObject = []
    for (let index = 0; index < state.value.lengthOfBooks; index++) {
      const link = listOfLinks[index];
      await fetch(link).then((res) => {
        let response =  res.json();
        NewBooksObject.push(response)
        console.log("Good fetch on book: " + (index+1));
        return response;
      })
      //console.log(bookObject)
    }
  }


  // const newImageGetter = async (listOfLinks) => {
  //   try {
  //     let bookImageDict = bookObject.volumeInfo.imageLinks
  //     if (Object.hasOwnProperty.call(bookImageDict, "medium")) {
  //       newImageLinkList.push(bookImageDict["medium"])
  //       // console.log("saved medium: " + bookImageDict["medium"])
  //     } else if (Object.hasOwnProperty.call(bookImageDict, "small")) {
  //       newImageLinkList.push(bookImageDict["small"])
  //       // console.log("save small: " + bookImageDict["small"])
  //     } else if (Object.hasOwnProperty.call(bookImageDict, "thumbnail")) {
  //       newImageLinkList.push(bookImageDict["thumbnail"])
  //       // console.log("save thumbnail: " + bookImageDict["thumbnail"])
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     newImageLinkList.push("https://cdn.pixabay.com/photo/2018/01/04/15/51/404-error-3060993_1280.png")
  //     console.log("save: Defualt")
  //   }
  // }


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
    newObjectkGetter,
  };
};

export default Search;
