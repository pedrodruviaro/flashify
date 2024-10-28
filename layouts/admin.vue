<script setup lang="ts">
import AdminHeaderLoader from "~/modules/auth/components/Header/Loader.vue"
import AdminHeader from "~/modules/auth/components/Header/Header.vue"
import SidebarContent from "~/modules/auth/components/Sidebar/Content.vue"
import { useGetMe } from "~/modules/user/composables/useGetMe"

const isSidebarOpen = ref(false)

const handleSidebarState = (state: boolean) => {
  isSidebarOpen.value = state
}

const { loading: loadingUser } = useGetMe()
</script>

<template>
  <BasePageWrapper>
    <template #header>
      <AdminHeaderLoader :loading="loadingUser">
        <AdminHeader @open-sidebar="handleSidebarState(true)" />
      </AdminHeaderLoader>
    </template>

    <USlideover v-model="isSidebarOpen">
      <SidebarContent @close-sidebar="handleSidebarState(false)" />
    </USlideover>

    <UContainer>
      <Transition>
        <Splash v-if="loadingUser" />
        <div v-else>
          <slot />
        </div>
      </Transition>
    </UContainer>
  </BasePageWrapper>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
