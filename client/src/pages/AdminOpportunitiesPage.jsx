import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import { TableSkeleton } from '../components/Skeleton';
import { EmptyState, ErrorState } from '../components/EmptyState';
import { useToast } from '../context/ToastContext';
import { opportunityService } from '../services/api';
import {
  Plus,
  Edit2,
  Trash2,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  X,
  Sliders,
  AlertTriangle
} from 'lucide-react';

const AdminOpportunitiesPage = () => {
  const { showToast } = useToast();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Form Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Delete Confirmation State
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    description: '',
    location: 'Remote',
    workMode: 'Remote',
    stipend: '$7,500 / month',
    salary: '$120,000 / year',
    eligibility: 'All CS & IT Engineering Undergraduates',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const [skills, setSkills] = useState(['React', 'Node.js', 'TypeScript']);
  const [skillInput, setSkillInput] = useState('');

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await opportunityService.getOpportunities({ limit: 100 });
      if (res.success) {
        setOpportunities(res.data.opportunities || []);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormData({
      company: '',
      role: '',
      description: '',
      location: 'Remote',
      workMode: 'Remote',
      stipend: '$7,500 / month',
      salary: '$120,000 / year',
      eligibility: 'All CS & IT Engineering Undergraduates',
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
    setSkills(['React', 'Node.js', 'JavaScript']);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (opp) => {
    setEditingId(opp._id);
    setFormData({
      company: opp.company,
      role: opp.role,
      description: opp.description,
      location: opp.location,
      workMode: opp.workMode,
      stipend: opp.stipend,
      salary: opp.salary,
      eligibility: opp.eligibility,
      deadline: new Date(opp.deadline).toISOString().split('T')[0]
    });
    setSkills(opp.requiredSkills || []);
    setIsModalOpen(true);
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormSubmitting(true);
      const payload = {
        ...formData,
        requiredSkills: skills
      };

      if (editingId) {
        const res = await opportunityService.update(editingId, payload);
        if (res.success) {
          showToast('Opportunity updated successfully!', 'success');
        }
      } else {
        const res = await opportunityService.create(payload);
        if (res.success) {
          showToast('Opportunity created successfully!', 'success');
        }
      }

      setIsModalOpen(false);
      fetchOpportunities();
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      const res = await opportunityService.delete(deleteId);
      if (res.success) {
        setOpportunities((prev) => prev.filter((o) => o._id !== deleteId));
        showToast('Opportunity deleted successfully.', 'info');
        setDeleteId(null);
      }
    } catch (err) {
      showToast('Failed to delete opportunity', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] flex items-center gap-2">
              <Sliders className="w-6 h-6 text-purple-400" /> Opportunity Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Create, update, or remove campus job and internship listings
            </p>
          </div>
          <Button variant="primary" icon={Plus} onClick={handleOpenCreateModal}>
            Post New Opportunity
          </Button>
        </div>

        {/* Opportunities Table */}
        {loading ? (
          <TableSkeleton />
        ) : error ? (
          <ErrorState
            title="Failed to load opportunities"
            message="Could not retrieve opportunity list."
            onRetry={fetchOpportunities}
          />
        ) : opportunities.length === 0 ? (
          <EmptyState
            title="No opportunities posted"
            description="Get started by posting your first opportunity for students."
            actionLabel="Post Opportunity"
            onAction={handleOpenCreateModal}
          />
        ) : (
          <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="p-4">Company & Role</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Work Mode</th>
                    <th className="p-4">Stipend</th>
                    <th className="p-4">Deadline</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {opportunities.map((opp) => (
                    <tr key={opp._id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white shrink-0">
                            {opp.company.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-white block">{opp.role}</span>
                            <span className="text-slate-400 text-[11px]">{opp.company}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-300">{opp.location}</td>
                      <td className="p-4">
                        <Badge variant="purple">{opp.workMode}</Badge>
                      </td>
                      <td className="p-4 text-emerald-400 font-semibold">{opp.stipend || 'Competitive'}</td>
                      <td className="p-4 text-slate-400">
                        {new Date(opp.deadline).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(opp)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(opp._id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Opportunity Details' : 'Post New Campus Opportunity'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Company Name"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. Google Cloud"
              required
            />
            <Input
              label="Role Title"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Full-Stack Engineer Intern"
              required
            />
            <Input
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. San Francisco, CA"
              required
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase">Work Mode</label>
              <select
                value={formData.workMode}
                onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
            <Input
              label="Stipend"
              value={formData.stipend}
              onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
              placeholder="e.g. $7,500 / month"
            />
            <Input
              label="Full-time Salary Track (Optional)"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              placeholder="e.g. $125,000 / year"
            />
            <Input
              label="Application Deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              required
            />
            <Input
              label="Eligibility Criteria"
              value={formData.eligibility}
              onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
              placeholder="e.g. CS / IT Undergrads 2026"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase">Role Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of responsibilities and technical stack..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Required Skills Chips */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-300 uppercase">Required Technical Skills</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill tag..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(e)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <Button type="button" onClick={handleAddSkill} variant="secondary" size="sm">
                Add Tag
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              {skills.map((s, idx) => (
                <span key={idx} className="px-2.5 py-1 text-xs bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded-lg flex items-center gap-1 font-semibold">
                  {s}
                  <button type="button" onClick={() => handleRemoveSkill(s)} className="hover:text-rose-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Button variant="ghost" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" isLoading={formSubmitting}>
              {editingId ? 'Save Changes' : 'Post Opportunity'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Confirm Delete Opportunity"
        maxWidth="max-w-md"
      >
        <div className="flex flex-col gap-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Are you sure?</h3>
          <p className="text-xs text-slate-400">
            This action will permanently delete the opportunity listing from MongoDB.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button variant="ghost" size="md" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="md" isLoading={deleting} onClick={handleDeleteConfirm}>
              Yes, Delete
            </Button>
          </div>
        </div>
      </Modal>

    </AdminLayout>
  );
};

export default AdminOpportunitiesPage;
