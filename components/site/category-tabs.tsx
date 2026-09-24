'use client'

import { useState } from 'react'
import { UnderlineNav, Heading, Text, Stack } from '@primer/react'
import { CpuIcon, HeartIcon, GraphIcon, type Icon } from '@primer/octicons-react'
import { categories, getArticlesByCategory, type CategoryId } from '@/lib/articles'
import { ArticleCard } from './article-card'

const iconFor: Record<CategoryId, Icon> = {
  ai: CpuIcon,
  life: HeartIcon,
  invest: GraphIcon,
}

export function CategoryTabs() {
  const [active, setActive] = useState<CategoryId>('ai')
  const activeCategory = categories.find((c) => c.id === active)!
  const list = getArticlesByCategory(active)

  return (
    <section aria-label="文章分类" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <UnderlineNav aria-label="文章分类">
        {categories.map((category) => (
          <UnderlineNav.Item
            key={category.id}
            icon={iconFor[category.id]}
            aria-current={category.id === active ? 'page' : undefined}
            counter={getArticlesByCategory(category.id).length}
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
        {list.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
