<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import CtaBand from '@/components/CtaBand.vue'
import PageHero from '@/components/PageHero.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { clients } from '@/content/site'

usePageMeta({
  title: 'Who We Serve',
  description:
    'We support hotels, schools, mining companies, banks, NGOs, faith-based organisations, entertainment businesses, MMDAs and other public and private institutions across Ghana.',
})
</script>

<template>
  <PageHero
    eyebrow="Our target clients"
    title="Support shaped around your sector"
    lead="Gyang Corporate Consult provides services to a broad range of organisations, with customised support based on the specific needs and risk profile of each."
    :crumbs="[
      { label: 'Home', to: '/' },
      { label: 'Who We Serve', to: '/clients' },
    ]"
  />

  <section class="section" aria-label="Sectors">
    <div class="container grid grid--3">
      <article v-for="c in clients" :key="c.sector" class="card sector">
        <span class="icon-badge"><AppIcon :name="c.icon" /></span>
        <h2>{{ c.sector }}</h2>
        <p>{{ c.needs }}</p>
      </article>
    </div>
  </section>

  <CtaBand
    title="Not sure which service fits your organisation?"
    text="Tell us about your organisation and the challenges you face. We will recommend a practical, tailored approach."
  />
</template>

<style scoped>
.sector .icon-badge {
  margin-bottom: 1rem;
}

.sector h2 {
  font-size: var(--step-1);
}

.sector p {
  margin: 0;
  color: var(--ink-muted);
}
</style>
