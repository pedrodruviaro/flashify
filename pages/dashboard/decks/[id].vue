<script setup lang="ts">
import EditDeck from "~/modules/deck/screens/Edit/Edit.vue"

definePageMeta({
  layout: "admin",
})

useSeoMeta({
  title: "Edite o seu deck",
})
</script>

<template>
  <EditDeck />
</template>
