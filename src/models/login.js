// import { ref } from "vue";

const Login = () => {
  // const state = ref({
  //   currentUser: "",
  // });

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
      console.log("SUCCESSFUL LOGIN ATTEMPT")
      if (response.status == 201) {
        //let data = await response.json();
        console.log("SUCCESSFUL LOGIN ATTEMPT");
        // getSession();
      } else if (response.status == 401) {
        console.log("UNSUCCESSFUL LOGIN ATTEMPT");
      }
    } catch (error) {
      console.log(
        "Some other error in POST /session, now the error: " + error,

      );
    }
  };

  return {
    postSession,
  };
};

export default Login;
