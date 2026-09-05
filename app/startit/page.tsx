import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'
import { constructMetadata, PAGE_SEO } from '@/app/seo'
import JsonLd, { getServiceSchema } from '@/components/JsonLd'

export const metadata = constructMetadata(PAGE_SEO.startit)

export default function StartitPage() {
  return (
    <>
      <JsonLd schema={getServiceSchema({
        name: 'StartIT Program',
        description: 'StartIT is our AI training, roadmapping, and upskilling program built to turn enterprise teams into AI builders.',
        url: 'https://stradit.com/startit'
      })} />
      <Nav activePage="startit" />
      <main id="main-content">

      {/* HERO */}
      <header className="hero hero--compact">
        <div className="hero__canvas"><AnimCanvas theme="startit" /></div>
        <div className="container hero__inner">
          <h1 className="hero__title">Turning Your Teams Into <em>AI Powerhouses</em></h1>
          <p className="hero__sub">From &apos;AI Curious&apos; to &apos;AI Certified&apos; in Only 8 Weeks with StartIT.</p>
          <div className="hero__cta">
            <Link href="/contact" className="btn btn--primary">
              Join Our AI Training
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/coe" className="btn btn--ghost">Our Centers of Excellence</Link>
          </div>
          <div className="hero__meta">
            <div className="hero__meta-cell"><div className="hero__meta-k">Cohort model</div><div className="hero__meta-v">8-week <small>guided learning sprint</small></div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Tracks</div><div className="hero__meta-v">5 <small>role-based learning paths</small></div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Delivery</div><div className="hero__meta-v">Hybrid <small>in-person · remote · on-site</small></div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Output</div><div className="hero__meta-v">Capstone <small>portfolio + interview-ready</small></div></div>
          </div>
        </div>
        <div className="hero__hud">
          <span className="pulse">StartIT · Live Cohort</span>
          <span className="hero__hud-grid"><span>TRACKS <b>5</b></span><span>DURATION <b>8 wks</b></span><span>FORMAT <b>Hybrid</b></span></span>
          <span>StartIT · v2026.05</span>
        </div>
      </header>

      {/* 01 — Lead with Confidence */}
      <section className="section startit-section startit-section--lead">
        <div className="container">
          <div className="section-eyebrow"><span className="idx">01</span><span>Why StartIT</span></div>
          
          <h2 className="startit-heading" style={{textAlign:'center',marginBottom:'16px'}}>Lead AI and Technology With <em className="startit-gradient-text">Confidence</em></h2>
          <p className="startit-lead" style={{textAlign:'center',maxWidth:'720px',marginBottom:'20px',marginLeft:'auto',marginRight:'auto'}}>
            StradIT turns learning AI and tech engineering from an uphill battle to a strategic leap forward through guided learning, hands-on labs, mentorship, and a clear path from concepts to outcomes.
          </p>
          <div style={{display:'flex',alignItems:'center',gap:'16px',justifyContent:'center',flexWrap:'wrap',marginBottom:'20px'}}>
            <Link href="/contact" className="btn btn--primary">
              Join Our AI Training
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>

          <details className="cs-offerings-toggle" style={{textAlign:'center'}}>
            <summary style={{display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:'pointer',listStyle:'none',paddingBottom:'20px'}}>
              <span style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'11px 26px',borderRadius:'999px',border:'1px solid rgba(255,122,61,0.82)',background:'linear-gradient(135deg,var(--accent),var(--accent-2))',color:'#0b0f18',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.10em',textTransform:'uppercase',boxShadow:'0 10px 24px rgba(255,122,61,0.22)'}}>
                <span className="cs-offerings-label-more">See More</span>
                <span className="cs-offerings-label-less" style={{display:'none'}}>See Less</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </summary>
            <div className="cs-g3" style={{textAlign:'left'}}>
              {[
                { title: '8-week cohort model', desc: 'Structured sprints from concepts to outcomes' },
                { title: '5 role-based tracks', desc: 'Literacy · Strategy · Technical · Applied · Quantum AI' },
                { title: 'Capstone outputs', desc: 'Portfolio-ready, interview-ready stories' },
              ].map((item, i) => (
                <div key={i} className="cs-bullet-item" style={{background:'var(--ink-1)'}}>
                  <span className="cs-bullet-dot"/>
                  <div>
                    <p className="cs-bullet-title">{item.title}</p>
                    <p className="cs-bullet-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* 02 — Fuel Your Career */}
      <section className="section startit-section startit-section--band" style={{ background: 'var(--ink-1)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-eyebrow"><span className="idx">02</span><span>Fuel Your Career</span></div>
          
          <h2 className="startit-heading" style={{textAlign:'center',marginBottom:'16px'}}>
            Fuel Your Career with <em className="startit-gradient-text">StartIT</em>
          </h2>
          <p className="startit-body" style={{textAlign:'center',maxWidth:'720px',marginBottom:'20px',marginLeft:'auto',marginRight:'auto'}}>
            StartIT, our AI training and returnship program, helps leaders and tech professionals to make AI concepts their second nature, with training mapped to enterprise roles and grounded in domain realities.
          </p>

          <details className="cs-offerings-toggle" style={{textAlign:'center'}}>
            <summary style={{display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:'pointer',listStyle:'none',paddingBottom:'20px'}}>
              <span style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'11px 26px',borderRadius:'999px',border:'1px solid rgba(255,122,61,0.82)',background:'linear-gradient(135deg,var(--accent),var(--accent-2))',color:'#0b0f18',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.10em',textTransform:'uppercase',boxShadow:'0 10px 24px rgba(255,122,61,0.22)'}}>
                <span className="cs-offerings-label-more">See More</span>
                <span className="cs-offerings-label-less" style={{display:'none'}}>See Less</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </summary>
            <div className="cs-g2" style={{textAlign:'left'}}>
              {[
                { title: 'Guided Paths', desc: 'Clear learning journeys for every role.' },
                { title: 'Mentored Projects', desc: 'Hands-on work with realistic business scenarios.' },
                { title: 'CoE Exposure', desc: 'Learn from StradIT\'s applied AI practices.' },
                { title: 'Career Confidence', desc: 'Build portfolio and interview-ready stories.' },
              ].map((item, i) => (
                <div key={i} className="cs-bullet-item" style={{background:'var(--ink-2)'}}>
                  <span className="cs-bullet-dot"/>
                  <div>
                    <p className="cs-bullet-title">{item.title}</p>
                    <p className="cs-bullet-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* 03 — Five Tracks */}
      <section className="section startit-section">
        <div className="container">
          <div className="section-eyebrow"><span className="idx">03</span><span>Build Rock-solid Confidence</span></div>
          
          <h2 className="startit-heading startit-heading--tight" style={{textAlign:'center',marginBottom:'16px'}}>Build Rock-solid <em className="startit-gradient-text">Confidence</em></h2>
          <p className="startit-tracks-intro__lead" style={{textAlign:'center',maxWidth:'720px',marginBottom:'20px',marginLeft:'auto',marginRight:'auto'}}>
            StartIT is organized into five tracks, so every participant learns what they need, at the right depth, with a shared language across business and technology.
          </p>
          <div style={{display:'flex',alignItems:'center',gap:'16px',justifyContent:'center',flexWrap:'wrap',marginBottom:'20px'}}>
            <Link href="/contact" className="btn btn--primary">
              Upskill Your Teams With StartIT
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>

          <details className="cs-offerings-toggle" style={{textAlign:'center'}}>
            <summary style={{display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:'pointer',listStyle:'none',paddingBottom:'20px'}}>
              <span style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'11px 26px',borderRadius:'999px',border:'1px solid rgba(255,122,61,0.82)',background:'linear-gradient(135deg,var(--accent),var(--accent-2))',color:'#0b0f18',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.10em',textTransform:'uppercase',boxShadow:'0 10px 24px rgba(255,122,61,0.22)'}}>
                <span className="cs-offerings-label-more">See More</span>
                <span className="cs-offerings-label-less" style={{display:'none'}}>See Less</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </summary>
            <div className="cs-g2" style={{textAlign:'left'}}>
              {[
                { title: 'AI Literacy', tag: 'Nail the AI Basics', desc: 'Learn what AI can do and how to use it responsibly in daily workflows.' },
                { title: 'AI Strategy', tag: 'From Hype to ROI', desc: 'Connect AI opportunities to business value, adoption, and measurable outcomes.' },
                { title: 'AI Technical', tag: 'Production-Ready AI', desc: 'A practical track for teams building models, pipelines, and AI integrations.' },
                { title: 'AI Applied', tag: 'Build the Breakthrough', desc: 'Create domain-specific prototypes for real workflows and business use cases.' },
                { title: 'Quantum AI Training', tag: 'Prepare for the Next Frontier', desc: 'Explore quantum computing and AI through a practical, business-first approach.' },
              ].map((track, i) => (
                <div key={i} className="cs-bullet-item" style={{background:'var(--ink-1)'}}>
                  <span className="cs-bullet-dot"/>
                  <div>
                    <p className="cs-bullet-title">{track.title}</p>
                    <p className="cs-bullet-tag">{track.tag}</p>
                    <p className="cs-bullet-desc">{track.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* 04 — Transformation Pillars */}
      <section className="section startit-section startit-section--band" style={{ background: 'var(--ink-1)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-eyebrow"><span className="idx">04</span><span>The StartIT Transformation</span></div>
          
          <h2 className="startit-heading startit-heading--pillars" style={{textAlign:'center',marginBottom:'16px'}}>The StartIT <em className="startit-gradient-text">Transformation</em></h2>
          <p className="startit-pillars-intro__lead" style={{textAlign:'center',maxWidth:'720px',marginBottom:'20px',marginLeft:'auto',marginRight:'auto'}}>
            Move from scattered AI pilots to a shared, practical way of working with AI across teams.
          </p>

          <details className="cs-offerings-toggle" style={{textAlign:'center'}}>
            <summary style={{display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:'pointer',listStyle:'none',paddingBottom:'20px'}}>
              <span style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'11px 26px',borderRadius:'999px',border:'1px solid rgba(255,122,61,0.82)',background:'linear-gradient(135deg,var(--accent),var(--accent-2))',color:'#0b0f18',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.10em',textTransform:'uppercase',boxShadow:'0 10px 24px rgba(255,122,61,0.22)'}}>
                <span className="cs-offerings-label-more">See More</span>
                <span className="cs-offerings-label-less" style={{display:'none'}}>See Less</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </summary>
            <div className="cs-g2" style={{textAlign:'left'}}>
              {[
                { title: 'Shared AI Language', desc: 'Business and tech teams align faster.' },
                { title: 'Sharper AI Decisions', desc: 'Leaders know what to invest in.' },
                { title: 'Roadmaps That Move', desc: 'Training turns into real product work.' },
                { title: 'Responsible Engineering', desc: 'Teams build with guardrails and governance.' },
                { title: 'Returnship Confidence', desc: 'Participants leave portfolio-ready.' },
                { title: 'AI-First Culture', desc: 'AI becomes part of everyday thinking.' },
              ].map((p, i) => (
                <div key={i} className="cs-bullet-item" style={{background:'var(--ink-2)'}}>
                  <span className="cs-bullet-dot"/>
                  <div>
                    <p className="cs-bullet-title">{p.title}</p>
                    <p className="cs-bullet-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* CTA Banner — reuse GCC CTA band styles */}
      <section className="gcc-cta-wrap">
        <div className="container">
          <div className="gcc-cta-band">
            <div className="gcc-cta-band__copy">
              <h2 className="gcc-cta-band__title">Ready to make your organization truly <em className="gcc-gradient-text">AI-ready?</em></h2>
              <p className="gcc-cta-band__lead">
                Book a strategy call and see how StartIT can turn your people into confident builders, decision-makers, and leaders in the age of AI.
              </p>
            </div>
            <Link href="/contact" className="btn btn--primary gcc-cta-band__btn">
              Talk to Our AI Training Team
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section startit-section startit-section--faq">
        <div className="container">
          <div className="section-eyebrow"><span className="idx">05</span><span>Frequently Asked Questions</span></div>
          
          <h2 className="startit-faq-title" style={{textAlign:'center',marginBottom:'20px'}}>Frequently Asked <em className="startit-gradient-text">Questions</em></h2>

          <details className="cs-offerings-toggle" style={{textAlign:'center'}}>
            <summary style={{display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:'pointer',listStyle:'none',paddingBottom:'20px'}}>
              <span style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'11px 26px',borderRadius:'999px',border:'1px solid rgba(255,122,61,0.82)',background:'linear-gradient(135deg,var(--accent),var(--accent-2))',color:'#0b0f18',fontFamily:'var(--font-mono)',fontSize:'11px',fontWeight:700,letterSpacing:'0.10em',textTransform:'uppercase',boxShadow:'0 10px 24px rgba(255,122,61,0.22)'}}>
                <span className="cs-offerings-label-more">See More</span>
                <span className="cs-offerings-label-less" style={{display:'none'}}>See Less</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </summary>
            <div className="cs-g2" style={{textAlign:'left'}}>
              {[
                { question: 'How long does it run?', answer: 'Usually 6-12 weeks, shaped around your team.' },
                { question: 'Can it focus on finance?', answer: 'Yes. Banking, asset management, treasury, and risk.' },
                { question: 'Remote or in-person?', answer: 'Both, including hybrid delivery.' },
                { question: 'How is impact measured?', answer: 'Skills gained, use cases built, and roadmap progress.' },
              ].map((faq, i) => (
                <div key={i} className="cs-bullet-item" style={{background:'var(--ink-1)'}}>
                  <span className="cs-bullet-dot"/>
                  <div>
                    <p className="cs-bullet-title">{faq.question}</p>
                    <p className="cs-bullet-desc">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      </main>
      <Footer />
    </>
  )
}
