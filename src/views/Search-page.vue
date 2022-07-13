<template>
  <div id="wrapper" @dblclick="closeAllBooks()">
    <div ref="test" id="searchSection">
      <h1>Search Page</h1>
      <input
        type="text"
        placeholder="Search"
        @keyup.enter="searchByTitle(),closeAllBooks(), searchReset()"
        v-model="state.searchTitle"
      />
      <button v-on:click="searchByTitle()">Search</button>
    </div>
    <br />
    <div id="bookCollection" >
      <div
        class="book-recommend"
        v-for="(book, index) in state.books.items"
        :key="index"
      >
        <div
          ref="bookBox"
          class="book-box"
          @click="bookClickHandler(index)"
        >
          <img
            ref="image"
            class="book-image"
            :src="imageTest(book)"
          />
        </div>
        <div
          style="visibility: hidden"
          ref="bookContent"
          class="book-content"
        >
          <div class="text-content">
            <h2 ref="title">{{ book.volumeInfo.title }}</h2>
            <!-- Book Title -->
            <h3 :value="book.volumeInfo.averageRating" ref="rating">Rating: {{ numGive(book.volumeInfo.averageRating) }}</h3>
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
            <button @click="serveBook(index), postBook(this.bookObject)">Save Book</button>
            <!-- button to add to database -->
            <p ref="description" v-html="snippetGive(book)" ></p>
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
      }
    };
  },
  methods: {
    serveBook(index) {
      this.bookObject.image = String(this.$refs.image[index].src)
      this.bookObject.title = this.$refs.title[index].innerHTML
      this.bookObject.rating = this.numGive(this.state.books.items[index].volumeInfo.averageRating)
      this.bookObject.authors = this.textGive(this.state.books.items[index].volumeInfo.authors)
      this.bookObject.link = this.$refs.link[index].href
      this.bookObject.description = this.snippetGive(this.state.books.items[index])
      console.log(this.bookObject)
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
        let snippet = book.searchInfo.textSnippet;
        return snippet;
      } catch (error) {
        return book.volumeInfo.description;
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
        let thumbnail = book.volumeInfo.imageLinks.thumbnail
        return thumbnail
      } catch (error) {
        return "https://cdn.pixabay.com/photo/2018/01/04/15/51/404-error-3060993_1280.png"
      }
    },
    searchReset() {
      this.isBookOpen = false
      this.IndexOfOpenedBook = null
    },
    bookClickHandler(index) {
      this.$emit("openBookContent");
      if (this.IndexOfOpenedBook != index && this.isBookOpen === false) {
        this.openBookContent(index)
        this.IndexOfOpenedBook = index
        this.isBookOpen = true
        this.IndexOfOpenedBook = index
      } else if (this.IndexOfOpenedBook === index && this.isBookOpen === true) {
        this.closeBookContent(index)
        this.isBookOpen = false
      } else if (this.IndexOfOpenedBook === index && this.isBookOpen === false) {
        this.openBookContent(index)
        this.isBookOpen = true
      } else {
        try {
          this.closeBookContent(this.IndexOfOpenedBook)
          this.openBookContent(index)
          this.IndexOfOpenedBook = index
        } catch (error) {
          null
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
        this.isBookOpen = false
      }
    }
  }
};
</script>

<style scoped>
@import "../book-objects/style.css";

#searchSection {
  display: flex;
  flex-direction: column;
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
</style>
