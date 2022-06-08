
async function main() {
  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account:", deployer.address); 

  const AURA = await hre.ethers.getContractFactory("AURA"); // Getting the Contract
  const AURAStaking = await hre.ethers.getContractFactory("AURAStaking"); // Getting the Contract
  const aura = await AURA.deploy(); //deploying the contract
  const staking = await AURAStaking.deploy(aura.address, 30, 1000); //deploying the contract

  await aura.deployed(); // waiting for the contract to be deployed
  await staking.deployed(); // waiting for the contract to be deployed

  console.log("AURA deployed to:", aura.address); // Returning the contract address on the rinkeby
  console.log("Staking deployed to:", staking.address); // Returning the contract address on the rinkeby
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 