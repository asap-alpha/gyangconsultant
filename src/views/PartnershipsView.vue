<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import CtaBand from '@/components/CtaBand.vue'
import PageHero from '@/components/PageHero.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { partners } from '@/content/site'

usePageMeta({
  title: 'Partnerships',
  description:
    'Gyang Corporate Consult welcomes professional partnerships in research, training, consultancy, conferences and capacity building.',
})
</script>

<template>
  <PageHero
    eyebrow="Partnerships"
    title="Let’s build stronger institutions together"
    :lead="partners.scope"
    :crumbs="[
      { label: 'Home', to: '/' },
      { label: 'Partnerships', to: '/partnerships' },
    ]"
  />

  <section class="section" aria-labelledby="partners-title">
    <div class="container split">
      <div>
        <p class="eyebrow">Who we partner with</p>
        <h2 id="partners-title">We welcome professional partnerships with</h2>
      </div>
      <ul class="check-list partner-list">
        <li v-for="p in partners.types" :key="p">
          <AppIcon name="handshake" :size="20" />
          <span>{{ p }}</span>
        </li>
      </ul>
    </div>
  </section>

  <CtaBand
    title="Interested in partnering with us?"
    text="Get in touch to discuss research, training, consultancy, conferences or capacity-building collaborations."
  />
</template>

<style scoped>
.partner-list {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 0.75rem;
}

.partner-list li {
  align-items: center;
  padding: 0.9rem 1rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  font-weight: 550;
}

.partner-list svg {
  margin-top: 0;
}
</style>
