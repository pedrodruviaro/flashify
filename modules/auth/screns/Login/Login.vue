<script setup lang="ts">
import { useAuthActions } from "~/modules/auth/composables/useAuthActions"

const { loading, login, logout } = useAuthActions()
</script>

<template>
  <div>
    <div>Login Page</div>
    <UButton label="Login com google" :loading @click="login" />
    <UButton label="Logout" @click="logout" />
  </div>
</template>
