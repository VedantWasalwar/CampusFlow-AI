import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import ApplicationTimeline from '../components/ApplicationTimeline';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { CardSkeleton } from '../components/Skeleton';
import { EmptyState, ErrorState } from '../components/EmptyState';
import { useToast } from '../context/ToastContext';
import { applicationService } from '../services/api';
import { Send, Building2, Calendar, FileText, Briefcase, Filter } from 'lucide-react';

const ApplicationsPage = () => {
  const { showToast } = useToast();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await applicationService.getMyApplications();
      if (res.success) {
        setApplications(res.data.applications || []);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApps = applications.filter((app) => {
    if (activeFilter === 'All') return true;
    return app.status === activeFilter;
  });

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Applied': return 'primary';
      case 'Assessment': return 'purple';
      case 'Interview': return 'warning';
      case 'Selected': return 'success';
      case 'Rejected': return 'danger';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              Application Tracker
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Monitor your job applications across every recruitment stage in real-time
            </p>
          </div>
          <Link to="/opportunities">
            <Button variant="primary" icon={Briefcase} size="sm">
              Discover New Roles
            </Button>
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {['All', 'Applied', 'Assessment', 'Interview', 'Selected', 'Rejected'].map((status) => {
            const count = status === 'All'
              ? applications.length
              : applications.filter((a) => a.status === status).length;

            return (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                  activeFilter === status
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{status}</span>
                <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                  activeFilter === status ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content List */}
        {loading ? (
          <div className="flex flex-col gap-4">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : error ? (
          <ErrorState
            title="Failed to load applications"
            message="Could not retrieve your application tracker records."
            onRetry={fetchApplications}
          />
        ) : filteredApps.length === 0 ? (
          <EmptyState
            icon={Send}
            title="No applications found"
            description={
              activeFilter === 'All'
                ? "You haven't applied to any opportunities yet."
                : `No applications currently in '${activeFilter}' status.`
            }
            actionLabel="Explore Opportunities"
            onAction={() => window.location.href = '/opportunities'}
          />
        ) : (
          <div className="flex flex-col gap-6">
            {filteredApps.map((app) => {
              const opp = app.opportunityId || {};
              return (
                <div
                  key={app._id}
                  className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col gap-6"
                >
                  {/* Top Bar: Company Info & Status Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center font-bold text-white text-lg">
                        {opp.company ? opp.company.charAt(0).toUpperCase() : 'C'}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                          <Building2 className="w-3.5 h-3.5" /> {opp.company || 'Company'}
                        </span>
                        <h3 className="text-lg font-bold text-white font-['Outfit'] mt-0.5">
                          {opp.role || 'Role'}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant={getStatusBadgeVariant(app.status)} className="px-3 py-1 text-xs">
                        {app.status}
                      </Badge>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Applied {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Timeline Progress */}
                  <ApplicationTimeline status={app.status} timeline={app.timeline} />

                  {/* Notes / Comments */}
                  {app.notes && (
                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                      <FileText className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white">Application Note:</span> {app.notes}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default ApplicationsPage;
