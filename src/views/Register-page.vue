<template>
  <div id="wrapper">
    <h1>Register</h1>
    <!-- <% if (messages.error) { %>
    <%= messages.error %>
    <% } %> -->
    <!-- <form> -->
    <div>
      <label for="name">Name</label>
      <input
        v-model="name"
        placeholder="type here..."
        type="text"
        id="name"
        name="name"
        required
      />
    </div>
    <div>
      <label for="email">Email</label>
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
    </div>
    <button @click="registerFunction" type="submit">Register</button>
    <!-- </form> -->
    <router-link id="link" to="/login"><span>Login</span></router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async registerFunction() {
      let user = {
        username: this.email,
        fullname: this.name,
        password: this.password,
      };

      console.log(user);

      let response = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      let body = response.json();
      console.log(body);
      console.log(response.status);
      if (response.status == 201) {
        console.log("successful user created");
      } else {
        console.log("Some error in /POST users");
      }
    },
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

h1,
label {
  color: white;
}
</style>
