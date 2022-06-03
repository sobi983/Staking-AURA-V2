const { expect } = require("chai");
// const { ethers } = require("hardhat");


describe("Staking contract ",  function () {
  let balanceOfOwner;
  it("Balance should be assigned to the owner", async function () {
    const [owner, staker] = await ethers.getSigners()

    const _AURADeploy =  await ethers.getContractFactory("AURA")
    
    
    const _AURAStakingDeploy = await ethers.getContractFactory("AURAStaking")
  
    const _aura = await _AURADeploy.deploy()
    const _auraStaking = await _AURAStakingDeploy.deploy(_aura.address, 100, 10)
  
    _aura.deployed()
    _auraStaking.deployed()
    
    
   balanceOfOwner = await _aura.balanceOf(owner.address)
    expect(balanceOfOwner).to.equal("100000000000000000000000000")
  });

  it("Invalid number assigned to the owner on deploying the contract",async function () {

    expect(balanceOfOwner).to.equal("100000000000000000000000000")
  });
});
 
