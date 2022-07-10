<template>
<div id="wrapper">
  <div id="searchSection">
    <h1>Search Page</h1>
    <input type="text" placeholder="Search" @keyup.enter="searchByTitle()" v-model="state.searchTitle">
    <button v-on:click="searchByTitle()">Search</button>
  </div>
  <br>
  <div id="bookCollection">
    <div class="book-recommend" v-for="(book, index) in state.books.items" :key="index">
      <div ref="bookBox" class="book-box">
        <img class="bookImage" :src="`${book.volumeInfo.imageLinks.thumbnail}`" :alt="`${book.volumeInfo.title}`">
      </div>
      <div ref="bookContent" class="book-content" style=" visibility: visible;">
        <div class="text-content">
          <h2>{{book.volumeInfo.title}}</h2><!-- Book Title -->
          <h3>Rating: {{numGive(book.volumeInfo.averageRating)}}</h3><!-- Book Series Name -->
          <h4>By: {{textGive(book.volumeInfo.authors)}}</h4><!-- Author's Name -->
          <a ref="amazon" class="Amazon" :href="`${book.volumeInfo.infoLink}`" target="_blank" rel="noopener noreferrer">Google Link</a><!-- Product Link -->
          <p>{{book.searchInfo.textSnippet}}</p>
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
    const {state, searchByTitle} = Search()
    return {state, searchByTitle}
  },
  data() {
    return {
      isBookContentOpen: false
      };
  },
  methods: {
    textGive(text) {
      try {
        let goodText = text.join(' ')
        return goodText
      } catch (error) {
        return "N/A"
      }   
    },
    numGive(num){
      try {
        if (num > 0) {
          return num + " // 5"
        } else {
          return "N/A"
        }
      } catch (error) {
        return "N/A"
      }
    },
  }
}
</script>

<style scoped>
@import "../book-objects/style.css";


@media only screen and (max-width: 684px) {
  .book-recommend {
    flex-direction: column;
  }

  .book-content {
    height: 0px;
    width: 148px;
  }
}

img {
  width: 128px;
  height: 197px;
}

.book-content {
  height: 197px;
}

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
  margin: .5rem;
}

h1 {
  color: white;
}
  
</style>