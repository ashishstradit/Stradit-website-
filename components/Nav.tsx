'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import BrandIcon from './BrandIcon'

export default function Nav({ activePage }: { activePage?: string }) {
  const [open, setOpen] = useState(false)
  const [coeOpen, setCoeOpen] = useState(activePage === 'coe')

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.classList.remove('nav-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <nav className={`nav${open ? ' nav--open' : ''}`}>
      <div className="container nav__inner">
        <Link href="/" className="nav__brand" aria-label="Stradit home" onClick={closeMenu}>
          <BrandIcon size={28} />
          <span className="brand-strad">STRAD</span><span className="brand-it">IT</span>
        </Link>

        <div className={`nav__links${open ? ' open' : ''}`}>
          <Link href="/about" className={activePage === 'about' ? 'active' : ''} onClick={closeMenu}>About Us</Link>
          <div className={`nav__menu${coeOpen ? ' open' : ''}`}>
            <div className="nav__menu-row">
              <Link href="/coe" className={activePage === 'coe' ? 'active' : ''} onClick={closeMenu}>Center of Excellence</Link>
              <button
                type="button"
                className="nav__submenu-toggle"
                aria-label="Toggle Center of Excellence links"
                aria-expanded={coeOpen}
                onClick={() => setCoeOpen((value) => !value)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>
            </div>
            <div className="nav__submenu">
              <Link href="/coe/ai" onClick={closeMenu}>Applied Artificial Intelligence</Link>
              <Link href="/coe/data" onClick={closeMenu}>Data Analytics Applied AI</Link>
              <Link href="/coe/cyber" onClick={closeMenu}>Cyber Security Applied AI</Link>
              <Link href="/coe/cloud" onClick={closeMenu}>Cloud &amp; Infrastructure Applied AI</Link>
              <Link href="/coe/testing" onClick={closeMenu}>Automated AI Testing</Link>
              <Link href="/gcc" onClick={closeMenu}>Global Capability Center (GCC)</Link>
              <Link href="/coe/digital-assets" onClick={closeMenu}>Digital Assets &amp; Blockchain</Link>
            </div>
          </div>
          <Link href="/gcc" className={activePage === 'gcc' ? 'active' : ''} onClick={closeMenu}>Global Capability Center</Link>
          <Link href="/startit" className={activePage === 'startit' ? 'active' : ''} onClick={closeMenu}>StartIT</Link>
          <Link href="/careers" className={activePage === 'careers' ? 'active' : ''} onClick={closeMenu}>Careers</Link>

          <Link href="/contact" className="nav__mobile-cta" onClick={closeMenu}>
            Contact Us
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>

        <div className="nav__right">
          <Link href="/contact" className="btn btn--primary" onClick={closeMenu}>
            Contact Us
            <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
          <button
            className="nav__toggle"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <button className="nav__scrim" onClick={closeMenu} aria-label="Close menu" tabIndex={open ? 0 : -1} />
    </nav>
  )
}
