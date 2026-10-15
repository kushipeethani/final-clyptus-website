import React, { useEffect, useRef, useState } from 'react';
import { Globe, TrendingUp, Cpu } from 'lucide-react';

// Dynamically import all partner logos from src/assets/logos/
const logoModules = import.meta.glob<{ default: string }>('../assets/logos/*.{jpeg,jpg,png,svg}', { eager: true });
const logoUrls = Object.values(logoModules).map((mod) => mod.default);

interface MetricItem {
  id: number;
  targetValue: number;
  suffix: string;
  icon: React.ElementType;
  lines: string[];
}

const metrics: MetricItem[] = [
  {
    id: 1,
    targetValue: 96,
    suffix: '%',
    icon: Globe,
    lines: ['Clyptus Clients', 'Experience Faster', 'System Performance'],
  },
  {
    id: 2,
    targetValue: 89,
    suffix: '%',
    icon: TrendingUp,
    lines: ['Clyptus Oracle', 'Optimizations Improve', 'Database Efficiency'],
  },
  {
    id: 3,
    targetValue: 92,
    suffix: '%',
    icon: Cpu,
    lines: ['Clyptus AI', 'Implementations', 'Accelerate Business', 'Processes'],
  },
];

export const MetricsCounterSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [autoTime, setAutoTime] = useState<number>(0);
  const [animProgress, setAnimProgress] = useState<number>(0);

  // RAF loop for subtle floating wave effect
  useEffect(() => {
    let animId: number;
    const updateAutoMove = () => {
      setAutoTime(performance.now() * 0.002);
      animId = requestAnimationFrame(updateAutoMove);
    };
    animId = requestAnimationFrame(updateAutoMove);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Intersection Observer to trigger count-up every time cards enter the viewport
  useEffect(() => {
    const target = cardsRef.current || containerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset when scrolling away so animation re-triggers every time user scrolls back
          setIsVisible(false);
          setAnimProgress(0);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  // Smooth count-up animation lerp (1.0s liquid ease-out curve) every time cards enter view
  useEffect(() => {
    if (isVisible) {
      setAnimProgress(0);
      let startTime: number | null = null;
      let frameId: number;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000;
        const duration = 1.0;
        const progress = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
        setAnimProgress(eased);

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        }
      };

      frameId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(frameId);
    } else {
      setAnimProgress(0);
    }
  }, [isVisible]);

  // Click handler to allow manual replay anytime
  const handleCardClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 20);
  };

  return (
    /* Clean, tight responsive section without fade-in/fade-out opacity hiding or large scroll gaps */
    <section id="metrics" ref={containerRef} className="w-full py-16 sm:py-24 bg-white select-none border-y border-slate-100 relative overflow-hidden">
      {/* Background Soft Ambient Glow Accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-50/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10 flex flex-col items-center">
        {/* Section Header (Always 100% visible - No fade-in/fade-out) */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 uppercase tracking-tight leading-tight">
            MEASURABLE <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">BUSINESS IMPACT.</span>
          </h2>
        </div>

          {/* 3 Metric Cards (Always 100% visible - No fade-in/fade-out) */}
          <div ref={cardsRef} className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {metrics.map((metric, idx) => {
              const IconComp = metric.icon;
              
              // Count up number calculated with fast cubic ease-out animation curve
              const currentCount = Math.round(animProgress * metric.targetValue);

              // Subtle 60 FPS organic sine wave float offset
              const autoFloatY = Math.sin(autoTime + idx * 1.5) * 6;

              // Reference gradient colors per card
              let numberGradientClass = 'from-sky-500 via-blue-600 to-indigo-600';
              let iconStyle = 'bg-sky-50 border-sky-200 text-sky-600 group-hover:bg-sky-600';
              
              if (idx === 1) {
                numberGradientClass = 'from-emerald-500 via-teal-600 to-sky-500';
                iconStyle = 'bg-emerald-50 border-emerald-200 text-emerald-600 group-hover:bg-emerald-600';
              } else if (idx === 2) {
                numberGradientClass = 'from-indigo-500 via-purple-600 to-sky-500';
                iconStyle = 'bg-indigo-50 border-indigo-200 text-indigo-600 group-hover:bg-indigo-600';
              }

              return (
                <div
                  key={metric.id}
                  onClick={handleCardClick}
                  title="Click to replay animation"
                  style={{
                    transform: `translate3d(0, ${autoFloatY}px, 0)`,
                    willChange: 'transform',
                  }}
                  className="flex flex-col items-center md:items-start text-center md:text-left p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(2,132,199,0.15)] hover:border-sky-400 transition-all duration-300 group hover:-translate-y-1 cursor-pointer"
                >
                  {/* Header Row: Icon + Animated Gradient Percentage */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs ${iconStyle}`}>
                      <IconComp className="w-7 h-7 stroke-[1.75]" />
                    </div>

                    <div className="flex items-baseline">
                      <span className={`text-5xl sm:text-6xl font-black tracking-tight font-mono bg-gradient-to-r ${numberGradientClass} bg-clip-text text-transparent drop-shadow-xs`}>
                        {currentCount}
                      </span>
                      <span className={`text-3xl sm:text-4xl font-black ml-0.5 bg-gradient-to-r ${numberGradientClass} bg-clip-text text-transparent`}>
                        {metric.suffix}
                      </span>
                    </div>
                  </div>

                  {/* Description Text */}
                  <div className="flex flex-col gap-1 text-slate-950 font-black text-sm sm:text-base leading-snug tracking-tight uppercase">
                    {metric.lines.map((line, lIdx) => (
                      <span key={lIdx}>{line}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Infinite Horizontal Logo Marquee (Right-to-Left, Half-Inch Gap, Transparent, No Borders) */}
          {logoUrls.length > 0 && (
            <div className="w-full mt-16 sm:mt-20 overflow-hidden select-none relative pt-4">
              {/* Header Label above Logo Scrolling */}
              <div className="text-center mb-8">
                <span className="text-xs font-mono font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 shadow-xs">
                  OUR TRUSTED PARTNERS
                </span>
              </div>

              {/* Soft Gradient Fade Out Edges */}
              <div className="absolute left-0 top-12 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-12 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

              <div className="flex items-center gap-12 sm:gap-16 animate-marquee whitespace-nowrap">
                {/* Primary set of logos (Original Full Colors, No Grayscale Filter) */}
                {logoUrls.map((url, i) => (
                  <div key={`primary-${i}`} className="shrink-0 flex items-center justify-center p-2">
                    <img
                      src={url}
                      alt={`Enterprise Client Partner ${i + 1}`}
                      className="h-12 sm:h-16 w-auto object-contain max-w-[170px] hover:scale-105 transition-transform duration-300 pointer-events-auto cursor-pointer"
                    />
                  </div>
                ))}

                {/* Duplicated set for seamless loop (Original Full Colors) */}
                {logoUrls.map((url, i) => (
                  <div key={`duplicate-${i}`} className="shrink-0 flex items-center justify-center p-2">
                    <img
                      src={url}
                      alt={`Enterprise Client Partner ${i + 1}`}
                      className="h-12 sm:h-16 w-auto object-contain max-w-[170px] hover:scale-105 transition-transform duration-300 pointer-events-auto cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
  );
};
