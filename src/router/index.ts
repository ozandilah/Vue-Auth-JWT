import { useUserStores } from "@/stores/user";
import Login from "@/views/Auth/Login.vue";
import Register from "@/views/Auth/Register.vue";
import Overview from "@/views/Overview/Overview.vue";
import Cookies from "js-cookie";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/overview",
      name: "overview",
      component: Overview,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStores();
  const token = Cookies.get("token");
  if (token) {
    //jikA ada token, validasi token dan fetch data user jika belum login
    try {
      if (!userStore.isLoggedIn) {
        await userStore.fetchingUser();
      }
      //jika mencoba mengakses halaman login dan sudah login, arahkan ke overview
      if (to.name === "home") {
        next({ name: "overview" });
      } else {
        next();
      }
    } catch (error) {
      Cookies.remove("token");
      if (to.meta.requiresAuth) {
        next({ name: "home" });
      } else {
        next();
      }
    }
  } else {
    // Jika tidak ada token
    if (to.meta.requiresAuth) {
      next({ name: "home" });
    } else {
      next();
    }
  }
});
export default router;
