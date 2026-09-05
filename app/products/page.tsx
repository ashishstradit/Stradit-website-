import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import HeroCarousel from '@/components/HeroCarousel'
import { constructMetadata, PAGE_SEO } from '@/app/seo'
import JsonLd, { getOrganizationSchema } from '@/components/JsonLd'

export const metadata = constructMetadata(PAGE_SEO.products)

const products = [
  {
    name: 'Kyro',
    domain: 'AML AI Agent',
    desc: 'Your dedicated partner in operational excellence.',
    link: 'https://kyro.stradit.com',
    color: 'var(--accent)', // Orange
    features: ['Automated AML transaction monitoring', 'Suspicious activity pattern detection', 'AI-assisted case investigation flow', 'Compliance-ready audit log generation'],
    idx: '01'
  },
  {
    name: 'Altro',
    domain: 'Elevate Your Digital Horizon',
    desc: 'Automate complex investment reviews, uncover risks, and accelerate due diligence with powerful AI insights.',
    link: 'https://altro.stradit.com',
    color: '#4cc8ff', // Cyan / Light Blue
    features: ['Automated investment review execution', 'Deep risk identification & mitigation', 'Accelerated due diligence protocols', 'AI-powered quantitative insights'],
    idx: '02'
  },
  {
    name: 'Furo',
    domain: 'Autonomous Intelligence for Fund Governance',
    desc: 'Unify performance metrics and investor sentiment into board-ready insights — automatically. The digital analyst that never sleeps.',
    link: 'https://furo.stradit.com',
    color: '#c57dff', // Purple
    features: ['Unified performance metric synthesis', 'Real-time investor sentiment analytics', 'Automated board-ready insights generation', '24/7 autonomous digital analyst operations'],
    idx: '03'
  },
  {
    name: 'Pyro',
    domain: 'Compliance & LLM Governance',
    desc: 'Compliance monitoring and AI audit framework helping security officers and risk teams govern enterprise models, trace data lineage, and ensure regulatory alignment.',
    link: 'https://pyro.stradit.com',
    color: '#ff5a5a', // Red
    features: ['Automated model drift checks', 'Secure data lineage tracking', 'NIST / SEC audit reporting', 'Real-time compliance alerts'],
    idx: '04'
  },
  {
    name: 'Syro',
    domain: 'Digital Assets & Settlement',
    desc: 'Institutional-grade digital asset custody pipelines and blockchain-native settlement engines built for secure, tokenized on-chain transactions.',
    link: 'https://syro.stradit.com',
    color: '#4fd1c5', // Mint Green / Teal
    features: ['Multi-sig custody architecture', 'Smart contract automation', 'On-chain DvP settlement rules', 'Cross-ledger asset registry'],
    idx: '05'
  }
]

export default function ProductsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 48px;
        }
        .product-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 460px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.02), transparent 70%), var(--ink-2);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.25s ease, box-shadow 0.25s ease;
          opacity: 1 !important;
          transform: none !important;
        }
        .product-card:hover {
          transform: translateY(-4px) !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
          box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.5) !important;
        }
        .product-card__body {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding: 32px;
        }
        .product-card__badge {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid;
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
        }
        .product-card__title {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-0);
          margin-top: 20px;
          margin-bottom: 12px;
        }
        .product-card__desc {
          color: var(--text-1);
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 24px;
          flex-grow: 1;
        }
        .product-card__highlights {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .product-card__highlight {
          font-size: 13px;
          display: flex;
          gap: 8px;
          color: var(--text-2);
          margin-bottom: 8px;
          opacity: 1 !important;
          transform: none !important;
        }
        .product-card__footer {
          padding: 0 32px 32px 32px;
        }
        @media (max-width: 700px) {
          .product-grid {
            grid-template-columns: 1fr !important;
            gap: 16px;
          }
          .product-card__body {
            padding: 24px !important;
          }
          .product-card__footer {
            padding: 0 24px 24px 24px !important;
          }
          .product-card__title {
            font-size: 26px !important;
          }
        }
      `}} />

      <JsonLd schema={getOrganizationSchema()} />
      <Nav activePage="products" />
      
      <main id="main-content">
        {/* HERO */}
        <header className="hero hero--compact hero--carousel">
          <HeroCarousel />
          <div className="container hero__inner">
            <h1 className="hero__title">
              Production-grade software for <em>institutional finance.</em>
            </h1>
            <p className="hero__sub" style={{ marginBottom: '32px' }}>
              Explore StradIT's suite of proprietary financial technology products. Built to secure your operations, scale your analytical pipelines, and automate compliance with absolute mathematical rigor.
            </p>
            <div className="hero__cta">
              <a href="#product-grid" className="btn btn--primary">
                Explore Products
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <Link href="/contact" className="btn btn--ghost">Request custom deployment</Link>
            </div>
            <div className="hero__meta">
              <div className="hero__meta-cell"><div className="hero__meta-k">Architecture</div><div className="hero__meta-v">Low-Latency <small>engineered in Rust/Go</small></div></div>
              <div className="hero__meta-cell"><div className="hero__meta-k">Security</div><div className="hero__meta-v">SOC 2 / ISO <small>industry-leading frameworks</small></div></div>
              <div className="hero__meta-cell"><div className="hero__meta-k">Deployments</div><div className="hero__meta-v">SaaS / VPC <small>flexible hosting topologies</small></div></div>
              <div className="hero__meta-cell"><div className="hero__meta-k">Compliance</div><div className="hero__meta-v">SEC / FCA <small>built-in governance rules</small></div></div>
            </div>
          </div>
          <div className="hero__hud">
            <span className="pulse">Suite · Live</span>
            <span className="hero__hud-grid">
              <span>PRODUCTS <b>5</b></span><span>UPTIME <b>99.99%</b></span>
            </span>
            <span>Products · v2026.07</span>
          </div>
        </header>

        {/* PRODUCT GRID */}
        <section id="product-grid" className="section" style={{ background: 'var(--ink-1)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <div className="container">
            <div className="coe-header">
              <div className="section-eyebrow"><span className="idx">01</span><span>Proprietary Suite</span></div>
              <h2 className="reveal in">Our <em>Product Suite</em></h2>
              <p className="reveal reveal-delay-1 in">High-end software modules built on production-grade foundations and domain expertise.</p>
            </div>

            <div className="product-grid">
              {products.map((p, i) => (
                <article key={p.name} className="product-card">
                  <div className="product-card__body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <span className="product-card__badge" style={{ color: p.color, borderColor: `${p.color}33`, background: `${p.color}0c` }}>{p.domain}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>{p.idx}</span>
                    </div>

                    <h3 className="product-card__title">
                      {p.name}
                    </h3>
                    
                    <p className="product-card__desc">
                      {p.desc}
                    </p>

                    <ul className="product-card__highlights" aria-label={`${p.name} capabilities`}>
                      {p.features.map(f => (
                        <li key={f} className="product-card__highlight">
                          <span style={{ color: p.color }}>→</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="product-card__footer">
                    <a 
                      href={p.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn--primary" 
                      style={{ 
                        width: '100%', 
                        justifyContent: 'center',
                        borderColor: `${p.color}44`,
                        background: `linear-gradient(135deg, ${p.color}1a, ${p.color}05)`,
                        color: 'var(--text-0)'
                      }}
                    >
                      Go to Dashboard
                      <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '8px' }}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="section" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="container">
            <div style={{
              background: 'radial-gradient(ellipse 80% 100% at 0% 50%, rgba(255, 122, 61, 0.15), transparent 60%), radial-gradient(ellipse 60% 100% at 100% 50%, rgba(76, 200, 255, 0.08), transparent 60%), var(--ink-2)',
              border: '1px solid var(--line-strong)',
              borderRadius: 'var(--radius-lg)',
              padding: '72px 64px',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '48px',
              alignItems: 'center'
            }} className="cta-band reveal reveal-zoom in">
              <div>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.03em', marginBottom: '16px', lineHeight: '1.05' }}>
                  Ready to host a private <em style={{ fontStyle: 'normal', background: 'linear-gradient(120deg, var(--accent), var(--accent-2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>instance?</em>
                </h2>
                <p style={{ color: 'var(--text-1)', fontSize: '17px', lineHeight: '1.6', maxWidth: '560px' }}>
                  All StradIT products are available for deployment inside your Virtual Private Cloud (VPC) or local Kubernetes clusters. Contact our solutions architecture desk to receive architecture diagrams.
                </p>
              </div>
              <div style={{ flexShrink: 0 }}>
                <Link href="/contact" className="btn btn--primary" style={{ fontSize: '16px', padding: '16px 32px' }}>
                  Request Consultation
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
