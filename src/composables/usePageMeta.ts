import { useHead } from '@unhead/vue'
import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import { useRoute } from 'vue-router'
import { company } from '@/content/site'

export const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://www.example.com').replace(
  /\/$/,
  '',
)

interface PageMeta {
  title: string
  description: string
  /** Set false for pages that should not be indexed (e.g. 404). */
  index?: boolean
}

/** Sets the document title, description, canonical URL and social-sharing tags for a page. */
export function usePageMeta(meta: MaybeRefOrGetter<PageMeta>) {
  const route = useRoute()
  const m = computed(() => toValue(meta))
  const fullTitle = computed(() =>
    m.value.title === company.name ? company.name : `${m.value.title} | ${company.name}`,
  )
  const url = computed(
    () => `${siteUrl}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}`,
  )

  useHead({
    title: fullTitle,
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: () => m.value.description },
      { name: 'robots', content: () => (m.value.index === false ? 'noindex' : 'index, follow') },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: company.name },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: () => m.value.description },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: 'en_GH' },
      { property: 'og:image', content: `${siteUrl}/og-image.png` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: () => m.value.description },
    ],
  })
}
