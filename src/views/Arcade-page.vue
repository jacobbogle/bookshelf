<template>
<div>
  <h1>Search Page</h1>
  <input type="text" placeholder="Search" v-model="state.searchTitle">
  <button v-on:click="searchByTitle()">Search</button>
  <br>
</div>
</template>

<script>
import Search from "../models/search";
//import { onMounted } from 'vue'
export default {
setup() {
  const {state, searchByTitle} = Search()
  return {state, searchByTitle}
}

}
</script>

<style scoped>
h1 {
  color: white;
}
  
</style>