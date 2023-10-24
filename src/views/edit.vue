<template>
    <header class="header">
        <h4 style="display: inline-block;">Welcome <h4 style="display: inline-block; color: #3d0a91; font-weight: bolder;"
                v-if="isLogin">{{
                    user.user.displayName }}</h4>
        </h4>
        <div class="buttons">
            <button class="btn" @click="gotoHome">Home<i class="fa-solid fa-house profile-icon"></i></button>
            <button ref="logout" class="btn">Logout<i class="fa-solid fa-right-from-bracket profile-icon"></i></button>
        </div>
    </header>
    <form>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Title</label>
            <input type="text" class="form-control" id="exampleInputUser" aria-describedby="emailHelp" v-model="title">
        </div>
        <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"
                v-model="desc"></textarea>
            <label for="floatingTextarea2">Comments</label>
        </div>
        <button @click.prevent="updateData" class="btn">Update</button>
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
            desc: "",
            userId: null,
            postData: []
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        updateData() {
            if (this.title && this.desc && this.editId) {
                const postData = doc(collection(db, 'post'), this.editId)
                const update = updateDoc(postData, {
                    title: this.title,
                    desc: this.desc
                })
                this.$router.replace(`/profile/${this.editId}`)
            }
        },
        async getData() {
            const postCol = collection(db, 'post');
            const postSnapshot = await getDocs(postCol);
            // debugger
            const postlist = postSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            this.postData = postlist.filter((post) => post.id === this.editId)
            console.log("postlist", this.postData);
            const editedData = this.postData[0]
            this.title = editedData.title
            this.desc = editedData.desc
        },
        gotoHome() {
            this.$router.replace("/")
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
        },
        editId() {
            return this.$route.params.ID
        }
    },
}
</script>