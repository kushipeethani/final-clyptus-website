import React, { useEffect, useRef, useState } from 'react';

interface ScrollAnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  staggerIndex?: number;
}

export const ScrollAnimatedCard: React.FC<ScrollAnimatedCardProps> = ({
  children,
  className = '',
  style = {},
  onClick,
  staggerIndex = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [animStyle, setAnimStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transform: 'translate3d(0, 50px, 0) scale(0.93)',
    pointerEvents: 'none',
  });

  useEffect(() => {
    let ticking = false;

    const update = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Calculate center of element relative to viewport (0 = top, 0.5 = middle, 1 = bottom)
      const effectiveTop = rect.top + staggerIndex * 30;
      const center = (effectiveTop + rect.height / 2) / vh;

      let t = 1;
      let translateY = 0;

      if (center > 0.5) {
        // Entering from bottom / exiting to bottom (center ranges from 1.15 to 0.5)
        t = Math.max(0, Math.min(1, (1.15 - center) / 0.55));
        translateY = (1 - t) * 55;
      } else {
        // Leaving to top / entering from top (center ranges from 0.5 to -0.15)
        t = Math.max(0, Math.min(1, (center + 0.15) / 0.55));
        translateY = -(1 - t) * 55;
      }

      const opacity = Math.pow(t, 1.2);
      const scale = 0.93 + 0.07 * t;

      setAnimStyle({
        opacity,
        transform: `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`,
        pointerEvents: opacity > 0.2 ? 'auto' : 'none',
        willChange: 'transform, opacity',
      });
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [staggerIndex]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={{
        ...style,
        ...animStyle,
        transition: 'opacity 0.15s cubic-bezier(0.16, 1, 0.3, 1), transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={className}
    >
      {children}
    </div>
  );
};
