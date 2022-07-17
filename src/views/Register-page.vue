<template>
  <div id="wrapper">
    <h1>Register</h1>
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
      <label for="email">Email</label>
      <input
        v-model="email"
        placeholder="type here..."
        type="email"
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
      <button @click="userRegister()" type="submit">Register</button>
    </form>
    <br>
    <router-link id="link" to="/login">
      <a>Login</a>
    </router-link>
  </div>
</template>

<script>
import Register from "../models/register";
export default {
  setup() {
    const {postUser} = Register();
    return {postUser};
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    userRegister() {
      this.postUser(this.email, this.username, this.password)
    }
  },
};
</script>

<style>
#wrapper {
  grid-column: 1/-1;
  grid-row: 2/3;
}

h1 {
  text-align: center;
}

#link {
  display: flex;
  align-content: center;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
}

a {
  font-weight: 700;
  color: rgb(201, 201, 201);
  text-decoration: none;
}

h1,
label {
  color: white;
}
.centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
}
</style>
