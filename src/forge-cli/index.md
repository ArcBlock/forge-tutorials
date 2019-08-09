## Forge

The feature of create multi chain will be added in `v0.35.0`.

``` shell
forge [web | workshop | simulator...]
  [create-chain | start | stop | ps | reset ...]
  [--chain-name | -c <chain name>]

```

## Create new chain

``` shell
forge create-chain <chain-name>
```

## Start Forge

`forge start [--chain-name | -c] [<chain name>]`

`forge-cli` will always create a chain named `default`, if there was no specific chain name when run `forge start`, `forge-cli` will start the `default` chain.

### Examples:

1. start default chain: `forge start`;
1. start arcblock chain: `forge start arcblock`,

## Stop Forge

`forge stop [--all | -a] [--chain-name | -c] [<chain name>]`

### --all | -a:
Stop all chains.

### [--chain-name | -c] [<chain name>]:
If there was no `chain name`, `forge-cli` will stop the first chain at the order of `forge ps`, or it will stop the specific chain.

### Examples:

1. stop arcblock chain: `forge stop arcblock`;
1. stop all chains: `forge stop --all`.

## Forge web/workshop/simulator

`forge web start | stop [--chain-name | -c <chain name>]`

Same as `workshop/simulator/reset`.

### Examples:

1. start web of `arcblock` chain: `forge web start -c arcblock`
1. stop web of `arcblock` chain: `forge web stop -c arcblock`

## Show running chains

Run `forge ps` to show all running chains.

The command will show all running chains grouped by chain name.

`forge ps` has **no** `--chain-name | -c` arg.
