---
id: smart-contracts
title: Smart contracts
---
In this chapter, you'll learn the Tezos smart contracts basics. Their components and the workflow to record and use them on the Tezos *blockchain*.

## General definition of a Tezos smart contract
A smart contract is a code stored inside the *blockchain* which executes a set of pre-defined instructions (promises). Once deployed (stored), it becomes **immutable**. A smart contract is deployed using a **transaction**, so we embed spending conditions inside it, which are **immutable**. Though, for smart contracts, the key difference is a user *can trigger the execution of the code without modifying it, and without moving it to another transaction or block*. It stays where it has been stored **forever**. Tezos doesn't use an [UTXO model](https://en.wikipedia.org/wiki/Unspent_transaction_output) (no "*vaults*") but a **stateful accounts** one.

Like in Ethereum, Tezos uses 2 types of accounts:
1. Classic accounts with a primary address, simply storing tez (ꜩ) coins
2. Smart contract accounts with an address, storing code and  tez (ꜩ) coins

In Tezos vocabulary though, "*contracts*" refers to both types in general. So, actually, each *contract* has a "**_manager_**". Precisely, a classic account has an "**_owner_**". If a contract is flagged as "*spendable*", the manager is the entity allowed to spend funds from it.

Smart contracts can achieve different kinds of operations with coins and *other smart contracts*. They're comparable to *automatic* **sealed** food and drink dispensers from the same company:  
Each machine has a contract saying "*Give me cryptocurrency and I give you food or drink*". Each machine can have a different smart contract for different foods or drinks, and there could be another smart contract gathering the cryptocurrency total for the company. Each machine doesn't operate until enough currency is delivered (*Gas*). Note that the **quantities** of foods or drinks change while their **types** can't (ever).

Of course, smart contracts like the Tezos ones go beyond this metaphor. Thanks to *transparency* and *immutability*, they allow an **agreement** to be secured between two or more parties. In this context, the concept of "[Code is Law](https://en.wikipedia.org/wiki/Lawrence_Lessig#%22Code_is_law%22)" from [_Lawrence Lessig_](https://en.wikipedia.org/wiki/Lawrence_Lessig) is very appropriate.

For example, it is common to create financial instruments like various *tokens* (usually worth a fraction of the blockchain's *coin*) with different usability and characteristics inside a multiple smart contracts system. Other more or less complex projects can propose *lending*, *stablecoins*, or *crowdfundings*.

In most cases, smart contracts remove *intermediate* and drastically reduce costs compared to classic paper contracts and their validations.

Notice that like any other, a Tezos smart contract can only run on and interact with the blockchain it's stored. It can't interact with the outside world. That's where *decentralized applications* or "_Dapps_" come in.

To build your own Dapp, please refer to the [*Build a Dapp*](/dapp) module.

## Lifecycle of a Tezos smart contract
As we saw, a smart contract can only be deployed once but can be called many times. The Tezos smart contract lifecycle steps are basically two:
1. Deployment
2. Interactions through calls

### Deployment of a Tezos smart contract
The deployment of a Tezos smart contract is named "**origination**".

When a smart contract is deployed, an **address** and a corresponding *persistent space* called **storage** are allocated to this smart contract. The smart contract's address is like its *identity* and *where* it lives on the ledger, while its storage is its *usable space* inside the ledger.

Once deployed, the smart contract can be called by anyone or *anything* (e.g. other contracts) with a transaction sent to its address. This triggers the execution of the set of pre-defined instructions (promises).

The origination of a Tezos smart contract must define its:
* **Entrypoints**, which are *entries* where it *receives calls*
* **Storage**
* **Set of instructions** in the low-level *Michelson* language

![](../../static/img/tezos-basics/tezos_smart_contract_content.svg)
<small className="figure">FIGURE 1: Content of a Tezos smart contract</small>

### Code of a Tezos smart contract
The code of a smart contract is a sequence of Michelson instructions that are executed when the smart contract is called.

The execution of this sequence of instructions results in a modification of the *storage* content, or storage "**state**". The sequence defines how this state can be modified.

The full description of the Michelson language can be found in the [Michelson module](/michelson).

### Storage of a Tezos smart contract
During the origination, the **initial state** of the storage must be specified.
If needed for operations, the allocation of extra storage space is paid with calling transactions fees.

For more details, check out the ["*Fees and Rewards*"](/tezos-basics/economics_and_reward) chapter.

### Call of a Tezos smart contract
A smart contract can be called by a classic account whose address starts with "**tz1**", or by a smart contract's account which address starts with "**KT1**". The transaction specifies *arguments* to use, and to which *entrypoint* they are sent.

![](../../static/img/tezos-basics/invoke_smart_contract.svg)
<small className="figure">FIGURE 2: Call of a smart contract triggering its code and modifying its storage's state</small>

One can use the Command Line Interface (CLI) provided by Tezos to interact with a node an make calls. The "`tezos-client`" application allows anyone to deploy and call Tezos smart contracts.

The Remote Procedure Call (RPC) also provides ways to send requests to a Tezos node via HTTP (more details in ["*RPC and CLI*"](/tezos-basics/introduction_to_cli_and_rpc) chapter.

The CLI command "`tezos-client originate`" is used to deploy a Tezos smart contract. Arguments are the following:
- Name of the smart contract
- Michelson script containing: 
    - Entrypoints
    - Storage type
    - Set of instructions
- Initial storage value
- Amount of tez sent to the smart contract
- (optional) Address of a delegate

The command returns the newly deployed contract's address (more detail in the ["*RPC and CLI*"](/tezos-basics/introduction_to_cli_and_rpc) chapter).

### Evolution of a deployed smart contract
You need to remember the code of a smart contract is **immutable**. Only evolve the storage's size and state. Hence, to handle smart contracts versioning, you should keep in mind implementations structures allowing transfers of informations from old contracts to new contracts.

------ TODO

* For data model extension, the "**map**" data structure can be used
* To change the logic of a smart contract, the "**lambda**" pattern can be used
 
(i.e. the logic of the smart contract can be coded in a 'lambda' function inside the storage).

This way the business logic can be upgraded with a regular call of the smart contract to modify the 'lambda' function in storage

(this call must specify the new logic).

------ ODOT

## High-level languages for Tezos smart contract implementation
Michelson is a low-level stack-based language. Therefore its adoption is quite limited because most developers won't take time to learn it. To avoid this friction, many Michelson *transpilers* have been developed and led to many high-level languages closer to developers habits: [*SmartPy*](/smartpy) (inspired by *Python*); [*LIGO*](/ligo) (inspired by *Camel* and *Pascal*); or [*Morley*](https://serokell.io/project-morley) (framework).

![](../../static/img/tezos-basics/tezos_smart_contract_deploy_invoke.svg)
<small className="figure">FIGURE 3: Deployment and call of a Tezos smart contract with high-level languages.</small>

## What have we learned so far?
In this chapter,

In next chapter, 