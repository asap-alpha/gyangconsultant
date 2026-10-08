import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  buildMailto,
  emptyEnquiry,
  submitEnquiry,
  validateEnquiry,
  type Enquiry,
} from '@/composables/contactForm'
import { contact } from '@/content/site'

const valid = (over: Partial<Enquiry> = {}): Enquiry => ({
  ...emptyEnquiry(),
  name: 'Ama Mensah',
  email: 'ama@example.com',
  message: 'We would like a security risk assessment.',
  ...over,
})

describe('validateEnquiry', () => {
  it('accepts a complete enquiry', () => {
    expect(validateEnquiry(valid())).toEqual({})
  })

  it('requires name, email and message', () => {
    const errors = validateEnquiry(emptyEnquiry())
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name'])
  })

  it('rejects malformed email and phone', () => {
    const errors = validateEnquiry(valid({ email: 'ama@', phone: 'call me' }))
    expect(errors.email).toBeDefined()
    expect(errors.phone).toBeDefined()
  })

  it('accepts Ghanaian phone formats', () => {
    expect(validateEnquiry(valid({ phone: '+233 20 123 4567' }))).toEqual({})
    expect(validateEnquiry(valid({ phone: '020-123-4567' }))).toEqual({})
  })
})

describe('buildMailto', () => {
  it('encodes subject and body', () => {
    const href = buildMailto(valid({ service: 'Due Diligence' }), 'info@example.com')
    expect(href.startsWith('mailto:info@example.com?subject=')).toBe(true)
    expect(decodeURIComponent(href)).toContain('Service of interest: Due Diligence')
  })
})

describe('submitEnquiry', () => {
  afterEach(() => vi.restoreAllMocks())

  it('drops honeypot submissions without sending', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    expect(await submitEnquiry(valid({ website: 'spam' }), 'https://x.test')).toBe('sent')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('posts JSON without the honeypot field when an endpoint is set', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'))
    expect(await submitEnquiry(valid(), 'https://x.test')).toBe('sent')
    const body = JSON.parse(String(fetchSpy.mock.calls[0]?.[1]?.body))
    expect(body.website).toBeUndefined()
    expect(body.email).toBe('ama@example.com')
  })

  it('throws when the endpoint fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 500 }))
    await expect(submitEnquiry(valid(), 'https://x.test')).rejects.toThrow()
  })

  it('falls back to the mail client when only an email is configured', async () => {
    vi.spyOn(contact, 'email', 'get').mockReturnValue('info@example.com')
    expect(await submitEnquiry(valid(), '')).toBe('mail-client')
  })

  it('reports unavailable when no endpoint or email is configured', async () => {
    vi.spyOn(contact, 'email', 'get').mockReturnValue(null)
    expect(await submitEnquiry(valid(), '')).toBe('unavailable')
  })
})
