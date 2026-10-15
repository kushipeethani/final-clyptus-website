import React from 'react';
import { 
  Sprout, 
  Cog, 
  FlaskConical, 
  Landmark, 
  Briefcase, 
  Gem, 
  Droplet, 
  Factory, 
  ShoppingBag, 
  Pill, 
  HardHat, 
  Pickaxe, 
  Package, 
  LayoutGrid, 
  Car, 
  RefreshCw,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';

interface IndustryItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  iconBg: 'purple' | 'orange';
  solutions: string[];
}

const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'agritech',
    name: 'Agritech',
    subtitle: 'Precision Farming & Agribusiness ERP',
    description: 'Smart SAP crop-to-market traceability, AI demand forecasting, and yield analytics for modern agricultural enterprises.',
    icon: Sprout,
    iconBg: 'purple',
    solutions: ['Crop Traceability', 'AI Yield Analytics', 'Agri Supply Chain']
  },
  {
    id: 'machine-components',
    name: 'Machine Components',
    subtitle: 'Industrial Manufacturing & Assembly',
    description: 'Integrated S/4HANA Discrete Manufacturing, shop floor IoT tracking, and automated BOM management.',
    icon: Cog,
    iconBg: 'orange',
    solutions: ['S/4HANA Manufacturing', 'Shop Floor IoT', 'Automated BOM']
  },
  {
    id: 'chemical',
    name: 'Chemical',
    subtitle: 'Process Manufacturing & EHS Compliance',
    description: 'SAP Process Industry solutions, formula management, hazardous materials tracking, and regulatory compliance.',
    icon: FlaskConical,
    iconBg: 'purple',
    solutions: ['Formula Management', 'EHS Compliance', 'Batch Traceability']
  },
  {
    id: 'finance-business',
    name: 'Finance & Business',
    subtitle: 'Banking, NBFC & Financial Services',
    description: 'SAP Financial Services (FICO), automated AI invoice reconciliation, and zero-trust regulatory audit frameworks.',
    icon: Landmark,
    iconBg: 'orange',
    solutions: ['SAP FICO Core', 'AI Reconciliation', 'Regulatory Audits']
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    subtitle: 'Consulting, Legal & IT Services',
    description: 'Commercial Project Management, time & expense tracking, resource utilization analytics, and automated billing.',
    icon: Briefcase,
    iconBg: 'purple',
    solutions: ['Resource Optimization', 'Project Billing', 'Time & Expense']
  },
  {
    id: 'mines-minerals',
    name: 'Mines & Minerals',
    subtitle: 'Resource Extraction & Logistics',
    description: 'Heavy equipment telematics, pit-to-port supply chain tracking, and SAP mineral trade logistics.',
    icon: Gem,
    iconBg: 'orange',
    solutions: ['Pit-to-Port Logistics', 'Asset Maintenance', 'Trade Logistics']
  },
  {
    id: 'plastic-industries',
    name: 'Plastic Industries',
    subtitle: 'Polymers, Molding & Extrusion',
    description: 'Scrap tracking, mold lifespan analytics, SAP batch control, and energy consumption monitoring.',
    icon: Droplet,
    iconBg: 'purple',
    solutions: ['Mold Maintenance', 'Scrap Reduction', 'Energy Tracking']
  },
  {
    id: 'steel-fabrication',
    name: 'Steel & Fabrication',
    subtitle: 'Metals, Structural Fabrication & Alloys',
    description: 'Heat & coil tracking, SAP Mill Products integration, metal trade pricing, and furnace maintenance.',
    icon: Factory,
    iconBg: 'orange',
    solutions: ['Mill Products ERP', 'Heat & Coil Tracking', 'Metal Trade Pricing']
  },
  {
    id: 'retail',
    name: 'Retail',
    subtitle: 'Omnichannel & E-Commerce ERP',
    description: 'SAP Customer Activity Repository (CAR), unified inventory, AI personalized promotions, and POS integration.',
    icon: ShoppingBag,
    iconBg: 'purple',
    solutions: ['SAP CAR Retail', 'Omnichannel Inventory', 'POS Integration']
  },
  {
    id: 'pharma',
    name: 'Pharma',
    subtitle: 'Pharmaceuticals & Life Sciences',
    description: 'FDA 21 CFR Part 11 validation, cold-chain monitoring, serialisation tracking, and GxP compliance.',
    icon: Pill,
    iconBg: 'orange',
    solutions: ['GxP Compliance', 'Serialisation Tracking', 'Cold-Chain Monitoring']
  },
  {
    id: 'construction',
    name: 'Construction',
    subtitle: 'Real Estate & Infrastructure',
    description: 'SAP Project System (PS) for mega infrastructure, subcontractor billing, site equipment tracking, and safety compliance.',
    icon: HardHat,
    iconBg: 'purple',
    solutions: ['SAP Project System', 'Subcontractor Billing', 'Site Safety ERP']
  },
  {
    id: 'mining-equipments',
    name: 'Mining Equipments',
    subtitle: 'Heavy Machinery & Fleet Tech',
    description: 'Preventive fleet maintenance, field service management, spare parts forecasting, and telemetry AI.',
    icon: Pickaxe,
    iconBg: 'orange',
    solutions: ['Fleet Telematics', 'Field Service Management', 'Spare Parts AI']
  },
  {
    id: 'consumer-goods',
    name: 'Consumer Goods & Appliances',
    subtitle: 'FMCG & Electronics Supply Chain',
    description: 'Trade promotion management, high-velocity distribution ERP, warranty tracking, and AI demand sensing.',
    icon: Package,
    iconBg: 'purple',
    solutions: ['Trade Promotion ERP', 'Warranty Tracking', 'Demand Sensing AI']
  },
  {
    id: 'engineering-operations',
    name: 'Engineering, Construction & Operations',
    subtitle: 'Turnkey EPC & EPCAM Solutions',
    description: 'End-to-end EPC project control, BIM integration, site manpower scheduling, and SAP Primavera connectors.',
    icon: LayoutGrid,
    iconBg: 'orange',
    solutions: ['EPC Project Control', 'BIM SAP Connectors', 'Manpower Scheduling']
  },
  {
    id: 'automobile',
    name: 'Automobile (EV, Batteries, Semiconductors)',
    subtitle: 'Mobility, EV Ecosystems & Chips',
    description: 'Just-In-Time (JIT/JIS) automotive supply chain, EV battery lifecycle tracking, and semiconductor wafer ERP.',
    icon: Car,
    iconBg: 'purple',
    solutions: ['JIT/JIS Automotive', 'Battery Lifecycle ERP', 'Semiconductor Track']
  },
  {
    id: 'recyclable-sustainability',
    name: 'Recyclable & Sustainability',
    subtitle: 'Circular Economy & Carbon ERP',
    description: 'SAP Sustainability Footprint Management, circular waste recycling tracking, and ESG carbon credit auditing.',
    icon: RefreshCw,
    iconBg: 'orange',
    solutions: ['Carbon Footprint ERP', 'Circular Recycling', 'ESG Audit System']
  }
];

interface IndustriesPageProps {
  onNavigateContact: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigateContact }) => {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-500/20 selection:text-sky-800">
      
      {/* ---------------------------------------------------- */}
      {/* HERO SECTION                                         */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 lg:px-10 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/80">
        
        {/* Soft Ambient Background Orbs (Homepage Color Scheme) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-400/15 via-indigo-400/15 to-purple-400/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 uppercase mb-6 leading-[1.05]">
            INDUSTRIES WE <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">EMPOWER</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
            Delivering deep domain expertise with specialized SAP S/4HANA Cloud templates, autonomous AI architectures, and dedicated IT talent across 16 core global industry verticals.
          </p>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* 16 INDUSTRIES GRID (ORIGINAL REFERENCE COLOR SCHEME) */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {INDUSTRIES_DATA.map((item) => {
            const IconComponent = item.icon;
            const isPurple = item.iconBg === 'purple';

            return (
              <div
                key={item.id}
                className="group relative p-8 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_18px_35px_rgba(2,132,199,0.14)] hover:border-sky-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer min-h-[170px]"
                onClick={onNavigateContact}
              >
                {/* Icon Badge (Matches Reference Image Alternating Lavender & Peach Palette) */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-xs ${
                    isPurple
                      ? 'bg-indigo-100/90 border border-indigo-200/70 text-indigo-600'
                      : 'bg-orange-100/90 border border-orange-200/70 text-orange-600'
                  }`}
                >
                  <IconComponent className="w-7 h-7 stroke-[1.8]" />
                </div>

                {/* Industry Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-sky-600 transition-colors">
                  {item.name}
                </h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* WHY CLYPTUS FOR YOUR INDUSTRY                        */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-slate-100/80 border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Why Global Enterprises Partner With Clyptus
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">5+ Industry RDS Packages</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Pre-configured Rapid Deployment Solution (RDS) packages reducing S/4HANA go-live timelines by up to 40%.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">30+ Country Localizations</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Deep compliance, tax, and regional regulatory localizations across UAE, GCC, India, Europe, and Americas.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">ISO 27001 Certified Security</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Bank-grade encryption and military-level data privacy compliance across all multi-tenant and private cloud systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
