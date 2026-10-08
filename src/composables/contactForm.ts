import { company, contact } from '@/content/site'

export interface Enquiry {
  name: string
  organisation: string
  email: string
  phone: string
  service: string
  message: string
  /** Honeypot: real visitors never see or fill this field. */
  website: string
}

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>

export const emptyEnquiry = (): Enquiry => ({
  name: '',
  organisation: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  website: '',
})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/

export function validateEnquiry(e: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  if (e.name.trim().length < 2) errors.name = 'Enter your full name.'
  if (!e.email.trim()) errors.email = 'Enter your email address.'
  else if (!EMAIL_RE.test(e.email.trim()))
    errors.email = 'Enter an email address in the format name@example.com.'
  if (e.phone.trim() && !PHONE_RE.test(e.phone.trim()))
    errors.phone = 'Enter a valid phone number, e.g. +233 20 000 0000.'
  if (e.message.trim().length < 10)
    errors.message = 'Tell us briefly how we can help (at least 10 characters).'
  return errors
}

export function buildMailto(e: Enquiry, to: string): string {
  const subject = `Enquiry${e.service ? `: ${e.service}` : ''} — ${e.name.trim()}`
  const details: [string, string][] = [
    ['Name', e.name],
    ['Organisation', e.organisation],
    ['Email', e.email],
    ['Phone', e.phone],
    ['Service of interest', e.service],
  ]
  const body = [
    ...details.filter(([, v]) => v.trim()).map(([k, v]) => `${k}: ${v.trim()}`),
    '',
    e.message.trim(),
  ].join('\n')
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export type SubmitResult = 'sent' | 'mail-client' | 'unavailable'

/**
 * Delivers an enquiry. Uses VITE_CONTACT_ENDPOINT when configured, otherwise
 * falls back to opening the visitor's email client addressed to the company.
 */
export async function submitEnquiry(
  e: Enquiry,
  endpoint = import.meta.env.VITE_CONTACT_ENDPOINT,
): Promise<SubmitResult> {
  if (e.website) return 'sent' // silently drop bot submissions
  if (endpoint) {
    const { website: _honeypot, ...payload } = e
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...payload, _subject: `Website enquiry — ${company.name}` }),
    })
    if (!res.ok) throw new Error(`Enquiry endpoint responded ${res.status}`)
    return 'sent'
  }
  if (contact.email) {
    window.location.href = buildMailto(e, contact.email)
    return 'mail-client'
  }
  return 'unavailable'
}
