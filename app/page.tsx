import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'
import LandingCarousel from '@/components/LandingCarousel'
import CoeCard from '@/components/CoeCard'
import { constructMetadata, PAGE_SEO } from './seo'
import JsonLd, { getOrganizationSchema, getWebSiteSchema, getSiteNavigationSchema } from '@/components/JsonLd'

const coeCards = [
  {
    href: '/coe/ai', size: 'lg' as const, animDelay: 0,
    badge: 'CoE · Flagship', chips: ['LLM', 'Agents', 'Governance'],
    theme: 'ai' as const, animKey: 'card-ai',
    title: 'Applied Artificial Intelligence',
    desc: 'Production-grade AI workflows with guardrails, human oversight, and clear ROI paths.',
    highlights: ['Intelligent process automation','LLM governance and guardrails','AI readiness training for teams','Responsible AI playbooks'],
    cta: 'Explore practice',
  },
  {
    href: '/coe/data', size: 'md' as const, animDelay: 80,
    badge: 'CoE', chips: ['Streaming', 'BI'],
    theme: 'data' as const, animKey: 'card-data',
    title: 'Data Analytics — Applied AI',
    desc: 'Turn fragmented data into trusted insights; built for speed, accuracy, and action.',
    highlights: ['Modern analytics foundations','AI-powered data quality','Executive dashboards','Predictive models'],
    cta: 'Explore',
  },
  {
    href: '/coe/cyber', size: 'sm' as const, animDelay: 160,
    badge: 'CoE', chips: ['Threat', 'Compliance'],
    theme: 'cyber' as const, animKey: 'card-cyber',
    title: 'Cyber Security — Applied AI',
    desc: 'Strengthen security posture with AI-driven threat intelligence.',
    highlights: ['Security architecture','AI-enhanced threat visibility','Compliance & audit readiness','Secure AI & data protection'],
    cta: 'Explore',
  },
  {
    href: '/coe/cloud', size: 'sm' as const, animDelay: 240,
    badge: 'CoE', chips: ['Migration', 'SRE'],
    theme: 'cloud' as const, animKey: 'card-cloud',
    title: 'Cloud & Infrastructure — Applied AI',
    desc: "AI-optimized cloud & infrastructure that's resilient, scalable, and cost-aware.",
    highlights: ['AI-assisted cloud migration','Infrastructure modernization','Reliability engineering','Platform standardization'],
    cta: 'Explore',
  },
  {
    href: '/coe/testing', size: 'sm' as const, animDelay: 320,
    badge: 'CoE', chips: ['QA', 'Resilience'],
    theme: 'testing' as const, animKey: 'card-testing',
    title: 'Automated AI Testing',
    desc: 'Ship faster with AI-powered testing woven into every release.',
    highlights: ['Automation-first QA','Performance & resilience testing','Test strategy and tooling','Continuous quality systems'],
    cta: 'Explore',
  },
  {
    href: '/gcc', size: 'md' as const, animDelay: 400,
    badge: 'Global', chips: ['GCC', 'Enablement'],
    theme: 'gcc' as const, animKey: 'card-gcc',
    title: 'Global Capability Center (GCC)',
    desc: 'AI-enabled centers that operate as a true extension of your business.',
    highlights: ['GCC setup and operating model','Talent, tooling, and delivery governance','CoE design and scaling','Continuous performance improvement'],
    cta: 'Explore GCC',
  },
  {
    href: '/coe/digital-assets', size: 'md' as const, animDelay: 480,
    badge: 'CoE · New', chips: ['Blockchain', 'Tokenization'],
    theme: 'digitalassets' as const, animKey: 'card-digitalassets',
    title: 'Digital Assets & Blockchain',
    desc: 'Blockchain-native infrastructure for regulated on-chain capital markets.',
    highlights: ['Distributed ledger infrastructure','Smart contract automation','Token issuance & custody','SEC · FCA · MiCA compliance'],
    cta: 'Explore',
  },
]

export const metadata = constructMetadata(PAGE_SEO.home)

export default function HomePage() {
  return (
    <>
      <JsonLd schema={getOrganizationSchema()} />
      <JsonLd schema={getWebSiteSchema()} />
      <JsonLd schema={getSiteNavigationSchema()} />
      <Nav activePage="home" />
      <main id="main-content">

      {/* HERO */}
      <header className="hero hero--carousel">
        <LandingCarousel />
        <div className="container hero__inner">
          <h1 className="hero__title reveal-immediate">
            <em>Applied AI and Engineering</em> That Delivers <span className="blue">Measurable Change</span>
          </h1>
          <p className="hero__sub reveal-immediate reveal-delay-1">StradIT helps you turn technology into a lasting edge through applied AI and high-quality engineering delivery.</p>
          <div className="hero__cta reveal-immediate reveal-delay-2">
            <Link href="/contact" className="btn btn--primary">
              Start Your Digital Transformation
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/coe" className="btn btn--ghost">Explore Our Center of Excellence</Link>
          </div>
          <div className="hero__meta reveal-immediate reveal-delay-3">
            <div className="hero__meta-cell"><div className="hero__meta-k">Engagements</div><div className="hero__meta-v">40+ <small>capital-markets programs</small></div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Production AI</div><div className="hero__meta-v">120+ <small>governed workflows shipped</small></div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Delivery</div><div className="hero__meta-v">8 wks <small>median time-to-value</small></div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Coverage</div><div className="hero__meta-v">4 regions <small>USA · UK · Europe · Asia</small></div></div>
          </div>
        </div>
      </header>

      {/* CENTERS OF EXCELLENCE */}
      <section className="coe-section">
        <div className="container">
          <div className="coe-header">
            <h2 className="reveal">Automate. Elevate. <em>Accelerate.</em></h2>
            <p className="reveal reveal-delay-1">AI built into every layer so your enterprise doesn&apos;t just keep up, it pulls ahead.</p>
          </div>
          <div className="coe-rail">
            {coeCards.map((card, index) => (
              <CoeCard key={card.href} {...card} interactionGroup="landing-coe" revealClass={`reveal reveal-delay-${Math.min(index, 4)}`} />
            ))}
          </div>{/* end coe-rail */}
        </div>{/* end container */}
      </section>{/* end coe-section */}



      {/* GLOBAL SCALE LOCAL IMPACT */}
      <section className="section global-impact-section">
        <div className="container">
          <div className="global-impact-card reveal reveal-zoom">
            <div className="global-impact-copy">
              <h2>
                Global Scale, <em>Local Impact</em>
              </h2>
              <p>
                We believe that the most powerful technologies should be accessible, scalable, and flawlessly engineered. From our team to your doorstep, we deliver the intelligence that moves the world.
              </p>
              <div className="global-impact-points" aria-label="Global impact highlights">
                <span>Accessible</span>
                <span>Scalable</span>
                <span>Flawlessly engineered</span>
              </div>
              <Link href="/about" className="btn btn--primary global-impact-cta">
                Learn More About StradIT
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA BAND */}
      <section className="section" style={{borderTop:'1px solid var(--line)'}}>
        <div className="container">
          <div style={{
            background:'radial-gradient(ellipse 80% 100% at 0% 50%,rgba(255,122,61,0.15),transparent 60%),radial-gradient(ellipse 60% 100% at 100% 50%,rgba(76,200,255,0.08),transparent 60%),var(--ink-2)',
            border:'1px solid var(--line-strong)',
            borderRadius:'var(--radius-lg)',
            padding:'72px 64px',
            display:'grid',
            gridTemplateColumns:'1fr auto',
            gap:'48px',
            alignItems:'center',
          }} className="cta-band reveal reveal-zoom">
            <div>
              <h2 style={{fontSize:'clamp(28px,4vw,52px)',letterSpacing:'-0.03em',marginBottom:'16px',lineHeight:'1.05'}}>
                Ready to turn innovation into <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>execution?</em>
              </h2>
              <p style={{color:'var(--text-1)',fontSize:'17px',lineHeight:'1.6',maxWidth:'560px'}}>
                Tell us what you&apos;re planning to build with AI and tech engineering. We&apos;ll map the fastest path from where you are to production outcomes.
              </p>
            </div>
            <div style={{flexShrink:0}}>
              <Link href="/contact" className="btn btn--primary" style={{fontSize:'16px',padding:'16px 32px'}}>
                Contact Us
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  )
}
