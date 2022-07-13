<template>
  <div id="wrapper">
    <h1>Login</h1>
    <h2>{{ currentUser }}</h2>
    <!-- <% if (messages.error) { %>
    <%= messages.error %>
    <% } %> -->
    <!-- <form action="/login" method="POST"> -->
    <div class="centered">
      <div>
        <!-- <label for="email">Email</label> -->
        <input
          v-model="email"
          placeholder="type here..."
          type="text"
          id="email"
          name="email"
          required
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          v-model="password"
          placeholder="type here..."
          type="password"
          id="password"
          name="password"
          required
        />
        <button @click="postSession()" type="submit">Login</button>
      </div>
    </div>
    <!-- </form> -->
    <router-link id="link" to="/register"><span>Register</span></router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      currentUser: "",
    };
  },
  methods: {
    postSession: async function () {
      let loginCredentials = {
        username: this.email,
        password: this.password,
      };

      let response = await fetch("http://localhost:3000/session", {
        method: "POST",
        body: JSON.stringify(loginCredentials),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status == 201) {
        console.log("SUCCESSFUL LOGIN ATTEMPT");
        this.currentUser = loginCredentials.username;
      } else if (response.status == 401) {
        console.log("UNSUCCESSFUL LOGIN ATTEMPT");
      } else {
        console.log(
          "Some other error in POST /session",
          response.status,
          response
        );
      }
    },
  },
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

form {
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

.centered {
  text-align: center;
}
</style>
