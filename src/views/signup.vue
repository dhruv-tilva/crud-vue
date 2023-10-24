<template>
  <form @submit.prevent="login">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Name</label>
      <input type="text" class="form-control" id="exampleInputUser" aria-describedby="emailHelp" v-model="userName">
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
    </div>
    <div class="mb-3">
      <router-link to="/login">Already SignIn?</router-link>
    </div>
    <button ref="signup" type="submit" class="btn">Sign Up</button>
  </form>
</template>

<script>
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebase.js'
export default {
  data() {
    return {
      email: "",
      password: "",
      userName: ""
    }
  },
  methods: {
    async login() {
      if (this.email && this.password && this.userName) {
        this.$refs.signup.innerText = "Wait..."
        const res = await createUserWithEmailAndPassword(auth, this.email, this.password)
        this.$refs.login.innerText = "Sign Up"
        const name = await updateProfile(auth.currentUser, {
          displayName: this.userName
        })
        if (res && name) {
          this.$router.replace("/login");
          // console.log(res);
        }
      }
    }
  }
}
</script>

<style>
.btn {
  background-color: #6610f2;
  color: white;
}

.btn:hover {
  background-color: #3d0a91;
  color: white;
}

form {
  max-width: 500px;
  height: 350px;
  margin: 0 auto;
  position: relative;
  top: 100px;
}

@media screen and (max-width: 768px) {
  form {
    padding: 0 20px;
  }
}
</style>
