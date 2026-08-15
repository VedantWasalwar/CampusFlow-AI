import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { CardSkeleton } from '../components/Skeleton';
import { ErrorState } from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { opportunityService, applicationService, savedService } from '../services/api';
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Bookmark,
  Send,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Briefcase,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';

const OpportunityDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [opportunity, setOpportunity] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Application Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appNotes, setAppNotes] = useState('');
  const [submittingApp, setSubmittingApp] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await opportunityService.getById(id);
      if (res.success && res.data?.opportunity) {
        setOpportunity(res.data.opportunity);
      }

      if (isAuthenticated) {
        const [savedRes, myAppsRes] = await Promise.all([
          savedService.getSaved(),
          applicationService.getMyApplications()
        ]);

        if (savedRes.success) {
          const ids = (savedRes.data.saved || []).map((s) => s.opportunityId?._id || s.opportunityId);
          setIsSaved(ids.includes(id));
        }

        if (myAppsRes.success) {
          const applied = (myAppsRes.data.applications || []).some((a) => (a.opportunityId?._id || a.opportunityId) === id);
          setHasApplied(applied);
        }
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleSaveToggle = async () => {
    if (!isAuthenticated) {
      showToast('Please log in to save opportunities.', 'info');
      return;
    }
    try {
      if (isSaved) {
        await savedService.unsave(id);
        setIsSaved(false);
        showToast('Removed from saved list.', 'info');
      } else {
        await savedService.save(id);
        setIsSaved(true);
        showToast('Opportunity saved successfully!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Failed to update saved status', 'error');
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setSubmittingApp(true);
      const res = await applicationService.apply(id, appNotes);
      if (res.success) {
        setHasApplied(true);
        setIsModalOpen(false);
        showToast('Application submitted successfully!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Application submission failed', 'error');
    } finally {
      setSubmittingApp(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-5xl mx-auto px-4 py-16">
          <CardSkeleton />
        </div>
      </MainLayout>
    );
  }

  if (error || !opportunity) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto px-4 py-20">
          <ErrorState
            title="Opportunity Not Found"
            message="The requested position does not exist or has been removed."
            onRetry={() => navigate('/opportunities')}
          />
        </div>
      </MainLayout>
    );
  }

  // Calculate Skill Match breakdown
  const reqSkills = opportunity.requiredSkills || [];
  const userSkills = user?.skills || [];
  const cleanUser = userSkills.map((s) => s.toLowerCase().trim());
  
  const matchingSkills = reqSkills.filter((req) => cleanUser.includes(req.toLowerCase().trim()));
  const missingSkills = reqSkills.filter((req) => !cleanUser.includes(req.toLowerCase().trim()));
  
  const matchPercentage = reqSkills.length > 0
    ? Math.round((matchingSkills.length / reqSkills.length) * 100)
    : 100;

  return (
    <MainLayout>
      <div className="py-12 bg-slate-950 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Opportunities
          </button>

          {/* Hero Details Header */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 mb-8 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white text-2xl shadow-xl shrink-0">
                  {opportunity.company.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" /> {opportunity.company}
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit'] mt-1">
                    {opportunity.role}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <Badge variant="cyan" className="gap-1">
                      <MapPin className="w-3 h-3" /> {opportunity.location}
                    </Badge>
                    <Badge variant="purple">{opportunity.workMode}</Badge>
                    <Badge variant="success" className="gap-1">
                      <DollarSign className="w-3 h-3" /> {opportunity.stipend || 'Competitive'}
                    </Badge>
                    {opportunity.salary && (
                      <Badge variant="primary">{opportunity.salary}</Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Top Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleSaveToggle}
                  className={`p-3 rounded-2xl border transition-all ${
                    isSaved
                      ? 'bg-blue-600/20 text-blue-400 border-blue-500/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                  title={isSaved ? 'Unsave' : 'Save'}
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-blue-400' : ''}`} />
                </button>

                {hasApplied ? (
                  <Button variant="success" size="lg" disabled icon={CheckCircle2}>
                    Applied
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    icon={Send}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Apply Now
                  </Button>
                )}
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Description & Eligibility */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Description Box */}
              <div className="glass-panel p-8 rounded-3xl border border-slate-800">
                <h3 className="text-lg font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-400" /> Opportunity Overview
                </h3>
                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {opportunity.description}
                </div>
              </div>

              {/* Eligibility & Requirements Box */}
              <div className="glass-panel p-8 rounded-3xl border border-slate-800">
                <h3 className="text-lg font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-400" /> Eligibility Criteria
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  {opportunity.eligibility}
                </p>
              </div>

            </div>

            {/* Right Column: Skill Match Calculator & Meta Info */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Skill Match Section */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Skill Match</span>
                  <Badge variant={matchPercentage >= 70 ? 'success' : 'warning'}>
                    {matchPercentage}% Match
                  </Badge>
                </div>

                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-500"
                    style={{ width: `${matchPercentage}%` }}
                  />
                </div>

                {/* Matching vs Missing */}
                <div className="flex flex-col gap-3 pt-2">
                  <div>
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Matching Skills ({matchingSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {matchingSkills.length > 0 ? (
                        matchingSkills.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-md font-medium">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500 italic">None matched yet</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1 mb-1">
                      <XCircle className="w-3.5 h-3.5" /> Missing Skills ({missingSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {missingSkills.length > 0 ? (
                        missingSkills.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-md font-medium">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500 italic">No missing skills!</span>
                      )}
                    </div>
                  </div>
                </div>

                <Link to={`/skill-analyzer?opportunityId=${id}`}>
                  <Button variant="outline" size="sm" icon={Sparkles} className="w-full mt-2">
                    Analyze Skill Gap Roadmap
                  </Button>
                </Link>
              </div>

              {/* Deadline & Meta Box */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col gap-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400">Application Deadline</span>
                  <span className="font-bold text-white">
                    {new Date(opportunity.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-slate-400">Work Mode</span>
                  <span className="font-bold text-white">{opportunity.workMode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Posted On</span>
                  <span className="font-bold text-white">
                    {new Date(opportunity.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Application Submission Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Apply to ${opportunity.role} at ${opportunity.company}`}
      >
        <form onSubmit={handleApplySubmit} className="flex flex-col gap-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Applying Student</h4>
            <p className="text-sm font-bold text-white">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.email} • {user?.college || 'Student'}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Cover Note / Application Details (Optional)</label>
            <textarea
              rows={4}
              value={appNotes}
              onChange={(e) => setAppNotes(e.target.value)}
              placeholder="Highlight relevant projects or why you're a great fit for this position..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Button variant="ghost" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" isLoading={submittingApp} icon={Send}>
              Confirm & Submit Application
            </Button>
          </div>
        </form>
      </Modal>

    </MainLayout>
  );
};

export default OpportunityDetailsPage;
