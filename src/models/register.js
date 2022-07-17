
const Register = () => {
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
        if (response.status == 201) {
            console.log("successful user created");
            this.$router.push({ path: "/login", replace: true });
        } else {
            console.log("Some error in /POST users");
        }
    }

    return {
        postUser
    }
}

export default Register;