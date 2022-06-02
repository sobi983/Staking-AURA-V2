# <img src="CIPHERS1-02 (1).png" alt="CIPHERS | contracts" height="90px"> 

[![Docs](https://img.shields.io/badge/docs-%F0%9F%93%84-orange)](https://whitepaper.dragonsofmidgard.com/dragons-of-midgard/)
[![MIT License](https://codecov.io/gh/OpenZeppelin/openzeppelin-contracts/graph/badge.svg)](https://github.com/Dragons-Of-Midgard-Official/dragons-of-midgard-contracts)


# About The Project

This is a Staking contract created by CIPHERS©️.
A user can stake it's ERC20 tokens into the contract. The APR in this project is static that will be initilize when deploying the contract. The APR can be chnaged from the defined function.

A user can claim it's reward at any time but the locking period will be definite. The claim will be calculated per second, the user can't withdraw it's deposites before the expiry time. 


**APR** = 30% (will be initilized when deploying the AURAStaking.sol).

**Allocation Of Reward** = 5 million (It can be changed later on by using `IncreaseAllowances` `DecreasesAllowances` functions.

**Time Period** = 14 days - 365 days.

![Webpage $AURA](https://github.com/sobi983/Satking-AURA-V2/blob/main/AURAWebpage1.png)

## Installation

Setup the hardhat enviornment 

```bash
  npm setup  //install relevant dependencies
  npm run compile //compile the contracts and create artifacts
  npm test //test the testing scripts
```

## Deployment

To deploy this project run

```bash
  npx hardhat run scripts/deploy.js --network rinkeby
```
To verify the contract
```bash
  npx hardhat verify --network rinkeby "ERC20(AURA) CONTRACT ADDRESS"
  npx hardhat verify --network rinkeby "STAKING CONTRACT ADDRESS" "ERC20(AURA) CONTRACT ADDRESS" "ALLOCATION OF REWARD - Integer" "MINIMUM STAKING AMOUNT - Integer"
```


## Run Locally

Clone the project

```bash
  git clone https://github.com/sobi983/Satking-AURA-V2
```

Change the network from **rinkeby** to **hardhat** in the ``hardhat.config.js`` file.

```bash
  module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
```

Install dependencies

```bash
  npm setup
```

Compile the contracts

```bash
  npm run compile
```

Run test cases
```bash
  npm test
```




## Function Description




| **Function**                    | **Parameters**                             |**Return**                  | **Description**                                                                                                                                        |
| :-------------------------------| :----------------------------------------- | :------------------------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `constructor()`(not a fucntion) | ```IERC20, uint256, uint256```             | none                       | ->The address of the ERC20 is initilized to the variable so the relevant function in the IERC20 can be used to interact with the deloyed ERC20, The APR and Minimum staking amount will be initilized        |
| `CurrentAPR()`                  | none                                       |`uint256`                   | ->This function returns the current APR( Annual Percentage Rate)                                                                                       |
|`ChangeAPR()`                    | `uint`                                     |`bool`                      | ->This function can only be executed by the owner and can be used to change the current APR
|`ChangeMinStakingAmount()`       |`uint256`                                   |`bool`                      | ->This function can only be executed by the owner and it can be used to change the minimum staking amount                                  |
|`MinStakingAmount()`             |none                                        |`uint256`                   | ->This function will return a minimum staking amount the user can stake in this contract|
|`AllocationOfRewards()`          |none                                        |`uint256`                   | ->This function will return the current remaining Rewards that can be given to the new users. **Note:-** When the user stakes the reward is calculated according to the locking period and is subtracted with the AllocationReward initially although the user haven't claimed any reward yet. This is because the rewards in the pool is limited, so we need to keep record of the AllocatedRewards|
|`IncreaseAllocationReward()`     |`uint256`                                   |`bool`                      | ->This function can only be executed by the owner. The function will increase the Allocation of the rewards in the pool, the `allocatedReward` variable will updated|
|`DecreaseAllocationReward()`     |`uint256`                                   |`bool`                      | ->This function can only be executed by the owner. The function will decrease the Allocation of the rewards in the pool, the `allocatedReward` variable will updated|
|`TransferAllocatedRewardFromContractToOwner()`|`uint256`                      |`bool`                      | ->This function can only be executed by the owner. The remaining rewards can be transferred to the owner if the staking contract is closed. This function prevents locking the tokens into this contract forever|
|`withdrawEther()`                |`none`                                      |`bool`                      | ->This function can only be executed by the owner. This function is created if bymistake someone sends ether to this contract.|
|`EmergencyWithdrawal()`          |```address, uint256```                      |`bool`                      | ->This function can only be executed by the owner. The function is created for the stakers, if any of the stakers willing to withdraw it's deposit then this function can be used to trasnfer the deposited amount back to the owner. **Note:-** First check the amount of the deposite of the user in the contract by using the function `CurrentlyStaked(address _user)`|
|`TotalWithdrawal()`              |`address`                                   |`uint256`                   | ->This function will return total claimed rewards of the user and after the expiration of the time period when the user will withdarw the deppsit the amount of deposit will also be added in the variable and return the value of **claimed+deposit**|
|`TotalPendingReward()`           |`address`                                   |`uint256`                   | ->This function will return the pending rewards of the user. A user can claim the reward at anytime. **Note:-** the reward of the user will be calculated per seconds
|`TotalAccumulatedReward()`       |`address`                                   |`uint256`                   | ->This function will return the total withdrawn claimed by the user|
|`CalculateReward()`              |```uint256, uint256```                      |`uint256`                   | ->This is core function of the staking pool. The function returns the reward of the user calculated with respect to the time and amount **Formula:-**`(APR * Amount * Time)/31536000/100`.|
|`TotalDelegates()`               | none                                       |`uint256`                   | ->This function returns the amount of the users that have currently staked into the pool|
|`CurrentlyStaked()`              |`address`                                   |`uint256`                   | ->This function returns the total amount depoit of the user in the staking pool|
|`HasStake()`                     |`address`                                   |`bool`                      | ->This function will return the boolean value, the user currently status of a staked in the pool|
|`TotalStakedInPool()`            |none                                        |`uint256`                   | ->This function will return the total ever amount stakes by the user in this pool| 
|`Stake()`                        |```uint256, uint256```                      |`bool`                      | ->This function will stake the user amount. Few required checks are made at the start of the function to prevent the pool from the false deposit. At the initial the user reward will be calculated and the time of staked and the expiry time fileds of the user in the `struct` will be updated. The `allocatedReward` variable will be updated assuming that the reward in the pool is deducted but in real the reward will not be transferred to the user. This technique is just proposed due to the limited Allocation reward amount. The user deposits will be trasnferred to the staking contract|
|`ReStake()`                      |```uint256, uint256```                      |`bool`                      | ->This function will be used only once the user has initally staked into the pool. If a user wants to stake it's token again then this function will be used. The `Stake()` cannot be used for restaking. This difference between the `ReStake()` && `Stake()` is kept by the `since` variable in the `struct`. if the user has never staked then obviosuly the stakign since time will be = 0. If the user have ever staked then the since will recorded and In that case the user can Restake. **IMPORTANT:-** if the user has sstaked multiple times! then the Locking period will be added to the previous one. For example:- _User1 has staked 10 Tokens at 100% APR for 1 year on 1st Jan, 2022. And again the _User1 has staked 10 tokens on 3rd Jan, 2022 for 1 year. Now the user can withdraw it's deposites after 2 years but the rewards will be more than 100%. because on the restaking the reward will not be calculated according to the the user current deposit e.g 10. The reward will be calculated by taking the currently staked by _User1 that is 10 tokens + 10 token for Restaking = 20 tokens. So the reward will be 20 Token when the user will restake for 1 year on 3rd Jan, 2022. Total reward = 10+20=> 30 tokens / Total deposite = 20 Tokens.|
|`UnStake()`                      |none                                        |`bool`                      | ->This function will be executed when the user wants to withdraw it's deposited amount. This function will trigger the withraw period and will extend the time period of the withdrawal to 7 days. A user can withdraw it's stakes after 7 days of calling the `UnStake()`|
|`Withdraw()`                     |none                                        |`bool`                      | ->This function can be executed after 7 days of calling `UnStake()` function.|
|`Claim()`                        |none                                        |`bool`                      | ->This function can be used by the users to claim their rewards at any moment. **NOTE:-** The rewards of the user will be calculated per second|




