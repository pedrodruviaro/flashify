<script setup lang="ts">
import EditHeadline from "~/modules/user/components/Edit/Headline.vue"
import EditForm from "~/modules/user/components/Edit/Form.vue"
import { useProfileEdit } from "~/modules/user/composables/useProfileEdit"

const { user } = useUser()

const { jobtitle, site, bio, loading, errors, update } = useProfileEdit({
  user,
})

const handleSaveProfile = async () => await update()
</script>

<template>
  <div class="space-y-6">
    <BaseTitle as="h1" size="lg" label="Edite o seu perfil" />

    <EditHeadline v-if="user" :avatarUrl="user?.avatarUrl" :name="user?.name" />

    <BaseTitle label="Informações adicionais" size="sm" />

    <EditForm
      v-model:jobtitle="jobtitle"
      v-model:site="site"
      v-model:bio="bio"
      :errors="errors"
    />

    <UButton
      label="Salvar edição"
      icon="i-heroicons-pencil-square"
      trailing
      @click="handleSaveProfile"
      :loading
    />
  </div>
</template>
