---
id: cli-baker
title: CLI to become a baker
authors: Maxime Sallerin
---

In this chapter, we will see the CLI command lines for registering as a delegate. Then we will see how to exercise your rights as a baker, endorser, and accuser.

To learn more about how baking works, take a look at the [Baking](/baking) module.

This module requires the deployment of its own Tezos node, explained in the module [Deploy a node](/deploy-a-node).

## Running a Delegate

A delegate is responsible for baking blocks, endorsing blocks, and accusing other delegates if they try to double bake or double endorse.

### What you need

- A reliable internet connection
- At least 8,000 XTZ (1 roll) in your wallet
- A Tezos node configured and running (if not, please go [here](/deploy-a-node))

### Registration

#### Create an implicit account

//TODO

#### Supply the implicit account

//TODO

#### Register as a delagate

To run a delegate, you first need to register as one using your implicit account:

```shell
tezos-client register key bob as delegate
```

Once registered, you need to wait for **7** cycles ($\approx$ 20 days) for your rights to be considered.

### Baker

The baker is a *daemon* that, once connected to an account, computes the baking rights for that account, collects transactions from the mempool, and bakes a block. Note that the baker is the only program that needs *direct access* to the node data directory for performance reasons.

Let’s launch the daemon pointing to the standard node directory and baking for the user *bob*.

There are different command lines depending on the *network* on which your node is configured:

- Florencenet: `tezos-baker-009-PsFLoren`
- Granadanet: `tezos-baker-010-PtGRANAD`
- Mainnet: `tezos-baker-alpha`

So, for *bob* on the *Mainnet*, the command is as follow:
```shell
tezos-baker-alpha run with local node ~/.tezos-node bob
```

> Warning! Remember that having **two bakers or endorsers** running connected to **the same account** could lead to **double baking/endorsing** and **the loss of all your bonds**. If you are worried about the availability of your node when it is its turn to bake/endorse, there are other ways than duplicating your credentials (see the discussion in section [Inactive delegates](https://tezos.gitlab.io/introduction/howtorun.html#inactive-delegates)).  
> **Never use the same account on two daemons**.

### Endorser

The endorser is a daemon that, once connected to an account, computes the endorsing rights for that account. Upon reception of a new block, the daemon verifies its validity and then emits an *endorsement operation*. It can endorse for a specific account or, if omitted, for all accounts.

There are different command lines depending on the *network* on which your node is configured:

- Florencenet: `tezos-endorser-009-PsFLoren`
- Granadanet: `tezos-endorser-010-PtGRANAD`
- Mainnet: `tezos-endorser-alpha`

So, for *all accounts* on the *Mainnet*, the command is as follow:
```shell
tezos-endorser-alpha run
```

### Accuser

The accuser is a daemon that monitors **all blocks received on all chains** and looks for:
- bakers who signed **two blocks at the same level**
- endorsers who injected **more than one endorsement operation for the same baking slot**

Upon finding such irregularity, it will respectively emit a *double-baking* or *double-endorsing* denunciation operation, which will cause the offender **to lose its security deposit**.

There are different command lines depending on the *network* on which your node is configured:

- Florencenet: `tezos-accuser-009-PsFLoren`
- Granadanet: `tezos-accuser-010-PtGRANAD`
- Mainnet: `tezos-accuser-alpha`

So, on the *Mainnet*, the command is as follow:
```shell
tezos-accuser-alpha run
```

## Example for **baking** on the *Florencenet* testnet

At this point you have already [installed Tezos](/deploy-a-node/installation) and you know how to [set-up-a-node](deploy-a-node/set-up-a-node).

Open a new terminal and paste the following commands:

```shell
cd tezos
export PATH=~/tezos:$PATH
```

Or, if you prefer, put `./` before each following command line.

### Download a snapshot for your target network

Go to [snapshots-tezos.giganode.io](https://snapshots-tezos.giganode.io/) and download the last *rolling* snapshot for a **testnet**.


### Configure the node for running on *Florencenet*

```shell
tezos-node config init --data-dir ~/tezos-florencenet --network florencenet
```

This command will generate a `tezos-florencenet` folder with a "_config.json_" file.

### Generate node identity

```shell
tezos-node identity generate --data-dir ~/tezos-florencenet
```

This command will add an "_identity.json_" file, which is like a *network identity*.

### Import the snapshot into the node data directory

```shell
tezos-node snapshot --data-dir ~/tezos-florencenet import <snapshot-file>
```

### Run the node

```shell
tezos-node run --data-dir ~/tezos-florencenet --rpc-addr 127.0.0.1
```

### Bootstrapped

Tezos client can be used to interact with the node. It can query its status or ask the node to perform some actions. For example, after starting your node, you can check if it has finished synchronizing using:

```shell
tezos-client bootstrapped
```

### Get Free Tez
To test the networks and help users get familiar with the system, you can obtain free *testnets* XTZ from a [faucet](https://faucet.tzalpha.net/).

This will provide a faucet account in the form of a JSON file "_tz1xxxxxxxxx.json_", activated with the following command:

```shell
tezos-client activate account john with "tz1xxxxxxxxx.json"
```

The output should be something like:

```shell
Warning:
  
                 This is NOT the Tezos Mainnet.
  
           Do NOT use your fundraiser keys on this network.

Node is bootstrapped.
Operation successfully injected in the node.
Operation hash is 'ooq6rk6Q6qSx7wq6kWdmNLdr68QCxe62hCoAdmdfSSQHqfuHuwD'
Waiting for the operation to be included...
Operation found in block: BLjyt74qgSQLityQ5gjgPKX7iwz2W1CJNHUR9riQkng5YXrMo82 (pass: 2, offset: 0)
This sequence of operations was run:
  Genesis account activation:
    Account: tz1bNibySZy7kjNE3e17FUBFp9fMwfTKyfGQ
    Balance updates:
      tz1bNibySZy7kjNE3e17FUBFp9fMwfTKyfGQ ... +ꜩ15943.746838

The operation has only been included 0 blocks ago.
We recommend to wait more.
Use command
  tezos-client wait for ooq6rk6Q6qSx7wq6kWdmNLdr68QCxe62hCoAdmdfSSQHqfuHuwD to be included --confirmations 30 --branch BLj7wyDrpunegjsAJRHHPAgD7HkcK4itLxvAyQo5Td5sa6exj2j
and/or an external block explorer.
Account john (tz1bNibySZy7kjNE3e17FUBFp9fMwfTKyfGQ) activated with ꜩ15943.746838.
```

Notice that you have a warning saying that you are **not** on the Mainnet, which is intended in our case.

Also you can see that account "john" has 15943.746838 ꜩ.
You can check this account balance with the following command:

```shell
tezos-client get balance for john
```

### Register as a delegate

Since "john" has more than 8000 ꜩ, we will be able to register as a delegate:

```shell
 tezos-client register key john as delegate
```

Fortunately, we are on a testnet. And on testnets, the number of blocks per cycle is only 2048 instead of 4096. Furthermore, a block is created every 30 seconds instead of every minute. This gives cycles of about 17 hours. So, 7 cycles will *only* last 5 days.

### Run the baker

So, 5 days later, we must appear in the list of bakers of [Florencenet](https://florence.tzstats.com/bakers).

To launch the baker for the account "john", simply type the following command:

```shell
tezos-baker-009-PsFLoren run with local node ~/tezos-florencenet john
```

As long as the message `No slot found at level xxxxxx (max_priority = 64)` is displayed, our baker has not yet obtained the right to create a block.

## References

[1] https://tezos.gitlab.io/introduction/howtorun.html#delegateregistration