import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import OpportunityCard from '../components/OpportunityCard';
import Button from '../components/Button';
import { CardSkeleton } from '../components/Skeleton';
import { EmptyState, ErrorState } from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { savedService } from '../services/api';
import { Bookmark, Briefcase } from 'lucide-react';

const SavedOpportunitiesPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSaved = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await savedService.getSaved();
      if (res.success) {
        setSavedItems(res.data.saved || []);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const handleUnsave = async (opportunityId) => {
    try {
      await savedService.unsave(opportunityId);
      setSavedItems((prev) => prev.filter((item) => {
        const oppId = item.opportunityId?._id || item.opportunityId;
        return oppId !== opportunityId && item._id !== opportunityId;
      }));
      showToast('Opportunity removed from saved list.', 'info');
    } catch (err) {
      showToast('Failed to remove saved item', 'error');
    }
  };

  const opportunitiesList = savedItems
    .map((item) => item.opportunityId)
    .filter((opp) => opp !== null && opp !== undefined);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-blue-400 fill-blue-400/20" /> Saved Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Quick access to bookmarked roles you want to apply for later
            </p>
          </div>
          <Link to="/opportunities">
            <Button variant="primary" icon={Briefcase} size="sm">
              Explore More
            </Button>
          </Link>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : error ? (
          <ErrorState
            title="Failed to load saved items"
            message="Could not retrieve your saved bookmarks."
            onRetry={fetchSaved}
          />
        ) : opportunitiesList.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="No saved opportunities yet"
            description="Save opportunities to access them quickly and never miss application windows."
            actionLabel="Explore Opportunities"
            onAction={() => window.location.href = '/opportunities'}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunitiesList.map((opp) => (
              <OpportunityCard
                key={opp._id}
                opportunity={opp}
                userSkills={user?.skills || []}
                isSaved={true}
                onSaveToggle={handleUnsave}
                onViewDetails={(id) => window.location.href = `/opportunities/${id}`}
              />
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default SavedOpportunitiesPage;
