import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Building2,
  Compass,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { ClyptusInteractiveGlobe, CLYPTUS_OFFICES } from './ClyptusInteractiveGlobe';

export const ContactSection: React.FC = () => {
  const [selectedOfficeId, setSelectedOfficeId] = useState<'hyderabad' | 'dubai' | 'usa' | null>(null);
  const [hoveredOfficeId, setHoveredOfficeId] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'AI Solutions & Agentic Pipelines',
    message: '',
    _company_website: '',
  });

  const selectedOffice = (selectedOfficeId && CLYPTUS_OFFICES.find((o) => o.id === selectedOfficeId)) || CLYPTUS_OFFICES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Client-side field validations
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setSubmitError('Please enter your full name (minimum 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setSubmitError('Please provide a valid corporate email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setSubmitError('Please describe your requirements in at least 10 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service,
          message: formData.message.trim(),
          _company_website: formData._company_website,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFormSubmitted(true);
        setSubmitError(null);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'AI Solutions & Agentic Pipelines',
          message: '',
          _company_website: '',
        });
      } else {
        // Preserve user inputs on error!
        setSubmitError(data.error || 'Failed to submit inquiry. Please try again or email contact@clyptus.com.');
      }
    } catch {
      // Network error: preserve user inputs!
      setSubmitError('Network error connecting to inquiry server. Please check your connection or reach out at contact@clyptus.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const indianBranches = [
    { name: 'Hyderabad', role: 'Head Office & Global Delivery', tag: 'HQ' },
    { name: 'Bengaluru', role: 'AI & Cloud Development Lab', tag: 'Tech Hub' },
    { name: 'Chennai', role: 'Enterprise Systems & Offshore', tag: 'Delivery' },
    { name: 'Vijayawada', role: 'Regional Delivery Center', tag: 'Branch' },
    { name: 'Indore', role: 'Central India Operations', tag: 'Branch' },
  ];

  return (
    <section
      id="contact"
      className="w-full min-h-screen bg-gradient-to-b from-white via-slate-50 to-sky-50/30 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 select-none relative overflow-hidden"
    >
      {/* Background Soft Atmospheric Glow Gradients */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">

        {/* Top Header Section */}
        <div className="text-center flex flex-col items-center gap-3.5 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Let’s Build Something <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Great Together
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Connect directly with our engineering, SAP ERP, and talent leaders across India and the Middle East. Explore our global offices in real-time on the 3D globe.
          </p>
        </div>

        {/* MAIN SPLIT LAYOUT: LEFT CONTENT & FORM | RIGHT 3D ROTATING GLOBE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT COLUMN: INTRO, BRANCH SELECTOR, ACTIVE LOCATION CARD & CONTACT FORM */}
          <div className="lg:col-span-6 flex flex-col gap-6 order-2 lg:order-1">

            {/* Office Switcher Tabs */}
            <div className="p-2 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-1.5">
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase px-3 py-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sky-600" />
                Select Hub:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  id="hub-tab-overview"
                  onClick={() => setSelectedOfficeId(null)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${selectedOfficeId === null
                    ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-400'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                    }`}
                  title="Global Overview"
                >
                  <span>Overview</span>
                </button>
                {CLYPTUS_OFFICES.map((office) => {
                  const isSelected = selectedOfficeId === office.id;
                  return (
                    <button
                      key={office.id}
                      id={`hub-tab-${office.id}`}
                      onClick={() => setSelectedOfficeId(isSelected ? null : office.id)}
                      onMouseEnter={() => setHoveredOfficeId(office.id)}
                      onMouseLeave={() => setHoveredOfficeId(null)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${isSelected
                        ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-300'
                        : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                        }`}
                    >
                      <span>{office.city}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Office Glassmorphism Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedOffice.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-md border border-sky-100/80 shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
              >
                {/* Accent Corner Glow */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: selectedOffice.color }}
                />

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full text-sky-700 bg-sky-50 border border-sky-200 uppercase mb-2">
                      {selectedOffice.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                      {selectedOffice.label}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {selectedOffice.description}
                    </p>
                  </div>

                  <a
                    href={selectedOffice.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition-all border border-sky-200 shrink-0"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Office Details */}
                <div className="flex flex-col gap-3 pt-3 border-t border-slate-100 text-xs text-slate-700 font-medium">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{selectedOffice.address}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Email Channels</span>
                      {selectedOffice.emails.map((email, idx) => (
                        <a
                          key={idx}
                          href={`mailto:${email}`}
                          className="inline-flex items-center gap-1.5 font-bold text-slate-800 hover:text-sky-600 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-sky-600" />
                          <span>{email}</span>
                        </a>
                      ))}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Direct Phone</span>
                      {selectedOffice.phones.map((phone, idx) => (
                        <a
                          key={idx}
                          href={`tel:${phone.split(' ')[0]}`}
                          className="inline-flex items-center gap-1.5 font-bold text-slate-800 hover:text-sky-600 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{phone}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* India Branches Strip (Hyderabad, Bengaluru, Chennai, Vijayawada, Indore) */}
                  {selectedOffice.id === 'hyderabad' && (
                    <div className="pt-3.5 border-t border-slate-100 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase font-extrabold text-sky-700 tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
                          India Network & Delivery Branches (5 Hubs)
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">Live on 3D Globe</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {indianBranches.map((br) => (
                          <div
                            key={br.name}
                            className="p-2 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/50 transition-all text-left"
                          >
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="text-xs font-bold text-slate-800">{br.name}</span>
                              <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-sky-100 text-sky-700">{br.tag}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 leading-tight block truncate">{br.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Direct Consultation Contact Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    Start a Conversation
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Our technical and staffing consultants respond within 24 business hours.
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              {formSubmitted ? (
                <div className="py-10 px-4 flex flex-col items-center justify-center text-center gap-3 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-sm animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">Inquiry Dispatched Successfully!</h4>
                  <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
                    Thank you for reaching out. Your project requirements have been recorded and sent to our executive solution architecture team. We will respond within 24 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Error Notification Banner */}
                  {submitError && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-rose-50 border border-rose-200/90 text-rose-700 text-xs font-semibold flex items-start gap-2.5 animate-in fade-in duration-200"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Honeypot Spam Protection Field (Invisible to human users) */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="company_website_input">Leave this field empty</label>
                    <input
                      id="company_website_input"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData._company_website}
                      onChange={(e) => setFormData({ ...formData, _company_website: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="contact_name_input" className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact_name_input"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact_email_input" className="block text-xs font-bold text-slate-700 mb-1">
                        Corporate Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact_email_input"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@enterprise.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="contact_phone_input" className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        id="contact_phone_input"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact_service_select" className="block text-xs font-bold text-slate-700 mb-1">
                        Practice / Solution
                      </label>
                      <select
                        id="contact_service_select"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white transition-all"
                      >
                        <option value="AI Solutions & Agentic Pipelines">AI Solutions & Agentic Pipelines</option>
                        <option value="SAP Consulting, BRIM & S/4HANA">SAP Consulting, BRIM & S/4HANA</option>
                        <option value="IT Staffing & Global Recruitment">IT Staffing & Global Recruitment</option>
                        <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                        <option value="Custom Enterprise Development">Custom Enterprise Development</option>
                        <option value="General Inquiry & Leadership Contact">General Inquiry & Leadership Contact</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact_message_input" className="block text-xs font-bold text-slate-700 mb-1">
                      Project Scope or Inquiries <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact_message_input"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your timeline, current software ecosystem, or headcount requirements (min 10 characters)..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 hover:from-sky-700 hover:to-indigo-700 text-white font-extrabold text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Start a Conversation</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: LARGE INTERACTIVE 3D GLOBE CONTAINER */}
          <div className="lg:col-span-6 flex flex-col gap-4 order-1 lg:order-2 lg:sticky lg:top-24">
            <div className="relative w-full rounded-3xl bg-gradient-to-b from-sky-50/60 via-white to-slate-50/80 border border-sky-100 shadow-xl overflow-hidden h-[280px] sm:h-[400px] lg:min-h-[640px] lg:h-auto flex items-center justify-center">

              {/* Subtle background circular glow behind Earth */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[240px] sm:w-[380px] lg:w-[460px] h-[240px] sm:h-[380px] lg:h-[460px] rounded-full bg-gradient-to-tr from-sky-200/30 to-indigo-200/20 blur-2xl" />
              </div>

              {/* The 3D Interactive Three.js Globe */}
              <ClyptusInteractiveGlobe
                selectedLocationId={selectedOfficeId}
                onSelectLocation={(id) => setSelectedOfficeId(id)}
                hoveredLocationId={hoveredOfficeId}
                onHoverLocation={(id) => setHoveredOfficeId(id)}
              />
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: ALL 3 GLOBAL OFFICES CARDS IN DETAIL */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Global Corporate Directory
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Comprehensive physical addresses and direct executive channels
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {CLYPTUS_OFFICES.map((office) => {
              const isSelected = selectedOfficeId === office.id;
              return (
                <div
                  key={office.id}
                  onClick={() => setSelectedOfficeId(office.id)}
                  className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border transition-all duration-300 cursor-pointer ${isSelected
                    ? 'border-sky-400 ring-2 ring-sky-200 shadow-xl'
                    : 'border-slate-200/90 shadow-sm hover:shadow-lg hover:border-sky-300'
                    }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full text-white bg-slate-900 shadow-xs">
                        {office.badge}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOfficeId(office.id);
                        }}
                        title="Rotate globe to this office"
                        className="p-1 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                      >
                        <Compass className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="text-lg font-extrabold text-slate-900 mb-0.5">
                      {office.city}
                    </h4>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                      {office.country}
                    </p>

                    <div className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed mb-4 font-medium">
                      <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono uppercase text-slate-400 font-bold">Email Contacts</span>
                      {office.emails.map((email, eIdx) => (
                        <a
                          key={eIdx}
                          href={`mailto:${email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-sky-600 transition-colors"
                        >
                          <Mail className="w-3 h-3 text-sky-600" />
                          <span className="truncate">{email}</span>
                        </a>
                      ))}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono uppercase text-slate-400 font-bold">Call Contacts</span>
                      {office.phones.map((phone, pIdx) => (
                        <a
                          key={pIdx}
                          href={`tel:${phone.split(' ')[0]}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-sky-600 transition-colors"
                        >
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span className="truncate">{phone}</span>
                        </a>
                      ))}
                    </div>

                    <a
                      href={office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-2 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-700 text-xs font-bold border border-slate-200 transition-colors"
                    >
                      <span>Get Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Regional Delivery Hubs in India */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Regional Delivery & Specialist Hubs
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Extended client engineering & development centers across India
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {indianBranches.map((branch, rIdx) => (
                <div
                  key={rIdx}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex flex-col gap-1.5 hover:border-sky-300 hover:bg-sky-50/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-600" />
                      {branch.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-700 font-bold uppercase">{branch.tag}</span>
                  </div>
                  <span className="text-[11px] font-mono text-sky-700 font-bold uppercase">{branch.role}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
