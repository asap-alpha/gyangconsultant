<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import CtaBand from '@/components/CtaBand.vue'
import PageHero from '@/components/PageHero.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { findService, services } from '@/content/services'

const props = defineProps<{ slug: string }>()

// The route guard guarantees the slug exists.
const service = computed(() => findService(props.slug)!)
const others = computed(() => services.filter((s) => s.slug !== props.slug))

usePageMeta(() => ({
  title: service.value.title,
  description: `${service.value.summary} ${service.value.intro.at(-1) ?? ''}`.trim(),
}))
</script>

<template>
  <PageHero
    eyebrow="Our services"
    :title="service.title"
    :lead="service.summary"
    :crumbs="[
      { label: 'Home', to: '/' },
      { label: 'Services', to: '/services' },
      { label: service.title, to: `/services/${service.slug}` },
    ]"
  />

  <section class="section">
    <div class="container detail">
      <article class="detail__main">
        <p v-for="p in service.intro" :key="p" class="lead">{{ p }}</p>

        <h2 class="detail__h">{{ service.listHeading }}</h2>
        <ul class="check-list detail__list">
          <li v-for="item in service.items" :key="item">
            <AppIcon name="check" :size="18" />
            <span>{{ item }}</span>
          </li>
        </ul>

        <aside v-if="service.note" class="detail__note" aria-label="Professional standards">
          <AppIcon name="scale" :size="22" />
          <p>{{ service.note }}</p>
        </aside>

        <RouterLink
          :to="{ path: '/contact', query: { service: service.title } }"
          class="btn btn--dark"
        >
          Enquire about {{ service.shortTitle.toLowerCase() }}
          <AppIcon name="arrowRight" :size="18" />
        </RouterLink>
      </article>

      <nav class="detail__side" aria-labelledby="other-services">
        <h2 id="other-services" class="detail__side-title">Other services</h2>
        <ul>
          <li v-for="s in others" :key="s.slug">
            <RouterLink :to="`/services/${s.slug}`">
              <AppIcon :name="s.icon" :size="20" />
              <span>{{ s.title }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </section>

  <CtaBand />
</template>

<style scoped>
.detail {
  display: grid;
  gap: var(--space-xl);
}

@media (min-width: 960px) {
  .detail {
    grid-template-columns: 1fr 320px;
  }
}

.detail__main {
  max-width: 72ch;
}

.detail__h {
  font-size: var(--step-2);
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
}

.detail__list {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 0.85rem 2rem;
}

.detail__note {
  display: flex;
  gap: 0.9rem;
  margin-block: 2.5rem;
  padding: 1.25rem 1.4rem;
  border-radius: var(--radius);
  background: var(--gold-50);
  border-left: 4px solid var(--gold-500);
  color: var(--navy-900);
}

.detail__note svg {
  flex-shrink: 0;
  color: var(--gold-700);
}

.detail__note p {
  margin: 0;
  font-weight: 500;
}

.detail__main > .btn {
  margin-top: 1rem;
}

.detail__side {
  align-self: start;
  position: sticky;
  top: calc(var(--header-h) + 1.5rem);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: var(--surface-alt);
}

.detail__side-title {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 0.75rem;
}

.detail__side ul {
  list-style: none;
  display: grid;
  gap: 0.25rem;
}

.detail__side a {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 0.5rem;
  border-radius: 8px;
  color: var(--navy-900);
  font-weight: 550;
  text-decoration: none;
  line-height: 1.3;
}

.detail__side a:hover {
  background: var(--surface);
  color: var(--gold-700);
}

.detail__side svg {
  flex-shrink: 0;
  color: var(--gold-700);
}

@media (max-width: 959.98px) {
  .detail__side {
    position: static;
  }
}
</style>
