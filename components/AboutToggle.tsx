'use client'
import { useState } from 'react'
import Link from 'next/link'

interface AboutToggleProps {
  ctaHref: string
  ctaLabel: string
  points: string[]
}

export default function AboutToggle({ ctaHref, ctaLabel, points }: AboutToggleProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="about-focus-actions">
      <div className="about-focus-actions__btns">
        <button
          type="button"
          className="about-points-toggle-btn"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
        >
          {open ? 'Show less' : 'Show more'}
        </button>
        <Link href={ctaHref} className="btn btn--ghost">
          {ctaLabel}
          <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </Link>
      </div>
      {open && (
        <ul className="about-focus-points">
          {points.map(p => <li key={p}>{p}</li>)}
        </ul>
      )}
    </div>
  )
}
