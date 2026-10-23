import React from 'react';
import type { SliderCard } from '../data/sliderData';
import { X, ShieldCheck, Zap, Cpu, Database } from 'lucide-react';

interface CardDetailModalProps {
  card: SliderCard | null;
  onClose: () => void;
  onNavigate?: (page: string) => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  onClose,
  onNavigate,
}) => {
  if (!card) return null;

  const handleGoToDetails = () => {
    if (onNavigate && card.pageRoute) {
      onNavigate(card.pageRoute);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 shadow-2xl text-slate-900 flex flex-col md:flex-row">
        {/* Left Side: Large Media Preview */}
        <div 
          onClick={handleGoToDetails}
          className="relative md:w-1/2 h-44 sm:h-64 md:h-auto shrink-0 overflow-hidden group cursor-pointer"
        >
          <img
            src={card.imageUrl}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        </div>

        {/* Right Side: Details & Practice Highlights */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {card.num && (
                  <span className="text-xs font-mono font-black text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                    {card.num}
                  </span>
                )}
                <span className="text-xs font-medium text-slate-500">
                  {card.subtitle}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 
              onClick={handleGoToDetails}
              className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight cursor-pointer hover:text-sky-600 transition-colors"
            >
              {card.title}
            </h2>

            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              {card.description}
            </p>

            {/* Dynamic Authentic Practice Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Database className="w-5 h-5 text-sky-600 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">
                    {card.pageRoute === 'SAP' ? 'Digital Core' : card.pageRoute === 'AI' ? 'Accuracy Rate' : 'Talent Capacity'}
                  </div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-1">{card.stats.depth}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Cpu className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">
                    {card.pageRoute === 'SAP' ? 'Specialization' : card.pageRoute === 'AI' ? 'Framework' : 'Sourcing SLA'}
                  </div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-1">{card.stats.vertices}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">
                    {card.pageRoute === 'SAP' ? 'Global Reach' : card.pageRoute === 'AI' ? 'Deployment' : 'Vetting Standard'}
                  </div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-1">{card.stats.downloads}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Zap className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Support SLA</div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-1">
                    {card.pageRoute === 'SAP' ? '24/7 Managed AMS' : card.pageRoute === 'AI' ? 'Real-Time Pipelines' : 'Vetted Shortlist'}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {card.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Direct Navigation Action Button */}
          <div className="flex flex-col gap-2 mt-6 pt-4 border-t border-slate-200">
            {card.pageRoute && onNavigate && (
              <button
                onClick={handleGoToDetails}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold text-xs transition-all shadow-[0_4px_15px_rgba(2,132,199,0.3)] hover:scale-[1.01]"
              >
                View Full {card.pageRoute === 'AI' ? 'AI Innovations' : card.pageRoute === 'SAP' ? 'Enterprise Applications' : 'Talent Acquisition'} Page Details →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
