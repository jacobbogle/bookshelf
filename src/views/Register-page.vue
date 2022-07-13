<template>
<div id="wrapper">
    <h1>Register</h1>
    <!-- <% if (messages.error) { %>
    <%= messages.error %>
    <% } %> -->
    <form action="/register" method="POST">
        <div>
            <label for="name">Name</label>
            <input v-model="name" placeholder="type here..." type="text" id="name" name="name" required>
        </div>
        <div>
            <label for="email">Email</label>
            <input v-model="email" placeholder="type here..." type="email" id="email" name="email" required>
        </div>
        <div>
            <label for="password">Password</label>
            <input v-model="password" placeholder="type here..." type="password" id="password" name="password" required>
        </div>
        <button @click="registerFunction" type="submit">Register</button>  
    </form>
    <router-link id="link" to="/login"><span>Login</span></router-link>
</div>
</template>

<script>
export default {
data() {
    return {
        name: '',
        email: '',
        password: '',
    };
  }
}
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

h1, label {
    color:white;
}
</style>