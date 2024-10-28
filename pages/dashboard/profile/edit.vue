<script setup lang="ts">
import EditProfile from "~/modules/user/screens/Edit/Edit.vue"

definePageMeta({
  layout: "admin",
})

useSeoMeta({
  title: "Editar Perfil",
})
</script>

<template>
  <EditProfile />
</template>
