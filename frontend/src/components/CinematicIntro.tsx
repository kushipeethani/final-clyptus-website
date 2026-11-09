import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import logoImg from '../assets/logo.png';

interface CinematicIntroProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  delay: number;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onComplete,
  onSkip,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const portalGlowRef = useRef<HTMLDivElement>(null);
  const flashOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isFullyLocked = false;
    const particles: Particle[] = [];

    const logicalWidth = 800;
    const logicalHeight = 450;

    const dpr = Math.min(window.devicePixelRatio || 2, 3);
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    ctx.scale(dpr, dpr);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = logoImg;

    img.onload = () => {
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      const targetLogoWidth = 460;
      const targetLogoHeight = (img.height / img.width) * targetLogoWidth;
      offCanvas.width = targetLogoWidth;
      offCanvas.height = targetLogoHeight;

      offCtx.drawImage(img, 0, 0, targetLogoWidth, targetLogoHeight);
      const imgData = offCtx.getImageData(0, 0, targetLogoWidth, targetLogoHeight).data;

      const offsetX = (logicalWidth - targetLogoWidth) / 2;
      const offsetY = (logicalHeight - targetLogoHeight) / 2;

      const subtitleStartX = targetLogoWidth * 0.495;
      const subtitleStartY = targetLogoHeight * 0.695;
      const subtitleEndY = targetLogoHeight * 0.76;
      const subtitleWidth = targetLogoWidth - subtitleStartX;

      const step = 2;
      for (let y = 0; y < targetLogoHeight; y += step) {
        for (let x = 0; x < targetLogoWidth; x += step) {
          const index = (Math.floor(y) * targetLogoWidth + Math.floor(x)) * 4;
          const alpha = imgData[index + 3];

          if (alpha > 85) {
            const r = imgData[index];
            const g = imgData[index + 1];
            const isOrange = r > 160 && g < 130;

            const isInSubtitleArea = !isOrange && y >= subtitleStartY && x >= subtitleStartX;
            if (isInSubtitleArea) {
              continue;
            }

            const angle = Math.random() * Math.PI * 2;
            const distance = 250 + Math.random() * 250;
            const originX = logicalWidth / 2 + Math.cos(angle) * distance;
            const originY = logicalHeight / 2 + Math.sin(angle) * distance;

            const progressRatio = x / targetLogoWidth;
            const letterDelay = isOrange ? 0.2 : 0.85 + progressRatio * 2.3;

            particles.push({
              x: originX,
              y: originY,
              targetX: offsetX + x,
              targetY: offsetY + y,
              originX,
              originY,
              color: isOrange ? '#EA580C' : '#2D2A85',
              size: isOrange ? 1.35 : 1.15,
              delay: letterDelay,
            });
          }
        }
      }

      const animState = {
        time: 0,
        subtitleReveal: 0,
      };

      const tl = gsap.timeline();

      // 1. Particle assembly across 3.3s
      tl.to(animState, {
        time: 4.0,
        duration: 3.3,
        ease: 'power1.out',
      });

      // 2. Subtitle sweep starting directly under 'p'
      tl.to(
        animState,
        {
          subtitleReveal: 1,
          duration: 1.2,
          ease: 'power2.out',
        },
        1.9
      );

      // 3. Instant paint swap to true master image
      tl.add(() => {
        isFullyLocked = true;
        cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, logicalWidth, logicalHeight);
        ctx.drawImage(img, offsetX, offsetY, targetLogoWidth, targetLogoHeight);
      });

      // 4. HOLD THE CRISP LOGO FOR EXACTLY 1.0 SECOND
      tl.to({}, { duration: 1.0 });

      // 5. Glow effect triggers immediately after the 1-second hold
      tl.to(
        portalGlowRef.current,
        {
          scale: 4.5,
          opacity: 1,
          filter: 'blur(30px)',
          duration: 0.85,
          ease: 'power3.in',
        }
      );

      // Logo blends into glow smoothly
      tl.to(
        canvasRef.current,
        {
          scale: 1.08,
          filter: 'blur(10px) brightness(1.3)',
          opacity: 0,
          duration: 0.7,
          ease: 'power2.in',
        },
        '<'
      );

      // White flash dissolve wash
      tl.to(
        flashOverlayRef.current,
        {
          opacity: 1,
          duration: 0.45,
          ease: 'power2.in',
        },
        '-=0.35'
      );

      // Clean fade out into website
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          onComplete();
        },
      });

      // Render loop
      const render = () => {
        if (isFullyLocked) return;
        ctx.clearRect(0, 0, logicalWidth, logicalHeight);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const localProgress = Math.max(0, Math.min(1, (animState.time - p.delay) / 0.75));

          const eased = 1 - Math.pow(1 - localProgress, 3);
          p.x = p.originX + (p.targetX - p.originX) * eased;
          p.y = p.originY + (p.targetY - p.originY) * eased;

          if (localProgress > 0) {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        if (animState.subtitleReveal > 0) {
          ctx.save();
          ctx.beginPath();
          const clipX = offsetX + subtitleStartX;
          const clipY = offsetY + subtitleStartY - 2;
          const clipW = subtitleWidth * animState.subtitleReveal;
          const clipH = subtitleEndY - subtitleStartY + 6;

          ctx.rect(clipX, clipY, clipW, clipH);
          ctx.clip();

          ctx.drawImage(img, offsetX, offsetY, targetLogoWidth, targetLogoHeight);
          ctx.restore();
        }

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    };

    return () => {
      isFullyLocked = true;
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white select-none overflow-hidden"
    >
      {/* Background ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(234, 88, 12, 0.05) 0%, rgba(45, 42, 133, 0.05) 45%, rgba(255, 255, 255, 0) 70%)',
        }}
      />

      {/* Portal Energy Glow Element */}
      <div
        ref={portalGlowRef}
        className="absolute w-[240px] h-[240px] rounded-full pointer-events-none opacity-0 scale-50 z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(234, 88, 12, 0.8) 0%, rgba(45, 42, 133, 0.5) 45%, rgba(255, 255, 255, 0) 70%)',
          boxShadow: '0 0 100px 40px rgba(234, 88, 12, 0.45)',
        }}
      />

      {/* Flash overlay for smooth transition into hero */}
      <div
        ref={flashOverlayRef}
        className="absolute inset-0 bg-white pointer-events-none opacity-0 z-20"
      />

      {/* Assembly Canvas */}
      <div className="relative flex items-center justify-center w-[800px] h-[450px] z-10">
        <canvas
          ref={canvasRef}
          style={{ width: '800px', height: '450px' }}
          className="w-[800px] h-[450px] pointer-events-none"
        />
      </div>

      {/* Skip Button */}
      <button
        onClick={onSkip}
        className="absolute bottom-8 right-8 z-30 text-xs font-mono text-slate-500 hover:text-orange-600 hover:border-orange-400 transition-all uppercase tracking-widest px-4 py-2 rounded-full bg-white/90 border border-slate-200 backdrop-blur-md shadow-sm"
      >
        Skip Intro →
      </button>
    </div>
  );
};