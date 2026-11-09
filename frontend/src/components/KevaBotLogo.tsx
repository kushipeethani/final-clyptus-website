import React from 'react';

interface KevaBotLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Exact Keva AI Logo matching the custom sparkle speech-bubble robot emblem:
 * - Outer capsule speech bubble with bottom-left pointer tail
 * - Concentric gap contour
 * - Inner visor capsule
 * - Two 4-point sparkle stars for eyes
 * - Three floating 4-point sparkle stars on top
 */
export const KevaBotLogo: React.FC<KevaBotLogoProps> = ({ 
  className = 'w-5 h-5', 
  style 
}) => {
  return (
    <svg
      viewBox="100 50 750 850"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Outer Speech Bubble (Clockwise) with Inner Gap Cutout (evenodd) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M 342 374
          L 605 374
          A 203 203 0 0 1 808 577
          A 203 203 0 0 1 605 780
          L 517 780
          L 300 875
          L 300 776
          A 203 203 0 0 1 138 577
          A 203 203 0 0 1 342 374
          Z
          M 342 422
          A 155 155 0 0 0 187 577
          A 155 155 0 0 0 342 732
          L 605 732
          A 155 155 0 0 0 760 577
          A 155 155 0 0 0 605 422
          Z
        "
      />
      {/* Inner Visor with Two 4-Point Sparkle Eye Cutouts */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M 343 465
          L 605 465
          A 112 112 0 0 1 717 577
          A 112 112 0 0 1 605 689
          L 343 689
          A 112 112 0 0 1 231 577
          A 112 112 0 0 1 343 465
          Z
          M 358 522
          Q 358 571 309 571
          Q 358 571 358 620
          Q 358 571 407 571
          Q 358 571 358 522
          Z
          M 590 522
          Q 590 571 541 571
          Q 590 571 590 620
          Q 590 571 639 571
          Q 590 571 590 522
          Z
        "
      />
      {/* Three Floating 4-Point Sparkle Stars on Top */}
      {/* Star 1: Top Center (Small) */}
      <path d="M 424 73 Q 424 104 455 104 Q 424 104 424 135 Q 424 104 393 104 Q 424 104 424 73 Z" />
      {/* Star 2: Top Right (Large) */}
      <path d="M 538 139 Q 538 216 615 216 Q 538 216 538 293 Q 538 216 461 216 Q 538 216 538 139 Z" />
      {/* Star 3: Mid Left (Medium) */}
      <path d="M 382 247 Q 382 296 431 296 Q 382 296 382 345 Q 382 296 333 296 Q 382 296 382 247 Z" />
    </svg>
  );
};

export default KevaBotLogo;
