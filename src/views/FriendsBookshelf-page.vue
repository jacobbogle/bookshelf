<template>
  <div id="wrapper">
    <h1>Friend's Bookshelf</h1>
  </div>
</template>

<script>
export default {
  setup() {},

  data() {
    return {};
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
