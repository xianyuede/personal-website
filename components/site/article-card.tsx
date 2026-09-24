'use client'

import Link from 'next/link'
import { Heading, Text, Stack, Token } from '@primer/react'
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@primer/octicons-react'
import type { ArticleSummary } from '@/types/content'

function formatDate(iso: string) {
  return iso.replaceAll('-', '.')
}

export function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
    >
      <article
        className="article-card"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--stack-gap-normal)',
          padding: 24,
          borderRadius: 'var(--borderRadius-large)',
          border: 'var(--borderWidth-thin) solid var(--borderColor-default)',
          background: 'var(--bgColor-muted)',
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
          className="article-card-title"
          as="h3"
          variant="small"
          style={{
            letterSpacing: '-0.01em',
            color: 'var(--fgColor-default)',
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
