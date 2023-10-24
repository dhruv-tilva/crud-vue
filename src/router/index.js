import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Login from "../views/login.vue";
import Signup from "../views/signup.vue";
import CreatePost from "../views/create-post.vue";
import Profile from "../views/profile.vue"
import Edit from "../views/edit.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/create-post",
      component: CreatePost,
      name: "create-post",
    },
    {
      path: "/profile/:id",
      component: Profile,
      name: "profile"
    },
    {
      path: "/edit/:ID",
      component: Edit,
      name: "edit",
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name == "login") {
    if (localStorage.getItem("token")) {
      next("/");
    } else {
      next();
    }
  } else if (to.name == "signup") {
    if (localStorage.getItem("token")) {
      next("/");
    } else {
      next();
    }
  } else if (to.name === "home") {
    next();
  } else if (to.name === "create-post") {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next("/");
    }
  } else if (to.name === "profile") {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next("/")
    }
  } else if (to.name === "edit") {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next("/")
    }
  }
  else {
    next("/")
  }
});

export default router;
