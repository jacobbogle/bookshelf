<template>
  <div id="wrapper">
    <h1>Login</h1>
    <form class="centered">
      <label for="email">Email</label>
      <input
        v-model="email"
        placeholder="type here..."
        type="text"
        id="email"
        name="email"
        required
      />
      <label for="password">Password</label>
      <input
        v-model="password"
        placeholder="type here..."
        type="password"
        id="password"
        name="password"
        required
      />
      <button @click="loginFunc()" type="submit">Sign In</button>
    </form>
    <br>
    <p>Don't have an acount?</p>
    <router-link id="link" to="/register">
      Sign Up
    </router-link>
    <!-- <a href="http://localhost:3000/auth/google">Google Sign In</a> -->
  </div>
</template>

<script>
import Login from "../models/login";

export default {
  setup() {
    const { state, postSession } = Login();
    return { state, postSession };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loginFunc() {
      this.postSession(this.email, this.password)
    },
  }
}
</script>

<style scoped>
#wrapper {
  grid-column: 1/-1;
  grid-row: 2/3;
}

h1 {
  text-align: center;
}

h2 {
  color: white;
  text-align: center;
}

#link {
  display: flex;
  align-content: center;
  justify-content: center;
}

.centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
}

h1,
label {
  color: white;
}

p {
  text-align: center;
  cursor: default;
}

a, p {
  font-weight: 700;
  color: rgb(201, 201, 201);
  text-decoration: none;
}
</style>
