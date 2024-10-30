<script setup lang="ts">
import { useAuthActions } from "~/modules/auth/composables/useAuthActions"

const { loading, login } = useAuthActions()
</script>

<template>
  <div class="flex flex-col gap-2 justify-center items-center py-10 lg:py-16">
    <div class="mx-auto max-w-md mb-6">
      <img
        src="/public/images/login-image.svg"
        width="793"
        height="551"
        alt=""
        aria-hidden="true"
      />
    </div>

    <BaseTitle size="lg" light label="Bem vindo!" />
    <p class="lg:text-lg text-stone-600 text-center text-balance mx-auto mb-4">
      Entre com sua conta Google e comece agora
    </p>
    <UButton
      label="Login com google"
      size="xl"
      icon="i-heroicons-arrow-right-end-on-rectangle"
      trailing
      :loading
      @click="login"
    />
  </div>
</template>
