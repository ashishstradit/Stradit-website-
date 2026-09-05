import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'
import { constructMetadata, PAGE_SEO } from '@/app/seo'
import JsonLd, { getCaseStudySchema } from '@/components/JsonLd'

export const metadata = constructMetadata(PAGE_SEO.csCloudAdvisory)

const challenges = [
  'Fragmented application portfolios across mainframe, mid-tier, and distributed systems',
  'Deep dependencies on proprietary middleware making migration risky',
  'Limited observability across environments — no unified visibility',
  'Multiple regulators enforcing stringent compliance and data-residency requirements',
]

const scope = [
  'End-to-end IT service assessment',
  'Detailed cloud readiness assessment',
  '100% personalised cloud deployment',
  'Extensive technology evaluation',
  'Multi-year cloud roadmap',
]

const whyPoints = [
  '5+ years of dedicated cloud advisory experience',
  '30+ cloud & infrastructure specialists',
  '7+ data centres successfully managed',
  '100% automated infrastructure provisioning',
  'Assessment-to-execution without relying on one-off scripts',
]

const steps = [
  {
    num: '01',
    title: 'IT Service Catalogue',
    body: 'Our Cloud & Infrastructure CoE collected and rationalised the complete IT service catalogue across all lines of business. We mapped each service to underlying applications, infrastructure components, and data domains — identifying services with redundant or overlapping functionality.',
  },
  {
    num: '02',
    title: 'Cloud Readiness Assessment',
    body: 'We performed functional, financial, and technical feasibility analysis for every service — evaluating application architecture patterns, integration style, and data flows. A scoring model for cloud suitability gave the client a priority-ranked list of cloud-ready services based on evidence, not opinion.',
  },
  {
    num: '03',
    title: 'Cloud Deployment Strategy',
    body: 'Workloads were classified into public, private, and hybrid cloud candidates. We defined isolation requirements for regulated data, customer PII, and payment workloads, and mapped non-functional requirements to avoid resource wastage — enabling deployment decisions based on evidence instead of generic best practices.',
  },
  {
    num: '04',
    title: 'Technology Selection',
    body: 'We constructed a detailed evaluation framework across IaaS, PaaS, and managed services while comparing hyperscaler offerings. Preferred vendors and implementation partners were identified based on alignment with the client\'s objectives, regulatory posture, and total cost of ownership.',
  },
  {
    num: '05',
    title: 'Cloud Roadmap & Governance',
    body: 'We created a cloud roadmap defining migration waves — covering quick wins first — and established a cloud governance framework to help the client realise early benefits while preparing for deeper modernisation. The result: a clear, executable plan with an agreed operating model built in.',
  },
]

export default function CloudAdvisoryCaseStudyPage() {
  return (
    <>
      <JsonLd schema={getCaseStudySchema({
        title: 'Cloud Modernisation & Expert Cloud Advisory',
        description: 'How StradIT helped a US-based financial institution move from a fragmented legacy data-centre landscape to a cloud-ready, optimised portfolio without compromising regulatory, security, or data-residency requirements.',
        url: 'https://stradit.com/case-studies/cloud-advisory'
      })} />
      <Nav activePage="coe" />
      <main id="main-content">

      {/* ── HERO ── */}
      <header className="hero hero--compact">
        <div className="hero__canvas"><AnimCanvas theme="cloud" /></div>
        <div className="container hero__inner">
          <div className="hero__eyebrow eyebrow">Case Study · Cloud &amp; Infrastructure</div>
          <h1 className="hero__title">
            Enterprise Cloud Modernisation with <em>Expert Cloud Advisory</em>
          </h1>
          <p className="hero__sub">
            From fragmented legacy to cloud-ready — without compromising compliance.
          </p>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.65',maxWidth:'600px',marginBottom:'36px'}}>
            Learn how StradIT helped a US-based financial institution move from a fragmented
            legacy data-centre landscape to a cloud-ready, optimised portfolio —
            without compromising regulatory, security, or data-residency requirements.
          </p>
          <div className="hero__cta">
            <Link href="/contact" className="btn btn--primary">
              Request a Cloud Readiness Assessment
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/coe/cloud" className="btn btn--ghost">Back to Cloud CoE</Link>
          </div>
          <div className="hero__meta">
            <div className="hero__meta-cell"><div className="hero__meta-v">Unified</div><div className="hero__meta-k">Observability</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">Multi-Cloud</div><div className="hero__meta-k">Ready</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">50%</div><div className="hero__meta-k">Faster Deployment</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">100%</div><div className="hero__meta-k">IaC Automation</div></div>
          </div>
        </div>
        <div className="hero__hud">
          <span className="pulse">Cloud · Operational</span>
          <span className="hero__hud-grid">
            <span>PROVISION <b>IaC 100%</b></span>
            <span>STRATEGY <b>Multi-Cloud</b></span>
            <span>DEPLOY <b>50% faster</b></span>
          </span>
          <span>Case Study · Cloud</span>
        </div>
      </header>

      {/* ── 01 CLIENT OVERVIEW ── */}
      <section className="section" style={{paddingTop:'100px'}}>
        <div className="container">
          <div className="section-eyebrow"><span className="idx">01</span><span>Client Overview</span></div>
          {/* Challenges */}
          <details className="cs-offerings-toggle" style={{marginBottom:'40px'}}>
            <summary style={{display:'block',cursor:'pointer',listStyle:'none',textAlign:'center'}}>
              <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'16px'}}>A Regulated Institution with a <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Legacy Problem</em></h2>
              <p style={{color:'var(--text-1)',fontSize:'17px',lineHeight:'1.7',maxWidth:'720px',marginBottom:'24px',textAlign:'left',margin:'0 auto 24px'}}>
                A leading US-based financial institution operating under strict regulatory, audit,
                and data-residency requirements — with a heterogeneous landscape of mainframe,
                mid-tier, and distributed systems. A simple lift-and-shift approach would have
                only moved workloads, not optimised them. A structured, evidence-based cloud advisory
                approach was required.
              </p>
              <span style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'11px 26px',borderRadius:'999px',border:'1px solid rgba(255,122,61,0.82)',background:'linear-gradient(135deg,var(--accent),var(--accent-2))',color:'#0b0f18',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.10em',textTransform:'uppercase',boxShadow:'0 10px 24px rgba(255,122,61,0.22)'}}>
                <span className="cs-offerings-label-more">See More</span>
                <span className="cs-offerings-label-less" style={{display:'none'}}>See Less</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </summary>
            <div className="cs-g2">
              {challenges.map((c, i) => (
                <div key={i} className="cs-bullet-item" style={{background:'var(--ink-1)'}}>
                  <span className="cs-bullet-dot"/>
                  <p className="cs-bullet-text">{c}</p>
                </div>
              ))}
            </div>
          </details>

        </div>
      </section>

      {/* ── 02 STRADIT SCALE & EXPERIENCE ── */}
      <section className="section" style={{background:'var(--ink-1)',borderTop:'1px solid var(--line)'}}>
        <div className="container">
          <div className="section-eyebrow"><span className="idx">02</span><span>Our Proven Scale &amp; Experience</span></div>
          <div className="two-col">
            <div>
              <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'20px'}}>A Mature, Execution-Focused <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Cloud Practice</em></h2>
              <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',marginBottom:'16px'}}>
                StradIT brings a mature, execution-focused cloud practice to every engagement.
                With 5+ years of dedicated cloud advisory experience and a core group of 30+
                cloud and infrastructure specialists, our Cloud &amp; Infrastructure CoE has
                successfully managed 7+ data centres and automated production deployments for clients
                across regulated industries.
              </p>
              <p style={{color:'var(--text-2)',fontSize:'14px',lineHeight:'1.7',marginBottom:'28px'}}>
                These accelerators allow StradIT to move from assessment to repeatable,
                codified implementation — without relying on one-off scripts.
              </p>
              <Link href="/coe/cloud" className="btn btn--ghost">
                Explore Cloud CoE
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'var(--line)',border:'1px solid var(--line)',borderRadius:'var(--radius-lg)',overflow:'hidden'}}>
              {whyPoints.map((pt, i) => (
                <div key={i} style={{background:'var(--ink-2)',padding:'20px 24px',display:'flex',gap:'16px',alignItems:'center'}}>
                  <span style={{width:'28px',height:'28px',borderRadius:'50%',border:'1px solid var(--accent)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--accent)',fontSize:'12px',flexShrink:0}}>✓</span>
                  <span style={{color:'var(--text-0)',fontSize:'14px',lineHeight:'1.5'}}>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 SCOPE ── */}
      <section className="section" style={{background:'var(--ink-0)',borderTop:'1px solid var(--line)'}}>
        <div className="container">
          <div className="section-eyebrow"><span className="idx">03</span><span>Scope of Cloud Advisory</span></div>
          <div style={{marginBottom:'40px',textAlign:'center'}}>
            <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'20px'}}>A Fully-Optimised <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Cloud Advisory</em></h2>
            <p style={{color:'var(--text-1)',fontSize:'17px',lineHeight:'1.7',maxWidth:'720px',textAlign:'left',margin:'0 auto'}}>
              When the client reached StradIT for Cloud Advisory Services, we played at the
              front foot — delivering a comprehensive advisory that covered every dimension
              of their cloud readiness.
            </p>
          </div>

          <details className="cs-offerings-toggle" style={{marginBottom:'40px',textAlign:'center'}}>
            <summary style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'11px 26px',borderRadius:'999px',border:'1px solid rgba(255,122,61,0.82)',background:'linear-gradient(135deg,var(--accent),var(--accent-2))',color:'#0b0f18',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.10em',textTransform:'uppercase',cursor:'pointer',listStyle:'none',boxShadow:'0 10px 24px rgba(255,122,61,0.22)'}}>
              <span className="cs-offerings-label-more">See More</span>
              <span className="cs-offerings-label-less" style={{display:'none'}}>See Less</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6"/></svg>
            </summary>
            <div className="cs-g2">
              {scope.map((s, i) => (
                <div key={i} className="cs-bullet-item" style={{background:'var(--ink-1)'}}>
                  <span className="cs-bullet-dot"/>
                  <p className="cs-bullet-text">{s}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* ── 04 HOW WE DELIVERED ── */}
      <section className="section" style={{background:'var(--ink-1)',borderTop:'1px solid var(--line)'}}>
        <div className="container">
          <div className="section-eyebrow"><span className="idx">04</span><span>Solutions Offered</span></div>
          <div style={{marginBottom:'40px',textAlign:'center'}}>
            <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'20px'}}>A Multi-Step <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Cloud Strategy</em></h2>
            <p style={{color:'var(--text-1)',fontSize:'17px',lineHeight:'1.7',maxWidth:'720px',textAlign:'left',margin:'0 auto'}}>
              Hands-on mastery over cloud &amp; infrastructure. We brought structure to
              every decision — from catalogue to governance — so nothing was left to chance.
            </p>
          </div>

          <details className="cs-offerings-toggle" style={{marginBottom:'40px'}}>
            <summary style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'14px',flexWrap:'wrap',listStyle:'none'}}>
              <span style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'11px 26px',borderRadius:'999px',border:'1px solid rgba(255,122,61,0.82)',background:'linear-gradient(135deg,var(--accent),var(--accent-2))',color:'#0b0f18',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.10em',textTransform:'uppercase',cursor:'pointer',boxShadow:'0 10px 24px rgba(255,122,61,0.22)'}}>
                <span className="cs-offerings-label-more">See More</span>
                <span className="cs-offerings-label-less" style={{display:'none'}}>See Less</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6"/></svg>
              </span>
              <a href="/coe/cloud" className="btn btn--ghost">
                Explore our Cloud CoE
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </summary>
            <div className="cs-step-list">
              {steps.map((step) => (
                <div key={step.num} className="cs-step-row" style={{background:'var(--ink-2)'}}>
                  <span className="cs-step-dot"/>
                  <div>
                    <div className="cs-step-title">{step.title}</div>
                    <p className="cs-step-body">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>


      {/* ── CTA ── */}
      <section className="section" style={{background:'var(--ink-0)',borderTop:'1px solid var(--line)'}}>
        <div className="container" style={{textAlign:'center',maxWidth:'680px',margin:'0 auto'}}>
          <div style={{
            fontFamily:'var(--font-mono)',
            fontSize:'11px',
            letterSpacing:'0.16em',
            textTransform:'uppercase',
            color:'var(--accent)',
            marginBottom:'20px',
          }}>Finding It Hard to Navigate Complex Cloud Decisions?</div>
          <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'20px',lineHeight:1.1}}>Get a Structured Plan Your Teams Can <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Execute With Confidence</em></h2>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',marginBottom:'36px'}}>
            Talk to StradIT&apos;s Cloud Advisory team today. We turn cloud complexity into
            a clear, compliance-ready roadmap.
          </p>
          <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/contact" className="btn btn--primary">
              Request a Cloud Readiness Assessment
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/coe/cloud" className="btn btn--ghost">
              Explore Cloud CoE
            </Link>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  )
}
