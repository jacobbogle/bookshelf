<template>
  <div id="wrapper" @dblclick="closeAllBooks()">
    <h1>Search Page</h1>
    <div ref="test" id="searchSection">
      <input
        type="text"
        placeholder="Search"
        @keyup.enter="searchByTitle(), closeAllBooks(), searchReset()"
        v-model="state.searchTitle"
      />
      <button v-on:click="searchByTitle()">Search</button>
      <a id="scanner">
        <img
          @click="toScanner()"
          src="https://static.thenounproject.com/png/473299-200.png"
          alt="scanner"
        />
      </a>
    </div>
    <br />
    <div id="bookCollection">
      <div
        class="book-recommend"
        v-for="(book, index) in state.books"
        :key="index"
      >
        <div ref="bookBox" class="book-box" @click="bookClickHandler(index)">
          <img ref="image" class="book-image" :src="imageTest(book)" />
        </div>
        <div style="visibility: hidden" ref="bookContent" class="book-content">
          <div class="text-content">
            <h2 ref="title">{{ book.volumeInfo.title }}</h2>
            <!-- Book Title -->
            <h3 :value="book.volumeInfo.averageRating" ref="rating">
              Rating: {{ numGive(book.volumeInfo.averageRating) }}
            </h3>
            <!-- Book Rating -->
            <h4 ref="authors">By: {{ textGive(book.volumeInfo.authors) }}</h4>
            <!-- Author's Name -->
            <a
              ref="link"
              class="Amazon"
              :href="`${book.volumeInfo.infoLink}`"
              target="_blank"
              rel="noopener noreferrer"
              >Google Link</a
            ><!-- Product Link -->
            <button @click="serveBook(index), postBook(bookObject)">
              Save Book
            </button>
            <!-- button to add to database -->
            <p ref="description" v-html="snippetGive(book)"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../models/search";
export default {
  setup() {
    const { state, searchByTitle, postBook } = Search();
    return { state, searchByTitle, postBook };
  },
  data() {
    return {
      isBookOpen: false,
      IndexOfOpenedBook: null,
      bookObject: {
        image: "",
        title: "",
        rating: null,
        authors: "",
        link: "",
        description: "",
        isbn: "",
      },
    };
  },
  methods: {
    toScanner() {
      this.$router.push({ path: "/scanner" });
    },
    serveBook(index) {
      this.bookObject.image = String(this.$refs.image[index].src);
      this.bookObject.title = this.$refs.title[index].innerHTML;
      this.bookObject.rating = this.numGive(
        this.state.books[index].volumeInfo.averageRating
      );
      this.bookObject.authors = this.textGive(
        this.state.books[index].volumeInfo.authors
      );
      this.bookObject.link = this.$refs.link[index].href;
      this.bookObject.description = this.snippetGive(
        this.state.books[index]
      );
      this.bookObject.isbn = this.isbnGive(
        this.state.books[index].volumeInfo.industryIdentifiers
      );
    },
    isbnGive(text) {
      try {
        let isbn;
        for (const i in text) {
          if (text[i].type == "ISBN_13") {
            return text[i].identifier;
          } else if (text[i].type == "ISBN_10") {
            isbn = text[i].identifier;
          }
        }
        return isbn;
      } catch (error) {
        return this.bookObject.link;
      }
    },
    textGive(text) {
      try {
        let goodText = text.join(" ");
        return goodText;
      } catch (error) {
        return "N/A";
      }
    },
    snippetGive(book) {
      try {
        let snippet = book.volumeInfo.description;
        return snippet;
      } catch (error) {
        return book.searchInfo.textSnippet;
      }
    },
    numGive(num) {
      try {
        if (num > 0) {
          return num + " // 5";
        } else {
          return "N/A";
        }
      } catch (error) {
        return "N//A";
      }
    },
    imageTest(book) {
      try {
        let thumbnail = book.volumeInfo.imageLinks.thumbnail;
        return thumbnail;
      } catch (error) {
        return "https://cdn.pixabay.com/photo/2018/01/04/15/51/404-error-3060993_1280.png";
      }
    },
    searchReset() {
      this.isBookOpen = false;
      this.IndexOfOpenedBook = null;
    },
    bookClickHandler(index) {
      this.$emit("openBookContent");
      if (this.IndexOfOpenedBook != index && this.isBookOpen === false) {
        this.openBookContent(index);
        this.IndexOfOpenedBook = index;
        this.isBookOpen = true;
        this.IndexOfOpenedBook = index;
      } else if (this.IndexOfOpenedBook === index && this.isBookOpen === true) {
        this.closeBookContent(index);
        this.isBookOpen = false;
      } else if (
        this.IndexOfOpenedBook === index &&
        this.isBookOpen === false
      ) {
        this.openBookContent(index);
        this.isBookOpen = true;
      } else {
        try {
          this.closeBookContent(this.IndexOfOpenedBook);
          this.openBookContent(index);
          this.IndexOfOpenedBook = index;
        } catch (error) {
          null;
        }
      }
    },
    openBookContent(index) {
      this.$emit("openBookContent");
      if (window.innerWidth <= 684) {
        this.$refs.bookContent[index].style.height = "390px";
      } else {
        this.$refs.bookContent[index].style.width = "256px";
      }
      this.$refs.bookContent[index].style.visibility = "visible";
    },
    closeBookContent(index) {
      this.$emit("closeBookContent");
      if (window.innerWidth <= 684) {
        this.$refs.bookContent[index].style.width = "256px";
        this.$refs.bookContent[index].style.height = "0px";
      } else {
        this.$refs.bookContent[index].style.width = "0px";
      }
      this.$refs.bookContent[index].style.visibility = "hidden";
    },
    closeAllBooks() {
      if (this.isBookOpen === true) {
        this.closeBookContent(this.IndexOfOpenedBook);
        this.isBookOpen = false;
      }
    },
  },
  created() {},
};
</script>

<style scoped>
@import "../book-data/style.css";

#searchSection {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

#wrapper {
  grid-column: 1/-1;
  grid-row: 2/3;
}

#bookCollection {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
}

#bookCollection > * {
  margin: 0.5rem;
}

h1 {
  color: white;
}

#scanner {
  width: 35px;
  background-color: white;
  cursor: pointer;
}

#scanner img {
  width: inherit;
  height: inherit;
}
</style>
