<template>
  <div>
    <h1>Search Page</h1>
    <input type="text" placeholder="Search" v-model="state.searchTitle">
    <button v-on:click="searchByTitle()">Search</button>
    <br>
  </div>
</template>

<script>
import SearchBar from "../models/search";
export default {
  setup() {
    const {state, searchByTitle} = SearchBar()
    return {state, searchByTitle}
  }
}
</script>

<style scoped>

h1 {
  color: white;
}

</style>