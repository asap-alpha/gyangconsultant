<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import CtaBand from '@/components/CtaBand.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { about, clients, commitments, company, lifecycle, regions } from '@/content/site'
import { services } from '@/content/services'
import { executiveDirector as director } from '@/content/board'
import { teamPhoto } from '@/composables/teamPhoto'

usePageMeta({
  title: company.name,
  description:
    'Ghanaian consultancy for security management, corporate crime investigation, due diligence, asset tracing, debt recovery, ADR and training — focused on the five northern regions and serving clients nationwide.',
})

const directorPhoto = teamPhoto(director.slug)
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="container hero__inner">
      <div class="hero__copy">
        <p class="eyebrow">Northern Ghana &middot; Nationwide</p>
        <h1 id="hero-title">
          Protecting organisations. <span>Managing risk.</span> Supporting integrity.
        </h1>
        <p class="lead">{{ company.strapline }}.</p>
        <div class="hero__actions">
          <RouterLink to="/contact" class="btn btn--primary">
            Request a consultation <AppIcon name="arrowRight" :size="18" />
          </RouterLink>
          <RouterLink to="/services" class="btn btn--ghost">Explore our services</RouterLink>
        </div>
      </div>

      <aside class="hero__panel" aria-label="Our professional commitment">
        <AppIcon name="shield" :size="36" class="hero__panel-icon" />
        <p class="hero__panel-title">Our professional commitment</p>
        <ul class="check-list">
          <li v-for="c in commitments" :key="c">
            <AppIcon name="check" :size="18" />
            <span>{{ c }}</span>
          </li>
        </ul>
        <p class="hero__panel-foot">
          We do not compromise the confidentiality of our clients or the integrity of our
          professional assignments.
        </p>
      </aside>
    </div>
  </section>

  <section class="section" aria-labelledby="intro-title">
    <div class="container split">
      <div>
        <p class="eyebrow">Who we are</p>
        <h2 id="intro-title">Practical, confidential and evidence-based consultancy</h2>
      </div>
      <div class="prose">
        <p class="lead">{{ company.summary }}</p>
        <p>{{ company.expertise }} {{ company.approachLine }}</p>
        <p>
          <strong>{{ about.belief }}</strong>
        </p>
        <RouterLink to="/about" class="text-link">
          More about us <AppIcon name="arrowRight" :size="16" />
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="section section--alt" aria-labelledby="services-title">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Our core services</p>
        <h2 id="services-title">Specialist support across the full risk lifecycle</h2>
        <p class="lead">
          From preventing loss to investigating wrongdoing and recovering what is owed, our services
          are tailored to the specific needs of each client.
        </p>
      </div>
      <div class="grid grid--4">
        <ServiceCard v-for="s in services" :key="s.slug" :service="s" />
      </div>
    </div>
  </section>

  <section class="section section--dark" aria-labelledby="lifecycle-title">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Why work with us</p>
        <h2 id="lifecycle-title">No one-size-fits-all approach</h2>
        <p class="lead lead--dark">
          Every organisation faces different risks. Our consultants work with clients to move beyond
          reacting to incidents and develop stronger systems for prevention and risk management.
        </p>
      </div>
      <ol class="lifecycle">
        <li v-for="(step, i) in lifecycle" :key="step">
          <span class="lifecycle__num" aria-hidden="true">{{
            String(i + 1).padStart(2, '0')
          }}</span>
          <span class="lifecycle__label">{{ step }}</span>
        </li>
      </ol>
      <RouterLink to="/approach" class="btn btn--ghost lifecycle__cta">
        See how we work <AppIcon name="arrowRight" :size="18" />
      </RouterLink>
    </div>
  </section>

  <section class="section" aria-labelledby="clients-title">
    <div class="container split">
      <div>
        <p class="eyebrow">Who we serve</p>
        <h2 id="clients-title">Public and private organisations of every kind</h2>
        <p>
          Our services are designed for both public and private sector organisations, with
          particular attention to the operational realities of institutions in Northern Ghana.
        </p>
        <RouterLink to="/clients" class="text-link">
          How we help each sector <AppIcon name="arrowRight" :size="16" />
        </RouterLink>
      </div>
      <ul class="sector-list">
        <li v-for="c in clients" :key="c.sector">
          <span class="icon-badge"><AppIcon :name="c.icon" /></span>
          <span>{{ c.sector }}</span>
        </li>
      </ul>
    </div>
  </section>

  <section class="section section--alt" aria-labelledby="regions-title">
    <div class="container split">
      <div>
        <p class="eyebrow">Our geographical focus</p>
        <h2 id="regions-title">Rooted in Northern Ghana</h2>
        <p>
          Our strategic focus on the five northern regions enables us to understand the
          institutional, commercial, social and operational environment within Northern Ghana while
          providing services to organisations across the country.
        </p>
      </div>
      <ul class="region-list">
        <li v-for="r in regions" :key="r">
          <AppIcon name="mapPin" :size="20" />
          {{ r }}
        </li>
        <li class="region-list__all">
          <AppIcon name="compass" :size="20" />
          Clients throughout Ghana
        </li>
      </ul>
    </div>
  </section>

  <section class="section" aria-labelledby="leader-title">
    <div class="container">
      <figure class="leader-quote">
        <img
          v-if="directorPhoto"
          :src="directorPhoto.src"
          :srcset="directorPhoto.srcset"
          sizes="160px"
          :alt="`Portrait of ${director.name}`"
          class="leader-quote__photo"
          width="160"
          height="200"
          loading="lazy"
          decoding="async"
        />
        <div v-else class="leader-quote__avatar" aria-hidden="true">PAG</div>
        <div>
          <p class="eyebrow">Leadership</p>
          <h2 id="leader-title">{{ director.name }}</h2>
          <p class="leader-quote__role">{{ director.role }}</p>
          <p class="leader-quote__text">{{ director.summary }}</p>
          <RouterLink to="/about#leadership" class="text-link">
            Meet our Board of Directors <AppIcon name="arrowRight" :size="16" />
          </RouterLink>
        </div>
      </figure>
    </div>
  </section>

  <CtaBand />
</template>

<style scoped>
.hero {
  position: relative;
  background:
    radial-gradient(900px 500px at 90% 10%, rgb(212 163 59 / 0.16), transparent 60%),
    radial-gradient(700px 400px at 0% 100%, rgb(29 58 120 / 0.9), transparent 70%), var(--navy-900);
  color: #dbe4ee;
  overflow: hidden;
}

.hero::before {
  /* Subtle topographic texture */
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-radial-gradient(
    circle at 75% 40%,
    transparent 0 38px,
    rgb(255 255 255 / 0.035) 38px 39px
  );
  pointer-events: none;
}

.hero__inner {
  position: relative;
  display: grid;
  gap: 3rem;
  padding-block: clamp(3.5rem, 2rem + 6vw, 7rem);
  align-items: center;
}

@media (min-width: 960px) {
  .hero__inner {
    grid-template-columns: 1.5fr 1fr;
  }
}

.hero .eyebrow {
  color: var(--gold-500);
}

.hero h1 {
  color: #fff;
  font-size: clamp(2.3rem, 1.6rem + 3vw, 4rem);
  max-width: 18ch;
}

.hero h1 span {
  color: var(--gold-400);
}

.hero .lead {
  color: #c6d2df;
  max-width: 54ch;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2rem;
}

.hero__panel {
  background: rgb(255 255 255 / 0.05);
  border: 1px solid rgb(255 255 255 / 0.14);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.hero__panel-icon {
  color: var(--gold-500);
  margin-bottom: 1rem;
}

.hero__panel-title {
  font-family: var(--font-serif);
  font-size: var(--step-1);
  font-weight: 650;
  color: #fff;
}

.hero__panel .check-list svg {
  color: var(--gold-500);
}

.hero__panel-foot {
  margin: 1.5rem 0 0;
  padding-top: 1.25rem;
  border-top: 1px solid rgb(255 255 255 / 0.14);
  font-size: var(--step--1);
  color: #b9c6d4;
}

.section-head {
  max-width: 760px;
  margin-bottom: var(--space-l);
}

.lead--dark {
  color: #c6d2df;
}

.lifecycle {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 140px), 1fr));
  gap: 0.75rem;
  counter-reset: none;
}

.lifecycle li {
  position: relative;
  display: grid;
  gap: 0.35rem;
  padding: 1.25rem 1.1rem;
  border-radius: var(--radius);
  background: rgb(255 255 255 / 0.05);
  border: 1px solid rgb(255 255 255 / 0.12);
  border-top: 3px solid var(--gold-500);
}

.lifecycle__num {
  font-size: var(--step--1);
  font-weight: 700;
  color: var(--gold-500);
  letter-spacing: 0.08em;
}

.lifecycle__label {
  font-family: var(--font-serif);
  font-size: var(--step-1);
  font-weight: 650;
  color: #fff;
}

.lifecycle__cta {
  margin-top: 2rem;
}

.sector-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: 0.75rem;
}

.sector-list li {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  font-weight: 550;
  line-height: 1.35;
}

.sector-list .icon-badge {
  width: 42px;
  height: 42px;
}

.region-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 0.75rem;
}

.region-list li {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1rem 1.15rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 4px solid var(--gold-500);
  border-radius: var(--radius);
  font-weight: 600;
  color: var(--navy-900);
}

.region-list svg {
  color: var(--gold-700);
}

.region-list__all {
  border-left-color: var(--navy-700) !important;
}

.leader-quote {
  margin: 0;
  display: grid;
  gap: 2rem;
  align-items: start;
  padding: clamp(1.5rem, 1rem + 2vw, 3rem);
  border-radius: var(--radius-lg);
  background: var(--gold-50);
  border: 1px solid #efe1bf;
}

@media (min-width: 760px) {
  .leader-quote {
    grid-template-columns: auto 1fr;
  }
}

.leader-quote__avatar {
  display: grid;
  place-items: center;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: var(--navy-800);
  color: var(--gold-400);
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  box-shadow:
    0 0 0 6px #fff,
    0 0 0 7px #efe1bf;
}

.leader-quote h2 {
  font-size: var(--step-2);
  margin-bottom: 0.15rem;
}

.leader-quote__role {
  color: var(--gold-700);
  font-weight: 600;
}

.leader-quote__text {
  max-width: 68ch;
  font-size: var(--step-1);
  line-height: 1.6;
  color: var(--ink);
}

.leader-quote__photo {
  width: 160px;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: var(--radius);
  box-shadow:
    0 0 0 6px #fff,
    0 0 0 7px #efe1bf;
}
</style>
