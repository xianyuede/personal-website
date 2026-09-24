import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import type { Category } from '@/types/content'

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'articles')
const CATEGORY_FILE = '_category.json'

type CategoryFile = {
  label?: unknown
  description?: unknown
  order?: unknown
  icon?: unknown
}

function readCategory(directoryName: string): Category {
  const filePath = path.join(CONTENT_ROOT, directoryName, CATEGORY_FILE)

  if (!fs.existsSync(filePath)) {
    throw new Error(`分类 ${directoryName} 缺少 ${CATEGORY_FILE}`)
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8')) as CategoryFile

  if (typeof data.label !== 'string' || data.label.trim() === '') {
    throw new Error(`${filePath} 的 label 必须是非空字符串`)
  }
  if (typeof data.description !== 'string') {
    throw new Error(`${filePath} 的 description 必须是字符串`)
  }
  if (typeof data.order !== 'number' || !Number.isFinite(data.order)) {
    throw new Error(`${filePath} 的 order 必须是数字`)
  }
  if (data.icon !== undefined && typeof data.icon !== 'string') {
    throw new Error(`${filePath} 的 icon 必须是字符串`)
  }

  return {
    id: directoryName,
    label: data.label,
    description: data.description,
    order: data.order,
    icon: data.icon,
  }
}

export function getCategories(): Category[] {
  if (!fs.existsSync(CONTENT_ROOT)) return []

  return fs
    .readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => readCategory(entry.name))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label, 'zh-CN'))
}

export function getCategory(categoryId: string): Category | undefined {
  return getCategories().find((category) => category.id === categoryId)
}

export function getContentRoot(): string {
  return CONTENT_ROOT
}
