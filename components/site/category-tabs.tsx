'use client'

import { useState } from 'react'
import { UnderlineNav, Heading, Text, Stack } from '@primer/react'
import {
  BookIcon,
  CpuIcon,
  HeartIcon,
  GraphIcon,
  type Icon,
} from '@primer/octicons-react'
import type { CategoryWithArticles } from '@/types/content'
import { ArticleCard } from './article-card'

const iconFor: Record<string, Icon> = {
  cpu: CpuIcon,
  heart: HeartIcon,
  graph: GraphIcon,
  book: BookIcon,
}

export function CategoryTabs({ categories }: { categories: CategoryWithArticles[] }) {
  const [active, setActive] = useState(categories[0]?.id ?? '')
  const activeCategory =
    categories.find((category) => category.id === active) ?? categories[0]

  if (!activeCategory) {
    return <Text style={{ color: 'var(--fgColor-muted)' }}>暂时还没有文章分类。</Text>
  }

  return (
    <section aria-label="文章分类" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <UnderlineNav aria-label="文章分类">
        {categories.map((category) => (
          <UnderlineNav.Item
            key={category.id}
            icon={iconFor[category.icon ?? ''] ?? BookIcon}
            aria-current={category.id === active ? 'page' : undefined}
            counter={category.articles.length}
            onSelect={(e) => {
              e.preventDefault()
              setActive(category.id)
            }}
          >
            {category.label}
          </UnderlineNav.Item>
        ))}
      </UnderlineNav>

      <Stack direction="vertical" gap="condensed">
        <Heading as="h2" variant="medium" style={{ letterSpacing: '-0.01em' }}>
          {activeCategory.label}
        </Heading>
        <Text style={{ color: 'var(--fgColor-muted)', maxWidth: 640 }}>
          {activeCategory.description}
        </Text>
      </Stack>

      <div
        style={{
          display: 'grid',
          gap: 20,
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        }}
      >
        {activeCategory.articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
