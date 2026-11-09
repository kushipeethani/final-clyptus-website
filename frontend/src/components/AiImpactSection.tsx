import React, { useEffect, useRef, useState } from 'react';

interface AiImpactSectionProps {
  onSelectService?: (serviceId: string) => void;
}

export const AiImpactSection: React.FC<AiImpactSectionProps> = ({ onSelectService }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  // Helper to split and render headings with Clyptus brand styling (Black + Blue-Indigo-Orange gradient)
  const renderStyledHeading = (text: string) => {
    const words = text.split(' ');
    if (words.length <= 1) {
      return (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
          {text}
        </span>
      );
    }
    const splitIndex = Math.ceil(words.length / 2);
    const firstPart = words.slice(0, splitIndex).join(' ');
    const secondPart = words.slice(splitIndex).join(' ');
    return (
      <>
        <span className="text-slate-950">{firstPart} </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">
          {secondPart}
        </span>
      </>
    );
  };

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

  // Stage 1: "INTELLIGENT TECHNOLOGY. GLOBAL DELIVERY. MEASURABLE OUTCOMES." (progress 0.0 -> 0.42)
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

        {/* STAGE 1: Scroll-Driven Zooming Typography with Giggle/Jiggle Effect ("INTELLIGENT TECHNOLOGY. GLOBAL DELIVERY. MEASURABLE OUTCOMES.") */}
        {stage1Opacity > 0 && (
          <div
            className="absolute z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full max-w-6xl transition-transform duration-75 ease-out"
            style={{
              transform: `scale3d(${stage1Scale}, ${stage1Scale}, 1)`,
              opacity: stage1Opacity,
              filter: stage1Blur > 0 ? `blur(${stage1Blur}px)` : 'none',
              willChange: 'transform, opacity, filter',
            }}
          >
            {/* Ambient Radial Colored Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[300px] bg-gradient-to-r from-blue-400/20 via-indigo-400/15 to-orange-400/20 rounded-full blur-[110px] pointer-events-none" />

            {/* Main Headline: 'Intelligence Meets Innovation' */}
            <h2 className="relative font-black tracking-tight leading-[1.04] sm:leading-[0.98] text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[6.4rem]">
              <span className="text-slate-950 block">Intelligence</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 block mt-1 sm:mt-2">
                Meets Innovation.
              </span>
            </h2>

            {/* Sub-Headline */}
            <p className="relative mt-5 sm:mt-7 text-sm sm:text-lg md:text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
              Unifying enterprise architecture, autonomous AI agents, and resilient cloud systems into one cohesive growth engine.
            </p>

            {/* Enterprise Highlights Strip */}
            <div className="relative flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-6 sm:mt-8 pt-6 border-t border-slate-200/80">
              <span className="px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs">
                Autonomous AI Systems
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs">
                Clean-Core Architecture
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs">
                Global 24/7 Delivery
              </span>
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
              {/* 3 Cards Grid: Our Vision, Our Mission, Life at Clyptus */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-6 w-full text-left">
                {/* Card 1: Our Vision */}
                <div 
                  onClick={() => onSelectService?.('about')}
                  style={{
                    opacity: p1,
                    transform: `translate3d(0, ${(1 - p1) * (isMobileScreen ? 20 : 45)}px, 0) scale(${0.96 + p1 * 0.04})`,
                    transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
                  }}
                  className="group relative p-5 sm:p-7 lg:p-9 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-start"
                >
                  <span className="text-[10px] sm:text-[11px] font-mono font-extrabold text-blue-600 uppercase tracking-wider block mb-2 sm:mb-2.5">
                    OUR VISION
                  </span>
                  <h3 className="text-lg sm:text-2xl font-black mb-2 sm:mb-3 leading-tight">
                    {renderStyledHeading("Shaping Tomorrow Through Innovation.")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    To become a trusted global technology partner, empowering businesses through innovation, intelligent solutions, and digital transformation. We envision a future where technology creates limitless opportunities, drives sustainable growth, and connects businesses with possibilities.
                  </p>
                </div>

                {/* Card 2: Our Mission */}
                <div 
                  onClick={() => onSelectService?.('about')}
                  style={{
                    opacity: p2,
                    transform: `translate3d(0, ${(1 - p2) * 45}px, 0) scale(${0.95 + p2 * 0.05})`,
                    transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
                  }}
                  className="group relative p-5 sm:p-7 lg:p-9 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-start"
                >
                  <span className="text-[10px] sm:text-[11px] font-mono font-extrabold text-indigo-600 uppercase tracking-wider block mb-2 sm:mb-2.5">
                    OUR MISSION
                  </span>
                  <h3 className="text-lg sm:text-2xl font-black mb-2 sm:mb-3 leading-tight">
                    {renderStyledHeading("Turning Ideas Into Impact.")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Our mission is to deliver innovative, reliable, and scalable technology solutions that help businesses overcome challenges and achieve their goals. Through technical excellence, collaboration, and continuous innovation, we strive to create meaningful value for every client and partner.
                  </p>
                </div>

                {/* Card 3: Life at Clyptus */}
                <div 
                  onClick={() => onSelectService?.('careers')}
                  style={{
                    opacity: p3,
                    transform: `translate3d(0, ${(1 - p3) * 45}px, 0) scale(${0.95 + p3 * 0.05})`,
                    transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
                  }}
                  className="group relative p-5 sm:p-7 lg:p-9 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-start"
                >
                  <span className="text-[10px] sm:text-[11px] font-mono font-extrabold text-orange-600 uppercase tracking-wider block mb-2 sm:mb-2.5">
                    LIFE AT CLYPTUS
                  </span>
                  <h3 className="text-lg sm:text-2xl font-black mb-2 sm:mb-3 leading-tight">
                    {renderStyledHeading("Where People Create Possibilities.")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    At Clyptus, we believe great ideas begin with great people. We foster a collaborative and inclusive workplace where creativity, continuous learning, innovation, and teamwork come together. We encourage individuals to explore their potential, share ideas, embrace challenges, and grow together while building meaningful technology solutions.
                  </p>
                </div>
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
};
