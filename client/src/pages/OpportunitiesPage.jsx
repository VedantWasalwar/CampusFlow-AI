import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import OpportunityCard from '../components/OpportunityCard';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { CardSkeleton } from '../components/Skeleton';
import { EmptyState, ErrorState } from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { opportunityService, savedService } from '../services/api';
import { Search, X, ArrowUpDown } from 'lucide-react';

const OpportunitiesPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [opportunities, setOpportunities] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  // Filters State
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [workMode, setWorkMode] = useState('All');
  const [sort, setSort] = useState('newest');
  const [selectedSkill, setSelectedSkill] = useState('');

  const fetchOpportunities = async (page = 1) => {
    try {
      setLoading(true);
      setError(false);

      const params = {
        page,
        limit: 12,
        search: searchTerm,
        workMode: workMode !== 'All' ? workMode : undefined,
        skill: selectedSkill || undefined,
        sort
      };

      const [oppRes, savedRes] = await Promise.all([
        opportunityService.getOpportunities(params),
        isAuthenticated ? savedService.getSaved() : Promise.resolve({ success: false })
      ]);

      if (oppRes.success) {
        const list = oppRes.opportunities || oppRes.data?.opportunities || [];
        const pag = oppRes.data?.pagination || { page: 1, pages: 1, total: list.length };
        setOpportunities(list);
        setPagination(pag);
      } else {
        setError(true);
      }

      if (savedRes && savedRes.success) {
        const savedList = savedRes.saved || savedRes.data?.saved || [];
        const ids = savedList.map((s) => s.opportunityId?._id || s.opportunityId);
        setSavedIds(ids);
      }
    } catch (err) {
      console.error('Fetch Opportunities Error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities(1);
  }, [searchTerm, workMode, selectedSkill, sort]);

  const handleSaveToggle = async (opportunityId) => {
    if (!isAuthenticated) {
      showToast('Please sign in to save opportunities.', 'info');
      return;
    }
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

  const handleClearFilters = () => {
    setSearchTerm('');
    setWorkMode('All');
    setSort('newest');
    setSelectedSkill('');
    setSearchParams({});
  };

  return (
    <MainLayout>
      <div className="py-12 bg-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge variant="primary" className="mb-3">Explore Roles</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
              Discover Your Next Opportunity
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Browse top internships, software engineering contracts, and campus placement drives.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-800 mb-8 flex flex-col gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by role, company, skills, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Pills & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
              
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Work Mode Filter */}
                <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  {['All', 'Remote', 'Hybrid', 'On-site'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setWorkMode(mode)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        workMode === mode
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {/* Popular Skill Quick Filters */}
                <div className="hidden sm:flex items-center gap-1.5">
                  {['React', 'Node.js', 'Python', 'TypeScript'].map((skill) => (
                    <button
                      key={skill}
                      onClick={() => setSelectedSkill(selectedSkill === skill ? '' : skill)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                        selectedSkill === skill
                          ? 'bg-purple-600/20 text-purple-300 border-purple-500/40'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>

              </div>

              {/* Sort Dropdown & Result Count */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="newest">Sort: Newest First</option>
                    <option value="deadline">Sort: Closing Soonest</option>
                  </select>
                </div>

                {(searchTerm || workMode !== 'All' || selectedSkill) && (
                  <Button variant="ghost" size="sm" onClick={handleClearFilters} icon={X}>
                    Clear Filters
                  </Button>
                )}
              </div>

            </div>

            {/* Results Count Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
              <span>
                Found <strong className="text-white font-bold">{opportunities.length}</strong> opportunities available
              </span>
            </div>

          </div>

          {/* Content Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)}
            </div>
          ) : error ? (
            <ErrorState
              title="Unable to load opportunities"
              message="Check your network connection or server status."
              onRetry={() => fetchOpportunities(1)}
            />
          ) : opportunities.length === 0 ? (
            <EmptyState
              title="No opportunities available right now"
              description="No opportunities match your current search or filter criteria."
              actionLabel="Clear Filters"
              onAction={handleClearFilters}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opp) => (
                <OpportunityCard
                  key={opp._id || opp.id}
                  opportunity={opp}
                  userSkills={user?.skills || []}
                  isSaved={savedIds.includes(opp._id || opp.id)}
                  onSaveToggle={handleSaveToggle}
                  onViewDetails={(id) => navigate(`/opportunities/${id}`)}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page <= 1}
                onClick={() => fetchOpportunities(pagination.page - 1)}
              >
                Previous
              </Button>
              <span className="text-xs text-slate-400 font-medium px-4">
                Page {pagination.page} of {pagination.pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page >= pagination.pages}
                onClick={() => fetchOpportunities(pagination.page + 1)}
              >
                Next
              </Button>
            </div>
          )}

        </div>
      </div>
    </MainLayout>
  );
};

export default OpportunitiesPage;
