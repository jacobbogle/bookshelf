import { ref } from "vue";

const Login = () => {

  const state = ref({
    success: null
  })

  const postSession = async function (username, password) {
    try {
      let loginCredentials = {
        
        username: username,
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
      console.log(response.status)
      if (response.status == 201) {
        state.value.success = "nice"
        console.log("SUCCESSFUL LOGIN ATTEMPT");
      } else if (response.status == 401) {
        console.log("UNSUCCESSFUL LOGIN ATTEMPT");
        state.value.success = "allWrong"
      } else if (response.status == 500) {
        state.value.success = "wrongPassword"
      }
      
    } catch (error) {
      console.log(
        "Some other error in POST /session, now the error: " + error,

      );
    }
  };

  return {
    postSession,
    state
  };
};

export default Login;
