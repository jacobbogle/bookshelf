<template>
  <div id="wrapper">
    <h1>Friends</h1>
    <div v-for="(user, index) in users" :key="index">
      <h1 @click="getUsersBookshelf(user._id)">{{ user.username }}</h1>
      <button>Request Friendship</button>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},

  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getUsers() {
      let response = await fetch("http://localhost:3000/users", {
        credentials: "include",
      });
      let data = await response.json();
      this.users = data;
      console.log(data);
    },

    async getUsersBookshelf(userid) {
      let response = await fetch(
        `http://localhost:3000/bookshelves/${userid}`,
        {
          credentials: "include",
        }
      );

      let data = await response.json();
      console.log("this users bookshelf is: ", data);
    },
  },

  created() {
    this.getUsers();
  },
};
</script>
<style scoped>
@import "../book-data/style.css";
#wrapper {
  grid-column: 1/-1;
  grid-row: 2/3;
}
button {
}
</style>
