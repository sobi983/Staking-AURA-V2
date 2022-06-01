// SPDX-License-Identifier: MIT
// Author: Sobi (Ciphers)

pragma solidity ^0.8.4;


interface UserStats{
  function TotalDelegates() external view returns(uint256);
  function CurrentlyStaked(address) external view returns(uint256);
  function TotalWithdrawal(address) external view returns(uint256);
  function TotalPendingReward(address) external view returns(uint256);
  function TotalAccumulatedReward(address) external view returns(uint256);
  function HasStake(address) external view returns(bool);
}

interface Reward{
  function CurrentAPR()external  view returns(uint256);
  function TotalStakedInPool()external view returns(uint256);
  function MinStakingAmount()external  view returns(uint256);
  function IncreaseAllocationReward(uint256 )external returns(bool);
  function DecreaseAllocationReward(uint256)external  returns(bool);
  function TransferAllocatedRewardFromContractToOwner(uint256 amount)external returns(bool);
  function AllocationOfRewards() external view returns(uint256);  //Current status of rewrads to give remaining in the pool
  function ChangeAPR(uint256 ) external returns(bool);
  function ChangeMinStakingAmount(uint256) external returns(bool);
}

interface Staking{
  function CalculateReward(uint256,uint256) external view returns(uint256);
  function Stake(uint256,uint256) external returns(bool);
  function ReStake(uint256,uint256) external returns(bool);
  function UnStake() external returns(bool);
  function Withdraw() external returns(bool);
  function Claim() external returns(bool);
  function EmergencyWithdrawal(address _user, uint256 _amount) external returns(bool);
}
