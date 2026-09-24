import { Hero } from '@/components/site/hero'
import { CategoryTabs } from '@/components/site/category-tabs'
import { SiteFooter } from '@/components/site/site-footer'

export default function Page() {
  return (
    <main>
      <Hero />
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: '56px 24px 96px',
        }}
      >
        <CategoryTabs />
      </div>
      <SiteFooter />
    </main>
  )
}
