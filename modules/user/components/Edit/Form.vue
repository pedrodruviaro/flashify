<script setup lang="ts">
import type { User } from "~/modules/user/entities/User/User"
import type { ZodFormattedError } from "zod"

const props = defineProps<{
  errors?: ZodFormattedError<User>
}>()

const jobtitle = defineModel<string>("jobtitle")
const site = defineModel<string>("site")
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
        <ValidationMessage v-if="props.errors?.jobtitle">{{
          props.errors.jobtitle._errors[0]
        }}</ValidationMessage>
      </UFormGroup>
      <UFormGroup label="site" class="w-full">
        <UInput
          class="w-full"
          color="primary"
          variant="outline"
          placeholder="www.johndoe.com"
          v-model="site"
        />
        <ValidationMessage v-if="props.errors?.site">{{
          props.errors.site._errors[0]
        }}</ValidationMessage>
      </UFormGroup>
    </div>

    <UFormGroup label="Fale um pouco sobre você">
      <UTextarea
        color="primary"
        variant="outline"
        placeholder="Uma pequena bio"
        :rows="8"
        v-model="bio"
      /><ValidationMessage v-if="props.errors?.bio">{{
        props.errors.bio._errors[0]
      }}</ValidationMessage>
    </UFormGroup>
  </form>
</template>
