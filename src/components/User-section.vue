<template>
  <div id="wrapper">
    <router-link v-if="state.currentUser.length === 0" to="/login"
      ><a>Sign In</a></router-link
    >
    <a v-else @click="logOut()">Sign Out</a>
    <p>{{ state.currentUser }}</p>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  setup() {
    const { state, getSession } = User();
    return { state, getSession };
  },
  data() {
    return {};
  },
  methods: {
    async logOut() {
      try {
        let response = await fetch("http://localhost:3000/logout", {
          credentials: "include",
        });
        if (response.status == 200) {
          console.log("successful logout");
        }
        this.getSession();
      } catch (err) {
        console.log("some error", err);
      }
      this.state.currentUser = ""
      this.getsession()
    },
  },

  async mounted() {
    await this.getSession();
  },
};
</script>

<style scoped>
a {
  cursor: pointer;
}

a,
p {
  color: rgb(201, 201, 201);
  text-decoration: none;
}
</style>
