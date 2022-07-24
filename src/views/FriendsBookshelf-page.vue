<template>
  <div id="wrapper">
    <h1><span></span>'s Bookshelf</h1>
    <h2>name</h2>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "FriendsBookshelf",
  setup() {},

  data() {
    return {
      id: "",
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  methods: {
    navigate() {
      router.go(-1);
    },
    // async getBookshelf(id) {
    //   let response = await fetch(`http://localhost:3000/bookshelves/${id}`, {
    //     credentials: "include",
    //   });
    //   let data = await response.json();
    //   console.log(data);
    // },
  },
};
</script>

<style scoped></style>
