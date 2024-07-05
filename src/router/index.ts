import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "@/views/Auth/Login.vue";
import Overview from "@/views/Overview/Overview.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Login,
    },
    {
      path: "/overview",
      name: "overview",
      component: Overview,
    },
  ],
});

export default router;
