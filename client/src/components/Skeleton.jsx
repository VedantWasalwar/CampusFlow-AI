import React from 'react';

export const Skeleton = ({ className = '', variant = 'text' }) => {
  const base = "animate-pulse bg-slate-800/80 rounded-xl";
  
  if (variant === 'circle') {
    return <div className={`${base} rounded-full ${className}`} />;
  }
  
  return <div className={`${base} ${className}`} />;
};

export const CardSkeleton = () => (
  <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <Skeleton variant="circle" className="w-12 h-12" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
    <Skeleton className="h-16 w-full" />
    <div className="flex gap-2">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-16" />
    </div>
    <div className="flex justify-between items-center pt-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-9 w-28" />
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="w-full flex flex-col gap-3">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="h-14 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center px-4 justify-between animate-pulse">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/5" />
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="h-7 w-20" />
      </div>
    ))}
  </div>
);

export default Skeleton;
