# <img src="CIPHERS1-02 (1).png" alt="CIPHERS | contracts" height="90px"> 

[![Docs](https://img.shields.io/badge/docs-%F0%9F%93%84-orange)](https://whitepaper.dragonsofmidgard.com/dragons-of-midgard/)
[![MIT License](https://codecov.io/gh/OpenZeppelin/openzeppelin-contracts/graph/badge.svg)](https://github.com/Dragons-Of-Midgard-Official/dragons-of-midgard-contracts)


# About The Project

This is a Staking contract created by CIPHERS ©️.
A user can stake it's ERC20 tokens into the contract. The APR in this project is static that will be initilize when deploying the contract. The APR can be chnaged from the defined function.

A user can claim it's reward at any time but the locking period will be definite. The claim will be calculated per second, the user can't withdraw it's deposites before the expiry time. 

APR = 30% (will be initilized when deploying the AURAStaking.sol)
Allocation Of Reward = 5 million (It can be changed later on by using `IncreaseAllowances` `DecreasesAllowances` functions.



![Webpage $AURA](https://github.com/sobi983/Satking-AURA-V2/blob/main/AURAWebpage1.png)

## Installation

Setup the hardhat enviornment 

```bash
  npm setup  //install relevant dependencies
  npm run compile //compile the contracts and create artifacts
  npm test //test the testing scripts
```
