export interface SliderCard {
  id: string;
  num?: string;
  title: string;
  category: 'cyberpunk' | 'architecture' | 'space' | 'abstract' | 'ui';
  subtitle: string;
  description: string;
  imageUrl: string;
  accentColor: string;
  tags: string[];
  prompt: string;
  pageRoute?: 'SAP' | 'AI' | 'Recruiting';
  stats: {
    fps: number;
    depth: string;
    vertices: string;
    downloads: string;
  };
}

export const SLIDER_CARDS: SliderCard[] = [
  {
    id: 'card-1',
    num: '01',
    title: 'Accelerating Growth',
    category: 'architecture',
    subtitle: 'Helping businesses move forward with confidence.',
    description: 'Helping businesses move forward with confidence through scalable enterprise architecture, modern digital solutions, and strategic advisory.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#0284c7',
    tags: ['Scalable Architecture', 'Strategic Growth', 'Velocity', 'Advisory'],
    pageRoute: 'SAP',
    prompt: 'Accelerate business growth with scalable enterprise architecture and forward momentum.',
    stats: { fps: 60, depth: 'Strategic Growth', vertices: 'Enterprise Scale', downloads: 'Global Delivery' }
  },
  {
    id: 'card-2',
    num: '02',
    title: 'Driving Innovation',
    category: 'abstract',
    subtitle: 'Turning new ideas into meaningful progress.',
    description: 'Turning new ideas into meaningful progress with custom AI solutions, cutting-edge engineering, and next-generation innovation.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#6366f1',
    tags: ['GenAI & Agents', 'Next-Gen Tech', 'Digital Labs', 'R&D'],
    pageRoute: 'AI',
    prompt: 'Drive enterprise innovation by turning advanced AI and technology concepts into high-impact digital solutions.',
    stats: { fps: 60, depth: 'Custom AI Models', vertices: 'Innovation Labs', downloads: 'Rapid Prototyping' }
  },
  {
    id: 'card-3',
    num: '03',
    title: 'Enabling Transformation',
    category: 'architecture',
    subtitle: 'Preparing organizations for what\'s next.',
    description: 'Preparing organizations for what\'s next through comprehensive cloud modernization, digital core redesign, and change agility.',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#8b5cf6',
    tags: ['Digital Core', 'Cloud Modernization', 'Change Agility', 'Workflows'],
    pageRoute: 'SAP',
    prompt: 'Enable full-scale digital transformation with modernized architectures and agile organizational systems.',
    stats: { fps: 60, depth: 'Clean Core ERP', vertices: 'Cloud Native', downloads: 'Modern Operations' }
  },
  {
    id: 'card-4',
    num: '04',
    title: 'Building Resilience',
    category: 'abstract',
    subtitle: 'Supporting adaptability in a changing world.',
    description: 'Supporting adaptability in a changing world with fault-tolerant systems, zero-trust cybersecurity, and reliable cloud operations.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#0d9488',
    tags: ['Fault Tolerance', 'Zero-Trust Security', 'High Availability', 'Continuity'],
    pageRoute: 'SAP',
    prompt: 'Build organizational resilience through zero-trust security and high-availability enterprise architecture.',
    stats: { fps: 60, depth: 'Zero-Trust SecOps', vertices: '99.99% Uptime', downloads: 'Continuous Delivery' }
  },
  {
    id: 'card-5',
    num: '05',
    title: 'Creating Business Value',
    category: 'ui',
    subtitle: 'Connecting technology decisions to business priorities.',
    description: 'Connecting technology decisions to business priorities with data analytics, measurable ROI, and optimized operational workflows.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#0284c7',
    tags: ['Data Analytics', 'ROI Optimization', 'Business Alignment', 'KPI Tracking'],
    pageRoute: 'AI',
    prompt: 'Create sustainable business value by mapping IT investments directly to revenue growth and strategic milestones.',
    stats: { fps: 60, depth: 'Actionable Insights', vertices: 'Direct ROI', downloads: 'Measurable Value' }
  },
  {
    id: 'card-6',
    num: '06',
    title: 'Empowering People',
    category: 'cyberpunk',
    subtitle: 'Putting expertise and collaboration at the center.',
    description: 'Putting expertise and collaboration at the center with elite technical talent, specialized staffing, and human-centered design.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#f59e0b',
    tags: ['Elite Tech Talent', 'Collaborative Culture', 'Global Pods', 'Knowledge Sharing'],
    pageRoute: 'Recruiting',
    prompt: 'Empower global engineering teams with specialized talent pods, knowledge sharing, and agile collaboration.',
    stats: { fps: 60, depth: '250+ Specialists', vertices: 'Talent on Demand', downloads: 'Vetted Talent' }
  },
  {
    id: 'card-7',
    num: '07',
    title: 'Thinking Beyond Today',
    category: 'space',
    subtitle: 'Looking ahead to emerging opportunities.',
    description: 'Looking ahead to emerging opportunities through forward-looking research, emergent tech adoption, and long-range tech strategy.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#06b6d4',
    tags: ['Emerging Tech', 'Future Proofing', 'Autonomous AI', 'Quantum Ready'],
    pageRoute: 'AI',
    prompt: 'Anticipate market disruption by investing in emergent intelligence, autonomous agents, and future-proof systems.',
    stats: { fps: 60, depth: 'Future-Proofing', vertices: 'Emerging Tech', downloads: 'Strategic Roadmap' }
  },
  {
    id: 'card-8',
    num: '08',
    title: 'Growing Together',
    category: 'ui',
    subtitle: 'Building lasting relationships through shared ambition.',
    description: 'Building lasting relationships through shared ambition, transparent communication, and dedicated long-term partnership.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#10b981',
    tags: ['Long-Term Partners', 'Shared Ambition', 'Transparency', 'Co-Innovation'],
    pageRoute: 'Recruiting',
    prompt: 'Foster strategic co-innovation partnerships built on mutual trust, transparency, and relentless pursuit of excellence.',
    stats: { fps: 60, depth: '110+ Customers', vertices: 'Global Reach', downloads: 'Shared Ambition' }
  }
];

export interface SpiralConfig {
  radius: number;          // Helix radius in px (180 - 450)
  pitch: number;           // Vertical elevation step per card (20 - 120)
  tightness: number;       // Rotations per total cards (0.5 - 3)
  tiltAngle: number;       // Stage tilt angle in degrees (-30 to +30)
  perspective: number;     // Camera perspective in px (800 - 2000)
  glassBlur: number;       // Frosted glass blur amount (0 - 20)
  aspectRatio: 'portrait' | 'landscape' | 'square';
  theme: 'tide' | 'matrix' | 'amber' | 'rose';
  autoRotate: boolean;
  rotationSpeed: number;   // Speed multiplier (0.1 - 2.0)
  visibleFarCards: boolean; // Toggle far-side visibility frosted effect
}

export const DEFAULT_SPIRAL_CONFIG: SpiralConfig = {
  radius: 194,
  pitch: 63,
  tightness: 1.3,
  tiltAngle: -1,
  perspective: 1150,
  glassBlur: 10,
  aspectRatio: 'portrait',
  theme: 'tide',
  autoRotate: true,
  rotationSpeed: 0.5,
  visibleFarCards: true,
};
