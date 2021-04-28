---
id: proof-of-work
disable_pagination: true
title: Proof-of-work
author: Aymeric Bethencourt
---

import NotificationBar from '../../src/components/docs/NotificationBar';

_Proof-of-work_ was the first fully functional blockchain consensus ever created. It is still in use by Bitcoin and many other blockchains. It requires its users to _mine_ for getting a chance earning a reward for validating transactions. In this chapter, we are going to look into the technical side of things and how mining works.

We will see that the blockchain is in fact a very intelligent assembly of cryptographic technical bricks that have already existed for many years, or even several decades for some. The beauty of the blockchain is to have been able to organize these bricks in a coherent way to create a decentralized and secure data exchange system.

## Hash
Let's start with the basics: the **hash**. A hash is an hexadecimal number calculated from some data. In a way, it represents a unique fingerprint used to quickly identify the initial data. There are several hash functions. The most common is _SHA256_, used among others by Bitcoin. The _SHA256_ algorithm transforms any string of characters into a hexadecimal number of 64 characters (or 256 bits). For example, fig. 1 shows the hash of the very short string "Cake" and fig. 2 shows the hash of a longer string. Note that the two hashes are totally different, but both are 64 characters long. In the same way, you could enter all the books from a library, or nothing at all (empty string), and you would still have a hash of 64 hexadecimal characters. Note that for two identical chains you will always have the same hash, and that for two different chains you will always have two different hashes (except for a few extremely unlikely collisions). This allows you to quickly verify that the initial data has not been modified. 

![](../../static/img/blockchain-basics/small_hash.svg)
<small className="figure">FIGURE 1: The hash of a small string of characters</small>

![](../../static/img/blockchain-basics/big_hash.svg)
<small className="figure">FIGURE 2: The hash of a large string</small>

<NotificationBar>
  <p>You have probably used an hash already in your life without knowing it. Indeed when you download a file on your computer, some browsers check the hash of the downloaded file compared with the hash from announced by the source before download. If the two hashes match, it mean that the file you have downloaded is a perfect match with the one intended to be sent by the source. If the hashes don't match, your download has been corrupted. You can try this out manually by downloading the latest release of _Ubuntu_ and computing the hash of the downloaded file with the one announced on [their website](https://ubuntu.com/tutorials/how-to-verify-ubuntu#5-verify-the-sha256-checksum)
[[2]](/blockchain-basics/proof-of-work#references).
  </p>
</NotificationBar>

## Block
A block is simply a structure containing:
- its block number
- some data
- an arbitrary number called _NONCE_ (diminutive of _Number used ONCE_ )
- and the hash of all these data

Fig. 3 shows an example of a block. Notice that the hash of the block starts with _32cd_. So far, this block is considered _invalid_. There are different rules for validating a block depending on the blockchain considered. Most blockchains use proof of work which consists of proving that validation work has been done on the block.

![](../../static/img/blockchain-basics/invalid_block.svg)
<small className="figure">FIGURE 3: The hash of DATA, NONCE and block number does not start with 000: The block is invalid.</small>

For example, a widely used validation rule is that the hash must start with _000_. The block will therefore have to be "mined", that is to say, it will be necessary to find a random _NONCE_ such that the hash of the block (including the _NONCE_) starts with _000_. Note that this problem is arbitrary. Other consensus choose to have an hash starting with _123_ or that the hash in base 10 is lower than 1000 (case of Ethereum). You just need a rule that proves that a validation work has been done on the block and that allows to find one validator in the world (i.e. the first one to find a valid _NONCE_). When the rule is validated, the block is then valid.

In fig. 4, we have repeatedly incremented _NONCE_ and calculated the hash of the block until we got a hash starting with 000. This process is not fixed in time, it can be very short or very long, because each NONCE is equally probable. In this case, we have incremented the _NONCE_ up to 29258. The block is now valid.

![](../../static/img/blockchain-basics/valid_block.svg)
<small className="figure">FIGURE 4: The hash of DATA, NONCE and block number starts with 000, the block is signed</small>

<NotificationBar>
  <p>As a miner, you might want to try out random NONCE instead of incrementing it. As everyone in the world is in competition, anyone with a faster machine would always beat you to it. Using random guesses, your chances are proportional to amount of <i>hashing power</i> you have compared to the rest of the world.</p>
</NotificationBar>

Mining therefore consists of calculating the hash of a block over and over again until the validation rule is validated. This is why it is possible to create _ASICs_ (Application Specific Integrated Circuit) optimized for mining. For Bitcoin, ASICs integrate chips specifically designed to make SHA256 in order to find _NONCE_ very quickly [[5]](/blockchain-basics/proof-of-work#references). 

Finally, note that if you try to modify anything in a validated block, it loses its validity, because you would change the hash of the block and you would have to mine the block again to find a new hash starting with 000 .

## Blockchain
You basically now have all the elements to understand what is a blockchain. It is simply a list of blocks where each block contains a reference to the previous block: its hash. They are therefore "chained". In fig. 5, you can see that the block #2 contains all previously mentioned information in addition to _PREVH_, the hash of the previous block, i.e. the hash of block #1. To validate block #2, you have to mine it to find a hash starting with 000, then this hash is used in _PREVH_ in block #3, etc.

![](../../static/img/blockchain-basics/valid_chain.svg)
<small className="figure">FIGURE 5: A valid blockchain (all blocks are signed)</small>

Now if we change anything in a block, this block and all the following blocks lose their validity. Why? Because, if I change "good" by "bad" in block #2, the hash of block #2 changes, which changes _PREVH_ in block 3 and changing its own hash, which changes _PREVH_ in block 4 and changing its own hash, and so on... invalidating the whole blockchain after block #2. It is therefore very easy to know if any information on a blockchain has been changed and in which block.

![](../../static/img/blockchain-basics/invalid_chain.svg)
<small className="figure">FIGURE 6: An invalid blockchain (some blocks are not signed because of the data modification)</small>

Now you may be wondering: why not re-hash all the invalidated blocks? It is indeed possible to re-mine these blocks from the last valid block and revalidate the entire chain (see fig. 7). 

![](../../static/img/blockchain-basics/valid_chain_again.svg)
<small className="figure">FIGURE 7: A valid blockchain again (all the blocks following the modification have been signed again)</small>

So can the blockchain be altered? No, first because mining a block requires a lot of computing power. For Bitcoin, it would take several years for your desktop computer to mine a few blocks, and the more you go back in time and modify an old block, the more blocks you will have to mine. Secondly and most importantly, it is because of the distributed nature of the blockchain that it statistically impossible to rewrite its history.

## Distributed
Any blockchain needs to distributed to be secured, that is to say that all the valid blocks have to be replicated on all the nodes of the network.

Like everyone else, you can use your computer as a node and mine. To do this, you need to download all the valid blocks so far. For Bitcoin, this already represents more than 330GB [[6]](/blockchain-basics/proof-of-work#references).

When any node in the world validates a new block (first to find a valid _NONCE_), it is added to the blockchain of all the other nodes in the network so using a _gossip protocol_ [[7]](/blockchain-basics/proof-of-work#references) as to always have an up-to-date blockchain everywhere on the network. There are a huge number of nodes in the world and they all have a complete copy of the blockchain.

Let's consider a node decides to fraudulently modify a block, fig. 8 shows a network of 3 nodes (_A_, _B_ and _C_) which all have a copy of the blockchain. If _C_ decides to modify some data on the blockchain, this can be seen immediately by the other nodes (_A_ and _B_) because the hash of the last block in their chain (_000969..._) is different from the hash of the last block of _C_ (_dec59db..._).

![](../../static/img/blockchain-basics/invalid_node.svg)
<small className="figure">FIGURE 8: The blockchain is identical on all the nodes of the network except when a hacker tries to modify it. We see here that node _C_ tries to modify the data of block #2</small>

Even if node _C_ validated all of its blocks again as shows in fig. 9, the final hash (_0004de..._) is still be different from other nodes (_000969..._). There is no way to change the data of a block while preserving the same final hash as the rest of the network. The incorrect blockchain no longer corresponds to the majority of the other nodes. This block will become orphan, and will not be integrated into the general register.

![](../../static/img/blockchain-basics/invalid_node_remined.svg)
<small className="figure">FIGURE 9: Even if _C_ re-mines all its block following his modification, the hash of the latest block still does not match the rest of the network.</small>

The only known way to corrupt Proof-of-Work is through the infamous "51% attack" [[8]](/blockchain-basics/proof-of-work#references) that consists for a pirate of obtaining more than 50% of the world's mining power, allowing him rewrite history (the technical details are explained [here](https://hackernoon.com/ethereum-classic-attacked-how-does-the-51-attack-occur-a5f3fa5d852e)). 

Fortunately, getting 51% of the world's mining power for popular blockchains is very difficult e.g. it would cost several billions for Bitcoin. However, for less popular blockchains (with fewer nodes) this is quite doable and actually happens quite regularly [[9]](/blockchain-basics/proof-of-work#references). Some blockchains are trying to solve this problem by implementing different consensus algorithms, such as Tezos as we will see in the next chapters.

## Tokens
When we talk about blockchain, we do not necessarily talk about cryptocurrencies. Blockchain has been used for many non-financial applications [[10]](/blockchain-basics/proof-of-work#references). Note that until now, the data stored in the blocks of our examples were simple strings. You can store any type of data: identities, electronic documents, insurance contracts, etc. Whenever it is necessary to have immutable record, or a system of secure exchanges between parties without trust or on an unsecured network, you should ask yourself the question of whether a blockchain can be used.

If we use _DATA_ to store financial transactions then we do indeed have a crypto-currency. Figures 9 and 10 respectively show a block and a blockchain with transactions (_TX_) instead of _DATA_, e.g. _$13 from John to Chris_. By _"\$"_, we denote a monetary value that is not necessarily dollars, but which could be any token, such as Bitcoin (BTC), Ethereum (ETH), etc.

![](../../static/img/blockchain-basics/tx_block.svg)
<small className="figure">FIGURE 9: A block containing financial transactions</small>

![](../../static/img/blockchain-basics/tx_chain.svg)
<small className="figure">FIGURE 10: A blockchain containing financial transactions</small>

However, in our example, how do we know that John has enough money to send Chris $13?

The Bitcoin blockchain does not contain a ledger showing the balance of each account at all times. Instead, when John attempts to complete a transaction, the process will go back in time on the blockchain and calculate the difference between all of his inbound transactions against all of his outbound transactions in order to deduce how much money John can spend.

## Coinbase
You now understand how the blockchain is able to calculate each person's balance and whether or not to authorize their transactions. However, where does all this money come from in the first place? If we were to completely trace the blockchain all the way back to its first block, there would be a point where money has to be created. If the user balances are only calculated from transactions between users, there would be no creation of a new tokens. There would be 0 bitcoin.

In fact, new bitcoins are generated by the blockchain itself when a new block is created. New tokens are created and given to the miner of the block. In fig. 12, assume that Chris is mining the block. You can see that $100 is created from scratch and given to Chris to thank him for investing his computational power and electricity into mining a block. This is called the _reward_ or _coinbase_ . Chris is then able to spend this money in the next block as if he had received it from another user. It is this process that allows new tokens to be put into circulation, in the same way that a central bank is able to print new banknotes. The advantage of a blockchain over a central bank is that the process is completely autonomous and unalterable. Inflation on Bitcoin is completely known in advance and it is not possible to have over-inflation. Currently 17 millions of Bitcoin have been minded, i.e. offered as a coinbase. The maximum is 21 millions, at which point the source code of Bitcoin shows that no more coinbase will be offered. The source of income for miners will then only be the transaction fees, but there is still some time as this will happen around 2140 due to the ever increasing difficulty of mining [[11]](/blockchain-basics/proof-of-work#references).

![](../../static/img/blockchain-basics/coinbase.svg)
<small className="figure">FIGURE 12: A block with his coinbase / reward to Anders, which allows him to make transactions</small>

There is still on big issue in our blockchain schemas so far. Take a minute and try to identify it. Consider how are the transactions authentified.

[...]

Did you find it ?

[...]

Knowing that Chris has a positive balance of \$100, could Jane add the transaction "\$ 40 from Chris to Jane" herself in a new block without Chris ever giving his consent? At this point of the chapter, anyone would seems to be able to spend anyone else's money!

## Keys
It is essential for the proper functioning of the blockchain that only Elizabeth is able to send the transaction “$ 40.27 from Elizabeth to Jane”. For that, we are going to need a cryptographic mechanism of private key and public key .

Fig. 13 shows a pair of keys. The private key is a very long, randomly generated hexadecimal number (you can do this yourself). The public key is a hexadecimal number that is calculated from the private key. It is possible to calculate the public key from the private key, but the reverse is not true. It is practically impossible to find the private key from the public key.

As the name suggests, the private key must be kept private. You should never share it with anyone. On the other hand, the public key must be public and accessible to all. Why ?

![](../../static/img/blockchain-basics/keys.svg)
<small className="figure">FIGURE 13: A private key that we have chosen randomly and the associated public key generated by the cryptographic algorithm</small>

## Signatures
The public key will allow us to verify our signatures . Indeed, our private key will be used to generate signatures for our data. Fig. 14 shows a signature generated by our private key for the message “Hello OCTOs”. Notice that if we change the message, the signature changes.

![](../../static/img/blockchain-basics/signature.svg)
<small className="figure">FIGURE 14: We sign our data with our private key</small>

Now, if we give someone our message and our signature, that person is able to verify the authenticity of the message. How? 'Or' What ? Simply by going to find our public key and apply the cryptographic verification algorithm on the message and its signature. Remember that the person does not have access to our private key, but using only the public key, the cryptographic algorithm will tell him “Yes, this message has been written by the person with the private key” (see fig. 15) and guarantees that it has not been modified by a third party in which case the signature would no longer be valid (see fig. 16).

![](../../static/img/blockchain-basics/signature_true.svg)
<small className="figure">FIGURE 15: Thanks to the public key and the signature, anyone can verify that this data has indeed been sent by the holder of the private key...</small>

![](../../static/img/blockchain-basics/signature_false.svg)
<small className="figure">FIGURE 16: ...or vice versa, that the data has been altered or does not come from the holder of the private key.</small>

## Transactions
Now, instead of using a simple string of characters in the data, let's insert a transaction into it! The transaction will have our public key as the sender, and the public key of the recipient, and we sign this with our private key. See fig. 17 as an example.

The blockchain is now able to use our public key to verify that we are indeed at the origin of this transaction (fig. 18), that we are indeed the sender and that the transaction has not been altered by a third party. .

![](../../static/img/blockchain-basics/tx_signature.svg)
<small className="figure">FIGURE 17: We sign our transaction with our private key</small>

![](../../static/img/blockchain-basics/tx_signature_true.svg)
<small className="figure">FIGURE 18: The blockchain verifies that this transaction has been sent by the owner of the private key</small>

## Complete & distributed blockchain
Let's go back to our insecure blockchain diagram fig. 10 except that now all transactions are signed by their respective sender (fig. 19, 20 and 21). Each transaction has the signature of the sender. Note that we no longer mark personal names ($ 11.00 from Anders to Elizabeth) but public keys ($ 11.00 from bc8c66ac158de287272 to d3029db8bbb2db17de20)

If a hacker tries to change, for example, the value of the amount of a transaction, two things happen:

- the block is no longer signed because the hash has changed, as we saw in chapter 5

- the signature changes and no longer verifies this transaction!

If we mine the block again, it will be signed again, but the signature of this transaction remains invalid. It is impossible to re-validate the transaction without having the private key of the sender of the transaction.

This is how transactions in the blockchain are protected by only allowing the sender to sign their transactions, and it works perfectly.

Finally, to receive and send money, all you need to do is generate a key pair, and that's it! There is no need to open an account with a bank or prove your identity with a centralized entity, or any other process that could be censored. The blockchain is resistant to censorship. Anyone Can Send and Receive Money!

![](../../static/img/blockchain-basics/complete_block.svg)
<small className="figure">FIGURE 19: A complete block</small>

![](../../static/img/blockchain-basics/complete_chain.svg)
<small className="figure">FIGURE 20: A complete blockchain</small>

![](../../static/img/blockchain-basics/complete_network.svg)
<small className="figure">FIGURE 21: A complete and distributed blockchain network</small>

## Energy consumption
You know understand how mining works. Keep in mind that to win the coinbase you must be the first in the world to find a correct _nonce_. Everyone is basically in competition, and the more computational power and electricity you use, the better your chances. This unfortunately has had a perverse effect on the environment. Bitcoin mining has recently past 100 TWh [[2]](/blockchain-basics/proof-of-work#references) in energy consumption, more than entire countries like Switzerland (56 TWh) or Finland (84 TWh). All this just to find the solution to what is basically an arbitrary mathematical problem that solves absolutely nothing except selecting a person in the world to be the next validator. Isn't there a better alternative? A consensus that would be cooperative that competitive? We're going to see in the next chapter a few examples of next generation consensuses (including the one used by Tezos) that work just as well as _PoS_ but with much lower energy requirements.

## References

[1] https://andersbrownworth.com/blockchain/

[2] https://digiconomist.net/bitcoin-energy-consumption

[3] https://en.wikipedia.org/wiki/List_of_countries_by_electricity_consumption

[4] https://ubuntu.com/tutorials/how-to-verify-ubuntu#5-verify-the-sha256-checksum

[5] https://www.bitmain.com/

[6] https://www.statista.com/statistics/647523/worldwide-bitcoin-blockchain-size/

[7] https://academy.bit2me.com/en/what-is-gossip-protocol/

[8] https://academy.binance.com/en/articles/what-is-a-51-percent-attack

[9] https://medium.com/hackernoon/the-history-of-51-attacks-and-the-implications-for-bitcoin-ec1aa0f20b94

[10] https://builtin.com/blockchain/blockchain-applications

[11] https://www.blockchain.com/charts/difficulty