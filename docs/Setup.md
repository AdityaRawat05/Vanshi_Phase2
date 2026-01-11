# 🛠️ VANSHI - Local Development Setup Guide

This guide provides the exact steps to run the VANSHI ecosystem on your local machine for development and testing.

---

## 📋 Prerequisites

Before starting, ensure you have the following installed:
1. **Node.js** (v18 or higher)
2. **Python** (v3.9 or higher)
3. **MongoDB** (Running locally on port `27017`)
4. **MetaMask** Browser Extension

---

## 🚀 Getting Started (Step-by-Step)

You will need **4 separate terminal windows** open.

### 1. Smart Contracts & Local Blockchain
First, start the local blockchain and deploy the contracts.

**Terminal 1 (Blockchain Node):**
```powershell
cd contracts
npm install
npx hardhat node
```
*Keep this terminal running.*

**Terminal 2 (Deploy Contracts):**
```powershell
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```
*Wait for it to finish and copy the deployed contract address if needed.*

---

### 2. Backend API Server
**Terminal 3:**
```powershell
cd backend
npm install
npm run dev
```
*The server will run at `http://localhost:5000`.*

---

### 3. GEE-Service (AI Analysis)
**Terminal 4:**
```powershell
cd GEE-Service
python -m venv venv
.\venv\Scripts\activate
pip install -r requirments.txt
$env:EE_SERVICE_ACCOUNT_KEY = Get-Content "C:\Users\Divyam Samant\Downloads\vanshi-5e782184a9e0.json" -Raw
python app.py
```
*The AI service will run at `http://localhost:8000`.*

---

### 4. Frontend (Web Interface)
**Terminal 5:**
```powershell
cd frontend
npm install
npm run dev
```
*The website will be available at **`http://localhost:5173`**.*

---

## 🦊 MetaMask Configuration

To interact with the local blockchain:
1. Open MetaMask.
2. Click the Network selector -> **Add Network**.
3. Choose **Add a network manually**.
4. **Network Name**: `Hardhat Local`
5. **New RPC URL**: `http://127.0.0.1:8545`
6. **Chain ID**: `31337`
7. **Currency Symbol**: `ETH`
8. Click **Save** and switch to this network.

---

## 🚑 Troubleshooting
*   **PostgreSQL Error**: If the database won’t connect, ensure PostgreSQL is running and your .env credentials are correct. Restart the service and recheck DB_HOST, DB_USER, and DB_PASSWORD.
*   **MongoDB Connection Error**: Ensure your local MongoDB service is started (`services.msc` on Windows -> MongoDB).
*   **Port 5000/5173 Already in Use**: Kill any existing processes or change the port in `.env` or `vite.config.js`.
*   **MetaMask Transaction Failing**: Reset your account in MetaMask (Settings -> Advanced -> Reset Account) to clear the nonce after restarting the Hardhat node.
