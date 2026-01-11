const hre = require("hardhat");

async function main() {
    console.log("Deploying MockUSDC to Amoy...");
    const MockUSDC = await hre.ethers.getContractFactory("MockUSDC");
    const usdc = await MockUSDC.deploy();
    await usdc.waitForDeployment();
    console.log("✅ MockUSDC deployed to:", usdc.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
