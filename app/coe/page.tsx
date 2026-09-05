'use client'

import Link from 'next/link'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'
import JsonLd, { getServiceSchema } from '@/components/JsonLd'

type Theme = 'home' | 'about' | 'coe' | 'ai' | 'data' | 'cyber' | 'cloud' | 'testing' | 'gcc' | 'startit' | 'contact' | 'digitalassets'

const practices: { id: string; label: string; href: string; desc: string; theme: Theme }[] = [
  {
    id: 'ai',
    label: 'Applied Artificial Intelligence',
    href: '/coe/ai',
    desc: 'Converting intricate AI into a simplified solution that enterprises use to stay ahead of the curve.',
    theme: 'ai',
  },
  {
    id: 'data',
    label: 'Data Analytics Applied AI',
    href: '/coe/data',
    desc: 'Turn fragmented data into trusted insights; built for speed, accuracy, and action.',
    theme: 'data',
  },
  {
    id: 'cyber',
    label: 'Cyber Security Applied AI',
    href: '/coe/cyber',
    desc: 'Guard digital assets across applications, data, and identities while downsizing risks with AI-driven threat intelligence.',
    theme: 'cyber',
  },
  {
    id: 'cloud',
    label: 'Cloud & Infrastructure Applied AI',
    href: '/coe/cloud',
    desc: 'End-to-end consulting and service delivery to support cloud migration and modernization.',
    theme: 'cloud',
  },
  {
    id: 'testing',
    label: 'Automated AI Testing',
    href: '/coe/testing',
    desc: 'Supply scalable, reusable AI-powered QA frameworks to meet the highest quality standards.',
    theme: 'testing',
  },
  {
    id: 'digitalassets',
    label: 'Digital Assets & Blockchain',
    href: '/coe/digital-assets',
    desc: 'Blockchain-native infrastructure for regulated on-chain capital markets — from token issuance to smart contract automation.',
    theme: 'digitalassets',
  },
]

const gains = [
  '100% Tailored Solutions',
  'Start-to-Finish Confidence',
  'Built-in Trust & Authority',
  'Scale Without Limits',
  'Smarter Teams, Bigger Wins',
]

export default function CoePage() {
  const [active, setActive] = useState(0)
  const [mountKeys, setMountKeys] = useState<Record<number, number>>({ 0: 1 })

  function switchTab(i: number) {
    setActive(i)
    setMountKeys(prev => ({ ...prev, [i]: (prev[i] || 0) + 1 }))
  }

  return (
    <>
      <JsonLd schema={getServiceSchema({
        name: 'Centers of Excellence (CoE)',
        description: 'Specialized practices in Applied AI, data analytics, cloud infrastructure, quality engineering, cybersecurity, and digital assets.',
        url: 'https://stradit.com/coe'
      })} />
      <Nav activePage="coe" />
      <main id="main-content">

      {/* HERO */}
      <header className="hero hero--compact" style={{isolation:'isolate'}}>
        <div className="hero__canvas"><AnimCanvas theme="coe" /></div>
        <div style={{
          position:'absolute',inset:0,zIndex:1,pointerEvents:'none',
          background:'radial-gradient(ellipse 55% 90% at 15% 50%, rgba(6,9,18,0.95) 0%, rgba(6,9,18,0.6) 40%, transparent 70%), linear-gradient(180deg,transparent 0%,rgba(6,9,18,0.3) 70%,var(--ink-0) 100%)',
        }} />
        <div className="container hero__inner">
          <h1 className="hero__title">Our Center of <em>Excellence</em></h1>
          <p className="hero__sub">From Insight to Innovation With AI and Tech Engineering</p>
          <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.65',maxWidth:'600px',marginBottom:'36px'}}>
            StradIT bridges the gap between complex technology and real-world results. From Cybersecurity to AI, our Centers of Excellence help Fortune 500 companies navigate the future with confidence.
          </p>
          <div className="hero__cta">
            <Link href="/contact" className="btn btn--primary">
              Build With Our CoE
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
        <div className="hero__hud">
          <span className="pulse">Mesh active · 4 nodes</span>
          <span className="hero__hud-grid"><span>AI <b>●</b></span><span>CYBER <b>●</b></span><span>CLOUD <b>●</b></span><span>QA <b>●</b></span></span>
          <span>CoE · v2026.05</span>
        </div>
      </header>

      {/* PRACTICES SLIDER */}
      <section className="section">
        <div className="container">
          <div className="section-eyebrow"><span className="idx">01</span><span>Our Practices</span></div>

          {/* Tab strip */}
          <div className="coe-tab-strip">
            {practices.map((p, i) => (
              <button
                key={p.id}
                onClick={() => switchTab(i)}
                style={{
                  background: active === i ? 'linear-gradient(135deg, var(--accent), var(--accent-2))' : 'var(--ink-1)',
                  color: active === i ? '#1a0d05' : 'var(--text-2)',
                  borderColor: active === i ? 'rgba(255,122,61,0.82)' : 'transparent',
                  fontWeight: active === i ? 700 : 600,
                  boxShadow: active === i ? '0 10px 24px rgba(255,122,61,0.2)' : 'none',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Panels — animation visual + CTA only (no repeated text/description) */}
          {practices.map((p, i) => (
            <div
              key={p.id}
              className="coe-slider-panel"
              style={{ display: active === i ? 'grid' : 'none' }}
            >
              <div className="coe-slider-content">
                <Link href={p.href} className="btn btn--primary">
                  Know More
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </div>
              <div className="coe-slider-canvas">
                {mountKeys[i] && (
                  <AnimCanvas
                    theme={p.theme}
                    animKey={`${p.id}-${mountKeys[i]}`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT YOU GAIN */}
      <section className="section" style={{background:'var(--ink-1)',borderTop:'1px solid var(--line)'}}>
        <div className="container">
          <div className="section-eyebrow"><span className="idx">02</span><span>Why StradIT</span></div>
          <div className="coe-gains-grid">
            <div>
              <h2 style={{fontSize:'clamp(28px,4vw,46px)',letterSpacing:'-0.03em',marginBottom:'16px'}}>
                What You Gain with <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>StradIT</em>
              </h2>
              <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',marginBottom:'16px',fontStyle:'italic'}}>
                Don't Just Adopt Technology; Lead With it.
              </p>
              <p style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.7',marginBottom:'40px'}}>
                When you choose StradIT, you gain more than a vendor; you gain a velocity partner. We position you at the forefront of AI-led innovation, ensuring you aren't just running the race, but leading it.
              </p>
              <Link href="/contact" className="btn btn--primary">
                Transform With StradIT
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
            <div className="coe-gains-list">
              {gains.map((g, i) => (
                <div key={g} style={{
                  display:'flex',alignItems:'center',gap:'16px',
                  padding:'20px 24px',
                  background:'var(--ink-2)',
                  border:'1px solid var(--line)',
                  borderRadius: i === 0 ? 'var(--radius-lg) var(--radius-lg) 0 0' : i === gains.length-1 ? '0 0 var(--radius-lg) var(--radius-lg)' : '0',
                }}>
                  <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'linear-gradient(135deg,var(--accent),var(--accent-2))',flexShrink:0,display:'inline-block'}}></span>
                  <span style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:500,letterSpacing:'-0.01em'}}>{g}</span>
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
