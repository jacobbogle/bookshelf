<template>
  <div id="wrapper" @dblclick="closeAllBooks()">
    <div class="user-shelf">
      <div 
        v-for="(shelves, index) in this.books"
        :key="index"
      > 
      <span>{{ Object(index) }}</span>
      <div id="bookCollection">
          <div class="book-recommend"
          v-for="(book, index) in shelves"
          :key="index"
          >
            <div 
              :value="`${index}`"
              ref="bookBox"
              class="book-box"
              @click="bookClickHandler(index)"
            >
              <img
                ref="bookImage"
                :value="`${index}`"
                class="book-image"
                :src="`${book.image}`"
              />
            </div>
            <div
              :value="`${index}`"
              style="visibility: hidden"
              ref="bookContent"
              class="book-content"
            >
              <div :value="`${index}`" class="text-content">
                <h2 ref="title" :value="`${index}`">{{ book.title }}</h2>
                <!-- Book Title -->
                <h3 ref="rating" :value="`${index}`">Rating: {{ book.rating }}</h3>
                <!-- Book Series Name -->
                <h4 ref="authors" :value="`${index}`">By: {{ book.authors }}</h4>
                <!-- Author's Name -->
                <a
                  :value="`${index}`"
                  ref="link"
                  class="Amazon"
                  :href="`${book.link}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Google Link</a
                ><!-- Product Link -->
                <a @click="serveBook(index), postBook(bookObject)"> Add Book</a>
                <p ref="description" v-html="book.description" :value="`${index}`"></p>
                <p ref="isbn" :value="`${index}`">{{ book.isbn }}</p>
              </div>
            </div>
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
    const { postBook } = Search();
    return { postBook };
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
      books: {}
    };
  },
  methods: {
    async getPublicBookShelves() {
      let response = await fetch("http://localhost:3000/bookshelves/public");
      let data = await response.json();
      this.books = data;
      console.log(this.books)
    },
    getUsername() {

    },
    reset() {
      this.isBookOpen = false;
      this.IndexOfOpenedBook = null;
    },
    serveBook(index) {
      //this is not working
      this.bookObject.image = String(this.$refs.image[index].src);
      this.bookObject.title = this.$refs.title[index].innerHTML;
      this.bookObject.rating = this.$ref.rating[index].innerHTML;
      this.bookObject.authors = this.$ref.authors[index].innerHTML;
      this.bookObject.link = this.$refs.link[index].href;
      this.bookObject.description = this.$ref.description[index];
      this.bookObject.isbn = this.$ref.isbn[index].innerHTML;
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
  created() {
    this.reset()
    this.getPublicBookShelves()
  }
}
</script>

<style scoped>
@import "../book-data/style.css";

#wrapper {
  grid-column: 1/-1;
  grid-row: 2/3;
}

#bookCollection {
  grid-column: 1/-1;
  grid-row: 2/3;
  display: flex;
  flex-direction: row;
  /* flex-wrap: wrap; */
  /* justify-content: center;
  align-items: center; */
  height: 425px;
  overflow: hidden;
  padding-bottom: 1rem;
}

#bookCollection > * {
  margin: 0.5rem;
}

#bookCollection:hover {
  overflow-x: scroll;
}

#bookCollection::-webkit-scrollbar {
  width: 15px;
  height: 18px;
}

#bookCollection::-webkit-scrollbar-thumb {
  height: 6px;
  border: 1px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  background-image: linear-gradient(
    to bottom right,
    rgb(52, 52, 105),
    rgb(28, 40, 96)
  );
  border-radius: 10px;
  box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.18),
    inset 1px 1px 0px rgba(0, 0, 0, 0.18);
}

#bookCollection::-webkit-scrollbar-button {
  display: none;
  width: 0;
  height: 0;
}

#bookCollection::-webkit-scrollbar-corner {
  background-color: transparent;
}

span {
  margin-top: 1rem;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content:flex-start;
  color: rgb(201, 201, 201);
  font-family:'OCR A', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

@media only screen and (max-width: 1260px) {

}

@media only screen and (max-width: 684px) {

}
</style>
