import { Heading, Text } from '@primer/react'
import type { Section, Block } from '@/lib/articles'

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <Text
          as="p"
          style={{
            color: 'var(--fgColor-default)',
            fontSize: 'var(--text-body-size)',
            lineHeight: 1.8,
          }}
        >
          {block.text}
        </Text>
      )
    case 'quote':
      return (
        <blockquote
          style={{
            margin: 0,
            padding: '16px 24px',
            borderLeft: '3px solid var(--borderColor-accent-emphasis)',
            background: 'var(--bgColor-muted)',
            borderRadius: 'var(--borderRadius-medium)',
          }}
        >
          <Text
            as="p"
            style={{
              fontSize: 'var(--text-subtitle-size)',
              fontStyle: 'italic',
              color: 'var(--fgColor-default)',
              lineHeight: 1.6,
            }}
          >
            {block.text}
          </Text>
          {block.cite ? (
            <Text
              as="p"
              size="small"
              style={{ color: 'var(--fgColor-muted)', marginTop: 8 }}
            >
              — {block.cite}
            </Text>
          ) : null}
        </blockquote>
      )
    case 'code':
      return (
        <pre
          style={{
            margin: 0,
            padding: 20,
            overflowX: 'auto',
            borderRadius: 'var(--borderRadius-medium)',
            border: 'var(--borderWidth-thin) solid var(--borderColor-default)',
            background: 'var(--bgColor-inset)',
            fontFamily: 'var(--fontStack-monospace)',
            fontSize: 'var(--text-codeBlock-size)',
            lineHeight: 1.6,
            color: 'var(--fgColor-default)',
          }}
        >
          <code>{block.code}</code>
        </pre>
      )
    case 'list':
      return (
        <ul
          style={{
            margin: 0,
            paddingLeft: 22,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {block.items.map((item, i) => (
            <li key={i}>
              <Text
                style={{
                  color: 'var(--fgColor-default)',
                  fontSize: 'var(--text-body-size)',
                  lineHeight: 1.7,
                }}
              >
                {item}
              </Text>
            </li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

export function ArticleBody({ sections }: { sections: Section[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          style={{ scrollMarginTop: 96, display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <Heading as="h2" variant="medium" style={{ letterSpacing: '-0.01em' }}>
            {section.heading}
          </Heading>
          {section.blocks.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </section>
      ))}
    </div>
  )
}
