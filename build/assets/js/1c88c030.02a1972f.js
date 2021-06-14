(self.webpackChunkopentezos=self.webpackChunkopentezos||[]).push([[3989],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return h},kt:function(){return d}});var s=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,s,a=function(e,t){if(null==e)return{};var n,s,a={},r=Object.keys(e);for(s=0;s<r.length;s++)n=r[s],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(s=0;s<r.length;s++)n=r[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=s.createContext({}),l=function(e){var t=s.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},h=function(e){var t=l(e.components);return s.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},u=s.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,c=e.parentName,h=i(e,["components","mdxType","originalType","parentName"]),u=l(n),d=a,y=u["".concat(c,".").concat(d)]||u[d]||p[d]||r;return n?s.createElement(y,o(o({ref:t},h),{},{components:n})):s.createElement(y,o({ref:t},h))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=u;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var l=2;l<r;l++)o[l]=n[l];return s.createElement.apply(null,o)}return s.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7775:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return o},metadata:function(){return i},toc:function(){return c},default:function(){return h}});var s=n(2122),a=n(9756),r=(n(7294),n(3905)),o={id:"synthetics",title:"Synthetics",author:"Aymeric Bethencourt"},i={unversionedId:"defi/synthetics",id:"defi/synthetics",isDocsHomePage:!1,title:"Synthetics",description:"Synthetics are contracts where two parties bet on opposite outcomes for the value of an asset and then split the difference in profit/loss. The actual asset is not purchased in this contract. Both parties simply bet on the value appreciating or depreciating.",source:"@site/docs/defi/synthetics.md",sourceDirName:"defi",slug:"/defi/synthetics",permalink:"/defi/synthetics",editUrl:"https://github.com/octo-technology/OpenTezos/tree/main/docs/defi/synthetics.md",version:"current",lastUpdatedBy:"Theotime-Akeare",lastUpdatedAt:1623160891,formattedLastUpdatedAt:"6/8/2021",frontMatter:{id:"synthetics",title:"Synthetics",author:"Aymeric Bethencourt"},sidebar:"docs",previous:{title:"Stablecoins",permalink:"/defi/stablecoins"},next:{title:"Lending and Flash Loans",permalink:"/defi/lending"}},c=[{value:"Synthetics &amp; Blockchain",id:"synthetics--blockchain",children:[]},{value:"Synthetics Vs. Wrapped Asset",id:"synthetics-vs-wrapped-asset",children:[]},{value:"Risks",id:"risks",children:[]},{value:"Synthetics on Tezos",id:"synthetics-on-tezos",children:[]},{value:"References",id:"references",children:[]}],l={toc:c};function h(e){var t=e.components,o=(0,a.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,s.Z)({},l,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Synthetics are contracts where two parties bet on opposite outcomes for the value of an asset and then split the difference in profit/loss. The actual asset is not purchased in this contract. Both parties simply bet on the value appreciating or depreciating."),(0,r.kt)("p",null,"Example: Alice and Bob both send $100 in value to a contract, making the total value of the contract $200. Alice and Bob decide that the contract represents a BTC/USD value. Alice bets that the BTC price will go up, and Bob bets that the BTC price will go down, they then agree on an expiry date for this bet. Since this is a synthetic contract, no BTC is actually bought. All they do is take the current USD price of BTC as a starting point, place their bets and wait until the expiry date."),(0,r.kt)("p",null,"If the value of BTC goes up 20% in the set period of the bet, Alice's $100 should now be worth $120. As agreed on, Alice and Bob split the difference. Alice gets $100 + ($20/2) = $110 and Bob gets $100 - ($20/2) = $90. (In this example, if the value of BTC goes up more than 100%, Alice would get $200 and Bob $0.)"),(0,r.kt)("p",null,"Simple as that. ",(0,r.kt)("strong",{parentName:"p"},"This is how you speculate on the price of BTC without buying any BTC.")),(0,r.kt)("p",null,"Conversely, if the value of BTC goes down 20% in the set period of the bet, Alice's $100 should now be worth $80. As agreed on, Alice and Bob would split the difference. Alice gets $100 - ($20/2) = $90 and Bob gets $100 + ($20/2) = $110."),(0,r.kt)("p",null,"As you don't actually purchase the asset, synthetics are particularly interesting for assets that have very low liquidity, are hard to transact, or are simply not available to trade."),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(2433).Z})),(0,r.kt)("small",{className:"figure"},"FIGURE 1: Illustration of the synthethic contract between Alice and Bob"),(0,r.kt)("h2",{id:"synthetics--blockchain"},"Synthetics & Blockchain"),(0,r.kt)("p",null,"Synthetics have existed way before their use in blockchain, but it's unlikely that you've heard of them before. Why? Because without blockchain, synthetics are \"paper bets\" only enforceable by legal contracts that are difficult and expensive to set up. That's why only banks and big investment firms were able to use synthetics so far. Now that the outcomes of the bets can be settled and enforced automatically through smart contracts, anyone can, with ease, get access to synthetic investments."),(0,r.kt)("p",null,"Of course, it would be pretty tricky for you to find another person on your own, willing to open a synthetic option with you, which is why most people still need an exchange to put you in contact with other traders and to provide you with an easy-to-use interface. However, remember that synthetics are peer-to-peer, so the exchange should not have any access to your tokens."),(0,r.kt)("h2",{id:"synthetics-vs-wrapped-asset"},"Synthetics Vs. Wrapped Asset"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Synthetics")," are not to be confused with ",(0,r.kt)("em",{parentName:"p"},"Wrapped Assets"),". As seen in the ",(0,r.kt)("a",{parentName:"p",href:"/defi/wrapped-assets"},"previous chapter"),", a wrapped asset represents the actual asset and can be exchanged 1:1 against that asset. A synthetic represents your share of a bet against the other players. Anything can be bet upon, as long as you have an oracle that updates prices to the synthetic smart contract. For example, we could just as easily imagine synthetics been used on stocks like Apple, Tesla, etc."),(0,r.kt)("h2",{id:"risks"},"Risks"),(0,r.kt)("p",null,"As with any trading, synthetics are risky in their nature. You can lose your investment if the assets you bet on go the opposite way of your bet."),(0,r.kt)("p",null,"Note that to settle the bet, synthetics contracts use ",(0,r.kt)("a",{parentName:"p",href:"/defi/orcales"},"orcales")," to fetch the underlying asset's price. There have been ",(0,r.kt)("a",{parentName:"p",href:"https://blog.synthetix.io/response-to-oracle-incident/"},"countless oracle incidents")," where the asset price in the smart contract loses its peg to the actual asset."),(0,r.kt)("h2",{id:"synthetics-on-tezos"},"Synthetics on Tezos"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://www.publish0x.com/publish0x-posts/sexp-a-tezos-based-synthetic-exchange-xmkjjzq"},(0,r.kt)("em",{parentName:"a"},"SEXP"))," is a synthetics exchange on Tezos currently in development. ",(0,r.kt)("em",{parentName:"p"},"SEXP")," will use Harbinger oracles and use Tezos staking rewards to provide an entirely free service. The token standard will be ",(0,r.kt)("a",{parentName:"p",href:"/defi/token-standards"},"FA2"),", and the web app will work with all that wallets that support ",(0,r.kt)("a",{parentName:"p",href:"https://www.walletbeacon.io/"},"Beacon"),"."),(0,r.kt)("h2",{id:"references"},"References"),(0,r.kt)("p",null,"[1]"," ",(0,r.kt)("a",{parentName:"p",href:"https://www.publish0x.com/publish0x-posts/sexp-a-tezos-based-synthetic-exchange-xmkjjzq"},"https://www.publish0x.com/publish0x-posts/sexp-a-tezos-based-synthetic-exchange-xmkjjzq")))}h.isMDXComponent=!0},2433:function(e,t,n){"use strict";t.Z=n.p+"assets/images/synthetic-c0c859a240deed84e8d7929aa8fbeb12.svg"}}]);