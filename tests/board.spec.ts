import { describe, expect, it } from 'vitest'
import { board, executiveDirector } from '@/content/board'
import { teamPhoto } from '@/composables/teamPhoto'

describe('board of directors', () => {
  it('has unique slugs', () => {
    const slugs = board.map((m) => m.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('has a responsive photo for every member', () => {
    board.forEach((m) => {
      const photo = teamPhoto(m.slug)
      expect(photo, m.slug).not.toBeNull()
      expect(photo!.srcset).toContain('320w')
      expect(photo!.srcset).toContain('640w')
    })
  })

  it('lists Paul Agyei Gyang as Executive Director', () => {
    expect(executiveDirector.role).toBe('Executive Director')
  })
})
