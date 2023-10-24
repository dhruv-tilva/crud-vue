<template>
    <header class="header">
        <h4 style="display: inline-block;">Welcome <h4 style="display: inline-block; color: #3d0a91; font-weight: bolder;"
                v-if="isLogin">{{
                    user.user.displayName }}</h4>
        </h4>
        <div class="buttons" v-if="isLogin">
            <button @click="gotoProfile" ref="profileBtn" class="btn">Profile<i
                    class="fa-solid fa-user profile-icon"></i></button>
            <button class="btn" @click="creatPost">Create Post<i class="fa-solid fa-plus profile-icon"></i></button>
            <button ref="logout" class="btn" @click="logOut">Logout<i
                    class="fa-solid fa-right-from-bracket profile-icon"></i></button>
        </div>
        <div class="buttons" v-else>
            <button class="btn" @click="goToSignUp">Signup<i class="fa-solid fa-user-plus profile-icon"></i></button>
            <button class="btn" @click="goToLogin">Login<i class="fa-solid fa-right-to-bracket profile-icon"></i></button>
        </div>
    </header>

    <!-- <div class="input-group mb-3 mt-3" style="width: 50%; margin: 0 auto;">
        <input type="text" class="form-control" placeholder="Search Post..." aria-label="Username" v-model="searchField">
    </div> -->
    <div v-if="postData.length > 0" id="container"
        class="cards-conatainer d-flex flex-row flex-wrap gap-3 justify-content-center align-items-start">
        <div v-for="(post, index) in postData" :key="index" class="card" style="width: 25rem; height: 7rem;">
            <div class="card-body">
                <h5 class="card-title">{{ post.name }} : {{ post.title }}</h5>
                <p class="card-text">{{ post.desc }}</p>
            </div>
        </div>
    </div>
    <div class="post-message" v-else>
        <h4>No Post Yet...</h4>
    </div>
</template>

<script>
import axios from 'axios'
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from '../firebase/firebase.js'
import { signOut } from 'firebase/auth'
import { getDatabase, ref, onValue, child, get } from "firebase/database";
// import func from 'vue-editor-bridge';
export default {
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
    mounted() {
        this.getData();
        // localStorage.setItem("User", JSON.stringify(this.user))
    },
    data() {
        return {
            title: "",
            desc: "",
            postData: [],
            id: 0,
            btnDesc: "",
            searchField: "",
            isProfileOpen: false
        }
    },
    methods: {
        creatPost() {
            this.$router.replace("/create-post")
        },
        gotoProfile() {
            this.$router.replace(`/profile/${this.user.user.uid}`)
        },
        async sendData() {
            if (this.title && this.desc && this.user) {
                const data = {
                    title: this.title,
                    desc: this.desc,
                    name: this.user.user.displayName
                };
                const postCol = await collection(db, 'post')
                const res = await setDoc(doc(postCol), data)
            }
        },
        async getData() {
            const postCol = collection(db, 'post');
            const postSnapshot = await getDocs(postCol);
            // debugger
            const postlist = postSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            this.postData = postlist
            console.log("postlist", this.postData[0].id);
        },
        goToLogin() {
            this.$router.replace("/login");
        },
        goToSignUp() {
            this.$router.replace("/signup")
        },
        logOut() {
            this.$refs.logout.innerText = "Wait..."
            signOut(auth).then(() => {
                // this.$refs.logout.innerText = "Logout"
                this.$router.push("/");
                this.isLogin = false;
                localStorage.clear();
                window.location.reload()
                // this.profileToHome();
            })
        }
    }
}
</script>

<style>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 40px;
}

.parent {
    height: 12rem;
    width: 25rem;
}

.btn {
    background-color: #6610f2;
    color: white;
}

.btn:hover {
    background-color: #3d0a91;
    color: white;
}

.buttons {
    display: flex;
    align-items: center;
    column-gap: 20px;
}

.profile-icon {
    color: white;
    margin-left: 10px;
}

.cards-conatainer {
    padding: 10px 40px;
    margin-top: 50px;
}

@media screen and (max-width: 768px) {
    header {
        padding: 10px 16px;
    }

    .cards-conatainer {
        padding: 10px 16px;
    }

}

@media screen and (max-width: 375px) {
    .btn {
        font-size: 10px;
    }

    header {
        flex-direction: column;
    }
}
</style>
