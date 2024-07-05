<script setup lang="ts">
import { useUserStores } from "@/stores/user";
import { computed, onMounted } from "vue";

const userStore = useUserStores();
const user = computed(() => userStore.getUser);
console.log(user);

onMounted(() => {
  userStore.fetchingUser();
});
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
          <Button class="w-full" type="submit" variant="destructive">
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
