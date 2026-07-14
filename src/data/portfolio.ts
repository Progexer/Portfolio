/**
 * Single source of truth for all portfolio content.
 * Every value here is real — no placeholder data.
 */

export const PROFILE = {
  name: 'Amit Kumar',
  firstName: 'Amit',
  lastName: 'Kumar',
  initials: 'AK',
  // Circular avatar shown in the navbar (and About profile card).
  // Drop your photo at `public/profile.jpg` and point this at '/profile.jpg'.
  // Falls back to the monogram automatically if the image is missing.
  avatar: '/profile.png',
  location: 'Greater Noida, India',
  email: 'amit.kumar97959@gmail.com',
  phone: '6392328870',
  github: 'https://github.com/Progexer',
  githubUser: 'Progexer',
  linkedin: 'https://www.linkedin.com/in/amitkumar-ds/',
  resumeUrl: '/Amit_Kumar_Resume.pdf',
  roles: [
    'Data Scientist',
    'AI Engineer',
    'ML Engineer',
    'Backend Developer',
    'Data Analyst',
  ],
  intro:
    "Third-year Computer Science (Data Science) student at Bennett University. I build production-ready AI applications — from data pipelines and ML models to deployed APIs and interactive dashboards.",
  tagline:
    'I build AI-powered software, scalable backend systems, and production-ready machine learning applications.',
} as const

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
] as const

export const ABOUT = {
  location: 'Greater Noida, India',
  degree: 'B.Tech Computer Science (Data Science)',
  university: 'Bennett University',
  graduation: '2028',
  cgpa: '7.21',
  openTo: [
    'AI / ML Internships',
    'Data Science Roles',
    'Backend Engineering',
    'Research Positions',
  ],
  bio: [
    "I'm driven by the intersection of artificial intelligence and product engineering. My work spans the full machine learning lifecycle — from exploratory data analysis and feature engineering to model training, API development, and deployment.",
    "I've built end-to-end AI platforms, fake profile detection systems, and smart agriculture tools. Every project ships with production-quality code, proper APIs, and clean architecture.",
  ],
} as const

export type SkillCategory = {
  name: string
  items: string[]
}

export const SKILLS: SkillCategory[] = [
  {
    name: 'Languages',
    items: ['Python', 'C++', 'Java', 'JavaScript', 'SQL'],
  },
  {
    name: 'Machine Learning',
    items: [
      'Scikit-learn',
      'NumPy',
      'Pandas',
      'XGBoost',
      'Random Forest',
      'Feature Engineering',
      'EDA',
      'Data Visualization',
    ],
  },
  {
    name: 'Backend',
    items: [
      'FastAPI',
      'REST API',
      'JWT',
      'Supabase',
      'PostgreSQL',
      'Redis',
      'Celery',
      'Docker',
      'SQLAlchemy',
      'Alembic',
    ],
  },
  {
    name: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'Framer Motion'],
  },
  {
    name: 'Visualization',
    items: ['Power BI', 'Plotly', 'Matplotlib', 'Seaborn'],
  },
  {
    name: 'Tools & Infra',
    items: ['Git', 'GitHub', 'VS Code', 'Render', 'Vercel', 'Docker', 'Figma'],
  },
]

export type Project = {
  title: string
  tagline: string
  description: string
  github: string
  live?: string
  featured?: boolean
  tech: string[]
  features?: string[]
  role?: string[]
  metrics?: { label: string; value: string }[]
  category: string
}

export const PROJECTS: Project[] = [
  {
    title: 'AI-Powered Supply Chain Intelligence Platform',
    tagline: 'End-to-end AI analytics for modern supply chains',
    description:
      'Built a complete AI-powered supply chain analytics platform that automates ETL pipelines, demand forecasting, shipment delay prediction, supplier performance analysis, inventory optimization, and interactive business dashboards.',
    github:
      'https://github.com/Progexer/AI-Powered-Supply-Chain-Intelligence-Platform',
    featured: true,
    category: 'AI / Full Stack',
    tech: [
      'React',
      'FastAPI',
      'PostgreSQL',
      'Supabase',
      'Power BI',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Random Forest',
      'Docker',
      'Render',
      'Vercel',
    ],
    features: [
      'Demand Forecasting',
      'Shipment Delay Prediction',
      'Supplier Risk Analysis',
      'Inventory Optimization',
      'Power BI Dashboard',
      'Real-time Analytics',
      'Responsive Dashboard',
      'Production-ready APIs',
    ],
    metrics: [
      { label: 'ML Modules', value: '6+' },
      { label: 'Pipeline', value: 'Automated ETL' },
      { label: 'Deployment', value: 'Docker + Cloud' },
    ],
  },
  {
    title: 'AuthentiX',
    tagline: 'Fake profile detection across social platforms',
    description:
      'Machine learning platform for fake social media profile detection across Instagram, Facebook, and X using multiple profile characteristics and feature-based classification.',
    github: 'https://github.com/Progexer',
    featured: true,
    category: 'Machine Learning',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Feature Engineering', 'EDA'],
    features: [
      'Multi-platform detection',
      'Feature-based classification',
      'Profile signal analysis',
      'Model evaluation pipeline',
    ],
    metrics: [
      { label: 'Platforms', value: '3' },
      { label: 'Approach', value: 'Ensemble ML' },
    ],
  },
  {
    title: 'Naami',
    tagline: 'Student networking & events for campus communities',
    description:
      'Student networking and event platform built for hackathons and college communities. Architected the complete backend with authentication, database design, and API integration.',
    github: 'https://github.com/Progexer',
    category: 'Backend',
    tech: ['FastAPI', 'PostgreSQL', 'JWT', 'REST API', 'SQLAlchemy'],
    role: ['Backend Architecture', 'Authentication System', 'Database Design', 'API Integration'],
    metrics: [
      { label: 'Focus', value: 'Backend' },
      { label: 'Auth', value: 'JWT' },
    ],
  },
  {
    title: 'Crop Recommendation ML',
    tagline: 'Smart agriculture powered by soil & climate data',
    description:
      'Machine learning recommendation engine using environmental and soil parameters for smart agriculture, guiding optimal crop selection with high-accuracy classification models.',
    github: 'https://github.com/Progexer',
    category: 'Machine Learning',
    tech: ['Python', 'Scikit-learn', 'Random Forest', 'Pandas', 'NumPy'],
    features: [
      'Soil parameter analysis',
      'Climate-aware recommendations',
      'High-accuracy classification',
    ],
    metrics: [
      { label: 'Domain', value: 'AgriTech' },
      { label: 'Model', value: 'Random Forest' },
    ],
  },
]

export const EXPERIENCE = [
  {
    role: 'Data Science Intern',
    org: 'AI / Machine Learning Internship',
    period: 'Internship',
    summary:
      'Worked end-to-end across the machine learning lifecycle — from raw data to deployed, visualized insight.',
    points: [
      'Data preprocessing & cleaning',
      'ETL pipeline development',
      'Machine Learning modeling',
      'Backend APIs with FastAPI',
      'Data visualization with Power BI',
      'Model deployment',
    ],
    stack: ['Python', 'FastAPI', 'Pandas', 'Scikit-learn', 'Power BI', 'Docker'],
  },
] as const

export const LEADERSHIP = [
  {
    org: 'Solace Studio',
    role: 'Co-Head, PR & Outreach',
    summary:
      'Led public relations and outreach — building partnerships, growing the community, and driving engagement across events.',
    points: [
      'Managed outreach & communications',
      'Handled collaborations & partnerships',
      'Drove community engagement',
      'Organized events',
    ],
  },
] as const

export const ACHIEVEMENTS = [
  {
    title: 'SIH Internal Hackathon',
    detail: 'Participant — Smart India Hackathon internal round.',
  },
  {
    title: 'Production-ready AI Projects',
    detail: 'Built and shipped multiple end-to-end AI applications.',
  },
  {
    title: 'End-to-end ML Deployments',
    detail: 'Trained, packaged and deployed machine learning models.',
  },
  {
    title: 'Production Web Applications',
    detail: 'FastAPI + React apps from API to responsive UI.',
  },
  {
    title: 'Data Analytics Dashboards',
    detail: 'Interactive Power BI & web dashboards for decision-making.',
  },
] as const

export const EDUCATION = [
  {
    level: 'University',
    title: 'B.Tech in Computer Science & Engineering (Data Science)',
    detail: `Bennett University — CGPA ${ABOUT.cgpa}`,
    period: '2024 – 2028',
  },
] as const

export const STATS = [
  { label: 'Projects Shipped', value: 6, suffix: '+' },
  { label: 'Technologies', value: 30, suffix: '+' },
  { label: 'CGPA', value: 7.21, decimals: 2 },
  { label: 'Graduating', value: 2028, grouping: false },
] as const
