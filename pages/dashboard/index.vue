<script setup lang="ts">
import Dashboard from "~/modules/dashboard/screens/Dashboard/Dashboard.vue"

definePageMeta({
  layout: "admin",
})

useSeoMeta({
  title: "Dashboard",
})
</script>

<template>
  <Dashboard />
</template>
