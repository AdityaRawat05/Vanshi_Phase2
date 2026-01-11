const hre = require("hardhat");

async function main() {
    console.log("--- Starting Deployment to network:", hre.network.name, "---");

    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

    // 1. Deploy MockUSDC (Fake Money for testing)
    console.log("\n1. Deploying MockUSDC...");
    const MockUSDC = await hre.ethers.getContractFactory("MockUSDC");
    const usdc = await MockUSDC.deploy();
    await usdc.waitForDeployment();
    console.log("✅ MockUSDC deployed to:", usdc.target);

    // 2. Deploy VanshiCredit (The Token/Registry)
    console.log("\n2. Deploying VanshiCredit...");
    const VanshiCredit = await hre.ethers.getContractFactory("VanshiCredit");
    const credit = await VanshiCredit.deploy();
    await credit.waitForDeployment();
    console.log("✅ VanshiCredit deployed to:", credit.target);

    // 3. Deploy VanshiMarketplace (The Shop)
    console.log("\n3. Deploying VanshiMarketplace...");
    // Treasury will be the deployer for now
    const treasuryAddress = deployer.address;
    const platformFeeBps = 250; // 2.5%

    const VanshiMarketplace = await hre.ethers.getContractFactory("VanshiMarketplace");
    const marketplace = await VanshiMarketplace.deploy(
        credit.target,
        usdc.target,
        treasuryAddress,
        platformFeeBps
    );
    await marketplace.waitForDeployment();
    console.log("✅ VanshiMarketplace deployed to:", marketplace.target);

    console.log("\n--- Deployment Complete ---");
    console.log("Copy these addresses to your Backend .env file:");
    console.log(`VANSHI_CREDIT_ADDRESS=${credit.target}`);
    console.log(`VANSHI_MARKETPLACE_ADDRESS=${marketplace.target}`);
    console.log(`USDC_ADDRESS=${usdc.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
