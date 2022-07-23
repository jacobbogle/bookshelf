<template>
  <div id="wrapper">
    <h1>This Book</h1>
      <img
              ref="bookImage"
              
              class="book-image"
              :src="`${state.book.image}`"
            />
      <div
            
            style="visibility: hidden"
            ref="bookContent"
            class="book-content"
          >
            <div  class="text-content">
              <h2>{{ state.book.title }}</h2>
              <!-- Book Title -->
              <h3>Rating: {{ state.book.rating }}</h3>
              <!-- Book Series Name -->
              <h4>By: {{ state.book.authors }}</h4>
              <!-- Author's Name -->
              <a
                
                ref="amazon"
                class="Amazon"
                :href="`${state.book.link}`"
                target="_blank"
                rel="noopener noreferrer"
                >Google Link</a
              ><button @click="postBook(book)">
                Save Book
              </button>
              <!-- Product Link -->
              <p v-html="state.book.description" ></p>
            </div>
          </div>
      <div id="reviews"></div>
  </div>
</template>

<script>
import Search from "../models/search";
import Book from "../models/book";
export default {
  setup() {
    const { postBook } = Search();
    const { state, callBook } = Book();
    return { state, postBook, callBook };
  },
  mounted() {
    this.callBook()
    console.log(this.state.book)
  },
}

</script>

<style scoped>
@import "../book-data/style.css";

#wrapper {
  grid-column: 1/-1;
  grid-row: 2/3;
}

</style>