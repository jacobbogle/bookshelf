<template>
  <div id="wrapper">
    <router-link v-if="state.currentUser.length === 0" to="/login"
      ><a>Sign In</a></router-link
    >
    <w-flex v-else align-center class="pr5">
      <w-button icon="mdi mdi-account-circle" xl class="account-button">
      </w-button>
    </w-flex>
    <w-menu
      hide-on-menu-click
      v-show="state.currentUser.length > 0"
      activator=".account-button"
      arrow
    >
      <p class="pr2">{{ state.currentUser }}</p>
      <router-link to="/login" @click="logOut()"><w-button>Sign Out</w-button></router-link>
    </w-menu>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  setup() {
    const { state, getSession, logOut } = User();
    return { state, getSession, logOut };
  },
  data() {
    return {};
  },
  methods: {
  },
  async mounted() {
    await this.getSession();
    if (this.state.responseStatus == 200) {
      this.$router.push({path: '/'})
    } else {
      this.$router.push({path: '/login'})
    }
  }
};
</script>

<style scoped>
a {
  cursor: pointer;
  font-size: large;
  color: rgb(201, 201, 201);
  text-decoration: none;
  text-align: center;
}

p {
  text-align: center;
}
</style>
