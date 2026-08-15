import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { GraduationCap, Mail, Lock, User, Phone, School, BookOpen, GitBranch, Calendar, Plus, X, Globe, Linkedin, Github } from 'lucide-react';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    college: '',
    degree: 'B.Tech',
    branch: 'Computer Science',
    graduationYear: '2026',
    github: '',
    linkedin: '',
    portfolio: ''
  });

  const [skills, setSkills] = useState(['React', 'JavaScript', 'HTML', 'CSS']);
  const [skillInput, setSkillInput] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Password strength logic
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: 'bg-slate-800' };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2 || score === 3) return { score: 2, label: 'Medium', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  };

  const pwdStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }

    setLoading(true);
    const result = await register({
      ...formData,
      skills
    });
    setLoading(false);

    if (result?.success) {
      navigate('/dashboard');
    } else {
      setError(result?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl text-white font-['Outfit']">
              CampusFlow <span className="gradient-text">AI</span>
            </span>
          </Link>
          <h2 className="text-3xl font-extrabold text-white font-['Outfit']">Create Student Account</h2>
          <p className="text-sm text-slate-400 mt-1">Start tracking jobs, deadlines, and skill readiness</p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Section 1: Basic Credentials */}
            <div>
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
                1. Account Credentials
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Vedant Sharma"
                  icon={User}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="vedant@student.edu"
                  icon={Mail}
                  required
                />
                <div className="flex flex-col gap-1">
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    icon={Lock}
                    required
                  />
                  {formData.password && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${pwdStrength.color} transition-all`}
                          style={{ width: `${(pwdStrength.score / 3) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400">{pwdStrength.label}</span>
                    </div>
                  )}
                </div>
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  icon={Lock}
                  required
                />
              </div>
            </div>

            {/* Section 2: Academic Info */}
            <div className="pt-4 border-t border-slate-800/80">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
                2. Academic & Campus Info
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 019-2831"
                  icon={Phone}
                />
                <Input
                  label="College / University"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Indian Institute of Technology"
                  icon={School}
                />
                <Input
                  label="Degree Program"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="B.Tech / M.Tech / B.S."
                  icon={BookOpen}
                />
                <Input
                  label="Branch / Major"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="Computer Science & Eng."
                  icon={GitBranch}
                />
                <Input
                  label="Graduation Year"
                  type="number"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  placeholder="2026"
                  icon={Calendar}
                />
              </div>
            </div>

            {/* Section 3: Interactive Skills Manager */}
            <div className="pt-4 border-t border-slate-800/80">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
                3. Technical Skills
              </h4>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Add skill (e.g. React, Node.js, Python)..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(e)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <Button type="button" onClick={handleAddSkill} variant="secondary" icon={Plus} size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-rose-400 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Section 4: Social Links */}
            <div className="pt-4 border-t border-slate-800/80">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
                4. Social & Portfolio Profiles
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="GitHub URL"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  icon={Github}
                />
                <Input
                  label="LinkedIn URL"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  icon={Linkedin}
                />
                <Input
                  label="Portfolio URL"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://myportfolio.dev"
                  icon={Globe}
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-blue-500/20"
              />
              <label htmlFor="terms" className="text-xs text-slate-400 cursor-pointer">
                I agree to the <span className="text-blue-400">Terms of Service</span> and <span className="text-blue-400">Privacy Policy</span>.
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full mt-2"
            >
              Create Account
            </Button>

            <div className="text-center text-xs text-slate-400">
              Already registered?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
                Sign In Instead
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
