import { ref } from "vue";
// import { getSession } from "./getSession";

const Login = () => {
  const state = ref({
    currentUser: "",
  });

  const postSession = async function (email, password) {
    let loginCredentials = {
      username: email,
      password: password,
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
      let data = await response.json();
      state.value.currentUser = data.username;
      console.log("SUCCESSFUL LOGIN ATTEMPT");
      // getSession();
    } else if (response.status == 401) {
      console.log("UNSUCCESSFUL LOGIN ATTEMPT");
    } else {
      console.log(
        "Some other error in POST /session",
        response.status,
        response
      );
    }
  };

  return {
    postSession,
  };
};

export default Login;
