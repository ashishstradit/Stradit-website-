import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'
import { constructMetadata, PAGE_SEO } from '@/app/seo'
import JsonLd, { getServiceSchema } from '@/components/JsonLd'

export const metadata = constructMetadata(PAGE_SEO.gcc)

export default function GccPage() {
  return (
    <>
      <JsonLd schema={getServiceSchema({
        name: 'Global Capability Center (GCC)',
        description: 'Build, operate, and scale your own dedicated global capability center with StradIT.',
        url: 'https://stradit.com/gcc'
      })} />
      <Nav activePage="gcc" />
      <main id="main-content">

        {/* HERO */}
        <header className="hero hero--compact">
          <div className="hero__canvas"><AnimCanvas theme="gcc" /></div>
          <div className="container hero__inner">
            <h1 className="hero__title">Your Global <em>Capability Center</em></h1>
            <p className="hero__sub">
              Built by StradIT. Owned by you.<br />
              Your dedicated tech team, finance hub, or innovation center will be fully operational in weeks, not months. We set it up. We run the backend. You call the shots.
            </p>
            <div className="hero__cta">
              <Link href="/contact" className="btn btn--primary">
                Build What&apos;s Yours
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <Link href="/about" className="btn btn--ghost">About StradIT</Link>
            </div>
            <div className="hero__meta">
              <div className="hero__meta-cell"><div className="hero__meta-k">Regions</div><div className="hero__meta-v">4 <small>USA · UK · Europe · Asia</small></div></div>
              <div className="hero__meta-cell"><div className="hero__meta-k">First hires</div><div className="hero__meta-v">2–4 wks <small>not quarters</small></div></div>
              <div className="hero__meta-cell"><div className="hero__meta-k">Retention</div><div className="hero__meta-v">95%+ <small>annual average</small></div></div>
              <div className="hero__meta-cell"><div className="hero__meta-k">Scale</div><div className="hero__meta-v">100 – 500 <small>we grow when you grow</small></div></div>
            </div>
          </div>
          <div className="hero__hud">
            <span className="pulse">Mesh · Online</span>
            <span className="hero__hud-grid">
              <span>USA <b>●</b></span><span>UK <b>●</b></span><span>EU <b>●</b></span><span>ASIA <b>●</b></span>
            </span>
            <span>GCC · v2026.05</span>
          </div>
        </header>

        {/* THE STRADIT DIFFERENCE */}
        <section className="section gcc-section gcc-section--diff">
          <div className="container">
            <div className="section-eyebrow"><span className="idx">01</span><span>The StradIT Difference</span></div>
            <details className="cs-offerings-toggle" style={{ textAlign: 'center' }}>
              <summary style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', listStyle: 'none', paddingBottom: '20px' }}>
                <h2 className="gcc-diff-heading" style={{ textAlign: 'center', marginBottom: '16px' }}>
                  The StradIT <em className="gcc-gradient-text">Difference</em>
                </h2>
                <p className="gcc-diff-lead" style={{ textAlign: 'left', maxWidth: '720px', marginBottom: '20px' }}>
                  With StradIT&apos;s GCC, you hire top-tier talent with zero headaches and with full control. This isn&apos;t outsourcing. This is ownership.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '11px 26px', borderRadius: '999px', border: '1px solid rgba(255,122,61,0.82)', background: 'linear-gradient(135deg,var(--accent),var(--accent-2))', color: '#0b0f18', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', boxShadow: '0 10px 24px rgba(255,122,61,0.22)' }}>
                    <span className="cs-offerings-label-more">See More</span>
                    <span className="cs-offerings-label-less" style={{ display: 'none' }}>See Less</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6" /></svg>
                  </span>
                  <Link href="/contact" className="btn btn--primary">
                    Build Your Global Team
                    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </Link>
                </div>
              </summary>
              <div className="cs-g2">
                {[
                  'First hires in 2–4 weeks. Not quarters.',
                  'Establish high-performing teams with maximum efficiency.',
                  'Go from 5 to 50 to 500. We grow when you grow.',
                  'One partner. Full stack. No juggling vendors.',
                ].map((pt, i) => (
                  <div key={i} className="cs-bullet-item" style={{ background: 'var(--ink-1)' }}>
                    <span className="cs-bullet-dot" />
                    <p className="cs-bullet-text">{pt}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </section>

        {/* WHAT YOU UNLOCK */}
        <section className="section gcc-section gcc-section--unlock" style={{ background: 'var(--ink-1)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <div className="container">
            <div className="section-eyebrow"><span className="idx">02</span><span>What You Unlock</span></div>
            <details className="cs-offerings-toggle" style={{ textAlign: 'center' }}>
              <summary style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', listStyle: 'none', paddingBottom: '20px' }}>
                <h2 className="gcc-unlock-heading" style={{ textAlign: 'center', marginBottom: '16px' }}>
                  What You <em className="gcc-gradient-text">Unlock</em>
                </h2>
                <p className="gcc-unlock-lead" style={{ textAlign: 'left', maxWidth: '720px', marginBottom: '20px' }}>
                  Build a captive center that works like an extension of your HQ. StradIT handles setup, operations, compliance, and scale across IT, finance, R&amp;D, and customer operations.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '11px 26px', borderRadius: '999px', border: '1px solid rgba(255,122,61,0.82)', background: 'linear-gradient(135deg,var(--accent),var(--accent-2))', color: '#0b0f18', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', boxShadow: '0 10px 24px rgba(255,122,61,0.22)' }}>
                    <span className="cs-offerings-label-more">See More</span>
                    <span className="cs-offerings-label-less" style={{ display: 'none' }}>See Less</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cs-offerings-chevron"><path d="M6 9l6 6 6-6" /></svg>
                  </span>
                  <Link href="/contact" className="btn btn--primary">
                    Build Your Global Team
                    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </Link>
                </div>
              </summary>
              <div className="gcc-unlock-grid" style={{ marginTop: '24px' }}>
                {[
                  { title: 'Global Talent, Local Expertise', desc: 'Build teams in the right locations with the skills you need.' },
                  { title: 'Quality Without Compromise', desc: 'Accelerate operating output while protecting standards and quality.' },
                  { title: 'Speed to Scale', desc: 'Ramp teams up or down as your roadmap changes.' },
                  { title: 'Innovation at the Core', desc: 'Turn your GCC into a digital transformation hub.' },
                  { title: 'Total Visibility', desc: 'Track payroll, performance, metrics, and compliance clearly.' },
                  { title: 'One Partner, Full Stack', desc: 'Strategy, talent, compliance, and delivery in one place.' },
                ].map((item, i) => (
                  <details key={item.title} className={`text-expand-card reveal reveal-delay-${i % 3}`}>
                    <summary>
                      <span className="text-expand-card__idx">0{i + 1}</span>
                      <span className="text-expand-card__title">
                        {item.title}
                        <span className="text-expand-card__meta">GCC</span>
                      </span>
                    </summary>
                    <p className="text-expand-card__body">{item.desc}</p>
                  </details>
                ))}
              </div>
            </details>
          </div>
        </section>

        {/* BUILT FOR BUILDERS */}
        <section className="section gcc-section">
          <div className="container">
            <div className="gcc-builders-grid">
              <div>
                <div className="section-eyebrow"><span className="idx">03</span><span>Built for Builders</span></div>
                <h2 className="gcc-builders-heading">
                  Built for <em className="gcc-gradient-text">Builders</em>
                </h2>
                <p className="gcc-builders-lead" style={{ textAlign: 'right' }}>
                  StradIT GCCs power the teams that build the future.
                </p>
              </div>
              <div className="gcc-builders-list">
                {[
                  'AI & Machine Learning teams',
                  'Cloud & DevOps operations',
                  'Data Analytics hubs',
                  'Cybersecurity centers',
                  'Testing & Quality engineering services',
                ].map((item, i) => (
                  <div key={item} className={`gcc-builders-item reveal reveal-delay-${i + 1}`}>
                    <span className="gcc-builders-item__dot" aria-hidden />
                    <span className="gcc-builders-item__label">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="gcc-cta-wrap">
          <div className="container">
            <div className="gcc-cta-band">
              <div className="gcc-cta-band__copy">
                <h2 className="gcc-cta-band__title">Ready to Build Your Global <em className="gcc-gradient-text">Powerhouse?</em></h2>
                <p className="gcc-cta-band__lead">
                  Let&apos;s talk about what your GCC could look like and how fast we can get you there.
                </p>
              </div>
              <Link href="/contact" className="btn btn--primary gcc-cta-band__btn">
                Book a Free Strategy Call
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
