'use client'

import { useEffect, useState } from 'react'
import { Text } from '@primer/react'
import type { Section } from '@/lib/articles'

export function ArticleToc({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0 }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav aria-label="章节导航" style={{ position: 'sticky', top: 32 }}>
      <Text
        size="small"
        weight="semibold"
        style={{
          color: 'var(--fgColor-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          display: 'block',
          marginBottom: 16,
        }}
      >
        目录
      </Text>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {sections.map((section, i) => {
          const active = section.id === activeId
          return (
            <li key={section.id} style={{ position: 'relative' }}>
              <a
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'baseline',
                  padding: '8px 0 8px 16px',
                  textDecoration: 'none',
                  borderLeft: `2px solid ${
                    active
                      ? 'var(--borderColor-accent-emphasis)'
                      : 'var(--borderColor-muted)'
                  }`,
                  color: active
                    ? 'var(--fgColor-accent)'
                    : 'var(--fgColor-muted)',
                  fontWeight: active ? 600 : 400,
                  transition: 'color 140ms ease, border-color 140ms ease',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--fontStack-monospace)',
                    fontSize: 'var(--text-caption-size)',
                    opacity: 0.7,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 'var(--text-body-size)', lineHeight: 1.4 }}>
                  {section.heading}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
