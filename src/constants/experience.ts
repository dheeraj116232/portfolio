export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  period: string
  type: 'Internship' | 'Leadership' | 'Project'
  bullets: string[]
  tech: string[]
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'fullstack-intern',
    role: 'Full-Stack Web Developer Intern',
    company: 'NIT Tiruchirappalli',
    location: 'Tiruchirappalli, India',
    period: 'Jun 2025 – Aug 2025',
    type: 'Internship',
    bullets: [
      'Built 10+ responsive pages (CV, awards, publications) in React.js for a faculty member',
      'Shipped a Node.js + REST API file-management system, cutting content-update time from 1+ day to under 5 minutes',
      'Owned the project end-to-end: UI, backend, and deployment — solo, in 2 months',
    ],
    tech: ['React', 'Node.js', 'REST API', 'JavaScript'],
  },
  {
    id: 'ds-intern',
    role: 'Data Science Intern',
    company: 'NIT Tiruchirappalli',
    location: 'Tiruchirappalli, India',
    period: 'May 2025 – Jul 2025',
    type: 'Internship',
    bullets: [
      'Ran EDA on multi-million-row datasets with Python/SQL, lifting efficiency ~25%',
      'Built K-Means + PCA segmentation on 100K+ users, improving targeting ~30%',
      'Built a RAG chatbot (LangChain + MongoDB + LLMs), cutting analysis time ~40%',
    ],
    tech: ['Python', 'SQL', 'Scikit-learn', 'LangChain', 'MongoDB'],
  },
  {
    id: 'ml-intern',
    role: 'Machine Learning Intern',
    company: 'NIT Tiruchirappalli',
    location: 'Tiruchirappalli, India',
    period: 'Dec 2024 – Jan 2025',
    type: 'Internship',
    bullets: [
      'Classified driving behavior from multi-sensor telemetry data',
      'Built SVM & Random Forest models hitting 92% accuracy',
      'Tuned features and hyperparameters for measurable performance gains',
    ],
    tech: ['Python', 'SVM', 'Random Forest', 'Scikit-learn'],
  },
  {
    id: 'aayam',
    role: 'Manager, Events & Publicity',
    company: 'Aayam — The Hindi Cell, NIT Trichy',
    location: 'Campus',
    period: 'Jun 2025 – Present',
    type: 'Leadership',
    bullets: [
      'Led 7+ campus events end-to-end spanning publicity, logistics, and execution',
      'Coordinated cross-functional student teams under tight timelines',
    ],
    tech: ['Leadership', 'Event Management'],
  },
  {
    id: 'builders-hive',
    role: 'Manager',
    company: "The Builder's Hive — Civil Engineering Club",
    location: 'Campus',
    period: '2024 – 2025',
    type: 'Leadership',
    bullets: [
      'Ran technical contests and quizzes for civil engineering students',
      'Fostered a builder culture around applied problem-solving',
    ],
    tech: ['Community', 'Technical Contests'],
  },
]

export interface EducationItem {
  id: string
  institution: string
  degree: string
  field: string
  minor?: string
  period: string
  location: string
  details: string[]
  cgpa?: string
}

export const EDUCATION: EducationItem[] = [
  {
    id: 'nit-trichy',
    institution: 'NIT Tiruchirappalli',
    degree: 'Bachelor of Technology',
    field: 'Civil Engineering',
    minor: 'Computer Science',
    period: '2022 – 2026',
    location: 'Tiruchirappalli, India',
    cgpa: '—',
    details: [
      'Minor specialization in Computer Science',
      'Focus areas: AI/ML, Generative AI, Full-Stack Development',
      'Active in Aayam (Hindi Cell) and The Builder\'s Hive',
      'Open to SDE / AI-ML Engineer roles',
    ],
  },
]

export interface Achievement {
  id: string
  title: string
  subtitle: string
  description: string
  icon: 'medal' | 'trophy' | 'code' | 'research' | 'hackathon' | 'school'
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'naukri',
    title: 'Naukri Scholarship 2025',
    subtitle: 'College Rank #2 · National #614 / 25,000+',
    description:
      'Recognized among top scholars nationally for academic and technical excellence.',
    icon: 'trophy',
  },
  {
    id: 'olympiad',
    title: 'National Mathematics Olympiad',
    subtitle: 'AIR 513',
    description: 'Demonstrated strong mathematical foundations underpinning ML & algorithms.',
    icon: 'medal',
  },
  {
    id: 'hcl',
    title: 'HCLTech Hackathon 2026',
    subtitle: 'Real-world data problems',
    description: 'Collaborated under pressure to solve industry-grade data challenges.',
    icon: 'hackathon',
  },
  {
    id: 'nit',
    title: 'NIT Tiruchirappalli',
    subtitle: "B.Tech Civil · Minor CS · Class of '26",
    description: 'Premier NIT with rigorous engineering + CS exposure.',
    icon: 'school',
  },
  {
    id: 'research',
    title: 'Research & Internships',
    subtitle: 'ML · Data Science · Full-Stack',
    description:
      'Three internships spanning classical ML, large-scale analytics, and production web systems.',
    icon: 'research',
  },
  {
    id: 'leetcode',
    title: 'Competitive Programming',
    subtitle: 'LeetCode · Code360',
    description:
      'Consistent practice on LeetCode and Naukri Code360 strengthening DSA & problem-solving.',
    icon: 'code',
  },
]

export interface Certification {
  id: string
  title: string
  issuer: string
  year: string
  credential?: string
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'oracle-ai',
    title: 'Oracle AI Foundations',
    issuer: 'Oracle',
    year: '2025',
    credential: '/Oracle_AI Foundations Associate_eCertificate.pdf',
  },
  {
    id: 'oracle-genai',
    title: 'Oracle Generative AI',
    issuer: 'Oracle',
    year: '2025',
    credential: '/Generative AI Professional_eCertificate_copy.pdf',
  },
  {
    id: 'naukri-sch',
    title: 'Naukri Scholarship Awardee',
    issuer: 'Naukri / Code360',
    year: '2025',
    credential: '/Screenshot 2026-07-31 222407.png',
  },
  {
    id: 'ml-code360',
    title: 'Machine Learning',
    issuer: 'Code360',
    year: '2025',
    credential: '/Machine_Learning_certificate.pdf',
  },
  {
    id: 'chatgpt-code360',
    title: 'ChatGPT guided path',
    issuer: 'Code360',
    year: '2025',
    credential: '/CHAT GPT Guideed_path.pdf',
  },
  {
    id: 'hcl-hack',
    title: 'HCLTech Hackathon Participant',
    issuer: 'HCLTech',
    year: '2026',
  },
]
