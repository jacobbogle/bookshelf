<template>
  <div id="wrapper">
    <router-link v-if="state.currentUser.length === 0" to="/login"><a>Sign In</a></router-link>
    <a v-else >Sign Out</a>
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
    return {

    };
  },
  async mounted() {
    await this.getSession();
  },
}
</script>

<style scoped>
a {
  cursor: pointer;
}

a, p {
  color: rgb(201, 201, 201);
  text-decoration: none;
}
</style>
