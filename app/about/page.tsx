import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import HeroCarousel from '@/components/HeroCarousel'
import AboutToggle from '@/components/AboutToggle'
import { constructMetadata, PAGE_SEO } from '@/app/seo'
import JsonLd, { getOrganizationSchema } from '@/components/JsonLd'

export const metadata = constructMetadata(PAGE_SEO.about)

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={getOrganizationSchema()} />
      <Nav activePage="about" />
      <main id="main-content">

      {/* HERO */}
      <header className="hero hero--compact hero--carousel">
        <HeroCarousel />
        <div className="container hero__inner">
          <h1 className="hero__title">
            Engineers building intelligent solutions for <em>global finance.</em>
          </h1>
          <p className="hero__sub" style={{marginBottom:'32px'}}>
            We deliver real results for the world's top 10 global financial institutions — turning complex technology challenges into production systems that move metrics, with the governance and rigor regulators demand.
          </p>
          <div className="hero__cta">
            <Link href="/contact" className="btn btn--primary">
              Meet the team
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/gcc" className="btn btn--ghost">Our delivery model</Link>
          </div>
          <div className="hero__meta">
            <div className="hero__meta-cell"><div className="hero__meta-k">Founded</div><div className="hero__meta-v">2014 <small>USA · UK · Europe · Asia</small></div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Projects</div><div className="hero__meta-v">500+ <small>enterprise programs delivered</small></div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Practices</div><div className="hero__meta-v">5 <small>Centers of Excellence</small></div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Advisors</div><div className="hero__meta-v">Top 10 <small>global financial institutions</small></div></div>
          </div>
        </div>
        <div className="hero__hud">
          <span className="pulse">Origin · Global</span>
          <span className="hero__hud-grid">
            <span>YEARS <b>12</b></span><span>CLIENTS <b>50+</b></span>
          </span>
          <span>About · v2026.05</span>
        </div>
      </header>

      {/* OUR MISSION */}
      <section className="section" style={{background:'var(--ink-1)',borderTop:'1px solid var(--line)',borderBottom:'1px solid var(--line)'}}>
        <div className="container">
          <div className="about-focus-block">
            <div className="section-eyebrow"><span className="idx">02</span><span>Our Mission</span></div>
            <h2 className="about-section-highlight about-section-highlight--center">Our <em>Mission</em></h2>
            <p className="about-focus-block__lead">To Transform Technology Into Sustainable Advantage</p>
            <p className="about-focus-block__copy">
              StradIT aims to reshape AI and cybersecurity, data analytics, testing, &amp; cloud engineering into sustainable competitive advantages for progressive corporations.
            </p>
            <AboutToggle
              ctaHref="/coe"
              ctaLabel="Learn How We Execute"
              points={['Achieve 100% Dependability','Ensure Absolute Security & Compliance','Empower Teams with Intelligent Tech']}
            />
          </div>
        </div>
      </section>

      {/* OUR VISION */}
      <section className="section">
        <div className="container">
          <div className="about-focus-block">
            <div className="section-eyebrow"><span className="idx">03</span><span>Our Vision</span></div>
            <h2 className="about-section-highlight about-section-highlight--center">Our <em>Vision</em></h2>
            <p className="about-focus-block__lead">To be the Trustworthy Partner for AI-led Innovation, Integrity, and Impact.</p>
            <p className="about-focus-block__copy">
              StradIT envisions a future where enterprises rely on us to transform advanced technologies into practical, secure, and scalable solutions.
            </p>
            <AboutToggle
              ctaHref="/coe"
              ctaLabel="Explore Our CoE"
              points={['AI-Powered CoEs Embedded at the Workflow Core','Global Expertise & Strong Operational Focus','Results-Driven, Execution-First Solutions']}
            />
          </div>
        </div>
      </section>

      {/* OUR GLOBAL DELIVERY MODEL */}
      <section className="section" style={{background:'var(--ink-1)',borderTop:'1px solid var(--line)',borderBottom:'1px solid var(--line)'}}>
        <div className="container">
          <div className="two-col--start" style={{marginBottom:'48px'}}>
            <div>
              <h2 className="about-section-highlight" style={{marginBottom:'16px'}}>Our Global <em>Delivery Model</em></h2>
              <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',marginBottom:'24px'}}>
                Built on the Sun Model, our AI-enhanced delivery model guarantees zero downtime and non-stop execution for our Fortune 500 partners. We blend global talent with local impact and continuous delivery, keeping your projects always optimized and truly non-stop.
              </p>
              <p style={{color:'var(--text-1)',fontSize:'15px',lineHeight:'1.7',marginBottom:'32px'}}>
                Regardless of the delivery model our clients prefer, they experience consistency, speed, and quality. Our global teams unfailingly meet deadlines while upholding the highest standards of quality and innovation.
              </p>
              <Link href="/contact" className="btn btn--primary">
                Request Your Tailored Delivery
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'16px'}}>
              {[
                {model:'On-site Model', desc:'Direct collaboration at the client locations'},
                {model:'Offsite Model', desc:'Dedicated delivery centers near client hubs'},
                {model:'Offshore Model',desc:'Global talent pool across geographies'},
                {model:'Hybrid Model',  desc:'Blending onsite, offsite, and offshore models'},
              ].map((item, i) => (
                <details key={item.model} className={`about-expand-card about-expand-card--compact reveal reveal-delay-${i+1}`}>
                  <summary>
                    <span className="about-expand-card__title">{item.model}</span>
                  </summary>
                  <p>{item.desc}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WE TAKE PRIDE IN */}
      <section className="section">
        <div className="container">
          <div className="section-eyebrow"><span className="idx">05</span><span>We Take Pride In</span></div>
          <div className="two-col--start" style={{marginBottom:'48px'}}>
            <div>
              <h2 className="about-section-highlight" style={{marginBottom:'16px'}}>We Take <em>Pride In</em></h2>
              <p style={{color:'var(--text-1)',fontSize:'18px',fontWeight:500,marginBottom:'20px',letterSpacing:'-0.01em',lineHeight:'1.4'}}>Designing AI and Tech Solutions, Engineered for the Future</p>
              <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',marginBottom:'32px'}}>
                At StradIT, excellence isn&apos;t a promise; it&apos;s our North Star, and we make this possible through:
              </p>
              <Link href="/coe" className="btn btn--ghost">
                Experience Our Excellence
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              {[
                'Integrated Center of Excellence',
                'AI Readiness Training',
                'Continuous Assessment & Improvement',
                'Quality Assurance',
              ].map((item,i)=>(
                <div key={item} className={`about-expand-card about-expand-card--static reveal reveal-delay-${i+1}`}>
                  <div className="about-expand-card__static">
                    <span className="about-expand-card__idx">→</span>
                    <span className="about-expand-card__title">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  )
}
