import React, { useState, useRef, useEffect } from 'react';
import { Search, UserCheck, ShieldCheck, Clock } from 'lucide-react';

export interface ScreeningStep {
  step: string;
  title: string;
  details: string;
  icon: React.ElementType;
}

const DEFAULT_STEPS: ScreeningStep[] = [
  {
    step: '01',
    title: 'Requirement Deep Dive',
    details: 'Architecture sessions and process mapping, billing volume and SLA analysis, integration landscape review, gap identification and resource specification.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Architect-Level Screening',
    details: 'Scenario-based evaluations, rating, invoicing and FI-CA tests, integration and performance validation. Only top candidates move forward.',
    icon: UserCheck,
  },
  {
    step: '03',
    title: 'Deployment & Transition',
    details: 'Shadowing and knowledge transfer, documentation, and industry templates and accelerators.',
    icon: ShieldCheck,
  },
  {
    step: '04',
    title: 'Continuous Governance',
    details: 'Weekly review meetings, SLA tracking and escalation, monthly performance checks and client satisfaction surveys.',
    icon: Clock,
  },
];

interface ScreeningProcessCarouselProps {
  steps?: ScreeningStep[];
}

export const ScreeningProcessCarousel: React.FC<ScreeningProcessCarouselProps> = ({ steps = DEFAULT_STEPS }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollableDistance = rect.height - windowHeight;
      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setScrollProgress(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full h-[220vh] bg-slate-50/70 select-none py-4">
      {/* Sticky Viewport Container */}
      <div className="sticky top-16 h-[82vh] w-full flex flex-col items-center justify-between py-6 px-4 sm:px-6 lg:px-10 overflow-hidden">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto z-20">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-2">
            How We Screen and{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              Deploy Talent
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Scroll down to watch our 4-step process expand outward from the center.
          </p>
        </div>

        {/* 4-Card Stage with Scroll-Driven Split Animation */}
        <div className="relative w-full max-w-7xl h-[360px] sm:h-[400px] flex items-center justify-center z-10 my-auto">
          
          {/* Ambient Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[280px] bg-gradient-to-r from-blue-400/20 via-indigo-400/15 to-orange-400/20 rounded-full blur-[110px] pointer-events-none" />

          {/* Cards Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {steps.map((step, index) => {
              // 4 Cards Target Offsets when fully expanded (scrollProgress = 1.0):
              // Index 0 (Step 01): Far Left   -> targetMultiplier = -1.5
              // Index 1 (Step 02): Inner Left -> targetMultiplier = -0.5
              // Index 2 (Step 03): Inner Right-> targetMultiplier = +0.5
              // Index 3 (Step 04): Far Right  -> targetMultiplier = +1.5
              const targetMultiplier = index - 1.5;

              // Card width = 270px, Half-inch gap = 48px (0.5in in CSS = 48px)
              // Center-to-center distance = 270px + 48px = 318px
              const cardWidth = typeof window !== 'undefined' && window.innerWidth < 640 ? 240 : 270;
              const halfInchGap = 48; // 0.5 inch = 48px
              const baseSpacing = cardWidth + halfInchGap;
              
              // Continuous translateX position derived from scrollProgress (0 = centered, 1 = expanded)
              const translateX = targetMultiplier * baseSpacing * scrollProgress;

              // Stack initial state (when scrollProgress = 0, stacked in middle)
              const initialScale = 1 - index * 0.03; 
              const currentScale = initialScale + (1 - initialScale) * scrollProgress;

              // Elevation Z-Index (when centered, earlier steps sit on top)
              const zIndex = 40 - index * 10;

              // Subtle Y-axis perspective rotation as cards expand left & right
              const rotateY = targetMultiplier * 3 * scrollProgress;

              const Icon = step.icon;
              const isHighlight = scrollProgress > 0.8;

              return (
                <div
                  key={step.step}
                  className="absolute [backface-visibility:hidden]"
                  style={{
                    width: `${cardWidth}px`,
                    transform: `translate3d(${translateX}px, 0px, 0px) rotateY(${rotateY}deg) scale(${currentScale})`,
                    zIndex,
                    willChange: 'transform',
                  }}
                >
                  <div
                    className={`relative p-6 sm:p-7 rounded-3xl transition-all duration-300 flex flex-col justify-between h-[310px] sm:h-[350px] overflow-hidden ${
                      scrollProgress === 0 && index === 0
                        ? 'bg-white border-2 border-blue-500 shadow-[0_20px_50px_-10px_rgba(37,99,235,0.35)] ring-4 ring-blue-500/10'
                        : isHighlight
                        ? 'bg-white border border-slate-200/90 shadow-lg hover:shadow-2xl hover:border-blue-500/50 hover:-translate-y-1'
                        : 'bg-white/95 border border-slate-200/90 shadow-md backdrop-blur-md'
                    }`}
                  >
                    {/* Top Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4 sm:mb-5">
                        <span className="text-3xl sm:text-4xl font-black font-mono tracking-tighter text-blue-600">
                          {step.step}
                        </span>

                        <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                          <Icon className="w-5 h-5 stroke-[2]" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mb-2.5">
                        {step.title}
                      </h3>

                      {/* Details */}
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {step.details}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Visual Status Bar */}
        <div className="z-20 flex flex-col items-center gap-2">
          {/* Progress bar track */}
          <div className="w-48 sm:w-64 h-2 rounded-full bg-slate-200 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 transition-all duration-150 rounded-full"
              style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ScreeningProcessCarousel;
