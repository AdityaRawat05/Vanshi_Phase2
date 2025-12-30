const hre = require("hardhat");

async function main() {
    console.log("\n--- STARTING MANUAL TEST FLOW ---\n");
    const [admin, developer, buyer, treasury] = await hre.ethers.getSigners();
    console.log(`Admin/Backend: ${admin.address}`);
    console.log(`Developer:     ${developer.address}`);
    console.log(`Buyer:         ${buyer.address}`);
    console.log(`Treasury:      ${treasury.address}`);

    // 1. DEPLOYMENT
    console.log("\n[1] Deploying Contracts...");
    const MockUSDC = await hre.ethers.getContractFactory("MockUSDC");
    const usdc = await MockUSDC.deploy();
    await usdc.waitForDeployment();
    console.log(` - MockUSDC: ${usdc.target}`);

    const VanshiCredit = await hre.ethers.getContractFactory("VanshiCredit");
    const credit = await VanshiCredit.deploy();
    await credit.waitForDeployment();
    console.log(` - VanshiCredit: ${credit.target}`);

    const VanshiMarketplace = await hre.ethers.getContractFactory("VanshiMarketplace");
    const marketplace = await VanshiMarketplace.deploy(
        credit.target,
        usdc.target,
        treasury.address,
        250 // 2.5% Fee
    );
    await marketplace.waitForDeployment();
    console.log(` - VanshiMarketplace: ${marketplace.target}`);

    // 2. SETUP PROJECT
    console.log("\n[2] Setting up Project (Backend)...");
    const price = hre.ethers.parseUnits("50", 18); // 50 USDC
    await credit.createProject(developer.address, 1000, price, 2024, "ipfs://meta");
    console.log(" - Project 1 created (Owner: Developer, Cap: 1000, Price: 50 USDC)");

    // 3. MINTING
    console.log("\n[3] Minting Credits (Backend)...");
    await credit.mintCredits(1, 100);
    console.log(" - Minted 100 Credits to Developer");

    // 4. APPROVALS
    console.log("\n[4] Approvals (User setup)...");
    // Developer allows Marketplace to sell their credits
    await credit.connect(developer).setApprovalForAll(marketplace.target, true);
    console.log(" - Developer approved Marketplace to sell credits");

    // Buyer gets some Mock USDC
    await usdc.mint(buyer.address, hre.ethers.parseUnits("1000", 18));
    // Buyer allows Marketplace to spend it
    await usdc.connect(buyer).approve(marketplace.target, hre.ethers.parseUnits("500", 18));
    console.log(" - Buyer minted 1000 USDC and approved Marketplace to spend 500");

    // 5. BUYING
    console.log("\n[5] Buying Credits (Buyer purchase)...");
    const buyAmount = 10;
    await marketplace.connect(buyer).buyCredits(1, buyAmount);
    console.log(` - Buyer bought ${buyAmount} credits`);

    // 6. VERIFICATION
    console.log("\n[6] Final Balance Check...");
    const buyerCredits = await credit.balanceOf(buyer.address, 1);
    const devCredits = await credit.balanceOf(developer.address, 1);
    const treasuryUsdc = await usdc.balanceOf(treasury.address);
    const devUsdc = await usdc.balanceOf(developer.address);

    console.log(` - Buyer Credits: ${buyerCredits} (Expected: 10)`);
    console.log(` - Dev Credits:   ${devCredits} (Expected: 90)`);
    console.log(` - Treasury USDC: ${hre.ethers.formatUnits(treasuryUsdc, 18)} (Expected: 12.5)`);
    console.log(` - Dev USDC:      ${hre.ethers.formatUnits(devUsdc, 18)} (Expected: 487.5)`);

    if (Number(buyerCredits) === 10 && Number(devCredits) === 90) {
        console.log("\n✅ SUCCESS: All checks passed!");
    } else {
        console.log("\n❌ FAILURE: Balances do not match expectations.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
