// import { fileURLToPath, URL } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    // alias: {
    //   "@": fileURLToPath(new URL("./src", import.meta.url)),
    // },
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
