---
title: 'XMark Kitchen Sink'
description: 'Explore markdown extensions supported by xmark'
keywords: ''
robots: 'index,follow'
category: 'tutorials'
layout: 'documentation'
tags:
  - 'xmark'
  - 'tutorials'
---

## Contact Form

```markdown
!ContactForm[]()
```

!ContactForm[]()

## Alert Messages

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

## GraphQl Playground

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

::: graphql {endpoint="http://localhost:8210/api"}
{
  getConfig {
    code
    config
  }
}
:::
