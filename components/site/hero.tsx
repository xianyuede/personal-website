'use client'

import { Avatar, Heading, Text, Stack, Label, IconButton } from '@primer/react'
import {
  MarkGithubIcon,
  GlobeIcon,
  MailIcon,
  RssIcon,
} from '@primer/octicons-react'

export function Hero() {
  return (
    <section
      aria-label="个人简介"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderBottom:
          'var(--borderWidth-thin) solid var(--borderColor-default)',
      }}
    >
      {/* Background image */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Gradient scrim for legibility */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, var(--bgColor-default) 8%, color-mix(in srgb, var(--bgColor-default) 78%, transparent) 45%, color-mix(in srgb, var(--bgColor-default) 30%, transparent) 100%), linear-gradient(0deg, var(--bgColor-default) 2%, transparent 60%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1080,
          margin: '0 auto',
          padding: '96px 24px 72px',
        }}
      >
        <Stack direction="vertical" gap="normal">
          <Avatar
            src="/images/avatar-2026.png"
            size={96}
            square={false}
            alt="站长头像"
            style={{
              boxShadow: 'var(--shadow-resting-medium)',
              outline: '2px solid var(--borderColor-accent-emphasis)',
              outlineOffset: 2,
            }}
          />

          <Stack direction="horizontal" gap="condensed" align="center" wrap="wrap">
            <Label variant="accent">AI · 工程 · 投资</Label>
            <Label variant="secondary">长期主义者</Label>
          </Stack>

          <Heading
            as="h1"
            variant="large"
            style={{ maxWidth: 720, letterSpacing: '-0.02em' }}
          >
            在代码、认知与热爱之间，构建复利
          </Heading>

          <Text
            size="large"
            style={{ color: 'var(--fgColor-muted)', maxWidth: 620 }}
          >
            我是一名深耕 AI 底层与应用的工程师，也是长期主义的实践者。
            这里记录我对技术本质的拆解、对生命力的思考，以及穿越周期的投资认知。
          </Text>

          <Stack direction="horizontal" gap="condensed" align="center">
            <IconButton
              as="a"
              href="https://github.com"
              target="_blank"
              rel="noreferrer noopener"
              icon={MarkGithubIcon}
              aria-label="GitHub"
              variant="invisible"
              size="large"
            />
            <IconButton
              as="a"
              href="https://zhihu.com"
              target="_blank"
              rel="noreferrer noopener"
              icon={GlobeIcon}
              aria-label="知乎"
              variant="invisible"
              size="large"
            />
            <IconButton
              as="a"
              href="mailto:hello@example.com"
              icon={MailIcon}
              aria-label="邮箱"
              variant="invisible"
              size="large"
            />
            <IconButton
              as="a"
              href="/rss.xml"
              icon={RssIcon}
              aria-label="RSS 订阅"
              variant="invisible"
              size="large"
            />
          </Stack>
        </Stack>
      </div>
    </section>
  )
}
