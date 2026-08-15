import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { CardSkeleton } from '../components/Skeleton';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { opportunityService, skillService } from '../services/api';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Target,
  BookOpen,
  ArrowRight,
  Zap,
  BarChart2
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';

const SkillAnalyzerPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const preselectedOppId = searchParams.get('opportunityId') || '';

  const [opportunities, setOpportunities] = useState([]);
  const [selectedOppId, setSelectedOppId] = useState(preselectedOppId);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loadingOpps, setLoadingOpps] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        setLoadingOpps(true);
        const res = await opportunityService.getOpportunities({ limit: 50 });
        if (res.success) {
          const list = res.data.opportunities || [];
          setOpportunities(list);
          if (list.length > 0 && !selectedOppId) {
            setSelectedOppId(list[0]._id);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingOpps(false);
      }
    };

    loadOpportunities();
  }, []);

  const runAnalysis = async (oppId) => {
    if (!oppId) return;
    try {
      setAnalyzing(true);
      const res = await skillService.analyze(oppId);
      if (res.success && res.data) {
        setAnalysisResult(res.data.analysis);
      }
    } catch (err) {
      showToast('Skill gap analysis failed', 'error');
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    if (selectedOppId) {
      runAnalysis(selectedOppId);
    }
  }, [selectedOppId]);

  const selectedOpp = opportunities.find((o) => o._id === selectedOppId);

  // Format Data for Recharts Radar Chart
  const radarData = selectedOpp?.requiredSkills?.map((skill) => {
    const userClean = (user?.skills || []).map((s) => s.toLowerCase().trim());
    const isMatched = userClean.includes(skill.toLowerCase().trim());
    return {
      skill,
      StudentLevel: isMatched ? 100 : 20,
      TargetLevel: 100
    };
  }) || [];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        
        {/* Header */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-950/40 via-slate-900 to-purple-950/40 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <Badge variant="purple" className="mb-3 gap-1.5 py-1 px-3">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Transparent Matching Engine
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit']">
                Smart Skill Gap Analyzer
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-2 leading-relaxed">
                Compare your tech profile against specific job requirements. Identify missing prerequisites and focus your study hours effectively.
              </p>
            </div>

            {/* Target Role Selector */}
            <div className="flex flex-col gap-1.5 w-full md:w-80">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Target Opportunity
              </label>
              <select
                value={selectedOppId}
                onChange={(e) => setSelectedOppId(e.target.value)}
                disabled={loadingOpps}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-blue-500 cursor-pointer shadow-lg"
              >
                {opportunities.map((opp) => (
                  <option key={opp._id} value={opp._id}>
                    {opp.company} — {opp.role}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Body */}
        {analyzing ? (
          <CardSkeleton />
        ) : !analysisResult ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            Select an opportunity to calculate skill gap.
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            
            {/* Top Score Banner */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Match Score Card */}
              <div className="md:col-span-5 glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col justify-between items-center text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Target Skill Compatibility
                </span>

                <div className="relative w-40 h-40 my-6 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-purple-500 transition-all duration-1000 ease-out"
                      strokeDasharray={`${analysisResult.matchPercentage}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-extrabold text-white font-['Outfit']">
                      {analysisResult.matchPercentage}%
                    </span>
                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                      Match Score
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 w-full">
                  <span className="font-bold text-white block mb-0.5">{analysisResult.readinessLevel}</span>
                  {analysisResult.message}
                </div>
              </div>

              {/* Recharts Radar Visualization */}
              <div className="md:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-purple-400" /> Skill Competency Breakdown
                  </h3>
                  <Badge variant="purple">Radar Matrix</Badge>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="skill" stroke="#94a3b8" fontSize={11} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={10} />
                      <Radar name="Target Requirement" dataKey="TargetLevel" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} />
                      <Radar name="Your Proficiency" dataKey="StudentLevel" stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Matching VS Missing Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Matching Skills */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-800">
                <h3 className="text-base font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Matching Skills ({analysisResult.matchingSkills?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.matchingSkills?.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {skill}
                    </span>
                  ))}
                  {analysisResult.matchingSkills?.length === 0 && (
                    <p className="text-xs text-slate-500 italic">No matching skills found yet.</p>
                  )}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-800">
                <h3 className="text-base font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-amber-400" /> Missing Skills ({analysisResult.missingSkills?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.missingSkills?.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-amber-400" />
                      {skill}
                    </span>
                  ))}
                  {analysisResult.missingSkills?.length === 0 && (
                    <p className="text-xs text-emerald-400 font-semibold">You possess all required skills for this role! 🎉</p>
                  )}
                </div>
              </div>

            </div>

            {/* Recommended Learning Roadmap with Priorities */}
            {analysisResult.recommendations?.length > 0 && (
              <div className="glass-panel p-6 rounded-3xl border border-slate-800">
                <h3 className="text-lg font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" /> Prioritized Learning Roadmap
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResult.recommendations.map((item, idx) => (
                    <div key={idx} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between gap-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{item.skill}</span>
                        <Badge variant={item.priority === 'HIGH' ? 'danger' : item.priority === 'MEDIUM' ? 'warning' : 'default'}>
                          {item.priority} PRIORITY
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.action}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                        <span>Est. Study Duration</span>
                        <span className="font-bold text-blue-400">~{item.estimatedHours} Hours</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default SkillAnalyzerPage;
