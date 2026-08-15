import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Sparkles, TrendingUp, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Concept: Graduation Cap + Growth Arrow + AI Spark */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <GraduationCap className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                <TrendingUp className="w-3 h-3 text-cyan-400 absolute bottom-1 right-1" />
                <Sparkles className="w-3 h-3 text-purple-400 absolute top-1 right-1 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1 font-['Outfit']">
                CampusFlow <span className="gradient-text font-black">AI</span>
              </span>
              <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase -mt-1">
                Career Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-blue-400 ${location.pathname === '/' ? 'text-blue-400' : 'text-slate-300'}`}>
              Home
            </Link>
            <Link to="/opportunities" className={`text-sm font-medium transition-colors hover:text-blue-400 ${location.pathname === '/opportunities' ? 'text-blue-400' : 'text-slate-300'}`}>
              Opportunities
            </Link>
            <a href="/#features" className="text-sm font-medium text-slate-300 transition-colors hover:text-blue-400">
              Features
            </a>
            <a href="/#how-it-works" className="text-sm font-medium text-slate-300 transition-colors hover:text-blue-400">
              How It Works
            </a>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}>
                  <Button variant="primary" size="md" icon={LayoutDashboard}>
                    {user?.role === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}
                  </Button>
                </Link>
                <Button variant="ghost" size="md" onClick={logout} icon={LogOut}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="md">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="md">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-2 pb-6 flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 text-sm font-medium py-2 border-b border-slate-800/60"
          >
            Home
          </Link>
          <Link
            to="/opportunities"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 text-sm font-medium py-2 border-b border-slate-800/60"
          >
            Opportunities
          </Link>
          <a
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 text-sm font-medium py-2 border-b border-slate-800/60"
          >
            Features
          </a>
          <a
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 text-sm font-medium py-2 border-b border-slate-800/60"
          >
            How It Works
          </a>

          <div className="pt-2 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="primary" size="md" className="w-full">
                    Go to Dashboard
                  </Button>
                </Link>
                <Button variant="outline" size="md" onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
