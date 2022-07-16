<template>
  <div id="wraper">
    <p style="color: white">{{ state.currentUser }}</p>
    <router-link to="/register"><span>Acount</span></router-link>
  </div>
</template>

<script>
import IsLoggedIn from "../middleware/getSession";

export default {
  setup() {
    const { state, getSession } = IsLoggedIn();
    return { state, getSession };
  },
  data() {
    return {
      userName: "",
    };
  },
  created: function () {
    this.getSession();
    this.userName = this.state.currentUser;
  },
};
</script>

<style scoped>
span {
  font-weight: 700;
  color: rgb(201, 201, 201);
  text-decoration: none;
}
</style>
