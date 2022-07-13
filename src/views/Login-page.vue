<template>
<div id="wrapper">
    <h1>Login</h1>
    <!-- <% if (messages.error) { %>
    <%= messages.error %>
    <% } %> -->
    <form action="/login" method="POST">
        <div>
            <label for="email">Email</label>
            <input v-model="email" placeholder="type here..." type="email" id="email" name="email" required>
        </div>
        <div>
            <label for="password">Password</label>
            <input v-model="password" placeholder="type here..." type="password" id="password" name="password" required>
        </div>
        <button @click="loginFunction" type="submit">Login</button>
    </form>
    <router-link id="link" to="/register"><span>Register</span></router-link>
</div>
</template>

<script>
export default {
data() {
    return {
      email: '',
      password: '',
    };
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

h1, label {
    color:white;
}
</style>