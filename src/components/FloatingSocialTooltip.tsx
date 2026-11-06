import React, { useState, useRef, useEffect } from 'react';

export const FloatingSocialTooltip: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking or tapping outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/clyptus/posts/',
      // Top position on hover
      position: 'group-hover:-translate-y-20 group-hover:translate-x-0',
      activePosition: '-translate-y-20 translate-x-0',
      colorClass: 'text-[#0077b5] hover:!bg-[#0077b5] hover:!text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/19amDstBuo/',
      // Top-Left 45deg position on hover
      position: 'group-hover:-translate-y-15 group-hover:-translate-x-11',
      activePosition: '-translate-y-15 -translate-x-11',
      colorClass: 'text-[#1877f2] hover:!bg-[#1877f2] hover:!text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.63 13.77 5.63c1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/',
      // Mid-Left 75deg position on hover (inward, fully visible)
      position: 'group-hover:-translate-y-7 group-hover:-translate-x-18',
      activePosition: '-translate-y-7 -translate-x-18',
      colorClass: 'text-[#ff0000] hover:!bg-[#ff0000] hover:!text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.89-.44 5.1-.28 1.2-.84 1.95-1.68 2.24-.47.13-1.23.22-2.3.28-1.07.06-2.22.1-3.46.1L12 19.7c-3.46 0-5.41-.08-6.12-.24-.84-.29-1.4-1.04-1.68-2.24-.28-1.21-.44-2.91-.44-5.1 0-.6.03-1.29.1-2.09.06-.8.15-1.43.28-1.9.29-1.2.85-1.96 1.68-2.25C6.53 5.76 8.48 5.68 12 5.68c3.52 0 5.47.08 6.18.24.84.29 1.4 1.05 1.68 2.25z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/clyptussoftwaresolutions?vrfl=c2JucW9hcGRrZWts',
      // Bottom-Left position on hover
      position: 'group-hover:translate-y-6 group-hover:-translate-x-18',
      activePosition: 'translate-y-6 -translate-x-18',
      colorClass: 'text-[#e4405f] hover:!bg-gradient-to-tr hover:!from-[#f09433] hover:!via-[#dc2743] hover:!to-[#bc1888] hover:!text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <div ref={containerRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group flex items-center justify-center select-none">
      
      {/* Invisible Hover Helper Region (.tooltip9) - Prevents hover flicker when moving mouse to floating icons */}
      <div className="absolute w-44 h-44 rounded-full -inset-14 opacity-0 group-hover:pointer-events-auto pointer-events-none z-0" />

      {/* Floating Brand Social Icons */}
      {socialLinks.map((item, index) => (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
          style={{ transitionDelay: `${index * 40}ms` }}
          className={`absolute w-10 h-10 rounded-full bg-white shadow-xl border border-slate-200/80 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 ${item.colorClass} ${
            isOpen 
              ? `opacity-100 scale-100 pointer-events-auto ${item.activePosition}` 
              : `opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-50 pointer-events-none group-hover:pointer-events-auto ${item.position}`
          }`}
        >
          {item.icon}
        </a>
      ))}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Connect With Us"
        className={`relative z-20 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ease-out active:scale-95 cursor-pointer overflow-hidden ${
          isOpen
            ? 'bg-white text-blue-600 border border-slate-200 shadow-blue-500/20'
            : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 group-hover:bg-white text-white group-hover:text-blue-600 shadow-blue-600/40 border border-white/20 group-hover:border-slate-200'
        }`}
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          {/* Default Icon (Globe / World Network Icon) */}
          <svg
            className={`w-6 h-6 absolute transition-all duration-500 transform ${
              isOpen
                ? 'rotate-90 opacity-0 scale-50'
                : 'group-hover:rotate-90 group-hover:opacity-0 group-hover:scale-50 text-white group-hover:text-blue-600'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9 9 0 100-18 9 9 0 000 18z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.6 9h16.8M3.6 15h16.8"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18"
            />
          </svg>

          {/* Hover / Active Open Symbol (Close X) */}
          <svg
            className={`w-6 h-6 absolute transition-all duration-500 transform text-blue-600 ${
              isOpen
                ? 'rotate-0 opacity-100 scale-100'
                : '-rotate-90 opacity-0 scale-50 group-hover:rotate-0 group-hover:opacity-100 group-hover:scale-100'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </button>

    </div>
  );
};

