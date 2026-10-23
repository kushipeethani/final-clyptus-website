import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface Particle {
  armIndex: number;
  distanceRatio: number; // 0 (core) to 1 (outer arm)
  baseAngle: number;
  speed: number;
  size: number;
  alpha: number;
  charcoalHex: string;
  wobbleOffset: number;
  wobbleSpeed: number;
  isLeftSide: boolean;
  driftX: number;
  driftY: number;
  vx: number;
  vy: number;
}

interface AiGalaxyParticleSectionProps {
  onNavigateContact?: () => void;
}

export const AiGalaxyParticleSection: React.FC<AiGalaxyParticleSectionProps> = ({ onNavigateContact }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [dispersionFactor, setDispersionFactor] = useState<number>(0);

  // Target and current animated dispersion progress (0 = galaxy, 1 = fully spread to left and right)
  const targetDisperseRef = useRef<number>(0);
  const currentDisperseRef = useRef<number>(0);

  // Mouse tracking with useRef
  const mouseRef = useRef({
    targetX: -1000,
    targetY: -1000,
    currX: -1000,
    currY: -1000,
    active: false,
  });

  // On one scroll-down, automatically disperse all particles to left and right without needing to scrub/scroll continuously
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY || window.pageYOffset || 0;
      if (scrolled > 20) {
        targetDisperseRef.current = 1;
      } else {
        targetDisperseRef.current = 0;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 5) {
        targetDisperseRef.current = 1;
      } else if ((window.scrollY || window.pageYOffset || 0) <= 10 && e.deltaY < -5) {
        targetDisperseRef.current = 0;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const CHARCOAL_SHADES = [
      '#E74905', // Clyptus Vibrant Orange
      '#31338E', // Clyptus Deep Royal Blue
      '#E74905', // Clyptus Vibrant Orange
      '#31338E', // Clyptus Deep Royal Blue
      '#E74905', // Clyptus Vibrant Orange
      '#2a2dc5ff', // Rich Blue Accent
    ];

    const isMobile = width < 768;
    const AMBIENT_COUNT = isMobile ? 320 : 550;
    const PARTICLE_COUNT = isMobile ? 1200 : 2500;
    const NUM_ARMS = 4;
    const particles: Particle[] = [];

    const resize = () => {
      if (!canvas || !sectionRef.current) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize particles: half assigned to spread left, half to spread right
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const armIndex = i % NUM_ARMS;
      const distanceRatio = Math.pow(Math.random(), 1.6);
      const baseAngle = (armIndex * (2 * Math.PI / NUM_ARMS)) + (Math.random() * 0.4 - 0.2);
      const speed = 0.002 + Math.random() * 0.003;
      const size = Math.random() < 0.22 ? Math.random() * 2.3 + 1.2 : Math.random() * 1.3 + 0.55;
      const alpha = Math.min(1, 0.40 + Math.random() * 0.55);
      const charcoalHex = CHARCOAL_SHADES[Math.floor(Math.random() * CHARCOAL_SHADES.length)];
      const wobbleOffset = Math.random() * Math.PI * 2;
      const wobbleSpeed = 0.02 + Math.random() * 0.03;

      const initialCos = Math.cos(baseAngle);
      const isLeftSide = initialCos < 0 || (initialCos === 0 && i % 2 === 0);

      const sideMarginRatio = 0.15;
      const driftX = isLeftSide
        ? Math.random() * (width * sideMarginRatio)
        : width * (1 - sideMarginRatio) + Math.random() * (width * sideMarginRatio);

      const NAVBAR_SAFE_ZONE_Y = 95;
      const driftY = NAVBAR_SAFE_ZONE_Y + Math.random() * Math.max(10, height - NAVBAR_SAFE_ZONE_Y);

      const driftAngle = Math.random() * Math.PI * 2;
      const driftSpeed = 0.25 + Math.random() * 0.65;
      const vx = Math.cos(driftAngle) * driftSpeed;
      const vy = Math.sin(driftAngle) * driftSpeed;

      particles.push({
        armIndex,
        distanceRatio,
        baseAngle,
        speed,
        size,
        alpha,
        charcoalHex,
        wobbleOffset,
        wobbleSpeed,
        isLeftSide,
        driftX,
        driftY,
        vx,
        vy,
      });
    }

    let globalRotation = 0;
    let frameCounter = 0;

    const render = () => {
      // Automatically animate dispersion on single scroll down (faster, responsive transition)
      currentDisperseRef.current += (targetDisperseRef.current - currentDisperseRef.current) * 0.095;
      const easeProgress = Math.min(1, Math.max(0, currentDisperseRef.current));

      // Throttled React state update for text reveal
      frameCounter++;
      if (frameCounter % 4 === 0) {
        setDispersionFactor(easeProgress);
      }

      // 1. Clean solid pure white background (#FFFFFF)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.45;

      globalRotation += 0.0012; // Smooth orbital spin

      // Interpolate mouse coordinates
      if (mouseRef.current.active) {
        mouseRef.current.currX += (mouseRef.current.targetX - mouseRef.current.currX) * 0.06;
        mouseRef.current.currY += (mouseRef.current.targetY - mouseRef.current.currY) * 0.06;
      }

      // 2. Core Halo Glow (fades smoothly as particles disperse to the sides)
      const coreAlpha = Math.max(0, 1 - easeProgress * 1.8);
      if (coreAlpha > 0.01) {
        const coreGradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, maxRadius * 0.35
        );
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${coreAlpha})`);
        coreGradient.addColorStop(0.2, `rgba(248, 250, 252, ${coreAlpha * 0.95})`);
        coreGradient.addColorStop(0.5, `rgba(241, 245, 249, ${coreAlpha * 0.6})`);
        coreGradient.addColorStop(0.85, `rgba(226, 232, 240, ${coreAlpha * 0.2})`);
        coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxRadius * 0.38, 0, Math.PI * 2);
        ctx.fill();
      }

      const sideMarginRatio = 0.15;
      const NAVBAR_SAFE_ZONE_Y = 95;

      // 3. Render Particles: Automatically spread to left and right margins upon scroll down
      particles.forEach((p, idx) => {
        // Continuous dynamic drifting motion on the right and left sides (like fullpageparticalsbackground)
        p.driftX += p.vx;
        p.driftY += p.vy;

        // Wrap around side margins (keeping center 15%-85% clear, exactly like FullPageParticleBackground)
        if (p.isLeftSide) {
          if (p.driftX < -30) p.driftX = width * sideMarginRatio;
          if (p.driftX > width * sideMarginRatio) p.driftX = -30;
        } else {
          if (p.driftX < width * (1 - sideMarginRatio)) p.driftX = width + 30;
          if (p.driftX > width + 30) p.driftX = width * (1 - sideMarginRatio);
        }

        if (p.driftY < NAVBAR_SAFE_ZONE_Y) p.driftY = height + 40;
        if (p.driftY > height + 40) p.driftY = NAVBAR_SAFE_ZONE_Y;

        // Spiral Galaxy Center Position (at progress = 0)
        const spiralTightness = 4.2;
        const currentAngle = p.baseAngle + globalRotation + (1 - p.distanceRatio) * spiralTightness;
        const currentRadius = p.distanceRatio * maxRadius;

        p.wobbleOffset += p.wobbleSpeed * 0.04;
        const wobbleX = Math.sin(p.wobbleOffset) * 8;
        const wobbleY = Math.cos(p.wobbleOffset) * 8;

        const galaxyX = centerX + Math.cos(currentAngle) * currentRadius;
        const galaxyY = centerY + Math.sin(currentAngle) * currentRadius;

        // Smooth quintic interpolation: automatic spread to right and left on single scroll-down
        const smoothedT = easeProgress * easeProgress * (3 - 2 * easeProgress);
        let px = galaxyX + (p.driftX - galaxyX) * smoothedT + wobbleX;
        let py = galaxyY + (p.driftY - galaxyY) * smoothedT + wobbleY;

        let moveSpeedMultiplier = 1.0;

        // Interactive Mouse Particle Dispersion
        if (mouseRef.current.active) {
          const dx = px - mouseRef.current.currX;
          const dy = py - mouseRef.current.currY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const dispersionRadius = 180;

          if (dist < dispersionRadius && dist > 0) {
            const factor = (dispersionRadius - dist) / dispersionRadius;
            const disperseForceMouse = Math.pow(factor, 1.2) * 28;
            px += (dx / dist) * disperseForceMouse;
            py += (dy / dist) * disperseForceMouse;
            moveSpeedMultiplier = Math.max(0.2, 1.0 - factor * 0.8);
          }
        }

        // Apply orbital speed when in spiral form
        p.distanceRatio -= (p.speed * 0.15 * (1 - smoothedT * 0.9)) * moveSpeedMultiplier;
        if (p.distanceRatio <= 0.02) {
          p.distanceRatio = 0.98 + Math.random() * 0.02;
        }

        // Particle Alpha calculation (retains ~45% background visibility when text appears)
        const outerFade = p.distanceRatio > 0.85
          ? (1 - p.distanceRatio) / 0.15
          : (p.distanceRatio < 0.1 ? p.distanceRatio / 0.1 : 1);

        const scrollAlphaFade = Math.max(0.45, 1 - Math.min(0.55, smoothedT * 0.7));

        // After dispersion, decrease visible particle count to exact same count as FullPageParticleBackground (550 on desktop, 320 on mobile)
        const countFade = idx >= AMBIENT_COUNT ? Math.max(0, 1 - smoothedT * 1.25) : 1;

        const finalAlpha = Math.max(0, Math.min(1, p.alpha * outerFade * scrollAlphaFade * countFade));

        // Draw particle dot only outside navbar area
        if (finalAlpha > 0.001 && py >= 90) {
          ctx.save();
          ctx.globalAlpha = finalAlpha;
          ctx.fillStyle = p.charcoalHex;
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fill();

          if (p.size > 1.8) {
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(px, py, p.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseRef.current.targetX = e.clientX - rect.left;
    mouseRef.current.targetY = e.clientY - rect.top;
    mouseRef.current.active = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  // Text Reveal Opacity & Scale calculation based on automatic dispersion
  const textOpacity = Math.max(0, Math.min(1, (dispersionFactor - 0.05) / 0.5));
  const textScale = 0.9 + Math.min(0.1, textOpacity * 0.1);

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[150vh] bg-white select-none"
    >
      {/* Sticky Full-Viewport Frozen Canvas Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-white">

        {/* 4K Ultra-Crisp Monochrome Spiral Galaxy Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* CENTER REVEALED TYPOGRAPHY ("AI SERVICES") */}
        <div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6 pointer-events-auto transition-all duration-300 ease-out"
          style={{
            opacity: textOpacity,
            transform: `scale(${textScale})`,
            pointerEvents: textOpacity > 0.3 ? 'auto' : 'none',
          }}
        >

          {/* H1 Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-slate-900 max-w-4xl">
            AI Development & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">Automation Services</span>
          </h1>

          {/* Headline */}
          <p className="text-xl sm:text-2xl font-bold text-slate-900 max-w-3xl">
            “Turn Business Data Into Intelligent Action”
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-medium">
            Clyptus designs and builds AI solutions for enterprises: generative AI, AI assistants and copilots, machine learning, conversational AI and intelligent process automation. Our data engineers prepare and run the platforms behind them, including Databricks and Snowflake.
          </p>

          {/* CTA Button */}
          {onNavigateContact && (
            <button
              onClick={onNavigateContact}
              className="group relative flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all duration-300 mt-2"
            >
              <span>Talk to an Expert</span>
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
