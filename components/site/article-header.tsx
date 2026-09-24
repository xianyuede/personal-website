'use client'

import Link from 'next/link'
import { Heading, Text, Stack, Label, Token } from '@primer/react'
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
} from '@primer/octicons-react'
import type { ArticleSummary } from '@/types/content'

function formatDate(iso: string) {
  return iso.replaceAll('-', '.')
}

export function ArticleHeader({
  article,
  categoryLabel,
}: {
  article: ArticleSummary
  categoryLabel: string
}) {
  return (
    <header
      style={{
        borderBottom: 'var(--borderWidth-thin) solid var(--borderColor-default)',
        background:
          'radial-gradient(1200px 400px at 20% -10%, color-mix(in srgb, var(--bgColor-accent-muted) 60%, transparent), transparent)',
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: '32px 24px 40px',
        }}
      >
        <Stack direction="vertical" gap="normal">
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--fgColor-muted)',
              fontSize: 'var(--text-body-size)',
            }}
          >
            <ArrowLeftIcon size={16} />
            返回首页
          </Link>

          <Stack direction="horizontal" gap="condensed" align="center" wrap="wrap">
            <Label variant="accent">{categoryLabel}</Label>
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
            as="h1"
            variant="large"
            style={{ maxWidth: 820, letterSpacing: '-0.02em', lineHeight: 1.2 }}
          >
            {article.title}
          </Heading>

          <Text
            size="large"
            style={{ color: 'var(--fgColor-muted)', maxWidth: 720, lineHeight: 1.6 }}
          >
            {article.excerpt}
          </Text>

          <Stack direction="horizontal" gap="condensed" align="center" wrap="wrap">
            {article.tags.map((tag) => (
              <Token key={tag} text={tag} />
            ))}
          </Stack>
        </Stack>
      </div>
    </header>
  )
}
