import callAPI from "@/config/api";
import { defineStore } from "pinia";
import type { LoginTypes, RegisterTypes, userTypes } from "./data-types";
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
        console.log(error);
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
export async function setRegister(data: RegisterTypes) {
  const url = `http://localhost:3000/auth/register`;
  return callAPI({
    url,
    method: "POST",
    data,
  });
}
