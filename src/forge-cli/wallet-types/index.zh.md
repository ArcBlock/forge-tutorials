---
title: 'Forge CLI 里面涉及的两种钱包'
description: 'Forge CLI 里面涉及的两种钱包'
keywords: 'forge, forge-cli, upgrade, blockchain'
author: 'wangshijun'
category: 'tutorials'
layout: 'documentation'
tags:
  - 'tutorials'
  - 'forge'
---

## 何为钱包？

区块链上下文中的钱包本质上管理的都是公私钥对，普通用户使用的钱包比如 ABT Wallet、ImToken 之类会管理多个公私钥对，更像是现实世界里面的钱包，本文探讨的钱包是计算机世界的钱包，即里面只有一对公私钥。

## 两种钱包？

在使用 forge-cli 的时候，你可能会碰到两种钱包，根据钱包保存的位置，可以分为远程钱包和本地钱包，产生这两种钱包的命令分别是：

### `forge account:create`

`forge account:create` 用来创建远程钱包，或者受托管的钱包，是通过 forge 提供的 gRPC 接口创建，钱包信息存储在处理这个 gRPC 请求的节点的磁盘上，当然是加密存储的，而创建远程钱包时需要设定的密码就是用来加密钱包的公私钥信息的，gRPC 接口在生成钱包公私钥的之后会自动去链上帮这个账户做 Declare，创建完成之后，可以直接用这个账户去发送交易了。需要注意的是，这里说的远程钱包其实不是严格意义上的远程，钱包文件都存在节点的磁盘上，并且不会在多个节点间同步。

### `forge wallet:create`

`forge wallet:create` 用来创建本地钱包，是 SDK 通过数学的方式直接随机产生私钥，然后通过密码学计算公钥，组成公私钥对，整个过程没有 forge 的参与，这种方式创建出来的公私钥对比较适合用在代码中。

在最新的 forge 里面，`createWallet` 接口也会返回钱包的公私钥对，只要能妥善保存之，也相当于创建了本地的公私钥对。

## SDK 里面的钱包

如何在 SDK 里面使用本地钱包呢？举个简单的例子（以 forge-js-sdk 为例）：

先准备好你的私钥，可以是 16 进制的格式、或者 base64 的格式。

首先初始化项目：

```shell
npm init -y
```

然后添加依赖：

```shell
npm i @arcblock/forge-sdk base64-url -S
```

然后编写脚本 `dump.js`，把钱包信息打出来：

```javascript
const base64 = require('base64-url');
const ForgeSDK = require('@arcblock/forge-sdk');

const secretKey =
  'pFV7aEv29U0-dBYfi7DTXnRTlFZI8dlA_YHWqhDRxYECdy6YxWlrvKKKoM-wN-ek2lOcgoiIpeCS00diKo5_Kw';
// 如果是 base16 的私钥，不用做 base64 的转码
const secretKeyHex = ForgeSDK.Util.bytesToHex(Buffer.from(base64.unescape(secretKey), 'base64'));
const wallet = ForgeSDK.Wallet.fromSecretKey(secretKeyHex);

console.log(wallet.toJSON());
```

到目前为止，我们只是把钱包打印出来了，怎么做更多的事情呢？去链上声明这个钱包，然后做一笔转账如何？编写 `transfer.js`：

```javascript
const base64 = require('base64-url');
const ForgeSDK = require('@arcblock/forge-sdk');

const secretKey =
  'pFV7aEv29U0-dBYfi7DTXnRTlFZI8dlA_YHWqhDRxYECdy6YxWlrvKKKoM-wN-ek2lOcgoiIpeCS00diKo5_Kw';
// 如果是 base16 的私钥，不用做 base64 的转码
const secretKeyHex = ForgeSDK.Util.bytesToHex(Buffer.from(base64.unescape(secretKey), 'base64'));
const wallet = ForgeSDK.Wallet.fromSecretKey(secretKeyHex);

// 链接到本地的节点，执行 forge ps 能看到这个 endpoint
ForgeSDK.connect('http://127.0.0.1:8210/api');

(async () => {
  // 如果私钥是你配置的链创世 token holder，不需要 declare
  const declareHash = await ForgeSDK.sendDeclareTx({
    tx: { itx: { moniker: 'test_user' } },
    wallet,
  });
  console.log('wallet declared', declareHash);

  // 发送转账，前提是账号里面有钱
  const transferHash = await ForgeSDK.sendTransferTx({
    tx: {
      itx: {
        // 收款人账户，可以写成你的 ABT Wallet 钱包账户，前提是这个账号 declare 过，不然会报错
        to: 'z1VPwguZUA26dHrPhsukD9Hbzf6txeJGs7F',
        // 100 --> 转账金额
        // 18 --> 链配置文件里面的 token 精度，默认就是 18
        value: ForgeSDK.Util.fromTokenToUnit(100, 18),
      },
    },
    wallet,
  });
  console.log('transferred', transferHash);
})();
```
