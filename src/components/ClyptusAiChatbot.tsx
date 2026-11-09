import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  X, 
  RotateCcw, 
  ArrowRight,
  Compass 
} from 'lucide-react';
import { KevaBotLogo } from './KevaBotLogo';

interface ClyptusAiChatbotProps {
  onNavigate?: (page: string) => void;
}

interface QuickAction {
  label: string;
  pageTarget?: string;
  chatQuery?: string;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickActions?: QuickAction[];
}

interface KnowledgeArticle {
  category: string;
  keywords: string[];
  patterns: RegExp[];
  answer: string;
  quickActions?: QuickAction[];
}

const KNOWLEDGE_BASE: KnowledgeArticle[] = [
  // 1. OFFICIAL EMAILS & DIRECT CONTACT CHANNELS
  {
    category: 'emails',
    keywords: [
      'email', 'mail', 'emails', 'e-mail', 'contact email', 'sales email', 
      'hr email', 'support email', 'corporate email', 'email address', 
      'how to email', 'inbox', 'reach via email', 'where to mail', 'send email'
    ],
    patterns: [
      /\b(e-?mails?|mailbox|inbox)\b/i,
      /what (is|are) (the|your) e-?mails?/i,
      /send (an? )?e-?mail/i,
      /how (to|can i) e-?mail/i,
      /give me (the )?e-?mail/i
    ],
    answer: `**Official Contact & Email Channels**

You can reach our leadership, enterprise sales, and HR teams through our regional email addresses:

• **Sales & Client Proposals**: Sales@clyptus.com
  Project scoping, RFPs, pricing quotes, and architecture consultations (+91 77999 88139).

• **General Inquiries**: info@clyptus.com / contact@clyptus.com
  Strategic alliances, general inquiries, and client partnerships.

• **Careers & HR (India & APAC)**: hr.india@clyptus.com
  Job openings, resume submissions, and campus drives.

• **Careers & HR (Dubai & Middle East)**: hr.uae@clyptus.com
  DIFC Operations (+971 52 350 3297).

• **Careers & HR (USA & North America)**: hr.usa@clyptus.com
  Temecula, California Hub (+1 480 427-6373).

You can also submit an inquiry directly using our website contact form.`,
    quickActions: [
      { label: 'Open Contact Form', pageTarget: 'Contact' },
      { label: 'Company Journey', chatQuery: 'Tell me about Clyptus journey and history' },
      { label: 'Explore Careers', pageTarget: 'Careers' },
      { label: 'Office Locations', chatQuery: 'Where are your office locations?' }
    ]
  },

  // 2. COMPANY JOURNEY & MILESTONES (2014 - PRESENT)
  {
    category: 'journey',
    keywords: [
      'journey', 'history', 'story', 'milestones', 'timeline', 'founded', 
      'founding', 'evolution', 'growth', 'years', 'origin', 'how it started', 
      'past', 'background', 'milestone', 'decade', 'when started', 'established'
    ],
    patterns: [
      /\b(journey|milestones?|timeline|evolution|history|story)\b/i,
      /when was clyptus (founded|started|created|established)/i,
      /how did clyptus (start|begin|grow|evolve)/i,
      /company (history|journey|story|background)/i,
      /how many years (in business|operating)/i
    ],
    answer: `**The Clyptus Journey & Milestones (2014 – Present)**

Over a decade of scaling enterprise architectures and delivering digital transformation:

1. **2014 – 2016: Foundation & Initial Expansion**
   Founded in 2014 with a core SAP ERP & HCM consulting practice. Delivered our first international enterprise SAP project in Dubai, UAE, and established our global delivery center in Hyderabad, India.

2. **2016 – 2018: Global Footprint Growth**
   Expanded international SAP delivery across 3+ countries, serving 15+ large enterprise clients with major rollouts across UAE and India. Team scaled to 65+ specialized consultants.

3. **2018 – 2020: S/4HANA & Cloud Leadership**
   Introduced a full SAP Cloud Services portfolio, scaled to 87+ senior SAP consultants, and established our dedicated SAP S/4HANA migration practice.

4. **2020 – 2022: Analytics & SAP Silver Partner**
   Introduced Enterprise Data Platforms and SAP BRIM solutions. Earned official **SAP Silver Partner** accreditation and expanded to 120+ team members and 110+ enterprise clients.

5. **2022 – Present: BTP, AI & Autonomous Innovation**
   Launched our SAP BTP practice, built proprietary SAP add-on assets, integrated Agentic AI & Generative AI capabilities, and scaled to 250+ consultants across India, UAE, and North America.`,
    quickActions: [
      { label: 'Read About Us', pageTarget: 'About' },
      { label: 'Official Emails', chatQuery: 'What are your official emails?' },
      { label: 'SAP & ERP Practice', pageTarget: 'SAP' },
      { label: 'AI Solutions', pageTarget: 'AI' }
    ]
  },

  // 3. CORE ENTERPRISE SERVICES & PRACTICE AREAS (ALL OFFERINGS)
  {
    category: 'services',
    keywords: [
      'services', 'service', 'services providing', 'services you are providing',
      'what services', 'what do you do', 'what do you provide', 'offerings', 
      'solutions', 'capabilities', 'what we do', 'practice areas', 'portfolio',
      'digital services', 'technology services', 'what does clyptus do', 'what can you do',
      'all services', 'list services', 'what are your services'
    ],
    patterns: [
      /\bservices?\b/i,
      /\bwhat (services?|solutions?|offerings?) (do you|does clyptus|are provided|are you providing)\b/i,
      /\bservices? (you are|you|clyptus is) providing\b/i,
      /\bwhat (does|can) clyptus do\b/i,
      /\bwhat (do you|can you) (offer|provide|do for clients)\b/i,
      /\b(all |our )?offerings\b/i,
      /\b(core )?practice areas\b/i
    ],
    answer: `**Clyptus Enterprise Services & Practice Areas**

We deliver end-to-end digital engineering and technology transformation across 8 core practices:

1. **ERP & SAP Services (SAP Silver Partner)**: S/4HANA migrations, SAP BRIM billing, SAP BTP integrations, ECC transformations, and 24/7 AMS support.
2. **Artificial Intelligence & GenAI**: Custom enterprise LLMs, Agentic AI workflows, predictive analytics, computer vision, and autonomous copilots.
3. **Multi-Cloud Architecture & DevOps**: AWS, Microsoft Azure, and GCP migrations, Kubernetes containerization, CI/CD automation, and cloud security governance.
4. **Cyber Security & Zero Trust**: Threat detection, SOC 2 / ISO compliance, endpoint defense, vulnerability management, and IAM security.
5. **CRM Services**: Customer journey orchestration, revenue operations, omnichannel workflows, and Zoho/HubSpot/Dynamics implementations.
6. **Salesforce Consulting**: Sales & Service Cloud customization, Lightning development, MuleSoft integrations, and managed support.
7. **Data Engineering & Big Data**: Real-time streaming ETL/ELT pipelines, Snowflake, Databricks, enterprise data warehouses, and Power BI analytics.
8. **IT Staffing & Global Talent Recruitment**: Specialized engineering squads, contract-to-hire, executive search, and onshore/offshore delivery.`,
    quickActions: [
      { label: 'Browse All Services', pageTarget: 'Services' },
      { label: 'ERP & SAP', pageTarget: 'SAP' },
      { label: 'AI Solutions', pageTarget: 'AI' },
      { label: 'Cloud Services', pageTarget: 'Cloud' },
      { label: 'Official Emails', chatQuery: 'What are your official emails?' }
    ]
  },

  // 4. CURRENT PROJECTS & CLIENT ENGAGEMENTS
  {
    category: 'projects',
    keywords: [
      'project', 'projects', 'current project', 'current projects', 'current project clyptus doing',
      'what is the current project', 'what projects', 'what is clyptus doing', 'active projects',
      'case studies', 'client work', 'client engagements', 'what are you working on', 'portfolio',
      'current work', 'ongoing projects', 'recent projects'
    ],
    patterns: [
      /\b(current |active |ongoing |recent )?projects?\b/i,
      /\bwhat (is|are) (the )?(current |active )?projects?\b/i,
      /\bwhat (is|are) (clyptus|you) (working on|doing currently|doing|building)\b/i,
      /\b(case studies|client engagements?|past work|deliveries)\b/i
    ],
    answer: `**Current Projects & Client Engagements at Clyptus**

Clyptus is actively delivering high-impact enterprise transformations globally:

• **SAP S/4HANA & BRIM Transformations**: Delivering end-to-end subscription billing, revenue recognition, and clean-core S/4HANA migrations for telecom and retail enterprises in UAE and North America.
• **Agentic AI & Generative AI Copilots**: Building bespoke enterprise AI workflows, LLM fine-tuning, and document intelligence pipelines for financial and supply-chain clients.
• **Enterprise Multi-Cloud Modernization**: Architecting zero-downtime cloud migrations to AWS and Azure with automated Kubernetes containerization for healthcare organizations.
• **Real-Time Data Lakehouse Pipelines**: Deploying scalable Databricks and Snowflake engineering infrastructure for predictive analytics and real-time business intelligence.
• **Zero-Trust Cybersecurity Hardening**: Implementing 24/7 managed detection, response (MDR), and identity access management (IAM) across hybrid enterprise environments.`,
    quickActions: [
      { label: 'Company Journey', chatQuery: 'Tell me about Clyptus journey and history' },
      { label: 'Browse Services', pageTarget: 'Services' },
      { label: 'Official Emails', chatQuery: 'What are your official emails?' },
      { label: 'Contact Us', pageTarget: 'Contact' }
    ]
  },

  // 5. GLOBAL LOCATIONS & OFFICE ADDRESSES
  {
    category: 'locations',
    keywords: [
      'locations', 'offices', 'address', 'office address', 'headquarters', 
      'hyderabad', 'dubai', 'california', 'temecula', 'india', 'uae', 'usa', 
      'branches', 'office locations', 'delivery centers', 'directions', 'map', 
      'phone', 'phone number', 'call', 'telephone', 'contact number'
    ],
    patterns: [
      /\b(locations?|offices?|address(es)?|headquarters|branches?)\b/i,
      /where (is clyptus|are the offices|are you located)/i,
      /\b(phone|call|telephone|contact number)\b/i,
      /\b(hyderabad|dubai|california|temecula)\b/i
    ],
    answer: `**Global Delivery Centers & Office Locations**

We operate 3 strategic regional hubs delivering 24/7 enterprise engineering and consulting:

• **Hyderabad, India (Global Headquarters & Delivery Center)**
  12A01A, 13th Floor, Manjeera Trinity Corporate, JNTU–Hitech City Road, Kukatpally, Hyderabad, Telangana 500072
  Emails: Sales@clyptus.com | hr.india@clyptus.com
  Phone: +91 77999 88139

• **Dubai, UAE (Middle East Regional Center & DIFC Operations)**
  101 Sheikh Zayed Rd, Trade Centre, DIFC, Dubai, UAE
  Email: hr.uae@clyptus.com
  Phone: +971 52 350 3297

• **California, USA (North America Business Hub)**
  45627 Basswood Ct, Temecula, California 92592
  Email: hr.usa@clyptus.com
  Phone: +1 480 427-6373`,
    quickActions: [
      { label: 'Interactive Globe', pageTarget: 'Contact' },
      { label: 'Official Emails', chatQuery: 'What are your official emails?' },
      { label: 'Company Journey', chatQuery: 'Tell me about the company journey' }
    ]
  },

  // 4. KEY STATS & METRICS
  {
    category: 'stats',
    keywords: [
      'stats', 'statistics', 'numbers', 'metrics', 'track record', 
      'how many', 'experience', 'projects count', 'consultants count', 'scale'
    ],
    patterns: [
      /\b(stats|statistics|numbers|metrics|track record)\b/i,
      /how many (projects|consultants|clients|countries|years)/i,
      /years of experience/i
    ],
    answer: `**Clyptus at a Glance**

• **10+ Years of Experience**: Delivering mission-critical enterprise engineering since 2014.
• **250+ Global Consultants**: Specialized squad including 120+ certified SAP & cloud specialists.
• **50+ Global Enterprise Projects**: Delivered across North America, EMEA, and APAC regions.
• **30+ Country Localizations**: Supporting cross-border operations and tax/statutory compliances.
• **330+ Tech Professionals Deployed**: Specialized talent matched with enterprise transformation programs.
• **5+ Pre-Built RDS Packages**: Rapid deployment packages that accelerate enterprise go-live lead times.
• **50+ Add-on Assets**: Ready-to-use software components for SAP, cloud, and data integration.
• **Official SAP Silver Partner**: Certified partner for S/4HANA, BRIM, and BTP delivery.`,
    quickActions: [
      { label: 'Company Journey', chatQuery: 'Tell me about Clyptus journey and history' },
      { label: 'Case Studies', pageTarget: 'Projects' },
      { label: 'Contact Sales', chatQuery: 'What are your official emails?' }
    ]
  },

  // 5. COMPANY LEADERSHIP & FOUNDER
  {
    category: 'leadership',
    keywords: [
      'leadership', 'founder', 'ceo', 'vamsi', 'vamsi krishna', 
      'management', 'executive', 'who runs', 'who leads', 'owner', 'director'
    ],
    patterns: [
      /\b(founder|ceo|vamsi|vamsi krishna|leadership|executive|director)\b/i,
      /who (runs|leads|founded) clyptus/i
    ],
    answer: `**Clyptus Leadership & Vision**

• **Founder & Strategic Leader**: **Vamsi Krishna** guides Clyptus's strategic vision, global partnerships, and technology innovation across the USA, UAE, and India.
• **Vision**: *"Shaping Tomorrow Through Innovation"* — Empowering enterprises to thrive in an AI-first, cloud-native world through scalable intelligence and technical agility.
• **Mission**: *"Turning Ideas Into Impact"* — Transforming complex enterprise challenges into resilient, high-performance systems with clear business ROI.
• **Core Philosophy**: A commitment to technical rigor, clean-core architectures, transparent client relationships, and proactive innovation.`,
    quickActions: [
      { label: 'About Clyptus', pageTarget: 'About' },
      { label: 'Company Journey', chatQuery: 'Tell me about the company journey' },
      { label: 'Contact Leadership', pageTarget: 'Contact' }
    ]
  },

  // 6. CAREERS & JOB OPENINGS
  {
    category: 'careers',
    keywords: [
      'careers', 'jobs', 'hiring', 'openings', 'vacancies', 'apply', 
      'interview', 'resume', 'cv', 'work at clyptus', 'positions', 'recruitment for me'
    ],
    patterns: [
      /\b(careers?|jobs?|hiring|openings?|vacanc(y|ies)|positions?|apply|resume|cv)\b/i,
      /work at clyptus/i,
      /how to apply/i
    ],
    answer: `**Careers at Clyptus Software Solutions**

We are continuously hiring experienced developers, enterprise consultants, and tech leaders:

• **Open Roles**:
  1. SAP S/4HANA Functional & Technical Consultants (3–6 yrs)
  2. Cloud Solutions Architects (AWS / Azure / OCI, 5–10 yrs)
  3. Generative AI & LLM Engineers (Python, PyTorch, Azure AI, 3–5 yrs)
  4. SAP BRIM / Billing Consultants (Convergent Invoicing, FI-CA, 3–7 yrs)
  5. SAP SuccessFactors & HCM Specialists (2–5 yrs)
  6. Power BI & Enterprise Data Engineers (2–5 yrs)

• **How to Apply**:
  Send your resume directly to our regional talent acquisition team:
  • hr.india@clyptus.com (India & APAC)
  • hr.uae@clyptus.com (UAE & Middle East)
  • hr.usa@clyptus.com (USA & Americas)`,
    quickActions: [
      { label: 'Go to Careers Page', pageTarget: 'Careers' },
      { label: 'HR Policies Portal', pageTarget: 'HR Policies' },
      { label: 'Email HR Team', chatQuery: 'What are your official emails?' }
    ]
  },

  // 9. GREETINGS & INTRO / KEVA IDENTITY
  {
    category: 'greetings',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'who are you', 'what is keva', 'who is keva', 'your name'],
    patterns: [
      /^(hi|hello|hey|hola|greetings|good (morning|afternoon|evening))\b/i, 
      /^who are you\b/i, 
      /^what is (keva|your name)\b/i, 
      /^who is keva\b/i
    ],
    answer: `Hello! 👋 Welcome to Clyptus Software Solutions. I'm **Keva**.

I'm here to help you explore our enterprise services, company journey since 2014, global offices, or direct email channels.

How can I assist you today?`,
    quickActions: [
      { label: 'Official Emails', chatQuery: 'What are your official emails?' },
      { label: 'Company Journey', chatQuery: 'Tell me about Clyptus journey and history' },
      { label: 'All Services', chatQuery: 'What services are you providing?' },
      { label: 'Current Projects', chatQuery: 'What is the current project Clyptus is doing?' }
    ]
  },

  // 8. ERP & SAP SERVICES
  {
    category: 'erp',
    keywords: ['sap', 'erp', 's4hana', 's/4hana', 'hana', 'brim', 'btp', 'clean core', 'migration', 'oracle erp', 'dynamics 365', 'ams', 'silver partner'],
    patterns: [/sap/i, /s\/4hana/i, /erp/i, /brim/i, /btp/i, /clean core/i, /oracle erp/i, /dynamics 365/i],
    answer: `**Clyptus ERP & SAP Practice (SAP Silver Partner)**

We provide complete enterprise ERP strategy, implementations, migrations, and ongoing management:

• **SAP S/4HANA**: Greenfield implementations, system conversions, RISE with SAP migrations, and clean-core decoupled architecture.
• **SAP BRIM** (Billing & Revenue Innovation Management): Subscription Order Management (SOM), Convergent Charging (CC), Convergent Invoicing (CI), Convergent Mediation (CM), and FI-CA / RAR revenue recognition.
• **SAP BTP & Custom ABAP**: Cloud-native extensions, microservices integration (CPI, PI/PO), and SAP Fiori UX modernization.
• **Oracle Cloud ERP**: Financials, supply chain management, and cloud ERP transformation.
• **Microsoft Dynamics 365**: Finance, Supply Chain, and Business Central implementations.
• **24/7 AMS & Managed Support**: Post go-live stabilization, hypercare, and proactive SLA-backed support.`,
    quickActions: [
      { label: 'ERP Services', pageTarget: 'SAP' },
      { label: 'Request ERP Review', pageTarget: 'Contact' },
      { label: 'Email Sales Team', chatQuery: 'What are your official emails?' }
    ]
  },

  // 9. ARTIFICIAL INTELLIGENCE & GENAI
  {
    category: 'ai',
    keywords: ['ai', 'genai', 'generative ai', 'llm', 'rag', 'agentforce', 'agents', 'machine learning', 'ml', 'computer vision', 'predictive', 'copilot', 'automation'],
    patterns: [/\bai\b/i, /genai|generative ai/i, /llm|rag/i, /machine learning/i, /agents|agentforce/i, /computer vision/i],
    answer: `**Artificial Intelligence & GenAI Engineering**

Clyptus builds enterprise-grade AI applications and autonomous workflow engines designed for real business outcomes:

• **Custom Generative AI & Fine-Tuning**: Secure enterprise RAG (Retrieval-Augmented Generation) architectures, internal copilots, and bespoke LLMs trained on corporate data.
• **Autonomous AI Agent Swarms**: Multi-agent systems that autonomously execute multi-step business workflows across CRM, ERP, and databases.
• **Predictive Machine Learning**: Demand forecasting, predictive maintenance, algorithmic risk scoring, and customer churn analysis.
• **Computer Vision**: Automated visual quality inspection, workplace safety compliance, and document intelligence.
• **MLOps & Governance**: Zero-data-leakage guardrails, drift monitoring, latency optimization, and continuous retraining pipelines.`,
    quickActions: [
      { label: 'AI Solutions', pageTarget: 'AI' },
      { label: 'AI Discovery Session', pageTarget: 'Contact' },
      { label: 'Email AI Team', chatQuery: 'What are your official emails?' }
    ]
  },

  // 10. MULTI-CLOUD & DEVOPS
  {
    category: 'cloud',
    keywords: ['cloud', 'aws', 'azure', 'gcp', 'google cloud', 'kubernetes', 'eks', 'aks', 'gke', 'devops', 'microservices', 'serverless', 'lambda', 'migration'],
    patterns: [/cloud/i, /aws|azure|gcp/i, /kubernetes|k8s/i, /devops/i, /microservices|serverless/i],
    answer: `**Multi-Cloud & DevOps Engineering**

We architect resilient, cost-optimized, and elastic cloud foundations across all major providers:

• **Platforms**: Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP).
• **Cloud Architecture**: Cloud-native microservices, containerization (Docker, Kubernetes EKS/AKS/GKE), and serverless architectures (AWS Lambda, Azure Functions, Cloud Run).
• **Zero-Downtime Migrations**: Database and application migration strategies engineered with automated rollback guarantees.
• **Cloud Modernization**: Modernizing monolithic legacy applications into decoupled event-driven architectures.
• **DevSecOps & Automation**: Automated CI/CD pipelines, Infrastructure as Code (Terraform, Ansible), and 24/7 cloud monitoring.`,
    quickActions: [
      { label: 'Cloud Services', pageTarget: 'Cloud' },
      { label: 'Cloud Architecture Review', pageTarget: 'Contact' }
    ]
  },

  // 11. CYBERSECURITY & COMPLIANCE
  {
    category: 'security',
    keywords: ['security', 'cybersecurity', 'cyber', 'soc', 'compliance', 'iso 27001', 'soc 2', 'hipaa', 'gdpr', 'nist', 'pentest', 'vulnerability', 'zero trust', 'siem', 'soar'],
    patterns: [/security/i, /cyber/i, /soc/i, /iso\s?27001/i, /soc\s?2/i, /hipaa/i, /gdpr/i, /zero trust/i, /pen(etration)?\s?test/i],
    answer: `**Cybersecurity & Regulatory Compliance**

Our defense-in-depth security practice protects your intellectual property, infrastructure, and reputation:

• **24/7 Managed SOC**: Real-time SIEM/SOAR incident detection, automated containment, and threat intelligence.
• **Compliance & Governance**: ISO/IEC 27001, SOC 2 Type II, HIPAA, GDPR, PCI DSS, and NIST CSF audit readiness.
• **Offensive Security & Pen Testing**: Web app, cloud infrastructure, and internal network penetration testing with remediation roadmaps.
• **Zero-Trust Architecture**: Identity & Access Management (IAM), micro-segmentation, and least-privilege enforcement.
• **Cloud Security Posture (CSPM)**: Automated compliance scanning across AWS, Azure, and Google Cloud workloads.`,
    quickActions: [
      { label: 'Cybersecurity', pageTarget: 'Security' },
      { label: 'Security Assessment', pageTarget: 'Contact' }
    ]
  },

  // 12. CRM SERVICES (SAP CX, ORACLE CX, DYNAMICS)
  {
    category: 'crm',
    keywords: ['crm', 'customer', 'sap cx', 'sales cloud', 'service cloud', 'commerce cloud', 'oracle cx', 'dynamics 365 crm', 'cpq', 'emarsys'],
    patterns: [/crm/i, /sap cx/i, /sales cloud/i, /service cloud/i, /oracle cx/i, /customer relationship/i],
    answer: `**CRM & Customer Experience Engineering**

Clyptus unifies front-office engagement with back-office execution across industry-leading CRM platforms:

• **SAP Customer Experience (SAP CX)**: SAP Sales Cloud, SAP Service Cloud, SAP Commerce Cloud, Customer Data Platform (CDP), and Emarsys Marketing Automation.
• **SAP CPQ & Subscription Billing**: Fast product configuration, complex tiered pricing, and quoting engines.
• **Oracle CX & Salesforce Integrations**: Enterprise-wide pipeline visibility and synchronized master customer records.
• **Microsoft Dynamics 365 CRM**: Connected sales, customer care, and automated field services.`,
    quickActions: [
      { label: 'CRM Services', pageTarget: 'CRM' },
      { label: 'CRM Architecture', pageTarget: 'Contact' }
    ]
  },

  // 13. SALESFORCE & AGENTFORCE
  {
    category: 'salesforce',
    keywords: ['salesforce', 'agentforce', 'sfdc', 'apex', 'lwc', 'lightning', 'flow', 'experience cloud', 'marketing cloud', 'einstein'],
    patterns: [/salesforce/i, /agentforce/i, /sfdc/i, /apex/i, /lwc/i],
    answer: `**Salesforce Solutions & Agentforce AI**

Accelerate revenue pipelines with customized Salesforce ecosystems and autonomous AI agents:

• **Salesforce Agentforce**: Deploying autonomous AI agents that handle customer service inquiries, qualify sales leads, and execute business actions.
• **Core Cloud Deployments**: Sales Cloud, Service Cloud, Experience Cloud (Community), and Marketing Cloud.
• **Custom Development**: Apex architecture, Lightning Web Components (LWC), and complex third-party ERP integrations.
• **Omnichannel Automation**: Flow orchestration, automated SLAs, and unified customer 360-degree views.`,
    quickActions: [
      { label: 'Salesforce Solutions', pageTarget: 'Salesforce' },
      { label: 'Talk to Salesforce Specialist', pageTarget: 'Contact' }
    ]
  },

  // 14. DATA ENGINEERING & LAKEHOUSES
  {
    category: 'data',
    keywords: ['data', 'data engineering', 'analytics', 'snowflake', 'databricks', 'kafka', 'spark', 'etl', 'elt', 'dbt', 'lakehouse', 'bi', 'bigquery'],
    patterns: [/data/i, /analytics/i, /snowflake/i, /databricks/i, /kafka/i, /spark/i, /lakehouse/i, /bigquery/i],
    answer: `**Data Engineering & Modern Lakehouse Architectures**

We transform fragmented enterprise data silos into clean, real-time analytics engines:

• **Modern Data Lakehouses**: Snowflake, Databricks, and Google Cloud BigQuery implementations.
• **Streaming Data Pipelines**: Real-time event streaming architectures using Apache Kafka and Apache Spark.
• **Automated ETL/ELT**: Scalable data transformations with dbt, Airflow, and Azure Data Factory.
• **Data Governance & Quality**: Automated data lineage, cataloging, schema validation, and GDPR masking.
• **Enterprise BI**: High-performance executive dashboards in Power BI, Tableau, and Looker.`,
    quickActions: [
      { label: 'Data Engineering', pageTarget: 'DataEngineering' },
      { label: 'Data Discovery Workshop', pageTarget: 'Contact' }
    ]
  },

  // 15. IT RECRUITMENT & TALENT DELIVERY
  {
    category: 'recruiting',
    keywords: ['recruitment', 'recruiting', 'staffing', 'talent', 'hire', 'contractors', 'placement', 'developers', 'consultants'],
    patterns: [/recruitment/i, /recruiting/i, /staffing/i, /hire talent/i, /contractors/i],
    answer: `**IT Recruiting & Specialized Talent Delivery**

Rapid deployment of rigorously vetted enterprise technology talent:

• **Flexible Models**: Contract staffing, permanent placement, contract-to-hire, and dedicated offshore squads.
• **Specializations**: Certified SAP functional/technical consultants, Cloud Architects, AI Engineers, Cybersecurity Analysts, and Salesforce Developers.
• **Technical Vetting**: Every candidate is evaluated by Clyptus practicing solution architects before submission.
• **Join Clyptus**: Send your resume to hr.india@clyptus.com or explore our Careers page.`,
    quickActions: [
      { label: 'IT Recruiting', pageTarget: 'Recruiting' },
      { label: 'Explore Careers', pageTarget: 'Careers' },
      { label: 'Send Resume', chatQuery: 'What are your official emails?' }
    ]
  },

  // 16. INDUSTRIES TRANSFORMED
  {
    category: 'industries',
    keywords: ['industries', 'sectors', 'banking', 'healthcare', 'retail', 'manufacturing', 'ports', 'logistics', 'energy', 'telecom'],
    patterns: [/industr(ies|y)/i, /sectors?/i, /who do you serve/i],
    answer: `**Industries We Transform**

Clyptus delivers domain-tailored software and architectures across major global industries:

• **Manufacturing & Industry 4.0**: Smart shop-floor integration, IoT telemetry, and digital twins.
• **Banking, Financial Services & Insurance (BFSI)**: Secure transaction engines, fraud mitigation, and regulatory compliance.
• **Healthcare & Life Sciences**: HIPAA-compliant patient platforms, medical imaging AI, and EHR integrations.
• **Ports, Maritime & Logistics**: Terminal operating systems, voyage tracking, and supply chain automation.
• **Retail & E-commerce**: Omnichannel commerce, personalized AI recommendation engines, and inventory optimization.
• **Energy, Utilities, & Oil & Gas**: Asset management, predictive maintenance, and sustainability reporting.`,
    quickActions: [
      { label: 'Explore Industries', pageTarget: 'Industries' },
      { label: 'Verified Case Studies', pageTarget: 'Projects' }
    ]
  },

  // 17. CLIENTS & PARTNERS
  {
    category: 'clients',
    keywords: ['clients', 'customers', 'partners', 'deloitte', 'panasonic', 'ntt data', 'hcl', 'hexaware', 'ctrls', 'welspun', 'saudia cargo', 'greenko'],
    patterns: [/clients?|customers?|partners?/i, /who (uses|trusts) clyptus/i],
    answer: `**Trusted Enterprise Clients & Partners**

Clyptus works with leading global organizations across North America, EMEA, and APAC:

• **Global Leaders**: Oracle, Deloitte, Panasonic, NTT DATA, HCL Tech, LTIMindtree, and Hexaware.
• **Infrastructure & Tech**: CtrlS Datacenters, Welspun Group, Greenko Energy, and ThingsAlive.
• **Logistics & Ports**: Saudia Cargo, Lumut Port, and Penang Port.
• **Industrial & Enterprise**: Hume Cement, Al Nasser Group, Al Nasir Company, Artwright, neev SYSTEMS, and DGSOFT Technologies.

We are also an official **SAP Silver Partner**.`,
    quickActions: [
      { label: 'Client Case Studies', pageTarget: 'Projects' },
      { label: 'Start an Enterprise Project', pageTarget: 'Contact' }
    ]
  },

  // 18. GENERAL CONTACT & CONSULTATION
  {
    category: 'contact',
    keywords: ['contact', 'reach', 'talk', 'consultation', 'quote', 'pricing', 'cost', 'inquire', 'support', 'get in touch', 'book call', 'schedule meeting'],
    patterns: [/contact/i, /consultation|quote|pricing|cost/i, /how (to|can I) (reach|connect)/i, /get in touch/i],
    answer: `**Get in Touch with Clyptus Software Solutions**

We are here to assist you with technical assessments, architecture roadmaps, or project staffing:

• **Primary Email Contacts**:
  Sales & Client Proposals: Sales@clyptus.com
  General Inquiries: info@clyptus.com / contact@clyptus.com
  Talent & HR: hr.india@clyptus.com

• **Direct Phone Lines**:
  India: +91 77999 88139
  UAE: +971 52 350 3297
  USA: +1 480 427-6373

• **Corporate Hubs**:
  Hyderabad: Manjeera Trinity Corporate, JNTU-Hitech City Rd
  Dubai: 101 Sheikh Zayed Rd, DIFC
  California: 45627 Basswood Ct, Temecula, CA

Fill out our interactive form on the Contact page for a response within 24 hours.`,
    quickActions: [
      { label: 'Open Contact Form', pageTarget: 'Contact' },
      { label: 'View All Emails', chatQuery: 'What are your official emails?' },
      { label: 'Company Journey', chatQuery: 'Tell me about the company journey' },
      { label: 'Browse Services', pageTarget: 'Services' }
    ]
  },
  // 19. INSIGHTS & TECHNICAL BLOGS
  {
    category: 'insights',
    keywords: [
      'insights', 'insight', 'blogs', 'blog', 'articles', 'article', 'whitepapers', 
      'technical blog', 'research', 'reads', 'roadmap', 'ecc migration roadmap', 
      'where is insights', 'where is blogs', 'insights page', 'blogs page'
    ],
    patterns: [
      /\b(insights?|blogs?|articles?|whitepapers?)\b/i,
      /\bwhere (is|are) (the )?(insights?|blogs?|articles?)\b/i,
      /\b(open|view|show|see|find|navigate to) (the )?(insights?|blogs?)\b/i
    ],
    answer: `**Clyptus Insights & Technical Thought Leadership**

Our Insights hub features deep-dive architectural analyses, migration roadmaps, and enterprise engineering whitepapers:

• **Featured Technical Publications**:
  1. *Migrating ECC 6.0 to SAP S/4HANA Cloud: A 2026 Strategic Roadmap* — Essential brownfield vs. greenfield conversion frameworks with zero business downtime.
  2. *Building Agentic Workflows for Automated SAP Financials* — Deploying multi-agent LLM systems that slash invoice reconciliation cycle times by 80%.
  3. *Cloud-Native Zero-Trust Architecture* — Microsegmentation and least-privilege governance across AWS and Azure workloads.

Click the navigation button below to explore all published insights directly on the website.`,
    quickActions: [
      { label: 'Go to Insights Page', pageTarget: 'Blogs' },
      { label: 'ERP & SAP Services', pageTarget: 'SAP' },
      { label: 'AI Solutions', pageTarget: 'AI' },
      { label: 'All Services', pageTarget: 'Services' }
    ]
  },

  // 20. HR POLICIES & EMPLOYEE COMPLIANCE PORTAL
  {
    category: 'hr-policies',
    keywords: [
      'hr policies', 'hr policy', 'policies', 'policy', 'employee handbook', 
      'posh', 'leave policy', 'maternity policy', 'disciplinary policy', 
      'code of conduct', 'benefits policy', 'compliance portal', 'hr portal',
      'where is hr policies', 'where is policies', 'where are policies'
    ],
    patterns: [
      /\b(hr\s?policies|employee policies|compliance portal|employee handbook)\b/i,
      /\b(posh|leave policy|maternity policy|disciplinary policy|code of conduct|benefits policy)\b/i,
      /\bwhere (is|are) (the )?(hr\s?policies?|policies?)\b/i
    ],
    answer: `**Clyptus HR Policies & Employee Compliance Portal**

Our official corporate repository contains all workplace guidelines, employee entitlements, and compliance frameworks:

• **Available Policy Documents (Protected PDF Downloads)**:
  1. *Code of Conduct & Professional Ethics*
  2. *Employee Benefits & Healthcare Coverage*
  3. *Leave, Maternity & Paternity Policy*
  4. *Disciplinary Policy & Dispute Resolution*
  5. *Grievance Redressal Procedure*
  6. *Clyptus Employee Handbook*
  7. *POSH (Prevention of Sexual Harassment) Policy*
  8. *Enterprise Data Privacy & Confidentiality Policy*
  9. *Rejoin & Alumni Rehire Policy*

• **Secure Corporate Access**:
  The portal is protected for verified employees and authorized compliance auditors with encrypted credential login.`,
    quickActions: [
      { label: 'Go to HR Policies Portal', pageTarget: 'HR Policies' },
      { label: 'Explore Careers', pageTarget: 'Careers' },
      { label: 'Email HR Team', chatQuery: 'What are your official emails?' }
    ]
  },

  // 21. FULL WEBSITE OVERVIEW & SITE DIRECTORY
  {
    category: 'website-overview',
    keywords: [
      'full website details', 'everything about the website', 'website details', 
      'tell me about the website', 'website map', 'site map', 'website guide', 
      'all pages', 'where is everything', 'what is on this website', 'pages on website'
    ],
    patterns: [
      /\b(full website details|everything about the website|tell me about the website)\b/i,
      /\b(what is on this website|website (details|map|guide|overview)|all pages)\b/i,
      /\b(where is everything|website directory)\b/i
    ],
    answer: `**Clyptus Software Solutions — Complete Website Directory**

Welcome to Clyptus! Here is the complete overview of all sections, pages, and services available on our website:

1. **Company & Leadership**
   • **Home**: 3D interactive hero, core practice cards, and live enterprise metrics.
   • **About Us**: Founded in 2014, decade-long milestones, leadership by **Vamsi Krishna**, and global vision.

2. **8 Core Enterprise Services**
   • **ERP & SAP (SAP Silver Partner)**: S/4HANA migrations, SAP BRIM billing, and SAP BTP clean core.
   • **Artificial Intelligence**: Bespoke GenAI, LLM fine-tuning, RAG, and autonomous Agentic AI swarms.
   • **Cloud & DevOps**: Multi-cloud consulting, IaaS/PaaS, Kubernetes, and zero-downtime migrations.
   • **Cybersecurity**: 24/7 Managed SOC, Zero Trust, ISO 27001, and SOC 2 Type II audit readiness.
   • **CRM Solutions**: SAP Customer Experience (SAP CX), Microsoft Dynamics 365, and omnichannel CPQ.
   • **Salesforce**: Sales Cloud, Service Cloud, Lightning Web Components, and Salesforce Agentforce.
   • **Data Engineering**: Modern Lakehouses on Snowflake, Databricks, BigQuery, and real-time Kafka streaming.
   • **IT Recruiting**: Specialized tech staffing, contract-to-hire, and 330+ vetted engineers.

3. **Resources & Insights**
   • **Insights & Blogs**: In-depth technical articles, 2026 SAP migration roadmaps, and AI architecture guides.
   • **HR Policies**: Secure corporate portal for verified employee handbooks and compliance policies.
   • **Careers**: Active job vacancies, company culture, employee benefits, and resume submission.

4. **Global Contact & Offices**
   • **Contact Us**: Interactive 3D globe and offices in **Hyderabad (HQ)**, **Dubai (DIFC)**, and **California (USA)**.

Use any of the buttons below to jump directly to that page!`,
    quickActions: [
      { label: 'Browse All Services', pageTarget: 'Services' },
      { label: 'Go to Insights Page', pageTarget: 'Blogs' },
      { label: 'Go to ERP & SAP Services', pageTarget: 'SAP' },
      { label: 'Go to About Us', pageTarget: 'About' },
      { label: 'Go to Contact Page', pageTarget: 'Contact' }
    ]
  }
];

// Stopwords that shouldn't inflate keyword matches or mislead category selection
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'by',
  'can', 'clyptus', 'could', 'did', 'do', 'does', 'doing', 'down', 'during',
  'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself',
  'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself',
  'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only',
  'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some', 'such',
  'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those',
  'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which',
  'while', 'who', 'whom', 'why', 'will', 'with', 'you', 'your', 'yours', 'yourself', 'yourselves', 'please', 'tell', 'show'
]);

export const ClyptusAiChatbot: React.FC<ClyptusAiChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? Math.min(450, window.innerWidth - 32) : 450,
    height: 600
  });
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! 👋 Welcome to Clyptus Software Solutions. I'm Keva`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isTyping]);

  // Window resize handler to maintain responsive bounds
  useEffect(() => {
    const handleWindowResize = () => {
      setDimensions((prev) => ({
        width: Math.min(prev.width, window.innerWidth - 32),
        height: Math.min(prev.height, window.innerHeight - 40)
      }));
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // Drag at edge or corner to resize chat window
  const startResize = (
    e: React.MouseEvent | React.TouchEvent, 
    direction: 'left' | 'bottom' | 'bottom-left'
  ) => {
    e.preventDefault();
    setIsResizing(true);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const startX = clientX;
    const startY = clientY;
    const startWidth = dimensions.width;
    const startHeight = dimensions.height;

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;

      const maxWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 850) : 850;
      const maxHeight = typeof window !== 'undefined' ? Math.min(window.innerHeight - 40, 900) : 900;
      const minWidth = 320;
      const minHeight = 360;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction === 'left' || direction === 'bottom-left') {
        newWidth = startWidth + (startX - currentX);
      }
      if (direction === 'bottom' || direction === 'bottom-left') {
        newHeight = startHeight + (currentY - startY);
      }

      setDimensions({
        width: Math.max(minWidth, Math.min(maxWidth, newWidth)),
        height: Math.max(minHeight, Math.min(maxHeight, newHeight))
      });
    };

    const onEnd = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    document.body.style.userSelect = 'none';
    if (direction === 'left') document.body.style.cursor = 'w-resize';
    else if (direction === 'bottom') document.body.style.cursor = 's-resize';
    else if (direction === 'bottom-left') document.body.style.cursor = 'sw-resize';

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  // Dedicated Direct Navigation Matrix for all Pages on Clyptus Website
  const PAGE_NAV_DIRECTORY: {
    id: string;
    pageTarget: string;
    name: string;
    buttonLabel: string;
    patterns: RegExp[];
    answer: string;
    secondaryActions: QuickAction[];
  }[] = [
    {
      id: 'insights',
      pageTarget: 'Blogs',
      name: 'Insights & Technical Blogs',
      buttonLabel: 'Go to Insights Page',
      patterns: [
        /\bwhere (is|are) (the )?(insights?|blogs?|articles?|whitepapers?)\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(insights?|blogs?|articles?)\b/i,
        /\b(where can i (find|read|see) (the )?(insights?|blogs?|articles?))\b/i,
        /\b(insights?|blogs?)(\s+page|\s+section)?$/i
      ],
      answer: `**Clyptus Insights & Technical Thought Leadership**\n\nOur Insights hub features deep-dive architectural analyses, migration roadmaps, and enterprise engineering whitepapers:\n\n• **Featured Publications**:\n  1. *Migrating ECC 6.0 to SAP S/4HANA Cloud: A 2026 Strategic Roadmap*\n  2. *Building Agentic Workflows for Automated SAP Financials*\n  3. *Cloud-Native Zero-Trust Architecture across AWS & Azure*\n\nClick the button below to navigate directly to the Insights page.`,
      secondaryActions: [
        { label: 'ERP & SAP Services', pageTarget: 'SAP' },
        { label: 'AI Solutions', pageTarget: 'AI' }
      ]
    },
    {
      id: 'erp',
      pageTarget: 'SAP',
      name: 'ERP & SAP Services',
      buttonLabel: 'Go to ERP & SAP Services',
      patterns: [
        /\bwhere (is|are) (the )?(erp|sap|s4hana|s\/4hana|hana|brim|btp)(\s+services?|\s+page)?\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(erp|sap|s4hana)\b/i,
        /\b(where can i (find|see) (the )?(erp|sap))\b/i,
        /\b(erp|sap)(\s+services?|\s+page)?$/i
      ],
      answer: `**Clyptus ERP & SAP Practice (SAP Silver Partner)**\n\nWe provide complete enterprise ERP strategy, implementations, migrations, and ongoing management:\n\n• **Core Offerings**:\n  • **SAP S/4HANA**: Greenfield implementations, brownfield system conversions, and RISE with SAP.\n  • **SAP BRIM**: Subscription Order Management (SOM), Convergent Charging (CC), and FI-CA / RAR.\n  • **SAP BTP**: Cloud-native extensions, CPI integrations, and clean-core architecture.\n  • **24/7 Global AMS**: Post go-live stabilization, hypercare, and proactive SLA-backed support.\n\nClick the button below to jump straight to our ERP & SAP services page.`,
      secondaryActions: [
        { label: 'Browse All Services', pageTarget: 'Services' },
        { label: 'Client Case Studies', pageTarget: 'Projects' }
      ]
    },
    {
      id: 'cloud',
      pageTarget: 'Cloud',
      name: 'Cloud & DevOps Services',
      buttonLabel: 'Go to Cloud Services',
      patterns: [
        /\bwhere (is|are) (the )?(cloud|aws|azure|gcp|devops|multi-cloud)(\s+services?|\s+page)?\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(cloud|aws|azure|devops)\b/i,
        /\b(where can i (find|see) (the )?cloud)\b/i,
        /\b(cloud|multi-cloud)(\s+services?|\s+page)?$/i
      ],
      answer: `**Multi-Cloud & DevOps Engineering**\n\nWe architect resilient, cost-optimized, and elastic cloud foundations across major providers:\n\n• **Cloud Platforms**: AWS, Microsoft Azure, and Google Cloud Platform (GCP).\n• **Capabilities**: Microservices, containerization (Docker, Kubernetes EKS/AKS/GKE), and serverless architectures.\n• **Zero-Downtime Migration**: End-to-end database and application modernization with rollback guarantees.\n\nClick below to navigate directly to the Cloud Services page.`,
      secondaryActions: [
        { label: 'Cybersecurity', pageTarget: 'Security' },
        { label: 'Browse All Services', pageTarget: 'Services' }
      ]
    },
    {
      id: 'ai',
      pageTarget: 'AI',
      name: 'Artificial Intelligence & GenAI',
      buttonLabel: 'Go to AI Solutions',
      patterns: [
        /\bwhere (is|are) (the )?(ai|genai|generative ai|agentforce|agents?)(\s+solutions?|\s+services?|\s+page)?\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(ai|genai|generative ai)\b/i,
        /\b(where can i (find|see) (the )?(ai|genai))\b/i,
        /\b(ai|genai|generative ai)(\s+solutions?|\s+services?|\s+page)?$/i
      ],
      answer: `**Artificial Intelligence & GenAI Engineering**\n\nClyptus builds enterprise-grade AI applications and autonomous workflow engines:\n\n• **Custom GenAI & Fine-Tuning**: Bespoke enterprise LLMs, secure RAG architectures, and internal copilots.\n• **Autonomous AI Agent Swarms**: Multi-agent systems that autonomously execute multi-step workflows across ERP, CRM, and databases.\n• **MLOps & Governance**: Zero-data-leakage guardrails, drift monitoring, and continuous retraining.\n\nClick below to open our dedicated AI Solutions page.`,
      secondaryActions: [
        { label: 'ERP & SAP Services', pageTarget: 'SAP' },
        { label: 'Data Engineering', pageTarget: 'DataEngineering' }
      ]
    },
    {
      id: 'security',
      pageTarget: 'Security',
      name: 'Cybersecurity & Compliance',
      buttonLabel: 'Go to Cybersecurity',
      patterns: [
        /\bwhere (is|are) (the )?(security|cybersecurity|cyber|zero trust|soc)(\s+services?|\s+page)?\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(security|cybersecurity|cyber)\b/i,
        /\b(where can i (find|see) (the )?(security|cybersecurity))\b/i,
        /\b(security|cybersecurity)(\s+services?|\s+page)?$/i
      ],
      answer: `**Cybersecurity & Regulatory Compliance**\n\nOur defense-in-depth security practice safeguards enterprise infrastructure and data:\n\n• **24/7 Managed SOC**: Real-time SIEM/SOAR incident detection, automated containment, and threat intelligence.\n• **Compliance Readiness**: ISO/IEC 27001, SOC 2 Type II, HIPAA, GDPR, PCI DSS, and NIST CSF.\n• **Zero-Trust & Pentesting**: Identity & Access Management (IAM), micro-segmentation, and offensive pen testing.\n\nClick below to navigate to the Cybersecurity page.`,
      secondaryActions: [
        { label: 'Cloud Services', pageTarget: 'Cloud' },
        { label: 'Contact Us', pageTarget: 'Contact' }
      ]
    },
    {
      id: 'crm',
      pageTarget: 'CRM',
      name: 'CRM & Customer Experience',
      buttonLabel: 'Go to CRM Services',
      patterns: [
        /\bwhere (is|are) (the )?(crm|dynamics 365|sap cx|customer experience)(\s+services?|\s+page)?\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(crm|dynamics 365)\b/i,
        /\b(where can i (find|see) (the )?crm)\b/i,
        /\bcrm(\s+services?|\s+page)?$/i
      ],
      answer: `**CRM & Customer Experience Engineering**\n\nClyptus unifies front-office engagement with back-office execution:\n\n• **SAP CX**: Sales Cloud, Service Cloud, Commerce Cloud, Customer Data Platform (CDP), and Emarsys.\n• **Microsoft Dynamics 365**: Connected sales, customer service, and automated field services.\n• **Omnichannel CPQ**: High-speed product configuration and automated subscription pricing.\n\nClick below to open our CRM Services page.`,
      secondaryActions: [
        { label: 'Salesforce Solutions', pageTarget: 'Salesforce' },
        { label: 'Browse All Services', pageTarget: 'Services' }
      ]
    },
    {
      id: 'salesforce',
      pageTarget: 'Salesforce',
      name: 'Salesforce & Agentforce',
      buttonLabel: 'Go to Salesforce Solutions',
      patterns: [
        /\bwhere (is|are) (the )?(salesforce|agentforce|sfdc)(\s+services?|\s+page)?\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(salesforce|agentforce)\b/i,
        /\b(where can i (find|see) (the )?salesforce)\b/i,
        /\b(salesforce|agentforce)(\s+services?|\s+page)?$/i
      ],
      answer: `**Salesforce Solutions & Agentforce AI**\n\nAccelerate revenue pipelines with customized Salesforce ecosystems and autonomous AI agents:\n\n• **Salesforce Agentforce**: Autonomous AI agents handling customer inquiries, qualifying leads, and taking actions.\n• **Core Cloud Deployments**: Sales Cloud, Service Cloud, Experience Cloud, and Marketing Cloud.\n• **Custom Apex & LWC**: Bespoke Lightning Web Components and MuleSoft enterprise integrations.\n\nClick below to jump to the Salesforce page.`,
      secondaryActions: [
        { label: 'CRM Services', pageTarget: 'CRM' },
        { label: 'Browse All Services', pageTarget: 'Services' }
      ]
    },
    {
      id: 'data',
      pageTarget: 'DataEngineering',
      name: 'Data Engineering & Lakehouses',
      buttonLabel: 'Go to Data Engineering',
      patterns: [
        /\bwhere (is|are) (the )?(data engineering|lakehouses?|snowflake|databricks|bigquery)(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(data engineering|lakehouse)\b/i,
        /\b(where can i (find|see) (the )?data engineering)\b/i,
        /\bdata engineering(\s+page)?$/i
      ],
      answer: `**Data Engineering & Modern Lakehouse Architectures**\n\nWe transform enterprise data silos into clean, real-time analytics engines:\n\n• **Modern Data Lakehouses**: Snowflake, Databricks, and Google Cloud BigQuery implementations.\n• **Real-Time Streaming**: Apache Kafka, Spark, and automated dbt transformations.\n• **Enterprise BI**: High-performance executive dashboards in Power BI, Tableau, and Looker.\n\nClick below to open our Data Engineering page.`,
      secondaryActions: [
        { label: 'AI Solutions', pageTarget: 'AI' },
        { label: 'Cloud Services', pageTarget: 'Cloud' }
      ]
    },
    {
      id: 'recruiting',
      pageTarget: 'Recruiting',
      name: 'IT Staffing & Global Talent',
      buttonLabel: 'Go to Talent Acquisition',
      patterns: [
        /\bwhere (is|are) (the )?(recruiting|recruitment|talent acquisition|staffing|hire talent)(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(recruiting|talent acquisition|staffing)\b/i,
        /\b(where can i (find|see) (the )?(recruiting|staffing|talent))\b/i,
        /\b(recruiting|talent acquisition|staffing)(\s+page)?$/i
      ],
      answer: `**IT Recruiting & Specialized Talent Delivery**\n\nRapid deployment of rigorously vetted enterprise technology talent:\n\n• **Flexible Models**: Contract staffing, contract-to-hire, permanent placement, and offshore squads.\n• **Specializations**: Certified SAP consultants, Cloud Architects, AI Engineers, and Cybersecurity specialists.\n• **Technical Vetting**: Every candidate is screened by practicing solution architects before submission.\n\nClick below to open our Talent Acquisition page.`,
      secondaryActions: [
        { label: 'Explore Careers', pageTarget: 'Careers' },
        { label: 'Contact Us', pageTarget: 'Contact' }
      ]
    },
    {
      id: 'projects',
      pageTarget: 'Projects',
      name: 'Case Studies & Client Projects',
      buttonLabel: 'Go to Case Studies',
      patterns: [
        /\bwhere (is|are) (the )?(case studies|projects|client work|success stories|portfolio)(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(case studies|projects|client work)\b/i,
        /\b(where can i (find|see) (the )?(case studies|projects))\b/i,
        /\b(case studies|projects)(\s+page)?$/i
      ],
      answer: `**Client Case Studies & Enterprise Projects Ledger**\n\nExplore real-world transformation milestones and verified enterprise results:\n\n• **SAP S/4HANA & BRIM Migrations**: Clean-core rollouts for telecom and retail giants in UAE and North America.\n• **Agentic AI & Document Intelligence**: Automated financial audit and invoice reconciliation copilots.\n• **Multi-Cloud Modernization**: Zero-downtime AWS and Azure migrations for healthcare organizations.\n\nClick below to view our Case Studies page.`,
      secondaryActions: [
        { label: 'Explore Industries', pageTarget: 'Industries' },
        { label: 'Browse All Services', pageTarget: 'Services' }
      ]
    },
    {
      id: 'industries',
      pageTarget: 'Industries',
      name: 'Industries Transformed',
      buttonLabel: 'Explore Industries',
      patterns: [
        /\bwhere (is|are) (the )?(industr(ies|y)|sectors?|banking|healthcare|retail|manufacturing|ports)(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(industries|sectors)\b/i,
        /\b(where can i (find|see) (the )?industries)\b/i,
        /\bindustr(ies|y)(\s+page)?$/i
      ],
      answer: `**Industries We Transform**\n\nClyptus delivers domain-tailored software and architectures across major global industries:\n\n• **Manufacturing & Industry 4.0**: Smart shop-floor integration, IoT telemetry, and digital twins.\n• **BFSI (Banking & Insurance)**: Secure transaction engines, fraud mitigation, and compliance.\n• **Healthcare & Life Sciences**: HIPAA-compliant patient platforms and medical imaging AI.\n• **Ports & Logistics**: Terminal operating systems and global supply chain automation.\n\nClick below to explore our Industries page.`,
      secondaryActions: [
        { label: 'Case Studies', pageTarget: 'Projects' },
        { label: 'Browse All Services', pageTarget: 'Services' }
      ]
    },
    {
      id: 'about',
      pageTarget: 'About',
      name: 'About Us & Company Journey',
      buttonLabel: 'Go to About Us',
      patterns: [
        /\bwhere (is|are) (the )?(about us|company journey|our story|history|leadership|founder|vamsi krishna)(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(about us|about page|company story)\b/i,
        /\b(where can i (find|see) (the )?(about us|company journey))\b/i,
        /\b(about us|about)(\s+page)?$/i
      ],
      answer: `**About Clyptus Software Solutions**\n\nDiscover over a decade of enterprise digital transformation and leadership:\n\n• **Foundation**: Founded in 2014; certified **SAP Silver Partner** with 250+ consultants globally.\n• **Founder & Strategic Leader**: **Vamsi Krishna** guides our mission, global alliances, and technological innovation.\n• **Mission**: *"Turning Ideas Into Impact"* | **Vision**: *"Shaping Tomorrow Through Innovation"*.\n• **Global Footprint**: Delivery hubs across Hyderabad (India), Dubai (UAE DIFC), and California (USA).\n\nClick below to navigate to the About Us page.`,
      secondaryActions: [
        { label: 'Explore Careers', pageTarget: 'Careers' },
        { label: 'Contact Us', pageTarget: 'Contact' }
      ]
    },
    {
      id: 'careers',
      pageTarget: 'Careers',
      name: 'Careers & Job Openings',
      buttonLabel: 'Go to Careers Page',
      patterns: [
        /\bwhere (is|are) (the )?(careers?|jobs?|openings?|hiring|vacanc(y|ies))(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(careers?|jobs?)\b/i,
        /\b(where can i (find|see) (the )?(careers?|jobs?))\b/i,
        /\b(careers?|jobs?)(\s+page)?$/i
      ],
      answer: `**Careers at Clyptus Software Solutions**\n\nJoin our rapidly expanding global engineering and enterprise consulting teams:\n\n• **Active Roles**: SAP S/4HANA Consultants, Cloud Solutions Architects, GenAI Engineers, SAP BRIM Specialists, Power BI Developers.\n• **Workplace Perks**: Hybrid work model, global mobility, competitive compensation, and sponsored certifications.\n• **Direct Application**: Send resumes directly to hr.india@clyptus.com, hr.uae@clyptus.com, or hr.usa@clyptus.com.\n\nClick below to view the Careers page.`,
      secondaryActions: [
        { label: 'HR Policies Portal', pageTarget: 'HR Policies' },
        { label: 'Email HR Team', chatQuery: 'What are your official emails?' }
      ]
    },
    {
      id: 'hr-policies',
      pageTarget: 'HR Policies',
      name: 'HR Policies Portal',
      buttonLabel: 'Go to HR Policies Portal',
      patterns: [
        /\bwhere (is|are) (the )?(hr policies|employee policies|employee handbook|posh policy|leave policy)(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(hr policies|policies)\b/i,
        /\b(where can i (find|see) (the )?(hr policies|policies))\b/i,
        /\b(hr policies|policies)(\s+page)?$/i
      ],
      answer: `**Clyptus HR Policies & Compliance Portal**\n\nOur secure internal repository for company standards, employee entitlements, and compliance:\n\n• **Protected Policy Documents**: Code of Conduct, Employee Benefits, Leave & Maternity Policy, Disciplinary Policy, Grievance Redressal, Employee Handbook, POSH, and Data Privacy.\n• **Secure Login**: Access is protected for verified employees and authorized compliance auditors.\n\nClick below to open the HR Policies Portal.`,
      secondaryActions: [
        { label: 'Explore Careers', pageTarget: 'Careers' },
        { label: 'Contact Us', pageTarget: 'Contact' }
      ]
    },
    {
      id: 'contact',
      pageTarget: 'Contact',
      name: 'Contact Us & Global Offices',
      buttonLabel: 'Go to Contact Page',
      patterns: [
        /\bwhere (is|are) (the )?(contact|contact us|offices?|addresses?|headquarters|phone|call)(\s+page)?\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(contact|contact us|offices)\b/i,
        /\b(where can i (find|reach|call) (clyptus|you))\b/i,
        /\b(contact|contact us)(\s+page)?$/i
      ],
      answer: `**Get in Touch with Clyptus Software Solutions**\n\nConnect with our leadership, sales, and engineering teams:\n\n• **Regional Phone Lines**: India: +91 77999 88139 | UAE: +971 52 350 3297 | USA: +1 480 427-6373\n• **Official Emails**: Sales@clyptus.com | hr.india@clyptus.com | contact@clyptus.com\n• **Global Offices**: Hyderabad HQ (Manjeera Trinity), Dubai DIFC (Sheikh Zayed Rd), California (Temecula).\n\nClick below to open our Contact page with interactive 3D globe and inquiry form.`,
      secondaryActions: [
        { label: 'View All Emails', chatQuery: 'What are your official emails?' },
        { label: 'Browse All Services', pageTarget: 'Services' }
      ]
    },
    {
      id: 'services',
      pageTarget: 'Services',
      name: 'All Enterprise Services',
      buttonLabel: 'Browse All Services',
      patterns: [
        /\bwhere (is|are) (the )?(all services|services page|services hub|services overview|what services|offerings)\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(services|services page)\b/i,
        /\b(where can i (find|see) (all )?services)\b/i,
        /\bservices(\s+page)?$/i
      ],
      answer: `**Clyptus Enterprise Services Portfolio**\n\nWe deliver end-to-end digital transformation across 8 specialized practices:\n\n1. **ERP & SAP (Silver Partner)**: S/4HANA, BRIM, and BTP integrations.\n2. **AI & GenAI**: Agentic swarms, bespoke LLMs, and RAG pipelines.\n3. **Multi-Cloud Architecture**: AWS, Azure, GCP, and Kubernetes.\n4. **Cybersecurity**: 24/7 Managed SOC and Zero-Trust architecture.\n5. **CRM Services**: SAP CX and Microsoft Dynamics 365.\n6. **Salesforce**: Agentforce AI, Sales/Service Cloud, and LWC.\n7. **Data Engineering**: Snowflake, Databricks, and streaming Kafka pipelines.\n8. **IT Staffing**: 330+ vetted tech professionals for rapid deployment.\n\nClick below to view the Services hub.`,
      secondaryActions: [
        { label: 'ERP & SAP', pageTarget: 'SAP' },
        { label: 'AI Solutions', pageTarget: 'AI' }
      ]
    },
    {
      id: 'home',
      pageTarget: 'Home',
      name: 'Home Page',
      buttonLabel: 'Go to Home Page',
      patterns: [
        /\bwhere (is|are) (the )?(home page|main page|landing page)\b/i,
        /\b(take me to|navigate to|open|show me|view|go to) (the )?(home|home page|main page)\b/i,
        /\bhome(\s+page)?$/i
      ],
      answer: `**Clyptus Home Page**\n\nOur landing page features the 3D spiral slider showcasing our flagship enterprise services, live corporate statistics, and transformation stories.\n\nClick below to return directly to the Home page.`,
      secondaryActions: [
        { label: 'Browse All Services', pageTarget: 'Services' },
        { label: 'Go to Insights Page', pageTarget: 'Blogs' }
      ]
    }
  ];

  // Answer matching engine
  const findAnswer = (query: string): { text: string; quickActions?: QuickAction[] } => {
    const cleanQuery = query.toLowerCase().trim();

    // 0. Dedicated Direct Page Navigation Engine ("where is...", "go to...", "take me to...", page names)
    for (const nav of PAGE_NAV_DIRECTORY) {
      for (const pattern of nav.patterns) {
        if (pattern.test(cleanQuery)) {
          return {
            text: nav.answer,
            quickActions: [
              { label: nav.buttonLabel, pageTarget: nav.pageTarget },
              ...nav.secondaryActions
            ]
          };
        }
      }
    }

    // 1. Direct Regex Pattern Matching against Knowledge Base
    for (const item of KNOWLEDGE_BASE) {
      for (const pattern of item.patterns) {
        if (pattern.test(cleanQuery)) {
          return { text: item.answer, quickActions: item.quickActions };
        }
      }
    }

    // 2. Keyword Scoring Match with Stopword Filtering
    const rawTokens = cleanQuery.split(/[\s,?.!'"()]+/).filter(Boolean);
    const meaningfulTokens = rawTokens.filter((token) => !STOP_WORDS.has(token) && token.length > 2);

    let bestMatch: KnowledgeArticle | null = null;
    let highestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      let score = 0;

      for (const kw of item.keywords) {
        const lowerKw = kw.toLowerCase().trim();
        
        // Exact full query matches a keyword
        if (cleanQuery === lowerKw) {
          score += 30;
          continue;
        }

        // Multi-word keyword phrase match (e.g. "office locations", "current project", "sap services")
        if (lowerKw.includes(' ') && cleanQuery.includes(lowerKw)) {
          score += lowerKw.split(' ').length * 12;
          continue;
        }

        // Single keyword exact match in cleanQuery as a whole word
        const wordRegex = new RegExp(`\\b${lowerKw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (wordRegex.test(cleanQuery)) {
          score += 10;
          continue;
        }

        // Meaningful token overlap with keyword
        for (const token of meaningfulTokens) {
          if (lowerKw === token) {
            score += 8;
          } else if (lowerKw.length >= 4 && token.length >= 4 && (lowerKw.includes(token) || token.includes(lowerKw))) {
            score += 3;
          }
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    // High confidence threshold (prevents weak coincidences from picking the wrong topic)
    if (bestMatch && highestScore >= 8) {
      return { text: bestMatch.answer, quickActions: bestMatch.quickActions };
    }

    // 3. Fallback when no match is found (Full, helpful interactive guide to website pages)
    return {
      text: `I couldn't find a direct match for that question.

Here are the main pages and services you can explore across the Clyptus website:
• **ERP & SAP Services**: S/4HANA migrations, SAP BRIM billing, and SAP BTP clean core
• **AI Solutions**: Custom enterprise LLMs, Agentic AI swarms, and predictive analytics
• **Cloud & DevOps**: Multi-cloud consulting across AWS, Azure, GCP, and Kubernetes
• **Insights & Blogs**: 2026 SAP migration roadmaps and technical engineering articles
• **Global Offices**: Contact our hubs in Hyderabad (HQ), Dubai (DIFC), and California

Use any of the buttons below to jump directly to that page:`,
      quickActions: [
        { label: 'Go to Insights Page', pageTarget: 'Blogs' },
        { label: 'Go to ERP & SAP Services', pageTarget: 'SAP' },
        { label: 'Go to Cloud Services', pageTarget: 'Cloud' },
        { label: 'Go to AI Solutions', pageTarget: 'AI' },
        { label: 'Go to Contact Page', pageTarget: 'Contact' }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    // Realistic typing delay
    setTimeout(() => {
      const response = findAnswer(text);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: response.quickActions
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 400);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: `Hello! 👋 Welcome to Clyptus Software Solutions. I'm Keva`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleActionClick = (targetPage?: string) => {
    if (targetPage && onNavigate) {
      onNavigate(targetPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper to parse clean bold, emails, phones, and italics inline
  const renderInlineContent = (text: string) => {
    // Regex matches: bold (**...**), email address, phone number (+...), italic (*...*)
    const pattern = /(\*\*.*?\*\*|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+\d[\d\s()-]{8,}\d|\*.*?\*)/g;
    const parts = text.split(pattern);

    return parts.map((part, pIdx) => {
      if (!part) return null;

      // Clean, elegant bold text - font-semibold instead of font-extrabold
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-semibold text-slate-900 tracking-normal">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Clean inline email links - elegant underline without bulky box borders
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
        return (
          <a
            key={pIdx}
            href={`mailto:${part}`}
            className="font-medium text-blue-600 hover:text-blue-800 underline underline-offset-2 decoration-blue-300 hover:decoration-blue-600 transition-colors select-text inline-flex items-center gap-0.5"
            title={`Send email to ${part}`}
          >
            <span>{part}</span>
          </a>
        );
      }

      // Clean inline phone links
      if (/^\+\d[\d\s()-]{8,}\d$/.test(part)) {
        const cleanPhone = part.replace(/[^+\d]/g, '');
        return (
          <a
            key={pIdx}
            href={`tel:${cleanPhone}`}
            className="font-medium text-slate-700 hover:text-blue-600 underline underline-offset-2 decoration-slate-300 transition-colors select-text inline-flex items-center gap-0.5"
            title={`Call ${part}`}
          >
            <span>{part}</span>
          </a>
        );
      }

      // Italic
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={pIdx} className="italic text-slate-600">
            {part.slice(1, -1)}
          </em>
        );
      }

      return part;
    });
  };

  // Format bold, numbered milestones, and clean readable text
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Standalone Title / Section Header (e.g. "**Title**")
      if (/^\*\*([^*]+)\*\*$/.test(line.trim())) {
        const titleMatch = line.trim().match(/^\*\*([^*]+)\*\*$/);
        return (
          <div key={idx} className="font-semibold text-slate-900 text-[15px] sm:text-base tracking-tight pt-1.5 pb-0.5">
            {titleMatch ? titleMatch[1] : line}
          </div>
        );
      }

      // Numbered items (e.g. "1. ", "2. ")
      const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
      if (numberedMatch) {
        const num = numberedMatch[1];
        const rest = numberedMatch[2];
        return (
          <div key={idx} className="flex items-start gap-2.5 my-1.5 pl-0.5">
            <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-blue-200/70">
              {num}
            </span>
            <div className="flex-1 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
              {renderInlineContent(rest)}
            </div>
          </div>
        );
      }

      // Bullet items (e.g. "• ", "- ")
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        const bulletText = line.replace(/^[\s•-]+/, '');
        return (
          <div key={idx} className="flex items-start gap-2.5 my-1 pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 shrink-0" />
            <div className="flex-1 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
              {renderInlineContent(bulletText)}
            </div>
          </div>
        );
      }

      return (
        <p key={idx} className="text-sm sm:text-[15px] text-slate-700 leading-relaxed my-1">
          {renderInlineContent(line)}
        </p>
      );
    });
  };

  return (
    <div className="font-sans">
      {/* ---------------------------------------------------- */}
      {/* FLOATING TRIGGER BUTTON (TOP RIGHT CORNER)           */}
      {/* ---------------------------------------------------- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="keva-trigger-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 420, damping: 25 }}
            className="fixed top-2.5 sm:top-3 right-3 sm:right-5 lg:top-3 lg:right-7 z-50 flex items-center"
          >
            {/* Rotating Glowing Orange Border Effect Container (Clockwise) */}
            <div className="relative group p-[2px] rounded-full overflow-hidden flex items-center justify-center shadow-[0_2px_14px_rgba(255,113,56,0.28)] hover:shadow-[0_4px_24px_rgba(255,113,56,0.55)] transition-all duration-300 hover:scale-[1.05] active:scale-95">
              
              {/* Clockwise Rotating Conic Orange Glow Beam */}
              <div
                className="absolute inset-[-200%] animate-spin-clockwise pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 260deg, #ff9800 310deg, #ff5722 340deg, #ff3d00 360deg)'
                }}
              />

              {/* Ambient Blurred Orange Halo Behind the Border */}
              <div
                className="absolute inset-[-200%] animate-spin-clockwise blur-sm opacity-75 pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 260deg, #ff9800 310deg, #ff5722 340deg, #ff3d00 360deg)'
                }}
              />

              {/* Inner Pill Button with Exact Keva Logo beside 'Ask Keva' */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-white text-slate-900 px-3.5 py-1.5 sm:px-4 sm:py-2 transition-all cursor-pointer select-none"
                title="Ask Keva"
                aria-label="Ask Keva"
              >
                <KevaBotLogo className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900 group-hover:text-orange-600 transition-colors shrink-0" />
                <span className="font-extrabold text-xs sm:text-sm tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors whitespace-nowrap">
                  Ask Keva
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------- */}
      {/* EXPANDABLE CHATBOT WINDOW (STYLE #1: CORNER SPRING)  */}
      {/* ---------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="keva-chat-window"
            initial={{ opacity: 0, scale: 0.65, x: 20, y: -20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: 0,
              transition: isResizing 
                ? { duration: 0 } 
                : { type: 'spring', stiffness: 380, damping: 28, mass: 0.85 }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.65, 
              x: 20, 
              y: -20,
              transition: { duration: 0.22, ease: [0.32, 0, 0.67, 0] } 
            }}
            style={{
              width: typeof window !== 'undefined' && window.innerWidth < 640 ? undefined : `${dimensions.width}px`,
              height: typeof window !== 'undefined' && window.innerWidth < 640 ? undefined : `${dimensions.height}px`,
              transformOrigin: 'top right'
            }}
            className={`fixed inset-x-2.5 top-2.5 bottom-2.5 sm:inset-auto sm:top-4 sm:right-6 lg:top-3.5 lg:right-8 z-[70] sm:max-w-[calc(100vw-32px)] sm:max-h-[calc(100dvh-32px)] bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),0_0_25px_rgba(255,113,56,0.18)] border border-slate-200/90 flex flex-col overflow-hidden origin-top-right will-change-transform ${
              isResizing ? 'transition-none select-none' : ''
            }`}
          >
          {/* Edge Drag Handles for Resizing (Desktop Only) */}
          <div className="hidden sm:block">
            {/* Left edge drag handle */}
            <div
              onMouseDown={(e) => startResize(e, 'left')}
              onTouchStart={(e) => startResize(e, 'left')}
              className="absolute left-0 top-0 bottom-6 w-2.5 cursor-w-resize hover:bg-blue-500/15 active:bg-blue-500/25 transition-colors z-30"
              title="Drag to resize width"
            />
            {/* Bottom edge drag handle */}
            <div
              onMouseDown={(e) => startResize(e, 'bottom')}
              onTouchStart={(e) => startResize(e, 'bottom')}
              className="absolute left-6 right-0 bottom-0 h-2.5 cursor-s-resize hover:bg-blue-500/15 active:bg-blue-500/25 transition-colors z-30"
              title="Drag to resize height"
            />
            {/* Bottom-Left corner drag handle */}
            <div
              onMouseDown={(e) => startResize(e, 'bottom-left')}
              onTouchStart={(e) => startResize(e, 'bottom-left')}
              className="absolute left-0 bottom-0 w-6 h-6 cursor-sw-resize flex items-end justify-start p-1.5 hover:bg-blue-500/20 active:bg-blue-500/30 rounded-bl-3xl transition-colors z-40 group"
              title="Drag edge to resize"
            >
              <div className="w-2.5 h-2.5 flex flex-col justify-end items-start gap-[2px] opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="w-1 h-[2px] bg-slate-400 group-hover:bg-blue-600 rounded-full" />
                <div className="w-2 h-[2px] bg-slate-400 group-hover:bg-blue-600 rounded-full" />
                <div className="w-2.5 h-[2px] bg-slate-400 group-hover:bg-blue-600 rounded-full" />
              </div>
            </div>
          </div>

          {/* Header Bar (Clean Light Theme) */}
          <div className="shrink-0 relative px-4 sm:px-5 py-3 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-sm">
                <KevaBotLogo className="w-5 h-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div className="flex items-center text-left">
                <h3 className="font-bold text-[15px] text-slate-900 tracking-tight">Ask Keva</h3>
              </div>
            </div>

            {/* Action Buttons: Reset, Close */}
            <div className="flex items-center gap-1 relative z-10">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body - min-h-0 ensures container scrolls and never pushes input off-screen */}
          <div className="flex-1 min-h-0 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 bg-slate-50/60 text-left">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
                  >
                    <div className="flex items-end gap-2 max-w-[92%]">
                      {msg.sender === 'ai' && (
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center shrink-0 mb-1 shadow-2xs">
                          <KevaBotLogo className="w-4 h-4 text-white" />
                        </div>
                      )}

                      <div
                        className={`rounded-2xl px-4 py-3 text-sm sm:text-[15px] leading-relaxed shadow-xs ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-tr-none font-normal'
                            : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none font-normal'
                        }`}
                      >
                        {msg.sender === 'user' ? (
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                        ) : (
                          <div>{renderFormattedText(msg.text)}</div>
                        )}
                      </div>
                    </div>

                    {/* Quick Interactive Suggestions after any AI response (hidden on 1st initial greeting) */}
                    {msg.sender === 'ai' && msg.id !== 'welcome' && msg.id !== 'welcome-reset' && (
                      <div className="flex flex-wrap gap-1.5 mt-2 ml-8 max-w-[92%]">
                        {(msg.quickActions && msg.quickActions.length > 0 
                          ? msg.quickActions 
                          : [
                              { label: 'Official Emails', chatQuery: 'What are your official emails?' },
                              { label: 'Company Journey', chatQuery: 'Tell me about Clyptus journey and history' },
                              { label: 'ERP & SAP Services', pageTarget: 'SAP' },
                              { label: 'AI Solutions', pageTarget: 'AI' }
                            ]
                        ).map((action, aIdx) => {
                          const isPageNav = Boolean(action.pageTarget);
                          return (
                            <button
                              key={aIdx}
                              onClick={() => {
                                if (action.chatQuery) {
                                  handleSendMessage(action.chatQuery);
                                } else if (action.pageTarget) {
                                  handleActionClick(action.pageTarget);
                                }
                              }}
                              className={
                                isPageNav
                                  ? "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white shadow-xs hover:shadow-md hover:scale-[1.03] transition-all cursor-pointer active:scale-95 border border-blue-500/30"
                                  : "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-medium bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-2xs transition-all hover:scale-[1.02] cursor-pointer active:scale-95"
                              }
                            >
                              {isPageNav && <Compass className="w-3.5 h-3.5 text-sky-200 animate-pulse" />}
                              <span>{action.label}</span>
                              <ArrowRight className={`w-3 h-3 ${isPageNav ? 'text-white' : 'text-slate-400'}`} />
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Timestamp */}
                    <span className="text-[9px] text-slate-400 font-mono mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-500 animate-in fade-in">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center shrink-0">
                      <KevaBotLogo className="w-4 h-4 text-white" />
                    </div>
                    <div className="px-3 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Control Bar - shrink-0 ensures input is always fixed and visible */}
              <div className="shrink-0 p-3 bg-white border-t border-slate-200/80 flex flex-col gap-1.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Ask Keva..."
                    className="flex-1 px-4 py-2.5 rounded-full bg-slate-100/90 border border-slate-200 text-sm sm:text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={!inputQuery.trim() || isTyping}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 shadow-xs active:scale-95 transition-all shrink-0 cursor-pointer"
                    title="Send query"
                    aria-label="Send query"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClyptusAiChatbot;
