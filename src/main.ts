import "./assets/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import router from "./router";

const app = createApp(App);
app.use(Vue3Toasity, {
  autoClose: 3000,
} as ToastContainerOptions);
app.use(createPinia());
app.use(router);
app.mount("#app");
