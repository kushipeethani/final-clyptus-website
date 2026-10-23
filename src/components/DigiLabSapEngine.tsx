import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Compass,
  Layers,
  RefreshCw,
  Code,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DigiLabSapEngineProps {
  onContactClick: () => void;
}

export const DigiLabSapEngine: React.FC<DigiLabSapEngineProps> = ({ onContactClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const [scrollStage, setScrollStage] = useState<number>(1); // 1: Ambient Hero, 2: Bezier Streams, 3: Telemetry Radar
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Refs to prevent canvas loop re-initialization during scroll
  const scrollProgressRef = useRef<number>(0);
  const scrollStageRef = useRef<number>(1);

  // 5 SAP Phases with deliverable metrics
  const phases = [
    {
      id: 1,
      num: '01',
      title: 'ERP Strategy',
      metric: 'ERP Transformation Roadmap',
      color: '#EA580C',
      icon: Compass,
      desc: 'Current landscape assessment, business case definition & sequence planning.',
    },
    {
      id: 2,
      num: '02',
      title: 'ERP Migration',
      metric: 'SAP ECC to S/4HANA Migration',
      color: '#2563EB',
      icon: RefreshCw,
      desc: 'Brownfield conversion, custom-code remediation & data cleansing.',
    },
    {
      id: 3,
      num: '03',
      title: 'ERP Implementation',
      metric: 'Core Finance & Supply Chain',
      color: '#0284C7',
      icon: Layers,
      desc: 'Greenfield S/4HANA deployment across enterprise core processes.',
    },
    {
      id: 4,
      num: '04',
      title: 'ERP Development',
      metric: 'ABAP & SAP Fiori Development',
      color: '#8B5CF6',
      icon: Code,
      desc: 'Custom SAP extensions, Fiori UX apps and analytics integrations.',
    },
    {
      id: 5,
      num: '05',
      title: 'ERP Support',
      metric: 'Application Management Services (AMS)',
      color: '#10B981',
      icon: ShieldCheck,
      desc: 'Post go-live application management, enhancements & release updates.',
    },
  ];

  // Mobile check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // HTML5 Canvas Engine (Persistent Smooth Loop)
  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stage 1 Particles (60 particles) - Constant Ultra-Slow Velocity
    const particleCount = 60;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
      radius: Math.random() * 2.2 + 1.2,
      alpha: Math.random() * 0.4 + 0.2,
      color: ['#2563EB', '#EA580C', '#94A3B8'][Math.floor(Math.random() * 3)],
    }));

    // Cinematic Bubble Burst Particles (40 floating orbs for Hub Detonation)
    const burstColors = ['#EA580C', '#2563EB', '#0284C7', '#7C3AED', '#10B981'];
    const burstParticleCount = 42;
    const burstParticles = Array.from({ length: burstParticleCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      maxDist: Math.random() * 260 + 120, // 120px to 380px radiation distance
      radius: Math.random() * 16 + 6,     // 6px to 22px bubble size
      baseAlpha: Math.random() * 0.25 + 0.7, // 0.7 to 0.95 initial opacity
      color: burstColors[Math.floor(Math.random() * burstColors.length)],
      speedFactor: Math.random() * 0.4 + 0.8,
    }));

    // Mouse drift
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let radarRotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const stage = scrollStageRef.current;
      const prog = scrollProgressRef.current; // 0 to 1

      // ---------------- STAGE 1: AMBIENT HERO CANVAS ----------------
      if (stage === 1) {
        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Gentle mouse fluid ripple
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            p.x += (dx / dist) * force * 0.2;
            p.y += (dy / dist) * force * 0.2;
          }

          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          // Connect nearby particles
          for (let j = i + 1; j < particleCount; j++) {
            const p2 = particles[j];
            const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
            if (d < 90) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = '#2563EB';
              ctx.globalAlpha = (1 - d / 90) * 0.12;
              ctx.stroke();
            }
          }
        }
      }

      // ---------------- STAGE 2 & BURST TRANSITION ----------------
      if (stage === 2 || (prog >= 0.35 && prog <= 0.52)) {
        const stage2Prog = Math.min(1, Math.max(0, prog / 0.4)); // 0 to 1 within stage 2
        const targetX = width * 0.5;
        const targetY = height * 0.52; // Central circle position

        const streamConfigs = [
          { startX: width * 0.1, color: '#EA580C', ctrlX: width * 0.2 },
          { startX: width * 0.3, color: '#2563EB', ctrlX: width * 0.35 },
          { startX: width * 0.5, color: '#0284C7', ctrlX: width * 0.5 },
          { startX: width * 0.7, color: '#8B5CF6', ctrlX: width * 0.65 },
          { startX: width * 0.9, color: '#10B981', ctrlX: width * 0.8 },
        ];

        // Draw Bezier streams only if before burst disappearance
        if (prog < 0.45) {
          streamConfigs.forEach((stream) => {
            ctx.beginPath();
            ctx.moveTo(stream.startX, 0);

            // Cubic Bezier curve down to central target circle
            const endY = height * 0.05 + (targetY - height * 0.05) * stage2Prog;
            const currentX = stream.startX + (targetX - stream.startX) * stage2Prog;

            ctx.bezierCurveTo(
              stream.ctrlX,
              height * 0.25 * stage2Prog,
              targetX,
              height * 0.38 * stage2Prog,
              currentX,
              endY
            );

            ctx.strokeStyle = stream.color;
            ctx.lineWidth = 3;
            ctx.globalAlpha = Math.max(0, 0.85 * (1 - (prog - 0.38) * 8));
            ctx.stroke();

            // Smooth slow pulse dot along stream
            const pulseT = (Date.now() % 5000) / 5000;
            const pulseX = stream.startX + (targetX - stream.startX) * pulseT * stage2Prog;
            const pulseY = endY * pulseT;

            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = stream.color;
            ctx.globalAlpha = Math.max(0, 0.95 * (1 - (prog - 0.38) * 8));
            ctx.fill();
          });
        }
      }

      // ---------------- CINEMATIC BUBBLE BURST EXPLOSION (Threshold 0.36 to 0.52) ----------------
      if (prog >= 0.36 && prog <= 0.54) {
        const cx = width * 0.5;
        const cy = height * 0.52;

        const burstProg = Math.min(1, Math.max(0, (prog - 0.36) / 0.16));

        // 1. Impact Flash & Charge-up Radial Glow (burstProg 0 to 0.35)
        if (burstProg < 0.4) {
          const chargeRatio = burstProg / 0.4;
          const flashRadius = 55 + Math.sin(chargeRatio * Math.PI) * 45;

          const radialGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, flashRadius);
          radialGlow.addColorStop(0, 'rgba(234, 88, 12, 0.85)');
          radialGlow.addColorStop(0.4, 'rgba(37, 99, 235, 0.6)');
          radialGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
          ctx.arc(cx, cy, flashRadius, 0, Math.PI * 2);
          ctx.fillStyle = radialGlow;
          ctx.globalAlpha = Math.sin(chargeRatio * Math.PI);
          ctx.fill();
        }

        // 2. 42 Floating Bubble Orbs Exploding Outward in 360 Degrees (burstProg 0.20 to 1.0)
        if (burstProg >= 0.18) {
          const orbProg = (burstProg - 0.18) / 0.82; // 0 to 1

          burstParticles.forEach((p) => {
            const currentDist = p.maxDist * Math.pow(orbProg, 0.65) * p.speedFactor;
            const px = cx + Math.cos(p.angle) * currentDist;
            const py = cy + Math.sin(p.angle) * currentDist;

            const currentAlpha = Math.max(0, (1 - orbProg) * p.baseAlpha);
            const currentRadius = Math.max(0, p.radius * (1 - orbProg * 0.5));

            if (currentAlpha > 0 && currentRadius > 0) {
              // Bubble Core
              ctx.beginPath();
              ctx.arc(px, py, currentRadius, 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.globalAlpha = currentAlpha;
              ctx.fill();

              // Soft Glow Ring
              ctx.beginPath();
              ctx.arc(px, py, currentRadius * 1.3, 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.globalAlpha = currentAlpha * 0.3;
              ctx.fill();
            }
          });
        }
      }

      // ---------------- STAGE 3: ROTATING CIRCULAR TELEMETRY / RADAR DIAL ----------------
      if (stage === 3) {
        const centerX = width * 0.5;
        const centerY = height * 0.52;
        radarRotation += 0.005;

        // Concentric Orbital Rings
        const ringRadii = [90, 160, 240, 310];
        ringRadii.forEach((r, idx) => {
          ctx.beginPath();
          ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
          ctx.strokeStyle = idx % 2 === 0 ? '#2563EB' : '#EA580C';
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = 0.22;
          ctx.setLineDash([6, 10]);
          ctx.stroke();
          ctx.setLineDash([]);
        });

        // 5 Connecting Lines from Center Hub to the 5 Orbiting Cards
        for (let idx = 0; idx < 5; idx++) {
          const angle = (idx / 5) * Math.PI * 2 - Math.PI / 2;
          const innerR = 70;
          const outerR = 295;

          const x1 = centerX + Math.cos(angle) * innerR;
          const y1 = centerY + Math.sin(angle) * innerR;
          const x2 = centerX + Math.cos(angle) * outerR;
          const y2 = centerY + Math.sin(angle) * outerR;

          // Draw Connecting Line
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = idx % 2 === 0 ? '#0284C7' : '#EA580C';
          ctx.lineWidth = 1.8;
          ctx.globalAlpha = 0.45;
          ctx.setLineDash([4, 6]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Traveling Data Light Pulse along Line (Slow Gentle Pace)
          const pulseT = ((Date.now() + idx * 500) % 4500) / 4500;
          const px = x1 + (x2 - x1) * pulseT;
          const py = y1 + (y2 - y1) * pulseT;

          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = idx % 2 === 0 ? '#0284C7' : '#EA580C';
          ctx.globalAlpha = 0.9;
          ctx.fill();
        }

        // Outer Rotating Radar Dots & Tick Marks
        const tickCount = 28;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(radarRotation);
        for (let k = 0; k < tickCount; k++) {
          const angle = (k / tickCount) * Math.PI * 2;
          const tx1 = Math.cos(angle) * 265;
          const ty1 = Math.sin(angle) * 265;
          const tx2 = Math.cos(angle) * 275;
          const ty2 = Math.sin(angle) * 275;

          ctx.beginPath();
          ctx.moveTo(tx1, ty1);
          ctx.lineTo(tx2, ty2);
          ctx.strokeStyle = k % 4 === 0 ? '#EA580C' : '#0284C7';
          ctx.globalAlpha = 0.4;
          ctx.stroke();
        }
        ctx.restore();

        // Frequency Soundwave Bars inside Ring
        const waveCount = 18;
        const waveWidth = 4;
        const startX = centerX - (waveCount * waveWidth * 1.5) / 2;
        for (let w = 0; w < waveCount; w++) {
          const barHeight = Math.sin(Date.now() * 0.005 + w * 0.4) * 18 + 22;
          const bx = startX + w * waveWidth * 1.5;
          const by = centerY + 45 - barHeight / 2;

          ctx.fillStyle = '#0284C7';
          ctx.globalAlpha = 0.65;
          ctx.fillRect(bx, by, waveWidth, barHeight);
        }
      }

      ctx.globalAlpha = 1;
      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, [isMobile]);

  // GSAP ScrollTrigger Pinned Timeline Setup
  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2000',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress; // 0 to 1
          scrollProgressRef.current = p;

          let newStage = 1;
          if (p < 0.2) {
            newStage = 1;
          } else if (p >= 0.2 && p < 0.45) {
            newStage = 2;
          } else {
            newStage = 3;
            const phaseIndex = Math.min(4, Math.floor(((p - 0.45) / 0.55) * 5));
            setActivePhaseIndex((prev) => (prev !== phaseIndex ? phaseIndex : prev));
          }

          if (scrollStageRef.current !== newStage) {
            scrollStageRef.current = newStage;
            setScrollStage(newStage);
          }

          // Throttle progress state updates to 0.01 increments to keep main thread smooth at 60fps
          const roundedProgress = Math.round(p * 100) / 100;
          setScrollProgress((prev) => (Math.abs(prev - roundedProgress) >= 0.01 ? roundedProgress : prev));
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div className="w-full bg-slate-50 text-slate-900 select-none">
      {/* ================= 3-STAGE PINNED DIGILAB SCROLLYTELLING CONTAINER ================= */}
      {!isMobile ? (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-slate-50">
          {/* Background Stage Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none bg-transparent"
          />

          {/* STAGE 1: HERO OVERLAY CONTENT */}
          <div
            ref={heroRef}
            className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 max-w-4xl mx-auto pt-28 pb-16 transition-all duration-700 pointer-events-auto ${
              scrollStage === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            {/* Hero Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-4">
              Enterprise ERP Solutions &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-sky-600 to-indigo-600">
                Services
              </span>
            </h1>

            {/* Exact Hero Paragraph */}
            <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed max-w-2xl mb-8">
              Architecting resilient, future-ready enterprise systems. We deliver end-to-end SAP S/4HANA migrations, custom BTP innovations, and full-lifecycle ERP support for global enterprises.
            </p>

            {/* Exact CTA Button */}
            <button
              onClick={onContactClick}
              className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 via-sky-600 to-indigo-600 text-white font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all"
            >
              <span>Talk to Our ERP Team</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* STAGE 2: BEZIER STREAM LABEL OVERLAY & CENTRAL COMBINING CIRCLE */}
          <div
            className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none transition-all duration-300 ${
              scrollProgress >= 0.20 && scrollProgress < 0.45 ? 'opacity-100' : 'opacity-0 scale-90'
            }`}
          >
            {/* Target Combining Central Circle for the 5 Lines (With Pulse Charge-Up & Burst Disappearance) */}
            <div
              style={{
                transform: `translate(-50%, -50%) scale(${
                  scrollProgress >= 0.36 && scrollProgress < 0.40
                    ? 0.85
                    : scrollProgress >= 0.40 && scrollProgress < 0.44
                    ? 1.25
                    : 1.0
                })`,
                opacity: scrollProgress >= 0.43 ? Math.max(0, 1 - (scrollProgress - 0.43) * 20) : 1,
              }}
              className="absolute top-[52%] left-1/2 w-28 h-28 rounded-full bg-white border-2 border-sky-500 shadow-[0_0_30px_rgba(234,88,12,0.4)] flex flex-col items-center justify-center text-center p-2 transition-transform duration-200"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping mb-1" />
              <span className="text-[10px] font-mono font-black text-slate-900 leading-tight">
                SAP S/4HANA
              </span>
              <span className="text-[9px] font-mono font-bold text-sky-600 uppercase tracking-widest mt-0.5">
                HUB
              </span>
            </div>

            <span className="absolute bottom-16 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 text-slate-900 font-mono text-xs font-bold uppercase tracking-widest shadow-md backdrop-blur-md">
              CONVERGING ERP DATA STREAMS
            </span>
          </div>

          {/* STAGE 3: TELEMETRY RADAR DIAL OVERLAY (SMOOTH REVEAL AFTER BUBBLE BURST) */}
          <div
            style={{
              opacity: scrollProgress >= 0.45 ? Math.min(1, (scrollProgress - 0.45) / 0.08) : 0,
              transform: `scale(${scrollProgress >= 0.45 ? Math.min(1, 0.92 + (scrollProgress - 0.45) * 1.0) : 0.92})`,
            }}
            className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-slate-900 transition-all duration-500 ${
              scrollProgress >= 0.45 ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            {/* Center Technical Hub (Clean SAP S/4HANA Badge) */}
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 px-5 py-2.5 rounded-2xl bg-white/95 border-2 border-sky-500 text-center shadow-xl backdrop-blur-xl pointer-events-auto flex items-center justify-center gap-2 whitespace-nowrap">
              <span className="text-xs font-mono font-black text-slate-900 tracking-wider">
                SAP S/4HANA
              </span>
            </div>

            {/* 5 Orbiting Active Phase Targets along Outer Radar Ring (Clean Non-Overlapping Orbit) */}
            <div className="relative w-full max-w-5xl h-[620px] flex items-center justify-center">
              
              {/* SVG Connecting Spoke Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 620">
                {phases.map((ph, idx) => {
                  const angle = (idx / 5) * Math.PI * 2 - Math.PI / 2;
                  const radius = 295;
                  const cx = 500;
                  const cy = 310;
                  const targetX = cx + Math.cos(angle) * radius;
                  const targetY = cy + Math.sin(angle) * radius;
                  const isActive = activePhaseIndex === idx;

                  return (
                    <g key={ph.id}>
                      {/* Radial Line from Center to Card */}
                      <line
                        x1={cx}
                        y1={cy}
                        x2={targetX}
                        y2={targetY}
                        stroke={isActive ? ph.color : '#94A3B8'}
                        strokeWidth={isActive ? '2.5' : '1.5'}
                        strokeDasharray={isActive ? 'none' : '4 6'}
                        opacity={isActive ? 0.9 : 0.35}
                      />

                      {/* Accent Target Node Dot at Line End */}
                      <circle
                        cx={targetX}
                        cy={targetY}
                        r={isActive ? '6' : '4'}
                        fill={ph.color}
                        opacity={isActive ? 1 : 0.6}
                      />
                    </g>
                  );
                })}
              </svg>
              {phases.map((ph, idx) => {
                const isActive = activePhaseIndex === idx;
                // Calculate 5 equidistant angles around the circle
                const angle = (idx / 5) * Math.PI * 2 - Math.PI / 2;
                // Expanded radius (295px) ensures complete separation from center box
                const radius = 295;
                const tx = Math.cos(angle) * radius;
                const ty = Math.sin(angle) * radius;
                const IconComp = ph.icon;

                return (
                  <div
                    key={ph.id}
                    style={{
                      transform: `translate(${tx}px, ${ty}px)`,
                    }}
                    className={`absolute p-3 rounded-2xl border transition-all duration-500 backdrop-blur-xl w-52 sm:w-56 pointer-events-auto ${
                      isActive
                        ? 'bg-white text-slate-900 border-orange-500 shadow-[0_12px_35px_rgba(242,92,5,0.25)] scale-105 z-40 ring-2 ring-orange-400/40'
                        : 'bg-white/95 text-slate-700 border-slate-200/90 shadow-md scale-95 opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="p-1.5 rounded-lg text-white font-black text-xs shrink-0 shadow-xs"
                        style={{ backgroundColor: ph.color }}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-extrabold text-slate-900 leading-tight">
                        {ph.title}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-extrabold text-sky-600 block mb-1">
                      {ph.metric}
                    </span>

                    <p className="text-[11px] text-slate-600 font-medium leading-tight line-clamp-2">
                      {ph.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* MOBILE FALLBACK (< 768px): Clean Hero + Vertical Timeline */
        <div className="py-20 px-4 flex flex-col items-center text-center gap-6 bg-slate-50">
          <h1 className="text-3xl font-black text-slate-900 leading-tight">
            Enterprise ERP Solutions &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-sky-600">
              Services
            </span>
          </h1>

          <p className="text-slate-600 text-sm font-medium leading-relaxed">
            Architecting resilient, future-ready enterprise systems. We deliver end-to-end SAP S/4HANA migrations, custom BTP innovations, and full-lifecycle ERP support for global enterprises.
          </p>

          <button
            onClick={onContactClick}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-sky-600 text-white font-extrabold text-xs shadow-md"
          >
            Talk to Our ERP Team →
          </button>

          {/* Mobile Vertical Timeline */}
          <div className="mt-8 w-full flex flex-col gap-4 text-left">
            {phases.map((p) => {
              const IconC = p.icon;
              return (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-3"
                >
                  <div
                    className="p-2 rounded-xl text-white shrink-0 mt-0.5"
                    style={{ backgroundColor: p.color }}
                  >
                    <IconC className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">{p.title}</h3>
                    <p className="text-xs text-slate-600 font-medium leading-snug mt-1">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
