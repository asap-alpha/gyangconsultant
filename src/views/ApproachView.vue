<script setup lang="ts">
import type { IconName } from '@/content/icons'
import AppIcon from '@/components/AppIcon.vue'
import CtaBand from '@/components/CtaBand.vue'
import PageHero from '@/components/PageHero.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { clientModel, commitments, lifecycle, principles } from '@/content/site'

usePageMeta({
  title: 'Our Approach',
  description:
    'Our work is guided by prevention, professionalism, confidentiality, integrity and practical solutions — and a client-centred model from objective to follow-up.',
})

const principleIcons: IconName[] = ['shield', 'award', 'lock', 'scale', 'tool']
</script>

<template>
  <PageHero
    eyebrow="Our approach"
    title="Prevention first. Practical always."
    lead="Every organisation faces different risks, so we do not believe in a one-size-fits-all approach."
    :crumbs="[
      { label: 'Home', to: '/' },
      { label: 'Our Approach', to: '/approach' },
    ]"
  />

  <section class="section" aria-labelledby="principles-title">
    <div class="container">
      <p class="eyebrow">Guiding principles</p>
      <h2 id="principles-title">Five principles guide our work</h2>
      <div class="grid grid--3 principles">
        <article v-for="(p, i) in principles" :key="p.title" class="card">
          <span class="icon-badge"><AppIcon :name="principleIcons[i] ?? 'check'" /></span>
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--dark" aria-labelledby="flow-title">
    <div class="container">
      <p class="eyebrow">Why work with us</p>
      <h2 id="flow-title">From reacting to incidents to preventing them</h2>
      <p class="flow-lead">
        Our consultants work with clients through each stage, enabling organisations to develop
        stronger systems for prevention and risk management.
      </p>
      <ol class="flow">
        <li v-for="step in lifecycle" :key="step">{{ step }}</li>
      </ol>
    </div>
  </section>

  <section class="section" aria-labelledby="model-title">
    <div class="container split">
      <div>
        <p class="eyebrow">Our client-centred model</p>
        <h2 id="model-title">For each assignment, we seek to understand</h2>
        <p>
          Our commitment is to services that are
          {{ commitments.slice(0, -1).join(', ').toLowerCase() }} and
          {{ commitments.at(-1)?.toLowerCase() }}.
        </p>
      </div>
      <ol class="model">
        <li v-for="m in clientModel" :key="m.title">
          <h3>{{ m.title }}</h3>
          <p>{{ m.question }}</p>
        </li>
      </ol>
    </div>
  </section>

  <CtaBand />
</template>

<style scoped>
.principles {
  margin-top: 2rem;
}

.principles .icon-badge {
  margin-bottom: 1rem;
}

.principles p {
  margin: 0;
  color: var(--ink-muted);
}

.flow-lead {
  max-width: 62ch;
  color: #c6d2df;
}

.flow {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 2rem;
}

.flow li {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-serif);
  font-size: var(--step-1);
  font-weight: 650;
  color: #fff;
}

.flow li:not(:last-child)::after {
  content: '→';
  font-family: var(--font-sans);
  color: var(--gold-500);
}

.model {
  list-style: none;
  counter-reset: model;
  display: grid;
  gap: 1rem;
}

.model li {
  counter-increment: model;
  position: relative;
  padding: 1.25rem 1.25rem 1.25rem 4.25rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.model li::before {
  content: counter(model);
  position: absolute;
  left: 1.25rem;
  top: 1.2rem;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--navy-800);
  color: var(--gold-400);
  font-weight: 700;
}

.model h3 {
  margin-bottom: 0.2rem;
}

.model p {
  margin: 0;
  color: var(--ink-muted);
}
</style>
