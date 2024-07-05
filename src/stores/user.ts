import callAPI from "@/config/api";
import { defineStore } from "pinia";
import type { LoginTypes, userTypes } from "./data-types";
import Cookies from "js-cookie";
import axios from "axios";

export const useUserStores = defineStore("User", {
  state: () => ({
    User: null as userTypes | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.User,
    getUser: (state) => state.User,
  },
  actions: {
    async fetchingUser() {
      try {
        const url = "http://localhost:3000/auth/user";
        const token = Cookies.get("token");
        console.log("Token dari cookie: ", token);
        if (!token) {
          throw new Error("Token not found in cookies");
        }
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        this.User = res.data.data.userdetail;
      } catch (error) {
        console.log("====================================");
        console.log(
          "Error Fetching Data User Detail: ",
          error.response ? error.response.data : error
        );
        console.log("====================================");
      }
    },
  },
});

export async function setLogin(data: LoginTypes) {
  const url = `http://localhost:3000/auth/login`;
  return callAPI({
    url,
    method: "POST",
    data,
  });
}
