<template>
  <div id="wrapper">
    <h1>
      <span>{{ name.username }}</span
      >'s Bookshelf
    </h1>
    <h2>name</h2>
  </div>
</template>

<script>
import name from "@/views/Friends-page";
export default {
  setup() {},

  data() {
    return {
      name,
    };
  },
  methods: {
    // async getBookshelf(id) {
    //   let response = await fetch(`http://localhost:3000/bookshelves/${id}`, {
    //     credentials: "include",
    //   });
    //   let data = await response.json();
    //   console.log(data);
    // },
  },
  created() {
    // this.getBookshelf(id);
  },
};
</script>

<style scoped></style>
