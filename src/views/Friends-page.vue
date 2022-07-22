<template>
  <div id="wrapper">
    <h1 v-if="friendsExist">Friends</h1>
    <div v-for="(friend, index) in friends" :key="index">
      <h2 v-if="friend.value == 3">{{ friend.name }}</h2>
    </div>

    <h1 v-if="receivedsExist">Received Friend Requests</h1>
    <div v-for="(friend, index) in friends" :key="index">
      <h2 v-if="friend.value == 1">{{ friend.name }}</h2>
      <button v-if="friend.value == 1" @click="acceptFriendRequest(friend.id)">
        Add Friend
      </button>
      <button v-if="friend.value == 1" @click="denyFriendRequest(friend.id)">
        Deny Friend
      </button>
    </div>

    <h1 v-if="sentsExist">Sent Friend Requests</h1>
    <div v-for="(friend, index) in friends" :key="index">
      <h2 v-if="friend.value == 2">{{ friend.name }}</h2>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},

  data() {
    return {
      friends: [],
    };
  },
  methods: {
    async getFriends() {
      let response = await fetch("http://localhost:3000/friends", {
        credentials: "include",
      });
      let data = await response.json();
      this.friends = data;
      console.log(data);
    },

    async acceptFriendRequest(id) {
      let response = await fetch(`http://localhost:3000/friends/accept/${id}`, {
        method: "PATCH",
        credentials: "include",
      });
      let data = await response.json();
      console.log("acceptFriendRequest Response: ", data);
      this.getFriends();
    },

    async denyFriendRequest(id) {
      let response = await fetch(`http://localhost:3000/friends/deny/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      let data = await response.json();
      console.log("denyFriendRequest Resposne: ", data);
      this.getFriends();
    },
  },
  computed: {
    friendsExist: function () {
      let aFriendExists = false;
      for (const friend in this.friends) {
        if (this.friends[friend].value == 3) {
          aFriendExists = true;
          return aFriendExists;
        }
      }
      return aFriendExists;
    },

    receivedsExist: function () {
      let receivedFriend = false;
      for (const friend in this.friends) {
        if (this.friends[friend].value == 1) {
          receivedFriend = true;
          return receivedFriend;
        }
      }
      return receivedFriend;
    },

    sentsExist: function () {
      let sentFriend = false;
      for (const friend in this.friends) {
        if (this.friends[friend].value == 2) {
          sentFriend = true;
          return sentFriend;
        }
      }
      return sentFriend;
    },
  },

  created() {
    this.getFriends();
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
