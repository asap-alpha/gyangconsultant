<script setup lang="ts">
import AppIcon from './AppIcon.vue'

withDefaults(defineProps<{ title?: string; text?: string }>(), {
  title: 'Talk to us about your organisation’s risks',
  text: 'For consultations, training programmes, investigations, corporate security assessments, due diligence, ADR, asset tracing, debt recovery and proposal development, contact Gyang Corporate Consult. Every enquiry is handled in confidence.',
})
</script>

<template>
  <section class="cta-band" aria-labelledby="cta-title">
    <div class="container cta-band__inner">
      <div>
        <h2 id="cta-title">{{ title }}</h2>
        <p>{{ text }}</p>
      </div>
      <RouterLink to="/contact" class="btn btn--primary">
        Request a consultation <AppIcon name="arrowRight" :size="18" />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.cta-band {
  background: linear-gradient(120deg, var(--navy-800), var(--navy-700));
  color: #dbe4ee;
  padding-block: clamp(3rem, 2rem + 3vw, 4.5rem);
}

.cta-band__inner {
  display: grid;
  gap: 1.75rem;
  align-items: center;
}

@media (min-width: 860px) {
  .cta-band__inner {
    grid-template-columns: 1fr auto;
    gap: 3rem;
  }
}

.cta-band h2 {
  color: #fff;
  font-size: var(--step-2);
}

.cta-band p {
  margin: 0;
  max-width: 70ch;
}
</style>
