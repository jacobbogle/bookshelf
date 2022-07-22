<template>
<div id="wrapper">
    <img
            ref="bookImage"
            :value="`${index}`"
            class="book-image"
            :src="`${book.image}`"
          />
    <div
          :value="`${index}`"
          style="visibility: hidden"
          ref="bookContent"
          class="book-content"
        >
          <div :value="`${index}`" class="text-content">
            <h2>{{ book.title }}</h2>
            <!-- Book Title -->
            <h3>Rating: {{ book.rating }}</h3>
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
            ><button @click="postBook(bookObject)">
              Save Book
            </button>
            <!-- Product Link -->
            <p v-html="book.description" :value="`${index}`"></p>
          </div>
        </div>
    <div id="reviews"></div>
</div>
</template>

<script>
import Search from "../models/search";
export default {
  setup() {
    const { postBook } = Search();
    return { postBook };
  },
}

</script>

<style>

</style>