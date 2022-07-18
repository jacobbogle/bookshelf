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
    <SearchResults />
  </div>
</template>

<script>
import Search from "../models/search";
import SearchResults from "@/components/Search-section.vue";
export default {
  setup() {
    const {state, searchByTitle } = Search();
    return {state, searchByTitle };
  },
  components: {
    SearchResults,
  },
  methods: {
    toScanner() {
      this.$router.push({ path: "/scanner" });
    },
    searchReset() {
      this.isBookOpen = false;
      this.IndexOfOpenedBook = null;
    },
    closeAllBooks() {
      if (this.isBookOpen === true) {
        this.closeBookContent(this.IndexOfOpenedBook);
        this.isBookOpen = false;
      }
    },
  }
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
