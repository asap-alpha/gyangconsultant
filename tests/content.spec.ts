import { describe, expect, it } from 'vitest'
import { icons } from '@/content/icons'
import { services } from '@/content/services'
import { clients } from '@/content/site'
import { staticPaths } from '@/router/paths'

describe('content integrity', () => {
  it('has the eight core services with unique, URL-safe slugs', () => {
    expect(services).toHaveLength(8)
    const slugs = services.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/))
  })

  it('gives every service a summary and at least one item', () => {
    services.forEach((s) => {
      expect(s.summary.length).toBeGreaterThan(20)
      expect(s.items.length).toBeGreaterThan(0)
    })
  })

  it('only references icons that exist', () => {
    ;[...services.map((s) => s.icon), ...clients.map((c) => c.icon)].forEach((name) =>
      expect(icons).toHaveProperty(name),
    )
  })

  it('never uses the "Gyanbg" misspelling from the source notes', () => {
    expect(JSON.stringify({ services, clients })).not.toMatch(/gyanbg/i)
  })

  it('prerenders a page for every service', () => {
    services.forEach((s) => expect(staticPaths).toContain(`/services/${s.slug}`))
  })
})
