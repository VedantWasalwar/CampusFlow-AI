require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Opportunity = require('./models/Opportunity');
const Application = require('./models/Application');
const SavedOpportunity = require('./models/SavedOpportunity');
const Notification = require('./models/Notification');
const { seedOpportunities } = require('./utils/seedData');
const connectDB = require('./config/db');

const runSeed = async () => {
  try {
    await connectDB();
    console.log('MongoDB Atlas Connected Successfully');

    // Check if opportunities already exist to prevent duplicate insertions
    const existingOppCount = await Opportunity.countDocuments();
    if (existingOppCount > 0) {
      console.log('Opportunities already exist - skipping duplicate insertion');
      console.log(`${existingOppCount} opportunities available`);
    } else {
      console.log('Seeding opportunities...');
      const insertedOpportunities = await Opportunity.insertMany(seedOpportunities);
      console.log(`${insertedOpportunities.length} opportunities available`);
      console.log('Database seed completed successfully');
    }

    // Ensure Demo Admin Account exists
    let adminUser = await User.findOne({ email: 'admin@campusflow.ai' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'System Admin',
        email: 'admin@campusflow.ai',
        password: 'Admin@123',
        role: 'admin',
        phone: '+1 (555) 019-2831',
        college: 'Stanford University',
        degree: 'Master of Science',
        branch: 'Computer Science',
        graduationYear: 2024,
        skills: ['System Design', 'React', 'Node.js', 'MongoDB', 'Cloud Architecture'],
        github: 'https://github.com/admin-campusflow',
        linkedin: 'https://linkedin.com/in/admin-campusflow',
        portfolio: 'https://campusflow.ai'
      });
      console.log('[Seed] Created demo admin account: admin@campusflow.ai');
    }

    // Ensure Demo Student Account exists
    let studentUser = await User.findOne({ email: 'student@campusflow.ai' });
    if (!studentUser) {
      studentUser = await User.create({
        name: 'Vedant Sharma',
        email: 'student@campusflow.ai',
        password: 'Student@123',
        role: 'student',
        phone: '+1 (555) 014-9921',
        college: 'Indian Institute of Technology',
        degree: 'Bachelor of Technology',
        branch: 'Computer Science & Engineering',
        graduationYear: 2026,
        skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git', 'Node.js', 'Tailwind CSS'],
        github: 'https://github.com/vedant-student',
        linkedin: 'https://linkedin.com/in/vedant-student',
        portfolio: 'https://vedant-portfolio.dev'
      });
      console.log('[Seed] Created demo student account: student@campusflow.ai');
    }

    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(0);
  } catch (error) {
    console.error('Seed execution error:', error.message);
    process.exit(1);
  }
};

runSeed();
