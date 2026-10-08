<script setup lang="ts">
import type { Service } from '@/content/services'
import AppIcon from './AppIcon.vue'

defineProps<{ service: Service; headingLevel?: 'h2' | 'h3' }>()
</script>

<template>
  <article class="card service-card">
    <span class="icon-badge"><AppIcon :name="service.icon" /></span>
    <component :is="headingLevel ?? 'h3'" class="service-card__title">
      <RouterLink :to="`/services/${service.slug}`" class="service-card__link">
        {{ service.title }}
      </RouterLink>
    </component>
    <p>{{ service.summary }}</p>
    <span class="text-link" aria-hidden="true">
      Learn more <AppIcon name="arrowRight" :size="16" />
    </span>
  </article>
</template>

<style scoped>
.service-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition:
    box-shadow 0.2s,
    transform 0.2s,
    border-color 0.2s;
}

.service-card:hover,
.service-card:focus-within {
  box-shadow: var(--shadow-lg);
  border-color: var(--gold-500);
}

@media (prefers-reduced-motion: no-preference) {
  .service-card:hover {
    transform: translateY(-3px);
  }
}

.service-card .icon-badge {
  margin-bottom: 0.75rem;
}

.service-card__title {
  font-size: var(--step-1);
  margin-bottom: 0.25rem;
}

.service-card__link {
  color: inherit;
  text-decoration: none;
}

/* Whole card is clickable; the link itself remains the single accessible target. */
.service-card__link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.service-card__link:focus-visible {
  box-shadow: none;
}

.service-card__link:focus-visible::after {
  box-shadow: var(--focus);
}

.service-card p {
  color: var(--ink-muted);
  flex-grow: 1;
}
</style>
