import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, trend, color = 'blue' }) => {
  const colorMap = {
    blue: 'from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30',
    emerald: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    purple: 'from-purple-500/20 to-violet-500/10 text-purple-400 border-purple-500/30',
    amber: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
    rose: 'from-rose-500/20 to-red-500/10 text-rose-400 border-rose-500/30',
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between relative overflow-hidden group"
    >
      <div className="flex flex-col gap-1 z-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <h3 className="text-3xl font-extrabold text-white tracking-tight font-['Outfit'] mt-1">
          {value}
        </h3>
        {trend && (
          <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 mt-1">
            {trend}
          </span>
        )}
      </div>

      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
          colorMap[color] || colorMap.blue
        } border flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
      >
        {Icon && <Icon className="w-7 h-7" />}
      </div>
    </motion.div>
  );
};

export default StatsCard;
