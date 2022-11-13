import { ref } from "vue";

const Login = () => {

  const state = ref({
    responseStatus: null
  });

  const postSession = async function (username, password) {
    try {
      let loginCredentials = {
        username: username,
        password: password,
      };
  
      let response = await fetch("http://mongodb+srv://bogle:pleasework@cluster0.86noxeo.mongodb.net/?retryWrites=true&w=majority/session", {
        method: "POST",
        body: JSON.stringify(loginCredentials),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(response.status)
      if (response.status == 201) {
        state.value.responseStatus = response.status
        console.log("SUCCESS!! EVERYTHING RIGHT!!");
        this.$router.go({ path: '/' })
      } else if (response.status == 401) {
        state.value.responseStatus = response.status
        console.log("WRONG PASSWORD");
      } else if (response.status == 500) {
        state.value.responseStatus = response.status
        console.log("ERVERYTHING IS WRONG");
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
