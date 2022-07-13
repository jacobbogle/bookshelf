<template>
  <div id="wrapper" @dblclick="closeAllBooks()">
    <div id="bookCollection">
      <div
        class="book-recommend"
        v-for="(book, index) in state.books"
        :key="index"
      >
        <div :value="`${index}`" ref="bookBox" class="book-box" @click="bookClickHandler(index)">
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
            <h2>{{ book.title }}</h2>
            <!-- Book Title -->
            <h3>Rating: {{ numGive(book.rating) }}</h3>
            <!-- Book Series Name -->
            <h4>By: {{ book.authors }}</h4>
            <!-- Author's Name -->
            <a
              :value="`${index}`"
              ref="amazon"
              class="Amazon"
              :href="`${book.link}`"
              target="_blank"
              rel="noopener noreferrer"
              >Google Link</a
            ><!-- Product Link -->
            <p v-html="book.description" :value="`${index}`"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookShelf from "../models/books";
export default {
  setup() {
    const { state, getBooks } = BookShelf();
    return { state, getBooks };
  },
  data() {
    return {
      isBookOpen: false,
      IndexOfOpenedBook: null,
    };
  },
  methods: {
    numGive(num) {
      try {
        if (num > 0) {
          return num + " // 5";
        } else {
          return "N/A";
        }
      } catch (error) {
        return "N/A";
      }
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
      this.$refs.amazon[index].style.visibility = "visible";
    },
    closeBookContent(index) {
      this.$emit("closeBookContent");
      if (window.innerWidth <= 684) {
        this.$refs.bookContent[index].style.width = "256px";
        this.$refs.bookContent[index].style.height = "0px";
      } else {
        this.$refs.bookContent[index].style.width = "0px";
      }
      this.$refs.amazon[index].style.visibility = "hidden";
      this.$refs.bookContent[index].style.visibility = "hidden";
    },
    closeAllBooks() {
      if (this.isBookOpen === true) {
        this.closeBookContent(this.IndexOfOpenedBook);
        this.isBookOpen = false
      }
    }
  },
  created: function () {
    this.getBooks();
  },
};
</script>

<style scoped>
@import "../book-objects/style.css";

#getBooks {
  align-self: center;
}

#wrapper {
  grid-column: 1/-1;
  grid-row: 2/3;
}

#bookCollection {
  grid-column: 1/-1;
  grid-row: 2/3;
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
</style>
