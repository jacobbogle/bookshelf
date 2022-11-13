<template>
  <div id="wrapper">
    <h1 class="mt12">Users</h1>
    <w-input id="searchUser" class="mt3 pl3 pr3 mb10" bg-color="secondary" type="text" label="Search" v-model="searchInput" />
    <div v-for="(user, index) in filteredUsers" :key="index">
      <h2 @click="getUsersBookshelf(user._id)">
        {{ user.username }}
      </h2>
      <w-button @click="sendFriendRequest(user._id)">Send Friend Request</w-button>
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
      let response = await fetch("http://mongodb+srv://bogle:pleasework@cluster0.86noxeo.mongodb.net/?retryWrites=true&w=majority/users", {
        credentials: "include",
      });
      let data = await response.json();
      this.users = data;
      console.log(data);
    },

    async getUsersBookshelf(userid) {
      let response = await fetch(
        `http://mongodb+srv://bogle:pleasework@cluster0.86noxeo.mongodb.net/?retryWrites=true&w=majority/bookshelves/${userid}`,
        {
          credentials: "include",
        }
      );

      let data = await response.json();
      console.log("this users bookshelf is: ", data);
    },

    async sendFriendRequest(userid) {
      let response = await fetch(
        `http://mongodb+srv://bogle:pleasework@cluster0.86noxeo.mongodb.net/?retryWrites=true&w=majority/friends/send/${userid}`,
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

#searchUser {
  width: 100%;
  max-width: 500px;
}

h1 {
  color: rgb(201, 201, 201);
}

h2 {
  color: rgb(201, 201, 201);
  text-align: center;
}

button {
  margin-bottom: 50px;
}
</style>
