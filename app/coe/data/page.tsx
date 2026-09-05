import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'
import CaseStudySection from '@/components/CaseStudySection'
import { constructMetadata, PAGE_SEO } from '@/app/seo'
import JsonLd, { getServiceSchema } from '@/components/JsonLd'

export const metadata = constructMetadata(PAGE_SEO.coeData)

const cards = [
  {
    title: 'Data Integration',
    desc: 'Unify structured and unstructured data into a foundation teams can trust.',
  },
  {
    title: 'Predictive Intelligence',
    desc: 'Use ML-driven signals to forecast demand, risk, churn, and operational needs.',
  },
  {
    title: 'Decision Intelligence Platforms',
    desc: 'Deliver dashboards, alerts, and embedded analytics that support faster action.',
  },
  {
    title: 'Data Quality & Governance',
    desc: 'Improve accuracy, lineage, access control, and audit readiness from day one.',
  },
]

const gradText = { fontStyle:'normal' as const, background:'linear-gradient(120deg,var(--accent),var(--accent-2))', WebkitBackgroundClip:'text' as const, backgroundClip:'text' as const, color:'transparent' as const }

export default function CoeDataPage() {
  return (
    <>
      <JsonLd schema={getServiceSchema({
        name: 'Data Analytics Center of Excellence',
        description: 'Modernize your data infrastructure, establish real-time streaming analytics, and build AI-powered executive dashboards with StradIT.',
        url: 'https://stradit.com/coe/data'
      })} />
      <Nav activePage="coe" />
      <main id="main-content">

      {/* HERO */}
      <header className="hero hero--compact">
        <div className="hero__canvas"><AnimCanvas theme="data" /></div>
        <div className="container hero__inner">
          <h1 className="hero__title">Data Analytics — <em>Applied AI</em></h1>
          <p className="hero__sub">Decode, Decide, and Dominate with Data</p>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.65',maxWidth:'600px',marginBottom:'36px'}}>
            StradIT helps enterprises turn messy, fragmented information into clear insights and confident action through its AI-powered data analytics CoE. We unify data across systems, build analytics that teams actually use, and embed AI-driven intelligence into workflows so decisions get faster, smarter, and easier to defend.
          </p>
          <div className="hero__cta">
            <Link href="/contact" className="btn btn--primary">
              Begin Your Data Transformation
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/coe" className="btn btn--ghost">All practices</Link>
          </div>
          <div className="hero__meta">
            <div className="hero__meta-cell"><div className="hero__meta-v">45%</div><div className="hero__meta-k">Better Forecasts</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">5x faster</div><div className="hero__meta-k">Reporting</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">50% Fewer</div><div className="hero__meta-k">Metric Disputes</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Reference</div><div className="hero__meta-v" style={{fontSize:'12px',lineHeight:'1.4'}}><small>About — Social Driver</small></div></div>
          </div>
        </div>
        <div className="hero__hud">
          <span className="pulse">Pipeline · Active</span>
          <span className="hero__hud-grid">
            <span>EVENTS <b>4.8B/d</b></span><span>LATENCY <b>82ms</b></span><span>QUALITY <b>99.2%</b></span>
          </span>
          <span>Data · v2026.05</span>
        </div>
      </header>

      {/* APPROACH */}
      <section className="section">
        <div className="container">
          <div className="section-eyebrow"><span className="idx">01</span><span>Our Approach</span></div>
          <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'16px'}}>
            Turn Data into a <em style={gradText}>Power Move</em>
          </h2>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',maxWidth:'680px',marginBottom:'40px'}}>
            Data is everywhere. Value isn't. Our end-to-end analytics services help you connect the dots across high-volume, multi-source data and convert it into strategy, performance, and measurable outcomes.
          </p>
          <ul className="coe-bullet-list">
            {cards.map((card, i) => (
              <li key={card.title} className={`coe-bullet-item reveal reveal-delay-${i+1}`}>
                <span className="coe-bullet-item__dot" />
                <div>
                  <span className="coe-bullet-item__title">{card.title}</span>
                  <span className="coe-bullet-item__desc">{card.desc}</span>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn--ghost" style={{marginTop:'32px',display:'inline-flex'}}>
            Empower Decisions With Intelligence
            <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </section>

      {/* CLIENT IMPACT — case study link */}
      <CaseStudySection
        left={
          <div>
            <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'20px'}}>
              Data Stories From <em style={gradText}>the Field</em>
            </h2>
            <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',marginBottom:'32px'}}>
              For our clients, data isn&apos;t noise. It&apos;s leverage. Open the full case study to see how teams used StradIT&apos;s AI-powered analytics to turn data into sustained results.
            </p>
            <Link href="/contact" className="btn btn--primary">
              Write Your Data Success Story With Us
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        }
        tag="Case Study · Data Analytics"
        cardTitle={<>80% Reduction in Manual Reporting &amp; Scalability Delivered</>}
        cardDesc="How StradIT modernised a global investment bank's data infrastructure 360° — delivering a cloud-native data lake, real-time ingestion, unified data models, and self-service BI across 300+ applications."
        stats={[['80%','Less Manual Reporting'],['Real-Time','Risk Visibility'],['360°','Transformation']]}
        href="/case-studies/data-analytics"
      />

      </main>
      <Footer />
    </>
  )
}
