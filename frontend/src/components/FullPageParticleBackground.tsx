import React, { useEffect, useRef } from 'react';

interface LogoSamplePoint {
  xRatio: number;
  yRatio: number;
  color: string;
}

interface Particle {
  driftX: number;
  driftY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  charcoalHex: string;
  wobbleOffset: number;
  wobbleSpeed: number;
  targetRatioX: number;
  targetRatioY: number;
  logoColor: string;
}

export const FullPageParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({
    currX: -1000,
    currY: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const CHARCOAL_SHADES = [
      '#E74905', // Pitch-black
      '#2a2dc5ff', // Ultra-deep zinc
      '#E74905', // Deep charcoal
      '#31338E', // Charcoal grey
      '#E74905', // Mid-charcoal
      '#E74905', // Slate grey particle
    ];

    const isMobile = width < 768;
    const AMBIENT_COUNT = isMobile ? 320 : 550;
    const TOTAL_PARTICLE_COUNT = isMobile ? 2400 : 5000;
    const particles: Particle[] = [];
    let logoPoints: LogoSamplePoint[] = [];
    let isLogoLoaded = false;

    const resize = () => {
      if (!canvas) return;
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

    // Initialize 5000 total particles
    for (let i = 0; i < TOTAL_PARTICLE_COUNT; i++) {
      const isLeftSide = i % 2 === 0;
      const sideMarginRatio = 0.15;
      const driftX = isLeftSide 
        ? Math.random() * (width * sideMarginRatio) 
        : width * (1 - sideMarginRatio) + Math.random() * (width * sideMarginRatio);

      const NAVBAR_SAFE_ZONE_Y = 95;
      const driftY = NAVBAR_SAFE_ZONE_Y + Math.random() * Math.max(10, height - NAVBAR_SAFE_ZONE_Y);

      const driftAngle = Math.random() * Math.PI * 2;
      const speed = 0.25 + Math.random() * 0.65;
      const vx = Math.cos(driftAngle) * speed;
      const vy = Math.sin(driftAngle) * speed;

      const size = Math.random() < 0.22 ? Math.random() * 2.3 + 1.2 : Math.random() * 1.3 + 0.55;
      const alpha = i < AMBIENT_COUNT ? (0.42 + Math.random() * 0.06) : 0;
      const charcoalHex = CHARCOAL_SHADES[Math.floor(Math.random() * CHARCOAL_SHADES.length)];
      const wobbleOffset = Math.random() * Math.PI * 2;
      const wobbleSpeed = 0.02 + Math.random() * 0.03;

      particles.push({
        driftX,
        driftY,
        vx,
        vy,
        size,
        alpha,
        charcoalHex,
        wobbleOffset,
        wobbleSpeed,
        targetRatioX: 0.5,
        targetRatioY: 0.5,
        logoColor: '#f15a24',
      });
    }

    // Load and sample exact pixels & colors from official Clyptus logo (public/logo.png)
    const img = new Image();
    img.src = '/logo.png';
    const assignLogoPoints = () => {
      const sampleW = 498;
      const sampleH = 371;
      const offscreen = document.createElement('canvas');
      offscreen.width = sampleW;
      offscreen.height = sampleH;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, sampleW, sampleH);
      const imgData = offCtx.getImageData(0, 0, sampleW, sampleH);
      const data = imgData.data;

      const orangeValid: LogoSamplePoint[] = [];
      const blueTextValid: LogoSamplePoint[] = [];

      // Dense pixel sampling: Scan every single non-white, non-transparent pixel
      for (let y = 0; y < sampleH; y += 1) {
        for (let x = 0; x < sampleW; x += 1) {
          const idx = (y * sampleW + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Include all colored pixels to fill edges & interiors completely
          if (a > 30 && (r < 242 || g < 242 || b < 242)) {
            const isOrange = r > 165 && b < 110;

            const isInSubtitleArea = !isOrange && y >= sampleH * 0.67 && x >= sampleW * 0.48;
            if (isInSubtitleArea) {
              continue;
            }

            const pt = {
              xRatio: x / sampleW,
              yRatio: y / sampleH,
              color: isOrange ? '#f15a24' : '#2b3990',
            };

            if (isOrange) {
              orangeValid.push(pt);
            } else {
              blueTextValid.push(pt);
            }
          }
        }
      }

      const totalTarget = TOTAL_PARTICLE_COUNT;
      const blueRatio = 0.62;
      const blueTargetCount = Math.round(totalTarget * blueRatio);
      const orangeTargetCount = totalTarget - blueTargetCount;

      logoPoints = [];

      // Uniform random sampling across blue text & orange arc to eliminate linear stripe gaps
      if (blueTextValid.length > 0) {
        for (let i = 0; i < blueTargetCount; i++) {
          const randIdx = Math.floor(Math.random() * blueTextValid.length);
          logoPoints.push(blueTextValid[randIdx]);
        }
      }

      if (orangeValid.length > 0) {
        for (let i = 0; i < orangeTargetCount; i++) {
          const randIdx = Math.floor(Math.random() * orangeValid.length);
          logoPoints.push(orangeValid[randIdx]);
        }
      }

      if (logoPoints.length > 0) {
        isLogoLoaded = true;

        // Assign each particle its target logo point
        particles.forEach((p, idx) => {
          const lp = logoPoints[idx % logoPoints.length];
          p.targetRatioX = lp.xRatio;
          p.targetRatioY = lp.yRatio;
          p.logoColor = lp.color;
        });
      }
    };

    if (img.complete) {
      assignLogoPoints();
    } else {
      img.onload = assignLogoPoints;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let smoothedAssembleFactor = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Check whether target section above FAQ is in view
      const targetEl = document.getElementById('clyptus-logo-assemble-target');
      let targetAssembleFactor = 0;
      let logoBox = { x: 0, y: 0, w: 0, h: 0 };

      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        const vh = height;
        const centerY = rect.top + rect.height * 0.5;
        const screenCenterY = vh * 0.5;

        // Auto combine when section approaches center on scroll-down; auto disperse as user scrolls down past center
        const isCombined = centerY <= screenCenterY + vh * 0.42 && centerY >= screenCenterY - 50;
        targetAssembleFactor = isCombined ? 1 : 0;

        const maxLogoW = Math.min(rect.width * 0.88, 520);
        const logoW = Math.max(280, maxLogoW);
        const logoH = logoW * (371 / 498);

        logoBox = {
          x: rect.left + (rect.width - logoW) / 2,
          y: rect.top + (rect.height - logoH) / 2 + 10,
          w: logoW,
          h: logoH,
        };
      }

      // Responsive automatic assembly factor (0.095 speed matching AiGalaxyParticleSection)
      smoothedAssembleFactor += (targetAssembleFactor - smoothedAssembleFactor) * 0.095;
      const assembleFactor = Math.abs(smoothedAssembleFactor) < 0.0001 ? 0 : smoothedAssembleFactor;

      // Smooth mouse lerp
      if (mouseRef.current.active) {
        mouseRef.current.currX += (mouseRef.current.targetX - mouseRef.current.currX) * 0.1;
        mouseRef.current.currY += (mouseRef.current.targetY - mouseRef.current.currY) * 0.1;
      }

      const activeTextParticles: { x: number; y: number; color: string }[] = [];

      particles.forEach((p, idx) => {
        // Continuous organic drifting
        p.driftX += p.vx;
        p.driftY += p.vy;

        // Wrap around viewport side margins (keeping center 15%-85% clear of background dots)
        const isLeftSide = idx % 2 === 0;
        const sideMarginRatio = 0.15;
        if (isLeftSide) {
          if (p.driftX < -30) p.driftX = width * sideMarginRatio;
          if (p.driftX > width * sideMarginRatio) p.driftX = -30;
        } else {
          if (p.driftX < width * (1 - sideMarginRatio)) p.driftX = width + 30;
          if (p.driftX > width + 30) p.driftX = width * (1 - sideMarginRatio);
        }
        const NAVBAR_SAFE_ZONE_Y = 95;
        if (p.driftY < NAVBAR_SAFE_ZONE_Y) p.driftY = height + 40;
        if (p.driftY > height + 40) p.driftY = NAVBAR_SAFE_ZONE_Y;

        p.wobbleOffset += p.wobbleSpeed * (1 + assembleFactor * 0.2);

        // Tight micro-movement & subtle floating shimmer when 100% fully formed
        const ambientWobble = (1 - assembleFactor) * 3.5;
        const formedMicroWobble = assembleFactor * (0.5 + (idx % 5) * 0.12); // Subtle tight micro-shimmer (0.5px - 1.0px)
        const wobbleMag = ambientWobble + formedMicroWobble;

        const wobbleX = Math.sin(p.wobbleOffset + idx * 0.05) * wobbleMag;
        const wobbleY = Math.cos(p.wobbleOffset * 0.85 + idx * 0.08) * wobbleMag;

        // If assemble is active and logo is loaded, converge smoothly toward logo target coordinates
        let renderX = p.driftX + wobbleX;
        let renderY = p.driftY + wobbleY;

        if (assembleFactor > 0 && isLogoLoaded) {
          const targetX = logoBox.x + p.targetRatioX * logoBox.w;
          const targetY = logoBox.y + p.targetRatioY * logoBox.h;

          // Quintic Smootherstep curve: zero acceleration jerk at start and arrival for buttery-smooth flight
          const t = Math.min(1, Math.max(0, assembleFactor));
          const easedFactor = t * t * t * (t * (t * 6 - 15) + 10);

          renderX = p.driftX + (targetX - p.driftX) * easedFactor + wobbleX;
          renderY = p.driftY + (targetY - p.driftY) * easedFactor + wobbleY;
        }

        // Interactive mouse ripple repulsion (subtle, tight push when formed)
        if (mouseRef.current.active) {
          const dx = renderX - mouseRef.current.currX;
          const dy = renderY - mouseRef.current.currY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pushRadius = assembleFactor > 0.5 ? 90 : 140;

          if (dist < pushRadius && dist > 0) {
            const force = (pushRadius - dist) / pushRadius;
            const push = Math.pow(force, 1.2) * (assembleFactor > 0.5 ? 6 : 22);
            renderX += (dx / dist) * push;
            renderY += (dy / dist) * push;
          }
        }

        // Determine particle color (smooth transition from charcoal to logo colors: orange/blue)
        let particleColor = p.charcoalHex;
        if (assembleFactor > 0.2 && isLogoLoaded) {
          particleColor = p.logoColor;
        }

        // Calculate opacity: 95 ambient background particles stay at ~45%; remaining 2405 fade in smoothly during assembly
        let currentAlpha = 0;
        if (idx < AMBIENT_COUNT) {
          currentAlpha = assembleFactor > 0
            ? Math.min(1, p.alpha + assembleFactor * 0.5)
            : p.alpha;
        } else {
          currentAlpha = assembleFactor > 0
            ? Math.pow(assembleFactor, 1.1) * (0.75 + (idx % 10) * 0.025)
            : 0;
        }

        if (currentAlpha > 0.01) {
          // Never render particles in the top navbar zone (y < 95)
          if (renderY < 95 && assembleFactor < 0.2) {
            return;
          }

          // Increase size for blue text particles + add subtle breathing pulse wave when formed
          const isBlueText = p.logoColor === '#2b3990';
          const sizeBoost = isBlueText ? 0.45 : 0.25;
          const pulseWave = Math.sin(p.wobbleOffset * 1.2 + idx * 0.1) * 0.06 * assembleFactor;
          const currentSize = p.size * (1 + assembleFactor * sizeBoost + pulseWave);

          ctx.save();
          ctx.globalAlpha = currentAlpha;
          ctx.fillStyle = particleColor;
          ctx.beginPath();
          ctx.arc(renderX, renderY, currentSize, 0, Math.PI * 2);
          ctx.fill();

          if (p.size > 1.8 && assembleFactor < 0.5) {
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(renderX, renderY, currentSize * 0.45, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();

          if (assembleFactor > 0.4) {
            activeTextParticles.push({ x: renderX, y: renderY, color: particleColor });
          }
        }
      });

      // Draw dense connecting mesh lines between adjacent particles to fill all gaps & white spaces completely
      if (assembleFactor > 0.45 && activeTextParticles.length > 0) {
        ctx.save();
        ctx.lineWidth = 1.3;

        for (let i = 0; i < activeTextParticles.length; i += 2) {
          const p1 = activeTextParticles[i];
          ctx.strokeStyle = p1.color;
          ctx.globalAlpha = Math.min(0.55, (assembleFactor - 0.45) * 1.3);

          for (let j = i + 1; j < Math.min(i + 14, activeTextParticles.length); j++) {
            const p2 = activeTextParticles[j];
            if (p1.color === p2.color) {
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const distSq = dx * dx + dy * dy;
              if (distSq < 225) { // dist < 15px
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
          }
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 block"
    />
  );
};
