/**
 * Board of Directors. Names, roles and biographies supplied by the client (2026-10-03);
 * lightly edited for typos and to remove references to other organisations' boards.
 *
 * Photos live in src/assets/team/<slug>-320.webp and <slug>-640.webp (4:5 portrait).
 * A member without a photo falls back to initials.
 */

export interface BoardMember {
  slug: string
  name: string
  /** Board position, shown above the name. */
  role: string
  /** Additional designation, shown beneath the name. */
  title?: string
  /** First paragraph, always visible. */
  summary?: string
  /** Remaining biography, revealed by "Read full profile". */
  bio?: string[]
  qualifications?: string[]
}

export const board: BoardMember[] = [
  {
    slug: 'mohammed-affum',
    name: 'Mohammed Affum',
    role: 'Member',
    summary:
      "Mohammed Affum is a distinguished journalist and industrial relations practitioner with an extensive career spanning media, labour governance and public accountability. He brings decades of experience in fostering transparent governance and strengthening institutional frameworks across Ghana's public and private sectors.",
    bio: [
      'Mr. Affum served as Editor of the Ghanaian Chronicle, where he demonstrated his commitment to investigative journalism and editorial excellence. His expertise in labour relations was further evidenced through his role as Public Affairs Officer at the National Labour Commission, where he played a pivotal role in communicating labour policies and fostering dialogue between stakeholders.',
      "Throughout his career, Mr. Affum has held several prestigious board positions that underscore his reputation as a trusted governance expert. He has served on the boards of the National Media Commission, Graphic Communications Group Limited and the Public Interest and Accountability Committee, contributing his insights to media regulation, corporate governance and the transparent management of Ghana's natural resource revenues.",
      'Currently, Mr. Affum serves as Coordinator of the Governance Research Bureau, where he continues to advance research and advocacy on governance issues, leveraging his multidisciplinary background to promote accountability, transparency and effective public administration in Ghana.',
    ],
  },
  {
    slug: 'hope-nyadi',
    name: 'Hope Nyadi',
    role: 'Member',
    summary:
      'Mr. Hope Kwaku Nyadi is a retired Senior Staff Officer who served with distinction at the Economic and Organised Crime Office (EOCO) and voluntarily retired from the Ghana Police Service at the rank of Deputy Superintendent after over three decades of investigative service.',
    bio: [
      'His extensive career includes notable appointments such as Corporate Security Manager at the West Africa Head Office of United Bank for Africa (UBA) in Accra and Secretary to the Deputy Director of Operations at EOCO.',
      'During his tenure at EOCO, Mr. Nyadi held several strategic positions, including Head of the Financial Crime Unit, Head of the Analysis Unit and Deputy Head of the Mutual Legal Assistance Unit. In the Ghana Police Service, he also served as Head of the Commercial Crime Unit at the Criminal Investigations Department (CID) Headquarters and as District Crime Officer in Community One, Tema.',
      'A trained teacher by profession, Mr. Nyadi is also a seasoned Financial Sector Security Manager and Intelligence Officer with a deep commitment to developing strategies aimed at safeguarding the public purse. He is widely recognised as a polymath, with expertise spanning business and industrial management, law enforcement, intelligence gathering and analysis, illicit asset tracing and recovery, corporate strategy and Appropriate Dispute Resolution (ADR).',
      'In addition to the qualifications below, he has earned numerous career development certificates from both local and international institutions.',
      'Mr. Nyadi currently serves as an adjunct lecturer at the University of Ghana Business School (Legon) and Wisconsin International University College (Accra), where he lectures in Corporate Security Management and Investigation Studies. He brings a wealth of knowledge, leadership and practical experience to the financial crime and corporate security sectors, and is regarded as one of the industry’s foremost experts.',
    ],
    qualifications: [
      'Master of Arts in Criminology',
      'Master of Business Administration (MBA) in Global Corporate Strategy',
      'Master of Laws (LL.M) in Corporate and Commercial Law',
      'Postgraduate Diploma in Public Administration',
      'Professional Executive Master’s in Appropriate Dispute Resolution (ADR)',
      'Diploma in Protecting the Public Purse (Cairo, Egypt)',
    ],
  },
  {
    slug: 'seidu-iddisah',
    name: 'Alhaji Seidu Iddrisu Iddisah, Esq.',
    role: 'Member',
    title: 'Commissioner (Rtd.), Customs Division, GRA',
    summary:
      'Alhaji Seidu Iddrisu Iddisah is a distinguished legal practitioner, public servant and security governance expert. With over 34 years of dedicated service in the Customs Division of the Ghana Revenue Authority, he brings extensive experience in customs administration, border security management, ethics and good governance, intelligence coordination and national security administration.',
    bio: [
      'Born in Kumbungu in the Northern Region of Ghana, Alhaji Iddisah has earned a reputation for professionalism, integrity and strategic leadership throughout his distinguished public service career.',
      'Academically, he possesses a strong multidisciplinary background in law, governance, conflict management and security studies. He holds a Bachelor of Arts Degree, an LLB from the University of Ghana, a Professional Law Degree from the Ghana School of Law, and a Master’s Degree in Conflict and Security Studies from the Kofi Annan International Peacekeeping Training Centre.',
      'During his long and successful career with the Ghana Revenue Authority, he served in several strategic leadership positions, including Assistant Commissioner and Deputy Commissioner of the Preventive (Enforcement) Department, Deputy Commissioner for Ethics and Good Governance, and ultimately Commissioner of the Customs Division. His contributions significantly enhanced customs enforcement, anti-smuggling operations, institutional governance, ethical compliance and national revenue protection.',
      'Alhaji Iddisah has also served on numerous high-level national boards and committees, where he contributed immensely to Ghana’s security and governance architecture. These include the Regional Security Committee of the Greater Accra Region, the District Security Committee in Lawra, the Boards of the Economic and Organised Crime Office, the Narcotics Control Commission, the National Commission on Small Arms and Light Weapons, the Ghana Maritime Authority and the National Boundary Commission, among several other national security and intelligence committees.',
      'He brings strategic leadership and policy guidance in anti-corruption advocacy, financial crime prevention, ethics, border security, governance and institutional development.',
    ],
  },
  {
    slug: 'charles-antwi',
    name: 'Charles Nana Antwi',
    role: 'Member',
    summary:
      'Charles Nana Antwi is a highly distinguished intelligence professional, legal practitioner and public sector leader with four decades of dedicated service to the Republic of Ghana. His career spans intelligence operations, investigations, executive leadership and legal practice, positioning him as a respected authority in national security, governance and institutional oversight.',
    bio: [
      'Mr. Antwi is a trained Intelligence Officer and qualified Legal Practitioner. He served for 40 years in public service prior to his retirement in 2023, holding critical operational and leadership roles within Ghana’s intelligence and law enforcement architecture. His public sector career includes extensive work as an intelligence operative, investigator and executive directorate official.',
      'He served with the Bureau of National Investigations (BNI), where he held several senior command positions, including Head of the Investigation Department at Headquarters, Regional Commander for the Ashanti Region and Regional Commander for the Greater Accra Region. His leadership was marked by professionalism, strategic rigour and a strong commitment to national security and the rule of law.',
      'At the executive level, Mr. Antwi served as Deputy Executive Director of the Economic and Organised Crime Office (EOCO) for six years, contributing significantly to the fight against economic and organised crime and strengthening institutional accountability.',
      'In the private sector, he is an experienced private legal practitioner, bringing practical legal insight to governance, compliance and dispute resolution.',
      'Beyond his professional career, Mr. Antwi is a revered traditional leader. Since 1994, he has served as the Chief of Akyem Kakoase under the stool name Barima Antwi Asante II, providing traditional leadership and community stewardship.',
      'He brings exceptional expertise in intelligence, law, governance and ethical leadership.',
    ],
  },
  {
    slug: 'paul-agyei-gyang',
    name: 'Paul Agyei Gyang',
    role: 'Executive Director',
    summary:
      'Paul Agyei Gyang is a seasoned law enforcement and financial crime expert with over two decades of progressive experience in criminal investigations, organised crime prevention and corporate security management. He currently serves as the Northern Regional Director of the Economic and Organised Crime Office (EOCO) and volunteers as a Research Fellow at the International Centre for Public Development (I.C.P.D).',
    bio: [
      'Before his current role, Paul served as a Detective Inspector with the Ghana Police Service, Corporate Security Assistant at Nestlé Central and West Africa, and Security Manager at Nestlé Ghana Limited. Within EOCO, he has held several strategic leadership positions, including Head of the Financial Crime Unit, Head of the Organised Crime Unit, Team Lead for Special Investigations, Regional Director (Greater Accra Region) and Second-in-Command of the Procurement Fraud Unit. His analytical insight and investigative acumen have made significant contributions to national anti-corruption and organised crime control efforts.',
      'Paul’s academic and professional background reflects a deep commitment to governance, law and security. He holds an LLB, a Master’s Degree in Conflict, Peace and Security, and a Bachelor’s Degree in Marketing.',
      'Since 2018 he has served as an Adjunct Lecturer in Corporate Crime Investigation and Security Management at Knutsford University College in Accra, combining academic depth with practical experience.',
    ],
    qualifications: [
      'Certificate in Organised Crime — Organised Crime College, Caserta, Italy',
      'Financial Crime Management — City of London Police',
      'Certificate in Disclosure Procedures — Attorney-General’s Office, Ghana',
      'Leadership and Management — EOCO Ghana and Commonwealth Secretariat, UK',
      'Financial Crimes Investigations — US Department of State Bureau of International Narcotics and Law Enforcement Affairs',
      'Cybercrime — UNODC e-Crime Bureau',
      'Anti-Terrorism Financing — UNODC',
    ],
  },
]

export const executiveDirector = board.find((m) => m.slug === 'paul-agyei-gyang')!
