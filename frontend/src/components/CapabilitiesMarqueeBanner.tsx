import React from 'react';
import { CheckSquare } from 'lucide-react';

export const CAPABILITIES_PLATFORM_BADGES = [
  'Strategy & advisory',
  'Process design & reengineering',
  'ERP implementation & migration',
  'Integration & automation',
  'Data migration & governance',
  'Managed services & support',
];

export const CapabilitiesMarqueeBanner: React.FC = () => {
  // Duplicated badge array for seamless infinite marquee scrolling
  const marqueeList = [...CAPABILITIES_PLATFORM_BADGES, ...CAPABILITIES_PLATFORM_BADGES];

  return (
    <div className="w-full py-8 select-none relative overflow-hidden">
      {/* Prominent Section Header */}
      <div className="text-center flex flex-col items-center gap-3 mb-8">
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Capabilities Across{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
            Every Platform
          </span>
        </h2>
      </div>

      {/* ================= MARQUEE SCROLL TRACK (< 1280px) ================= */}
      <div className="block xl:hidden w-full overflow-hidden marquee-mask relative py-2">
        <div className="animate-marquee-track flex items-center gap-4">
          {marqueeList.map((badge, idx) => (
            <span
              key={`${badge}-${idx}`}
              className="px-4 py-2 rounded-full bg-white border border-slate-200/90 text-xs md:text-sm font-medium text-slate-700 flex items-center gap-2.5 shrink-0 hover:-translate-y-[3px] hover:border-orange-500/40 hover:bg-orange-50/50 hover:shadow-[0_8px_16px_-4px_rgba(15,23,42,0.08)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            >
              <CheckSquare className="w-4 h-4 text-orange-500 shrink-0" />
              <span>{badge}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ================= DESKTOP STATIC STAGGERED GRID (≥ 1280px) ================= */}
      <div className="hidden xl:flex flex-wrap items-center justify-center gap-3 py-2">
        {CAPABILITIES_PLATFORM_BADGES.map((badge) => (
          <span
            key={badge}
            className="px-5 py-2.5 rounded-full bg-white border border-slate-200/90 text-sm font-medium text-slate-700 flex items-center gap-2.5 hover:-translate-y-[3px] hover:border-orange-500/40 hover:bg-orange-50/50 hover:shadow-[0_8px_16px_-4px_rgba(15,23,42,0.08)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
          >
            <CheckSquare className="w-4 h-4 text-orange-500 shrink-0" />
            <span>{badge}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
