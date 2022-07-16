//import { ref } from "vue";



const Register = () => {
    // const state = ref({
        
    //   });


    const postUser = async function (email, name, password) {
        let user = {
            username: email,
            fullname: name,
            password: password,
        };

        console.log(user);

        let response = await fetch("http://localhost:3000/users", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
        });

        let body = response.json();
        console.log(body);
        console.log(response.status);
        if (response.status == 201) {
            console.log("successful user created");
        } else {
            console.log("Some error in /POST users");
        }
    }

    return {
        postUser
    }
}

export default Register;