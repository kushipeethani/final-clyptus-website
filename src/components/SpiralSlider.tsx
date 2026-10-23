import React, { useState, useEffect, useRef } from 'react';
import type { SliderCard, SpiralConfig } from '../data/sliderData';

interface SpiralSliderProps {
  cards: SliderCard[];
  config: SpiralConfig;
  onSelectCard?: (card: SliderCard) => void;
  onOpenPromptModal?: (card: SliderCard) => void;
}

export const SpiralSlider: React.FC<SpiralSliderProps> = ({
  cards,
  config,
  onSelectCard,
}) => {
  const [rotationOffset, setRotationOffset] = useState<number>(0);
  const targetOffsetRef = useRef<number>(0);
  const currentOffsetRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Scroll pinning progress tracking
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const lastProgressIntRef = useRef<number>(-1);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Drag physics state
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const lastMouseTimeRef = useRef<number>(0);

  // High-performance Window Scroll Sync (Sampled cleanly via RAF)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (trackRef.current) {
            const rect = trackRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const totalDist = rect.height - viewportHeight;

            if (totalDist > 0) {
              const scrolled = -rect.top;
              const progress = Math.max(0, Math.min(1, scrolled / totalDist));

              // Only trigger state re-render when progress percentage actually changes
              const progressInt = Math.round(progress * 100);
              if (progressInt !== lastProgressIntRef.current) {
                lastProgressIntRef.current = progressInt;
                setScrollProgress(progress);
              }

              // Target rotation offset mapped directly to scroll
              const maxOffset = cards.length + 1.2;
              targetOffsetRef.current = progress * maxOffset;
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
  }, [cards.length]);

  // Auto rotate interval fallback if enabled
  useEffect(() => {
    if (!config.autoRotate) return;
    const interval = setInterval(() => {
      targetOffsetRef.current += 0.003 * config.rotationSpeed;
    }, 16);
    return () => clearInterval(interval);
  }, [config.autoRotate, config.rotationSpeed]);

  // 60 FPS Smooth Lerp Loop (Responsive 0.08 Lerp Damping)
  useEffect(() => {
    const updateLoop = () => {
      if (!isDraggingRef.current && Math.abs(velocityRef.current) > 0.0005) {
        targetOffsetRef.current += velocityRef.current;
        velocityRef.current *= 0.94;
      }

      // Responsive lerp interpolation (0.08 factor for zero-lag silky motion)
      const diff = targetOffsetRef.current - currentOffsetRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentOffsetRef.current += diff * 0.08;
        setRotationOffset(currentOffsetRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [cards.length]);

  // Touch & Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingRef.current = true;
    velocityRef.current = 0;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startXRef.current = clientX;
    startYRef.current = clientY;
    lastMouseTimeRef.current = performance.now();
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const dx = clientX - startXRef.current;
    const dy = clientY - startYRef.current;

    // For touch devices, if vertical swipe is stronger, let page scroll natively
    if ('touches' in e && Math.abs(dy) > Math.abs(dx) * 1.5) {
      return;
    }

    const now = performance.now();
    const dt = Math.max(1, now - lastMouseTimeRef.current);

    const movement = (dx - dy * 0.3) * (isMobile ? 0.0022 : 0.0012);
    targetOffsetRef.current -= movement;
    velocityRef.current = -movement / (dt / 16);

    startXRef.current = clientX;
    startYRef.current = clientY;
    lastMouseTimeRef.current = now;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        targetOffsetRef.current = Math.round(targetOffsetRef.current) + 1;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        targetOffsetRef.current = Math.round(targetOffsetRef.current) - 1;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const snapToCard = (index: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const totalDist = rect.height - window.innerHeight;
    const maxOffset = cards.length + 1.2;
    const targetProgress = index / maxOffset;
    
    const targetScrollY = trackTop + targetProgress * totalDist;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  // Calculate 3D Helical Transforms for each card
  const numCards = cards.length;
  const angleStep = (2 * Math.PI * config.tightness) / numCards;

  const isMobile = windowWidth < 768;
  const responsiveRadius = isMobile ? Math.min(config.radius, Math.max(115, windowWidth * 0.28)) : config.radius;
  const responsivePitch = isMobile ? config.pitch * 0.65 : config.pitch;

  return (
    /* Outer Scroll-Pinning Track (220vh creates smooth scroll distance without excessive gap) */
    <div ref={trackRef} className="relative w-full h-[220vh]">
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden select-none">
        
        {/* Background Radial Glow */}
        <div className="absolute inset-0 tide-glow pointer-events-none opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,rgba(241,245,249,0.95)_90%)] pointer-events-none" />

        {/* Left Side Scroll Animated Text: Moves Far Left -> Far Right (Disappears behind cards, re-appears outside) */}
        {(() => {
          const maxOffset = cards.length + 1.2;
          const smoothProgress = Math.max(0, Math.min(1, rotationOffset / maxOffset));

          let textOpacity = 1.0;
          if (scrollProgress < 0.08) textOpacity = scrollProgress / 0.08;
          else if (scrollProgress >= 0.08 && scrollProgress < 0.25) textOpacity = 1.0;
          else if (scrollProgress >= 0.25 && scrollProgress < 0.35) textOpacity = Math.max(0, 1.0 - (scrollProgress - 0.25) / 0.10);
          else if (scrollProgress >= 0.35 && scrollProgress < 0.70) textOpacity = 0.0;
          else if (scrollProgress >= 0.70 && scrollProgress < 0.80) textOpacity = Math.min(1.0, (scrollProgress - 0.70) / 0.10);
          else if (scrollProgress >= 0.80 && scrollProgress < 0.90) textOpacity = 1.0;
          else textOpacity = Math.max(0, 1.0 - (scrollProgress - 0.90) / 0.10);

          const leftPosX = isMobile ? (-12 + smoothProgress * 24) : (-60 + smoothProgress * 120);

          return (
            <div 
              className="absolute left-1/2 top-[22%] sm:top-[38%] -translate-y-1/2 z-0 pointer-events-none w-[88vw] max-w-[280px] sm:max-w-[380px] lg:max-w-[460px] text-left transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(calc(-50% + ${leftPosX}vw), -50%, 0)`,
                opacity: textOpacity,
                willChange: 'transform, opacity',
              }}
            >
              <h2 className="text-xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[1.05] text-slate-900 uppercase drop-shadow-sm">
                DESIGNED FOR <br />
                <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  CHANGE.
                </span>
              </h2>
            </div>
          );
        })()}

        {/* Right Side Scroll Animated Text: Moves Far Right -> Far Left (Disappears behind cards, re-appears outside) */}
        {(() => {
          const maxOffset = cards.length + 1.2;
          const smoothProgress = Math.max(0, Math.min(1, rotationOffset / maxOffset));

          let textOpacity = 1.0;
          if (scrollProgress < 0.08) textOpacity = scrollProgress / 0.08;
          else if (scrollProgress >= 0.08 && scrollProgress < 0.25) textOpacity = 1.0;
          else if (scrollProgress >= 0.25 && scrollProgress < 0.35) textOpacity = Math.max(0, 1.0 - (scrollProgress - 0.25) / 0.10);
          else if (scrollProgress >= 0.35 && scrollProgress < 0.70) textOpacity = 0.0;
          else if (scrollProgress >= 0.70 && scrollProgress < 0.80) textOpacity = Math.min(1.0, (scrollProgress - 0.70) / 0.10);
          else if (scrollProgress >= 0.80 && scrollProgress < 0.90) textOpacity = 1.0;
          else textOpacity = Math.max(0, 1.0 - (scrollProgress - 0.90) / 0.10);

          const rightPosX = isMobile ? (12 - smoothProgress * 24) : (60 - smoothProgress * 120);

          return (
            <div 
              className="absolute left-1/2 top-[76%] sm:top-[65%] -translate-y-1/2 z-0 pointer-events-none w-[88vw] max-w-[280px] sm:max-w-[380px] lg:max-w-[460px] text-right transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(calc(-50% + ${rightPosX}vw), -50%, 0)`,
                opacity: textOpacity,
                willChange: 'transform, opacity',
              }}
            >
              <h2 className="text-xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[1.05] text-slate-900 uppercase drop-shadow-sm">
                BUILT FOR <br />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                  GROWTH.
                </span>
              </h2>
            </div>
          );
        })()}

        {/* 3D Perspective Stage (In Front of Text) */}
        <div 
          className="relative z-10 w-full h-full flex items-center justify-center perspective-stage cursor-grab active:cursor-grabbing touch-pan-y"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          style={{
            perspective: `${config.perspective}px`,
          }}
        >
          {/* Helix Rotating Container */}
          <div 
            className="helix-container relative flex items-center justify-center"
            style={{
              transform: `rotateX(${config.tiltAngle}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {cards.map((card, i) => {
              const relIndex = i - rotationOffset;
              const angle = relIndex * angleStep;
              
              const x = Math.sin(angle) * responsiveRadius;
              const y = relIndex * responsivePitch;
              const z = Math.cos(angle) * responsiveRadius;

              const zNorm = (z + responsiveRadius) / (2 * responsiveRadius);
              const isFront = z > 0;
              const isFocal = isMobile 
                ? Math.abs(relIndex) < 0.5 
                : (Math.abs(z - responsiveRadius) < 40 && Math.abs(x) < 80);

              // On mobile: Normal horizontal carousel motion with generous gap, NO UP AND DOWN motion (y = 0)
              const mobileRadius = Math.max(260, windowWidth * 0.72);
              const mobileAngle = relIndex * (angleStep * 1.35); // Generous angular spacing to ensure clear gap between cards

              const finalX = isMobile ? Math.sin(mobileAngle) * mobileRadius : x;
              const finalY = isMobile ? 0 : y; // "no up and down card"
              const finalZ = isMobile ? Math.cos(mobileAngle) * (mobileRadius * 0.4) : z;
              const rotY = isMobile ? ((mobileAngle * 180) / Math.PI) * 0.3 : ((angle * 180) / Math.PI);

              // On mobile: ONLY middle card animation is shown when scrolling
              let opacity = 0;
              if (isMobile) {
                const distFromCenter = Math.abs(relIndex);
                if (distFromCenter < 0.85) {
                  // Only middle card shows cleanly during scroll animation
                  opacity = Math.max(0, 1 - Math.pow(distFromCenter / 0.85, 2));
                } else {
                  opacity = 0;
                }
              } else {
                // Desktop: 100% UNCHANGED
                opacity = isFront 
                  ? (0.94 + zNorm * 0.06) 
                  : (config.visibleFarCards ? (0.35 + zNorm * 0.4) : 0);
              }
              
              const scale = isMobile 
                ? (0.88 + Math.max(0, 1 - Math.abs(relIndex)) * 0.12) 
                : (0.62 + zNorm * 0.28);
              const zIndex = Math.round((z + responsiveRadius) * 10) + (isFocal ? 1000 : 0);

              let widthClass = isMobile ? 'w-[230px] h-[320px]' : 'w-36 h-56 sm:w-48 sm:h-72';
              if (config.aspectRatio === 'landscape') widthClass = isMobile ? 'w-[280px] h-[200px]' : 'w-48 h-36 sm:w-60 sm:h-44';
              else if (config.aspectRatio === 'square') widthClass = isMobile ? 'w-[240px] h-[240px]' : 'w-40 h-40 sm:w-52 sm:h-52';

              return (
                <div
                  key={card.id}
                  className={`spiral-card-wrapper absolute rounded-xl p-0.5 ${widthClass}`}
                  style={{
                    transform: `translate3d(${finalX}px, ${finalY}px, ${finalZ}px) rotateY(${rotY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    pointerEvents: opacity < 0.25 ? 'none' : 'auto',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    snapToCard(i);
                    if (onSelectCard) {
                      onSelectCard(card);
                    }
                  }}
                >
                  <div 
                    className={`group relative w-full h-full rounded-xl overflow-hidden border backdrop-blur-md transition-all duration-300 flex flex-col justify-between p-3 cursor-pointer ${
                      isFocal 
                        ? 'border-sky-500 bg-white/95 shadow-[0_15px_35px_rgba(2,132,199,0.25)] ring-2 ring-sky-400/50' 
                        : isFront 
                          ? 'border-slate-300/80 bg-white/90 shadow-md hover:border-slate-400' 
                          : 'border-slate-200/60 bg-white/70 shadow-sm'
                    }`}
                  >
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img 
                        src={card.imageUrl} 
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 via-40% to-transparent" />
                    </div>

                    <div className="flex-1" />

                    <div className="relative z-10 flex flex-col gap-1 text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-black text-sky-700 bg-sky-50/95 border border-sky-200/90 px-1.5 py-0.2 rounded shadow-xs">
                          {card.num || (i + 1 < 10 ? `0${i + 1}` : `${i + 1}`)}
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-sky-600 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-slate-600 line-clamp-2 leading-relaxed font-medium">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
