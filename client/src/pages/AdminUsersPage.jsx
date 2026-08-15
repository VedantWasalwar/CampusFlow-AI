import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { TableSkeleton } from '../components/Skeleton';
import { EmptyState, ErrorState } from '../components/EmptyState';
import { useToast } from '../context/ToastContext';
import { adminService } from '../services/api';
import { Users, ShieldCheck, UserX, UserCheck, School } from 'lucide-react';

const AdminUsersPage = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await adminService.getUsers();
      if (res.success) {
        setUsers(res.data.users || []);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userObj) => {
    try {
      setTogglingId(userObj._id);
      const newStatus = !userObj.isActive;
      const res = await adminService.toggleUserStatus(userObj._id, newStatus);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userObj._id ? { ...u, isActive: newStatus } : u))
        );
        showToast(
          `Student account ${userObj.name} ${newStatus ? 'activated' : 'deactivated'}.`,
          'info'
        );
      }
    } catch (err) {
      showToast(err.message || 'Failed to update user status', 'error');
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" /> Student User Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            View registered student profiles and manage account active/inactive access states
          </p>
        </div>

        {/* Directory Table */}
        {loading ? (
          <TableSkeleton />
        ) : error ? (
          <ErrorState
            title="Failed to load student directory"
            message="Could not fetch user records."
            onRetry={fetchUsers}
          />
        ) : users.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No students registered yet"
            description="Student profiles will appear here as soon as they sign up."
          />
        ) : (
          <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="p-4">Student</th>
                    <th className="p-4">College & Branch</th>
                    <th className="p-4">Graduation Year</th>
                    <th className="p-4">Skills</th>
                    <th className="p-4">Account Status</th>
                    <th className="p-4 text-right">Access Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {users.map((st) => (
                    <tr key={st._id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                            {st.name ? st.name.charAt(0).toUpperCase() : 'S'}
                          </div>
                          <div>
                            <span className="font-bold text-white block">{st.name}</span>
                            <span className="text-slate-400 text-[11px]">{st.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-200 block">{st.college || 'N/A'}</span>
                        <span className="text-slate-400 text-[11px]">{st.degree} - {st.branch}</span>
                      </td>
                      <td className="p-4 text-slate-300 font-medium">
                        {st.graduationYear || '2026'}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {(st.skills || []).slice(0, 3).map((sk, idx) => (
                            <span key={idx} className="px-2 py-0.5 text-[10px] bg-slate-900 border border-slate-800 text-slate-300 rounded">
                              {sk}
                            </span>
                          ))}
                          {(st.skills || []).length > 3 && (
                            <span className="text-[10px] text-slate-500">+{st.skills.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={st.isActive ? 'success' : 'danger'}>
                          {st.isActive ? 'Active' : 'Deactivated'}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant={st.isActive ? 'danger' : 'success'}
                          size="sm"
                          icon={st.isActive ? UserX : UserCheck}
                          isLoading={togglingId === st._id}
                          onClick={() => handleToggleStatus(st)}
                        >
                          {st.isActive ? 'Deactivate' : 'Reactivate'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
