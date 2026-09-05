'use client'

import Link from 'next/link'
import { useState, useEffect, useRef, type CSSProperties } from 'react'
import AnimCanvas from '@/components/AnimCanvas'

type CoeCardProps = {
  href: string
  size: 'lg' | 'md' | 'sm'
  revealClass?: string
  interactionGroup?: string
  style?: CSSProperties
  visualStyle?: CSSProperties
  badge: string
  chips: string[]
  theme: 'ai' | 'data' | 'cyber' | 'cloud' | 'testing' | 'gcc' | 'digitalassets'
  animKey: string
  title: string
  desc: string
  highlights: string[]
  cta: string
  animDelay?: number
}

export default function CoeCard({
  href,
  size,
  revealClass = '',
  interactionGroup,
  style,
  visualStyle,
  badge,
  chips,
  theme,
  animKey,
  title,
  desc,
  highlights,
  cta,
  animDelay = 0,
}: CoeCardProps) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), animDelay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animDelay])

  const clearSiblingActiveCards = () => {
    const card = ref.current
    const rail = card?.closest('.coe-rail')

    rail?.querySelectorAll('.coe-card--active').forEach((activeCard) => {
      activeCard.classList.remove('coe-card--active')
    })
  }

  const activateCard = () => {
    if (!interactionGroup || !ref.current) return
    clearSiblingActiveCards()
    ref.current.classList.add('coe-card--active')
  }

  const deactivateCard = () => {
    if (!interactionGroup || !ref.current) return
    ref.current.classList.remove('coe-card--active')
  }

  return (
    <article
      ref={ref}
      className={`coe-card coe-card--${size} ${revealClass}${interactionGroup ? ' coe-card--controlled' : ''}${visible ? ' coe-card--visible in' : ''}${open ? ' coe-card--open' : ''}`.trim()}
      style={style}
      onMouseEnter={activateCard}
      onMouseLeave={deactivateCard}
    >
      {/* Canvas visual — navigates on click */}
      <Link href={href} className="coe-card__visual" style={visualStyle} tabIndex={-1} aria-hidden="true">
        <span className="coe-card__badge">{badge}</span>
        <AnimCanvas theme={theme} animKey={animKey} />
      </Link>

      {/* Text body */}
      <div className="coe-card__body">
        <div className="coe-card__title">{title}</div>
        <div className="coe-card__desc">{desc}</div>

        {/* 4 bullet highlights */}
        <ul className="coe-card__highlights" aria-label="Key capabilities">
          {highlights.map((item) => (
            <li key={item} className="coe-card__highlight">
              <span aria-hidden="true">→</span>
              {item}
            </li>
          ))}
        </ul>

        {/* Mobile-only toggle button */}
        <button
          type="button"
          className="coe-card__toggle"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Hide highlights' : 'Show highlights'}
        </button>

        <Link href={href} className="coe-card__cta">
          {cta}
        </Link>
      </div>
    </article>
  )
}
