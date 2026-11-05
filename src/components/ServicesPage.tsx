import React from 'react';
import { motion } from 'framer-motion';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
  onNavigateContact?: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onNavigateContact }) => {
  const cards = [
    {
      id: 'ai',
      title: 'Artificial Intelligence',
      sublines: 'Custom Generative AI models, autonomous LLM agents, predictive intelligence, and enterprise-grade machine learning pipelines.',
      isSapTrigger: false,
      isAiTrigger: true,
      image: '/recruitment_3d_ai_talent.jpg'
    },
    {
      id: 'cloud',
      title: 'Cloud Services',
      sublines: 'Resilient multi-cloud architectures, scalable real-time modern data pipelines, zero-downtime migrations, and enterprise governance.',
      isSapTrigger: false,
      isAiTrigger: false,
      isCloudTrigger: true,
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'crm',
      title: 'CRM Services',
      sublines: 'Unified customer journey orchestration, omnichannel sales and service architectures, and automated revenue operations.',
      isSapTrigger: false,
      isAiTrigger: false,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'security',
      title: 'Cyber Security',
      sublines: 'Zero-trust enterprise defense, threat detection, cloud security posture management, and continuous compliance monitoring.',
      isSapTrigger: false,
      isAiTrigger: false,
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'data-engineering',
      title: 'Data Engineering',
      sublines: 'Modern streaming architectures, distributed ETL/ELT pipelines, real-time data warehouses, and robust enterprise data lakes.',
      isSapTrigger: false,
      isAiTrigger: false,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'erp',
      title: 'ERP Services',
      sublines: 'Comprehensive SAP S/4HANA implementations, cloud migrations, clean-core architectures, and full lifecycle support for global enterprises.',
      isSapTrigger: true,
      isAiTrigger: false,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'salesforce',
      title: 'Salesforce Services',
      sublines: 'End-to-end Salesforce CRM consulting, Sales & Service Cloud customization, Lightning development, ecosystem integrations, and managed support.',
      isSapTrigger: false,
      isAiTrigger: false,
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  const handleCardClick = (card: typeof cards[0]) => {
    if (card.isSapTrigger) {
      onNavigate('SAP');
    } else if (card.isAiTrigger) {
      onNavigate('AI');
    } else if (card.isCloudTrigger) {
      onNavigate('Cloud');
    } else if (card.id === 'security') {
      onNavigate('Security');
    } else if (card.id === 'crm') {
      onNavigate('CRM');
    } else if (card.id === 'salesforce') {
      onNavigate('Salesforce');
    } else if (card.id === 'data-engineering') {
      onNavigate('DataEngineering');
    } else if (onNavigateContact) {
      onNavigateContact();
    } else {
      onNavigate('Contact');
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-68px)] bg-slate-50 flex flex-col justify-start py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans select-none">
      {/* Top Banner / Heading (Clearly separated above the cards with ample margin) */}
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 shrink-0">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Core Enterprise &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">
            Digital Services
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto mt-3 leading-relaxed">
          Intelligent technology solutions built for future-ready businesses. Select a practice to explore full capabilities.
        </p>
      </div>

      {/* 6 Separate Cards Grid (Balanced 3-column responsive layout, clean spacing) */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-6 w-full">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleCardClick(card)}
              className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border transition-all duration-300 cursor-pointer ${
                card.isSapTrigger
                  ? 'border-sky-200/90 shadow-md hover:shadow-xl hover:border-sky-500 hover:-translate-y-1.5 ring-1 ring-sky-500/10'
                  : card.isAiTrigger
                  ? 'border-indigo-200/90 shadow-md hover:shadow-xl hover:border-indigo-500 hover:-translate-y-1.5 ring-1 ring-indigo-500/10'
                  : 'border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1.5'
              }`}
            >
              <div>
                {/* Clean Image Banner */}
                <div className="relative w-full h-44 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden mb-5 bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                </div>

                {/* Card Title */}
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-sky-600 transition-colors">
                  {card.title}
                </h2>

                {/* Concise Sublines */}
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-2.5">
                  {card.sublines}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
