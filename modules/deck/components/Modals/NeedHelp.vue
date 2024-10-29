<script setup lang="ts">
const emits = defineEmits<{
  (e: "correct"): void
  (e: "incorret"): void
  (e: "close"): void
}>()
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <div class="flex justify-between flex-wrap gap-2">
          <BaseTitle size="xs" light label="Como funciona" />
          <UButton
            color="gray"
            variant="ghost"
            square
            icon="i-heroicons-x-mark-20-solid"
            @click="emits('close')"
            tabindex="0"
          />
        </div>
      </template>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. In aut, ratione
        nam culpa, sed error ipsum itaque tenetur sapiente minus officia. Harum
        non itaque quis, necessitatibus ex facilis voluptatem similique a
        incidunt esse voluptate pariatur, accusantium perspiciatis. Reiciendis,
        soluta. Architecto natus accusantium corporis minus accusamus dolorem!
        Recusandae vel incidunt voluptates.
      </p>
    </UCard>
  </UModal>
</template>
