import { ref } from "vue";

const Register = () => {
    const state = ref({
        responseStatus: null
      });


    const postUser = async function (email, name, password) {
        let user = {
            email: email,
            username: name,
            password: password,
        };
        let response = await fetch("http://localhost:3000/users", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
        })
        console.log(response.status)
        if (response.status == 201) {
            state.value.responseStatus = response.status
            console.log("successful user created");
            this.$router.push({ path: "/login", replace: true });
        } else if (response.status == 500) {
            state.value.responseStatus = response.status
            console.log("email or username already exists");
        } 
    }

    return {
        postUser,
        state
    }
}

export default Register;