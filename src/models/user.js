import { ref } from "vue";

const User = () => {
  const state = ref({
    currentUser: "",
  });

  const getSession = async function () {
    let response = await fetch("http://mongodb+srv://bogle:pleasework@cluster0.86noxeo.mongodb.net/?retryWrites=true&w=majority/session", {
      credentials: "include",
    });
    if (response.status == 200) {
      console.log("LOGGED IN");
      let data = await response.json();
      state.value.currentUser = data.username;
      this.$router.push({ path: "/", replace: true });
    } else if (response.status == 401) {
      state.value.currentUser = "";
      console.log("NOT LOGGED IN");
      this.$router.push({ path: "/login", replace: true });
    } else {
      state.value.currentUser = "";
      console.log("SOME ERROR IN GET /session", response.status, response);
    }
  };

  return {
    getSession,
    state,
  };
};

export default User;
