'use client'

import { useEffect, useState } from 'react'
import { Text } from '@primer/react'
import type { TocItem } from '@/types/content'

export function ArticleToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id)

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

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

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
        {items.map((item, i) => {
          const active = item.id === activeId
          return (
            <li key={item.id} style={{ position: 'relative' }}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'baseline',
                  padding: `8px 0 8px ${item.level === 3 ? 32 : 16}px`,
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
                  {item.title}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
