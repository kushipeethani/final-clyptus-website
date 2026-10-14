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
  'IT recruitment services, IT staffing services, IT recruiting company, IT recruitment agency, technology recruitment, IT talent acquisition, IT staffing solutions, IT workforce solutions, technical recruitment services, technology staffing company, technical talent acquisition, IT hiring solutions, IT talent sourcing, technology talent recruitment, contract IT staffing, permanent IT recruitment, temporary IT staffing, contract-to-hire staffing, executive technology recruitment, recruitment process outsourcing (RPO), workforce planning services, talent acquisition solutions, SAP recruitment services, SAP staffing solutions, SAP talent acquisition, SAP consultant recruitment, SAP S/4HANA recruitment, SAP FICO recruitment, SAP ABAP recruitment, SAP Basis recruitment, AI talent recruitment, cloud engineer recruitment, software developer recruitment, data engineer recruitment, IT recruitment for enterprises, technology staffing solutions for businesses, skilled IT workforce solutions, IT resource augmentation, technical resource outsourcing, IT contract recruitment, technology workforce management, IT recruitment partner, IT recruitment services in India, IT staffing in Hyderabad, IT recruitment in Bengaluru, IT recruitment agency in Dubai, international IT staffing solutions';

export const ALL_KEYWORDS = `${SAP_KEYWORDS}, ${AI_KEYWORDS}, ${RECRUITING_KEYWORDS}`;

export const PAGE_SEO_MAP: Record<string, SeoMetadata> = {
  Home: {
    title: 'Clyptus | Enterprise SAP Consulting, AI Development & IT Staffing Solutions',
    description: 'Clyptus delivers end-to-end technology solutions: enterprise SAP S/4HANA consulting, custom AI agent development & automation, and global IT recruitment and staffing services.',
    keywords: ALL_KEYWORDS,
    canonicalUrl: `${PRODUCTION_DOMAIN}/`,
    ogTitle: 'Clyptus | Enterprise SAP Consulting, AI Development & IT Staffing',
    ogDescription: 'Leading enterprise technology partner specializing in SAP S/4HANA, autonomous AI agent pipelines, and global IT talent recruitment.',
    ogImage: `${PRODUCTION_DOMAIN}/clyptus-og-banner.png`,
    ogUrl: `${PRODUCTION_DOMAIN}/`,
    twitterTitle: 'Clyptus | Enterprise SAP, AI Development & IT Staffing',
    twitterDescription: 'Leading enterprise technology partner specializing in SAP S/4HANA, autonomous AI agent pipelines, and global IT talent recruitment.',
    twitterImage: `${PRODUCTION_DOMAIN}/clyptus-og-banner.png`,
  },
  SAP: {
    title: 'SAP Consulting, Implementation & Support Services | Clyptus',
    description: 'Enterprise SAP S/4HANA greenfield implementations, cloud migrations, SAP BRIM billing, clean-core BTP extensions, and 24/7 AMS support services by Clyptus.',
    keywords: SAP_KEYWORDS,
    canonicalUrl: `${PRODUCTION_DOMAIN}/#sap`,
    ogTitle: 'SAP Consulting, Implementation & Support Services | Clyptus',
    ogDescription: 'End-to-end SAP solutions: S/4HANA greenfield & brownfield migrations, BRIM monetization, and 24/7 SLA-driven AMS support.',
    ogImage: `${PRODUCTION_DOMAIN}/sap_datacenter_globe.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/#sap`,
    twitterTitle: 'SAP Consulting, Implementation & Support Services | Clyptus',
    twitterDescription: 'End-to-end SAP solutions: S/4HANA greenfield & brownfield migrations, BRIM monetization, and 24/7 SLA-driven AMS support.',
    twitterImage: `${PRODUCTION_DOMAIN}/sap_datacenter_globe.jpg`,
  },
  AI: {
    title: 'AI Development & Automation Services | Clyptus',
    description: 'Custom AI agent development, multi-agent CrewAI systems, enterprise workflow automation, custom LLM fine-tuning, and intelligent data platforms by Clyptus.',
    keywords: AI_KEYWORDS,
    canonicalUrl: `${PRODUCTION_DOMAIN}/#ai`,
    ogTitle: 'AI Development & Automation Services | Clyptus',
    ogDescription: 'Turn business data into intelligent action with custom AI agents, CrewAI multi-agent pipelines, and enterprise automation.',
    ogImage: `${PRODUCTION_DOMAIN}/recruitment_3d_ai_talent.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/#ai`,
    twitterTitle: 'AI Development & Automation Services | Clyptus',
    twitterDescription: 'Turn business data into intelligent action with custom AI agents, CrewAI multi-agent pipelines, and enterprise automation.',
    twitterImage: `${PRODUCTION_DOMAIN}/recruitment_3d_ai_talent.jpg`,
  },
  Recruiting: {
    title: 'IT & SAP Recruitment and Staffing Services | Clyptus',
    description: 'Global IT recruitment, contract and permanent tech staffing, executive search, and specialized SAP consultant talent acquisition from India, the UAE, and USA.',
    keywords: RECRUITING_KEYWORDS,
    canonicalUrl: `${PRODUCTION_DOMAIN}/#recruiting`,
    ogTitle: 'IT & SAP Recruitment and Staffing Services | Clyptus',
    ogDescription: 'Hire top SAP, ERP, and tech talent faster with leadership hiring, contract staffing, and global RPO delivery.',
    ogImage: `${PRODUCTION_DOMAIN}/recruitment_3d_global_hiring.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/#recruiting`,
    twitterTitle: 'IT & SAP Recruitment and Staffing Services | Clyptus',
    twitterDescription: 'Hire top SAP, ERP, and tech talent faster with leadership hiring, contract staffing, and global RPO delivery.',
    twitterImage: `${PRODUCTION_DOMAIN}/recruitment_3d_global_hiring.jpg`,
  },
  'IT Recruiting': {
    title: 'IT & SAP Recruitment and Staffing Services | Clyptus',
    description: 'Global IT recruitment, contract and permanent tech staffing, executive search, and specialized SAP consultant talent acquisition from India, the UAE, and USA.',
    keywords: RECRUITING_KEYWORDS,
    canonicalUrl: `${PRODUCTION_DOMAIN}/#recruiting`,
    ogTitle: 'IT & SAP Recruitment and Staffing Services | Clyptus',
    ogDescription: 'Hire top SAP, ERP, and tech talent faster with leadership hiring, contract staffing, and global RPO delivery.',
    ogImage: `${PRODUCTION_DOMAIN}/recruitment_3d_global_hiring.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/#recruiting`,
    twitterTitle: 'IT & SAP Recruitment and Staffing Services | Clyptus',
    twitterDescription: 'Hire top SAP, ERP, and tech talent faster with leadership hiring, contract staffing, and global RPO delivery.',
    twitterImage: `${PRODUCTION_DOMAIN}/recruitment_3d_global_hiring.jpg`,
  },
  Contact: {
    title: 'Contact Clyptus | Talk to Our SAP, AI & Hiring Teams',
    description: 'Get in touch with Clyptus technology leaders and hiring consultants in the USA, UAE, and India to accelerate your SAP, AI, and IT staffing initiatives.',
    keywords: 'contact Clyptus, hire SAP consultants, AI development inquiry, IT staffing contact, technology consulting offices',
    canonicalUrl: `${PRODUCTION_DOMAIN}/#contact`,
    ogTitle: 'Contact Clyptus | Talk to Our SAP, AI & Hiring Teams',
    ogDescription: 'Connect with Clyptus leadership and technical teams for SAP consulting, AI automation, and specialized IT staffing.',
    ogImage: `${PRODUCTION_DOMAIN}/clyptus_office_presentation.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/#contact`,
    twitterTitle: 'Contact Clyptus | Talk to Our SAP, AI & Hiring Teams',
    twitterDescription: 'Connect with Clyptus leadership and technical teams for SAP consulting, AI automation, and specialized IT staffing.',
    twitterImage: `${PRODUCTION_DOMAIN}/clyptus_office_presentation.jpg`,
  },
  Projects: {
    title: 'Enterprise Projects & Case Studies | Clyptus',
    description: 'Explore Clyptus enterprise case studies across SAP S/4HANA implementations, cloud ERP migrations, and generative AI deployments.',
    keywords: 'SAP projects, enterprise case studies, cloud ERP migrations, Clyptus portfolio',
    canonicalUrl: `${PRODUCTION_DOMAIN}/#projects`,
    ogTitle: 'Enterprise Projects & Case Studies | Clyptus',
    ogDescription: 'Explore Clyptus enterprise case studies across SAP S/4HANA implementations and AI deployments.',
    ogImage: `${PRODUCTION_DOMAIN}/sap_datacenter_globe.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/#projects`,
  },
  About: {
    title: 'About Clyptus | Enterprise Technology & Global Talent Partner',
    description: 'Learn about Clyptus, our mission, leadership, and track record delivering high-impact SAP solutions, AI innovations, and IT staffing globally.',
    keywords: 'about Clyptus, tech leadership, enterprise IT solutions, global staffing agency',
    canonicalUrl: `${PRODUCTION_DOMAIN}/#about`,
    ogTitle: 'About Clyptus | Enterprise Technology & Global Talent Partner',
    ogDescription: 'Learn about Clyptus, our mission, leadership, and global footprint across the USA, UAE, and India.',
    ogImage: `${PRODUCTION_DOMAIN}/about_hero_landscape.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/#about`,
  },
  Careers: {
    title: 'Careers at Clyptus | Join Our Global SAP & AI Engineering Team',
    description: 'Explore career opportunities at Clyptus. Join our high-growth teams in SAP consulting, AI engineering, cloud development, and tech recruitment.',
    keywords: 'Clyptus careers, tech jobs, SAP consultant jobs, AI engineer hiring',
    canonicalUrl: `${PRODUCTION_DOMAIN}/#careers`,
    ogTitle: 'Careers at Clyptus | Join Our Team',
    ogDescription: 'Explore open positions and join Clyptus in building enterprise SAP and AI solutions.',
    ogImage: `${PRODUCTION_DOMAIN}/clyptus_office_collaboration.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/#careers`,
  },
  Industries: {
    title: 'Industries We Serve | Clyptus Enterprise Transformation',
    description: 'Discover how Clyptus transforms enterprises across manufacturing, retail, utilities, healthcare, banking, and public sectors with SAP and AI solutions.',
    keywords: 'enterprise industries, SAP manufacturing, AI retail, ERP utilities, Clyptus industries',
    canonicalUrl: `${PRODUCTION_DOMAIN}/#industries`,
    ogTitle: 'Industries We Serve | Clyptus Enterprise Solutions',
    ogDescription: 'Tailored SAP, AI, and staffing solutions for manufacturing, retail, healthcare, and finance sectors.',
    ogImage: `${PRODUCTION_DOMAIN}/about_hero_landscape.jpg`,
    ogUrl: `${PRODUCTION_DOMAIN}/#industries`,
  },
  Blogs: {
    title: 'Tech Insights & Articles | Clyptus Thought Leadership',
    description: 'Read the latest technical articles, thought leadership, and guides on SAP S/4HANA, AI agent architectures, and tech workforce strategies.',
    keywords: 'SAP blog, AI articles, tech recruitment trends, Clyptus insights',
    canonicalUrl: `${PRODUCTION_DOMAIN}/#blogs`,
    ogTitle: 'Tech Insights & Articles | Clyptus',
    ogDescription: 'Expert insights on SAP transformations, Agentic AI, and enterprise tech staffing.',
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
