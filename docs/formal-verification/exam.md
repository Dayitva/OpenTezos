---
id: exam
title: Exam
authors: Frank Hillard
---

import {ExamForm, ExamCheckbox} from '../../src/components/docs/ExamForm';

<ExamForm moduleName="DeFi">

### Question 1

What is returned by the execution of a smart contract ?

<ExamCheckbox name="00" isCorrect="false">The current storage state when invoking the smart contract</ExamCheckbox>
<ExamCheckbox name="01" isCorrect="true">The modified storage state after invoking the smart contract</ExamCheckbox>
<ExamCheckbox name="02" isCorrect="false">The entrypoint that has been called (and its related parameters)</ExamCheckbox>
<ExamCheckbox name="03" isCorrect="true">The list of emitted operations produced by the execution of the smart contract</ExamCheckbox>
<ExamCheckbox name="04" isCorrect="false">The balance of the contract</ExamCheckbox>
<ExamCheckbox name="05" isCorrect="false">The size of the storage</ExamCheckbox>
<ExamCheckbox name="06" isCorrect="false">The code of the smart contract</ExamCheckbox>
<ExamCheckbox name="07" isCorrect="false">The list of users allowed to call the smart contract</ExamCheckbox>

### Question 2

What makes the bridge between the Tezos world and the formal world of Coq ?

<ExamCheckbox name="10" isCorrect="false">The Michelson language</ExamCheckbox>
<ExamCheckbox name="11" isCorrect="false">The Coq universe (predefined Coq types)</ExamCheckbox>
<ExamCheckbox name="12" isCorrect="true">The Mi-cho-coq library</ExamCheckbox>
<ExamCheckbox name="13" isCorrect="false">The Tezos protocol</ExamCheckbox>

### Question 3

Who is Thierry Coquand ?

<ExamCheckbox name="20" isCorrect="false">The founder of the type theory called λ-calculus</ExamCheckbox>
<ExamCheckbox name="21" isCorrect="true">The founder of the type theory called the calculus of constructions (CoC).</ExamCheckbox>
<ExamCheckbox name="22" isCorrect="true">The principal developer of the _Coq_ proof assistant.</ExamCheckbox>
<ExamCheckbox name="23" isCorrect="false">The founder of the intuitionistic type theory.</ExamCheckbox>

### Question 4

GADT stands for ?

<ExamCheckbox name="30" isCorrect="true">Generalized algebraic data type</ExamCheckbox>
<ExamCheckbox name="31" isCorrect="false">Generic abstract data type</ExamCheckbox>
<ExamCheckbox name="32" isCorrect="false">Generalized abstract data type</ExamCheckbox>
<ExamCheckbox name="33" isCorrect="false">Generic algebraic data type</ExamCheckbox>

### Question 5

What kind of algebra is used to define the Michelson language ?

<ExamCheckbox name="40" isCorrect="false">a non-commutative monoid (which only provides associativity of _pairs_, because _pairs_ are not distributive over variants)</ExamCheckbox>
<ExamCheckbox name="41" isCorrect="true">a semi-ring (the rule `a + inv(a) ~ Void` is not verified (where "inv(a)" represents the inverse of `a`); because `inv(a)` does not exist)</ExamCheckbox>
<ExamCheckbox name="42" isCorrect="false">a ring (the rule `a + inv(a) ~ Void` is verified (where "inv(a)" represents the inverse of `a`))</ExamCheckbox>
<ExamCheckbox name="43" isCorrect="false">a group (fully symetric)</ExamCheckbox>

### Question 6

We have seen that a Michelson script must be translated into an annotated script (i.e. a formal definition) (because Mi-Cho-Coq provides an equivalent for each Michelson instruction). In the theorem we want to prove, we specify that "the execution of the annotated script is equivalent to post-conditions". Who is responsible for the execution of this annotated script ?

<ExamCheckbox name="50" isCorrect="false">The Michelson interpreter</ExamCheckbox>
<ExamCheckbox name="51" isCorrect="true">The Mi-Cho-Coq evaluator</ExamCheckbox>
<ExamCheckbox name="52" isCorrect="false">The Coq inference engine</ExamCheckbox>

### Question 7

What post-conditions depends on (What post-conditions are built upon) ?

<ExamCheckbox name="60" isCorrect="true">The storage modification produced by the execution of the smart contract</ExamCheckbox>
<ExamCheckbox name="61" isCorrect="true">The entrypoint parameter which is invoked</ExamCheckbox>
<ExamCheckbox name="62" isCorrect="false">The sequence of Michelson instructions (smart contract code)</ExamCheckbox>
<ExamCheckbox name="63" isCorrect="true">Operations produced by the execution of the smart contract</ExamCheckbox>
<ExamCheckbox name="64" isCorrect="true">Environment variables (transaction properties such as sender, amount)</ExamCheckbox>
<ExamCheckbox name="65" isCorrect="false">Predefined Coq types and inductive types (Coq libraries)</ExamCheckbox>
<ExamCheckbox name="66" isCorrect="false">Mi-Cho-Coq library</ExamCheckbox>

</ExamForm>