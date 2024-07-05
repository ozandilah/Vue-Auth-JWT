<script setup lang="ts">
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
import { useUserStores, setRegister } from "@/stores/user";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { ref } from "vue";
const useStore = useUserStores();
const router = useRouter();
const Form = ref({ name: "", email: "", password: "" });
const onSubmit = async () => {
  try {
    const data = {
      email: Form.value.email,
      password: Form.value.password,
      name: Form.value.name,
    };
    const res = await setRegister(data);

    if (!res || !res.data || !res.data.data.token) {
      toast.error("Gagal Login atau Token Tidak Ditemukan");
      return;
    }

    const token = res.data.data.token;

    Cookies.set("token", token, { expires: 1 });

    const storedToken = Cookies.get("token");
    console.log("Token yang disimpan dalam cookie: ", storedToken);

    await useStore.fetchingUser();
    router.push("/overview");
  } catch (error) {
    console.log("Error saat login: ", error);
  }
};
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mx-auto w-full max-w-md">
      <form @submit.prevent="onSubmit">
        <Card class="overflow-y-auto">
          <CardHeader class="space-y-1">
            <CardTitle class="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your details below to register
            </CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <Label for="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="fauzan"
                v-model="Form.name"
              />
            </div>
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="masozan@gmail.com"
                v-model="Form.email"
              />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input
                id="password"
                type="password"
                v-model="Form.password"
                placeholder="********"
              />
            </div>
          </CardContent>
          <CardFooter class="flex-col space-y-2">
            <Button class="w-full" type="submit">Sign In</Button>
            <p>
              Do you have an account?
              <RouterLink
                to="/"
                class="border-b border-gray-500 text-muted-foreground hover:text-primary"
              >
                Login
              </RouterLink>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  </div>
</template>
