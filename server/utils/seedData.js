const seedOpportunities = [
  {
    company: 'OpenAI Technologies',
    role: 'AI & Full-Stack Engineering Intern',
    description: 'Join the team building next-generation AI interfaces and developer tooling. You will collaborate on modern web apps, intelligent workflow agents, and real-time backend microservices.',
    location: 'San Francisco, CA (Remote Option)',
    workMode: 'Remote',
    stipend: '$8,500 / month',
    salary: '$135,000 / year (Full-time Track)',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'Python', 'OpenAI API', 'Tailwind CSS'],
    eligibility: 'Computer Science or related majors, graduating 2026/2027',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Stripe Payments',
    role: 'Frontend Infrastructure Intern',
    description: 'Work on core financial dashboards and UI component libraries used by millions of global businesses. Focus on high-performance React design systems and responsive web platforms.',
    location: 'Seattle, WA',
    workMode: 'Hybrid',
    stipend: '$7,800 / month',
    salary: '$125,000 / year',
    requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML', 'Git', 'Testing Library'],
    eligibility: 'All tech disciplines with strong JavaScript fundamentals',
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Google Cloud Engine',
    role: 'Cloud Backend Engineer Intern',
    description: 'Architect scalable Express.js microservices and RESTful API endpoints powering enterprise cloud infrastructure and global database pipelines.',
    location: 'Mountain View, CA',
    workMode: 'On-site',
    stipend: '$8,000 / month',
    salary: '$130,000 / year',
    requiredSkills: ['Node.js', 'Express', 'MongoDB', 'Docker', 'REST API', 'C++'],
    eligibility: 'B.Tech / B.E / M.Tech in CS / IT / ECE',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Microsoft Azure AI',
    role: 'Machine Learning & Web Systems Intern',
    description: 'Deploy machine learning model APIs into interactive client applications. Bridge the gap between AI research and production SaaS dashboard interfaces.',
    location: 'Redmond, WA',
    workMode: 'Hybrid',
    stipend: '$7,500 / month',
    salary: '$120,000 / year',
    requiredSkills: ['Python', 'React', 'Node.js', 'PyTorch', 'SQL', 'Git'],
    eligibility: 'Engineering students with ML project background',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Uber Technologies',
    role: 'Full-Stack Software Developer Intern',
    description: 'Build real-time tracking systems and driver/rider management panels using modern MERN stack architecture, WebSockets, and spatial mapping APIs.',
    location: 'Austin, TX',
    workMode: 'Remote',
    stipend: '$7,200 / month',
    salary: '$118,000 / year',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'Redux'],
    eligibility: 'Students in pre-final or final year of graduation',
    deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Airbnb Engineering',
    role: 'UI/UX & Product Engineering Intern',
    description: 'Craft polished design systems, accessible components, and micro-animated user journeys for host and guest web applications.',
    location: 'San Francisco, CA',
    workMode: 'Remote',
    stipend: '$7,600 / month',
    salary: '$122,000 / year',
    requiredSkills: ['React', 'Framer Motion', 'Tailwind CSS', 'Figma', 'JavaScript'],
    eligibility: 'Open to all design-minded tech undergraduates',
    deadline: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Netflix Media Labs',
    role: 'Stream Analytics & Data Engineer Intern',
    description: 'Optimize streaming metrics dashboards, telemetry pipelines, and real-time visualization widgets for global platform operations.',
    location: 'Los Gatos, CA',
    workMode: 'Hybrid',
    stipend: '$8,200 / month',
    salary: '$132,000 / year',
    requiredSkills: ['JavaScript', 'Recharts', 'Node.js', 'Python', 'SQL'],
    eligibility: 'Graduation Year: 2026 or 2027',
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Databricks',
    role: 'Distributed Systems & Database Intern',
    description: 'Work alongside core database engineers to improve indexing speed, memory management, and distributed query engines.',
    location: 'San Francisco, CA',
    workMode: 'On-site',
    stipend: '$9,000 / month',
    salary: '$140,000 / year',
    requiredSkills: ['C++', 'Java', 'MongoDB', 'SQL', 'Algorithms'],
    eligibility: 'Strong Data Structures & Algorithms proficiency',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Vercel Platform',
    role: 'Developer Experience & Tooling Intern',
    description: 'Construct instant deployment integrations, CLI features, and next-gen frontend optimization suites for web developers worldwide.',
    location: 'Remote Global',
    workMode: 'Remote',
    stipend: '$7,000 / month',
    salary: '$115,000 / year',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Git'],
    eligibility: 'Undergraduates with active GitHub portfolios',
    deadline: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Figma Systems',
    role: 'Canvas & Rendering Engine Intern',
    description: 'Develop WebGL rendering pipelines, multi-user real-time state synchronization, and browser-based vector manipulation features.',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    stipend: '$8,400 / month',
    salary: '$135,000 / year',
    requiredSkills: ['JavaScript', 'TypeScript', 'C++', 'React', 'HTML5 Canvas'],
    eligibility: 'Engineering & CS background',
    deadline: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'MongoDB Global',
    role: 'Database Developer Relations Intern',
    description: 'Create technical tutorials, developer SDK examples, and open-source starter templates showcasing MERN stack integration best practices.',
    location: 'New York, NY',
    workMode: 'Remote',
    stipend: '$6,800 / month',
    salary: '$110,000 / year',
    requiredSkills: ['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript'],
    eligibility: 'All tech undergraduates',
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Atlassian Cloud',
    role: 'Software Security & Platform Intern',
    description: 'Implement JWT authentication safeguards, CORS policies, access control headers, and rate-limiting security layers across enterprise services.',
    location: 'San Jose, CA',
    workMode: 'Hybrid',
    stipend: '$7,100 / month',
    salary: '$116,000 / year',
    requiredSkills: ['Node.js', 'Express', 'JWT', 'Cybersecurity', 'Python'],
    eligibility: 'CS / Information Security students',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }
];

module.exports = { seedOpportunities };
