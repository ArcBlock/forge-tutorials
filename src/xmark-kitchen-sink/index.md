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

## Graph

```graph
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
```

## Sequence Diagram

```graph
sequenceDiagram
  participant Alice
  participant Bob
  Alice->>John: Hello John, how are you?
  loop Healthcheck
    John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts <br/>prevail!
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!
```

## Git Graph

```graph
gitGraph:
options
{
    "nodeSpacing": 150,
    "nodeRadius": 10
}
end
commit
branch newbranch
checkout newbranch
commit
commit
checkout master
commit
commit
merge newbranch
```

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
