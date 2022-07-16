<template>
  <div id="wrapper">
    <h1>Login</h1>
    <h2>GetUsernameFromSessionFunction</h2>
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
      <button @click="postSession(email, password)" type="submit">Login</button>
    </form>
    <router-link id="link" to="/register"><span>Register</span></router-link>
  </div>
</template>

<script>
import Login from "../middleware/login";

export default {
  setup() {
    const { state, postSession } = Login();
    return { state, postSession };
  },
  data() {
    return {
      email: "",
      password: "",
      currentUser: "",
    };
  },
  methods: {},
};
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
</style>
