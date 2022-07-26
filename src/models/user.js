import { ref } from "vue";

const User = () => {
  const state = ref({
    currentUser: "",
  });

  const stateSec = ref({
    currentUser: "",
  });

  const getSession = async function () {
    let response = await fetch("http://localhost:3000/session", {
      credentials: "include",
    });
    if (response.status == 200) {
      console.log("LOGGED IN");
      let data = await response.json();
      state.value.currentUser = data.username;
      stateSec.value.currentUser = data.username;
      this.$router.push({ path: "/", replace: true });
    } else if (response.status == 401) {
      state.value.currentUser = "";
      stateSec.value.currentUser = "";
      console.log("NOT LOGGED IN");
      this.$router.push({ path: "/login", replace: true });
    } else {
      state.value.currentUser = "";
      stateSec.value.currentUser = "";
      console.log("SOME ERROR IN GET /session", response.status, response);
    }
  };

  return {
    getSession,
    state,
    stateSec
  };
};

export default User;
