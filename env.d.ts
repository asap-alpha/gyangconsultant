/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public origin of the deployed site, e.g. https://www.example.com (no trailing slash). */
  readonly VITE_SITE_URL?: string
  /** Optional form endpoint (e.g. Formspree) that accepts JSON POSTs from the contact form. */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
