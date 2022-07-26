<template>
  <div id="wrapper">
    <router-link v-if="state.currentUser.length === 0" to="/login"
      ><a>Sign In</a></router-link
    >
    <w-flex v-else align-center class="pr5">
      <p class="pr2"></p>
      <w-button
      icon="mdi mdi-account-circle"
      xl
      class="account-button">
      </w-button>
    </w-flex>
    <w-menu hide-on-menu-click v-show="state.currentUser.length > 0" activator=".account-button" arrow>
      <w-button @click="logOut()">Sign Out</w-button>
    </w-menu>

    
    
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
          this.state.currentUser = ""
        }
        this.getSession();
      } catch (err) {
        console.log("some error", err);
      }
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
  font-size: large;
}

a,
p {
  color: rgb(201, 201, 201);
  text-decoration: none;
}
</style>
