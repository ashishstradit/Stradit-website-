'use client'

import { useEffect } from 'react'

const detailSelector = 'details.text-expand-card, details.about-expand-card, details.job-card--expand'

const scopeSelector = [
  '.ai-approach-grid',
  '.gcc-unlock-grid',
  '.gcc-diff-cards',
  '.cards-2',
  '.cards-3',
  '.cards-2-top',
  '.cards-3-bottom',
  '.startit-lead-cards',
  '.startit-career-grid',
  '.startit-career-list',
  '.startit-tracks-grid',
  '.startit-pillars-grid',
  '.startit-faq-grid',
  '.values-grid',
  '.job-list',
  '.da-pillar-grid',
  '.da-timeline',
].join(',')

export default function SingleOpenDetails() {
  useEffect(() => {
    const handleToggle = (event: Event) => {
      const active = event.target as HTMLDetailsElement | null
      if (!active?.matches?.(detailSelector) || !active.open) return

      const scope = active.closest(scopeSelector) ?? active.parentElement
      scope?.querySelectorAll<HTMLDetailsElement>(detailSelector).forEach((details) => {
        if (details !== active) details.open = false
      })
    }

    document.addEventListener('toggle', handleToggle, true)
    return () => document.removeEventListener('toggle', handleToggle, true)
  }, [])

  return null
}
