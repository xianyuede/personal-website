import { Text } from '@primer/react'

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: 'var(--borderWidth-thin) solid var(--borderColor-default)',
        padding: '32px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
          © {new Date().getFullYear()} · 用代码与认知构建复利
        </Text>
        <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
          Built with Primer
        </Text>
      </div>
    </footer>
  )
}
