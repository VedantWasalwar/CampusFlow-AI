import React from 'react';
import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';

const ApplicationTimeline = ({ status = 'Applied', timeline = [] }) => {
  const steps = [
    { key: 'Applied', label: 'Applied' },
    { key: 'Assessment', label: 'Assessment' },
    { key: 'Interview', label: 'Interview' },
    { key: 'Decision', label: status === 'Rejected' ? 'Rejected' : 'Selected' }
  ];

  const getStepState = (stepKey, index) => {
    if (status === 'Rejected') {
      if (stepKey === 'Decision') return 'rejected';
    }

    const statusOrder = ['Applied', 'Assessment', 'Interview', 'Selected'];
    const currentIndex = statusOrder.indexOf(status);

    if (currentIndex >= index) {
      return 'completed';
    } else if (currentIndex + 1 === index) {
      return 'current';
    }
    return 'upcoming';
  };

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />

        {steps.map((step, idx) => {
          const state = getStepState(step.key, idx);

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center group">
              {/* Circle Marker */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  state === 'completed'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                    : state === 'rejected'
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                    : state === 'current'
                    ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 shadow-lg shadow-blue-500/30'
                    : 'bg-slate-900 border border-slate-700 text-slate-500'
                }`}
              >
                {state === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : state === 'rejected' ? (
                  <XCircle className="w-5 h-5" />
                ) : state === 'current' ? (
                  <Clock className="w-4 h-4 animate-pulse" />
                ) : (
                  idx + 1
                )}
              </div>

              {/* Step Label */}
              <span
                className={`text-xs font-semibold mt-2 ${
                  state === 'completed'
                    ? 'text-emerald-400'
                    : state === 'rejected'
                    ? 'text-rose-400'
                    : state === 'current'
                    ? 'text-blue-400'
                    : 'text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* History notes preview */}
      {timeline && timeline.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Status Activity Log
          </p>
          <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto">
            {timeline.map((item, index) => (
              <div key={index} className="text-xs flex items-center justify-between text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-400">{item.status}:</span>
                  <span className="text-slate-300">{item.note || 'Status updated'}</span>
                </div>
                <span className="text-[10px] text-slate-500">{new Date(item.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationTimeline;
