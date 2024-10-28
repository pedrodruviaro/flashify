<script setup lang="ts">
import EditHeadline from "~/modules/user/components/Edit/Headline.vue"
import EditForm from "~/modules/user/components/Edit/Form.vue"

const jobtitle = ref("")
const website = ref("")
const bio = ref("")

const handleSaveEdit = () => {
  console.log("* Save")
}
</script>

<template>
  <div class="space-y-6">
    <BaseTitle as="h1" size="lg" label="Edite o seu perfil" />

    <EditHeadline
      avatar-url="https://avatars.githubusercontent.com/u/739984?v=4"
      name="John Doe"
    />

    <BaseTitle label="Informações adicionais" size="sm" />

    <EditForm
      v-model:jobtitle="jobtitle"
      v-model:website="website"
      v-model:bio="bio"
    />

    <UButton
      label="Salvar edição"
      icon="i-heroicons-pencil-square"
      trailing
      @click="handleSaveEdit"
    />
  </div>
</template>
