<template>
    <form @submit.prevent="login">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
        </div>
        <div class="mb-3">
            <a ref="forgotLink" @click.prevent="forgotPassword" href="" style="display: block;">Forgot Password?</a>
            <router-link to="/signup">New User?</router-link>
        </div>
        <button ref="login" type="submit" class="btn">Login</button>
    </form>
</template>

<script>
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase/firebase.js'
import { ref } from 'firebase/database'
export default {
    data() {
        return {
            email: "",
            password: "",
            isLog: false
        }
    },
    methods: {
        async login() {
            try {
                this.$refs.login.innerText = "Wait..."
                const user = await signInWithEmailAndPassword(auth, this.email, this.password);
                this.$refs.login.innerText = "Login"
                if (user) {
                    this.$router.replace("/")
                    localStorage.setItem("user", JSON.stringify(user))
                    localStorage.setItem("token", user.user.accessToken);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async forgotPassword() {
            if (this.email) {
                const pass = await sendPasswordResetEmail(auth, this.email)
                if (pass) {
                    this.$refs.forgotLink.innerText = "Link is send to Reset Password!"
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