<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { setLogin, useUserStores } from "@/stores/user";
import Cookies from "js-cookie";
const useStore = useUserStores();
const router = useRouter();
const Form = ref({ email: "", password: "" });
const onSubmit = async () => {
  try {
    const data = { email: Form.value.email, password: Form.value.password };
    const res = await setLogin(data);

    if (!res || !res.data || !res.data.data.token) {
      console.log("====================================");
      console.log("Gagal Login atau Token Tidak Ditemukan");
      console.log("====================================");
      return;
    }

    const token = res.data.data.token;
    console.log("Token yang didapatkan: ", token);
    Cookies.set("token", token, { expires: 1 }); // Set cookie dengan waktu kadaluarsa 1 hari

    const storedToken = Cookies.get("token");
    console.log("Token yang disimpan dalam cookie: ", storedToken);

    await useStore.fetchingUser();
    router.push("/overview");
  } catch (error) {
    console.log("====================================");
    console.log("Error saat login: ", error);
    console.log("====================================");
  }
};
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mx-auto w-full max-w-md">
      <form @submit.prevent="onSubmit">
        <Card class="overflow-y-auto">
          <CardHeader class="space-y-1">
            <CardTitle class="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Enter your details below to login
            </CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <Label for="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                v-model="Form.email"
              />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input id="password" type="password" v-model="Form.password" />
            </div>
          </CardContent>
          <CardFooter class="flex-col space-y-2">
            <Button class="w-full" type="submit">Login</Button>
            <p>
              Don't have an account?
              <RouterLink
                to="/auth/register"
                class="border-b border-gray-500 text-muted-foreground hover:text-primary"
              >
                Register
              </RouterLink>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  </div>
</template>
