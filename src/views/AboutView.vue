<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import CtaBand from '@/components/CtaBand.vue'
import PageHero from '@/components/PageHero.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import BoardCard from '@/components/BoardCard.vue'
import { board } from '@/content/board'
import { about, commitments, company, northernCommitment } from '@/content/site'

usePageMeta({
  title: 'About Us',
  description:
    'Gyang Corporate Consult is a Ghanaian consultancy helping organisations prevent crime, protect assets, resolve disputes and strengthen internal systems. Learn about our vision, mission and Board of Directors.',
})
</script>

<template>
  <PageHero
    eyebrow="About us"
    title="A trusted partner for safer, more accountable organisations"
    :lead="about.intro"
    :crumbs="[
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
    ]"
  />

  <section class="section" aria-labelledby="who-title">
    <div class="container split">
      <div>
        <p class="eyebrow">Who we are</p>
        <h2 id="who-title">Why we exist</h2>
      </div>
      <div class="prose">
        <p>{{ about.risks }}</p>
        <p>{{ about.whatWeDo }}</p>
        <p>{{ about.sectors }}</p>
        <p>{{ company.focus }}</p>
        <p class="pull">{{ about.belief }}</p>
      </div>
    </div>
  </section>

  
  <section class="section section--alt" aria-label="Vision and mission">
    <div class="container grid grid--2">
      <article class="card vm">
        <span class="icon-badge"><AppIcon name="compass" /></span>
        <h2>Our vision</h2>
        <p>{{ about.vision }}</p>
      </article>
      <article class="card vm">
        <span class="icon-badge"><AppIcon name="target" /></span>
        <h2>Our mission</h2>
        <p>{{ about.mission }}</p>
      </article>
    </div>
  </section>

  <section class="section" aria-labelledby="objectives-title">
    <div class="container">
      <p class="eyebrow">Our core objectives</p>
      <h2 id="objectives-title">What Gyang Corporate Consult seeks to do</h2>
      <ol class="objectives">
        <li v-for="o in about.objectives" :key="o">{{ o }}</li>
      </ol>
    </div>
  </section>

  <section id="leadership" class="section section--alt" aria-labelledby="leadership-title">
    <div class="container">
      <p class="eyebrow">Leadership</p>
      <h2 id="leadership-title">Board of Directors</h2>
      <p class="board-intro">
        Our board brings together decades of experience in law enforcement, financial crime
        investigation, intelligence, customs and border security, law, journalism and governance.
      </p>
      <div class="board-list">
        <BoardCard v-for="m in board" :key="m.slug" :member="m" />
      </div>
    </div>
  </section>

  <section class="section section--dark" aria-labelledby="commit-title">
    <div class="container split">
      <div>
        <p class="eyebrow">Our professional commitment</p>
        <h2 id="commit-title">Services you can rely on</h2>
        <p>
          We do not compromise the confidentiality of our clients or the integrity of our
          professional assignments.
        </p>
      </div>
      <ul class="pill-list">
        <li v-for="c in commitments" :key="c"><AppIcon name="check" :size="18" />{{ c }}</li>
      </ul>
    </div>
  </section>

  <section class="section" aria-labelledby="north-title">
    <div class="container split">
      <div>
        <p class="eyebrow">Our commitment to Northern Ghana</p>
        <h2 id="north-title">Stronger, safer institutions in the North</h2>
      </div>
      <div class="prose">
        <p v-for="p in northernCommitment" :key="p">{{ p }}</p>
      </div>
    </div>
  </section>

  <CtaBand />
</template>

<style scoped>
.pull {
  margin-top: 1.5rem;
  padding-left: 1.25rem;
  border-left: 4px solid var(--gold-500);
  font-family: var(--font-serif);
  font-size: var(--step-1);
  color: var(--navy-900);
}

.vm .icon-badge {
  margin-bottom: 1rem;
}

.vm h2 {
  font-size: var(--step-2);
}

.vm p {
  margin: 0;
  font-size: var(--step-1);
  line-height: 1.55;
  color: var(--ink-muted);
}

.objectives {
  list-style: none;
  counter-reset: obj;
  display: grid;
  gap: 1rem 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
  margin-top: 2rem;
}

.objectives li {
  counter-increment: obj;
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}

.objectives li::before {
  content: counter(obj, decimal-leading-zero);
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: var(--step-1);
  color: var(--gold-700);
  line-height: 1.4;
}

.board-intro {
  max-width: 68ch;
  color: var(--ink-muted);
}

.board-list {
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
}

.pill-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-content: start;
}

.pill-list li {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
  border: 1px solid rgb(255 255 255 / 0.2);
  background: rgb(255 255 255 / 0.05);
  color: #fff;
  font-weight: 600;
}

.pill-list svg {
  color: var(--gold-500);
}
</style>
