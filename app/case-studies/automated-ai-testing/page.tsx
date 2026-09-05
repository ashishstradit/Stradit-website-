import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'
import { constructMetadata, PAGE_SEO } from '@/app/seo'
import JsonLd, { getCaseStudySchema } from '@/components/JsonLd'

export const metadata = constructMetadata(PAGE_SEO.csAutomatedTesting)

const challenges = [
  'Legacy framework could not adapt to new requirements',
  'Only developers with deep Java knowledge could write or maintain test scripts',
  'Proprietary lock-in from expensive testing tools',
  'Longer test cycles slowing down releases',
]

const whyPoints = [
  'Practical, hands-on experience building frameworks that actually work for real teams',
  'A framework anyone can use, without inventing the wheel for every release',
  'Close partnership across testing needs, application landscape, and long-term goals',
]

const offerings = [
  'End-to-end development of a test automation framework',
  'Test execution across APIs, user interfaces, and databases',
  'A keyword-driven approach',
  'Seamless integration with modern technology stacks',
  'Agile practices for speed and transparency',
]

const steps = [
  {
    num: '01',
    title: 'Choosing the Right Foundation',
    tech: 'Robot Framework · Python',
    body: 'We selected Robot Framework as the backbone of the new solution, pairing an open-source automation platform with Python. The result was no licensing dependencies and a testing solution the whole team could use.',
  },
  {
    num: '02',
    title: 'Designing for Flexibility and Scale',
    tech: 'Page Object Model',
    body: 'The framework used the Page Object Model to separate test logic from page-specific code, with built-in support for development, staging, and production environments.',
  },
  {
    num: '03',
    title: 'Enabling End-to-End Coverage',
    tech: 'API · UI · Database',
    body: 'We built the framework to handle API testing, UI testing, and database validation in one flow, catching issues whether they originated in services, interfaces, or data layers.',
  },
  {
    num: '04',
    title: 'Making It Easy for Everyone',
    tech: 'Keyword-Driven Testing',
    body: 'With Robot Framework, in-house testers could write and understand tests using plain-language keywords. The entire team became active contributors to quality.',
  },
  {
    num: '05',
    title: 'Delivering with Agile Discipline',
    tech: 'Agile · Governance',
    body: 'We delivered working increments on a regular cadence, with governance that kept progress, risks, and outcomes visible at every stage.',
  },
]

const gradText = {
  fontStyle: 'normal' as const,
  background: 'linear-gradient(120deg,var(--accent),var(--accent-2))',
  WebkitBackgroundClip: 'text' as const,
  backgroundClip: 'text' as const,
  color: 'transparent' as const,
}

export default function AutomatedAiTestingCaseStudyPage() {
  return (
    <>
      <JsonLd schema={getCaseStudySchema({
        title: 'Open-Source Framework and Unmatched Results with Automated AI Testing',
        description: 'How StradIT helped a global investment bank modernise test automation with an open-source, keyword-driven framework that eliminated license dependencies and widened adoption.',
        url: 'https://stradit.com/case-studies/automated-ai-testing'
      })} />
      <Nav activePage="coe" />
      <main id="main-content">

      <header className="hero hero--compact">
        <div className="hero__canvas"><AnimCanvas theme="testing" /></div>
        <div className="container hero__inner">
          <div className="hero__eyebrow eyebrow">Case Study · Automated AI Testing</div>
          <h1 className="hero__title">
            Open-Source Framework &amp; Unmatched Results: <em>The StradIT Difference</em>
          </h1>
          <p className="hero__sub">
            A global investment bank modernised testing with a framework anyone on the team could use.
          </p>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.65',maxWidth:'600px',marginBottom:'36px'}}>
            StradIT replaced an expensive, developer-heavy legacy setup with a practical open-source automation framework built for adoption, speed, and long-term scale.
          </p>
          <div className="hero__cta">
            <Link href="/contact" className="btn btn--primary">
              Request a Test Automation Assessment
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/coe/testing" className="btn btn--ghost">Back to Testing CoE</Link>
          </div>
          <div className="hero__meta">
            <div className="hero__meta-cell"><div className="hero__meta-v">Open-Source</div><div className="hero__meta-k">Robot Framework</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">70+</div><div className="hero__meta-k">QA Experts</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">5-Step</div><div className="hero__meta-k">Transformation</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-v">Broader</div><div className="hero__meta-k">Team Adoption</div></div>
          </div>
        </div>
        <div className="hero__hud">
          <span className="pulse">Suite · Green</span>
          <span className="hero__hud-grid">
            <span>LANG <b>Python</b></span>
            <span>STACK <b>Robot</b></span>
            <span>PASS <b>99.6%</b></span>
          </span>
          <span>Case Study · QA</span>
        </div>
      </header>

        <section className="section" style={{paddingTop:'100px'}}>
          <div className="container">
            <div className="section-eyebrow"><span className="idx">01</span><span>Client Overview</span></div>
            <details className="cs-offerings-toggle" style={{marginBottom:'32px',textAlign:'center'}}>
              <summary style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer',listStyle:'none',paddingBottom:'20px'}}>
                <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'16px',textAlign:'center'}}>A Global Investment Bank <em style={gradText}>Held Back by Legacy Testing</em></h2>
                <p style={{color:'var(--text-1)',fontSize:'17px',lineHeight:'1.7',maxWidth:'720px',textAlign:'left',marginBottom:'20px'}}>
                  The bank was using an outdated test automation setup as it prepared to adopt cloud, AI integration, and advanced data analytics. It needed a testing approach that could keep pace without draining budgets.
                </p>
                <span style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'11px 26px',borderRadius:'999px',border:'1px solid rgba(255,122,61,0.82)',background:'linear-gradient(135deg,var(--accent),var(--accent-2))',color:'#0b0f18',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.10em',textTransform:'uppercase',boxShadow:'0 10px 24px rgba(255,122,61,0.22)'}}>
                  <span className="cs-offerings-label-more">See More</span>
                  <span className="cs-offerings-label-less" style={{display:'none'}}>See Less</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </summary>
              <div className="cs-g2">
                {challenges.map((challenge) => (
                  <div key={challenge} className="cs-bullet-item" style={{background:'var(--ink-1)'}}>
                    <span className="cs-bullet-dot"/>
                    <p className="cs-bullet-text">{challenge}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </section>

        <section className="section" style={{background:'var(--ink-1)',borderTop:'1px solid var(--line)'}}>
          <div className="container">
            <div className="section-eyebrow"><span className="idx">02</span><span>Why StradIT</span></div>
            <div className="two-col">
              <div>
                <h2 style={{fontSize:'clamp(26px,3.5vw,40px)',letterSpacing:'-0.03em',marginBottom:'16px'}}>Test Automation Built for <em style={gradText}>Real Teams</em></h2>
                <p style={{color:'var(--text-1)',fontSize:'15px',lineHeight:'1.7',marginBottom:'24px'}}>
                  StradIT brought practical experience in building automation frameworks that teams can operate, extend, and trust without specialist bottlenecks.
                </p>
                <div className="cs-mini-g3">
                  {[['70+','Experts'],['Fully managed','QAs'],['Enterprise-grade','Result']].map(([v, l]) => (
                    <div key={l} style={{background:'var(--ink-3)',border:'1px solid var(--line)',borderRadius:'var(--radius)',padding:'20px 16px',textAlign:'center'}}>
                      <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:600,letterSpacing:'-0.03em',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent',marginBottom:'4px'}}>{v}</div>
                      <div style={{fontFamily:'var(--font-mono)',fontSize:'9px',letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--text-3)'}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'var(--line)',border:'1px solid var(--line)',borderRadius:'var(--radius-lg)',overflow:'hidden'}}>
                {whyPoints.map((point) => (
                  <div key={point} style={{background:'var(--ink-2)',padding:'22px 20px',display:'flex',gap:'14px',alignItems:'flex-start'}}>
                    <span style={{width:'28px',height:'28px',borderRadius:'50%',border:'1px solid var(--accent)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--accent)',fontSize:'11px',flexShrink:0,marginTop:'2px'}}>✓</span>
                    <span style={{color:'var(--text-0)',fontSize:'14px',lineHeight:'1.55'}}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{background:'var(--ink-0)',borderTop:'1px solid var(--line)'}}>
          <div className="container">
            <div className="section-eyebrow"><span className="idx">03</span><span>What We Delivered</span></div>
            <details className="cs-offerings-toggle" style={{marginBottom:'32px',textAlign:'center'}}>
              <summary style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer',listStyle:'none',paddingBottom:'20px'}}>
                <h2 style={{fontSize:'clamp(26px,3.5vw,40px)',letterSpacing:'-0.03em',marginBottom:'16px',textAlign:'center'}}>A Complete <em style={gradText}>Testing Transformation</em></h2>
                <p style={{color:'var(--text-1)',fontSize:'17px',lineHeight:'1.7',maxWidth:'720px',textAlign:'left',marginBottom:'20px'}}>The client needed a complete transformation of how testing was done across its application portfolio.</p>
                <span style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'11px 26px',borderRadius:'999px',border:'1px solid rgba(255,122,61,0.82)',background:'linear-gradient(135deg,var(--accent),var(--accent-2))',color:'#0b0f18',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.10em',textTransform:'uppercase',boxShadow:'0 10px 24px rgba(255,122,61,0.22)'}}>
                  <span className="cs-offerings-label-more">See More</span>
                  <span className="cs-offerings-label-less" style={{display:'none'}}>See Less</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </summary>
              <div className="cs-g2">
                {offerings.map((offering) => (
                  <div key={offering} className="cs-bullet-item" style={{background:'var(--ink-1)'}}>
                    <span className="cs-bullet-dot"/>
                    <p className="cs-bullet-text">{offering}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </section>

        <section className="section" style={{background:'var(--ink-1)',borderTop:'1px solid var(--line)'}}>
          <div className="container">
            <div className="section-eyebrow"><span className="idx">04</span><span>How We Built the Solution</span></div>
            <details className="cs-offerings-toggle" style={{marginBottom:'32px',textAlign:'center'}}>
              <summary style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer',listStyle:'none',paddingBottom:'20px'}}>
                <h2 style={{fontSize:'clamp(26px,3.5vw,40px)',letterSpacing:'-0.03em',marginBottom:'16px',textAlign:'center'}}>Lean, Agile, and <em style={gradText}>Laser-Focused</em></h2>
                <p style={{color:'var(--text-1)',fontSize:'17px',lineHeight:'1.7',maxWidth:'720px',textAlign:'left',marginBottom:'20px'}}>A five-step automation strategy focused on adoption, maintainability, and release confidence.</p>
                <span style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'11px 26px',borderRadius:'999px',border:'1px solid rgba(255,122,61,0.82)',background:'linear-gradient(135deg,var(--accent),var(--accent-2))',color:'#0b0f18',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.10em',textTransform:'uppercase',boxShadow:'0 10px 24px rgba(255,122,61,0.22)'}}>
                  <span className="cs-offerings-label-more">See More</span>
                  <span className="cs-offerings-label-less" style={{display:'none'}}>See Less</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </summary>
              <div className="cs-step-list">
                {steps.map((step) => (
                  <div key={step.num} className="cs-step-row" style={{background:'var(--ink-2)', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
                    <span className="cs-step-dot" style={{marginTop: 0, marginBottom: '12px'}}/>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <div className="cs-step-title" style={{textAlign: 'center'}}>{step.title}</div>
                      <div className="cs-step-tag" style={{textAlign: 'center', marginBottom: '8px'}}>{step.tech}</div>
                      <p className="cs-step-body" style={{textAlign: 'center', maxWidth: '640px'}}>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </section>


        <section className="section" style={{background:'var(--ink-0)',borderTop:'1px solid var(--line)'}}>
          <div className="container" style={{textAlign:'center',maxWidth:'640px',margin:'0 auto'}}>
            <h2 style={{fontSize:'clamp(24px,3.5vw,40px)',letterSpacing:'-0.03em',marginBottom:'16px',lineHeight:1.1}}>Stuck With Expensive, Complicated <em style={gradText}>Testing Tools?</em></h2>
            <p style={{color:'var(--text-1)',fontSize:'15px',lineHeight:'1.7',marginBottom:'28px'}}>
              StradIT can help you build something better: faster, smarter, and free of vendor lock-in.
            </p>
            <Link href="/contact" className="btn btn--primary">
              Request a Test Automation Assessment
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
