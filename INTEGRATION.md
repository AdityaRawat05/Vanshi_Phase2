# 🔌 Vanshi Smart Contract Integration Guide

This guide details how the Frontend and Backend should interact with the Vanshi contracts on the **Polygon Amoy Testnet**.

## 📜 Deployed Addresses (Polygon Amoy)
| Contract | Address | Purpose |
| :--- | :--- | :--- |
| **MockUSDC** | \`0x9569E675f83D80d1bB223033236ec990540Dc36F\` | Payment token (Fake USDC for testing) |
| **VanshiCredit** | \`0xD7b91a22098C5bB4F3a5d0e41FedFd413E3cb5A3\` | ERC-1155 Token representing carbon credits |
| **VanshiMarketplace** | \`0x546f538220F66Ae122Bafd426CC8f73C0f89FD5F\` | Marketplace to buy/sell credits |

## 🛠️ Setup for Frontend (React/Ethers.js)

### 1. Install Dependencies
\`\`\`bash
npm install ethers
\`\`\`

### 2. ABI Import
Copy the JSON files from `contracts/artifacts/contracts/...` to your frontend `src/abi/` folder.
*   `MockUSDC.json`
*   `VanshiCredit.json`
*   `VanshiMarketplace.json`

### 3. Connection Helper
\`\`\`javascript
import { ethers } from "ethers";
import MarketplaceABI from "./abi/VanshiMarketplace.json";
import TokenABI from "./abi/MockUSDC.json";

const MARKETPLACE_ADDRESS = "0x546f538220F66Ae122Bafd426CC8f73C0f89FD5F";
const USDC_ADDRESS = "0x9569E675f83D80d1bB223033236ec990540Dc36F";

export const getMarketplaceContract = async (signer) => {
    return new ethers.Contract(MARKETPLACE_ADDRESS, MarketplaceABI.abi, signer);
};

export const getUSDCContract = async (signer) => {
    return new ethers.Contract(USDC_ADDRESS, TokenABI.abi, signer);
};
\`\`\`

## 💻 Interaction Flows

### A. Buying Carbon Credits (User)
Users must **Approve** the marketplace to spend their USDC before they can buy.

\`\`\`javascript
async function buyCredit(projectId, amount) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const usdc = await getUSDCContract(signer);
    const market = await getMarketplaceContract(signer);

    // 1. Approve Marketplace to spend USDC (e.g., 50 USDC)
    const price = ethers.parseUnits("50", 6); // USDC has 6 decimals
    const tx1 = await usdc.approve(MARKETPLACE_ADDRESS, price);
    await tx1.wait();

    // 2. Buy Credit
    const tx2 = await market.buyCredit(projectId, amount);
    await tx2.wait();
    console.log("Purchase Successful!");
}
\`\`\`

### B. Registering a Project (Backend/Admin)
Only the **Backend** (using a private key) or an **Admin Wallet** should call this.

\`\`\`javascript
// Backend interaction using JsonRpcProvider
const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const market = new ethers.Contract(MARKETPLACE_ADDRESS, MarketplaceABI.abi, wallet);

async function registerProject(walletAddress, totalCredits) {
    const tx = await market.listProject(
        walletAddress, 
        totalCredits, 
        ethers.parseUnits("10", 6) // Price per credit (10 USDC)
    );
    await tx.wait();
    console.log("Project Listed!");
}
\`\`\`

## 🔍 Verification
You can verify transactions on the Amoy Explorer:
[https://amoy.polygonscan.com/](https://amoy.polygonscan.com/)
