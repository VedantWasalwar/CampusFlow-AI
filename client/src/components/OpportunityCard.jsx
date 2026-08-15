import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Bookmark, ArrowRight, Building2, DollarSign } from 'lucide-react';
import Badge from './Badge';
import Button from './Button';

const OpportunityCard = ({
  opportunity,
  userSkills = [],
  isSaved = false,
  onSaveToggle,
  onViewDetails
}) => {
  const {
    _id,
    company,
    role,
    location,
    workMode,
    stipend,
    requiredSkills = [],
    deadline
  } = opportunity;

  // Calculate Skill Match Percentage based on student skills
  let matchPercentage = 0;
  if (requiredSkills.length > 0 && userSkills.length > 0) {
    const userClean = userSkills.map((s) => s.toLowerCase().trim());
    const matched = requiredSkills.filter((req) =>
      userClean.includes(req.toLowerCase().trim())
    );
    matchPercentage = Math.round((matched.length / requiredSkills.length) * 100);
  }

  // Deadline urgency calculation
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - new Date();
  const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  let urgencyVariant = 'success';
  let urgencyText = `${diffDays} days left`;
  if (diffDays <= 3) {
    urgencyVariant = 'danger';
    urgencyText = `${diffDays === 0 ? 'Ends Today' : `${diffDays} days left`}`;
  } else if (diffDays <= 7) {
    urgencyVariant = 'warning';
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-card rounded-2xl p-6 flex flex-col justify-between relative group overflow-hidden border border-slate-800"
    >
      {/* Top Banner Gradient Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Header: Company Avatar & Save Button */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center font-bold text-white text-lg shadow-md group-hover:border-blue-500/40 transition-colors">
              {company ? company.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                {company}
              </h4>
              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 mt-0.5 font-['Outfit']">
                {role}
              </h3>
            </div>
          </div>

          <button
            onClick={() => onSaveToggle && onSaveToggle(_id)}
            className={`p-2 rounded-xl border transition-all ${
              isSaved
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/40'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
            title={isSaved ? 'Unsave Opportunity' : 'Save Opportunity'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-400' : ''}`} />
          </button>
        </div>

        {/* Location & WorkMode Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="cyan" className="gap-1">
            <MapPin className="w-3 h-3" />
            {location}
          </Badge>
          <Badge variant="purple">{workMode}</Badge>
          <Badge variant="success" className="gap-1">
            <DollarSign className="w-3 h-3" />
            {stipend || 'Competitive'}
          </Badge>

          {matchPercentage > 0 && (
            <Badge variant={matchPercentage >= 70 ? 'primary' : 'warning'} className="ml-auto">
              {matchPercentage}% Match
            </Badge>
          )}
        </div>

        {/* Required Skills Chips */}
        <div className="mb-6">
          <p className="text-[11px] text-slate-400 font-medium mb-2 uppercase tracking-wider">
            Required Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {requiredSkills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium"
              >
                {skill}
              </span>
            ))}
            {requiredSkills.length > 4 && (
              <span className="px-2 py-1 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-400 font-medium">
                +{requiredSkills.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Deadline & Action */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <Badge variant={urgencyVariant}>{urgencyText}</Badge>
        </div>

        <Button
          onClick={() => onViewDetails && onViewDetails(_id)}
          variant="outline"
          size="sm"
          icon={ArrowRight}
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
};

export default OpportunityCard;
