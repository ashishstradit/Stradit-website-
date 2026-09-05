'use client'
import { useEffect, useRef, useState } from 'react'

const slides = [
  { img: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?auto=format&fit=crop&w=1800&q=90', alt: 'Hudson Yards New York', caption: 'Headquartered at Hudson Yards — at the center of New York\'s financial future', tag: 'Hudson Yards · New York City' },
  { img: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1800&q=90', alt: 'NASDAQ Times Square', caption: 'Where the world watches markets move — powering the intelligence behind every tick', tag: 'Times Square · NASDAQ · Capital Markets' },
  { img: 'https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=1800&q=90', alt: 'NASDAQ screen Times Square', caption: 'The NASDAQ tower — our clients move the numbers behind every screen in Times Square', tag: 'NASDAQ · NYSE · Times Square · NYC' },
  { img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1800&q=90', alt: 'Blockchain distributed ledger', caption: 'Blockchain-native settlement and distributed ledger solutions for institutional finance', tag: 'Blockchain · DLT · Settlement' },
  { img: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1800&q=90', alt: 'Blockchain technology', caption: 'Secure, auditable, and immutable — building trust into every transaction layer', tag: 'Distributed Ledger · Smart Contracts' },
  { img: 'https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&w=1800&q=90', alt: 'Digital assets tokenization', caption: 'Tokenization, digital asset custody, and on-chain settlement infrastructure for regulated institutions', tag: 'Digital Assets · Tokenization · Custody' },
  { img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1800&q=90', alt: 'Quantum computing', caption: 'Preparing institutions for the quantum era — readiness assessments to hybrid model prototyping', tag: 'Quantum AI · Next Frontier' },
  { img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1800&q=90', alt: 'Financial market analytics', caption: 'Real-time quantitative analytics for the world\'s top asset managers and custodian banks', tag: 'Capital Markets · Asset Management' },
  { img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1800&q=90', alt: 'Institutional client strategy', caption: 'Embedded alongside CTOs and COOs at top-10 global financial institutions', tag: 'Tier-1 Banks · Strategy · Delivery' },
  { img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=90', alt: 'Portfolio risk intelligence', caption: 'Governed workflows your risk and compliance teams will stand behind — delivered in 8 weeks', tag: 'Risk Intelligence · Compliance · NIST AI RMF' },
  { img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=90', alt: 'London Canary Wharf', caption: 'Serving leading institutions across the City of London and Canary Wharf', tag: 'London · Canary Wharf · EMEA' },
  { img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1800&q=90', alt: 'Trading floor financial', caption: 'Production-grade intelligence across trading, settlement, and regulatory reporting', tag: 'Trading · Settlement · RegTech' },
]

const INTERVAL = 8000
const IMAGE_WIDTHS = [480, 768, 1024, 1440, 1920]

function imageUrl(src: string, width: number) {
  return src
    .replace(/([?&])w=\d+/, `$1w=${width}`)
    .replace(/([?&])q=\d+/, '$1q=50')
}

function imageSrcSet(src: string) {
  return IMAGE_WIDTHS.map((width) => `${imageUrl(src, width)} ${width}w`).join(', ')
}

export default function LandingCarousel() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loadedIndices, setLoadedIndices] = useState<number[]>([0])
  const startRef = useRef<number>(Date.now())

  const goTo = (i: number) => { setActive(i); setProgress(0); startRef.current = Date.now() }

  useEffect(() => {
    setLoadedIndices((prev) => {
      if (prev.includes(active)) return prev
      return [...prev, active]
    })
  }, [active])

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Date.now() - startRef.current
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100))
      if (elapsed >= INTERVAL) {
        startRef.current = Date.now()
        setActive(a => (a + 1) % slides.length)
        setProgress(0)
      }
    }, 120)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={imageUrl(slides[0].img, 1024)}
        imageSrcSet={imageSrcSet(slides[0].img)}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <div style={{position:'absolute',inset:0,zIndex:0,overflow:'hidden'}}>
        {slides.map((s, i) => (
          <div key={i} style={{position:'absolute',inset:0,opacity:active===i?1:0,transition:'opacity .75s ease',pointerEvents:active===i?'auto':'none',willChange:'opacity',transform:'translateZ(0)',backfaceVisibility:'hidden'}}>
            {loadedIndices.includes(i) && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl(s.img, 1920)} srcSet={imageSrcSet(s.img)} sizes="100vw" alt={s.alt} loading={i===0?'eager':'lazy'} fetchPriority={i===0?'high':'auto'} decoding={i===0?'sync':'async'} draggable={false} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 35%',display:'block',filter:'brightness(0.68) saturate(1.28) contrast(1.06)',transform:'translateZ(0)',backfaceVisibility:'hidden',imageRendering:'auto'}} />
                <div style={{position:'absolute',inset:0,background:'linear-gradient(110deg,rgba(255,122,61,0.15) 0%,transparent 58%),linear-gradient(250deg,rgba(76,200,255,0.12) 0%,transparent 58%)'}} />
              </>
            )}
            <div className="hero-carousel-caption" style={{position:'absolute',bottom:'76px',right:'clamp(20px,4vw,56px)',textAlign:'right',maxWidth:'340px',opacity:active===i?1:0,transform:active===i?'translateY(0)':'translateY(4px)',transition:'opacity .45s ease .2s,transform .45s ease .2s',pointerEvents:'none'}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(13px,1.1vw,16px)',color:'rgba(255,255,255,0.88)',letterSpacing:'-0.01em',lineHeight:'1.35',borderRight:'2px solid var(--accent)',paddingRight:'14px',marginBottom:'8px'}}>{s.caption}</div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--accent)'}}>{s.tag}</div>
            </div>
          </div>
        ))}
        {/* Vignette — left-heavy so text is readable */}
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 55% 100% at 15% 50%,rgba(6,9,18,0.74) 0%,rgba(6,9,18,0.34) 42%,rgba(6,9,18,0.08) 72%,transparent 84%),linear-gradient(180deg,rgba(6,9,18,0.06) 0%,rgba(6,9,18,0.18) 70%,var(--ink-0) 100%)',pointerEvents:'none',zIndex:1}} />
      </div>

      {/* Dot nav */}
      <div className="hero-carousel-dots" style={{position:'absolute',bottom:'88px',left:'50%',transform:'translateX(-50%)',zIndex:5,display:'flex',gap:'8px',alignItems:'center'}}>
        {slides.map((s,i) => (
          <button
            key={i}
            onClick={()=>goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${s.alt}`}
            aria-current={active===i ? 'true' : 'false'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              background: 'transparent',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            <span style={{
              width: active===i ? '22px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: active===i ? 'var(--accent)' : 'rgba(255,255,255,0.28)',
              transition: 'all .2s ease',
              boxShadow: active===i ? '0 0 10px rgba(255,122,61,0.5)' : 'none',
            }} />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{position:'absolute',bottom:0,left:0,height:'2px',width:`${progress}%`,background:'linear-gradient(90deg,var(--accent),var(--cyan))',zIndex:6,transition:'width 0.05s linear'}} />
    </>
  )
}
