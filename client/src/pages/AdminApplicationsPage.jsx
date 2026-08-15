import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { TableSkeleton } from '../components/Skeleton';
import { EmptyState, ErrorState } from '../components/EmptyState';
import { useToast } from '../context/ToastContext';
import { applicationService } from '../services/api';
import { Send, User, Building2, Calendar, FileText, CheckCircle2 } from 'lucide-react';

const AdminApplicationsPage = () => {
  const { showToast } = useToast();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await applicationService.getAllAdmin();
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

  const handleStatusChange = async (appId, newStatus) => {
    try {
      setUpdatingId(appId);
      const res = await applicationService.updateStatusAdmin(appId, newStatus, `Admin updated status to ${newStatus}`);
      if (res.success) {
        setApplications((prev) =>
          prev.map((app) => (app._id === appId ? { ...app, status: newStatus } : app))
        );
        showToast(`Application status updated to ${newStatus}`, 'success');
      }
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] flex items-center gap-2">
            <Send className="w-6 h-6 text-cyan-400" /> Student Application Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review student applications and update recruitment pipeline statuses in MongoDB
          </p>
        </div>

        {/* Table */}
        {loading ? (
          <TableSkeleton />
        ) : error ? (
          <ErrorState
            title="Failed to load applications"
            message="Could not retrieve application records."
            onRetry={fetchApplications}
          />
        ) : applications.length === 0 ? (
          <EmptyState
            icon={Send}
            title="No applications submitted yet"
            description="Student applications will appear here as soon as they apply for opportunities."
          />
        ) : (
          <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="p-4">Student</th>
                    <th className="p-4">Company & Role</th>
                    <th className="p-4">Applied Date</th>
                    <th className="p-4">Current Status</th>
                    <th className="p-4 text-right">Update Pipeline Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {applications.map((app) => {
                    const student = app.userId || {};
                    const opp = app.opportunityId || {};

                    return (
                      <tr key={app._id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                              {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
                            </div>
                            <div>
                              <span className="font-bold text-white block">{student.name || 'Student'}</span>
                              <span className="text-slate-400 text-[11px]">{student.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-white block">{opp.role || 'Role'}</span>
                          <span className="text-slate-400 text-[11px]">{opp.company || 'Company'}</span>
                        </td>
                        <td className="p-4 text-slate-400">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={
                              app.status === 'Selected' ? 'success' : app.status === 'Rejected' ? 'danger' : app.status === 'Interview' ? 'warning' : 'primary'
                            }
                          >
                            {app.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <select
                            value={app.status}
                            disabled={updatingId === app._id}
                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                            className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                          >
                            <option value="Applied">Applied</option>
                            <option value="Assessment">Assessment</option>
                            <option value="Interview">Interview</option>
                            <option value="Selected">Selected</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminApplicationsPage;
