<script setup lang="ts">
import { company, contact, regions } from '@/content/site'
import { services } from '@/content/services'
import { mainNav } from '@/router/routes'
import AppIcon from './AppIcon.vue'
import BrandLogo from './BrandLogo.vue'

const year = new Date().getFullYear()
const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div class="site-footer__about">
        <RouterLink to="/" class="site-footer__brand" aria-label="Gyang Corporate Consult — home">
          <BrandLogo inverse />
        </RouterLink>
        <p>{{ company.descriptor }}.</p>
        <p class="site-footer__tagline">{{ company.tagline }}</p>
      </div>

      <nav aria-labelledby="footer-services">
        <h2 id="footer-services" class="site-footer__heading">Services</h2>
        <ul>
          <li v-for="s in services" :key="s.slug">
            <RouterLink :to="`/services/${s.slug}`">{{ s.shortTitle }}</RouterLink>
          </li>
        </ul>
      </nav>

      <nav aria-labelledby="footer-company">
        <h2 id="footer-company" class="site-footer__heading">Company</h2>
        <ul>
          <li v-for="item in mainNav" :key="item.to">
            <RouterLink :to="item.to">{{ item.label }}</RouterLink>
          </li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
        </ul>
      </nav>

      <div>
        <h2 class="site-footer__heading">Get in touch</h2>
        <ul class="site-footer__contact">
          <li v-if="contact.email">
            <AppIcon name="mail" :size="18" />
            <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
          </li>
          <li v-for="p in contact.phones" :key="p">
            <AppIcon name="phone" :size="18" />
            <a :href="telHref(p)">{{ p }}</a>
          </li>
          <li v-if="contact.address">
            <AppIcon name="mapPin" :size="18" />
            <span>{{ contact.address }}</span>
          </li>
          <li v-if="!contact.email && !contact.phones.length">
            <AppIcon name="mail" :size="18" />
            <RouterLink to="/contact">Send us an enquiry</RouterLink>
          </li>
        </ul>
        <p class="site-footer__regions">
          Serving the {{ regions.join(', ').replace(/, ([^,]*)$/, ' and $1') }} — and clients
          nationwide.
        </p>
      </div>
    </div>

    <div class="site-footer__bottom">
      <div class="container">
        <p>&copy; {{ year }} {{ company.name }}. All rights reserved.</p>
        <p>{{ company.legalForm }}.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--navy-950);
  color: #b9c6d4;
  font-size: var(--step--1);
}

.site-footer a {
  color: #dbe4ee;
  text-decoration: none;
}

.site-footer a:hover {
  color: var(--gold-400);
  text-decoration: underline;
}

.site-footer__grid {
  display: grid;
  gap: 2.5rem;
  padding-block: 4rem 3rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
}

@media (min-width: 960px) {
  .site-footer__grid {
    grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
  }
}

.site-footer__brand {
  display: inline-block;
  margin-bottom: 1.25rem;
  border-radius: 8px;
}

.site-footer__tagline {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--gold-400);
}

.site-footer__heading {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 1rem;
}

.site-footer ul {
  list-style: none;
  display: grid;
  gap: 0.55rem;
}

.site-footer__contact li {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
}

.site-footer__contact svg {
  margin-top: 0.2rem;
  color: var(--gold-500);
  flex-shrink: 0;
}

.site-footer__regions {
  margin-top: 1.25rem;
}

.site-footer__bottom {
  border-top: 1px solid rgb(255 255 255 / 0.1);
  padding-block: 1.25rem;
}

.site-footer__bottom .container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 2rem;
}

.site-footer__bottom p {
  margin: 0;
}
</style>
