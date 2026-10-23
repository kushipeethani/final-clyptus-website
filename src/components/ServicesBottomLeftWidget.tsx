import React, { useState, useRef, useEffect } from 'react';
import { Database, Users, Cpu, Send, ArrowUpRight, X } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  icon: React.ElementType;
  brandColor: string;
  hoverBg: string;
  description: string;
}

const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'sap',
    title: 'ERP Services',
    badge: 'S/4HANA & BTP',
    icon: Database,
    brandColor: 'text-sky-600',
    hoverBg: 'hover:bg-sky-600 hover:text-white hover:border-sky-600 shadow-sky-500/30',
    description: 'S/4HANA Migrations, BTP Cloud Integration & BRIM Staffing Solutions.',
  },
  {
    id: 'recruiting',
    title: 'IT Recruiting',
    badge: 'Senior Talent Search',
    icon: Users,
    brandColor: 'text-orange-600',
    hoverBg: 'hover:bg-orange-600 hover:text-white hover:border-orange-600 shadow-orange-500/30',
    description: 'Top 1% Senior Tech Talent, SAP Consultants & Executive Staffing.',
  },
  {
    id: 'ai',
    title: 'AI & GenAI',
    badge: 'Custom LLM Agents',
    icon: Cpu,
    brandColor: 'text-purple-600',
    hoverBg: 'hover:bg-purple-600 hover:text-white hover:border-purple-600 shadow-purple-500/30',
    description: 'Generative AI Pipelines, Custom LLM Agents & Machine Learning.',
  },
];

interface ServicesBottomLeftWidgetProps {
  onSelectService?: (serviceId: string) => void;
}

export const ServicesBottomLeftWidget: React.FC<ServicesBottomLeftWidgetProps> = ({ onSelectService }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close active detail modal and orbital menu on outside click/touch
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveModalService(null);
        setIsExpanded(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleServiceClick = (srv: ServiceItem) => {
    setIsExpanded(false);
    if (srv.id === 'sap') {
      if (onSelectService) {
        onSelectService('sap');
      }
    } else if (srv.id === 'ai') {
      if (onSelectService) {
        onSelectService('ai');
      }
    } else if (srv.id === 'recruiting') {
      if (onSelectService) {
        onSelectService('recruiting');
      }
    } else {
      setActiveModalService(srv);
    }
  };

  return (
    <div ref={containerRef} className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 font-sans select-none overflow-visible">
      
      {/* Detail Card Overlay Modal for Non-SAP Services */}
      {activeModalService && (
        <div className="absolute bottom-16 sm:bottom-20 left-0 w-[calc(100vw-32px)] sm:w-80 max-w-sm bg-white/98 rounded-3xl p-5 border border-slate-200 shadow-2xl z-50 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
              <span className="text-[10px] font-mono font-bold text-sky-600 uppercase">
                PRACTICE OVERVIEW
              </span>
              <button
                onClick={() => setActiveModalService(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                <activeModalService.icon className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">{activeModalService.title}</h3>
                <span className="text-[10px] font-mono text-slate-500 font-semibold">{activeModalService.badge}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
              {activeModalService.description}
            </p>
          </div>

          <button
            onClick={() => {
              setActiveModalService(null);
              const contactEl = document.getElementById('contact');
              if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-sky-600 transition-colors"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* UIVERSE-STYLE EXPANDING FLOATING TOOLTIP BUTTON      */}
      {/* ---------------------------------------------------- */}
      <div className="relative group/main overflow-visible">
        
        {/* Invisible Hover Safety Bridge to prevent losing hover when moving cursor */}
        <div className="absolute -top-[200px] sm:-top-24 -right-44 sm:-right-28 -bottom-4 -left-4 pointer-events-none group-hover/main:pointer-events-auto z-0" />

        {/* -------------------------------------------------- */}
        {/* 3 FLOATING SERVICE ORBIT ICONS                      */}
        {/* -------------------------------------------------- */}

        {/* 1. SAP (Bottom-most on mobile stack / Top on desktop) */}
        <div className={`absolute top-0 left-0 transition-all duration-500 cubic-bezier(0.34,1.56,0.64,1) z-20 ${
          isExpanded 
            ? 'opacity-100 scale-100 pointer-events-auto -translate-y-[64px] translate-x-0 sm:-translate-y-20 sm:translate-x-0.5' 
            : 'opacity-0 pointer-events-none scale-75 group-hover/main:opacity-100 group-hover/main:scale-100 group-hover/main:pointer-events-auto -translate-y-0 translate-x-0 group-hover/main:-translate-y-[64px] group-hover/main:translate-x-0 sm:group-hover/main:-translate-y-20 sm:group-hover/main:translate-x-0.5'
        }`}>
          <div className="relative group/item flex items-center">
            {/* Tooltip Label Badge */}
            <button
              type="button"
              onClick={() => handleServiceClick(SERVICES_LIST[0])}
              className={`absolute left-14 top-1/2 -translate-y-1/2 sm:top-auto sm:-top-8 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-0 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[10px] font-mono font-bold whitespace-nowrap shadow-md transition-all duration-200 cursor-pointer sm:cursor-default ${
                isExpanded 
                  ? 'opacity-100 pointer-events-auto' 
                  : 'opacity-0 pointer-events-none group-hover/main:opacity-100 group-hover/main:pointer-events-auto sm:group-hover/main:opacity-0 sm:group-hover/main:pointer-events-none sm:group-hover/item:opacity-100 sm:group-hover/item:pointer-events-auto'
              }`}
            >
              ERP Services
            </button>

            {/* Circular Icon Button */}
            <button
              onClick={() => handleServiceClick(SERVICES_LIST[0])}
              className={`w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-sky-600 transition-all duration-300 ${SERVICES_LIST[0].hoverBg} active:scale-95 cursor-pointer`}
              title="ERP Services"
            >
              <Database className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* 2. IT Recruiting (Middle on mobile stack / Diagonal top-right on desktop) */}
        <div className={`absolute top-0 left-0 transition-all duration-500 delay-[60ms] cubic-bezier(0.34,1.56,0.64,1) z-20 ${
          isExpanded
            ? 'opacity-100 scale-100 pointer-events-auto -translate-y-[124px] translate-x-0 sm:-translate-y-14 sm:translate-x-14'
            : 'opacity-0 pointer-events-none scale-75 group-hover/main:opacity-100 group-hover/main:scale-100 group-hover/main:pointer-events-auto -translate-y-0 translate-x-0 group-hover/main:-translate-y-[124px] group-hover/main:translate-x-0 sm:group-hover/main:-translate-y-14 sm:group-hover/main:translate-x-14'
        }`}>
          <div className="relative group/item flex items-center">
            {/* Tooltip Label Badge */}
            <button
              type="button"
              onClick={() => handleServiceClick(SERVICES_LIST[1])}
              className={`absolute left-14 top-1/2 -translate-y-1/2 sm:top-auto sm:-top-8 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-0 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[10px] font-mono font-bold whitespace-nowrap shadow-md transition-all duration-200 cursor-pointer sm:cursor-default ${
                isExpanded
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none group-hover/main:opacity-100 group-hover/main:pointer-events-auto sm:group-hover/main:opacity-0 sm:group-hover/main:pointer-events-none sm:group-hover/item:opacity-100 sm:group-hover/item:pointer-events-auto'
              }`}
            >
              IT Recruiting
            </button>

            {/* Circular Icon Button */}
            <button
              onClick={() => handleServiceClick(SERVICES_LIST[1])}
              className={`w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-orange-600 transition-all duration-300 ${SERVICES_LIST[1].hoverBg} active:scale-95 cursor-pointer`}
              title="IT Recruiting"
            >
              <Users className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* 3. AI & GenAI (Top-most on mobile stack / Right side on desktop) */}
        <div className={`absolute top-0 left-0 transition-all duration-500 delay-[120ms] cubic-bezier(0.34,1.56,0.64,1) z-20 ${
          isExpanded
            ? 'opacity-100 scale-100 pointer-events-auto -translate-y-[184px] translate-x-0 sm:translate-y-1 sm:translate-x-20'
            : 'opacity-0 pointer-events-none scale-75 group-hover/main:opacity-100 group-hover/main:scale-100 group-hover/main:pointer-events-auto -translate-y-0 translate-x-0 group-hover/main:-translate-y-[184px] group-hover/main:translate-x-0 sm:group-hover/main:translate-y-1 sm:group-hover/main:translate-x-20'
        }`}>
          <div className="relative group/item flex items-center">
            {/* Tooltip Label Badge */}
            <button
              type="button"
              onClick={() => handleServiceClick(SERVICES_LIST[2])}
              className={`absolute left-14 top-1/2 -translate-y-1/2 sm:top-auto sm:-top-8 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-0 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[10px] font-mono font-bold whitespace-nowrap shadow-md transition-all duration-200 cursor-pointer sm:cursor-default ${
                isExpanded
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none group-hover/main:opacity-100 group-hover/main:pointer-events-auto sm:group-hover/main:opacity-0 sm:group-hover/main:pointer-events-none sm:group-hover/item:opacity-100 sm:group-hover/item:pointer-events-auto'
              }`}
            >
              AI & GenAI
            </button>

            {/* Circular Icon Button */}
            <button
              onClick={() => handleServiceClick(SERVICES_LIST[2])}
              className={`w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-purple-600 transition-all duration-300 ${SERVICES_LIST[2].hoverBg} active:scale-95 cursor-pointer`}
              title="AI & GenAI"
            >
              <Cpu className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* MAIN TRIGGER BUTTON (BLUE GRADIENT -> WHITE ON HOVER/OPEN) */}
        {/* -------------------------------------------------- */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 transition-all duration-500 z-10 active:scale-95 cursor-pointer ${
            isExpanded
              ? 'bg-white border-sky-400 text-sky-600 shadow-xl'
              : 'bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-600 text-white border-transparent shadow-[0_10px_30px_rgba(37,99,235,0.35)] group-hover/main:bg-white group-hover/main:border-sky-400 group-hover/main:text-sky-600 group-hover/main:shadow-xl'
          }`}
          title="Quick Services Menu"
          aria-label="Quick Services Menu"
        >
          {/* Subtle Outer Pulsing Aura */}
          <span className={`absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 blur-md transition-opacity animate-pulse ${
            isExpanded ? 'opacity-0' : 'opacity-30 group-hover/main:opacity-0'
          }`} />

          {/* Main Icon (Send or Close X) */}
          {isExpanded ? (
            <X className="relative z-10 w-6 h-6 text-sky-600 stroke-[2.5] transition-all" />
          ) : (
            <Send className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-white group-hover/main:text-sky-600 group-hover/main:rotate-45 transition-all duration-500 stroke-[2.2]" />
          )}
        </button>

      </div>
    </div>
  );
};
