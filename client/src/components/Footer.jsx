import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white font-['Outfit']">
                CampusFlow <span className="gradient-text">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Smart Campus Career & Opportunity Management Platform. Empowering students to land top internships, track deadlines, and master essential industry skills.
            </p>
            <div className="flex items-center gap-3 text-slate-400 mt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Product</h4>
            <Link to="/opportunities" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Discover Opportunities</Link>
            <Link to="/skill-analyzer" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Skill Analyzer</Link>
            <a href="/#features" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Core Features</a>
            <a href="/#how-it-works" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">How It Works</a>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Resources</h4>
            <a href="/#faq" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">FAQ & Support</a>
            <Link to="/login" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Student Login</Link>
            <Link to="/register" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Create Account</Link>
            <Link to="/login" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Admin Portal</Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Company</h4>
            <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">About Us</a>
            <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Contact</a>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CampusFlow AI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for college career excellence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
