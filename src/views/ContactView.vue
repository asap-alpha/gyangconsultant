<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'
import ContactForm from '@/components/ContactForm.vue'
import PageHero from '@/components/PageHero.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { company, contact, regions } from '@/content/site'

usePageMeta({
  title: 'Contact Us',
  description:
    'Contact Gyang Corporate Consult for consultations, training, investigations, security assessments, due diligence, ADR, asset tracing, debt recovery and proposal development.',
})

const route = useRoute()
const initialService = computed(() =>
  typeof route.query.service === 'string' ? route.query.service : undefined,
)
const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`
</script>

<template>
  <PageHero
    eyebrow="Contact us"
    title="Speak to us in confidence"
    lead="For consultations, training programmes, investigations, corporate security assessments, due diligence, ADR, asset tracing, debt recovery and proposal development."
    :crumbs="[
      { label: 'Home', to: '/' },
      { label: 'Contact', to: '/contact' },
    ]"
  />

  <section class="section">
    <div class="container contact">
      <div class="contact__info">
        <h2>{{ company.name }}</h2>
        <p class="contact__descriptor">{{ company.descriptor }}</p>

        <ul class="contact__list">
          <li v-if="contact.email">
            <span class="icon-badge"><AppIcon name="mail" /></span>
            <span>
              <span class="contact__label">Email</span>
              <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
            </span>
          </li>
          <li v-if="contact.phones.length">
            <span class="icon-badge"><AppIcon name="phone" /></span>
            <span>
              <span class="contact__label">Telephone</span>
              <template v-for="(p, i) in contact.phones" :key="p">
                <a :href="telHref(p)">{{ p }}</a
                ><br v-if="i < contact.phones.length - 1" />
              </template>
            </span>
          </li>
          <li v-if="contact.address">
            <span class="icon-badge"><AppIcon name="mapPin" /></span>
            <span>
              <span class="contact__label">Office</span>
              <address>{{ contact.address }}</address>
            </span>
          </li>
          <li>
            <span class="icon-badge"><AppIcon name="compass" /></span>
            <span>
              <span class="contact__label">Areas of service</span>
              {{ regions.join(' · ') }} · Nationwide
            </span>
          </li>
        </ul>

        <p class="contact__privacy">
          <AppIcon name="lock" :size="18" />
          <span>All enquiries are treated as confidential.</span>
        </p>
      </div>

      <div class="card contact__form">
        <h2>Send us an enquiry</h2>
        <ContactForm :initial-service="initialService" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  display: grid;
  gap: var(--space-l);
}

@media (min-width: 960px) {
  .contact {
    grid-template-columns: 5fr 7fr;
    gap: var(--space-xl);
  }
}

.contact__info h2 {
  font-size: var(--step-2);
  margin-bottom: 0.25rem;
}

.contact__descriptor {
  color: var(--gold-700);
  font-weight: 600;
}

.contact__list {
  list-style: none;
  display: grid;
  gap: 1.25rem;
  margin-top: 2rem;
}

.contact__list li {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.contact__label {
  display: block;
  font-size: var(--step--1);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

address {
  font-style: normal;
}

.contact__privacy {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  font-weight: 550;
  color: var(--navy-900);
}

.contact__privacy svg {
  color: var(--gold-700);
}

.contact__form {
  padding: clamp(1.5rem, 1rem + 2vw, 2.5rem);
}

.contact__form > h2 {
  font-size: var(--step-2);
}
</style>
