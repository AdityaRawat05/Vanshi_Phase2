const hre = require("hardhat");
const fs = require("fs");

async function main() {
    console.log("--- Starting Deployment ---");
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deployer:", deployer.address);

    let usdcAddress;

    // Check for existing deployment
    if (fs.existsSync("deployed_addresses.txt")) {
        const content = fs.readFileSync("deployed_addresses.txt", "utf8");
        const match = content.match(/USDC_ADDRESS=(0x[a-fA-F0-9]{40})/);
        if (match) {
            usdcAddress = match[1];
            console.log("1. Found existing MockUSDC:", usdcAddress);
        }
    }

    // 1. MockUSDC
    if (!usdcAddress) {
        console.log("1. Deploying MockUSDC...");
        const MockUSDC = await hre.ethers.getContractFactory("MockUSDC");
        const usdc = await MockUSDC.deploy();
        await usdc.waitForDeployment();
        usdcAddress = usdc.target;
        console.log("MockUSDC Deployed:", usdcAddress);
        fs.writeFileSync("deployed_addresses.txt", `USDC_ADDRESS=${usdcAddress}\n`);
    }

    // 2. VanshiCredit
    console.log("2. Deploying VanshiCredit...");
    const VanshiCredit = await hre.ethers.getContractFactory("VanshiCredit");
    const credit = await VanshiCredit.deploy();
    await credit.waitForDeployment();
    console.log("VanshiCredit:", credit.target);
    fs.appendFileSync("deployed_addresses.txt", `VANSHI_CREDIT_ADDRESS=${credit.target}\n`);

    // 3. VanshiMarketplace
    console.log("3. Deploying VanshiMarketplace...");
    const VanshiMarketplace = await hre.ethers.getContractFactory("VanshiMarketplace");
    const marketplace = await VanshiMarketplace.deploy(
        credit.target,
        usdcAddress,
        deployer.address, // Treasury
        250 // Fee
    );
    await marketplace.waitForDeployment();
    console.log("VanshiMarketplace:", marketplace.target);
    fs.appendFileSync("deployed_addresses.txt", `VANSHI_MARKETPLACE_ADDRESS=${marketplace.target}\n`);

    console.log("--- ALL DONE ---");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
