import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'
import { constructMetadata, PAGE_SEO } from '@/app/seo'
import JsonLd, { getCaseStudySchema } from '@/components/JsonLd'

export const metadata = constructMetadata(PAGE_SEO.csDataAnalytics)

const challenges = [
  'Data lived in silos across disconnected systems',
  'Reporting ran on slow, outdated batch processes',
  'Analysts spent countless hours on manual reporting tasks',
  'Complex risk models required for FRTB, Basel III, and MiFID II compliance',
]

const whyPoints = [
  'Fully tailored data intelligence',
  'AI/ML-driven data analytics',
  'Lean, high-impact squad for every client',
  'Expertise to handle structured and unstructured data',
]

const offerings = [
  'Building a cloud-native enterprise data lake',
  'Enabling real-time data ingestion',
  'Creating a unified data model',
  'Delivering high-performance analytics',
  'Empowering business users with self-service reporting tools',
  'Embedding governance, lineage, and audit controls from day one',
]

const steps = [
  {
    num: '01',
    title: 'Laying the Foundation with a Scalable Data Lake',
    tech: 'Microsoft Azure',
    body: 'We designed and implemented an Enterprise Data Lake on Microsoft Azure, giving the client a centralised repository with elastic storage and compute — a single source of truth for all trading and risk data.',
  },
  {
    num: '02',
    title: 'Bringing Data to Life in Real Time',
    tech: 'Kafka · Spark Streaming',
    body: 'Batch processing was killing the agility of our client. Our data squad introduced real-time data ingestion using Kafka and Spark Streaming, resulting in low-latency processing of trade executions and market data the moment it moves.',
  },
  {
    num: '03',
    title: 'Creating One Version of the Truth',
    tech: 'Master Data Management',
    body: 'We built a Unified Data Model and implemented Master Data Management to eliminate inconsistent data plaguing the bank. This standardised trade data, counterparty information, and reference data — resulting in confusion-free processing across every team.',
  },
  {
    num: '04',
    title: 'Powering Advanced Analytics at Speed',
    tech: 'Databricks · Snowflake',
    body: 'We deployed a high-performance analytics layer using Databricks and Snowflake for portfolio risk calculations, scenario modelling, and stress testing at speeds simply not possible before. Complex models no longer required overnight runs.',
  },
  {
    num: '05',
    title: 'Putting Insights in the Hands of Business Users',
    tech: 'Power BI · Tableau',
    body: 'We rolled out self-service business intelligence through Power BI and Tableau, giving traders, risk analysts, and compliance officers the ability to explore data and generate reports on their own terms — no IT ticket required.',
  },
  {
    num: '06',
    title: 'Building Governance Into the DNA',
    tech: 'Apache Atlas · Collibra',
    body: 'We deployed Apache Atlas and Collibra for automated data lineage, governance controls, and audit trails. The bank now has full visibility into the origin of every data point, its transformations, and its intended use.',
  },
]

export default function DataAnalyticsCaseStudyPage() {
  return (
    <>
      <JsonLd schema={getCaseStudySchema({
        title: '80% Reduction in Manual Reporting & Scalability Delivered',
        description: 'How StradIT modernised a global investment bank\'s data infrastructure 360°, cutting manual reporting by 80% and delivering intraday risk visibility.',
        url: 'https://stradit.com/case-studies/data-analytics'
      })} />
      <Nav activePage="coe" />
      <main id="main-content">

      {/* ── HERO ── */}
      <header className="hero hero--compact">
        <div className="hero__canvas"><AnimCanvas theme="data" /></div>
        <div className="container hero__inner">
          <div className="hero__eyebrow eyebrow">Case Study · Data Analytics</div>
          <h1 className="hero__title">
            80% Reduction in Manual Reporting &amp; <em>Scalability Delivered</em>
          </h1>
          <p className="hero__sub">
            From hours to minutes — a 360° data infrastructure transformation.
          </p>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.65',maxWidth:'600px',marginBottom:'36px'}}>
            Discover how StradIT modernised a leading investment bank's data infrastructure end-to-end,
            delivering real-time analytics, a cloud-native data lake, and self-service reporting that
            turned data complexity into competitive advantage.
          </p>
          <div className="hero__cta">
            <Link href="/contact" className="btn btn--primary">
              Request a Data &amp; Analytics Assessment
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/coe/data" className="btn btn--ghost">Back to Data CoE</Link>
          </div>
          <div className="hero__meta">
            <div className="hero__meta-cell"><div className="hero__meta-v">80%</div><div className="hero__meta-k">Less Manual Reporting</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">Real-Time</div><div className="hero__meta-k">Risk Visibility</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">6-Person</div><div className="hero__meta-k">Lean Delivery Squad</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">360°</div><div className="hero__meta-k">Data Transformation</div></div>
          </div>
        </div>
        <div className="hero__hud">
          <span className="pulse">Pipeline · Active</span>
          <span className="hero__hud-grid">
            <span>LATENCY <b>82ms</b></span>
            <span>MANUAL OPS <b>−80%</b></span>
            <span>QUALITY <b>99.2%</b></span>
          </span>
          <span>Case Study · Data</span>
        </div>
      </header>

      {/* ── 01 CLIENT OVERVIEW ── */}
      <section className="section" style={{paddingTop:'100px'}}>
        <div className="container">
          <div className="section-eyebrow"><span className="idx">01</span><span>Client Overview</span></div>
          {/* Client overview + Challenges toggle */}
          <details className="cs-offerings-toggle" style={{marginBottom:'40px',textAlign:'center'}}>
            <summary style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer',listStyle:'none',paddingBottom:'20px'}}>
              <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'16px',textAlign:'center'}}>A Global Investment Bank <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Drowning in Data</em></h2>
              <p style={{color:'var(--text-1)',fontSize:'17px',lineHeight:'1.7',maxWidth:'720px',textAlign:'left',marginBottom:'20px'}}>
                A global investment bank running multi-asset trading operations spanning equities,
                fixed income, foreign exchange, and derivatives. Despite the scale of their operations,
                their data infrastructure had not kept pace — patching the old system was not the answer.
                They needed a complete transformation, and StradIT was their best bet.
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

      {/* ── 02 WHY STRADIT ── */}
      <section className="section" style={{background:'var(--ink-1)',borderTop:'1px solid var(--line)'}}>
        <div className="container">
          <div className="section-eyebrow"><span className="idx">02</span><span>Why StradIT</span></div>
          <div className="two-col">
            <div>
              <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'20px'}}>The Leader in <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Data &amp; Analytics Modernisation</em></h2>
              <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',marginBottom:'16px'}}>
                StradIT's Data Analytics CoE combines deep technical expertise with a practical
                understanding of how trading floors, risk functions, and compliance teams actually work.
              </p>
              <p style={{color:'var(--text-2)',fontSize:'14px',lineHeight:'1.7',marginBottom:'28px'}}>
                We partnered with the bank and their system integrator, deploying a focused team of
                four Data Engineers, one Data Scientist, and one Data Architect. This lean,
                high-impact squad worked side by side with client teams to design and deliver a
                platform built for speed, scale, and governance.
              </p>
              <Link href="/coe/data" className="btn btn--ghost">
                Explore Data CoE
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'var(--line)',border:'1px solid var(--line)',borderRadius:'var(--radius-lg)',overflow:'hidden'}}>
              {whyPoints.map((pt, i) => (
                <div key={i} style={{
                  background:'var(--ink-2)',
                  padding:'28px 24px',
                  display:'flex',
                  gap:'16px',
                  alignItems:'center',
                }}>
                  <span style={{
                    width:'32px',height:'32px',
                    borderRadius:'50%',
                    border:'1px solid var(--accent)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    color:'var(--accent)',
                    fontSize:'12px',
                    flexShrink:0,
                  }}>✓</span>
                  <span style={{color:'var(--text-0)',fontSize:'15px',lineHeight:'1.5'}}>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 WHAT WE OFFERED ── */}
      <section className="section" style={{background:'var(--ink-0)',borderTop:'1px solid var(--line)'}}>
        <div className="container">
          <div className="section-eyebrow"><span className="idx">03</span><span>What We Offered</span></div>
          <details className="cs-offerings-toggle" style={{marginBottom:'40px',textAlign:'center'}}>
            <summary style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer',listStyle:'none',paddingBottom:'20px'}}>
              <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'16px',textAlign:'center'}}>More Than a <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Technology Upgrade</em></h2>
              <p style={{color:'var(--text-1)',fontSize:'17px',lineHeight:'1.7',maxWidth:'720px',textAlign:'left',marginBottom:'20px'}}>
                The bank needed a platform that could unify scattered data sources, deliver real-time
                insights, and scale gracefully as trading volumes grow. We planned and delivered
                100% customised solutions across every layer of their data estate.
              </p>
              <span style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'11px 26px',borderRadius:'999px',border:'1px solid rgba(255,122,61,0.82)',background:'linear-gradient(135deg,var(--accent),var(--accent-2))',color:'#0b0f18',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.10em',textTransform:'uppercase',boxShadow:'0 10px 24px rgba(255,122,61,0.22)'}}>
                <span className="cs-offerings-label-more">See More</span>
                <span className="cs-offerings-label-less" style={{display:'none'}}>See Less</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </summary>
            <div className="cs-g2">
              {offerings.map((o, i) => (
                <div key={i} className="cs-bullet-item" style={{background:'var(--ink-1)'}}>
                  <span className="cs-bullet-dot"/>
                  <p className="cs-bullet-text">{o}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* ── 04 HOW WE DELIVERED ── */}
      <section className="section" style={{background:'var(--ink-1)',borderTop:'1px solid var(--line)'}}>
        <div className="container">
          <div className="section-eyebrow"><span className="idx">04</span><span>How We Delivered It</span></div>
          <div style={{marginBottom:'40px',textAlign:'center'}}>
            <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'20px'}}>Clarity to Chaos. <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>Confidence to the Client.</em></h2>
            <p style={{color:'var(--text-1)',fontSize:'17px',lineHeight:'1.7',maxWidth:'720px',margin:'0 auto 20px',textAlign:'left'}}>
              StradIT assembled a data squad featuring the best minds in analytics and AI — working
              through a structured six-step approach to bring order to complexity.
            </p>
          </div>

          <details className="cs-offerings-toggle" style={{marginBottom:'40px',textAlign:'center'}}>
            <summary style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'11px 26px',borderRadius:'999px',border:'1px solid rgba(255,122,61,0.82)',background:'linear-gradient(135deg,var(--accent),var(--accent-2))',color:'#0b0f18',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.10em',textTransform:'uppercase',cursor:'pointer',listStyle:'none',boxShadow:'0 10px 24px rgba(255,122,61,0.22)'}}>
              <span className="cs-offerings-label-more">See More</span>
              <span className="cs-offerings-label-less" style={{display:'none'}}>See Less</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6"/></svg>
            </summary>
            <div className="cs-step-list">
              {steps.map((step) => (
                <div key={step.num} className="cs-step-row" style={{background:'var(--ink-2)'}}>
                  <span className="cs-step-dot"/>
                  <div>
                    <div className="cs-step-title">{step.title}</div>
                    <div className="cs-step-tag">{step.tech}</div>
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
          }}>Drowning in Data Complexity?</div>
          <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'20px',lineHeight:1.1}}>StradIT Can Build the Foundation <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>That Scales</em></h2>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',marginBottom:'36px'}}>
            We help you build a modern analytics foundation that grows with your ambitions —
            from data lake to real-time insights, governed and production-ready.
          </p>
          <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/contact" className="btn btn--primary">
              Request a Data &amp; Analytics Assessment
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/coe/data" className="btn btn--ghost">
              Explore Data CoE
            </Link>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  )
}
