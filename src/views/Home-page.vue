<template>
  <div id="wrapper" @dblclick="closeAllBooks()">
    <h1>Public Shelves</h1>
    <div class="user-shelf">
      <div v-for="(list, obj) in this.books" :key="obj">
        <div v-for="(shelf, user) in list" :key="user">
          <span>{{ Object(user) }}</span>
          <div id="bookCollection">
            <div
              class="book-recommend"
              v-for="(book, index) in shelf"
              :key="index"
            >
              <div
                class="book-box"
                @click="bookClickHandler(`${index + user}`)"
              >
                <img class="book-image" :src="`${book.image}`" />
              </div>
              <div
                style="visibility: hidden"
                :ref="`${index + user}`"
                class="book-content"
              >
                <div class="text-content">
                  <h2 ref="title">{{ book.title }}</h2>
                  <!-- Book Title -->
                  <h3 ref="rating">Rating: {{ book.rating }}</h3>
                  <!-- Book Series Name -->
                  <h4 ref="authors">By: {{ book.authors }}</h4>
                  <!-- Author's Name -->
                  <a
                    ref="link"
                    class="Amazon"
                    :href="`${book.link}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Google Link</a
                  ><!-- Product Link -->
                  <a @click="postBook(book)"> Add Book</a>
                  <p ref="description" v-html="book.description"></p>
                  <p ref="isbn">{{ book.isbn }}</p>
                </div>
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
    const { postBook, shuffle } = Search();
    return { postBook, shuffle };
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
      books: {},
    };
  },
  methods: {
    async getPublicBookShelves() {
      let response = await fetch("http://localhost:3000/bookshelves/public");
      let data = await response.json();
      this.books = this.shuffle(data);
    },
    getUsername() {},
    reset() {
      this.isBookOpen = false;
      this.IndexOfOpenedBook = "";
    },
    bookClickHandler(Nindex) {
      this.$emit("openBookContent");
      if (this.IndexOfOpenedBook != Nindex && this.isBookOpen === true) {
        console.log("if");
        this.openBookContent(Nindex);
        this.closeBookContent(this.IndexOfOpenedBook);
        this.isBookOpen = true;
        this.IndexOfOpenedBook = Nindex;
      } else if (
        this.IndexOfOpenedBook === Nindex &&
        this.isBookOpen === true
      ) {
        console.log("else-if");
        this.closeBookContent(Nindex);
        this.isBookOpen = false;
      } else if (
        this.IndexOfOpenedBook === Nindex &&
        this.isBookOpen === false
      ) {
        console.log("else-if: 2");
        this.openBookContent(Nindex);
        this.isBookOpen = true;
      } else {
        console.log("else");
        this.openBookContent(Nindex);
        this.IndexOfOpenedBook = Nindex;
        this.isBookOpen = true;
      }
    },
    openBookContent(Nindex) {
      this.$emit("openBookContent");
      this.$refs[Nindex][0].style.width = "256px";
      this.$refs[Nindex][0].style.visibility = "visible";
    },
    closeBookContent(Nindex) {
      this.$emit("closeBookContent");
      this.$refs[Nindex][0].style.width = "0px";
      this.$refs[Nindex][0].style.visibility = "hidden";
    },
    closeAllBooks() {
      if (this.isBookOpen === true) {
        this.closeBookContent(this.IndexOfOpenedBook);
        this.isBookOpen = false;
      }
    },
  },
  created() {
    this.reset();
    this.getPublicBookShelves();
  },
};
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
  justify-content: flex-start;
  color: rgb(201, 201, 201);
  font-family: "OCR A", "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

@media only screen and (max-width: 684px) {
  .book-recommend {
    flex-direction: row;
  }

  .book-content {
    height: 390px;
    width: 0px;
  }
}
</style>
