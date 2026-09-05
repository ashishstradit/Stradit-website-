'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    // Auto-tag all section.section elements that don't already have reveal
    document.querySelectorAll<HTMLElement>('section.section:not(.reveal)').forEach((el) => {
      el.classList.add('reveal')
    })

    // Also tag cs-offerings-toggle containers
    document.querySelectorAll<HTMLElement>('.cs-offerings-toggle:not(.reveal)').forEach((el) => {
      el.classList.add('reveal')
    })

    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    if (elements.length === 0) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('in'))
      return
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08,
      }
    )

    // 1. Read phase: Batch all layout reads first to avoid style invalidation overhead
    const bounds = elements.map((element) => ({
      element,
      rect: element.getBoundingClientRect(),
    }))

    // 2. Write phase: Perform DOM modifications
    bounds.forEach(({ element, rect }) => {
      element.classList.remove('in')

      const inView = rect.top < viewportHeight * 0.92 && rect.bottom > 0
      if (inView) {
        element.classList.add('in')
      } else {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [pathname])

  return null
}
