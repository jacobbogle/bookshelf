import { ref } from "vue";

const IsLoggedIn = () => {
  const state = ref({
    currentUser: "",
  });

  const getSession = async function () {
    let response = await fetch("http://localhost:3000/session", {
      credentials: "include",
    });
    if (response.status == 200) {
      console.log("LOGGED IN");
      let data = await response.json();
      console.log(data);
      state.value.currentUser = data.username;
    } else if (response.status == 401) {
      console.log("NOT LOGGED IN");
      let data = await response.json();
      console.log(data);
    } else {
      console.log("SOME ERROR IN GET /session", response.status, response);
    }
  };

  return {
    getSession,
    state,
  };
};

export default IsLoggedIn;
