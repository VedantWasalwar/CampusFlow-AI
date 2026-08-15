import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import Badge from '../components/Badge';
import {
  Sparkles,
  ArrowRight,
  Briefcase,
  Send,
  BarChart3,
  Calendar,
  FileText,
  Target,
  ChevronDown,
  CheckCircle2,
  Users,
  ShieldCheck,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    {
      icon: Briefcase,
      title: 'Opportunity Discovery',
      description: 'Explore curated internships, remote tech roles, and campus placement drives tailored to your degree and skill set.',
      color: 'blue'
    },
    {
      icon: Send,
      title: 'Application Tracker',
      description: 'Never lose track of an application. Monitor every stage from Applied to Assessment, Interview, and Offer.',
      color: 'indigo'
    },
    {
      icon: Target,
      title: 'Smart Skill Gap Analysis',
      description: 'Compare your profile against top job requirements. Receive transparent match scores and prioritized learning roadmaps.',
      color: 'purple'
    },
    {
      icon: Calendar,
      title: 'Deadline Management',
      description: 'Automated urgency alerts ensure you submit resumes before application windows close.',
      color: 'amber'
    },
    {
      icon: FileText,
      title: 'Resume Management',
      description: 'Store, upload, and manage verified resume formats with instant preview and download capabilities.',
      color: 'emerald'
    },
    {
      icon: BarChart3,
      title: 'Career Analytics',
      description: 'Track overall readiness, interview conversion rates, and skill progression using interactive charts.',
      color: 'cyan'
    }
  ];

  const steps = [
    { num: '01', title: 'Create Your Profile', desc: 'Add your college details, graduation year, links, and target tech skills.' },
    { num: '02', title: 'Discover Opportunities', desc: 'Browse verified internships with transparent stipends and skill criteria.' },
    { num: '03', title: 'Apply & Track Progress', desc: 'Submit applications in 1-click and track status on an interactive timeline.' },
    { num: '04', title: 'Improve Missing Skills', desc: 'Analyze skill gaps for specific roles and focus on high-priority topics.' },
    { num: '05', title: 'Land Your Next Role', desc: 'Pass assessments, conquer interviews, and launch your campus career.' }
  ];

  const stats = [
    { value: '10K+', label: 'Students Empowered' },
    { value: '500+', label: 'Active Opportunities' },
    { value: '85%', label: 'Tracking Efficiency' },
    { value: '24/7', label: 'Career Platform Availability' }
  ];

  const testimonials = [
    {
      name: 'Ananya Roy',
      college: 'IIT Delhi — CS 2026',
      quote: 'CampusFlow AI made tracking my summer internship applications seamless. The skill gap breakdown helped me focus exactly on what React & Node topics to revise before my interviews.',
      tag: 'Sample Student Feedback'
    },
    {
      name: 'Rohan Verma',
      college: 'BITS Pilani — ECE 2025',
      quote: 'The deadline alerts saved me from missing out on top remote developer roles. The dashboard aesthetics feel like a real Silicon Valley product!',
      tag: 'Sample Student Feedback'
    }
  ];

  const faqs = [
    {
      q: 'What is CampusFlow AI?',
      a: 'CampusFlow AI is a modern SaaS platform designed for college students to discover internships, track application status, manage deadlines, analyze skill gaps, and optimize their career trajectory.'
    },
    {
      q: 'Is CampusFlow AI free for students?',
      a: 'Yes! CampusFlow AI is 100% free for students to explore opportunities, track applications, and utilize the skill gap analyzer.'
    },
    {
      q: 'How does the Smart Skill Gap Analyzer work?',
      a: 'The analyzer uses a transparent rule-based algorithm comparing your profile skills against the required skills of a target role. It calculates an exact match percentage, lists missing skills, and categorizes learning priorities.'
    },
    {
      q: 'Can I upload and manage my resume PDF?',
      a: 'Yes, you can upload PDF, DOC, or DOCX resumes under your profile section, preview them, and update them whenever needed.'
    },
    {
      q: 'Can campus administrators manage opportunities?',
      a: 'Yes, admins have access to an exclusive Admin Console where they can create, update, or remove opportunities, view student applications, update application statuses, and inspect platform analytics.'
    }
  ];

  return (
    <MainLayout>
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 flex flex-col items-start text-left"
            >
              <Badge variant="purple" className="mb-6 py-1 px-3.5 gap-2 text-xs font-semibold shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                AI-Powered Career Management for Students
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 font-['Outfit']">
                Build Your Career. <br />
                <span className="gradient-text">Track Your Journey.</span> <br />
                Get Hired.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
                Discover curated internships, manage application timelines, understand your skill gaps with transparent analytics, and stay ahead of every campus deadline.
              </p>

              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <Link to="/opportunities">
                  <Button variant="primary" size="lg" icon={Briefcase}>
                    Explore Opportunities
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg" icon={ArrowRight}>
                    Get Started Free
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 pt-8 border-t border-slate-800/80 flex items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Real Database Persistence</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Instant Skill Analyzer</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Animated Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-2xl relative">
                
                {/* Dashboard Preview Mockup Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">campusflow.ai/dashboard</span>
                </div>

                {/* Dashboard Preview Cards */}
                <div className="flex flex-col gap-4">
                  
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Total Applied</span>
                      <p className="text-xl font-extrabold text-white mt-0.5">12 Roles</p>
                      <span className="text-[10px] text-emerald-400 font-semibold">+3 this week</span>
                    </div>
                    <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Skill Match</span>
                      <p className="text-xl font-extrabold text-blue-400 mt-0.5">84%</p>
                      <span className="text-[10px] text-blue-300">High Readiness</span>
                    </div>
                  </div>

                  {/* Deadline Preview */}
                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400">Upcoming Deadline</span>
                      <h4 className="text-xs font-bold text-white">OpenAI — AI Engineer Intern</h4>
                    </div>
                    <Badge variant="danger">2 Days Left</Badge>
                  </div>

                  {/* Recent Opportunity Card */}
                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400">Stripe Payments</span>
                        <h4 className="text-sm font-bold text-white">Frontend Infrastructure Intern</h4>
                      </div>
                      <Badge variant="success">$7,800/mo</Badge>
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      <span className="px-2 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded-md">React</span>
                      <span className="px-2 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded-md">TypeScript</span>
                    </div>
                  </div>

                </div>

                {/* Floating Floating Cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -left-6 bg-slate-900 border border-slate-700/80 p-3 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md hidden sm:flex"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Assessment Passed</p>
                    <p className="text-[10px] text-slate-400">Moved to Interview Round</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-6 -right-6 bg-slate-900 border border-slate-700/80 p-3 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md hidden sm:flex"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Skill Analysis Complete</p>
                    <p className="text-[10px] text-slate-400">Node.js High Priority</p>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-slate-950/60 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-3">Core Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
              Everything You Need To Master Campus Hiring
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Comprehensive tools designed to eliminate application guesswork and elevate your career portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="glass-card p-8 rounded-2xl border border-slate-800 flex flex-col gap-4 relative group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors font-['Outfit']">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="purple" className="mb-3">Workflow</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
              How CampusFlow AI Works
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              From creating your profile to securing your dream internship in 5 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between relative">
                <div>
                  <span className="text-3xl font-extrabold text-blue-500/40 font-mono mb-3 block">
                    {step.num}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CAMPUSFLOW AI - IMPACT STATS */}
      <section className="py-16 bg-gradient-to-r from-blue-950/40 via-slate-950 to-indigo-950/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-['Outfit'] gradient-text">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-slate-400 font-medium mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="cyan" className="mb-3">Student Voice</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
              Loved by Ambitious College Students
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((item, idx) => (
              <div key={idx} className="glass-card p-8 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <p className="text-sm text-slate-300 italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    <span className="text-xs text-slate-400">{item.college}</span>
                  </div>
                  <Badge variant="default" className="text-[10px]">{item.tag}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-slate-950/60 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="warning" className="mb-3">FAQ</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between font-semibold text-white hover:text-blue-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-blue-400' : 'text-slate-500'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-tr from-blue-900/40 via-slate-950 to-purple-900/40 border-t border-slate-800 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-['Outfit']">
            Your Next Opportunity Starts Here.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Join thousands of college students managing their applications, deadlines, and skill growth on CampusFlow AI.
          </p>
          <Link to="/register">
            <Button variant="primary" size="lg" icon={ArrowRight}>
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

    </MainLayout>
  );
};

export default LandingPage;
