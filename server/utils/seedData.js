const seedOpportunities = [
  {
    company: 'Roxiler Systems',
    role: 'Full Stack Developer Intern',
    description: 'Join Roxiler Systems to build responsive MERN web apps, API integrations, and database solutions for global e-commerce and analytics products.',
    location: 'Pune',
    workMode: 'Hybrid',
    stipend: '₹10,000 / month',
    salary: '₹6,00,000 / year',
    requiredSkills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
    eligibility: 'B.Tech / B.E in CS, IT or related fields (2025/2026 Batch)',
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'TechNova',
    role: 'MERN Stack Developer Intern',
    description: 'Develop interactive single page applications and RESTful backend architectures using MongoDB, Express, React, and Node.js.',
    location: 'Pune',
    workMode: 'On-site',
    stipend: '₹12,000 / month',
    salary: '₹5,50,000 / year',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
    eligibility: 'All Engineering & Technology Branches',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Microsoft',
    role: 'Software Engineer Intern',
    description: 'Collaborate with world-class engineering teams building cloud services, AI platform tools, and enterprise productivity software.',
    location: 'Hyderabad',
    workMode: 'Hybrid',
    stipend: '₹45,000 / month',
    salary: '₹18,00,000 / year',
    requiredSkills: ['C++', 'Python', 'React', 'Node.js', 'Data Structures', 'Algorithms'],
    eligibility: 'Computer Science, IT, ECE pre-final year students',
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Infosys',
    role: 'Frontend Developer Intern',
    description: 'Work on responsive web interfaces, modern UI component libraries, and client-side performance optimizations for tier-1 client projects.',
    location: 'Pune',
    workMode: 'Hybrid',
    stipend: '₹15,000 / month',
    salary: '₹4,50,000 / year',
    requiredSkills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git'],
    eligibility: 'B.E / B.Tech / MCA / B.Sc CS',
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'TCS',
    role: 'Backend Developer Intern',
    description: 'Design and deploy resilient Node.js microservices, database schemas, and JWT security middleware for digital transformation applications.',
    location: 'Mumbai',
    workMode: 'On-site',
    stipend: '₹18,000 / month',
    salary: '₹4,80,000 / year',
    requiredSkills: ['Node.js', 'Express.js', 'MongoDB', 'SQL', 'REST API', 'JavaScript'],
    eligibility: 'Engineering & Technology Graduates 2025/2026',
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'OpenAI Technologies',
    role: 'AI & Full-Stack Engineering Intern',
    description: 'Build next-generation AI developer tools, real-time workflow agents, and modern React dashboard interfaces.',
    location: 'Remote',
    workMode: 'Remote',
    stipend: '₹50,000 / month',
    salary: '₹22,00,000 / year',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'Python', 'OpenAI API'],
    eligibility: 'CS / IT students with strong project portfolios',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Stripe Payments',
    role: 'Frontend Infrastructure Intern',
    description: 'Work on core financial dashboards and UI component libraries used by global businesses.',
    location: 'Bengaluru',
    workMode: 'Hybrid',
    stipend: '₹35,000 / month',
    salary: '₹16,00,000 / year',
    requiredSkills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Testing Library'],
    eligibility: 'All tech disciplines with strong JavaScript fundamentals',
    deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Google Cloud',
    role: 'Cloud Backend Engineer Intern',
    description: 'Architect scalable Express.js microservices and RESTful API endpoints powering cloud infrastructure.',
    location: 'Bengaluru',
    workMode: 'On-site',
    stipend: '₹48,000 / month',
    salary: '₹20,00,000 / year',
    requiredSkills: ['Node.js', 'Express', 'MongoDB', 'Docker', 'REST API', 'Python'],
    eligibility: 'B.Tech / B.E / M.Tech in CS / IT',
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Uber Technologies',
    role: 'Full-Stack Developer Intern',
    description: 'Build real-time tracking systems and driver/rider management panels using modern MERN stack architecture.',
    location: 'Gurugram',
    workMode: 'Remote',
    stipend: '₹40,000 / month',
    salary: '₹17,00,000 / year',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
    eligibility: 'Pre-final or final year engineering students',
    deadline: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Airbnb Engineering',
    role: 'UI/UX & Product Developer Intern',
    description: 'Craft polished design systems, accessible components, and micro-animated user journeys.',
    location: 'Remote',
    workMode: 'Remote',
    stipend: '₹32,000 / month',
    salary: '₹14,00,000 / year',
    requiredSkills: ['React', 'Framer Motion', 'Tailwind CSS', 'Figma', 'JavaScript'],
    eligibility: 'Open to all design-minded tech undergraduates',
    deadline: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'Vercel Platform',
    role: 'Developer Experience Intern',
    description: 'Construct instant deployment integrations, CLI features, and next-gen frontend optimization suites.',
    location: 'Remote',
    workMode: 'Remote',
    stipend: '₹30,000 / month',
    salary: '₹15,00,000 / year',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Git'],
    eligibility: 'Undergraduates with active GitHub repositories',
    deadline: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000)
  },
  {
    company: 'MongoDB Global',
    role: 'Database Developer Relations Intern',
    description: 'Create technical tutorials, developer SDK examples, and open-source starter templates showcasing MERN stack integration.',
    location: 'Bengaluru',
    workMode: 'Remote',
    stipend: '₹28,000 / month',
    salary: '₹12,00,000 / year',
    requiredSkills: ['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript'],
    eligibility: 'All tech undergraduates',
    deadline: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000)
  }
];

module.exports = { seedOpportunities };
