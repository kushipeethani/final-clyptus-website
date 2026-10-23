import React from 'react';
import { X, ShieldCheck, FileText, HelpCircle, BookOpen, Cookie } from 'lucide-react';

interface ResourceModalProps {
  type: 'privacy' | 'terms' | 'cookies' | 'faqs' | 'insights' | null;
  onClose: () => void;
  onNavigateContact?: () => void;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({ type, onClose, onNavigateContact }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none">
      <div 
        className="relative w-full max-w-4xl max-h-[88vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 lg:p-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 backdrop-blur-sm sticky top-0 z-10 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
              {type === 'privacy' && <ShieldCheck className="w-5 h-5" />}
              {type === 'terms' && <FileText className="w-5 h-5" />}
              {type === 'cookies' && <Cookie className="w-5 h-5" />}
              {type === 'faqs' && <HelpCircle className="w-5 h-5" />}
              {type === 'insights' && <BookOpen className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-2xl font-black text-white font-sans leading-tight">
                {type === 'privacy' && 'Privacy Policy'}
                {type === 'terms' && 'Terms & Conditions'}
                {type === 'cookies' && 'Cookie Policy'}
                {type === 'faqs' && 'Frequently Asked Questions (FAQs)'}
                {type === 'insights' && 'Enterprise Insights'}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                Clyptus Enterprise Legal & Resource Center
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm font-sans leading-relaxed text-slate-300">
          {type === 'privacy' && (
            <div className="space-y-6">
              <section className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <h4 className="text-base font-extrabold text-white mb-2">1. Data Privacy Commitment</h4>
                <p>
                  At Clyptus Software Solutions, we take data security and user privacy with utmost seriousness. We comply with GDPR, CCPA, and global ISO/IEC 27001 standards to ensure all client, partner, and enterprise employee data remains encrypted and safeguarded.
                </p>
              </section>

              <section className="space-y-3">
                <h4 className="text-base font-extrabold text-white">2. Information Collection & Usage</h4>
                <p>
                  We collect professional contact information provided during consultation requests, SAP ERP audit inquiries, and talent deployment registrations. This data is strictly utilized for fulfilling operational agreements and optimizing enterprise solution deliveries.
                </p>
              </section>

              <section className="space-y-3">
                <h4 className="text-base font-extrabold text-white">3. Third-Party Sharing & Storage</h4>
                <p>
                  Clyptus never sells, rents, or monetizes client or enterprise data to third parties. Data processed through our SAP Cloud and AI platforms is maintained within tier-4 certified cloud data centers with end-to-end AES-256 encryption.
                </p>
              </section>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-6">
              <section className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <h4 className="text-base font-extrabold text-white mb-2">1. Terms of Enterprise Service</h4>
                <p>
                  By utilizing Clyptus ERP transformation services, AI solutions, or IT talent deployment tools, you agree to comply with our Master Services Agreement (MSA) and standard professional conduct guidelines.
                </p>
              </section>

              <section className="space-y-3">
                <h4 className="text-base font-extrabold text-white">2. Intellectual Property Rights</h4>
                <p>
                  All proprietary SAP Rapid Deployment Solution (RDS) packages, AI agent custom models, and pre-built software accelerators created by Clyptus remain the exclusive IP of Clyptus Software Solutions, unless explicitly assigned under custom client contracts.
                </p>
              </section>

              <section className="space-y-3">
                <h4 className="text-base font-extrabold text-white">3. Service Level Agreements (SLAs)</h4>
                <p>
                  Enterprise SAP AMS and AI system uptime SLAs are maintained at 99.9% availability, monitored 24/7 by our dedicated global operations centers in India and UAE.
                </p>
              </section>
            </div>
          )}

          {type === 'cookies' && (
            <div className="space-y-6">
              <section className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <h4 className="text-base font-extrabold text-white mb-2">Cookie Usage Notice</h4>
                <p>
                  Our website uses essential performance cookies to enhance user navigation across 3D interactive stages, store session parameters, and maintain high-speed CDN delivery.
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-800/30 border border-slate-700/40">
                  <h5 className="font-extrabold text-blue-400 mb-1">Essential Cookies</h5>
                  <p className="text-xs text-slate-400">Required for website security, 3D Canvas rendering, and page routing state.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/30 border border-slate-700/40">
                  <h5 className="font-extrabold text-sky-400 mb-1">Analytics Cookies</h5>
                  <p className="text-xs text-slate-400">Helps us measure site traffic performance and refine user experience.</p>
                </div>
              </div>
            </div>
          )}

          {type === 'faqs' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <h4 className="text-base font-extrabold text-white mb-2">Q: What core SAP services does Clyptus specialize in?</h4>
                <p className="text-slate-300 text-sm">
                  Clyptus specializes in end-to-end SAP S/4HANA migration, SAP SuccessFactors HR & Payroll implementations, SAP BTP integrations, country localizations across 30+ regions, and ongoing AMS application support.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <h4 className="text-base font-extrabold text-white mb-2">Q: How does Clyptus integrate AI into enterprise operations?</h4>
                <p className="text-slate-300 text-sm">
                  We build custom autonomous AI agents for automated SAP financial audits, predictive supply chain forecasting, intelligent resume screening, and LLM-driven enterprise document processing.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <h4 className="text-base font-extrabold text-white mb-2">Q: What is the Clyptus Talent Acquisition model?</h4>
                <p className="text-slate-300 text-sm">
                  We offer flexible contract, contract-to-hire, and dedicated offshore/on-site team deployments with over 330+ vetted SAP consultants, AI engineers, and Cloud architects ready for rapid onboarding.
                </p>
              </div>
            </div>
          )}

          {type === 'insights' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-blue-500/50 transition-all">
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider block mb-2">SAP TRANSFORMATION</span>
                  <h4 className="text-base font-extrabold text-white mb-2">Migrating ECC 6.0 to SAP S/4HANA Cloud: A 2026 Roadmap</h4>
                  <p className="text-xs text-slate-400">Discover essential strategies for seamless brownfield and greenfield SAP conversions with zero business downtime.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-purple-500/50 transition-all">
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider block mb-2">ENTERPRISE AI</span>
                  <h4 className="text-base font-extrabold text-white mb-2">Building Agentic Workflows for Automated SAP Financials</h4>
                  <p className="text-xs text-slate-400">How LLM agents reduce invoice reconciliation cycle times by 80% while enhancing ERP compliance.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-medium">
            Have additional legal or enterprise questions?
          </p>
          <button
            onClick={() => {
              onClose();
              onNavigateContact?.();
            }}
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition-all shadow-md cursor-pointer"
          >
            Contact Legal & Compliance
          </button>
        </div>
      </div>
    </div>
  );
};
