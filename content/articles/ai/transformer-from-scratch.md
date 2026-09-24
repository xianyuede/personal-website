---
title: "从零理解 Transformer：注意力机制的第一性原理"
excerpt: "抛开框架封装，用最小可运行的心智模型推导 Self-Attention，理解为什么它能取代 RNN 成为序列建模的默认解。"
date: "2026-08-12"
tags:
  - 深度学习
  - Transformer
  - 注意力机制
draft: false
---

## 为什么需要注意力

循环神经网络用一个固定维度的隐状态压缩整段历史，这在长序列上必然丢失信息。注意力机制的核心洞见是：与其压缩，不如在每一步都动态地回看全部输入，让模型自己决定关注哪里。

> 注意力不是一个技巧，而是把「检索」这个操作变得可微分。
>
> ——本文的核心论点

## Query、Key、Value 的直觉

把每个 token 投影成三个向量：Query 是「我在找什么」，Key 是「我能提供什么」，Value 是「我实际携带的信息」。相似度由 Query 与 Key 的点积衡量，经过 softmax 归一化后，对 Value 做加权求和。

```python
import torch
import torch.nn.functional as F

def attention(q, k, v):
    d_k = q.size(-1)
    scores = q @ k.transpose(-2, -1) / d_k ** 0.5
    weights = F.softmax(scores, dim=-1)
    return weights @ v
```

## 多头：并行的多个视角

单个注意力头只能捕捉一种关系模式。多头注意力把表示切分成若干子空间，让每个头学习不同的关注方式——有的关注语法邻接，有的关注长距离指代——再拼接回来。

- 头数越多，单头维度越小，计算成本基本不变。
- 实践中 8–16 个头是常见甜点区间。
- 可视化注意力图能帮助定位模型的失败模式。

## 工程要点与延伸

KV Cache、FlashAttention、旋转位置编码是把注意力推向生产的三块关键拼图。理解了第一性原理后，这些优化都会显得顺理成章。
