import hardhat from "hardhat";

const hre = hardhat;
async function main() {
 
 const Contract = await hre.ethers.deployContract("Movie");
 await Contract.waitForDeployment();
 console.log("Contracts deployed successfully",Contract.target);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});