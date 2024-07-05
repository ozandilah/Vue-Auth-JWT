<script setup lang="ts">
import { useUserStores } from "@/stores/user";
import { computed, onMounted } from "vue";
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
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const userStore = useUserStores();
const user = computed(() => userStore.getUser);
const router = useRouter();
onMounted(() => {
  userStore.fetchingUser();
});

async function logout() {
  Cookies.remove("token");
  router.push("/");
}
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mx-auto w-full max-w-md">
      <Card class="overflow-y-auto">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl"> Hi, {{ user?.name }} </CardTitle>
          <CardDescription
            >Welcome back! Here's a quick glance at your latest activities and
            insights. Dive in to see your progress and explore new opportunities
            tailored just for you.</CardDescription
          >
        </CardHeader>
        <CardContent class="grid gap-4"> </CardContent>
        <CardFooter class="flex-col space-y-2">
          <Button
            class="w-full"
            type="submit"
            variant="destructive"
            @click="logout"
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
