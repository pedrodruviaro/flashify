<script setup lang="ts">
type Sizes = "xs" | "sm" | "md" | "lg"

type TitleSize = {
  [key in Sizes]: string
}

interface Props {
  as?: string
  center?: boolean
  size?: Sizes
  label?: string
  light?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: "h2",
  center: false,
  size: "md",
  light: false,
})

const titleSize: TitleSize = {
  xs: "text-base",
  sm: "text-lg md:text-xl",
  md: "text-xl md:text-2xl",
  lg: "text-2xl md:text-3xl",
}
</script>

<template>
  <Component
    :is="props.as"
    class="relative font-bold"
    :class="[
      { 'mx-auto text-center': props.center },
      { 'font-semibold': props.light },
      titleSize[props.size],
    ]"
  >
    <template v-if="props.label">{{ props.label }}</template>
    <slot v-else />
  </Component>
</template>
