---
id: governance-on-chain
title: Governance on-chain
authors: Thomas Zoughebi, Aymeric Bethencourt, and Maxime Fernandez
---

Tezos is a self-amending blockchain network that incorporates an on-chain mechanism for proposing, selecting, testing, and activating protocol upgrades *without hard forks* [[1]](/tezos-basics/governance-on-chain#references).

## What is self-amendment?
Tezos is a blockchain that can improve itself over time by using a formalized process to upgrade its protocol. In practice, it is similar to the structure of a corporation, where shareholders get to vote on the future direction.

Many other blockchains do not have this type of formal governance structure. Consequently, the direction of these projects is often decided by a small group and imposed on the whole ecosystem. If not, the process results in many _hard forks_ by participants that did not agree with the decisions. Thus, two or more chains can co-exist and split the community. Self-amendment aims to avoid this scenario, and Tezos *has had no hard fork so far*.

![](../../static/img/tezos-basics/tezos-hard-forks.svg)
<small className="figure">FIGURE 1: Bitcoin hard-forks vs. Tezos hard-forks</small>

## Definitions of main concepts 

* **Baking**: The creation of new blocks on the Tezos blockchain by its validator nodes (aka _bakers_), who receive compensation for each block produced.

* **Endorsement**: Each baked block is validated by other bakers who have not baked the block. These are known as endorsers of the block, and they receive compensation for this.

* **Delegation**: All holders of the XTZ crypto-currency can delegate their baking and voting rights to a baker called a _delegate_, while still maintaining control of their funds.

* **Roll**: An amount of XTZ which is used as the unit of measure for baking and voting rights. Weight in the baking and voting process is indexed to an integral number of rolls. At present, one roll is equal to 8,000 XTZ.

* **Cycle**: The time required for 4,096 blocks' creation on Tezos (around 2 days, 20 hours, and 16 minutes (1 minute per block, if all bakers cooperate effectively)).

* **Proposal**: A request for addition, adjustment, or removal of a protocol's feature.

## How does it work?
Five (5) periods split the self-amendment process:

1. _Proposal Period_
2. _Exploration Vote Period_
3. _Testing Period_
4. _Promotion Vote Period_
5. _Adoption Period_

Each of these five periods lasts five baking cycles (i.e. 20,480 blocks or roughly 14 days), taking almost two months from the proposal to activation. The latest and current self-amendments are available at [tezosagora.org](https://www.tezosagora.org).

Should there be any failure in a given period, the whole process reverts to the _Proposal Period_ (1.), effectively aborting and restarting the process.

## Super-majority, Voter Turnout, and Quorum
The _Exploration Vote Period_ (2.) and _Promotion Vote Period_ (4.) work the same way. During a *vote*, each delegate has to use a single ballot: `Yea` (For), `Nay` (Against), or `Pass` (Neutral). A vote is successful if there is a _Super-majority_ and if the participation has reaches the current quorum [[2]](/tezos-basics/governance-on-chain#references).

### Super-majority
In Tezos, having the _Super-majority_ means that "_Yea_" votes represent more than 80% of the total of "_Yeas_" and "_Nays_" votes (*Yeas* $\geq$ 80% $\times$ (*Yeas* + *Nays*)).

Example with 90 votes: **75** _Yeas_; 10 _Nays_; and 5 _Pass_. The total of _Yeas_ and _Nays_ is **85**.

The number of _Yeas_ required for the validation is greater than **68**: 85 $\times$ 80% $=$ 68.

The number of _Yeas_ is then high enough to validate the vote: **75** $\geq$ **68**.

### Voter Turnout
_Voter Turnout_ represents the percentage of bakers that have voted compared to the total number of bakers with active rolls.

Example with 90 votes out of 100 active rolls: 75 _Yeas_; 10 _Nays_; and 5 _Pass_.
The _Voter Turnout_ is 90%: $\frac{90}{100}=$ 90%.

### Quorum
The _Quorum_ is the minimum number of voters required to deliberate. At Tezos mainnet launch, the required Quorum was 80%. At the end of each successfully approved vote, the protocol performed a Quorum update. This update was based on the Voter Turnout.

The _Carthage_ amendment introduced two major changes to the calculation of the Quorum:

* The calculation now takes into account the **E**xponential **M**oving **A**verage (EMA) of the _Voter Turnout_. With "$t$" a period, EMA is a function of "$t$".
  
* The Quorum is now bounded between 30% and 70%. To calculate the Quorum we use the following formula:

$$
  \text{Quorum} = (70\%-30\%)\times\text{EMA}(t)+30\%
$$

$$
  \iff
$$

$$
  \text{Quorum}=0.4\times\text{EMA}(t)+0.3
$$

With the **V**oter **T**urnout denoted "VT", the following formula is then used to update the EMA for the next vote:

$$
  \text{EMA}(t+1)=0.8\times\text{EMA}(t)+0.2\times\text{VT}
$$

Note that delegates' votes are weighted proportionally to the number of rolls in their staking balance.

## Phase 1: Proposal Period
The Tezos amendment process begins with the _Proposal Period_, during which delegates can submit proposals on-chain. The delegates submit a proposal by submitting the hash of the source code.

In each _Proposal Period_, delegates can submit up to 20 proposals. **A proposal submission also counts as a weighted vote** (proportionally to the number of rolls in their staking balance at this moment). Other delegates can then vote on the submission up to 20 times.

A submission must receive **a minimum of 5% of approval** to access the next stage (2. _Exploration Vote Period_).

At the end of the _Proposal Period_, the network counts proposal votes, and the most-upvoted submission proceeds to the _Exploration Vote Period_ (2.). If there is no proposal, a tie, or less than 5% votes, then a new _Proposal Period_ (1.) begins.

## Phase 2: Exploration Vote Period

In the _Exploration Vote Period_, delegates may vote for the top-ranked proposal from the previous _Proposal Period_. Delegates get to vote either _Yea_, _Nay_ or _Pass_ on a specific submission (voting rules are explained in the previous "_Super-majority_" and "_Quorum_" sections). If the voting participation fails to achieve the _Quorum_ or the 80% _Super-Majority_, the amendment process restarts from the beginning of the _Proposal Period_ (1.).

## Phase 3: Testing Period
If a proposal is approved in the _Exploration Vote Period_ (2.), the _Testing Period_ begins with a **testnet** fork that runs in parallel with the mainnet for 48 hours. These forks have **access rights to the standard library** but in a *sandbox*.

The purpose is to verify that the migration from the old protocol to the new one works correctly. This 48-hour duration has been conservatively set to reduce the risk of the network perceiving the testnet fork as the main chain. However, 48 hours of testing is too short to determine whether a proposal is a worthwhile and safe amendment or not. A testnet matching the amendment proposal is likely to run off-chain during the remaining ~7.3 cycles of the _Testing Period_ to find security vulnerabilities. These extra cycles allow stakeholders to evaluate and discuss the amendment, gaining better knowledge of its properties.

## Phase 4: Promotion Vote Period
At the end of the _Testing Period_ (3.), the _Promotion Vote Period_ (4.) begins. The network decides whether to adopt the amendment based on previous off-chain discussions and its behavior (in 3.). The voting rules are identical to the _Exploration Voting Period_ (2.) (settlement in the "_Super-Majority_" and "_Quorum_" sections).

At the end of the _Promotion Vote Period_, the network counts the number of votes. If the participation rate reaches the minimum quorum and an 80% _Super-Majority_ of non-passing delegates vote _Yea_, then the amendment proceeds to the _Adoption period_ (5.). If not, then the process reverts to the _Proposal Period_ (1.). The minimum vote participation rate is based on past ones.

In exchange for their work on the proposal, some delegates can put a symbolic self-reward into the new protocol. If the new protocol is accepted, they will receive the reward.

## Phase 5: Adoption period
_Adoption period_ provides enough time to enable the ecosystem and update the dev tooling.

After this phase, the mainnet activation is complete.

At the time of writing (March 2021), 43 periods have passed. There were 8 submitted proposals for 6 validations.

## Amendment Process Diagram
The diagram below sums up the self-amendment process:

![](../../static/img/tezos-basics/Governance_mechanism_uml.svg)
<small className="figure">FIGURE 2: Self-amendment process</small>

## Voting examples
Let's illustrate this process:

### Example 1
Let us assume a total of 100 active rolls managed by bakers and a _Voter Turnout_ (VT)'s EMA at 75%. Let's consider 90 votes (Yay, Nay, and Pass) during the _Exploration Period_ (2.):

- Yays: 75
- Nays: 10
- Pass: 5
- EMA($t$) = 75% = 0.75

In this case, we have:

$$
  \text{VT}=\frac{(75+10+5)}{100}=90\%
$$

and:

$$
\text{Quorum}=0.4\times0.75+0.3=0.6=60\%
$$

Therefore:

$$
\text{VT}\geq\text{Quorum}
$$

$$
Positive Voter Turnout = 75 / ( 75 + 10 ) = 88\%
$$

As 88% _Positive Voter Turnout_ > 80% _Super-majority_, the amendement proposal can move to the next period.

PS: Let's not forget to update the EMA for the next proposal:

$$
EMA(t+1) = 0.8 * 75% + 0.2 * 88% = 78%
(considering EMA(t) = 75%)
$$

### Example 2
Let us assume a total of 100 active rolls managed by bakers and a _Voter Turnout_ EMA of 75%, and then 55 votes (Yay, Nay and Pass) during the _Exploration Period_.

```
Yays : 45
Nays : 10
Pass : 0
```

In this case, we have:
```
Voter Turnout = (45 + 10 + 0) / 100 = 55%

Quorum = 0.3 + 75% * (0.7 - 0.3) = 60%
(Therefore 55% Voter Turnout < 60% Quorum, proposal rejected)

Positive Voter Turnout = 45 / ( 45 + 10 ) = 81%
```

Although the 81% _Positive Voter Turnout_ > 80% _Super-majority_, the amendement proposal is rejected as the Quorum has not been reached. We must therefore go back to the initial proposals stage.

PS: Let's not forget to update the EMA for the next proposal :

```
EMA(t+1) = 0.8 * 75% + 0.2 * 55% = 71%
(considering EMA(t) = 75%)
```

## Operations
### Proposal
A proposal operation can only be submitted during a _Proposal Period_.
```
Proposals : {
  source: Signature.Public_key_hash.t ;
  period: Voting_period_repr.t ;
  proposals: Protocol_hash.t list ; 
}
```
`source` is the delegate's public key hash

`period` is the unique identifier of each voting period

`proposals` is a non-empty list of maximum 20 protocol hashes.

This operation [[3]](/tezos-basics/governance-on-chain#references) can be submitted more than once but only if the cumulative number of active proposals is less than 20. Each time a delegate duplicates a proposal, a vote is counted with the 20 vote maximum applying.

### Ballot
A ballot operation can only be submitted during the _Promotion Vote Period_ or the _Exploration Vote Period_, and only once per period.
```
Ballot : {
  source: Signature.Public_key_hash.t ;
  period: Voting_period_repr.t ;
  proposal: Protocol_hash.t ;
  ballot: Vote_repr.ballot ; 
}
```
`source` is the delegate's public key hash

`period` is the unique identifier of each voting period

`proposal` is the selected protocol hash.

`ballot` is one of the possible ballot response: `Yea`, `Nay` or `Pass`


## Send a proposal
To send a proposal or a ballot, please refer to [CLI chapter](/tezos-basics/introduction_to_cli_and_rpc)

## Learn more
To learn more about the amendement process on Tezos, please refer to the [official documentation](https://gitlab.com/tezos-paris-hub/tezos-on-chain-governance/-/blob/master/Documentations/Amendements_Tezos_en.pdf).

## References
[1] https://medium.com/tezos/amending-tezos-b77949d97e1e

[2] https://tezos.gitlab.io/007/voting.html#super-majority-and-quorum

[3] https://tezos.gitlab.io/007/voting.html#operations

[4] https://www.tezosagora.org

[5] https://www.tezosagora.org/learn

[6] https://blog.octo.com/tezos-une-blockchain-auto-evolutive-partie-1-3/

[7] https://gitlab.com/tezos-paris-hub/tezos-on-chain-governance/-/blob/master/Documentations/Amendements_Tezos_en.pdf