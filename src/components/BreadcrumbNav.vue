<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { siteUrl } from '@/composables/usePageMeta'
import AppIcon from './AppIcon.vue'

export interface Crumb {
  label: string
  to: string
}

const props = defineProps<{ items: Crumb[] }>()

useHead({
  script: [
    {
      type: 'application/ld+json',
      key: 'breadcrumbs',
      innerHTML: () =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: props.items.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.label,
            item: `${siteUrl}${c.to}`,
          })),
        }),
    },
  ],
})
</script>

<template>
  <nav class="crumbs" aria-label="Breadcrumb">
    <ol>
      <li v-for="(c, i) in items" :key="c.to">
        <RouterLink v-if="i < items.length - 1" :to="c.to">{{ c.label }}</RouterLink>
        <span v-else aria-current="page">{{ c.label }}</span>
        <AppIcon v-if="i < items.length - 1" name="chevronRight" :size="14" />
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.crumbs {
  margin-bottom: 1.5rem;
  font-size: var(--step--1);
}

.crumbs ol {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.crumbs li {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #c6d2df;
}

.crumbs a {
  color: #fff;
}

.crumbs a:hover {
  color: var(--gold-400);
}

.crumbs svg {
  opacity: 0.6;
}
</style>
