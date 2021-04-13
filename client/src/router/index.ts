import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth/sign-up",
    name: "SignUp",
    component: () => import("../views/auth/SignUp.vue"),
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("../views/auth/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
