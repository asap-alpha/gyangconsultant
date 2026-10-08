const files = import.meta.glob<string>('@/assets/team/*.webp', { eager: true, import: 'default' })

export interface TeamPhoto {
  src: string
  srcset: string
}

/** Responsive photo for a team member, or null if none has been added for this slug. */
export function teamPhoto(slug: string): TeamPhoto | null {
  const find = (w: number) =>
    Object.entries(files).find(([path]) => path.endsWith(`/${slug}-${w}.webp`))?.[1]
  const small = find(320)
  const large = find(640)
  if (!small && !large) return null
  return {
    src: (small ?? large)!,
    srcset: [small && `${small} 320w`, large && `${large} 640w`].filter(Boolean).join(', '),
  }
}

export const initials = (name: string) =>
  name
    .replace(/^(Alhaji|Mr\.?|Mrs\.?|Dr\.?)\s+/i, '')
    .replace(/,.*$/, '')
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .slice(0, 3)
