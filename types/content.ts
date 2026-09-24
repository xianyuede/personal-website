export type TocItem = {
  id: string
  title: string
  level: 2 | 3
}

export type Category = {
  id: string
  label: string
  description: string
  order: number
  icon?: string
}

export type ArticleSummary = {
  slug: string
  categoryId: string
  categoryLabel: string
  title: string
  excerpt: string
  cover?: string
  date: string
  readingTime: string
  tags: string[]
}

export type Article = ArticleSummary & {
  content: string
  toc: TocItem[]
}

export type CategoryWithArticles = Category & {
  articles: ArticleSummary[]
}
