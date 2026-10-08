<script setup lang="ts">
import BreadcrumbNav, { type Crumb } from './BreadcrumbNav.vue'

defineProps<{ eyebrow?: string; title: string; lead?: string; crumbs?: Crumb[] }>()
</script>

<template>
  <section class="page-hero" aria-labelledby="page-title">
    <div class="container">
      <BreadcrumbNav v-if="crumbs" :items="crumbs" />
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h1 id="page-title">{{ title }}</h1>
      <p v-if="lead" class="lead page-hero__lead">{{ lead }}</p>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  position: relative;
  padding-block: clamp(3rem, 2rem + 4vw, 5.5rem);
  background:
    radial-gradient(1200px 400px at 85% -10%, rgb(212 163 59 / 0.18), transparent 60%),
    linear-gradient(160deg, var(--navy-900), var(--navy-800));
  color: #dbe4ee;
  overflow: hidden;
}

.page-hero::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 4px;
  background: linear-gradient(90deg, var(--gold-500), transparent 70%);
}

.page-hero h1 {
  color: #fff;
  max-width: 22ch;
}

.page-hero .eyebrow {
  color: var(--gold-500);
}

.page-hero__lead {
  color: #c6d2df;
  max-width: 62ch;
  margin-bottom: 0;
}
</style>
