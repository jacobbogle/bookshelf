<template>
  <div id="wraper">
    <p style="color: white">username</p>
    <router-link to="/login"><span>Acount</span></router-link>
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
  mounted() {
    this.getSession();
  },
}
</script>

<style scoped>
span {
  font-weight: 700;
  color: rgb(201, 201, 201);
  text-decoration: none;
}
</style>
