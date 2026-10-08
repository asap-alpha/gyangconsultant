<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { siteUrl } from '@/composables/usePageMeta'
import { company, contact, regions } from '@/content/site'
import { services } from '@/content/services'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'

useHead({
  htmlAttrs: { lang: 'en-GH' },
  script: [
    {
      type: 'application/ld+json',
      key: 'organization',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: company.name,
        url: siteUrl,
        logo: `${siteUrl}/logo-gyang.jpeg`,
        slogan: company.tagline,
        description: company.summary,
        ...(contact.email && { email: contact.email }),
        ...(contact.phones[0] && { telephone: contact.phones[0] }),
        ...(contact.address && {
          address: {
            '@type': 'PostalAddress',
            streetAddress: contact.address,
            addressCountry: 'GH',
          },
        }),
        areaServed: [
          ...regions.map((r) => ({ '@type': 'AdministrativeArea', name: `${r}, Ghana` })),
          { '@type': 'Country', name: 'Ghana' },
        ],
        founder: { '@type': 'Person', name: 'Paul Agyei Gyang', jobTitle: 'Executive Director' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Consultancy services',
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.title,
              url: `${siteUrl}/services/${s.slug}`,
            },
          })),
        },
      }),
    },
  ],
})

// On client-side navigation, move focus to the new page's content so keyboard and
// screen-reader users start at the top of the page rather than on the old link.
const router = useRouter()
router.afterEach((to, from) => {
  if (import.meta.env.SSR || !from.matched.length || to.path === from.path) return
  nextTick(() => document.getElementById('main')?.focus({ preventScroll: true }))
})
</script>

<template>
  <a href="#main" class="skip-link">Skip to main content</a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <RouterView />
  </main>
  <SiteFooter />
</template>

<style>
.skip-link {
  position: absolute;
  left: 1rem;
  top: -100px;
  z-index: 100;
  padding: 0.75rem 1.25rem;
  background: var(--navy-900);
  color: #fff;
  font-weight: 600;
  border-radius: 0 0 var(--radius) var(--radius);
}

.skip-link:focus {
  top: 0;
  color: #fff;
}

main:focus {
  outline: none;
}
</style>
