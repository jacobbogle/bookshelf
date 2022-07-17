<template>
  <div id="wrapper">
    <h1>Login</h1>
    <h2> somefunction </h2>
    <form class="centered">
      <label for="username">Username</label>
      <input
        v-model="username"
        placeholder="type here..."
        type="text"
        id="username"
        name="name"
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
      <button @click="loginRout()" type="submit">Login</button>
    </form>
    <router-link id="link" to="/register">
      <span>Register</span>
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
      username: "",
      password: "",
      currentUser: "",
    };
  },
  methods: {
    async loginRout() {
      await this.postSession(this.username, this.password)

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
</style>
