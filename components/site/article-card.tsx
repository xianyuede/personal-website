'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heading, Text, Stack, Label, Token } from '@primer/react'
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@primer/octicons-react'
import type { Article } from '@/lib/articles'

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
    d.getDate()
  ).padStart(2, '0')}`
}

export function ArticleCard({ article }: { article: Article }) {
  const [hover, setHover] = useState(false)

  return (
    <Link
      href={`/articles/${article.slug}`}
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <article
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--stack-gap-normal)',
          padding: 24,
          borderRadius: 'var(--borderRadius-large)',
          border: `var(--borderWidth-thin) solid ${
            hover
              ? 'var(--borderColor-accent-emphasis)'
              : 'var(--borderColor-default)'
          }`,
          background: 'var(--bgColor-muted)',
          transition: 'border-color 160ms ease, transform 160ms ease',
          transform: hover ? 'translateY(-4px)' : 'none',
        }}
      >
        <Stack direction="horizontal" gap="condensed" align="center">
          <Text
            size="small"
            style={{
              color: 'var(--fgColor-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <CalendarIcon size={14} />
            {formatDate(article.date)}
          </Text>
          <Text
            size="small"
            style={{
              color: 'var(--fgColor-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <ClockIcon size={14} />
            {article.readingTime}
          </Text>
        </Stack>

        <Heading
          as="h3"
          variant="small"
          style={{
            letterSpacing: '-0.01em',
            color: hover ? 'var(--fgColor-accent)' : 'var(--fgColor-default)',
            transition: 'color 160ms ease',
          }}
        >
          {article.title}
        </Heading>

        <Text
          style={{
            color: 'var(--fgColor-muted)',
            flexGrow: 1,
            lineHeight: 1.6,
          }}
        >
          {article.excerpt}
        </Text>

        <Stack direction="horizontal" gap="condensed" align="center" wrap="wrap">
          {article.tags.map((tag) => (
            <Token key={tag} text={tag} />
          ))}
        </Stack>

        <Text
          size="small"
          weight="semibold"
          style={{
            color: 'var(--fgColor-accent)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          阅读全文
          <ArrowRightIcon size={14} />
        </Text>
      </article>
    </Link>
  )
}
