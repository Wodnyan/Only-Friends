<template>
  <div class="flex flex-col items-center justify-center h-screen bg-blue-400">
    <h1 class="text-4xl text-center">SignUp</h1>
    <GithubButton />
    <form class="max-w-screen-sm w-full" @submit.prevent="onSubmit" novalidate>
      <div>
        <label for="username">Username</label>
        <Input v-model="credentials.username" id="username" text="text" />
      </div>
      <div>
        <label for="fullName">Full Name</label>
        <Input v-model="credentials.fullName" id="fullName" type="text" />
      </div>
      <div>
        <label for="email">Email</label>
        <Input v-model="credentials.email" id="email" type="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <Input v-model="credentials.password" id="password" type="password" />
      </div>
      <div class="flex justify-between">
        <router-link to="/auth/login">
          Login with existing account
        </router-link>
        <button class="button">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Ref } from "@vue/reactivity";

import Input from "@/components/Input.vue";
import GithubButton from "@/components/GithubButton.vue";

import { useSignUp } from "@/hooks/api/auth";

interface UserCredentials {
  username: string;
  email: string;
  fullName: string;
  password: string;
}

interface Setup {
  onSubmit: () => void;
  credentials: Ref<UserCredentials>;
}

export default {
  components: {
    Input,
    GithubButton,
  },
  setup(): Setup {
    const { credentials, onSubmit } = useSignUp();

    return { onSubmit, credentials };
  },
};
</script>

<style lang="scss"></style>
