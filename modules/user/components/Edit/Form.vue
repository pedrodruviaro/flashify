<script setup lang="ts">
const jobtitle = defineModel<string>("jobtitle")
const website = defineModel<string>("website")
const bio = defineModel<string>("bio")
</script>

<template>
  <form>
    <div class="flex gap-2 mb-2 w-full">
      <UFormGroup label="Cargo" class="w-full">
        <UInput
          class="w-full"
          color="primary"
          variant="outline"
          placeholder="Estudante"
          v-model="jobtitle"
        />
      </UFormGroup>
      <UFormGroup label="Website" class="w-full">
        <UInput
          class="w-full"
          color="primary"
          variant="outline"
          placeholder="www.johndoe.com"
          v-model="website"
        />
      </UFormGroup>
    </div>

    <UFormGroup label="Fale um pouco sobre você">
      <UTextarea
        color="primary"
        variant="outline"
        placeholder="Uma pequena bio"
        :rows="8"
        v-model="bio"
      />
    </UFormGroup>
  </form>
</template>
