import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'
import CaseStudySection from '@/components/CaseStudySection'
import { constructMetadata, PAGE_SEO } from '@/app/seo'
import JsonLd, { getServiceSchema } from '@/components/JsonLd'

export const metadata = constructMetadata(PAGE_SEO.coeCloud)

const cards = [
  { title:'End-to-End Consulting & Service Delivery', desc:'Identify needs, understand the utility of different cloud infrastructures, and make informed decisions.', items:['Cloud readiness assessment and a clear migration roadmap','Architectures balancing performance, cost, and flexibility across platforms','Legacy modernization planning to move from outdated systems to cloud'] },
  { title:'Managed Services & Ongoing Support', desc:'Keep your cloud reliable, optimized, and secure over the long term through AI-managed cloud services.', items:['Proactive monitoring to spot issues before they escalate','Continuous optimization across workloads, apps, and infrastructure','24/7 support for mission-critical systems and business continuity'] },
]

const gradText = { fontStyle:'normal' as const, background:'linear-gradient(120deg,var(--accent),var(--accent-2))', WebkitBackgroundClip:'text' as const, backgroundClip:'text' as const, color:'transparent' as const }

export default function CoeCloudPage() {
  return (
    <>
      <JsonLd schema={getServiceSchema({
        name: 'Cloud & Infrastructure Center of Excellence',
        description: 'Optimize cloud efficiency, performance, and SRE resilience. Our team guides AI-assisted migrations, platform engineering, and automated scaling.',
        url: 'https://stradit.com/coe/cloud'
      })} />
      <Nav activePage="coe" />
      <main id="main-content">

      {/* HERO */}
      <header className="hero hero--compact">
        <div className="hero__canvas"><AnimCanvas theme="cloud" /></div>
        <div className="container hero__inner">
          <h1 className="hero__title">Cloud &amp; Infrastructure — <em>Applied AI</em></h1>
          <p className="hero__sub">Strategic, Scalable, Future-Ready Cloud for All</p>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.65',maxWidth:'600px',marginBottom:'36px'}}>
            StradIT helps enterprises move to the cloud with confidence, from multi-cloud strategy to legacy modernization and end-to-end migration. We design AI-enhanced cloud foundations that perform under load, stay secure, and scale with your business goals.
          </p>
          <div className="hero__cta">
            <Link href="/contact" className="btn btn--primary">
              Start Your Cloud Transformation
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/coe" className="btn btn--ghost">All practices</Link>
          </div>
        </div>
        <div className="hero__hud">
          <span className="pulse">Cloud · Operational</span>
          <span className="hero__hud-grid">
            <span>NODES <b>5K+</b></span><span>UPTIME <b>99.99%</b></span><span>REGIONS <b>4</b></span>
          </span>
          <span>Cloud · v2026.05</span>
        </div>
      </header>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="container">
          <div className="hero__meta">
            <div className="hero__meta-cell"><div className="hero__meta-k">Automation</div><div className="hero__meta-v">100% IaC</div><div className="hero__meta-k">templated deployment</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Uptime</div><div className="hero__meta-v">99.99%</div><div className="hero__meta-k">platform SLO default</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Migrations</div><div className="hero__meta-v">500+ apps</div><div className="hero__meta-k">across 30+ programs</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Multi-cloud</div><div className="hero__meta-v">AWS · Azure · GCP</div><div className="hero__meta-k">+ on-prem hybrid</div></div>
          </div>
        </div>
      </div>

      {/* APPROACH */}
      <section className="section">
        <div className="container">
          <div className="section-eyebrow"><span className="idx">01</span><span>Our Approach</span></div>
          <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'16px'}}>
            Shaping Cloud You Need <em style={gradText}>With Conviction</em>
          </h2>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',maxWidth:'680px',marginBottom:'40px'}}>
            From early discovery and planning to 24/7 operations, we partner with you to build resilient, AI-optimized cloud systems built for production.
          </p>
          <div className="cards-2">
            {cards.map((card,i) => (
              <details key={card.title} className={`text-expand-card reveal reveal-delay-${i+1}`}>
                <summary>
                  <span className="text-expand-card__title">{card.title}</span>
                </summary>
                <p className="text-expand-card__body">{card.desc}</p>
                <ul className="text-expand-card__list">
                  {card.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </details>
            ))}
          </div>
          <Link href="/contact" className="btn btn--ghost">
            Define Your Cloud Roadmap
            <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </section>

      {/* CLIENT IMPACT — case study link */}
      <CaseStudySection
        left={
          <div>
            <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'20px'}}>
              Cloud Outcomes That Actually <em style={gradText}>Hold Up In Production</em>
            </h2>
            <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',marginBottom:'32px',maxWidth:'680px'}}>
              Wondering how cloud becomes the backbone of modern businesses? Open the full case study to see how our advisory optimised operations, aligned resource governance, and laid the foundation for stable growth.
            </p>
            <Link href="/contact" className="btn btn--primary">
              Redefine Cloud With StradIT
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        }
        tag="Case Study · Cloud & Infrastructure"
        cardTitle={<>Enterprise Cloud Modernisation with Expert Cloud Advisory</>}
        cardDesc="How StradIT helped a US-based financial institution move from a fragmented legacy data-centre landscape to a cloud-ready, optimised portfolio — without compromising regulatory or data-residency requirements."
        stats={[['Unified','Observability'],['Multi-Cloud','Ready'],['50%','Faster Deployment']]}
        href="/case-studies/cloud-advisory"
      />

      </main>
      <Footer />
    </>
  )
}
