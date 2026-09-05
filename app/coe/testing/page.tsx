import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'
import CaseStudySection from '@/components/CaseStudySection'
import { constructMetadata, PAGE_SEO } from '@/app/seo'
import JsonLd, { getServiceSchema } from '@/components/JsonLd'

export const metadata = constructMetadata(PAGE_SEO.coeTesting)

const gradText = { fontStyle:'normal' as const, background:'linear-gradient(120deg,var(--accent),var(--accent-2))', WebkitBackgroundClip:'text' as const, backgroundClip:'text' as const, color:'transparent' as const }

export default function CoeTestingPage() {
  return (
    <>
      <JsonLd schema={getServiceSchema({
        name: 'Automated AI Testing Center of Excellence',
        description: 'Ship faster with continuous quality assurance. Our automated testing practice implements AI-driven verification and deep load/resiliency testing.',
        url: 'https://stradit.com/coe/testing'
      })} />
      <Nav activePage="coe" />
      <main id="main-content">

      {/* HERO */}
      <header className="hero hero--compact">
        <div className="hero__canvas"><AnimCanvas theme="testing" /></div>
        <div className="container hero__inner">
          <h1 className="hero__title">Automated <em>AI Testing</em></h1>
          <p className="hero__sub">Engineering Trust in Every Line of Code</p>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.65',maxWidth:'600px',marginBottom:'36px'}}>
            StradIT provides bespoke and AI-powered Testing &amp; Quality Engineering that enable faster time-to-market without compromising on quality, reduce defect leakage, and lower TCO while enhancing customer satisfaction.
          </p>
          <div className="hero__cta">
            <Link href="/contact" className="btn btn--primary">
              Strengthen Your Quality Engineering
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/coe" className="btn btn--ghost">All practices</Link>
          </div>
        </div>
        <div className="hero__hud">
          <span className="pulse">Suite · Green</span>
          <span className="hero__hud-grid">
            <span>TESTS <b>42K</b></span><span>PASS <b>99.6%</b></span><span>TIME <b>7m12s</b></span>
          </span>
          <span>QA · v2026.05</span>
        </div>
      </header>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="container">
          <div className="hero__meta">
            <div className="hero__meta-cell"><div className="hero__meta-k">Coverage</div><div className="hero__meta-v">92%</div><div className="hero__meta-k">avg. on critical flows</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Flakiness</div><div className="hero__meta-v">&lt;0.4%</div><div className="hero__meta-k">managed, not endured</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">CI Time</div><div className="hero__meta-v">-58%</div><div className="hero__meta-k">after Stradit pipeline</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Synth. Data</div><div className="hero__meta-v">PII-safe</div><div className="hero__meta-k">AI-generated, governed</div></div>
          </div>
        </div>
      </div>

      {/* APPROACH */}
      <section className="section">
        <div className="container">
          <div className="section-eyebrow"><span className="idx">01</span><span>Our Approach</span></div>
          <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'16px'}}>
            Precision-Driven Testing for <em style={gradText}>Confident Delivery</em>
          </h2>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',maxWidth:'680px',marginBottom:'40px'}}>
            We bring quality into the full product lifecycle, from early validation to release readiness. Our approach combines proven QA practices with AI-assisted test optimization and business-aligned strategies, so teams can move fast without adding risk.
          </p>
          <div className="cyber-approach-grid">
            {[
              { title:'QA Lifecycle Support', desc:'Testing strategy, automation, and release readiness built into every stage.' },
              { title:'Quality Engineering Frameworks', desc:'Reusable AI-assisted frameworks that reduce QA overhead and delivery risk.' },
              { title:'Domain-Specific Testing', desc:'Context-aware validation for secure, compliant, and trusted products.' },
            ].map((card,i)=>(
              <details key={card.title} className={`text-expand-card reveal reveal-delay-${i+1}`}>
                <summary>
                  <span className="text-expand-card__title">{card.title}</span>
                </summary>
                <p className="text-expand-card__body">{card.desc}</p>
              </details>
            ))}
          </div>
          <Link href="/contact" className="btn btn--ghost">
            Optimize Your QA Lifecycle
            <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </section>

      {/* CLIENT IMPACT — case study link */}
      <CaseStudySection
        eyebrowLabel="Trusted by Fortune 500"
        left={
          <div>
            <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'20px'}}>
              Releases That Feel Calm, From Development to <em style={gradText}>Launch Day</em>
            </h2>
            <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',marginBottom:'32px'}}>
              Fortune 500 enterprises trust StradIT to embed AI-enhanced quality into every stage of design, development, and deployment. Open the full case study to see how cleaner launches and scalable quality come together.
            </p>
            <Link href="/contact" className="btn btn--primary">
              Validate Your Product With Precision
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        }
        tag="Case Study · Automated AI Testing"
        cardTitle={<>Open-Source Framework &amp; Unmatched Results: The StradIT Difference</>}
        cardDesc="Breaking free from expensive, complex testing frameworks is not a dream anymore. Discover how a global investment bank modernised its automation with a framework anyone on the team can use."
        stats={[['Open-Source','Robot Framework'],['70+','QA Experts'],['5-Step','Transformation']]}
        href="/case-studies/automated-ai-testing"
      />

      </main>
      <Footer />
    </>
  )
}
