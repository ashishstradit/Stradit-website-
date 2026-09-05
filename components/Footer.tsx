import Link from 'next/link'
import BrandIcon from './BrandIcon'

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/stradit-llc',
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    name: 'Stradit Reachout on Facebook',
    url: 'https://www.facebook.com/people/Stradit-Reachout/pfbid032uUHtYjJCcvY4dc4p5K194jTMZ2ohD2pTbqpRq3TcYCmUfAmijVtNYVQe8sM7jPpl/',
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    name: 'Stradit Reachout on Instagram',
    url: 'https://www.instagram.com/stradit23/',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand reveal">
            <div className="nav__brand">
              <BrandIcon size={24} />
              <span className="brand-strad">STRAD</span><span className="brand-it">IT</span>
            </div>
            <p>Pioneering the next generation of applied artificial intelligence and engineering for global enterprises.</p>
          </div>
          <div className="footer__col reveal reveal-delay-1">
            <div className="footer__title">Company</div>
            <Link href="/about">About Us</Link>
            <Link href="/startit">StartIT</Link>
            <Link href="/careers">Careers</Link>
          </div>
          <div className="footer__col reveal reveal-delay-2">
            <div className="footer__title">Center of Excellence</div>
            <Link href="/coe/ai" style={{fontSize:'13px',whiteSpace:'nowrap'}}>Applied Artificial Intelligence</Link>
            <Link href="/coe/data" style={{fontSize:'13px',whiteSpace:'nowrap'}}>Data Analytics Applied AI</Link>
            <Link href="/coe/cyber" style={{fontSize:'13px',whiteSpace:'nowrap'}}>Cyber Security Applied AI</Link>
            <Link href="/coe/cloud" style={{fontSize:'13px',whiteSpace:'nowrap'}}>Cloud &amp; Infrastructure Applied AI</Link>
            <Link href="/coe/testing" style={{fontSize:'13px',whiteSpace:'nowrap'}}>Automated AI Testing</Link>
            <Link href="/coe/digital-assets" style={{fontSize:'13px',whiteSpace:'nowrap'}}>Digital Assets &amp; Blockchain</Link>
            <Link href="/gcc" style={{fontSize:'13px',whiteSpace:'nowrap'}}>Global Capability Center (GCC)</Link>
          </div>
          <div className="footer__col reveal reveal-delay-3">
            <div className="footer__title">Contact</div>
            <a href="mailto:reachout@stradit.com">reachout@stradit.com</a>
            <Link href="/contact">Book a call</Link>
            <div className="footer__social" aria-label="Social links">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.name}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {year} Stradit LLC · All rights reserved</span>
          <Link href="/sitemap.xml" style={{ color: 'inherit', textDecoration: 'none' }}>Sitemap</Link>
        </div>
      </div>
    </footer>
  )
}
