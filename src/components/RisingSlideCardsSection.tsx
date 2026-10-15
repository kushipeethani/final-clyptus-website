import React, { useEffect, useRef, useState } from 'react';
import { RoadTimelineSection } from './RoadTimelineSection';

interface ProjectCard {
  id: number;
  type: 'text' | 'photo';
  category: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  linkText: string;
  badge?: string;
}

const PORTFOLIO_CARDS: ProjectCard[] = [
  // Pair 1: Text Panel + Photo Panel (CEO)
  {
    id: 1,
    type: 'text',
    category: 'CLYPTUS LEADERSHIP',
    title: 'Meet Our Chief\nExecutive Officer',
    linkText: 'EXECUTIVE LEADERSHIP',
  },
  {
    id: 2,
    type: 'photo',
    category: 'CHIEF EXECUTIVE OFFICER',
    title: 'Vamsi Krishna Are',
    subtitle: 'Vamsi Krishna Are',
    description: 'Chief Executive Officer leading Clyptus Software Solutions towards enterprise AI & cloud innovation.',
    imageUrl: '/ceo_vamsi_krishna.png',
    linkText: 'EXPLORE PROFILE',
    badge: 'CHIEF EXECUTIVE OFFICER • CLYPTUS',
  },

  // Pair 2: Text Panel + Photo Panel (Manager)
  {
    id: 3,
    type: 'text',
    category: 'CLYPTUS MANAGEMENT',
    title: 'Our\nManager',
    linkText: 'MANAGEMENT TEAM',
  },
  {
    id: 4,
    type: 'photo',
    category: 'OPERATIONS MANAGER',
    title: 'Satya Narayana K',
    subtitle: 'Satya Narayana K',
    description: 'Leading cross-functional engineering teams to ensure seamless delivery and client satisfaction.',
    imageUrl: '/operations_manager.png',
    linkText: 'EXPLORE PROFILE',
    badge: 'OPERATIONS MANAGER • CLYPTUS',
  },

  // Pair 3: Text Panel + Photo Panel (Project Manager)
  {
    id: 5,
    type: 'text',
    category: 'PROJECT MANAGEMENT',
    title: 'Project\nManager',
    linkText: 'PROJECT LEADERSHIP',
  },
  {
    id: 6,
    type: 'photo',
    category: 'PROJECT MANAGER',
    title: 'Nandhini P',
    subtitle: 'Nandhini P',
    description: 'Leading project execution, milestone delivery, and client engagement for enterprise solutions.',
    imageUrl: '/project_manager.png',
    linkText: 'EXPLORE PROFILE',
    badge: 'PROJECT MANAGER • CLYPTUS',
  },

];

// Continuous linear card slide progress as user scrolls down without freeze plateaus
const getFrozenCardsProgress = (rawP: number): number => {
  return rawP;
};

export const RisingSlideCardsSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [rawScrollProgress, setRawScrollProgress] = useState<number>(0);
  const [smoothScrollProgress, setSmoothScrollProgress] = useState<number>(0);

  // RAF sampling of raw scroll track progress
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
              const p = Math.max(0, Math.min(1, scrolled / totalDist));
              setRawScrollProgress(p);
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

  // Smooth lerp interpolation loop for silky smooth card motion
  useEffect(() => {
    let animId: number;
    let current = smoothScrollProgress;

    const loop = () => {
      current += (rawScrollProgress - current) * 0.14;
      setSmoothScrollProgress(current);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [rawScrollProgress]);

  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalCards = PORTFOLIO_CARDS.length;
  const isMobile = windowWidth < 768;
  const cardWidthVw = isMobile ? 100 : 50;
  const visibleCardsCount = isMobile ? 1 : 2;

  // Breakdown of scroll phases over 1600vh track:
  // Phase 1 (0.00 -> 0.38): Feature Cards Freeze & Slide Animation (Cards 1 & 2 freeze first, then 3 & 4, then 5 & 6)
  // Phase 2 (0.38 -> 0.45): Curtain Transition - Cards Layer slides completely left (curtainOpenProgress 0 -> 1)
  // Phase 3 (0.45 -> 1.00): 3D Milestone Timeline driving animation (generous 55% budget for a smooth drive)

  const rawCardsP = Math.min(1, smoothScrollProgress / 0.38);
  const cardsProgress = getFrozenCardsProgress(rawCardsP);
  const curtainOpenProgress = Math.max(0, Math.min(1, (smoothScrollProgress - 0.38) / 0.07));
  const isCurtainFullyOpen = curtainOpenProgress >= 1;

  // Guarantee 3D Timeline animation stays strictly at 0 until curtain transition is 100% complete
  const timelineDriveProgress = !isCurtainFullyOpen 
    ? 0 
    : Math.max(0, Math.min(1, (smoothScrollProgress - 0.45) / 0.55));

  const maxShiftVw = (totalCards - visibleCardsCount) * cardWidthVw; 
  const currentShiftVw = cardsProgress * maxShiftVw;

  return (
    /* Outer Pinned Scroll Track (Shorter on mobile to prevent excessive scrolling) */
    <div ref={trackRef} className={`relative w-full ${isMobile ? 'h-[600vh]' : 'h-[1600vh]'} bg-[#e9e8e3] select-none font-sans border-t border-slate-300/60`}>
      {/* Sticky Full-Screen Viewport Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* UNDERNEATH LAYER (Z-0): 3D Journey Milestone Timeline (Revealed under curtain) */}
        <div className={`absolute inset-0 z-0 w-full h-full ${!isCurtainFullyOpen ? 'pointer-events-none' : ''}`}>
          <RoadTimelineSection externalProgress={timelineDriveProgress} isFrozen={!isCurtainFullyOpen} />
        </div>

        {/* CURTAIN LAYER (Z-10): Feature Cards Layer (Slides left like a theater curtain when opened) */}
        <div 
          className="absolute inset-0 z-10 w-full h-full bg-[#e9e8e3] pt-16 sm:pt-24 pb-4 overflow-hidden shadow-2xl transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${-curtainOpenProgress * 100}%, 0, 0)`,
            willChange: 'transform',
          }}
        >
          {/* Horizontal Card Track container with 0 gap */}
          <div className="flex w-full h-full gap-0 flex-nowrap relative">
            {PORTFOLIO_CARDS.map((card, idx) => {
              const cardBaseX = idx * cardWidthVw; // in vw
              const currentPosX = cardBaseX - currentShiftVw; // in vw

              // 1. Entrance Math: Rise UP from bottom-right (for cards entering from the right)
              let riseY = 0; // in vh
              if (currentPosX > cardWidthVw) {
                const distanceToViewportRight = currentPosX - cardWidthVw;
                riseY = Math.min(85, distanceToViewportRight * 1.6);
              }

              // 2. Exit Math: Slide DOWN to bottom-left (for cards exiting past the left edge)
              let exitY = 0; // in vh
              let exitX = 0; // in vw
              if (currentPosX < 0) {
                const distancePastLeftEdge = Math.abs(currentPosX);
                exitY = Math.min(85, distancePastLeftEdge * 1.6); // slides down to bottom
                exitX = -distancePastLeftEdge * 0.4; // slides further left
              }

              const totalX = currentPosX + exitX;
              const totalY = riseY + exitY;

              return (
                <div
                  key={card.id}
                  style={{
                    transform: `translate3d(${totalX}vw, ${totalY}vh, 0)`,
                    willChange: 'transform',
                  }}
                  className="absolute top-0 bottom-0 left-0 w-full md:w-1/2 md:min-w-[50vw] h-full shrink-0 flex flex-col justify-between p-6 sm:p-12 lg:p-16 border-r border-slate-300/40 bg-[#e9e8e3] text-slate-900 overflow-hidden group transition-all duration-75 ease-out"
                >
                  {card.type === 'text' ? (
                    /* TEXT PANEL */
                    <div className="w-full h-full flex flex-col justify-center items-start text-left z-10 px-2 sm:px-6">
                      <span className="text-xs sm:text-xs font-mono font-extrabold text-sky-600 tracking-wider uppercase mb-3 sm:mb-4 bg-sky-100/60 px-3.5 py-1.5 rounded-full border border-sky-200/50">
                        {card.category}
                      </span>
                      <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-[#1a1a1a] tracking-tight leading-[1.05] whitespace-pre-line mb-5 sm:mb-4">
                        {card.title}
                      </h2>
                    </div>
                  ) : (
                    /* PHOTO PANEL (Proportioned Executive Card on Mobile, Full-Height Split Card on Desktop) */
                    <div className="w-full h-full flex flex-col justify-center items-center z-10 px-2 sm:px-0">
                      {/* Card Graphic Frame */}
                      <div className="relative w-full max-w-[290px] sm:max-w-none h-auto max-h-[50vh] sm:max-h-none sm:h-full aspect-[3/4] sm:aspect-auto rounded-2xl overflow-hidden bg-slate-200 shadow-xl sm:shadow-sm border border-slate-300/40 my-auto">
                        {card.imageUrl ? (
                          <img
                            src={card.imageUrl}
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />
                        )}
                        
                        {/* Gradient Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                        {/* Overlay Title inside Image */}
                        {card.subtitle && (
                          <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6">
                            <span className="text-xs sm:text-xs font-mono font-extrabold text-sky-400 uppercase tracking-wider mb-1.5 block drop-shadow">
                              {card.category}
                            </span>
                            <h3 className="text-2xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-md">
                              {card.subtitle}
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
