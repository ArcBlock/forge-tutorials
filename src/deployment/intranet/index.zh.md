---
title: '如何在局域网安装和部署 Forge 链'
description: '如何在外网访问受限的环境中安装和部署 Forge 链'
keywords: 'forge, forge-cli, deployment, blockchain'
author: 'wangshijun'
category: 'tutorials'
layout: 'documentation'
tags:
  - 'tutorials'
  - 'forge'
---

本教程适合于需要在外网访问受限的环境中安装 Forge CLI 并启动 Forge 链的用户。外网访问受限的是指安装和运行 Forge 链的机器只能访问局域网。正常情况下，要启动 Forge 链需要先安装 Forge CLI，然后用它来安装 Forge，这两步都需要访问外网。

怎么实现在局域网安装和部署 Forge 链呢？下面是搞定两个环节的基本做法。

## 在局域网安装 Forge CLI？

[Forge CLI](https://www.npmjs.com/package/@arcblock/forge-cli) 的所有版本都是发布在 npm 官方的 [package registry](https://registry.npmjs.org) 上的，大部分有局域网的企业都会给自己做这个 registry 的镜像，比如淘宝的镜像是 `https://registry.npm.taobao.org`。

在局域网中安装 Forge CLI 需要先请网络管理员建立一个可用的 npm registry 镜像，并且适当设置镜像的同步频率。这样安装 Forge CLI 的时候直接使用：`npm install -g @arcblock/forge-cli --npm-registry https://registry.domain.com`。

如何让 Forge CLI 永久性的使用自定义的 `npm registry` 配置项？Forge CLI 在 0.37.10 版本之后支持全局配置 `npmRegistry` 选项。

全局配置文件的位置一般在：`~/.forgerc.yml`，可以输入如下内容：

```yaml
autoUpgrade: false
npmRegistry: http://registry.npm.taobao.org/
```

这里我们禁用掉自动更新的检查，以提高每次执行命令的速度，而 `npmRegistry` 配置项就是自定义的 `npm registry` 地址。

::: success
如果用户在 `.npmrc` 里面设置了自定义的 `registry` 选项，那么也会被读取并遵守，只不过 `~/.forgerc.yml` 配置的优先级比 `~/.npmrc` 配置的优先级更高些。
:::

## 在网下载和安装 Forge？

Forge CLI 和 Forge 及各种 Forge 组件是分开发布的，安装完 Forge CLI 之后，需要执行 `forge install` 去安装 Forge 的各种组件，正常情况下 Forge Install 也需要从网络下载资源，幸好 Forge CLI 支持从本地磁盘加载已经提前下载好的 Forge Release 压缩包。

具体的做法如下：

### 准备 Forge Release 资源

`https://arcblockcn.oss-cn-beijing.aliyuncs.com/forge_release.zip` 里面打包了 Forge v0.37.2 的所有组件，先把下载到本地，然后通过 `scp` 之类的命令传输到服务器上，在服务器上解压到特定目录，比如 `/home/work/`，得到如下的目录结构：

```shell
❯ tree -L 2 /home/work/forge_release
/home/work/forge_release
└── 0.37.2
    ├── forge_centos_amd64.tgz
    ├── forge_darwin_amd64.tgz
    ├── forge_starter_centos_amd64.tgz
    ├── forge_starter_darwin_amd64.tgz
    ├── forge_swap_centos_amd64.tgz
    ├── forge_swap_darwin_amd64.tgz
    ├── forge_web_centos_amd64.tgz
    ├── forge_web_darwin_amd64.tgz
    ├── forge_workshop_centos_amd64.tgz
    ├── forge_workshop_darwin_amd64.tgz
    ├── simulator_centos_amd64.tgz
    └── simulator_darwin_amd64.tgz
```

### 配置 Forge CLI

修改 `~/.forgerc.yml`，添加如下的行：

```yaml
autoUpgrade: false
npmRegistry: http://registry.npm.taobao.org/
releaseDir: /home/work/forge_release
```

注意新增的 `releaseDir` 需要指向你解压到的目录。

### 安装并启动 Forge

准备工作到这里都做好了，接下来执行 `forge install`：

```shell
ℹ Detected platform is: darwin
ℹ Using local releaseDir: /home/work/forge_release
ℹ Latest forge release version: v0.37.2

██████╗ ██╗   ██╗     █████╗ ██████╗  ██████╗██████╗ ██╗      ██████╗  ██████╗██╗  ██╗
██╔══██╗╚██╗ ██╔╝    ██╔══██╗██╔══██╗██╔════╝██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝
██████╔╝ ╚████╔╝     ███████║██████╔╝██║     ██████╔╝██║     ██║   ██║██║     █████╔╝
██╔══██╗  ╚██╔╝      ██╔══██║██╔══██╗██║     ██╔══██╗██║     ██║   ██║██║     ██╔═██╗
██████╔╝   ██║       ██║  ██║██║  ██║╚██████╗██████╔╝███████╗╚██████╔╝╚██████╗██║  ██╗
╚═════╝    ╚═╝       ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝

✔ Release asset find /home/work/forge_release/0.35.0/forge_darwin_amd64.tgz
✔ Copied release asset /home/work/forge_release/0.35.0/forge_darwin_amd64.tgz
✔ Expand release asset /home/work/.forge_cli/tmp/forge_darwin_amd64.tgz to /home/work/.forge_cli/release/forge/0.35.0
✔ Extract forge config from /home/work/.forge_cli/release/forge/0.35.0/lib/forge-0.35.0/priv/forge_release.toml
✔ Forge config written to /home/work/.forge_chains/forge_default/forge_release.toml
✔ Release asset find /home/work/forge_release/0.35.0/simulator_darwin_amd64.tgz
✔ Copied release asset /home/work/forge_release/0.35.0/simulator_darwin_amd64.tgz
✔ Expand release asset /home/work/.forge_cli/tmp/simulator_darwin_amd64.tgz to /home/work/.forge_cli/release/simulator/0.35.0
✔ Release asset find /home/work/forge_release/0.35.0/forge_web_darwin_amd64.tgz
✔ Copied release asset /home/work/forge_release/0.35.0/forge_web_darwin_amd64.tgz
✔ Expand release asset /home/work/.forge_cli/tmp/forge_web_darwin_amd64.tgz to /home/work/.forge_cli/release/forge_web/0.35.0
✔ Release asset find /home/work/forge_release/0.35.0/forge_workshop_darwin_amd64.tgz
✔ Copied release asset /home/work/forge_release/0.35.0/forge_workshop_darwin_amd64.tgz
✔ Expand release asset /home/work/.forge_cli/tmp/forge_workshop_darwin_amd64.tgz to /home/work/.forge_cli/release/forge_workshop/0.35.0
✔ Congratulations! forge v0.37.2 installed successfully!

ℹ If you want to custom the config, run: forge config set
```

如果你想现在就启动 Forge 链，可以直接 `forge start`，启动完成之后执行 `forge web open`，就能打开 Forge 链节点的控制面板和区块浏览器。

## 软件版本的更新？

安装配置好之后怎么更新呢？对于 Forge CLI 则需要 npm registry 镜像能够同步官方镜像的版本，而 Forge 的版本需要手动去下载然后上传到局域网的机器上去。
