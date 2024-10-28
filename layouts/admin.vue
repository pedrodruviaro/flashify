<script setup lang="ts">
import AdminHeader from "~/modules/auth/components/Header/Header.vue"
import SidebarContent from "~/modules/auth/components/Sidebar/Content.vue"

const isSidebarOpen = ref(false)

const handleSidebarState = (state: boolean) => {
  isSidebarOpen.value = state
}
</script>

<template>
  <BasePageWrapper>
    <template #header>
      <AdminHeader @open-sidebar="handleSidebarState(true)" />
    </template>

    <USlideover v-model="isSidebarOpen">
      <SidebarContent @close-sidebar="handleSidebarState(false)" />
    </USlideover>

    <UContainer>
      <slot />
    </UContainer>
  </BasePageWrapper>
</template>
