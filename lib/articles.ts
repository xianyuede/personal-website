export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'code'; lang?: string; code: string }
  | { type: 'list'; items: string[] }

export type Section = {
  id: string
  heading: string
  blocks: Block[]
}

export type Article = {
  slug: string
  category: CategoryId
  title: string
  excerpt: string
  cover?: string
  date: string
  readingTime: string
  tags: string[]
  sections: Section[]
}

export type CategoryId = 'ai' | 'life' | 'invest'

export type Category = {
  id: CategoryId
  label: string
  description: string
}

export const categories: Category[] = [
  {
    id: 'ai',
    label: 'AI 底层及应用',
    description: '从 Transformer 的数学直觉到生产级 Agent 系统的工程实践。',
  },
  {
    id: 'life',
    label: '生命力与热爱',
    description: '关于精力管理、长期主义，以及如何把热爱变成可持续的日常。',
  },
  {
    id: 'invest',
    label: '投资知识',
    description: '一手的资产配置框架、估值方法，以及穿越周期的认知。',
  },
]

export const articles: Article[] = [
  {
    slug: 'transformer-from-scratch',
    category: 'ai',
    title: '从零理解 Transformer：注意力机制的第一性原理',
    excerpt:
      '抛开框架封装，用最小可运行的心智模型推导 Self-Attention，理解为什么它能取代 RNN 成为序列建模的默认解。',
    date: '2026-08-12',
    readingTime: '14 分钟',
    tags: ['深度学习', 'Transformer', '注意力机制'],
    sections: [
      {
        id: 'why-attention',
        heading: '为什么需要注意力',
        blocks: [
          {
            type: 'paragraph',
            text: '循环神经网络用一个固定维度的隐状态压缩整段历史，这在长序列上必然丢失信息。注意力机制的核心洞见是：与其压缩，不如在每一步都动态地回看全部输入，让模型自己决定关注哪里。',
          },
          {
            type: 'quote',
            text: '注意力不是一个技巧，而是把「检索」这个操作变得可微分。',
            cite: '本文的核心论点',
          },
        ],
      },
      {
        id: 'qkv',
        heading: 'Query、Key、Value 的直觉',
        blocks: [
          {
            type: 'paragraph',
            text: '把每个 token 投影成三个向量：Query 是「我在找什么」，Key 是「我能提供什么」，Value 是「我实际携带的信息」。相似度由 Query 与 Key 的点积衡量，经过 softmax 归一化后，对 Value 做加权求和。',
          },
          {
            type: 'code',
            lang: 'python',
            code: `import torch\nimport torch.nn.functional as F\n\ndef attention(q, k, v):\n    d_k = q.size(-1)\n    scores = q @ k.transpose(-2, -1) / d_k ** 0.5\n    weights = F.softmax(scores, dim=-1)\n    return weights @ v`,
          },
        ],
      },
      {
        id: 'multi-head',
        heading: '多头：并行的多个视角',
        blocks: [
          {
            type: 'paragraph',
            text: '单个注意力头只能捕捉一种关系模式。多头注意力把表示切分成若干子空间，让每个头学习不同的关注方式——有的关注语法邻接，有的关注长距离指代——再拼接回来。',
          },
          {
            type: 'list',
            items: [
              '头数越多，单头维度越小，计算成本基本不变。',
              '实践中 8–16 个头是常见甜点区间。',
              '可视化注意力图能帮助定位模型的失败模式。',
            ],
          },
        ],
      },
      {
        id: 'takeaways',
        heading: '工程要点与延伸',
        blocks: [
          {
            type: 'paragraph',
            text: 'KV Cache、FlashAttention、旋转位置编码是把注意力推向生产的三块关键拼图。理解了第一性原理后，这些优化都会显得顺理成章。',
          },
        ],
      },
    ],
  },
  {
    slug: 'production-agents',
    category: 'ai',
    title: '构建可靠的生产级 Agent：从 Demo 到系统',
    excerpt:
      '一个能跑通的 Agent Demo 和一个能在生产环境稳定运行的 Agent 之间，隔着可观测性、护栏与状态管理的鸿沟。',
    date: '2026-09-02',
    readingTime: '11 分钟',
    tags: ['Agent', '工程实践', 'LLM'],
    sections: [
      {
        id: 'demo-gap',
        heading: 'Demo 与生产的鸿沟',
        blocks: [
          {
            type: 'paragraph',
            text: 'Demo 只需在理想输入下跑通一次；生产系统必须应对超时、幻觉、无限循环与恶意输入。前者是演示，后者是工程。',
          },
        ],
      },
      {
        id: 'guardrails',
        heading: '护栏设计',
        blocks: [
          {
            type: 'list',
            items: [
              '限制单次任务的最大步数与总 token 预算。',
              '对工具调用参数做严格的模式校验。',
              '为每个副作用操作设置人类可介入的确认点。',
            ],
          },
        ],
      },
      {
        id: 'observability',
        heading: '可观测性',
        blocks: [
          {
            type: 'paragraph',
            text: '记录每一次工具调用的输入输出、耗时与决策依据。没有 trace，你就是在黑箱里调试一个不确定系统。',
          },
        ],
      },
    ],
  },
  {
    slug: 'energy-management',
    category: 'life',
    title: '精力，而非时间，才是稀缺资源',
    excerpt:
      '把自己当作一块需要充放电的电池，而不是一台可以无限加班的机器。可持续的高产出来自节律，而非意志力。',
    date: '2026-07-20',
    readingTime: '8 分钟',
    tags: ['精力管理', '长期主义'],
    sections: [
      {
        id: 'battery',
        heading: '身体是一块电池',
        blocks: [
          {
            type: 'paragraph',
            text: '意志力会耗尽，睡眠可以补满。承认自己是生物而非机器，是所有可持续产出的起点。',
          },
          {
            type: 'quote',
            text: '管理精力，而不是管理时间。',
            cite: '《精力管理》',
          },
        ],
      },
      {
        id: 'rhythm',
        heading: '建立节律',
        blocks: [
          {
            type: 'list',
            items: [
              '把最难的创造性工作放在精力峰值时段。',
              '用固定的仪式感切换工作与休息状态。',
              '主动安排恢复，而不是等到崩溃才休息。',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'craft-and-love',
    category: 'life',
    title: '把热爱做成手艺：长期投入的复利',
    excerpt:
      '热爱容易，坚持难。真正的护城河，是把一件喜欢的事重复打磨十年后的那种从容。',
    date: '2026-06-15',
    readingTime: '7 分钟',
    tags: ['成长', '刻意练习'],
    sections: [
      {
        id: 'love-vs-craft',
        heading: '热爱与手艺',
        blocks: [
          {
            type: 'paragraph',
            text: '热爱是起点的燃料，手艺是长期的引擎。当新鲜感褪去，是训练出的肌肉记忆和标准让你继续前进。',
          },
        ],
      },
      {
        id: 'compounding',
        heading: '复利来自不间断',
        blocks: [
          {
            type: 'paragraph',
            text: '每天进步 1% 不是鸡汤，而是数学。真正难的不是进步，是不中断——复利最怕清零重来。',
          },
        ],
      },
    ],
  },
  {
    slug: 'asset-allocation',
    category: 'invest',
    title: '资产配置：普通人穿越周期的第一性框架',
    excerpt:
      '择时几乎不可能，但配置可以。用一套简单、可执行、不依赖预测的框架，把注意力从波动收回到生活。',
    date: '2026-05-28',
    readingTime: '12 分钟',
    tags: ['资产配置', '投资框架'],
    sections: [
      {
        id: 'why-allocation',
        heading: '为什么是配置而非择时',
        blocks: [
          {
            type: 'paragraph',
            text: '研究反复表明，长期收益的绝大部分由资产配置决定，而非选股或择时。承认自己无法预测市场，是成熟投资者的第一课。',
          },
          {
            type: 'quote',
            text: '不要试图寻找草堆里的针，直接买下整个草堆。',
            cite: '约翰·博格',
          },
        ],
      },
      {
        id: 'building-blocks',
        heading: '组合的基本构件',
        blocks: [
          {
            type: 'list',
            items: [
              '权益类：承担风险、获取长期增长。',
              '固收类：提供稳定性与再平衡的弹药。',
              '现金与另类：应对流动性与极端行情。',
            ],
          },
        ],
      },
      {
        id: 'rebalance',
        heading: '再平衡的纪律',
        blocks: [
          {
            type: 'paragraph',
            text: '再平衡强制你「高抛低吸」，把情绪从决策中剥离。设定固定的时间或阈值触发，而不是凭感觉操作。',
          },
        ],
      },
    ],
  },
  {
    slug: 'valuation-basics',
    category: 'invest',
    title: '估值的本质：你买的是未来现金流',
    excerpt:
      '价格是你付出的，价值是你得到的。理解自由现金流折现，就理解了所有估值方法的共同源头。',
    date: '2026-04-10',
    readingTime: '10 分钟',
    tags: ['估值', 'DCF'],
    sections: [
      {
        id: 'price-vs-value',
        heading: '价格与价值',
        blocks: [
          {
            type: 'paragraph',
            text: '市场先生每天给你报价，但报价不等于价值。价值是这门生意在其整个生命周期里能产生的、折算到今天的现金。',
          },
        ],
      },
      {
        id: 'dcf',
        heading: '现金流折现的直觉',
        blocks: [
          {
            type: 'paragraph',
            text: '未来的一块钱不如今天的一块钱值钱，因为时间和风险都要打折。折现率就是这个「打折」的量化表达。',
          },
          {
            type: 'code',
            lang: 'text',
            code: 'PV = Σ  CFₜ / (1 + r)ᵗ  +  终值 / (1 + r)ⁿ',
          },
        ],
      },
    ],
  },
]

export function getArticlesByCategory(category: CategoryId): Article[] {
  return articles.filter((a) => a.category === category)
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
