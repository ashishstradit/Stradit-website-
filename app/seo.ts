import { Metadata } from 'next';

interface MetadataProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export const SITE_URL = 
  process.env.NEXT_PUBLIC_SITE_URL || 
  (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'https://stradit.com');

export const defaultKeywords = [
  'StradIT',
  'Applied AI',
  'Capital Markets AI',
  'Financial Technology',
  'AI Engineering',
  'Global Capability Center',
  'GCC Setup',
  'Automated AI Testing',
  'LLM Governance',
  'Asset Management technology',
  'Data Analytics AI',
  'Cyber Security AI',
  'Cloud Advisory',
  'Blockchain Capital Markets',
  'Digital Assets Infrastructure'
];

/**
 * Constructs Next.js compatible metadata objects for pages.
 */
export function constructMetadata({
  title,
  description,
  path = '',
  image = '/og-image.png', // Default absolute or relative image in public
  noIndex = false
}: MetadataProps): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title: {
      default: title,
      template: `%s | StradIT`
    },
    description,
    keywords: defaultKeywords,
    metadataBase: new URL(SITE_URL),
    verification: {
      google: 'qONa2uSW_olTNX_H3XBIF0gggbsmOdLyvbgcFXfBZFs',
    },
    alternates: {
      canonical: url
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'StradIT',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@stradit_ai'
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
      ],
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png'
    }
  };
}

/**
 * Static metadata mappings for all StradIT pages
 */
export const PAGE_SEO = {
  home: {
    title: 'StradIT — Applied AI & Engineering for Capital Markets',
    description: 'StradIT partners with capital-markets and asset-management leaders to embed production-grade AI and high-quality engineering into the core of their operations.',
    path: '/'
  },
  about: {
    title: 'About StradIT — Our Team and Vision',
    description: 'Learn about StradIT, our mission to bridge artificial intelligence with top-tier software engineering, and our core executive leadership team.',
    path: '/about'
  },
  products: {
    title: 'StradIT Products — Regulated Financial Technology Solutions',
    description: 'Explore StradIT\'s suite of production-ready financial technology products: Kyro, Altro, Furo, Pyro, and Syro.',
    path: '/products',
    noIndex: true
  },
  careers: {
    title: 'Careers — Join the Applied AI & Engineering Team at StradIT',
    description: 'Explore career opportunities at StradIT. Join our global capability center network and help build advanced AI systems for capital markets.',
    path: '/careers'
  },
  contact: {
    title: 'Contact StradIT — Start Your AI Transformation',
    description: 'Get in touch with StradIT to schedule a strategy call. Discuss custom AI development, GCC setup, and infrastructure modernization.',
    path: '/contact'
  },
  gcc: {
    title: 'Global Capability Center (GCC) — StradIT',
    description: 'Build, operate, and scale your own dedicated global capability center. StradIT manages recruitment, operations, and compliance while you retain ownership.',
    path: '/gcc'
  },
  startit: {
    title: 'StartIT Program — Accelerate AI Enablement',
    description: 'Accelerate your digital maturity. The StartIT program delivers rapid AI prototyping, roadmapping, and operational capabilities in weeks.',
    path: '/startit'
  },
  coe: {
    title: 'Centers of Excellence (CoE) — StradIT Capabilities',
    description: 'Explore StradIT\'s specialized practice areas in Applied AI, modern data analytics, cloud infrastructure, automated testing, cybersecurity, and digital assets.',
    path: '/coe'
  },
  coeAi: {
    title: 'Applied AI Center of Excellence — StradIT',
    description: 'Build and deploy enterprise LLMs, agentic workflows, intelligent automation, and robust AI governance frameworks with our expert AI practice.',
    path: '/coe/ai'
  },
  coeData: {
    title: 'Data Analytics CoE — Capital Markets Intelligence — StradIT',
    description: 'Modernize your data infrastructure, establish real-time streaming analytics, and build AI-powered executive dashboards with StradIT.',
    path: '/coe/data'
  },
  coeCyber: {
    title: 'AI-Enhanced Cyber Security CoE — StradIT',
    description: 'Protect your digital assets. Our security practice designs resilient architectures, implements automated threat detection, and ensures audit readiness.',
    path: '/coe/cyber'
  },
  coeCloud: {
    title: 'Cloud & Infrastructure CoE — StradIT',
    description: 'Optimize cloud efficiency, performance, and SRE resilience. Our team guides AI-assisted migrations, platform engineering, and automated scaling.',
    path: '/coe/cloud'
  },
  coeTesting: {
    title: 'Automated AI Testing CoE — StradIT',
    description: 'Ship faster with continuous quality assurance. Our automated testing practice implements AI-driven verification and deep load/resiliency testing.',
    path: '/coe/testing'
  },
  coeDigitalAssets: {
    title: 'Digital Assets & Blockchain CoE — StradIT',
    description: 'Secure, scale, and regulate distributed ledger architectures. StradIT designs on-chain tokenization, smart contracts, and compliance pipelines.',
    path: '/coe/digital-assets'
  },
  csAiAgents: {
    title: 'Case Study: AI Agents for Capital Markets — StradIT',
    description: 'See how StradIT engineered autonomous AI agents to automate complex operations and risk analysis for global financial institutions.',
    path: '/case-studies/ai-agents'
  },
  csCloudAdvisory: {
    title: 'Case Study: Hybrid Cloud Advisory & Migration — StradIT',
    description: 'Discover how we migrated critical legacy systems of a leading asset manager to a secure, resilient hybrid cloud environment.',
    path: '/case-studies/cloud-advisory'
  },
  csCyberResiliency: {
    title: 'Case Study: AI Threat detection & Resiliency — StradIT',
    description: 'Learn how StradIT built real-time threat intelligence and automated disaster recovery workflows for a Tier-1 investment firm.',
    path: '/case-studies/cyber-resiliency'
  },
  csDataAnalytics: {
    title: 'Case Study: Real-time Streaming Analytics & BI — StradIT',
    description: 'Read how StradIT unified multiple fragmented data streams to provide an executive board with instant, reliable dashboards.',
    path: '/case-studies/data-analytics'
  },
  csAutomatedTesting: {
    title: 'Case Study: AI-Powered Quality Engineering & Test Automation — StradIT',
    description: 'See how StradIT introduced automated quality gates that reduced release cycle times by 70% while improving application stability.',
    path: '/case-studies/automated-ai-testing'
  }
};
