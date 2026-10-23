export interface SeoMetadata {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

const PRODUCTION_DOMAIN = 'https://clyptus.com';

export const SAP_KEYWORDS =
  'SAP services, SAP service provider, SAP implementation services, SAP consulting services, SAP solutions provider, SAP support services, SAP technology services, SAP business solutions, enterprise SAP solutions, SAP S/4HANA implementation, SAP S/4HANA migration, SAP S/4HANA support, SAP S/4HANA services, SAP S/4HANA transformation, SAP S/4HANA upgrade, SAP ECC to S/4HANA migration, SAP HANA solutions, SAP ERP implementation, SAP ERP support, SAP application management services, SAP system integration, SAP customization, SAP configuration, SAP application support, SAP cloud solutions, SAP BTP services, SAP Fiori development, SAP ABAP development, SAP integration services, SAP data migration, SAP managed services, SAP FICO, SAP MM, SAP SD, SAP PP, SAP HCM, SAP SuccessFactors, SAP Ariba, SAP EWM, SAP Basis, SAP Analytics Cloud, SAP IBP, SAP BW/4HANA, SAP services in India, SAP services in Hyderabad, SAP service provider in Bengaluru, SAP services in Dubai, global SAP services';

export const AI_KEYWORDS =
  'AI development services, AI solutions provider, artificial intelligence services, AI software development, AI application development, AI development company, enterprise AI solutions, custom AI development, AI technology solutions, AI-powered business solutions, generative AI development, generative AI solutions, enterprise generative AI, LLM application development, large language model development, AI chatbot development, AI virtual assistant development, retrieval-augmented generation (RAG), conversational AI solutions, AI knowledge assistants, custom AI agents, enterprise AI assistants, AI automation services, business process automation, intelligent process automation, AI workflow automation, enterprise automation solutions, AI-powered automation, robotic process automation (RPA), AI agent development, workflow automation development, customer service automation, document processing automation, AI integration services, machine learning development, natural language processing (NLP), computer vision solutions, predictive analytics, AI model development, AI API integration, machine learning solutions, AI application integration, data analytics solutions, AI-powered analytics, MLOps services, AI system integration, AI development company in India, AI development in Hyderabad, AI automation services in Bengaluru, AI development company in Dubai, enterprise AI development services';

export const RECRUITING_KEYWORDS =
  'IT recruitment services, talent acquisition, technology recruitment, IT talent acquisition, IT workforce solutions, technical recruitment services, technical talent acquisition, IT hiring solutions, talent sourcing, flexible talent acquisition, permanent talent acquisition, talent-on-demand, contract-to-hire, executive search, leadership advisory, GCC build-out, talent acquisition solutions, SAP talent acquisition, SAP specialist deployment, AI talent acquisition, cloud engineer hiring, software developer recruitment, data engineer recruitment, skilled IT workforce solutions, technology workforce management, IT recruitment partner, talent acquisition services in India, tech recruitment in Hyderabad, talent solutions in Bengaluru, tech talent agency in Dubai, international talent acquisition solutions';

export const ALL_KEYWORDS = `${SAP_KEYWORDS}, ${AI_KEYWORDS}, ${RECRUITING_KEYWORDS}`;

export const PAGE_SEO_MAP: Record<string, SeoMetadata> = {
  Home: {
    title: 'Clyptus | AI-Native 360° IT Services & Talent Solutions',
    description: 'Clyptus is an AI-native technology partner delivering consulting, digital engineering, enterprise applications, cloud, data, cybersecurity, managed services and talent acquisition for global enterprises.',
    keywords: ALL_KEYWORDS,
    canonicalUrl: `${PRODUCTION_DOMAIN}/`,
    ogTitle: 'Clyptus | AI-Native 360° IT Services & Talent Solutions',
    ogDescription: 'Clyptus is an AI-native technology partner delivering consulting, digital engineering, enterprise applications, cloud, data, cybersecurity, managed services and talent acquisition for global enterprises.',
    ogImage: `${PRODUCTION_DOMAIN}/clyptus-og-banner.png`,
    ogUrl: `${PRODUCTION_DOMAIN}/`,
    twitterTitle: 'Clyptus | AI-Native 360° IT Services & Talent Solutions',
    twitterDescription: 'Clyptus is an AI-native technology partner delivering consulting, digital engineering, enterprise applications, cloud, data, cybersecurity, managed services and talent acquisition for global enterprises.',
    twitterImage: `${PRODUCTION_DOMAIN}/clyptus-og-banner.png`,
  },
  SAP: {
    title: 'Enterprise ERP Solutions & Services | Clyptus',
    description: 'Enterprise SAP S/4HANA greenfield implementations, cloud migrations, SAP BRIM billing, clean-core BTP extensions, and 24/7 AMS support services by Clyptus.',
    keywords: SAP_KEYWORDS,
    canonicalUrl: `${PRODUCTION_DOMAIN}/sap`,
    ogTitle: 'Enterprise ERP Solutions & Services | Clyptus',
    ogDescription: 'End-to-end SAP solutions: S/4HANA greenfield & brownfield migrations, BRIM monetization, and 24/7 SLA-driven AMS support.',
    ogImage: `${PRODUCTION_DOMAIN}/sap_datacenter_globe.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/sap`,
    twitterTitle: 'Enterprise ERP Solutions & Services | Clyptus',
    twitterDescription: 'End-to-end SAP solutions: S/4HANA greenfield & brownfield migrations, BRIM monetization, and 24/7 SLA-driven AMS support.',
    twitterImage: `${PRODUCTION_DOMAIN}/sap_datacenter_globe.jpg`,
  },
  AI: {
    title: 'AI & Data Intelligence | Clyptus',
    description: 'Generative AI agents, custom LLMs, agentic workflows, predictive analytics, Document AI, data engineering and MLOps by Clyptus.',
    keywords: AI_KEYWORDS,
    canonicalUrl: `${PRODUCTION_DOMAIN}/ai`,
    ogTitle: 'AI & Data Intelligence | Clyptus',
    ogDescription: 'Generative AI agents, custom LLMs, agentic workflows, predictive analytics, Document AI, data engineering and MLOps.',
    ogImage: `${PRODUCTION_DOMAIN}/recruitment_3d_ai_talent.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/ai`,
    twitterTitle: 'AI & Data Intelligence | Clyptus',
    twitterDescription: 'Generative AI agents, custom LLMs, agentic workflows, predictive analytics, Document AI, data engineering and MLOps.',
    twitterImage: `${PRODUCTION_DOMAIN}/recruitment_3d_ai_talent.jpg`,
  },
  Recruiting: {
    title: 'Talent Acquisition & Specialist Deployment | Clyptus',
    description: 'Executive search, specialist talent, talent-on-demand, contract-to-hire and Global Capability Centre build-out across the USA, UAE, and India.',
    keywords: RECRUITING_KEYWORDS,
    canonicalUrl: `${PRODUCTION_DOMAIN}/recruiting`,
    ogTitle: 'Talent Acquisition & Specialist Deployment | Clyptus',
    ogDescription: 'Executive search, specialist talent, talent-on-demand, contract-to-hire and Global Capability Centre build-out.',
    ogImage: `${PRODUCTION_DOMAIN}/recruitment_3d_global_hiring.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/recruiting`,
    twitterTitle: 'Talent Acquisition & Specialist Deployment | Clyptus',
    twitterDescription: 'Executive search, specialist talent, talent-on-demand, contract-to-hire and Global Capability Centre build-out.',
    twitterImage: `${PRODUCTION_DOMAIN}/recruitment_3d_global_hiring.jpg`,
  },
  'IT Recruiting': {
    title: 'Talent Acquisition & Specialist Deployment | Clyptus',
    description: 'Executive search, specialist talent, talent-on-demand, contract-to-hire and Global Capability Centre build-out across the USA, UAE, and India.',
    keywords: RECRUITING_KEYWORDS,
    canonicalUrl: `${PRODUCTION_DOMAIN}/recruiting`,
    ogTitle: 'Talent Acquisition & Specialist Deployment | Clyptus',
    ogDescription: 'Executive search, specialist talent, talent-on-demand, contract-to-hire and Global Capability Centre build-out.',
    ogImage: `${PRODUCTION_DOMAIN}/recruitment_3d_global_hiring.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/recruiting`,
    twitterTitle: 'Talent Acquisition & Specialist Deployment | Clyptus',
    twitterDescription: 'Executive search, specialist talent, talent-on-demand, contract-to-hire and Global Capability Centre build-out.',
    twitterImage: `${PRODUCTION_DOMAIN}/recruitment_3d_global_hiring.jpg`,
  },
  Contact: {
    title: 'Contact Clyptus | AI-Native 360° IT Services & Talent Solutions',
    description: 'Get in touch with Clyptus technology leaders and enterprise consultants in the USA, UAE, and India for consulting, engineering, enterprise applications, cloud, and talent acquisition.',
    keywords: 'contact Clyptus, enterprise technology consulting, AI development inquiry, talent acquisition contact, technology partner offices',
    canonicalUrl: `${PRODUCTION_DOMAIN}/contact`,
    ogTitle: 'Contact Clyptus | AI-Native 360° IT Services & Talent Solutions',
    ogDescription: 'Connect with Clyptus leadership and technical teams for enterprise technology services, AI automation, and talent acquisition.',
    ogImage: `${PRODUCTION_DOMAIN}/clyptus_office_presentation.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/contact`,
    twitterTitle: 'Contact Clyptus | AI-Native 360° IT Services & Talent Solutions',
    twitterDescription: 'Connect with Clyptus leadership and technical teams for enterprise technology services, AI automation, and talent acquisition.',
    twitterImage: `${PRODUCTION_DOMAIN}/clyptus_office_presentation.jpg`,
  },
  Projects: {
    title: 'Enterprise Case Studies & Deployments | Clyptus',
    description: 'Explore Clyptus enterprise case studies across digital engineering, enterprise applications, cloud, and generative AI deployments.',
    keywords: 'enterprise case studies, digital engineering, cloud ERP migrations, Clyptus portfolio',
    canonicalUrl: `${PRODUCTION_DOMAIN}/#projects`,
    ogTitle: 'Enterprise Case Studies & Deployments | Clyptus',
    ogDescription: 'Explore Clyptus enterprise case studies across digital engineering, enterprise applications, and AI deployments.',
    ogImage: `${PRODUCTION_DOMAIN}/sap_datacenter_globe.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/#projects`,
  },
  About: {
    title: 'About Clyptus | AI-Native Enterprise Technology Partner',
    description: 'Clyptus is an AI-native technology partner delivering end-to-end IT — consulting, engineering, enterprise applications, cloud, data, security, managed services and talent acquisition — with AI built into every engagement.',
    keywords: 'about Clyptus, tech leadership, enterprise IT solutions, global technology partner',
    canonicalUrl: `${PRODUCTION_DOMAIN}/#about`,
    ogTitle: 'About Clyptus | AI-Native Enterprise Technology Partner',
    ogDescription: 'Clyptus is an AI-native technology partner delivering end-to-end IT with AI built into every engagement across the USA, UAE, and India.',
    ogImage: `${PRODUCTION_DOMAIN}/about_hero_landscape.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/#about`,
  },
  Careers: {
    title: 'Careers at Clyptus | Join Our Global Engineering Team',
    description: 'Explore career opportunities at Clyptus. Join our high-growth teams in digital engineering, AI, cloud development, enterprise applications, and talent acquisition.',
    keywords: 'Clyptus careers, tech jobs, software engineer jobs, AI engineer hiring',
    canonicalUrl: `${PRODUCTION_DOMAIN}/#careers`,
    ogTitle: 'Careers at Clyptus | Join Our Team',
    ogDescription: 'Explore open positions and join Clyptus in building enterprise AI and technology solutions.',
    ogImage: `${PRODUCTION_DOMAIN}/clyptus_office_collaboration.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/#careers`,
  },
  Industries: {
    title: 'Industries We Serve | Clyptus Enterprise Transformation',
    description: 'Discover how Clyptus transforms enterprises across manufacturing, retail, utilities, healthcare, banking, and public sectors with digital engineering, cloud, and AI solutions.',
    keywords: 'enterprise industries, manufacturing technology, retail AI, utilities IT, Clyptus industries',
    canonicalUrl: `${PRODUCTION_DOMAIN}/#industries`,
    ogTitle: 'Industries We Serve | Clyptus Enterprise Solutions',
    ogDescription: 'Tailored technology, AI, and talent solutions for manufacturing, retail, healthcare, and finance sectors.',
    ogImage: `${PRODUCTION_DOMAIN}/about_hero_landscape.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/#industries`,
  },
  Blogs: {
    title: 'Insights & Thought Leadership | Clyptus',
    description: 'Read the latest technical insights, thought leadership, and guides on AI agent architectures, enterprise applications, cloud engineering, and talent strategy.',
    keywords: 'tech insights, AI articles, enterprise applications, Clyptus thought leadership',
    canonicalUrl: `${PRODUCTION_DOMAIN}/#blogs`,
    ogTitle: 'Insights & Thought Leadership | Clyptus',
    ogDescription: 'Expert insights on AI-native architectures, enterprise applications, cloud transformation, and talent solutions.',
    ogImage: `${PRODUCTION_DOMAIN}/recruitment_3d_ai_talent.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/#blogs`,
  },
};

export function updateMetaTag(nameOrProperty: string, content: string, isProperty = false) {
  if (typeof document === 'undefined') return;
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${nameOrProperty}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, nameOrProperty);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function updateCanonicalUrl(url: string) {
  if (typeof document === 'undefined') return;
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export function applySeoForPage(pageName: string) {
  const meta = PAGE_SEO_MAP[pageName] || PAGE_SEO_MAP['Home'];
  if (!meta) return;

  // Title
  document.title = meta.title;
  updateMetaTag('title', meta.title);

  // Meta Description & Keywords
  updateMetaTag('description', meta.description);
  if (meta.keywords) {
    updateMetaTag('keywords', meta.keywords);
  }

  // Canonical URL
  updateCanonicalUrl(meta.canonicalUrl);

  // Open Graph
  updateMetaTag('og:title', meta.ogTitle || meta.title, true);
  updateMetaTag('og:description', meta.ogDescription || meta.description, true);
  updateMetaTag('og:url', meta.ogUrl || meta.canonicalUrl, true);
  if (meta.ogImage) {
    updateMetaTag('og:image', meta.ogImage, true);
  }

  // Twitter Cards
  updateMetaTag('twitter:title', meta.twitterTitle || meta.title);
  updateMetaTag('twitter:description', meta.twitterDescription || meta.description);
  updateMetaTag('twitter:url', meta.ogUrl || meta.canonicalUrl);
  if (meta.twitterImage || meta.ogImage) {
    updateMetaTag('twitter:image', meta.twitterImage || meta.ogImage || '');
  }
}
