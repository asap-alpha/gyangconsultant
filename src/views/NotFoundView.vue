<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import { usePageMeta } from '@/composables/usePageMeta'

usePageMeta({
  title: 'Page not found',
  description: 'The page you are looking for could not be found.',
  index: false,
})
</script>

<template>
  <section class="section not-found" aria-labelledby="nf-title">
    <div class="container">
      <p class="eyebrow">Error 404</p>
      <h1 id="nf-title">We couldn’t find that page</h1>
      <p class="lead">The page may have moved, or the address may be mistyped.</p>
      <div class="not-found__actions">
        <RouterLink to="/" class="btn btn--dark">Go to the homepage</RouterLink>
        <RouterLink to="/services" class="text-link">
          Browse our services <AppIcon name="arrowRight" :size="16" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  min-height: 55vh;
  display: grid;
  align-items: center;
}

.not-found__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
}
</style>
