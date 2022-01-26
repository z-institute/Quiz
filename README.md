# Quiz

1. [Quiz_01.sol](./Quiz_01.sol): An ERC20 contract which can be minted for 0.1 ETH per token.
2. [Quiz_02.sol](./Quiz_02.sol): An ERC721 contract which can be minted and batch minted for 0.1 ETH per token.
3. [Quiz_03.sol](./Quiz_03.sol): A contract that can request random number using the Chainlink VRF library.

## Setup

Run the below command and open https://remix.ethereum.org

```bash
npm i
remixd -s $(pwd) --remix-ide https://remix.ethereum.org
```

## Initial Dependency Setup

```
npm install -g remixd
npm install @openzeppelin/contracts --save
npm install @chainlink/contracts --save
```
