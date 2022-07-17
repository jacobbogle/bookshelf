import { ref } from "vue";

const User = () => {
  const state = ref({
    currentUser: "",
    loggedIn: false
  });

  const getSession = async function () {
    let response = await fetch("http://localhost:3000/session", {
      credentials: "include",
    });
    if (response.status == 200) {
      console.log("LOGGED IN");
      let data = await response.json();
      state.value.currentUser = data.username
      state.value.loggedIn = true
      this.$router.push({ path: "/books", replace: true });
    } else if (response.status == 401) {
      console.log("NOT LOGGED IN");
      state.value.loggedIn = false
      this.$router.push({ path: "/login", replace: true });
    } else {
      console.log("SOME ERROR IN GET /session", response.status, response);
      state.value.loggedIn = false
    }
  };

  return {
    getSession,
    state,
  };
};

export default User;
