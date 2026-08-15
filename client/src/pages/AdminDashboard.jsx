import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import StatsCard from '../components/StatsCard';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { CardSkeleton } from '../components/Skeleton';
import { useToast } from '../context/ToastContext';
import { adminService } from '../services/api';
import { Users, Briefcase, Send, Award, Clock, TrendingUp, Sliders, ArrowRight } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const AdminDashboard = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminStats = async () => {
    try {
      setLoading(true);
      const res = await adminService.getDashboardStats();
      if (res.success && res.data) {
        setStats(res.data.stats);
        setCharts(res.data.charts);
      }
    } catch (err) {
      showToast('Failed to load admin analytics', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f43f5e'];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        
        {/* Banner */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Badge variant="purple" className="mb-2">Admin Overview</Badge>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                Platform Statistics & Management
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Monitor student applications, opportunity postings, and selection metrics.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/admin/opportunities">
                <Button variant="primary" icon={Sliders} size="sm">Manage Opportunities</Button>
              </Link>
              <Link to="/admin/applications">
                <Button variant="outline" icon={Send} size="sm">Manage Applications</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatsCard
              title="Total Students"
              value={stats?.totalStudents || 0}
              icon={Users}
              trend="Registered profiles"
              color="purple"
            />
            <StatsCard
              title="Opportunities"
              value={stats?.totalOpportunities || 0}
              icon={Briefcase}
              trend="Active postings"
              color="blue"
            />
            <StatsCard
              title="Applications"
              value={stats?.totalApplications || 0}
              icon={Send}
              trend="Submitted by students"
              color="cyan"
            />
            <StatsCard
              title="Selections / Offers"
              value={stats?.selectedStudents || 0}
              icon={Award}
              trend={`${stats?.selectionRate || 0}% Selection rate`}
              color="emerald"
            />
          </div>
        )}

        {/* Charts Row */}
        {charts && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Status Breakdown Bar Chart */}
            <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white font-['Outfit']">Applications by Status</h3>
                <Badge variant="primary">Realtime Data</Badge>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.applicationsByStatus}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {charts.applicationsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Work Mode Distribution Pie Chart */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white font-['Outfit']">Opportunity Work Mode</h3>
                <Badge variant="cyan">Distribution</Badge>
              </div>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={charts.opportunitiesByWorkMode}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {charts.opportunitiesByWorkMode.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
