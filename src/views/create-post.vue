<template>
    <header class="header">
        <h4 style="display: inline-block;">Welcome <h4 style="display: inline-block; color: #3d0a91; font-weight: bolder;"
                v-if="isLogin">{{
                    user.user.displayName }}</h4>
        </h4>
        <div class="buttons">
            <!-- <button ref="profileBtn" class="btn">Profile<i class="fa-solid fa-user profile-icon"></i></button> -->
            <button class="btn" @click="cancelClick">Cancel</button>
        </div>
        <!-- <div class="buttons" v-else>
            <button class="btn" @click="goToSignUp">Signup<i class="fa-solid fa-user-plus profile-icon"></i></button>
            <button class="btn" @click="goToLogin">Login<i class="fa-solid fa-right-to-bracket profile-icon"></i></button>
        </div> -->
    </header>
    <form @submit.prevent="sendData">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Title</label>
            <input type="text" class="form-control" id="exampleInputUser" aria-describedby="emailHelp" v-model="title">
        </div>
        <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"
                v-model="desc"></textarea>
            <label for="floatingTextarea2">Comments</label>
        </div>
        <button class="btn">Create</button>
        <!-- <button class="btn">Update</button> -->
    </form>
</template>

<script>
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from '../firebase/firebase.js'
import { signOut } from 'firebase/auth'
import { getDatabase, ref, onValue, child, get } from "firebase/database";

export default {
    data() {
        return {
            title: "",
            desc: ""
        }
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem("user"));
        },
        isLogin() {
            if (localStorage.getItem("token")) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        cancelClick() {
            this.$router.replace("/")
        },
        async sendData() {

            // Add a new document in collection "cities" with ID 'LA'

            if (this.title && this.desc && this.user) {
                const data = {
                    title: this.title,
                    desc: this.desc,
                    name: this.user.user.displayName
                };
                const postCol = await collection(db, 'post')
                const res = await setDoc(doc(postCol), data)
                this.$router.replace("/")
            }
        },
    }
}
</script>