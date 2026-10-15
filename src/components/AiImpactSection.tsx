import React, { useEffect, useRef, useState } from 'react';
import { Database, Users, Cpu, ArrowUpRight } from 'lucide-react';

interface AiImpactSectionProps {
  onSelectService?: (serviceId: string) => void;
}

// Character component that renders individual letters with organic giggle / jiggle animation
const GiggleText: React.FC<{ text: string; baseDelay?: number; className?: string }> = ({
  text,
  baseDelay = 0,
  className = '',
}) => {
  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`}>
      {text.split('').map((char, idx) => {
        if (char === ' ') {
          return <span key={idx} className="w-[0.25em] inline-block">&nbsp;</span>;
        }
        // Staggered giggle animation delay per letter
        const delay = (baseDelay + idx * 0.18) % 4.2;
        return (
          <span
            key={idx}
            className="animate-giggle inline-block hover:scale-125 hover:text-sky-500 transition-transform cursor-pointer"
            style={{
              animationDelay: `${delay}s`,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

export const AiImpactSection: React.FC<AiImpactSectionProps> = ({ onSelectService }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  // RAF scroll progress sampling for zero lag
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const totalDist = rect.height - viewportHeight;

            if (totalDist > 0) {
              const scrolled = -rect.top;
              const p = Math.max(0, Math.min(1, scrolled / totalDist));
              setProgress(p);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Neural Constellation Network Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Node particle data (lighter count on mobile for smooth 60fps)
    const isMobile = window.innerWidth < 768;
    const numNodes = isMobile ? 22 : 50;
    const nodes = Array.from({ length: numNodes }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.4 : 0.7),
      vy: (Math.random() - 0.5) * (isMobile ? 0.4 : 0.7),
      radius: Math.random() * 2.5 + 1.5,
      isBlue: Math.random() > 0.6,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw constellation connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Update node position
        n1.x += n1.vx;
        n1.y += n1.vy;

        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        // Mouse attraction physics
        const dxMouse = mouseRef.current.x - n1.x;
        const dyMouse = mouseRef.current.y - n1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 200) {
          n1.x += (dxMouse / distMouse) * 0.8;
          n1.y += (dyMouse / distMouse) * 0.8;
        }

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.28;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = n1.isBlue || n2.isBlue 
              ? `rgba(37, 99, 235, ${alpha * 1.6})` 
              : `rgba(71, 85, 105, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw node points
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fillStyle = n1.isBlue ? 'rgba(37, 99, 235, 0.9)' : 'rgba(51, 65, 85, 0.75)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const isMobileScreen = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  // Stage 1: "SMART IT SERVICES TO ELEVATE YOUR BUSINESS SUCCESS." (progress 0.0 -> 0.42)
  const stage1Scale = isMobileScreen 
    ? 1.0 + Math.pow(Math.min(1, progress / 0.40), 1.2) * 0.08 
    : 1.0 + Math.pow(Math.min(1, progress / 0.40), 1.2) * 0.25;
  const stage1Opacity = progress < 0.28 
    ? 1.0 
    : progress < 0.42 
      ? Math.max(0, 1.0 - (progress - 0.28) / 0.14) 
      : 0.0;
  const stage1Blur = progress > 0.28 ? (progress - 0.28) * 8 : 0;

  // Stage 2: 3 Cards (progress 0.42 -> 1.0)
  const stage2Opacity = progress < 0.40 
    ? 0.0 
    : progress < 0.52 
      ? (progress - 0.40) / 0.12 
      : progress < 0.90 
        ? 1.0 
        : Math.max(0, 1.0 - (progress - 0.90) / 0.10);
  
  const stage2Scale = 0.98 + (Math.max(0, progress - 0.42) / 0.58) * 0.08;

  return (
    <div ref={containerRef} className="relative w-full h-[280vh] bg-slate-50">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden select-none">
        
        {/* Interactive Neural Canvas Network Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-0"
        />

        {/* STAGE 1: Scroll-Driven Zooming Typography with Giggle/Jiggle Effect ("SMART IT SERVICES TO ELEVATE YOUR BUSINESS SUCCESS.") */}
        {stage1Opacity > 0 && (
          <div
            className="absolute z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl transition-transform duration-75 ease-out"
            style={{
              transform: `scale3d(${stage1Scale}, ${stage1Scale}, 1)`,
              opacity: stage1Opacity,
              filter: stage1Blur > 0 ? `blur(${stage1Blur}px)` : 'none',
              willChange: 'transform, opacity, filter',
            }}
          >
            <div className="flex flex-col items-center justify-center leading-[1.05] sm:leading-[0.95] tracking-tight uppercase font-black text-slate-950 text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] max-w-xs sm:max-w-none">
              {/* Line 1: SMART IT */}
              <div className="text-slate-950 font-black">
                <GiggleText text="SMART IT" baseDelay={0} />
              </div>

              {/* Line 2: SERVICES (Electric Royal Blue with Giggle Effect) */}
              <div className="font-black text-[#2563eb] my-1">
                <GiggleText text="SERVICES" baseDelay={0.3} />
              </div>

              {/* Line 3: TO ELEVATE YOUR */}
              <div className="text-slate-950 font-black">
                <GiggleText text="TO ELEVATE YOUR" baseDelay={0.6} />
              </div>

              {/* Line 4: BUSINESS SUCCESS. */}
              <div className="text-slate-950 font-black">
                <GiggleText text="BUSINESS SUCCESS." baseDelay={0.9} />
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: 3 Core Service Cards (SAP, IT Recruiting, AI) */}
        {stage2Opacity > 0 && (() => {
          // Staggered scroll-in progress for cards 1, 2, 3
          const card1In = Math.max(0, Math.min(1, (progress - 0.40) / 0.12));
          const card2In = Math.max(0, Math.min(1, (progress - 0.43) / 0.12));
          const card3In = Math.max(0, Math.min(1, (progress - 0.46) / 0.12));

          // Staggered scroll-out progress for cards 1, 2, 3
          const card1Out = Math.max(0, Math.min(1, (0.98 - progress) / 0.12));
          const card2Out = Math.max(0, Math.min(1, (0.96 - progress) / 0.12));
          const card3Out = Math.max(0, Math.min(1, (0.94 - progress) / 0.12));

          const rawP1 = Math.min(card1In, card1Out);
          const rawP2 = Math.min(card2In, card2Out);
          const rawP3 = Math.min(card3In, card3Out);

          // On mobile screens, maintain high contrast and solid card opacity
          const p1 = isMobileScreen ? (progress > 0.42 && progress < 0.94 ? 1 : rawP1) : rawP1;
          const p2 = isMobileScreen ? (progress > 0.44 && progress < 0.94 ? 1 : rawP2) : rawP2;
          const p3 = isMobileScreen ? (progress > 0.46 && progress < 0.94 ? 1 : rawP3) : rawP3;

          return (
            <div
              className="absolute z-20 flex flex-col items-center justify-center text-center px-3 sm:px-6 w-full max-w-6xl max-h-[92vh] overflow-y-auto md:overflow-visible py-2 transition-all duration-75 ease-out pointer-events-auto"
              style={{
                transform: `scale3d(${stage2Scale}, ${stage2Scale}, 1)`,
                opacity: stage2Opacity,
                willChange: 'transform, opacity',
              }}
            >
              {/* 3 Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-6 w-full text-left">
                {/* Card 1: SAP */}
                <div 
                  onClick={() => onSelectService?.('sap')}
                  style={{
                    opacity: p1,
                    transform: `translate3d(0, ${(1 - p1) * (isMobileScreen ? 20 : 45)}px, 0) scale(${0.96 + p1 * 0.04})`,
                    transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
                  }}
                  className="group relative p-3.5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-3 sm:mb-6 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <Database className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono font-extrabold text-blue-600 uppercase tracking-wider block mb-1.5 sm:mb-2">
                      ENTERPRISE ERP
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black text-slate-900 mb-1.5 sm:mb-3 group-hover:text-blue-600 transition-colors">
                      SAP Solutions
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                      S/4HANA migration, custom ABAP & Fiori engineering, and full-spectrum SAP ecosystem transformation.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors pt-2.5 sm:pt-4 border-t border-slate-100">
                    <span>EXPLORE SAP SERVICES</span>
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Card 2: IT Recruiting */}
                <div 
                  onClick={() => onSelectService?.('recruiting')}
                  style={{
                    opacity: p2,
                    transform: `translate3d(0, ${(1 - p2) * 45}px, 0) scale(${0.95 + p2 * 0.05})`,
                    transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
                  }}
                  className="group relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-3 sm:mb-6 shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono font-extrabold text-indigo-600 uppercase tracking-wider block mb-1.5 sm:mb-2">
                      TALENT & STAFFING
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black text-slate-900 mb-1.5 sm:mb-3 group-hover:text-indigo-600 transition-colors">
                      IT Recruiting
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                      Specialized tech recruitment, dedicated engineering pods, and executive technical leadership placement.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors pt-2.5 sm:pt-4 border-t border-slate-100">
                    <span>EXPLORE IT RECRUITING</span>
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Card 3: AI */}
                <div 
                  onClick={() => onSelectService?.('ai')}
                  style={{
                    opacity: p3,
                    transform: `translate3d(0, ${(1 - p3) * 45}px, 0) scale(${0.95 + p3 * 0.05})`,
                    transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
                  }}
                  className="group relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-sky-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-sky-500 text-white flex items-center justify-center mb-3 sm:mb-6 shadow-md shadow-sky-500/20 group-hover:scale-110 transition-transform">
                      <Cpu className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono font-extrabold text-sky-600 uppercase tracking-wider block mb-1.5 sm:mb-2">
                      INTELLIGENT SYSTEMS
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black text-slate-900 mb-1.5 sm:mb-3 group-hover:text-sky-600 transition-colors">
                      AI Solutions
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                      Autonomous AI agents, enterprise GenAI architectures, machine learning models & predictive analytics.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors pt-2.5 sm:pt-4 border-t border-slate-100">
                    <span>EXPLORE AI SOLUTIONS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
};
