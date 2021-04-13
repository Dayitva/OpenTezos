---
id: contracts-ligo
title: Smart contract development in Pascaligo
---
import NotificationBar from '../../src/components/docs/NotificationBar';



LIGO enables developers to write complex smart contracts for the Tezos Blockchain.
Writing smart contracts in LIGO :
1. knowing the LIGO syntax
2. how to write a correct smart contract.

In this chapter, Pascaligo will be taught, throughout the development of a lottery smart contract.
The most important aspect of Ligo will be covered, however this is not a full reference.
This chapter focuses on the way to develop a smart contract, each step introducing a new notion of the language.
For a full reference of the ligo language, see:
1. [Official Ligolang documentation](https://ligolang.org/docs/intro/introduction)
2. [Tezos academy](https://tezosacademy.io/)
3. [OpenTezos reference](https://tezosacademy.io/)

<NotificationBar>
  <p>
<b>DISCLAIMER: this smart contract is meant for educational purpose only,
and is not suitable for any other use. Open tezos cannot be held responsible for any other use.</b>
  </p>
</NotificationBar>

# Raffle smart contract
In this chapter, we will consider a simple raffle example: 
an address (called the administrator) wants to organize a raffle, whose reward is a tz amount.
The administrator pays the reward to the winner with its own funds. 
Anyone can participate in the raffle, with a little fee.
Each ticket has the same probability to win
After a given time, defined at the beginning of the raffle, the administrator closes the raffle, which rewards the winner
This lottery can be divided into 3 steps:
1. a raffle is opened, with a reward, for a given time
2. during the raffle time, anyone can buy a lottery ticket.
3. the lottery is closed, the winner is randomly picked and rewarded with the cashprize

Only one lottery session can be ongoing.

# Prequisites for smart contracts development
When developing smart contracts, two tools are extremely useful:
1. Ligo syntax support for your IDE
2. ligo compiler

These two tools will point out syntax errors and type errors. 
It is recommended to compile a ligo smart contract as often as possible: 
errors will be found early and can be easily addressed

# Smart contract initialization
A smart contract can be broken down into three parts:
1. a storage: persistent data structure, on chain. 
   It can be read by everyone, but can only be changed by the contract itself.
2. entrypoints: possible invocations of the smart contract
3. code: a sequence of instructions to be executed when invoking the smart contract

These three pieces of information must be defined in the ligo code, in order to compile.

The first step is to create a .ligo file. It can be named anything.
Let's create an lottery.ligo file, which would compile to the minimum viable contract (as described in ??? michelson part)

## Storage definition
> type, built-in type, alias,

The first step is to define the storage.
A contract storage holds the contract data: it can be a single value, or a complex structure.
The storage definition is a `type` instruction. First, the storage will be as simple as possible.

### Ligo Syntax: Types, Constants and Variables

LIGO is strongly and statically typed. This means that the compiler checks how your contract processes data, 
ensuring that each function's expectations are met. 
If it passes the test, your contract will not fail at run-time due to some inconsistent assumptions on your data. 
This is called type checking.

LIGO types are built on top of Michelson's type system.

#### Built-in types

LIGO comes with all basic types built-in like string, int or tez for account balance or monetary transactions. 
You can find all built-in types on the [LIGO gitlab](https://gitlab.com/ligolang/ligo/-/tree/dev#L35).

Below is a table of the most used built-in types. Most of them will be used in the raffle smart contract:

| Type              | Description      | Example |
| -----------       | -----------     | -----------|
| `unit`            | carries no information           | `Unit`|
| `option`          | value of some type or none           | `Some ("this string is defined")`, `(None: option string)`|
| `string`          | String           | `"This is a string"`|
| `address`         | Address of an implicit account           | `("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address)`|
| `int`             | Positive or negative integer             | `-5`, `int (1n)`|
| `nat`             | Positive integer             | `0n`, `abs (1)`|
| `tez`, `tz`, `mutez`      | Amount in tz or mutez             | `5mutez`, `10tez`|
| `bool`             | Boolean: true or false             | `True`, `False` |
| `timestamp`        | Timestamp (bakers are responsible for providing the given current timestamp) | `("2000-01-01T10:10:10Z" : timestamp)`, `Tezos.now` |
| `list (type)`      | List definition. The same element can be found several times in a list | `list [1; 2; 2]`, `nil` |
| `set (type)`       | Set definition. The same element cannot be found several times in a list | `set []`, `set [3; 2; 2; 1]` |
| `type1 * type2 ... * typeN`        | Tuple definition | `("Alice", 5n, True)` |
| `(keyType, valueType) map`        | Map an element of type keyType to an element of type valueType. Meant for finite maps | `Map.empty`, `Map.literal [(("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address), (1,2)); (("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN" : address), (0,3))]` |
| `(keyType, valueType) big_map`        | Map an element of type keyType to an element of type valueType. Meant for huge maps | `Big_map.empty`, `Big_map.literal [(("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address), (1,2)); (("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN" : address), (0,3))]` |

#### Type aliases

Type aliasing consists of renaming a given type when the context calls for a more precise name. 
This increases readability and maintainability of your smart contracts. 
For example, we can choose to alias a string type as an animal breed - 
this will allow us to communicate our intent with added clarity.

```js
type breed is string
const dog_breed : breed = "Saluki"
```
#### Constants & Variables

##### Constants

Constants are immutable by design, which means their values cannot be reassigned.
Put in another way, they can be assigned once, at their declaration.
When defining a constant you need to provide a name, type and a value:

```js
const age : int = 25
```

##### Variables

Variables, unlike constants, are mutable.
They cannot be declared in a global scope, but they can be declared and used within functions,
or as function parameters.

```js
var c: int := 2 + 3
c := c - 3
```

⚠️ Notice the assignment operator := for var, instead of = for constants.


### Exercise

The raffle smart contract will a reward: it will be a tz reward. Participants need to know the cashprize:
it has to be in the storage
> Define the contract storage as a single value, containing the cash prize

```js
type storage is unit
```

In addition, a raffle can only be started by a specific address: it will be the contract administrator.
> Define the contract storage to hold the cash prize and a contract administrator
```js
type storage is record [
        reward : tez;
        admin : address
]
```

## Parameter definition
A smart contracts generally have one or several entrypoints, but it is not mandatory.
At this point, the parameter definition will be skipped. They will be defined later in this chapter.

```js
type raffleEntrypoint is unit
```


## Code definition
> main function, list, tuple

The last piece of information of the smart contract is the code definition. 
The smart contract can of course execute no instruction, but it must return two things:
1. a list of operations
2. the storage

The ligo compiler expects the smart contract to have at least one function, which is the "main" function.
It does not have to be named that way. In this chapter, the "main" function will be named main

### Introduction to function
Just as any other language, functions can be defined in Ligo
There several ways to define a function, but the header is always the same:
```js
function <functionName> (const param1 : <param2Type>, const param2 : <param2Type>...): <returnType> is
    <code>
```

Functions will be detailed below. At this point, since this main function does nothing,
it will be a blockless function definition

### Main function
A main function takes two parameters,
the **contract parameter** and the **on-chain storage**,
and returns a pair made of a **list of operations** and a **(new) storage**.

<br/>

![](../../static/img/ligo/main_function.svg)
<small className="figure">FIGURE 1: Main function</small>

<br/>

The type of the contract parameter and the storage are up to the contract designer,
but the type for list operations is not.

The return type of a main function is as follows,
assuming that the type `storage` has been defined elsewhere.

```js
type storage is ...  // Any name, any type
type return is list (operation) * storage
```

The contract storage can only be modified by activating a main function:
given the state of the storage on-chain,
a main function specifies how to create another state for it,
depending on the contract's parameter.

Here is an example where the storage is a single natural number that is updated by the parameter.

```js
type storage is unit
type raffleEntrypoint is unit

function main (const action : raffleEntrypoint; const store : storage): list (operation) * storage is
    ((nil: list(operation)), store)
```

This main function returns a tuple of the two required elements. The tuple and list syntax will be described below.

## Ligo compilation
The ligo code above should compile now, with this command:
```shell
$ ligo compile-contract <ligoFile> <mainFunction>
```
If the compilation is successful, the output will be the Michelson code. 

It is recommended to run this command as often as possible, to check both code syntax and types.

In the raffle smart contract, the compiling command is:
```shell
$ ligo compile-contract lottery.ligo main
```
# Smart Contract development : launch raffle entrypoint
The LIGO code is compiling, but the Michelson code does nothing: there is no storage, no entrypoint, and the smart contract returns an empty list of operation, and an "empty" storage
As detailled in the [Raffle smart contract](#raffle-smart-contract) section, the smart contract should do three actions:
1. launch a raffle
2. buy a ticket
3. close the raffle, and reward the winner

Each one of these actions can be coded into an entrypoint.

## Modifying the storage
Before coding the logic of the first action, the storage has to be modified.
The contract needs an **administrator**, which will launch a raffle.
When the raffle is **opened**, it should be clearly noted in the storage.
This raffle will need a **reward** and will be ongoing for a given **time**.

So, 4 pieces of information are needed:
- the raffle administrator
- a description about the raffle
- is the raffle opened ?
- the reward in tz
- the raffle end date.

> What would the types for each piece of information ?

For each piece of information, the corresponding type is:
- raffle administrator: address
- raffle description: string
- raffle opened ? : boolean
- reward: tez
- raffle end date: timestamp

So far, the storage was empty, thanks to the `unit` type. 
The storage now needs to hold four pieces of information, of different types. 
Several values can be held in a map, but they must have the same type. Besides, map are not meant to have the same number of elements.

The correct way to define a storage is to use the `record` type.

### Records
The `record` type is a structure that holds a set of key/data pairs.
It is extremely useful for the storage definition and for any object that should hold different types of informations.

#### Defining records

To instantiate a record, you must first declare its type as follows:

```js
type user is
  record [
    id : nat;
    is_admin : bool;
    name : string
  ]
```

The number and type of fields is defined at the record definition. It cannot be changed afterwards.

And here is how to define an associated record value:

```js
const rogers : user =
  record [
    id = 1n;
    is_admin = true;
    name = "Rogers"
  ]
```

#### Accessing Record Fields

You can access the contents of a given field with the `.` infix operator.

```js
const rogers_admin : bool = roger.is_admin
```

#### Updating a record

You can modify values in a record as follows:

```js
const rogersNotAdmin : user = u with record [is_admin = False]
```

After this update, the pieces of information held by the rogers record are:
- id: 1n
- is_admin: false
- name: "Rogers"

You can use `patch` to modify the record:

```js
function change_name (const u : user) : user is
  block {
      patch u with record [name = "Mark"]
  } with u
```

⚠️ Note that user has not been changed by the function.
Rather, the function returned a nameless new version of it with the modified name.

### Hand-ons: Modifying the contract storage
> Modify the storage smart contract to hold the 5 pieces of information, defined [at the beginning of this part](#modifying-the-storage)
```js
type storage is record [
    admin : address;
    close_date : timestamp;
    jackpot : tez;
    description : string;
    lottery_is_open : bool;
]

```


## Creating a raffle session: entrypoint definition
The contract storage can now hold a raffle session. 
The contract has to provide the users with a way of creating a raffle session.
To do that, it needs an entrypoint that perform such an action: 
this new entrypoint should be named "OpenRaffle" and would allow the administrator to open a raffle.

### Adding a new entrypoint with Ligo

In LIGO, the design pattern is to have one main function called `main`,
that dispatches the control flow according to its parameter.
Those functions called for those actions are called entrypoints.

As an analogy, in the C programming language,
the `main` function is the unique main function and any function called from it would be an entrypoint.

The parameter of the contract is then a variant type (described below,
and, depending on the constructors of that type,
different functions in the contract are called.
In other terms, the unique main function dispatches the control flow
depending on a pattern matching on the contract parameter.

#### Variant type

A variant type is a user-defined or a built-in type (in case of options) that defines a type by cases,
so a value of a variant type is either this, or that or...
The simplest variant type is equivalent to the enumerated types found in Java, C++, JavaScript etc.

Here is how we define a bit as being either 1 or 0 (and nothing else):

```js
type bit is One | Zero
const closed_switch : bit = One
const open_switch : coin = Zero
```

#### Pattern Matching

Pattern matching is similar to the switch construct in Javascript,
and can be used to route the program's control flow based on the value of a variant.
Consider for example the definition of a power switch that turn on/off a light.

```js
type bit is One | Zero

function power_switch (const b : bit) : bit is
  case b of
    One -> Zero
  | Zero -> One
  end
```

### Adding the OpenRaffle entrypoint

So far, there is no entrypoint in this smart contract:

```js
type raffleEntrypoint is unit
```

Adding the OpenRaffle entrypoint means to define the raffle entrypoint as a variant:

```js
type raffleEntrypoints is OpenRaffle of unit
```
raffleEntrypoint is now a variant: OpenRaffle (because of `of unit`) does not expect any argument.

In order to be exposed, OpenRaffle needs to be handled in a pattern matching, in the main function:
```js
function main (const action : tombolaEntrypoints; const store : storage):  list (operation) * storage is
    case action of
        OpenRaffle -> ((nil: list(operation)), store)
    end;

```

The smart contract now looks like (and is compiling):
```js
type raffleEntrypoints is OpenRaffle of unit

type storage is unit

type returnType is list (operation) * storage

function main (const action : tombolaEntrypoints; const store : storage): returnType is
    case action of
        OpenRaffle -> ((nil: list(operation)), store)
    end;

```
However, the ouput Michelson code is still the same and still does nothing.

To open a raffle, several pieces of information have to be sent: the reward, the closing date, and a raffle description
Let's define a type for these parameters:

```js
type openRaffleParameter is tez * timestamp * option(string)
```
It is declared as a tuple (see below for [Tuple details](#tuples))

The OpenRaffle entrypoint must except these parameters:

```js
type openRaffleParameter is tez * timestamp * option(string)
type raffleEntrypoints is OpenRaffle of openRaffleParameter
```

And finally, the parameters must be added in the control flow from the main function:

```js
type openRaffleParameter is tez * timestamp * option(string)
type raffleEntrypoints is OpenRaffle of openRaffleParameter

type storage is unit

type returnType is list (operation) * storage

function main (const action : tombolaEntrypoints; const store : storage): returnType is
    case action of
        OpenRaffle (param) -> ((nil: list(operation)), store)
    end;

```

It output a Michelson code which does nothing, but there is slight change in the parameter section:
```
{ parameter (pair (pair mutez timestamp) (option string)) ;
  storage int ;
  code { CDR ; NIL operation ; PAIR } }
```

The openRaffleParameter are expected in the parameter section.

#### Tuples
Tuples gather a given number of values in a specific order and those values,
called components,
can be retrieved by their index (position).
Probably the most common tuple is the pair `(x,y)`.

##### Defining Tuples

To define a tuple type, use the * operator:

```js
type full_name is (string * string)
const captain_full_name : full_name = ("Roger", "Johnson")
```

> Note that you are not force to give them names by type aliasing,
> and you could have done that instead:
> ```js
> const captain_full_name : (string * string) = ("Roger", "Johnson")
> ```

##### Accessing Components

You can access each component of a tuple by their position:

```js
const captain_first_name : string = captain_full_name.0
const captain_last_name : string = captain_full_name.1
```

⚠️ Tuple components are zero-indexed, that is, the first component has the index `0`.

### Update Components

You can modify a component of tuple by assigning values as if it were a variable:

```js
captain_full_name.1 := "Carter"
```

### Adding the OpenRaffle logic

The last step is to implement the logic of this entrypoint. We'll need functions

#### Functions in ligo

LIGO functions are the basic building block of contracts.
Each entrypoint of a contract is a function
and each smart contract must have at least one function named main
that dispatches the control flow to other functions.

When calling a function,
LIGO makes a copy of the arguments but also the environment variables.
Therefore, any modification to these will not be reflected outside the scope of the function
and will be lost if not explicitly returned by the function.

There are 2 types of functions in PascaLIGO, Block Functions and Blockless Functions:

##### Block functions

In PascaLIGO, blocks allows for the sequential composition of instructions into an isolated scope.
Each block needs to include at least one instruction.

```js
block { 
    const b : int = 10
    a := a + b 
}
```

If we need a placeholder, we use the instruction `skip` which leaves
the state unchanged.  The rationale for `skip` instead of a truly
empty block is that it prevents you from writing an empty block by
mistake.

```js
block { skip }
```

Functions in PascaLIGO are defined using the following syntax:

```js
function <name> (<parameters>) : <return_type> is 
  block {
   <operations and instructions>
  } with <returned_value>
```

For instance :

```js
function add (const a : int; const b : int) : int is
  block {
    const sum : int = a + b
  } with sum
```

###### Blockless functions

Functions that can contain all of their logic into a single expression can be defined without the need of a block.
The add function above can be re-written as a blockless function:

```js
function add (const a: int; const b : int) : int is a + b
```

###### Anonymous functions (a.k.a. lambdas)

It is possible to define functions without assigning them a name.
They are useful when you want to pass them as arguments,
or assign them to a key in a record or a map.

```js
function increment (const b : int) : int is
   (function (const a : int) : int is a + 1) (b)
const a : int = increment (1); // a = 2
```

If the example above seems contrived, here is a more common design pattern for lambdas:
to be used as parameters to functions.
Consider the use case of having a list of integers and mapping the increment function to all its elements.

```js
function incr_map (const l : list (int)) : list (int) is
  List.map (function (const i : int) : int is i + 1, l)
```

> For the input "list [1;2;3]" the output will be [2;3;4]

###### Recursive function

LIGO functions are not recursive by default,
the user need to indicate that the function is recursive.

At the moment,
recursive function are limited to one (possibly tupled) parameter
and recursion is limited to tail recursion (i.e the recursive call should be the last expression of the function)

In PascaLigo recursive functions are defined using the `recursive` keyword.

```js
recursive function sum (const n : int; const acc: int) : int is
  if n<1 then acc else sum(n-1,acc+n)
```


#### Adding the function
##### LIGO prequisites: If condition

Conditional logic enables forking the control flow depending on the state.

```js
function isSmall (const n : nat) : bool is
if n < 10n then true else false
```

⚠️ When the branches of the conditional are not a single expression, as above, we need a `block`:

```js
if x < y then
    block {
        x := x + 1;
        y := y - 1
    }
else skip;
```

##### LIGO prequisites: Timestamp

LIGO features timestamps are responsible for providing the given current timestamp for the contract.

```js
const today : timestamp = Tezos.now
const one_day : int = 86_400
const in_24_hrs : timestamp = today + one_day
const some_date : timestamp = ("2000-01-01T10:10:10Z" : timestamp)
const one_day_later : timestamp = some_date + one_day
```

##### LIGO prequisites: Addresses

Addresses are very likely to be used in any smart contract.
You can define Tezos addresses by casting a string to an address type:

```js
const my_account : address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address)
```

⚠️ You will not see a transpilation error if the address you enter is wrong, but the execution will fail.


##### LIGO prequisite: Tezos Module

The Tezos module is a set of LIGO instructions, that query the state of the Tezos blockchain.
It is useful when the smart contract needs to know is calling an entrypoint, if enough funds are sent...

- `Tezos.balance`: Get the balance for the contract.
- `Tezos.amount`: Get the amount of tez provided by the sender to complete this transaction.
- `Tezos.sender`: Get the address that initiated the current transaction.
- `Tezos.self_address`: Get the address of the currently running contract.
- `Tezos.source`: Get the originator (address) of the current transaction.
  That is, if a chain of transactions led to the current execution get the address that began the chain.
  Not to be confused with Tezos.sender,
  which gives the address of the contract or user which directly caused the current transaction.
- `Tezos.chain_id`: Get the identifier of the chain to distinguish between main and test chains.

##### LIGO prequesite: Failwith

The keyword failwith throws an exception and stop the execution of the smart contract.

```js
failwith(<string_message>)
```


##### OpenRaffle implementation
Let's create an empty function. This function expects the three needed parameters,
and returns the standard list of operations and the updated store:
```js
function open_raffle (const jackpot_amount : tez; const close_date : timestamp; const description : option(string); const store : storage) : returnType is
    block { skip } with ((nil: list(operation)), store)
```

The first step is to check was the entrypoints is called by the admnistrator. If not, it should raise an exception.
The check is performed by an association of an "If" condition and a failwith.
The address calling the entrypoint should match the address in the storage.

```js
function open_raffle (const jackpot_amount : tez; const close_date : timestamp; const description : option(string); const store : storage) : returnType is
    block {
      if Tezos.source =/= store.admin then failwith("administrator not recognized")
      else {
        skip
      }
    } with ((nil: list(operation)), store)
```

A second check has to be performed: a raffle cannot be opened if the previous one is not yet closed.
A boolean gives this piece of information in the storage: lottery_is_open

```js
function open_raffle (const jackpot_amount : tez; const close_date : timestamp; const description : option(string); const store : storage) : returnType is
    block {
      if Tezos.source =/= store.admin then failwith("administrator not recognized")
      else {
        if not store.lottery_is_open then {
            skip
        } else {
          failwith("raffle is already open")
        }
      }
    } with ((nil: list(operation)), store)
```

A third check is performed about the reward: the funds sent must match the raffle reward.

```js
function open_raffle (const jackpot_amount : tez; const close_date : timestamp; const description : option (string); const winning_ticket_number : nat; const store : storage) : returnType is
  block {
    if Tezos.source =/= store.admin
    then failwith ("administrator not recognized")
    else {
      if store.lottery_is_open then {
        if Tezos.amount < jackpot_amount then failwith ("the contract does not own enough tz")
        else {
            skip
        }
      }
      else {
        failwith ("raffle is not open")
      }
    }
  } with ((nil : list (operation)), store)
```

One finale check is performed about the raffle closing date: the raffle should last at least a week.

```js
function open_raffle (const jackpot_amount : tez; const close_date : timestamp; const description : option (string); const winning_ticket_number : nat; const store : storage) : returnType is
  block {
    if Tezos.source =/= store.admin
    then failwith ("administrator not recognized")
    else {
      if store.lottery_is_open then {
        if Tezos.amount < jackpot_amount then failwith ("the contract does not own enough tz")
        else {
          const today : timestamp = Tezos.now;
          const seven_day : int = 7 * 86400;
          const in_7_day : timestamp = today + seven_day;
          const is_close_date_not_valid : bool = close_date < in_7_day;
          if is_close_date_not_valid then failwith("the raffle must remain open for at least 7 days.")
          else {
            skip
          }
        }
      }
      else {
        failwith ("raffle is not open")
      }
    }
  } with ((nil : list (operation)), store)
```

The logic is finally implemented. For this entrypoint, the only thing is to store the pieces of information of the raffle:
the reward, the closing date, the raffle description. In addition, the storage should indicate that there is an ongoing raffle.


```js
function open_raffle (const jackpot_amount : tez; const close_date : timestamp; const description : option (string); const winning_ticket_number : nat; const store : storage) : returnType is
  block {
    if Tezos.source =/= store.admin
    then failwith ("administrator not recognized")
    else {
      if not store.lottery_is_open then {
        if Tezos.amount < jackpot_amount then failwith ("the contract does not own enough tz")
        else {
          const today : timestamp = Tezos.now;
          const seven_day : int = 7 * 86400;
          const in_7_day : timestamp = today + seven_day;
          const is_close_date_not_valid : bool = close_date < in_7_day;
          if is_close_date_not_valid then failwith("the raffle must remain open for at least 7 days.")
          else {
            const winning_ticket_number_bytes : bytes = Bytes.pack(winning_ticket_number);
            patch store with record [
            jackpot = jackpot_amount;
            close_date = close_date;
            lottery_is_open = True;
            ];

            case description of
            | Some(d) -> patch store with record [description=d]
            | None -> {skip}
            end
          }
        }
      }
      else {
        failwith ("raffle is not open")
      }
    }
  } with ((nil : list (operation)), store)
```


> From this simple example:
> - check entrypoint inputs as much as possible
> - comparison and mathematical operations are carried out the same way for any type (int, tez, timestamp...)
> - the storage is used and updated


# Smart Contract development : Buy ticket entrypoint

The second entrypoint is open to everyone who wants to buy a ticket.
In this usecase, each address can only buy one ticket, which cost 1 tz.

Two additional pieces of information have to be kept:
1. who is taking part to the raffle
2. who is owning a ticket

The storage has to be updated, and collections are going to be used

## LIGO prequesites: collections

### Lists

Lists are **linear collections of elements of the same type**.
Linear means that, in order to reach an element in a list,
we must visit all the elements before (sequential access).
Elements can be repeated, as only their order in the collection matters.
The first element is called the head,
and the sub-list after the head is called the tail.

> 💡 Lists are needed when returning operations from a smart contract's main function.

#### Defining Lists

To define an empty list and a list with values:

```js
const empty_list : list (int) = list [] // Or nil
const my_list : list (int) = list [1; 2; 2]
```

> You can also use `nil` instead of `list []`

#### Adding to Lists

You can add elements to an existing list using the cons operator `#` or `cons(<value>, <list>)`:

```js
const larger_list : list (int) = 5 # my_list // [5; 1; 2; 2]
const larger_list_bis : list (int) = cons(5, my_list) // [5; 1; 2; 2]
```

#### Accessing list element

You cannot access element directly in list,
but you can access the first element,
the head or the rest of the list, the tail.
The two function to access those are `List.head_opt` and `List.tail_opt`.

```js
const head : option (int) = List.head_opt (my_list) // 1
const tail : option (list(int)) = List.tail_opt (my_list) // [2;2]
```

### Sets

Sets are **unordered collections of values of the same type**,
like lists are ordered collections.
Like the mathematical sets and lists,
sets can be empty and, if not,
elements of sets in LIGO are unique,
whereas they can be repeated in a list.

#### Defining Sets

```js
const empty_set : set (int) = set []
const my_set : set (int) = set [3; 2; 2; 1]
```

#### Sets tools
You can test membership with the contains operator:

```js
const contains_3 : bool = my_set contains 3
```

You can get the size of a set using the Set.size operator:

```js
const cardinal : nat = Set.size (my_set)
```

To update a set:

```js
const larger_set  : set (int) = Set.add (4, my_set)
const smaller_set : set (int) = Set.remove (3, my_set)
```


### Maps

Maps are a data structure which associate values of the same type to values of the same type.
The former are called key and, the latter values.
Together they make up a binding.
An additional requirement is that the type of the keys must be comparable,
in the Michelson sense.

#### Defining a Map

```js
type balances is map (string, nat)

const empty : balances = map []

const user_balances : balances =
    map [
        "tim" -> 5n;
        "mark" -> 0n
    ]
```

#### Accessing Map Bindings

Use the postfix [] operator to read a value of the map:

```js
const my_balance : option (nat) = user_balances ["tim"]
```

#### Updating a Map

You can add or modify a value using the usual assignment syntax `:=` :

```js
user_balances ["tim"] := 2n
user_balances ["New User"] := 24n
```

A key-value can be removed from the mapping as follows:

```js
remove "tim" from map user_balances
```

> Maps load their entries into the environment,
> which is fine for small maps,
> but for maps holding millions of entries,
> the cost of loading such map would be too expensive.
> For this we use `big_maps`. Their syntax is the same as for regular maps.


## Modifying the storage
The new two pieces of information will be stored into the contract storage.

> What collection should be used for:
> 1. the participants (who can only buy one ticket) ?
> 2. the tickets and their owner ?

For the first point, two collections could be used: a list and a set. 
Since the participants can only buy one ticket, a set is the right choice (since each element cannot appear twice).

For the second point, each ticket should be mapped to their owner. The number of participants is not limited:
there might be millions of them. So, a big map seems the right choice.

The set of participants should a set of addresses, while the big map should map a ticket id (a nat) to an address.
The new storage is:
```js
type storage is record [
    admin : address;
    close_date : timestamp;
    jackpot : tez;
    description : string;
    lottery_is_open : bool;
    players : set (address);
    sold_tickets : map (nat, address);
  ]
```

## Adding the BuyTicket Entrypoint

The smart contract needs to expose another entrypoint. 
The method is the same that has been detailed for the first entrypoint:

1. Defining the type parameter. This type should be unit, since the buyer does not get to choose the ticket id:
```js
type buyTicketParameter is unit
```

2. Adding the entrypoint in the variant:
```js
type raffleEntrypoints is
OpenRaffle of openRaffleParameter
| BuyTicket of buyTicketParameter
```
3. Handling the new entrypoint in the control flow:
```js
function main (const action : raffleEntrypoints; const store : storage): returnType is
block {
    const return : returnType = case action of
    OpenRaffle (param) -> open_raffle (param.0, param.1, param.2, param.3, store)
    | BuyTicket (param) -> buy_ticket(param, store)
    end;
} with return
```

## Implementing the BuyTicket logic

The last step is to implement the logic of this entrypoint. 
Just as for the first entrypoint, this logic will be implemented in a function, buy_ticket:

```js
  function buy_ticket (const param: unit; const store : storage) : returnType is
    block { skip } with ((nil : list (operation)), store)
```

Two pieces of information have to be checked:
1. the buyer is sending enough funds
2. the buyer has not already bought a ticket

For the first point, this is the same check that is done for the first entrypoint.
Checking if an address is calling the entrypoint for the first time (= a buyer cannot buy more than one ticket) means
checking if the calling address is already in the players `set`.

```js
  function buy_ticket (const param: unit; const store : storage) : returnType is
block {
    const ticket_price : tez = 1tez;
    const current_player : address = Tezos.sender;
    if Tezos.amount < ticket_price then failwith("The sender does not own enough tz to buy a ticket.")
    else {
        if store.players contains current_player then failwith("Each player can participate only once.")
        else {
            skip
        }
    }
} with ((nil : list (operation)), store)

``` 

Once these two checks have been performed, the buyer can receive a ticket. To do that, the entrypoint needs to:
1. register the address as a participant: the address must be added into the players set from the storage.
2. create a ticket number. Since each participant can only buy ticket, the size of the players set give the new ticket number
3. associate the ticket with its owner: the new ticket id will map to the buyer in the sold_tickets big_map.

These three steps use the methods described in the Collections section.

```js
  function buy_ticket (const param: unit; const store : storage) : returnType is
block {
    const ticket_price : tez = 1tez;
    const current_player : address = Tezos.sender;
    if Tezos.amount = ticket_price then failwith("The sender does not own enough tz to buy a ticket.")
else {
        if store.players contains current_player then failwith("Each player can participate only once.")
    else {
            store.players := Set.add(current_player, store.players);
            const ticket_id : nat = Set.size(store.players);
            store.sold_tickets[ticket_id] := current_player;
        }
    }
} with ((nil : list (operation)), store)

``` 

The contract now is:

```js
type openRaffleParameter is tez * timestamp * option(string) * nat
type buyTicketParameter is unit

type raffleEntrypoints is 
  OpenRaffle of openRaffleParameter
| BuyTicket of buyTicketParameter


type storage is record [
    admin : address;
    close_date : timestamp;
    jackpot : tez;
    description : string;
    players : set (address);
    sold_tickets : map (nat, address);
    raffle_is_open : bool;
  ]

type returnType is list (operation) * storage

function open_raffle (const jackpot_amount : tez; const close_date : timestamp; const description : option (string); const winning_ticket_number : nat; const store : storage) : returnType is
  block {
    if Tezos.source =/= store.admin then failwith("Administrator not recognized.")
    else {
      if not store.raffle_is_open then {
        if Tezos.amount < jackpot_amount then failwith("The administrator does not own enough tz.")
        else{
        const today : timestamp = Tezos.now;
        const seven_day : int = 7 * 86400;
        const in_7_day : timestamp = today + seven_day;
        const is_close_date_not_valid : bool = close_date < in_7_day;
        if is_close_date_not_valid then failwith("The raffle must remain open for at least 7 days.")
        else {
          patch store with record [
          jackpot = jackpot_amount;
          close_date = close_date;
          raffle_is_open = True;
          ];

          case description of
            Some(d) -> patch store with record [description=d]
          | None -> {skip}
          end
        }
      }
    }else {
      failwith("A raffle is already open.")
    }
  }
} with ((nil : list (operation)), store)


  function buy_ticket (const param: unit; const store : storage) : returnType is
    block {
      const ticket_price : tez = 1tez;
      const current_player : address = Tezos.sender;
      if Tezos.amount = ticket_price then failwith("The sender does not own enough tz to buy a ticket.")
      else {
        if store.players contains current_player then failwith("Each player can participate only once.")
        else {
          const ticket_id : nat = Set.size(store.players);
          store.players := Set.add(current_player, store.players);
          store.sold_tickets[ticket_id] := current_player;
        }
      }
    } with ((nil : list (operation)), store)


function main (const action : raffleEntrypoints; const store : storage): returnType is
block { 
    const return : returnType = case action of 
      OpenRaffle (param) -> open_raffle (param.0, param.1, param.2, param.3, store)
    | BuyTicket (param) -> buy_ticket(param, store)
    end;
 } with return

```

# Smart Contract development : Close Raffle Entrypoint
The last step is to close the raffle, pick a winner and send him the reward.
This last entrypoint will show how to send a transaction from the contract and some collections manipulations

5 steps are expected:
1. Check that the calling address is the administrator
2. Check that the closing date has been reached and the raffle is still open
3. Pick a winner
4. Send the reward to the winner
5. Reset the storage

New pieces of information won't be stored: the storage is not expected to be modified. 
However, the third step raises a problem: how should be the winner picked ?
1. the admnistrator chooses the winner when calling this entrypoint: 
   participants are likely not to buy a ticket since the administrator can choose himself as a winner
2. the winner is randomly choose when calling this entrypoint
3. the winner is chosen at the beginning by the administrator, but this piece of information is only revealed at the end of the raffle.

## LIGO prequisites: Transactions

You can transfer tez to an account, or to a function of another smart contract.
For this, use :

```js
Tezos.transaction (<parameter>, <mutez>, <contract>);
```

where :

- **parameter** is the entrypoint of another contract,
  or use `unit` if you are transferring to a wallet address,
- **mutez** is the amount to transfer,
- **contract** is the contract interface of the targeted contract.
  It can be retrieved from address of the other contract or the wallet.

## About randomness in smart contracts
The second option is not easily implemented in smart contracts. In any classical programming language (Python, C, Java...),
a **random** function is directly usable from the standard API. With smart contracts, it is not possible.

Indeed, each smart contract execution has to be verified by any node in the network. 
But how could this execution be verified if there is a random variable, that would change everytime ?

It might seem to be a good idea to use blockchain events (transaction hash, block timestamp...) as source of randomness.
However, in the end, all of this are controlled by bakers: there is a slight possibility that they use this to their advantage.

The only solution seems to use an external source of randomness, or a secure cryptographic scheme. 
This topic goes well beyond this course. 
For educational purpose, we will at first hardcode a ticket id winner. 
Then, the smart contract will be refactored, using the Bytes and Crypto modules.

## Adding the CloseRaffle entrypoint

The smart contract needs to expose this last entrypoint.
The method is the same that has been detailed for the first and second entrypoint:

1. Defining the type parameter. This type should be unit, since the administrator just has to close the raffle without any other piece of information:
```js
type closeRaffleParameter is unit
```

2. Adding the entrypoint in the variant:
```js
type raffleEntrypoints is
OpenRaffle of openRaffleParameter
| BuyTicket of buyTicketParameter
| CloseRaffle of closeRaffleParameter
```
3. Handling the new entrypoint in the control flow:
```js
function main (const action : raffleEntrypoints; const store : storage): returnType is
block {
    const return : returnType = case action of
    OpenRaffle (param) -> open_raffle (param.0, param.1, param.2, store)
    | BuyTicket (param) -> buy_ticket(param, store)
    | CloseRaffle (param) -> close_raffle (param, store)
    end;
} with return
```

## Implementing the CloseRaffle logic
Let's create an empty function for this entrypoint:
```js
  function close_raffle (const param: unit; const store : storage) : returnType is
    block { const operations : list(operation) = nil; } with (operations, store)
```

There is a slight difference with this entrypoint function: it has to return an operation.
As a result, the list of operations won't be empty, and will be filled with on operation from within the function block.


The usual checks have to be implemented:
1. only the administrator can close the raffle
2. the closing date must have been reached
3. the raffle must be open

The winner will be picked thanks to a hardcoded value. 
However, even if there is only two participants, the raffle must have a winner.
So, the number of participants must be known, so that the winning id is `hardcoded_number mod number_of_participants`
Of course, LIGO offers all the arithmetic operations (addition, substraction, multiplication, division, mod). It won't be detailed here, since it exactly the same as other languages.

```js
function close_raffle (const param : unit; const store : storage) : returnType is
      block {
        const operations : list(operation) = nil;
        if Tezos.source =/= store.admin then failwith("administrator not recognized.")
        else {
          if Tezos.now < store.close_date; then failwith("The raffle must remain open for at least 7 days.")
          else {
          const number_of_players : nat = Set.size(store.players);
          const random_number : nat = 467n; // hardcoded number
          const winning_ticket_id : nat = random_number mod number_of_players; // modulo expression
        }
      } with (operations, store)
```

The winning ticket is now chosen. The next step is to find its owner, from the sold_tickets big_map.
Since a key might not exist in a big map, fetching the value always return an option. 
This option is handled with a pattern matching as below:

```js
 function close_raffle (const param : unit; const store : storage) : returnType is
      block {
        const operations : list(operation) = nil;
        if Tezos.source =/= store.admin then failwith("administrator not recognized.")
        else {
          if Tezos.now < store.close_date; then failwith("The raffle must remain open for at least 7 days.")
          else {
          const number_of_players : nat = Set.size(store.players);
          const random_number : nat = 467n; // Impossibilité d'aléa
          const winning_ticket_id : nat = random_number mod number_of_players;

          const winner : address = 
          case (store.sold_tickets[winning_ticket_id]) of
            Some (a) -> a
          | None -> (failwith ("winner address not found") : address)
          end;
        }
      } with (operations, store)
```

The winner has been found, it has now to be rewarded. 
First, we need to check that this address does exist, and then create a transaction:

```js
 function close_raffle (const param : unit; const store : storage) : returnType is
      block {
        const operations : list(operation) = nil;
        if Tezos.source =/= store.admin then failwith("administrator not recognized.")
        else {
          if Tezos.now < store.close_date; then failwith("The raffle must remain open for at least 7 days.")
          else {
          const number_of_players : nat = Set.size(store.players);
          const random_number : nat = 467n; // Impossibilité d'aléa
          const winning_ticket_id : nat = random_number mod number_of_players;

          const winner : address = 
          case (store.sold_tickets[winning_ticket_id]) of
            Some (a) -> a
          | None -> (failwith ("winner address not found") : address)
          end;

          const receiver : contract (unit) =
          case (Tezos.get_contract_opt (winner) : option (contract (unit))) of
            Some (c) -> c
          | None -> (failwith ("winner contract not found.") : contract (unit))
          end;

          const op : operation = Tezos.transaction(unit, store.jackpot, receiver);
          const operations : list(operation) = list [ op; ];
          
        }
      } with (operations, store)
```
The operations variable is not empty anymore: this entrypoint does return a transaction, that will be sent by the smart contract.

Finally, the storage need to be reset. All the fields will be filled with empty values:
```js
 function close_raffle (const param : unit; const store : storage) : returnType is
      block {
        const operations : list(operation) = nil;
        if Tezos.source =/= store.admin then failwith("administrator not recognized.")
        else {
          if Tezos.now < store.close_date; then failwith("The raffle must remain open for at least 7 days.")
          else {
          const number_of_players : nat = Set.size(store.players);
          const random_number : nat = 467n; // Impossibilité d'aléa
          const winning_ticket_id : nat = random_number mod number_of_players;

          const winner : address = 
          case (store.sold_tickets[winning_ticket_id]) of
            Some (a) -> a
          | None -> (failwith ("winner address not found") : address)
          end;

          const receiver : contract (unit) =
          case (Tezos.get_contract_opt (winner) : option (contract (unit))) of
            Some (c) -> c
          | None -> (failwith ("winner contract not found.") : contract (unit))
          end;

          const op : operation = Tezos.transaction(unit, store.jackpot, receiver);
          const operations : list(operation) = list [ op; ];

          patch store with record [
          jackpot = 0tez;
          close_date = (0 : timestamp);
          description = ("raffle is currently closed" : string);
          raffle_is_open = False;
          players = (set[] : set(address));
          sold_tickets = (map[] : map (nat, address));
          ];
        }
      } with (operations, store)
```

# Smart contract refactoring


**************************************************************
`



