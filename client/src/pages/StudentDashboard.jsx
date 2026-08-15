import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import StatsCard from '../components/StatsCard';
import OpportunityCard from '../components/OpportunityCard';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { CardSkeleton } from '../components/Skeleton';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { applicationService, opportunityService, savedService } from '../services/api';
import {
  Send,
  Clock,
  UserCheck,
  Award,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [applications, setApplications] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [appRes, oppRes, savedRes] = await Promise.all([
        applicationService.getMyApplications(),
        opportunityService.getOpportunities({ limit: 4 }),
        savedService.getSaved()
      ]);

      if (appRes.success) {
        setApplications(appRes.data.applications || []);
      }
      if (oppRes.success) {
        setOpportunities(oppRes.data.opportunities || []);
      }
      if (savedRes.success) {
        const ids = (savedRes.data.saved || []).map((s) => s.opportunityId?._id || s.opportunityId);
        setSavedIds(ids);
      }
    } catch (error) {
      console.error('Dashboard loading error:', error);
      showToast('Failed to load dashboard metrics.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSaveToggle = async (opportunityId) => {
    try {
      if (savedIds.includes(opportunityId)) {
        await savedService.unsave(opportunityId);
        setSavedIds((prev) => prev.filter((id) => id !== opportunityId));
        showToast('Opportunity removed from saved list.', 'info');
      } else {
        await savedService.save(opportunityId);
        setSavedIds((prev) => [...prev, opportunityId]);
        showToast('Opportunity saved successfully!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Failed to update bookmark', 'error');
    }
  };

  // Compute Metrics
  const totalApps = applications.length;
  const activeApps = applications.filter((a) => ['Applied', 'Assessment', 'Interview'].includes(a.status)).length;
  const interviewsCount = applications.filter((a) => a.status === 'Interview').length;
  const selectedCount = applications.filter((a) => a.status === 'Selected').length;

  // Status Chart Data
  const statusData = [
    { name: 'Applied', count: applications.filter((a) => a.status === 'Applied').length, fill: '#3b82f6' },
    { name: 'Assessment', count: applications.filter((a) => a.status === 'Assessment').length, fill: '#8b5cf6' },
    { name: 'Interview', count: applications.filter((a) => a.status === 'Interview').length, fill: '#f59e0b' },
    { name: 'Selected', count: applications.filter((a) => a.status === 'Selected').length, fill: '#10b981' },
    { name: 'Rejected', count: applications.filter((a) => a.status === 'Rejected').length, fill: '#f43f5e' }
  ];

  // Career Readiness Score Calculation
  const userSkillCount = user?.skills?.length || 0;
  const readinessPercentage = Math.min(95, Math.max(45, Math.round(50 + userSkillCount * 5 + selectedCount * 10)));

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        
        {/* Top Welcome Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="primary" className="gap-1">
                  <Sparkles className="w-3 h-3" /> Campus Career Hub
                </Badge>
                <span className="text-xs text-slate-400">Graduation Year: {user?.graduationYear || '2026'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                Welcome back, <span className="gradient-text">{user?.name || 'Student'}</span> 👋
              </h1>
              <p className="text-sm text-slate-300 max-w-xl mt-1 leading-relaxed">
                You have <span className="text-blue-400 font-semibold">{activeApps} active applications</span> currently in progress. Keep up your momentum!
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link to="/opportunities">
                <Button variant="primary" icon={Briefcase}>
                  Browse Opportunities
                </Button>
              </Link>
              <Link to="/skill-analyzer">
                <Button variant="outline" icon={Sparkles}>
                  Analyze Skills
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard
            title="Total Applications"
            value={totalApps}
            icon={Send}
            trend="+2 this month"
            color="blue"
          />
          <StatsCard
            title="Active Applications"
            value={activeApps}
            icon={Clock}
            trend="Under review"
            color="purple"
          />
          <StatsCard
            title="Interviews"
            value={interviewsCount}
            icon={UserCheck}
            trend="Active rounds"
            color="amber"
          />
          <StatsCard
            title="Selected"
            value={selectedCount}
            icon={Award}
            trend="Secured offer"
            color="emerald"
          />
        </div>

        {/* Charts & Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Recharts Application Progress */}
          <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">Application Progress</h3>
                <p className="text-xs text-slate-400">Applications categorized by current status</p>
              </div>
              <Link to="/applications">
                <Button variant="ghost" size="sm" icon={ArrowRight}>View Tracker</Button>
              </Link>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Career Readiness Circular Progress Widget */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between text-center relative overflow-hidden">
            <div className="mb-4">
              <h3 className="text-base font-bold text-white font-['Outfit']">Career Readiness</h3>
              <p className="text-xs text-slate-400 mt-0.5">Profile skill matching metric</p>
            </div>

            {/* Circular Progress Display */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-500 transition-all duration-1000 ease-out"
                  strokeDasharray={`${readinessPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-extrabold text-white font-['Outfit']">
                  {readinessPercentage}%
                </span>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                  Readiness
                </span>
              </div>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
              Good progress — keep improving your <span className="text-blue-400 font-semibold">React</span> and <span className="text-blue-400 font-semibold">Node.js</span> skills for higher match scores.
            </div>
          </div>

        </div>

        {/* Upcoming Deadlines Widget */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white font-['Outfit']">Upcoming Application Deadlines</h3>
            </div>
            <Link to="/opportunities" className="text-xs text-blue-400 hover:underline">Explore All</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {opportunities.slice(0, 3).map((opp) => {
              const diffDays = Math.max(0, Math.ceil((new Date(opp.deadline) - new Date()) / (1000 * 60 * 60 * 24)));
              return (
                <div key={opp._id} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{opp.company}</span>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{opp.role}</h4>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <span className="text-xs text-slate-400">{opp.location}</span>
                    <Badge variant={diffDays <= 5 ? 'danger' : 'warning'}>
                      {diffDays === 0 ? 'Due Today' : `${diffDays} days left`}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Opportunities Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">Recent Opportunities</h3>
              <p className="text-xs text-slate-400">Fresh openings matching top campus skill demands</p>
            </div>
            <Link to="/opportunities">
              <Button variant="outline" size="sm" icon={ArrowRight}>View All</Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {opportunities.map((opp) => (
                <OpportunityCard
                  key={opp._id}
                  opportunity={opp}
                  userSkills={user?.skills || []}
                  isSaved={savedIds.includes(opp._id)}
                  onSaveToggle={handleSaveToggle}
                  onViewDetails={(id) => window.location.href = `/opportunities/${id}`}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
