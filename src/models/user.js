import { ref } from "vue";

const User = () => {
  const state = ref({
    currentUser: "",
    responseStatus: null,
  });

  const stateSec = ref({
    currentUser: "",
  });

  const getSession = async function () {
    let response = await fetch("/session", {
      method: "GET",
      credentials: "include",
    });
    if (response.status == 200) {
      let data = await response.json();
      state.value.responseStatus = response.status;
      state.value.currentUser = data.username;
      stateSec.value.currentUser = data.username;
    } else if (response.status == 401) {
      state.value.responseStatus = response.status;
      state.value.currentUser = "";
      stateSec.value.currentUser = "";
    } else {
      state.value.currentUser = "";
      stateSec.value.currentUser = "";
      state.value.responseStatus = response.status;
    }
  };

  const logOut = async function () {
    try {
        let response = await fetch("/api/logout", {
          credentials: "include",
        });
        if (response.status == 200) {
          state.value.currentUser = "";
        }
        getSession();
      } catch (err) {
        console.log("some error", err);
      }
  }

  return {
    getSession,
    logOut,
    state,
    stateSec,
  };
};

export default User;
