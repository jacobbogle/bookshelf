<template>
  <div id="wrapper">
    <h1>Hello</h1>
    <w-card  content-class="pa0">
      <div class="message-box">
        <w-transition-fade>
          <w-alert
            v-if="form.submitted === true"
            success
            no-border
            class="my0 text-light">
            Trying to sign you in!
          </w-alert>

          <w-alert
            v-else-if="form.submitted === 'wrongPassword'" 
            error
            no-border
            class="my0 text-light">
          Wrong Password</w-alert>

          <w-alert
            v-else-if="form.submitted === false"
            error
            no-border
            class="my0 text-light">
          Hmmm... Something went wrong. Try again.
          </w-alert>
        </w-transition-fade>
      </div>

      <w-form
        v-model="form.valid"
        :v-model:errors-count="form.errorsCount"
        @validate="onValidate"
        @success="onSuccess"
        class="px8 pt2 pb12">


        <w-input class="mb3"
          label="Email"
          v-model="email"
          type="email"
          :validators="[validators.required]"
          inner-icon-left="mdi mdi-email"
          bg-color="blue-light5"
          outline
          shadow
          >
        </w-input>

        <w-input class="mb2"
          v-model="password"
          label="Password"
          :validators="[validators.required]"
          :type="isPassword ? 'password' : 'text'"
          :inner-icon-right="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
          @click:inner-icon-right="isPassword = !isPassword"
          bg-color="blue-light5"
          @mouseup="loginFunc()">
        </w-input>

        <w-flex wrap align-center justify-end class="mt4">
          <w-checkbox
            required
            :validators="[validators.consent]"
            @click="loginFunc()">
            I agree to the terms & conditions
          </w-checkbox>

          <div class="spacer" />

          <w-button
            bg-color="warning"
            type="reset"
            @click="form.sent = false"
            class="my1 mr2">
            Reset
          </w-button>

          <w-button
            @click="loginFunc()"
            type="submit"
            :disabled="form.valid === false"
            :loading="form.submitted === true && !form.sent"
            class="my1">
            Sign In
          </w-button>
        </w-flex>
      </w-form>

      <w-notification
        v-model="form.sent"
        success
        transition="bounce"
        absolute
        plain
        round
        bottom>
        Success!!
      </w-notification>
    </w-card>

    <br>
    <p>Don't have an acount?</p>
    <router-link id="link" to="/register">
      Sign Up
    </router-link>
    <button @click="google()" >Google Sign In</button>
  </div>
</template>

<script>
import Login from "../models/login";
import User from "../models/user"

export default {
  setup() {
    const { state, postSession } = Login();
    const { getSession } = User();
    return { state, postSession, getSession };
  },
  data() {
    return {
      email: "",
      password: "",
      isPassword: true,
      form: {
        valid: null,
        submitted: null,
        sent: false,
        errorsCount: 0
      },
      validators: {
        required: value => !!value || 'This field is required',
        consent: value => !!value || 'You must agree'
      }
    }
  },
  methods: {
    loginFunc() {
      this.postSession(this.email, this.password)
    },
    async google() {
      await window.open('http://localhost:3000/auth/google', 'newwindow','width=500,height=600')
    },
    onSuccess () {
      this.form.sent = true
      if (this.state.success === "nice") {
        setTimeout(() => (this.getSession(), 2000))
        // setTimeout(() => (this.$router.go(), 2000))
      }
    },
    onValidate () {
      this.form.sent = false
      this.form.submitted = this.form.errorsCount === 0
      this.loginFunc()
      if (this.state.success === "wrongPassword") {
        setTimeout(() => ( this.form.submitted = false,this.form.sent = false, 2000))
      } else if (this.state.success === "allWrong") {
        setTimeout(() => ( this.form.submitted = "wrongPassword", this.form.sent = false, 2000))
      }
    },
  }
}
</script>
s
<style scoped>
.message-box {min-height: 35px;}


#wrapper {
  grid-column: 1/-1;
  grid-row: 2/3;
}

h1 {
  text-align: center;
}

h2 {
  color: white;
  text-align: center;
}

#link {
  display: flex;
  align-content: center;
  justify-content: center;
}

.centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
}

h1,
label {
  color: white;
}

p {
  text-align: center;
  cursor: default;
}

a, p {
  font-weight: 700;
  color: rgb(201, 201, 201);
  text-decoration: none;
}
</style>
