---
title: 'XMark 扩展一览表'
description: '列举所有 XMark 支持的 Markdown 扩展语法'
keywords: ''
robots: 'index,follow'
category: 'tutorials'
layout: 'documentation'
tags:
  - 'xmark'
  - 'tutorials'
---

## 联系人表单

```markdown
!ContactForm[]()
```

!ContactForm[]()

## 消息

```markdown
::: warning
This is a warning
:::

::: success
This is a success
:::

::: error
This is a error
:::
```

::: warning
This is a warning
:::

::: success
This is a success
:::

::: error
This is a error
:::

## GraphQl 查询工作台

```markdown
::: graphql {endpoint="http://localhost:8210/api"}
{
  getConfig {
    code
    config
  }
}
:::
```
