<script setup lang="ts">
import { icons, type IconName } from '@/content/icons'

withDefaults(defineProps<{ name: IconName; size?: number }>(), { size: 24 })
</script>

<template>
  <!-- Decorative: meaning is always carried by adjacent text. -->
  <!-- eslint-disable vue/no-v-html -- markup comes only from the static icons map -->
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    v-html="icons[name]"
  />
</template>
