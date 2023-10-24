<template>
    <header class="header">
        <h4 style="display: inline-block;">Welcome <h4 style="display: inline-block; color: #3d0a91; font-weight: bolder;"
                v-if="isLogin">{{
                    user.user.displayName }}</h4>
        </h4>
        <div class="buttons">
            <button class="btn" @click="gotoHome">Home<i class="fa-solid fa-house profile-icon"></i></button>
            <button class="btn" @click="creatPost">Create Post<i class="fa-solid fa-plus profile-icon"></i></button>
            <button ref="logout" class="btn" @click="logOut">Logout<i
                    class="fa-solid fa-right-from-bracket profile-icon"></i></button>
        </div>
    </header>
    <div v-if="postData.length > 0" id="container"
        class="cards-conatainer d-flex flex-row flex-wrap gap-3 justify-content-center align-items-start">
        <div v-for="(post, index) in postData" :key="index" class="card" style="width: 25rem; height: 10rem;">
            <div class="card-body">
                <h5 class="card-title">{{ post.name }} : {{ post.title }}</h5>
                <p class="card-text">{{ post.desc }}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <a href="#" class="btn" @click="editClick(post.id)">Edit</a>
                    <a href="#" class="btn" @click="deletePost(post.id, index)">Delete</a>
                </div>
            </div>
        </div>
    </div>
    <div class="post-message" v-else>
        <h4>No Post Yet...</h4>
    </div>
</template>

<script>
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from '../firebase/firebase.js'
import { signOut } from 'firebase/auth'
import { getDatabase, ref, onValue, child, get } from "firebase/database";
export default {
    data() {
        return {
            postData: []
        }
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem("user"));
        },
        isLogin() {
            if (localStorage.getItem("token")) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        creatPost() {
            this.$router.replace("/create-post")
        },
        async getData() {
            const postCol = collection(db, 'post');
            const postSnapshot = await getDocs(postCol);
            // debugger
            const postlist = postSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            // console.log(this.user.user.displayName);
            this.postData = postlist.filter((post) => post.name === this.user.user.displayName)
            // console.log("postlist", this.postData[0].id);
        },
        gotoHome() {
            this.$router.replace("/")
        },
        editClick(id) {
            this.$router.replace(`/edit/${id}`)
        },
        deletePost(id, index) {
            const post = doc(collection(db, 'post'), id)
            deleteDoc(post)
            this.postData.splice(index, 1)
        },
        logOut() {
            this.$refs.logout.innerText = "Wait..."
            signOut(auth).then(() => {
                this.$refs.logout.innerText = "Logout"
                this.$router.replace("/");
                this.isLogin = false;
                localStorage.clear();
                this.profileToHome();
            })
        }
    },
    mounted() {
        this.getData();
    }
}
</script>

<style>
.post-message {
    margin-top: 100px;
}

.post-message h4 {
    text-align: center;
    color: #3d0a91;
    font-size: 60px;
    font-weight: bolder;
}
</style>