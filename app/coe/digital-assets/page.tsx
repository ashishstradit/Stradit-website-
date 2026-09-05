import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnimCanvas from '@/components/AnimCanvas'
import { constructMetadata, PAGE_SEO } from '@/app/seo'
import JsonLd, { getServiceSchema } from '@/components/JsonLd'

export const metadata = constructMetadata(PAGE_SEO.coeDigitalAssets)

const gradTeal = { fontStyle:'normal' as const, background:'linear-gradient(120deg,#4fd1c5,#4cc8ff)', WebkitBackgroundClip:'text' as const, backgroundClip:'text' as const, color:'transparent' as const }
const gradGold = { fontStyle:'normal' as const, background:'linear-gradient(120deg,#f5b76b,#ffa066)', WebkitBackgroundClip:'text' as const, backgroundClip:'text' as const, color:'transparent' as const }

const pillars = [
  {
    num: '01 · Blockchain & DLT',
    title: 'Distributed Ledger Infrastructure',
    desc: 'Enterprise-grade permissioned blockchains and distributed ledger architecture — purpose-built for regulated financial institutions transacting on-chain.',
    tags: ['Hyperledger Fabric', 'R3 Corda', 'Private Ethereum', 'T+0 Settlement'],
    color: 'var(--teal, #4fd1c5)',
  },
  {
    num: '02 · Smart Contracting',
    title: 'On-Chain Contract Automation',
    desc: 'Smart contracts that manage the full lifecycle of tokenized securities — from issuance and compliance enforcement to settlement, corporate actions, and redemption.',
    tags: ['Solidity', 'Chaincode', 'Formal Verification', 'KYC/AML Logic'],
    color: 'var(--cyan, #4cc8ff)',
  },
  {
    num: '03 · Digital Asset Infrastructure',
    title: 'Token Issuance & Custody',
    desc: 'Token issuance platforms, custody architecture, on-chain reconciliation, and regulatory reporting — the operational backbone of a regulated digital asset program.',
    tags: ['ERC-3643', 'Custody Design', 'MiCA', 'SEC Framework'],
    color: '#f5b76b',
  },
]

export default function CoeDigitalAssetsPage() {
  return (
    <>
      <JsonLd schema={getServiceSchema({
        name: 'Digital Assets & Blockchain Center of Excellence',
        description: 'Secure, scale, and regulate distributed ledger architectures. StradIT designs on-chain tokenization, smart contracts, and compliance pipelines.',
        url: 'https://stradit.com/coe/digital-assets'
      })} />
      <Nav activePage="coe" />
      <main id="main-content">

      {/* HERO */}
      <header className="hero hero--compact">
        <div className="hero__canvas"><AnimCanvas theme="digitalassets" /></div>
        <div className="container hero__inner">
          <h1 className="hero__title">
            Blockchain-native infrastructure for{' '}
            <em style={gradTeal}>on-chain capital markets.</em>
          </h1>
          <p className="hero__sub">The regulated tokenization of securities is no longer a future scenario — it is the immediate horizon.</p>
          <p className="da-hero-copy" style={{color:'var(--text-1)',fontSize:'16px',lineHeight:'1.65',maxWidth:'600px',marginBottom:'36px'}}>
            StradIT builds the distributed ledger, smart contract, and digital asset infrastructure that financial institutions need to operate, settle, and comply on-chain.
          </p>
          <div className="hero__cta">
            <Link href="/contact" className="btn btn--primary">
              Start a Tokenization Assessment
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/coe" className="btn btn--ghost">All practices</Link>
          </div>
        </div>
        <div className="hero__hud">
          <span className="pulse">On-chain settlement active</span>
          <span className="hero__hud-grid">
            <span>NODES <b>9</b></span><span>FINALITY <b>T+0</b></span><span>STATUS <b>LIVE</b></span>
          </span>
          <span>CoE · Digital Assets · v2026.05</span>
        </div>
      </header>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="container">
          <div className="hero__meta">
            <div className="hero__meta-cell"><div className="hero__meta-k">Settlement</div><div className="hero__meta-v">T+0</div><div className="hero__meta-k">on-chain finality</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Asset Classes</div><div className="hero__meta-v">Equity, ETF, FI</div><div className="hero__meta-k">tokenization-ready</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Regulatory</div><div className="hero__meta-v">SEC · FCA · MiCA</div><div className="hero__meta-k">compliant architecture</div></div>
            <div className="hero__meta-cell"><div className="hero__meta-k">Go-live Target</div><div className="hero__meta-v">H2 2026</div><div className="hero__meta-k">be production-ready</div></div>
          </div>
        </div>
      </div>

      {/* REGULATORY CONTEXT */}
      <section className="section" style={{borderBottom:'1px solid var(--line)',paddingTop:'72px',paddingBottom:'72px'}}>
        <div className="container">
          <div className="reveal da-reg-callout" style={{background:'linear-gradient(135deg,rgba(79,209,197,0.06),rgba(76,200,255,0.04),transparent)',border:'1px solid rgba(79,209,197,0.2)',borderRadius:'18px',padding:'40px 48px',display:'grid',gridTemplateColumns:'auto 1fr auto',gap:'40px',alignItems:'center'}}>
            <div style={{width:'56px',height:'56px',background:'rgba(79,209,197,0.1)',border:'1px solid rgba(79,209,197,0.3)',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4fd1c5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'0.18em',textTransform:'uppercase',color:'#4fd1c5',marginBottom:'10px'}}>Regulatory Milestone · December 2025</div>
              <p style={{fontSize:'15px',color:'var(--text-1)',lineHeight:'1.65',maxWidth:'720px'}}>
                The SEC issued a landmark No-Action Letter enabling regulated custodians to offer tokenization services for custodied equities, ETFs, and fixed-income securities —{' '}
                <strong style={{color:'var(--text-0)'}}>the formal starting gun for on-chain US capital markets.</strong>{' '}
                Institutions that build readiness now will capture the operational and liquidity advantages of 24/7 on-chain access. StradIT is the engineering partner that gets you there.
              </p>
            </div>
            <div style={{textAlign:'center',flexShrink:0}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:'36px',fontWeight:500,letterSpacing:'-0.04em',background:'linear-gradient(120deg,#4fd1c5,#4cc8ff)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent',lineHeight:1}}>H2 2026</div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:'9px',letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--text-3)',marginTop:'8px'}}>Production target</div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="section">
        <div className="container">
          <div className="section-eyebrow"><span className="idx">01</span><span>Core Offerings</span></div>
          <h2 className="reveal" style={{fontSize:'clamp(28px,3.5vw,48px)',letterSpacing:'-0.03em',maxWidth:'720px',lineHeight:'1.05',marginBottom:'48px'}}>
            Three practices. One integrated <em style={{fontStyle:'normal',background:'linear-gradient(120deg,var(--accent),var(--accent-2))',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>digital asset program.</em>
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px'}} className="da-pillar-grid">
            {pillars.map((p, i) => (
              <details key={p.title} className={`text-expand-card reveal reveal-delay-${i+1}`} style={{position:'relative'}}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:`linear-gradient(90deg,${p.color},transparent)`}} />
                <summary>
                  <span className="text-expand-card__title">{p.title}</span>
                </summary>
                <p className="text-expand-card__body">{p.desc}</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:'6px',margin:'-6px 24px 22px calc(24px + 42px)'}}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{fontFamily:'var(--font-mono)',fontSize:'9px',letterSpacing:'0.12em',textTransform:'uppercase',padding:'5px 10px',borderRadius:'999px',border:'1px solid var(--line-strong)',color:'var(--text-2)'}}>{tag}</span>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODEL */}
      <section className="section" style={{background:'var(--ink-1)',borderTop:'1px solid var(--line)',borderBottom:'1px solid var(--line)'}}>
        <div className="container">
          <div className="section-eyebrow"><span className="idx">02</span><span>How We Engage</span></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'80px',alignItems:'end',marginBottom:'48px'}} className="da-engage-header">
            <h2 className="reveal" style={{fontSize:'clamp(26px,3vw,42px)',letterSpacing:'-0.03em',lineHeight:'1.05'}}>
              From readiness assessment to production in <em style={gradTeal}>18 weeks.</em>
            </h2>
            <p className="reveal" style={{color:'var(--text-1)',fontSize:'15px',lineHeight:'1.7'}}>
              A structured three-phase engagement designed around the regulatory timeline — so your institution is not scrambling when the production window opens in H2 2026.
            </p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'2px',position:'relative'}} className="da-timeline">
            {[
              { num:'01', dur:'Weeks 1–4', title:'Readiness Assessment', desc:'Gap analysis against the regulatory tokenization framework. Architecture review of existing custody, clearing, and fund accounting systems. Regulatory mapping for SEC, FCA, or MiCA requirements. Delivery of a detailed technical roadmap.' },
              { num:'02', dur:'Weeks 5–10', title:'Proof of Concept', desc:'Testnet deployment of permissioned chain. Smart contract prototypes covering issuance, KYC enforcement, and atomic settlement. Integration proof-point with one existing system. Formal contract audit on prototype code.' },
              { num:'03', dur:'Weeks 11–18', title:'Production Build', desc:'Full platform build and integration. Production-grade smart contracts with formal verification. Custody architecture, reconciliation pipelines, and regulatory reporting. Hardened, audited, and ready for H2 2026.' },
            ].map((step, i) => {
              const colors = ['#4fd1c5','#4cc8ff','#f5b76b']
              const bgs = ['rgba(79,209,197,0.12)','rgba(76,200,255,0.12)','rgba(245,183,107,0.12)']
              const borders = ['rgba(79,209,197,0.35)','rgba(76,200,255,0.35)','rgba(245,183,107,0.35)']
              return (
                <details key={step.num} className={`text-expand-card reveal reveal-delay-${i+1}`}>
                  <summary>
                    <span className="text-expand-card__title">
                      {step.title}
                      <span className="text-expand-card__meta">{step.dur}</span>
                    </span>
                  </summary>
                  <p className="text-expand-card__body">{step.desc}</p>
                </details>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'96px 0'}}>
        <div className="container">
          <div className="reveal da-cta-banner" style={{background:'linear-gradient(135deg,rgba(79,209,197,0.08),rgba(76,200,255,0.05),rgba(245,183,107,0.04))',border:'1px solid rgba(79,209,197,0.18)',borderRadius:'18px',padding:'56px 64px',display:'grid',gridTemplateColumns:'1fr auto',gap:'48px',alignItems:'center'}}>
            <div>
              <h2 style={{fontSize:'clamp(24px,2.8vw,38px)',letterSpacing:'-0.03em',lineHeight:'1.1',marginBottom:'12px'}}>
                H2 2026 is the deadline.<br />Start your assessment now.
              </h2>
              <p style={{color:'var(--text-1)',fontSize:'15px',maxWidth:'560px',lineHeight:'1.6'}}>
                The regulatory framework is live. Institutions that begin their technical readiness today will be first to market — and first to capture the liquidity and operational advantages of 24/7 on-chain settlement.
              </p>
            </div>
            <div className="da-cta-banner__actions" style={{display:'flex',flexDirection:'column',gap:'12px',alignItems:'flex-end',flexShrink:0}}>
              <Link href="/contact" className="btn btn--primary">
                Book a Readiness Call
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
              <Link href="/coe" className="btn btn--ghost">Explore all CoEs</Link>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  )
}
