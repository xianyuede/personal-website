import GithubSlugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import type { TocItem } from '@/types/content'

export function extractTableOfContents(markdown: string): TocItem[] {
  const tree = remark().use(remarkGfm).parse(markdown)
  const slugger = new GithubSlugger()
  const items: TocItem[] = []

  visit(tree, 'heading', (node) => {
    const title = toString(node).trim()
    if (!title) return

    const id = slugger.slug(title)
    if (node.depth === 2 || node.depth === 3) {
      items.push({ id, title, level: node.depth })
    }
  })

  return items
}
