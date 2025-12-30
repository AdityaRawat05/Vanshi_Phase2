# Vanshi Smart Contracts

This directory contains the core blockchain logic for the Vanshi Platform:
1.  **VanshiCredit.sol**: Registry of Projects & ERC1155 Token.
2.  **VanshiMarketplace.sol**: Decentralized exchange for buying credits.

## 🛠️ Setup & Installation

### 1. Prerequisites
*   Node.js (v18 or later)
*   Windows/Linux/Mac Terminal

### 2. Install Dependencies
```bash
cd contracts
npm install
```

### 3. Compile Contracts
```bash
npx hardhat compile
```

### 4. Run Tests
**Manual End-to-End Test (Recommended):**
This runs a full simulation of the lifecycle (Deploy -> Create Project -> Mint -> Buy).
```bash
npx hardhat run scripts/manual_test_flow.js
```

**Unit Tests:**
```bash
npx hardhat test
```

---

## 🔌 Backend Integration Guide

The Backend (Node.js/Next.js) interacts with the blockchain using the `ethers.js` library. The Backend acts as the **Admin** to create projects and mint credits.

### 1. Connecting (Ethers v6)

```javascript
const { ethers } = require("ethers");
const VANSHI_CREDIT_ABI = require("./artifacts/contracts/VanshiCredit.sol/VanshiCredit.json").abi;

// 1. Setup Provider (Connection to Blockchain)
// For local hardhat: 'http://127.0.0.1:8545'
// For Testnet: 'https://sepolia.infura.io/v3/YOUR-KEY'
const provider = new ethers.JsonRpcProvider("RPC_URL_HERE");

// 2. Setup Signer (The Admin Wallet)
const privateKey = "ADMIN_PRIVATE_KEY"; 
const wallet = new ethers.Wallet(privateKey, provider);

// 3. Connect to Contract
const creditContractAddress = "DEPLOYED_CONTRACT_ADDRESS";
const creditContract = new ethers.Contract(creditContractAddress, VANSHI_CREDIT_ABI, wallet);
```

### 2. Common Admin Actions

#### A. Create a New Project
Call this when a developer submits a project and it is verified.
```javascript
async function createProject(developerAddress, cap, price, vintage, metadataUrl) {
    try {
        // Price must be converted to BigInt/Wei (e.g. 50 USDC = 50 * 10^18)
        const priceInWei = ethers.parseUnits(price.toString(), 18); 

        const tx = await creditContract.createProject(
            developerAddress,
            cap,
            priceInWei,
            vintage,
            metadataUrl
        );
        
        console.log("Tx Sent:", tx.hash);
        await tx.wait(); // Wait for confirmation
        console.log("Project Created!");
    } catch (error) {
        console.error("Error creating project:", error);
    }
}
```

#### B. Mint Credits
Call this to issue credits to the developer.
```javascript
async function mintCredits(projectId, amount) {
    const tx = await creditContract.mintCredits(projectId, amount);
    await tx.wait();
    console.log(`Minted ${amount} credits for Project ${projectId}`);
}
```

#### C. Listen for Sales (Webhooks)
To update your database when a sale happens on-chain.
```javascript
// Listen to 'CreditsBought' event from Marketplace Contract
marketplaceContract.on("CreditsBought", (buyer, projectId, amount, totalCost, fee) => {
    console.log(`New Sale! Buyer: ${buyer}, Project: ${projectId}, Amount: ${amount}`);
    // TODO: Update database records
});
```

### 3. Addresses & ABI
After deployment, you will need two things to connect:
1.  **Address**: The hex string where the contract lives (e.g., `0x5FbDB...`).
2.  **ABI**: The JSON file describing functions (Found in `artifacts/contracts/.../VanshiCredit.json`).
