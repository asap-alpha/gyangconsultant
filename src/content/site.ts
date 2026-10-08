/**
 * Company-wide facts. Source: docs/company-profile-notes.docx
 *
 * Contact fields left as `null` were "[Insert …]" placeholders in the source notes.
 * Fill them in here and they will appear across the header, footer, contact page
 * and structured data automatically.
 */

import type { IconName } from './icons.ts'

export interface ContactDetails {
  email: string | null
  /** Display format, e.g. "+233 20 000 0000". Multiple numbers allowed. */
  phones: string[]
  address: string | null
}

export const company = {
  name: 'Gyang Corporate Consult',
  legalForm: 'Limited liability company registered in Ghana',
  tagline: 'Protecting Organisations. Managing Risk. Supporting Integrity.',
  strapline:
    'Professional Solutions in Security, Corporate Crime Prevention, Investigation and Business Advisory',
  descriptor: 'Professional Corporate Advisory, Security and Investigative Solutions',
  summary:
    'Gyang Corporate Consult is a Ghanaian limited liability company established to provide professional, practical and confidential consultancy services to businesses, institutions, public organisations, civil society organisations and other entities seeking to strengthen their security, governance, financial integrity, dispute-resolution mechanisms and organisational effectiveness.',
  focus:
    'The company operates with a particular focus on the five northern regions of Ghana — Northern, Savannah, North East, Upper East and Upper West Regions — while remaining available to clients throughout Ghana.',
  expertise:
    'We bring together expertise in security management, corporate crime investigation, due diligence, asset tracing, debt recovery, Alternative Dispute Resolution (ADR), proposal development, workshops, conferences and institutional capacity building.',
  approachLine:
    'Our approach is practical, confidential, evidence-based and tailored to the specific needs of each client.',
} as const

export const contact: ContactDetails = {
  email: 'info@gyangcorporateconsult.com',
  phones: ['+233 24 426 3774'],
  address: 'Plot No. 206, Fuo Extension Residential, Tamale',
}

export const regions = [
  'Northern Region',
  'Savannah Region',
  'North East Region',
  'Upper East Region',
  'Upper West Region',
] as const

export const about = {
  intro:
    'Gyang Corporate Consult was established to respond to the growing need for professional corporate advisory, security and crime-prevention services in Ghana.',
  risks:
    'Organisations today face a range of risks, including fraud, theft, financial misconduct, employee-related losses, corporate disputes, inadequate internal controls, reputational risks, debt recovery challenges and security threats.',
  whatWeDo:
    'We work with organisations to identify risks, strengthen preventive systems, investigate suspected wrongdoing, recover assets and debts where appropriate, resolve disputes and build the capacity of personnel to protect organisational resources.',
  sectors:
    'Our services are designed for both public and private sector organisations, with particular attention to the operational realities of institutions in Northern Ghana.',
  belief:
    'We believe that effective prevention is often more valuable than responding to losses after they have occurred.',
  vision:
    'To become a trusted and respected corporate consultancy in Ghana, providing professional, ethical and practical solutions in security management, corporate crime prevention, investigations, dispute resolution and organisational risk management.',
  mission:
    'To provide professional, confidential and evidence-based consultancy services that help organisations prevent crime, protect assets, resolve disputes, manage risks, strengthen internal systems and improve organisational effectiveness.',
  objectives: [
    'Provide professional security management and corporate risk advisory services.',
    'Assist organisations in preventing and detecting corporate crime, fraud and other forms of misconduct.',
    'Provide professional corporate investigation and fact-finding services within applicable laws and professional standards.',
    'Conduct due diligence to assist clients in making informed business and institutional decisions.',
    'Assist clients in tracing assets and identifying information relevant to legitimate recovery processes.',
    'Support organisations in debt recovery through lawful and professional approaches.',
    'Provide Alternative Dispute Resolution services to help parties resolve disputes efficiently and constructively.',
    'Develop and deliver workshops, conferences, seminars and executive training programmes.',
    'Assist organisations, NGOs and institutions with professional proposal and concept-note development.',
    'Strengthen the capacity of organisations to identify, assess and manage security, fraud and operational risks.',
    'Promote ethical conduct, accountability, integrity and responsible corporate governance.',
    'Provide specialised consultancy services to organisations operating in Northern Ghana and other parts of the country.',
  ],
} as const

export const principles = [
  {
    title: 'Prevention',
    text: 'We help clients identify risks before they become costly problems.',
  },
  {
    title: 'Professionalism',
    text: 'We approach every assignment with appropriate professional standards and attention to detail.',
  },
  {
    title: 'Confidentiality',
    text: 'Client information and assignment details are handled with appropriate confidentiality.',
  },
  {
    title: 'Integrity',
    text: 'We maintain high standards of honesty, objectivity and ethical conduct.',
  },
  {
    title: 'Practical Solutions',
    text: "Our recommendations are designed to be realistic, implementable and relevant to the client's operating environment.",
  },
] as const

export const lifecycle = [
  'Identify',
  'Assess',
  'Prevent',
  'Investigate',
  'Resolve',
  'Recover',
  'Strengthen',
] as const

export const clientModel = [
  { title: "The client's objective", question: 'What does the organisation need to achieve?' },
  { title: 'The risk or problem', question: 'What is creating the challenge?' },
  {
    title: 'The available evidence and information',
    question: 'What information can legitimately be assessed?',
  },
  { title: 'The appropriate intervention', question: 'What professional service is required?' },
  {
    title: 'The recommended solution',
    question: 'What practical steps can the organisation take?',
  },
  {
    title: 'Follow-up',
    question: 'How can the client strengthen its systems after the assignment?',
  },
] as const

export const commitments = [
  'Professional',
  'Ethical',
  'Confidential',
  'Evidence-Based',
  'Client-Focused',
  'Lawful',
] as const

export const northernCommitment = [
  'Gyang Corporate Consult is committed to contributing to the development of stronger, safer and more accountable institutions in Northern Ghana.',
  'We recognise the growing importance of effective corporate governance, security management, fraud prevention, responsible financial management and professional dispute resolution in the region.',
  'Our objective is to make high-quality professional consultancy services accessible to organisations operating within the five northern regions while building long-term relationships with businesses, institutions and communities.',
] as const

export const partners = {
  types: [
    'Corporate organisations',
    'Financial institutions',
    'Educational institutions',
    'Mining companies',
    'Hotels and hospitality businesses',
    'NGOs and development organisations',
    'Faith-based organisations',
    'Professional associations',
    'Local authorities',
    'Security and risk-management professionals',
    'Legal and ADR practitioners',
    'Research and training institutions',
  ],
  scope:
    'Partnerships may involve research, training, consultancy, conferences, capacity building and other mutually agreed professional activities.',
} as const

export interface ClientSector {
  sector: string
  icon: IconName
  needs: string
}

export const clients: ClientSector[] = [
  {
    sector: 'Hotels and Hospitality Businesses',
    icon: 'hotel',
    needs:
      'Security management, staff integrity, loss prevention, investigations and risk assessments.',
  },
  {
    sector: 'Schools and Educational Institutions',
    icon: 'school',
    needs:
      'Security assessments, staff training, safeguarding-related systems, integrity programmes and institutional risk management.',
  },
  {
    sector: 'Mining Companies',
    icon: 'mining',
    needs:
      'Security risk management, asset protection, investigations, due diligence and corporate crime prevention.',
  },
  {
    sector: 'Banks and Financial Institutions',
    icon: 'bank',
    needs:
      'Due diligence, fraud-risk awareness, investigations, security management and staff capacity development.',
  },
  {
    sector: 'Non-Governmental Organisations',
    icon: 'ngo',
    needs:
      'Due diligence, proposal development, fraud prevention, internal control awareness, investigations and institutional capacity building.',
  },
  {
    sector: 'Churches and Faith-Based Organisations',
    icon: 'faith',
    needs:
      'Security management, financial integrity awareness, governance support, investigations and staff/leadership training.',
  },
  {
    sector: 'Restaurants, Nightclubs and Entertainment Businesses',
    icon: 'entertainment',
    needs:
      'Security assessments, employee integrity, loss prevention, incident management and corporate security training.',
  },
  {
    sector: 'Metropolitan, Municipal and District Assemblies',
    icon: 'assembly',
    needs:
      'Capacity-building programmes, risk management, integrity and financial-crime prevention awareness, investigations and institutional advisory services, subject to applicable mandates and approvals.',
  },
  {
    sector: 'Other Corporate and Public Institutions',
    icon: 'building',
    needs: 'Customised services based on the specific needs and risk profile of each organisation.',
  },
]
