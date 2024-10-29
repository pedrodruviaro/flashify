<script setup lang="ts">
import AdminHeaderLoader from "~/modules/auth/components/Header/Loader.vue"
import AdminHeader from "~/modules/auth/components/Header/Header.vue"
import SidebarContent from "~/modules/auth/components/Sidebar/Content.vue"
import LazyModalLogout from "~/modules/auth/components/Modals/Logout.vue"
import { useGetMe } from "~/modules/user/composables/useGetMe"
import { useAuthActions } from "~/modules/auth/composables/useAuthActions"

const isSidebarOpen = ref(false)

const handleSidebarState = (state: boolean) => {
  isSidebarOpen.value = state
}

const { loading: loadingUser, user } = useGetMe()

const router = useRouter()
const modal = useModal()
const toast = useToast()
const { logout } = useAuthActions()

const handleLogout = async () => {
  modal.open(LazyModalLogout, {
    onConfirm: async () => {
      await logout()
      modal.close()
      toast.add({
        title: "Volte logo!",
        description: "Esperamos você numa próxima",
        timeout: 3000,
        color: "green",
      })
      router.push("/")
    },
    onClose: () => modal.close(),
  })
}
</script>

<template>
  <BasePageWrapper>
    <template #header>
      <AdminHeaderLoader :loading="loadingUser">
        <AdminHeader @open-sidebar="handleSidebarState(true)" />
      </AdminHeaderLoader>
    </template>

    <USlideover v-model="isSidebarOpen">
      <SidebarContent
        v-if="user"
        :avatarUrl="user?.avatarUrl"
        @close-sidebar="handleSidebarState(false)"
        @logout="handleLogout"
      />
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

<style scoped>
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
