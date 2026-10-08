// Kept free of .vue imports so vite.config.ts can use it for prerendering and the sitemap.
import { services } from '../content/services.ts'

export const staticPaths: string[] = [
  '/',
  '/about',
  '/services',
  ...services.map((s) => `/services/${s.slug}`),
  '/clients',
  '/approach',
  '/partnerships',
  '/contact',
]
