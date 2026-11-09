import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, UserCheck, ShieldCheck, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

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

  const activeIndex = Math.min(
    steps.length - 1,
    Math.max(0, Math.round(scrollProgress * (steps.length - 1)))
  );

  const scrollToStep = useCallback((stepIdx: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const sectionTop = currentScrollY + rect.top;
    const scrollableDistance = rect.height - window.innerHeight;
    const targetProgress = stepIdx / (steps.length - 1);
    const targetY = sectionTop + targetProgress * scrollableDistance;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }, [steps.length]);

  const handleNext = () => {
    if (activeIndex < steps.length - 1) {
      scrollToStep(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToStep(activeIndex - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <div
      ref={sectionRef}
      className={`relative w-full ${isMobile ? 'h-[200vh]' : 'h-[220vh]'} bg-slate-50/70 select-none py-4`}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-16 h-[84vh] max-h-[750px] w-full flex flex-col items-center justify-between py-4 sm:py-6 px-3 sm:px-6 lg:px-10 overflow-hidden">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto z-20 px-2">
          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-1.5 sm:mb-2">
            How We Screen and{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              Deploy Talent
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {isMobile
              ? 'Swipe, tap, or scroll down to explore each step of our process.'
              : 'Scroll down to watch our 4-step process expand outward from the center.'}
          </p>
        </div>

        {/* Mobile Step Tabs */}
        {isMobile && (
          <div className="z-20 flex items-center justify-center gap-1.5 w-full max-w-sm px-2">
            {steps.map((s, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105 ring-2 ring-blue-500/20'
                      : 'bg-white/90 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-mono">{s.step}</span>
                  {isActive && (
                    <span className="truncate max-w-[85px] text-[11px] font-semibold">
                      {s.title.split(' ')[0]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 4-Card Stage */}
        <div
          className="relative w-full max-w-7xl h-[330px] sm:h-[400px] flex items-center justify-center z-10 my-auto"
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
        >
          {/* Ambient Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[550px] h-[220px] sm:h-[280px] bg-gradient-to-r from-blue-400/20 via-indigo-400/15 to-orange-400/20 rounded-full blur-[80px] sm:blur-[110px] pointer-events-none" />

          {/* Mobile Prev / Next Chevrons */}
          {isMobile && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous Step"
                className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/90 border border-slate-200 shadow-md flex items-center justify-center text-slate-700 transition-opacity ${
                  activeIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-90 active:scale-95'
                }`}
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === steps.length - 1}
                aria-label="Next Step"
                className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/90 border border-slate-200 shadow-md flex items-center justify-center text-slate-700 transition-opacity ${
                  activeIndex === steps.length - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-90 active:scale-95'
                }`}
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </>
          )}

          {/* Cards Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {steps.map((step, index) => {
              const Icon = step.icon;

              if (isMobile) {
                // Mobile Math: Continuous Carousel Slider
                const continuousStep = Math.min(
                  steps.length - 1,
                  Math.max(0, scrollProgress * (steps.length - 1))
                );
                const stepOffset = index - continuousStep;
                const mobileCardWidth = Math.min(320, Math.max(270, windowWidth - 64));
                const mobileSpacing = mobileCardWidth + 16;
                const translateX = stepOffset * mobileSpacing;

                const absOffset = Math.abs(stepOffset);
                const scale = Math.max(0.88, 1 - absOffset * 0.12);
                const opacity = Math.max(0.2, 1 - absOffset * 0.75);
                const zIndex = 30 - Math.round(absOffset * 10);
                const isCurrentActive = index === activeIndex;

                return (
                  <div
                    key={step.step}
                    className="absolute [backface-visibility:hidden] transition-opacity duration-150"
                    style={{
                      width: `${mobileCardWidth}px`,
                      transform: `translate3d(${translateX}px, 0px, 0px) scale(${scale})`,
                      opacity,
                      zIndex,
                      willChange: 'transform, opacity',
                    }}
                  >
                    <div
                      className={`relative p-5 rounded-3xl transition-all duration-200 flex flex-col justify-between h-[280px] overflow-hidden bg-white ${
                        isCurrentActive
                          ? 'border-2 border-blue-500 shadow-[0_16px_36px_-8px_rgba(37,99,235,0.28)] ring-4 ring-blue-500/10'
                          : 'border border-slate-200 shadow-md'
                      }`}
                    >
                      {/* Top Header inside card */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-3xl font-black font-mono tracking-tighter text-blue-600">
                            {step.step}
                          </span>
                          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                            <Icon className="w-5 h-5 stroke-[2]" />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mb-2">
                          {step.title}
                        </h3>

                        {/* Details */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                          {step.details}
                        </p>
                      </div>

                      {/* Bottom Step Indicator inside card */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold font-mono">
                        <span className="text-blue-600 uppercase tracking-wider">Step {step.step} of 04</span>
                        <span>Stage {index + 1}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              // Desktop Math: 4 Cards Target Offsets when expanded
              const targetMultiplier = index - 1.5;
              const cardWidth = 270;
              const halfInchGap = 48;
              const baseSpacing = cardWidth + halfInchGap;
              const translateX = targetMultiplier * baseSpacing * scrollProgress;
              const initialScale = 1 - index * 0.03;
              const currentScale = initialScale + (1 - initialScale) * scrollProgress;
              const zIndex = 40 - index * 10;
              const rotateY = targetMultiplier * 3 * scrollProgress;
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
                    <div>
                      <div className="flex items-center justify-between mb-4 sm:mb-5">
                        <span className="text-3xl sm:text-4xl font-black font-mono tracking-tighter text-blue-600">
                          {step.step}
                        </span>

                        <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                          <Icon className="w-5 h-5 stroke-[2]" />
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mb-2.5">
                        {step.title}
                      </h3>

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
        <div className="z-20 flex flex-col items-center gap-1.5 w-full">
          {isMobile && (
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
              <span className="text-blue-600 font-mono font-bold">Step {steps[activeIndex].step}</span>
              <span className="text-slate-300">|</span>
              <span className="font-medium text-slate-700 truncate max-w-[220px]">
                {steps[activeIndex].title}
              </span>
            </div>
          )}

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
