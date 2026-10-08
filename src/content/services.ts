/** Core services. Source: docs/company-profile-notes.docx, "Our Core Services". */

import type { IconName } from './icons.ts'

export interface Service {
  slug: string
  title: string
  shortTitle: string
  icon: IconName
  /** One-line summary for cards and meta descriptions. */
  summary: string
  intro: string[]
  listHeading: string
  items: string[]
  /** Professional-boundary statement shown beneath the list, where the source provides one. */
  note?: string
}

export const services: Service[] = [
  {
    slug: 'security-management',
    title: 'Security Management',
    shortTitle: 'Security Management',
    icon: 'shield',
    summary:
      'Advisory services that help organisations understand and manage their security risks.',
    intro: [
      'We provide security management advisory services designed to help organisations understand and manage their security risks.',
    ],
    listHeading: 'Services may include',
    items: [
      'Security risk assessments',
      'Security management reviews',
      'Workplace security',
      'Physical security assessment',
      'Access-control reviews',
      'Security policies and procedures',
      'Incident management',
      'Security awareness programmes',
      'Executive and organisational security advisory',
      'Security training and capacity building',
    ],
  },
  {
    slug: 'corporate-crime-investigation',
    title: 'Corporate Crime Investigation',
    shortTitle: 'Investigations',
    icon: 'search',
    summary:
      'Professional fact-finding into suspected internal and external criminal or unethical activity.',
    intro: [
      'We assist organisations in addressing suspected internal and external criminal or unethical activities through professional fact-finding and investigative processes.',
    ],
    listHeading: 'Areas may include',
    items: [
      'Fraud investigations',
      'Theft and loss investigations',
      'Procurement-related irregularities',
      'Employee misconduct',
      'Financial and accounting irregularities',
      'Conflict-of-interest concerns',
      'Internal control failures',
      'Corporate intelligence gathering',
      'Background investigations',
      'Investigative reporting',
    ],
    note: 'All investigative assignments are undertaken within applicable laws, professional standards and the terms of engagement agreed with the client.',
  },
  {
    slug: 'due-diligence',
    title: 'Due Diligence',
    shortTitle: 'Due Diligence',
    icon: 'clipboard',
    summary: 'Reliable information on prospective partners and counterparties before you commit.',
    intro: [
      'Before entering into major business relationships, partnerships, contracts or transactions, organisations need reliable information about prospective partners and counterparties.',
    ],
    listHeading: 'Our due-diligence services may assist clients with',
    items: [
      'Corporate background checks',
      'Business partner due diligence',
      'Supplier and contractor due diligence',
      'Employee and executive background checks',
      'Third-party risk assessment',
      'Reputation and integrity checks',
      'Pre-transaction information gathering',
      'Organisational risk assessment',
    ],
  },
  {
    slug: 'asset-tracing',
    title: 'Asset Tracing',
    shortTitle: 'Asset Tracing',
    icon: 'trace',
    summary:
      'Professional asset-tracing support for legitimate corporate, legal and recovery purposes.',
    intro: [
      'Gyang Corporate Consult provides professional asset-tracing support for legitimate corporate, legal and recovery purposes.',
    ],
    listHeading: 'Assignments may involve identifying information concerning',
    items: [
      'Movable assets',
      'Immovable properties',
      'Business interests',
      'Corporate ownership information',
      'Other identifiable assets relevant to a lawful recovery process',
    ],
    note: 'Asset-tracing assignments are conducted subject to applicable laws, client authority and relevant professional requirements.',
  },
  {
    slug: 'debt-recovery-support',
    title: 'Debt Recovery Support',
    shortTitle: 'Debt Recovery',
    icon: 'recovery',
    summary:
      'Lawful, professional and commercially sensible support for recovering legitimate debts.',
    intro: [
      'We assist businesses and organisations experiencing challenges in recovering legitimate debts.',
    ],
    listHeading: 'Our approach may include',
    items: [
      'Review of debt documentation',
      'Debtor information assessment',
      'Engagement and negotiation',
      'Recovery strategy development',
      'Mediation and settlement support',
      'Referral for appropriate legal action where necessary',
    ],
    note: 'Our objective is to support lawful, professional and commercially sensible recovery processes.',
  },
  {
    slug: 'alternative-dispute-resolution',
    title: 'Alternative Dispute Resolution (ADR)',
    shortTitle: 'Dispute Resolution',
    icon: 'handshake',
    summary: 'Constructive ways to resolve disputes without lengthy litigation.',
    intro: [
      'Not every dispute needs to proceed through lengthy litigation.',
      'Gyang Corporate Consult provides ADR-related support designed to help parties explore constructive ways of resolving disputes.',
    ],
    listHeading: 'Our services may include',
    items: [
      'Mediation support',
      'Negotiation',
      'Conciliation',
      'Commercial dispute-resolution support',
      'Workplace dispute resolution',
      'Community and institutional dispute-resolution support',
      'Settlement facilitation',
    ],
    note: 'Where formal legal representation or regulated professional services are required, matters may be referred to appropriately qualified professionals.',
  },
  {
    slug: 'workshops-conferences-training',
    title: 'Workshops, Conferences and Training',
    shortTitle: 'Training',
    icon: 'training',
    summary: 'Customised workshops, seminars, conferences and capacity-building programmes.',
    intro: [
      'We design and deliver customised workshops, seminars, conferences and capacity-building programmes for organisations.',
    ],
    listHeading: 'Possible training areas include',
    items: [
      'Security management',
      'Corporate crime prevention',
      'Fraud awareness',
      'Financial crime risks',
      'Corporate investigations',
      'Due diligence',
      'Risk management',
      'Workplace ethics',
      'Internal controls',
      'Asset protection',
      'Loss prevention',
      'Management of corporate security',
      'Investigative interviewing',
      'Evidence preservation',
      'Conflict management',
      'Professional ethics and integrity',
    ],
    note: 'Programmes can be designed as one-day workshops, short courses, executive seminars, conferences or customised institutional training programmes.',
  },
  {
    slug: 'proposal-concept-development',
    title: 'Proposal and Concept Development',
    shortTitle: 'Proposal Development',
    icon: 'document',
    summary: 'Professional proposals and concept notes for organisations, NGOs and institutions.',
    intro: [
      'Gyang Corporate Consult assists organisations, NGOs, community-based organisations and other institutions to develop professional proposals and concept notes.',
    ],
    listHeading: 'Services include',
    items: [
      'Project concept development',
      'Funding proposals',
      'Grant proposals',
      'Corporate partnership proposals',
      'CSR proposals',
      'Project documentation',
      'Institutional profiles',
      'Strategic programme development',
      'Monitoring and implementation framework',
    ],
  },
]

export function findService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
