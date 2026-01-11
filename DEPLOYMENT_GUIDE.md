# VANSHI - Complete Deployment Guide (Zero to Production)

This document provides a highly detailed, step-by-step walkthrough to deploy the entire VANSHI ecosystem (Frontend, Backend, AI Service, Blockchain, Database) to the cloud.

---

## 🏗️ Architecture Overview

| Component | Technology | Service Provider | Cost |
| :--- | :--- | :--- | :--- |
| **Frontend** | React + Vite | **Vercel** | Free |
| **Backend** | Node.js + Express | **Render.com** (Web Service) | Free / Cheap |
| **AI Service** | Python + Flask | **Render.com** (Web Service) | Free / Cheap |
| **Database** | MongoDB | **MongoDB Atlas** | Free (M0 Cluster) |
| **Blockchain** | Polygon Amoy | **Alchemy/Infura** (RPC) | Free Testnet |

---

## 📝 Phase 1: Preparation

1.  **Code Check**: Ensure your code is pushed to a **GitHub Repository**.
    *   Ideally, your repo structure should be:
        ```text
        /repo-root
          ├── frontend/
          ├── backend/
          ├── GEE-Service/
          └── contracts/
        ```
2.  **Wallet**: Have your **MetaMask Private Key** ready.
    *   *Export from MetaMask -> Account Details -> Show Private Key.*
    *   *Warning: Never share this key. Use a test dev wallet if possible.*
3.  **Google Credentials**: Have your `google-credentials.json` file ready for the GEE Service.

---

## 🗄️ Phase 2: Database Setup (MongoDB Atlas)

1.  **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up.
2.  **Create Cluster**: 
    *   Click **+ Create** button.
    *   Select **M0 Sandbox** (Free).
    *   Provider: AWS, Region: (Choose closest to you, e.g., N. Virginia).
    *   Click **Create Deployment**.
3.  **Create Database User**:
    *   Go to **Security -> Database Access**.
    *   Click **+ Add New Database User**.
    *   Authentication: Password.
    *   Username: `vanshi_admin` (or your choice).
    *   Password: **(Create a strong password and SAVE IT)**.
    *   Privileges: "Read and write to any database".
    *   Click **Add User**.
4.  **Network Access (IP Whitelist)**:
    *   Go to **Security -> Network Access**.
    *   Click **+ Add IP Address**.
    *   Click **Allow Access From Anywhere** (Includes `0.0.0.0/0`).
    *   Click **Confirm**.
5.  **Get Connection String**:
    *   Click **Database** (top left).
    *   Click **Connect** on your cluster.
    *   Choose **Drivers**.
    *   Copy the string (e.g., `mongodb+srv://vanshi_admin:<password>@cluster0.abcd.mongodb.net/?retryWrites=true&w=majority`).
    *   **Replace `<password>` with your actual password.**
    *   **Save this string.**

---

## ⛓️ Phase 3: Smart Contract Deployment

1.  **Setup RPC**:
    *   Go to **Alchemy.com** -> Create App -> Chain: Polygon Amoy.
    *   Copy the **HTTPS Key** (e.g., `https://polygon-amoy.g.alchemy.com/v2/your-key`).
2.  **Configure Hardhat**:
    *   In your local `contracts/` folder, create a `.env` file:
        ```env
        POLYGON_RPC_URL="https://polygon-amoy.g.alchemy.com/v2/your-key"
        PRIVATE_KEY="your-wallet-private-key-without-0x"
        ```
3.  **Deploy**:
    *   Open terminal in `contracts/`.
    *   Run: `npx hardhat run scripts/deploy.js --network amoy`
4.  **Save Address**:
    *   Terminal will output: `VanshiMarketplace deployed to: 0x123...`
    *   **Copy this address.**

---

## 🖥️ Phase 4: Backend Deployment (Render.com)

1.  **Create Service**:
    *   Log in to [Render Dashboard](https://dashboard.render.com).
    *   Click **New +** -> **Web Service**.
    *   Connect your GitHub repo.
2.  **Configure Settings**:
    *   **Name**: `vanshi-backend`
    *   **Root Directory**: `backend` (Important!)
    *   **Runtime**: Node
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
    *   **Instance Type**: Free (or Starter for better speed).
3.  **Environment Variables** (Scroll down to "Environment Variables"):
    *   Add the following keys and values:
        *   `MONGO_URI`: (Your MongoDB connection string from Phase 2)
        *   `PORT`: `10000`
        *   `PRIVATE_KEY`: (Your Wallet Private Key)
        *   `RPC_URL`: (Your Alchemy RPC URL from Phase 3)
        *   `CONTRACT_ADDRESS`: (The address from Phase 3)
        *   `JWT_SECRET`: (Create a random long string)
4.  **Deploy**: click **Create Web Service**.
5.  **Wait & Copy URL**:
    *   Wait for the "Live" badge.
    *   Copy the URL at the top (e.g., `https://vanshi-backend.onrender.com`).

---

## 🛰️ Phase 5: GEE Service Deployment (Render.com)

1.  **Create Service**:
    *   Dashboard -> **New +** -> **Web Service**.
    *   Connect Repo.
2.  **Configure Settings**:
    *   **Name**: `vanshi-gee-service`
    *   **Root Directory**: `GEE-Service`
    *   **Runtime**: Python 3
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `gunicorn app:app`
3.  **Secret File (Critical)**:
    *   Scroll to "Secret Files" section.
    *   Click **Add Secret File**.
    *   **Filename**: `/etc/secrets/google_creds.json`
    *   **Content**: Paste the *entire* content of your local `google-credentials.json` file here.
    *   Click **Save**.
4.  **Environment Variables**:
    *   `GOOGLE_APPLICATION_CREDENTIALS`: `/etc/secrets/google_creds.json`
    *   `PORT`: `10000`
5.  **Deploy**: Click Create.
6.  **Update Backend**:
    *   Copy this new service URL (e.g., `https://vanshi-gee.onrender.com`).
    *   Go back to **Phase 4 (Backend Service) -> Environment -> Add Variable**.
    *   Key: `GEE_SERVICE_URL`, Value: `https://vanshi-gee.onrender.com`.
    *   Save Changes (Backend will redeploy).

---

## 🎨 Phase 6: Frontend Deployment (Vercel)

1.  **Create Project**:
    *   Log in to [Vercel](https://vercel.com).
    *   Click **Add New** -> **Project**.
    *   Import your GitHub Repo.
2.  **Configure Project**:
    *   **Framework Preset**: Vite (should detect auto).
    *   **Root Directory**: Click "Edit" and select `frontend`.
3.  **Environment Variables**:
    *   Click "Environment Variables".
    *   Key: `VITE_API_BASE_URL`
    *   Value: (Your Render Backend URL, e.g., `https://vanshi-backend.onrender.com`)
    *   *Note: Ensure NO trailing slash `/` at the end.*
4.  **Deploy**: Click **Deploy**.
5.  **Success**:
    *   You will see a "Congratulations!" screen.
    *   Click **Continue to Dashboard**.
    *   Click **Visit** to see your live site (e.g., `https://vanshi-frontend.vercel.app`).

---

## 🚑 Troubleshooting

*   **CORS Error (Network Error)**: 
    *   Check Backend logs in Render. 
    *   Ensure `cors` in `server.js` allows `*` or your specific Vercel domain.
*   **Database Connection Failed**:
    *   Check "Network Access" in MongoDB Atlas. Did you add `0.0.0.0/0`?
    *   Check your password in the connection string (remove `<>`).
*   **GEE Error**:
    *   Check Render logs for the GEE service.
    *   Ensure the Secret File path `/etc/secrets/google_creds.json` matches exactly what you put in the env var.

---

**You are now fully deployed! 🚀**
