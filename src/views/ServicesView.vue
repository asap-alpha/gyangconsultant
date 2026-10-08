<script setup lang="ts">
import CtaBand from '@/components/CtaBand.vue'
import PageHero from '@/components/PageHero.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { company } from '@/content/site'
import { services } from '@/content/services'

usePageMeta({
  title: 'Our Services',
  description:
    'Security management, corporate crime investigation, due diligence, asset tracing, debt recovery support, ADR, workshops and training, and proposal development for organisations in Ghana.',
})
</script>

<template>
  <PageHero
    eyebrow="Our core services"
    title="Professional services, tailored to your risks"
    :lead="company.approachLine"
    :crumbs="[
      { label: 'Home', to: '/' },
      { label: 'Services', to: '/services' },
    ]"
  />

  <section class="section" aria-label="Services">
    <div class="container grid grid--3">
      <ServiceCard v-for="s in services" :key="s.slug" :service="s" heading-level="h2" />
    </div>
  </section>

  <CtaBand />
</template>
