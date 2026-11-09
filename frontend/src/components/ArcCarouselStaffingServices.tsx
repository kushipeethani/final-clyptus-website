import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Award, 
  Cpu, 
  Briefcase, 
  Layers, 
  Globe, 
  TrendingUp, 
  FileCheck
} from 'lucide-react';

export interface ServiceItem {
  id: number;
  title: string;
  desc: string;
  icon: React.ElementType;
  badge: string;
  tagline: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    title: 'Strategic Talent Acquisition',
    desc: 'Proactive workforce sourcing mapped directly to enterprise digital transformation goals.',
    icon: Search,
    badge: 'STRATEGY',
    tagline: 'Enterprise Transformation Alignment',
  },
  {
    id: 2,
    title: 'Executive Search & Leadership Advisory',
    desc: 'Executive search for CXOs, VP Engineering, Enterprise Architects & SAP Program Directors.',
    icon: Award,
    badge: 'EXECUTIVE',
    tagline: 'C-Suite & Executive Advisory',
  },
  {
    id: 3,
    title: 'Specialist Talent Deployment',
    desc: 'Specialist technology deployment covering full-stack, cloud engineers & enterprise practitioners.',
    icon: Cpu,
    badge: 'TECHNICAL',
    tagline: 'Enterprise Engineering Pods',
  },
  {
    id: 4,
    title: 'Flexible & Permanent Talent Acquisition',
    desc: 'Flexible talent agreements tailored for agile project demands or permanent team expansion.',
    icon: Briefcase,
    badge: 'FLEXIBLE',
    tagline: 'Flexible & Direct Deployments',
  },
  {
    id: 5,
    title: 'Recruitment Process Outsourcing (RPO)',
    desc: 'Complete or hybrid talent acquisition management operating as an extension of your HR.',
    icon: Layers,
    badge: 'FULL-SCALE',
    tagline: 'End-to-End Managed Recruiting',
  },
  {
    id: 6,
    title: 'Global Talent Acquisition',
    desc: 'Global talent sourcing from India delivery hubs with regional offices in UAE and USA.',
    icon: Globe,
    badge: 'GLOBAL',
    tagline: 'India Hubs, UAE & US Presence',
  },
  {
    id: 7,
    title: 'Workforce Planning',
    desc: 'Capacity forecasting, skill matrix gap analysis, and ramp-up timeline structuring.',
    icon: TrendingUp,
    badge: 'ANALYTICS',
    tagline: 'Predictive Skill Capacity Matrix',
  },
  {
    id: 8,
    title: 'Talent Intelligence & Analytics',
    desc: 'Real-time compensation benchmarks, talent availability indexes, and skill metrics.',
    icon: FileCheck,
    badge: 'INSIGHTS',
    tagline: 'Real-time Compensation & Skill Data',
  },
];

interface ArcCarouselProps {
  onNavigateContact?: () => void;
}

export const ArcCarouselStaffingServices: React.FC<ArcCarouselProps> = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndexFloat, setActiveIndexFloat] = useState<number>(0);

  const total = SERVICES_DATA.length;

  // Scroll listener with rAF batching for 60fps butter-smooth performance
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
      
      const targetIndexFloat = progress * (total - 1);
      setActiveIndexFloat(targetIndexFloat);
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
  }, [total]);

  const activeIntIndex = Math.round(activeIndexFloat);

  return (
    <div ref={sectionRef} className="relative w-full h-[260vh] bg-gradient-to-b from-slate-50 via-white to-slate-50 select-none">
      
      {/* Sticky Viewport Container */}
      <div className="sticky top-12 h-[88vh] w-full flex flex-col items-center justify-between py-8 px-4 sm:px-6 lg:px-10 overflow-hidden">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto z-20">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-2">
            Talent Acquisition &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
              Workforce Solutions
            </span>
          </h2>
          <p className="text-xs sm:text-base text-slate-600 font-medium">
            Scroll down or up to automatically rotate through our enterprise talent capabilities.
          </p>
        </div>

        {/* 3D Arc Viewport */}
        <div className="relative w-full max-w-7xl h-[380px] sm:h-[440px] flex items-center justify-center perspective-[1200px] z-10 my-auto">

          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] bg-gradient-to-r from-blue-400/15 via-indigo-400/15 to-orange-400/15 rounded-full blur-[140px] pointer-events-none" />

          {/* Arc Stage Outer Ring Guide */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] h-[300px] rounded-[50%] border border-blue-200/40 pointer-events-none opacity-40" />

          {/* Render 8 3D Arc Cards */}
          <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
            {SERVICES_DATA.map((srv, index) => {
              // Calculate continuous float offset from scroll position
              const offset = index - activeIndexFloat;

              const isClosestCenter = index === activeIntIndex;

              // 3D Arc Transformation Math
              const spacing = 270; 
              const translateX = offset * spacing;
              
              // Depth Z curve (center card forward, wings curve backward into depth)
              const translateZ = -Math.abs(offset) * 115;
              
              // Arc Drop along Y axis (slight downward curve at wings)
              const translateY = Math.pow(Math.abs(offset), 1.35) * 14;
              
              // Y-Rotation angle to turn cards inward toward center like an arc ring
              const rotateY = offset * -15;

              // Scale and opacity tapering
              const scale = Math.max(0.7, 1 - Math.abs(offset) * 0.12);
              const opacity = Math.max(0, 1 - Math.abs(offset) * 0.28);
              const zIndex = Math.round(100 - Math.abs(offset) * 10);

              const IconComp = srv.icon;

              return (
                <div
                  key={srv.id}
                  className="absolute w-[290px] sm:w-[340px] [backface-visibility:hidden]"
                  style={{
                    transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    pointerEvents: Math.abs(offset) > 2.5 ? 'none' : 'auto',
                    willChange: 'transform, opacity',
                  }}
                >
                  <div
                    className={`group relative p-7 sm:p-8 rounded-3xl transition-all duration-200 flex flex-col justify-between h-[340px] sm:h-[370px] overflow-hidden ${
                      isClosestCenter
                        ? 'bg-white border-2 border-blue-500/80 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.3)] ring-4 ring-blue-500/10'
                        : 'bg-white/95 border border-slate-200/90 shadow-md'
                    }`}
                  >
                    {/* Top Header */}
                    <div>
                      <div className="mb-5">
                        <div
                          className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isClosestCenter
                              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 text-white shadow-md'
                              : 'bg-blue-50 border border-blue-100 text-blue-600'
                          }`}
                        >
                          <IconComp className="w-6 h-6 stroke-[2]" />
                        </div>
                      </div>

                      {/* Tagline */}
                      <span className="text-[11px] font-mono font-extrabold text-blue-600 uppercase tracking-widest block mb-1.5">
                        {srv.tagline}
                      </span>

                      {/* Service Title */}
                      <h3
                        className={`text-xl sm:text-2xl font-black tracking-tight mb-2.5 transition-colors ${
                          isClosestCenter ? 'text-slate-900' : 'text-slate-800'
                        }`}
                      >
                        {srv.title}
                      </h3>

                      {/* Service Description */}
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        {srv.desc}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Progress Indicator Bar (Dots only) */}
        <div className="z-20 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            {SERVICES_DATA.map((_, idx) => (
              <div
                key={idx}
                className={`transition-all duration-300 rounded-full ${
                  activeIntIndex === idx
                    ? 'w-7 h-2.5 bg-blue-600 shadow-xs'
                    : 'w-2.5 h-2.5 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ArcCarouselStaffingServices;
