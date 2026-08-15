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
    console.log('[Seed] Connecting to MongoDB Atlas...');
    await connectDB();

    console.log('[Seed] Clearing existing collections...');
    await User.deleteMany({});
    await Opportunity.deleteMany({});
    await Application.deleteMany({});
    await SavedOpportunity.deleteMany({});
    await Notification.deleteMany({});

    console.log('[Seed] Creating demo accounts...');
    
    // Admin User
    const adminUser = await User.create({
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

    // Student User (Vedant)
    const studentUser = await User.create({
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

    console.log('[Seed] Inserting 12+ realistic opportunities...');
    const insertedOpportunities = await Opportunity.insertMany(seedOpportunities);

    console.log('[Seed] Creating sample student applications...');
    const app1 = await Application.create({
      userId: studentUser._id,
      opportunityId: insertedOpportunities[0]._id,
      status: 'Interview',
      notes: 'Passed technical screen on React & Node. Final system design round scheduled.',
      timeline: [
        { status: 'Applied', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), note: 'Submitted via CampusFlow' },
        { status: 'Assessment', date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), note: 'Completed coding benchmark 100%' },
        { status: 'Interview', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), note: 'Technical interview completed' }
      ]
    });

    const app2 = await Application.create({
      userId: studentUser._id,
      opportunityId: insertedOpportunities[1]._id,
      status: 'Assessment',
      notes: 'Online assessment link received. Due in 3 days.',
      timeline: [
        { status: 'Applied', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), note: 'Application received by recruiters' },
        { status: 'Assessment', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), note: 'HackerRank test invited' }
      ]
    });

    await Application.create({
      userId: studentUser._id,
      opportunityId: insertedOpportunities[4]._id,
      status: 'Applied',
      notes: 'Submitted resume and portfolio links.',
      timeline: [
        { status: 'Applied', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), note: 'Application under review' }
      ]
    });

    console.log('[Seed] Creating sample saved opportunities...');
    await SavedOpportunity.create({
      userId: studentUser._id,
      opportunityId: insertedOpportunities[2]._id
    });
    await SavedOpportunity.create({
      userId: studentUser._id,
      opportunityId: insertedOpportunities[5]._id
    });

    console.log('[Seed] Creating sample notifications...');
    await Notification.create({
      userId: studentUser._id,
      title: 'Interview Scheduled',
      message: 'Your interview for OpenAI AI & Full-Stack Engineering Intern has been confirmed.',
      type: 'application'
    });
    await Notification.create({
      userId: studentUser._id,
      title: 'Upcoming Deadline Alert',
      message: 'Stripe Payments application deadline is in 8 days.',
      type: 'deadline'
    });
    await Notification.create({
      userId: studentUser._id,
      title: 'New High Skill Match',
      message: 'Vercel Platform internship matches 83% of your skills!',
      type: 'opportunity'
    });

    console.log('=====================================================');
    console.log('✨ CAMPUSFLOW AI DATABASE SEEDED SUCCESSFULLY TO ATLAS!');
    console.log('-----------------------------------------------------');
    console.log('DEMO ACCOUNTS CREATED:');
    console.log('1. DEMO STUDENT: student@campusflow.ai');
    console.log('2. DEMO ADMIN:   admin@campusflow.ai');
    console.log('=====================================================');

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
