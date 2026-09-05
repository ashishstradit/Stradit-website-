import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'
import CaseStudySection from '@/components/CaseStudySection'
import { constructMetadata, PAGE_SEO } from '@/app/seo'
import JsonLd, { getServiceSchema } from '@/components/JsonLd'

export const metadata = constructMetadata(PAGE_SEO.coeCyber)

const cards = [
  { title:'Cybersecurity Advisory', desc:'Risk strategy, compliance readiness, and security roadmaps built around your highest-value assets.' },
  { title:'Cybersecurity Engineering', desc:'AI-enhanced controls across applications, data, cloud, networks, and identity from day one.' },
  { title:'Managed Cybersecurity', desc:'Continuous monitoring, response, and threat visibility without tool sprawl or blind spots.' },
]

const gradText = { fontStyle:'normal' as const, background:'linear-gradient(120deg,var(--accent),var(--accent-2))', WebkitBackgroundClip:'text' as const, backgroundClip:'text' as const, color:'transparent' as const }

export default function CoeCyberPage() {
  return (
    <>
      <JsonLd schema={getServiceSchema({
        name: 'Cyber Security Center of Excellence',
        description: 'Protect your digital assets. Our security practice designs resilient architectures, implements automated threat detection, and ensures audit readiness.',
        url: 'https://stradit.com/coe/cyber'
      })} />
      <Nav activePage="coe" />
      <main id="main-content">

      {/* HERO */}
      <header className="hero hero--compact">
        <div className="hero__canvas"><AnimCanvas theme="cyber" /></div>
        <div className="container hero__inner">
          <h1 className="hero__title">Cyber Security — <em>Applied AI</em></h1>
          <p className="hero__sub">Securing Today for Quick Scalability Tomorrow</p>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.65',maxWidth:'600px',marginBottom:'36px'}}>
            At StradIT, we deliver proactive, AI-enhanced, enterprise-grade resilience that grows with you. Our managed cybersecurity services cut risk, develop future-proof policies, and protect your most critical systems to drive business continuity and confidence.
          </p>
          <div className="hero__cta">
            <Link href="/contact" className="btn btn--primary">
              Strengthen Your Security Posture
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/coe" className="btn btn--ghost">All practices</Link>
          </div>
          <div className="hero__meta">
            <div className="hero__meta-cell"><div className="hero__meta-v">24/7</div><div className="hero__meta-k">Threat Monitoring</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">40% Reduced</div><div className="hero__meta-k">Attack Surface</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">50% Faster</div><div className="hero__meta-k">Containment</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Reference</div><div className="hero__meta-v" style={{fontSize:'12px',lineHeight:'1.4'}}><small>About — Social Driver</small></div></div>
          </div>
        </div>
        <div className="hero__hud">
          <span className="pulse">Defense · Nominal</span>
          <span className="hero__hud-grid">
            <span>EVENTS <b>3.2B/d</b></span><span>BLOCKED <b>14.7K</b></span><span>INCIDENTS <b>0</b></span>
          </span>
          <span>Cyber · v2026.05</span>
        </div>
      </header>

      {/* APPROACH */}
      <section className="section">
        <div className="container">
          <div className="section-eyebrow"><span className="idx">01</span><span>Our Approach</span></div>
          <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'16px'}}>
            Cybersecurity Engineered for <em style={gradText}>Business Resilience</em>
          </h2>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',maxWidth:'680px',marginBottom:'40px'}}>
            StradIT unites AI-driven threat modeling, precise engineering, and relentless managed defense to safeguard mission-critical assets, reduce business risk, and empower readiness for rapid change.
          </p>
          <div className="cyber-approach-grid">
            {cards.map((card,i) => (
              <details key={card.title} className={`text-expand-card reveal reveal-delay-${i+1}`}>
                <summary>
                  <span className="text-expand-card__title">{card.title}</span>
                </summary>
                <p className="text-expand-card__body">{card.desc}</p>
              </details>
            ))}
          </div>
          <Link href="/contact" className="btn btn--ghost">
            Deploy 24/7 Managed Defense
            <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </section>

      {/* CLIENT IMPACT — case study link */}
      <CaseStudySection
        left={
          <div>
            <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'20px'}}>
              Learn How Security Wins From <em style={gradText}>The Front Lines</em>
            </h2>
            <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',marginBottom:'32px'}}>
              Cybersecurity should feel like stability, not constant fire drills. Open the full case study to see how teams reduced noise, contained threats faster, and built a posture that holds up on the toughest days.
            </p>
            <Link href="/contact" className="btn btn--primary">
              Strengthen Your Security Posture
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        }
        tag="Case Study · Cyber Resiliency"
        cardTitle={<>Zero Data Loss Readiness Across 300+ Applications</>}
        cardDesc="How StradIT helped a global asset management firm build bulletproof cyber resiliency — assessing, testing, and documenting every application with tailored playbooks and automated recovery tools."
        stats={[['300+','Apps Covered'],['Zero','Data Loss'],['2+ yrs','Partnership']]}
        href="/case-studies/cyber-resiliency"
      />

      </main>
      <Footer />
    </>
  )
}
