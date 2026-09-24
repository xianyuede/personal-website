import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { getCategories, getContentRoot } from './categories'
import { extractTableOfContents } from './markdown'
import type {
  Article,
  ArticleSummary,
  Category,
  CategoryWithArticles,
} from '@/types/content'

type ArticleFrontmatter = {
  title?: unknown
  excerpt?: unknown
  date?: unknown
  tags?: unknown
  cover?: unknown
  draft?: unknown
}

function assertFrontmatter(
  data: ArticleFrontmatter,
  filePath: string
): asserts data is {
  title: string
  excerpt: string
  date: string
  tags: string[]
  cover?: string
  draft?: boolean
} {
  if (typeof data.title !== 'string' || data.title.trim() === '') {
    throw new Error(`${filePath} 的 title 必须是非空字符串`)
  }
  if (typeof data.excerpt !== 'string' || data.excerpt.trim() === '') {
    throw new Error(`${filePath} 的 excerpt 必须是非空字符串`)
  }
  if (typeof data.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    throw new Error(`${filePath} 的 date 必须使用 YYYY-MM-DD 格式`)
  }
  if (!Array.isArray(data.tags) || !data.tags.every((tag) => typeof tag === 'string')) {
    throw new Error(`${filePath} 的 tags 必须是字符串数组`)
  }
  if (data.cover !== undefined && typeof data.cover !== 'string') {
    throw new Error(`${filePath} 的 cover 必须是字符串`)
  }
  if (data.draft !== undefined && typeof data.draft !== 'boolean') {
    throw new Error(`${filePath} 的 draft 必须是布尔值`)
  }
}

function readArticle(filePath: string, category: Category): Article | undefined {
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  const frontmatter = data as ArticleFrontmatter
  assertFrontmatter(frontmatter, filePath)

  if (frontmatter.draft && process.env.NODE_ENV === 'production') return undefined

  const slug = path.basename(filePath, path.extname(filePath))
  const minutes = Math.max(1, Math.ceil(readingTime(content).minutes))

  return {
    slug,
    categoryId: category.id,
    categoryLabel: category.label,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    cover: frontmatter.cover,
    date: frontmatter.date,
    readingTime: `${minutes} 分钟`,
    tags: frontmatter.tags,
    content,
    toc: extractTableOfContents(content),
  }
}

function toSummary(article: Article): ArticleSummary {
  return {
    slug: article.slug,
    categoryId: article.categoryId,
    categoryLabel: article.categoryLabel,
    title: article.title,
    excerpt: article.excerpt,
    cover: article.cover,
    date: article.date,
    readingTime: article.readingTime,
    tags: article.tags,
  }
}

export function getAllArticles(): Article[] {
  const contentRoot = getContentRoot()
  const articles = getCategories().flatMap((category) => {
    const categoryDirectory = path.join(contentRoot, category.id)

    return fs
      .readdirSync(categoryDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile() && path.extname(entry.name) === '.md')
      .map((entry) => readArticle(path.join(categoryDirectory, entry.name), category))
      .filter((article): article is Article => article !== undefined)
  })

  const seenSlugs = new Set<string>()
  for (const article of articles) {
    if (seenSlugs.has(article.slug)) {
      throw new Error(`文章 slug 重复：${article.slug}。所有分类中的文件名必须唯一。`)
    }
    seenSlugs.add(article.slug)
  }

  return articles.sort((a, b) => b.date.localeCompare(a.date))
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug)
}

export function getCategoriesWithArticles(): CategoryWithArticles[] {
  const articles = getAllArticles()

  return getCategories().map((category) => ({
    ...category,
    articles: articles
      .filter((article) => article.categoryId === category.id)
      .map(toSummary),
  }))
}
