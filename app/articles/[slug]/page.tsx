import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getArticle, categories } from '@/lib/articles'
import { ArticleBody } from '@/components/site/article-body'
import { ArticleToc } from '@/components/site/article-toc'
import { ArticleHeader } from '@/components/site/article-header'
import { SiteFooter } from '@/components/site/site-footer'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: '文章未找到' }
  return { title: article.title, description: article.excerpt }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const category = categories.find((c) => c.id === article.category)!

  return (
    <main>
      <ArticleHeader article={article} categoryLabel={category.label} />

      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: '48px 24px 96px',
        }}
      >
        <div className="article-grid">
          <article style={{ minWidth: 0 }}>
            <ArticleBody sections={article.sections} />
          </article>

          <aside className="article-toc-col">
            <ArticleToc sections={article.sections} />
          </aside>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}

