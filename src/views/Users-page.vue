<template>
  <div id="wrapper">
    <h1>Users</h1>
    <input type="text" placeholder="search" v-model="searchInput" />
    <div v-for="(user, index) in filteredUsers" :key="index">
      <h2 @click="getUsersBookshelf(user._id)">
        {{ user.username }}
      </h2>
      <button @click="sendFriendRequest(user._id)">Send Friend Request</button>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},

  data() {
    return {
      users: [],
      searchInput: "",
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

    async sendFriendRequest(userid) {
      let response = await fetch(
        `http://localhost:3000/friends/send/${userid}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      let data = await response.json();
      console.log("sendFriendRequest: ", data);
    },
  },
  computed: {
    filteredUsers: function () {
      var usersArray = [...this.users];
      var searchString = this.searchInput;

      searchString = searchString.trim().toLowerCase();

      usersArray = usersArray.filter((user) => {
        if (user.username.toLowerCase().indexOf(searchString) != -1) {
          return user;
        }
      });
      return usersArray;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  border-bottom: 1px solid white;
  margin-bottom: 50px;
}

h2 {
  color: white;
  text-align: center;
}

button {
  margin-bottom: 50px;
}
</style>
