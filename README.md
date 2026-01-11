# 🌱 VANSHI

> **Live Link:** [vanshi-murex.vercel.app](https://vanshi-murex.vercel.app/) <br>
> **Demo Video:** [Watch Video](https://drive.google.com/file/d/1MzYgxs4N3Qy0qpLMQ8HXDCANpFYPLT1E/view?usp=drivesdk) <br>
> **Project Explanation:** [Watch Video](https://drive.google.com/file/d/1T4YZkm9MVB9vtZ1dL5MvTVQSlMJhKRo7/view?usp=sharing)

**Satellite-Verified Carbon Credit Infrastructure for Community Forests**

A multi-service platform that uses satellite imagery, carbon science, and blockchain to turn community-managed forests into verifiable, tradable carbon assets.

The system eliminates greenwashing by enforcing environmental truth off-chain and financial truth on-chain.

---

## Table of Contents

[Project Overview](#project-overview)

[Problem Statement and Motivation](#problem-statement-and-motivation)

[Features](#features)

[System Architecture](#system-architecture)
- [Architecture Diagram](#architecture-diagram)

[End-to-End System Flow](#end-to-end-system-flow)  
- [Forest Registration Flow](#forest-registration-flow)  
- [Satellite Verification Flow](#satellite-verification-flow)  
- [Carbon Credit Calculation Flow](#carbon-credit-calculation-flow)
- [Carbon Verification Data Flow](#carbon-verification-data-flow)

[Core Components](#core-components)  
- [Satellite & NDVI Engine](#satellite--ndvi-engine)  
- [Carbon Accounting Engine](#carbon-accounting-engine)  
- [Marketplace & Blockchain](#marketplace--blockchain)

[Database Design](#database-design)  
- [Core Entities](#core-entities)

[Security and Authentication](#security-and-authentication)  
- [Authentication Flow](#authentication-flow)
- [Roles](#roles)
- [Smart Contract Enforcement](#smart-contract-enforcement)

[Deployment and Scaling](#deployment-and-scaling)  
- [Horizontal Scaling](#horizontal-scaling)  
- [Infrastructure](#infrastructure)

[Developer Setup](#developer-setup)  
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)

[API Endpoints](#api-endpoints)

[Testing](#testing)

[Monitoring & Observability](#monitoring--observability)



[Contributing](#contributing)

[License](#license)

[Contact & Support](#contact--support)



---

## Project Overview

VANSHI is a satellite-verified carbon credit platform that connects village-managed forests directly with carbon credit buyers.

The system verifies forest existence and health using satellite imagery, calculates carbon credits using transparent rule-based logic, and ensures trusted ownership and retirement through blockchain. Heavy computation remains off-chain, while blockchain is used only for immutability and auditability.

By removing manual surveys and middlemen, VANSHI reduces verification cost, increases trust in carbon credits, and enables communities to benefit from forest conservation while giving companies verifiable offsets.

---
## Problem Statement and Motivation
Problem Statement and Motivation

Village and community forests are actively protected by local people, but this environmental effort is largely unrecognized and unpaid. At the same time, companies are increasingly required—by regulation and ESG commitments—to purchase verified carbon credits to offset emissions.

The current carbon market has three major issues:

    -Forest verification relies on expensive manual surveys

    -Middlemen and third parties dominate certification

    -Buyers struggle to trust the authenticity of credits

As a result, genuine forests fail to access carbon markets, and companies lack reliable, transparent carbon offsets.

VANSHI is motivated by this gap—to create a low-cost, scalable, and trusted bridge between forest communities and carbon credit buyers using objective satellite verification instead of manual claims.

---
## Features

- ✅ Forest Registration using geo-coordinates and polygon boundaries
- ✅ NDVI-based forest health classification
- ✅ Rule-based carbon credit calculation
- ✅ Admin-verified credit issuance
- ✅ ERC-1155 blockchain minting
- ✅ USDC-based marketplace
- ✅ On-chain credit retirement (burn)
- ✅ Public proof of offset

---

## System Architecture

VANSHI uses a **service-oriented architecture** that separates science, finance, and trust.
VANSHI follows a modular, layered architecture designed to separate concerns, improve scalability, and ensure trust in carbon credit generation.

The system is divided into three primary layers:

1. Application Layer

This layer includes the web interface used by village users, admins, and companies. It handles forest registration, verification status tracking, marketplace access, and credit retirement visibility. All interactions happen through secure APIs.

2. Processing & Verification Layer

This layer contains backend services responsible for:

Forest registration and validation

Satellite-based NDVI computation

Forest density classification

Carbon credit calculation

All heavy computation, including satellite analysis and carbon estimation, is handled off-chain to keep the system efficient and scalable.

3. Trust & Settlement Layer

This layer uses blockchain to enforce trust. It handles:

Carbon credit minting

Ownership transfers

Credit retirement (burning)

Blockchain is used only where immutability and auditability are required, ensuring transparency without unnecessary cost.

Off-Chain vs On-Chain Design

Off-Chain: Satellite processing, NDVI analysis, carbon calculations, reports

On-Chain: Credit issuance, ownership tracking, and retirement

This separation ensures VANSHI remains cost-effective, auditable, and scalable, while preventing greenwashing and double counting.

### Architecture Diagram

![System Architecture 1](./staticFiles/systemArcitecture1.png)

![System Architecture 2](./staticFiles/systemArcitecture2.png)

---

## High-Level Architecture

**Logic:**
```
Users → API Gateway → Core Services → Data Layer → Blockchain
```

**Layers:**

| Layer | Components | Purpose |
|-------|-----------|---------|
| **Frontend** | Village portal, Admin panel, Company dashboard | User interfaces for different roles |
| **Backend APIs** | Forest API, NDVI API, Carbon API, Transaction API | Business logic & orchestration |
| **Data** | PostgreSQL + Redis | Persistent & cached state |
| **Blockchain** | Polygon + ERC-1155 contracts | Immutable credit ownership & retirement |
| **Satellite** | Google Earth Engine + Sentinel-2 | Independent environmental verification |

---
## End-to-End System Flow

![Data Flow Diagram](./staticFiles/DFD.png)

![Complete End-to-End Flow](./staticFiles/CompleteEndToEndFlow.png)



### Forest Registration Flow

This flow captures how forest data enters the system in a standardized and secure way.

1. Village user enters forest details (latitude, longitude, area)
   ↓
2. Backend validates inputs and checks for unrealistic values
   ↓
3. Polygon boundary is auto-generated from claimed area
   ↓
4. Forest is stored with status = PENDING_VERIFICATION 

Guarantees:
   -No manual boundary manipulation
   -No exaggerated forest area
   -All forests follow a uniform spatial format

### Satellite Verification Flow
 
This flow ensures forests are verified objectively using satellite data.

1. Pending forest is picked from verification queue
   ↓
2. Satellite imagery is fetched (Sentinel-2)
   ↓
3. NDVI is computed over the entire polygon
   ↓
4. Vegetation health is assessed
   ↓
5. Forest is classified or rejected

Guarantees:
  -No self-reported forest health
  -Satellite-only verification
  -Rejected forests never enter carbon calculation

### Carbon Credit Calculation Flow

This flow converts verified forest health into carbon credits.

```
1. Verified forest density is selected
   ↓
2. Rule-based carbon rate is applied
   ↓
3. Carbon credits are calculated (Area × Rate)
   ↓
4. Credits are recorded and locked for approval
```

Guarantees:
  -No manual carbon input
  -Transparent and explainable logic
  -Same rules applied to all forests


### Carbon Verification Data Flow

The **verification pipeline** ensures no greenwashing:

```
1. Village submits forest boundary
   ↓
2. Satellite NDVI is computed (Sentinel-2)
   ↓
3. Carbon is calculated (rule-based)
   ↓
4. Admin approves the forest
   ↓
5. Blockchain mints credits (ERC-1155)
   ↓
6. Company buys credits (USDC payment)
   ↓
7. Company burns credits (retirement)
   ↓
8. Public proof is created (on-chain)
```

**Key Guarantees:**
- No credit exists without satellite proof
- No credit is counted twice
- All transactions are auditable
- Retirement is permanent and verifiable

---

## Core Components

### Satellite & NDVI Engine

The Satellite & NDVI Engine is the scientific verification layer of VANSHI. It objectively verifies forest health using satellite imagery, without manual input or self-reported data.

Satellite: Sentinel-2 (ESA)

Platform: Google Earth Engine

Data Type: Surface Reflectance imagery

Forest health is measured using NDVI (Normalized Difference Vegetation Index):

NDVI = (NIR − RED) / (NIR + RED)
   -RED: Sentinel-2 Band B4
   -NIR: Sentinel-2 Band B8

A polygon is automatically generated from the claimed forest area. NDVI is computed across all pixels within the polygon, and the mean NDVI represents forest health. Cloud-affected pixels are filtered using Sentinel-2 quality masks to ensure consistency.

Forests are classified using fixed thresholds:

    -NDVI ≥ 0.65: Dense
    -0.45 – 0.65: Moderate
    -0.30 – 0.45: Sparse
    < 0.30: Rejected

The NDVI engine outputs the mean NDVI value, forest density class, and polygon area, which together form the only input for carbon credit calculation. Manual modification of these values is not permitted.

This design ensures verification is objective, explainable, auditable, and scalable, forming a strong anti-greenwashing foundation.


---
### Carbon Accounting Engine

**Service:** `carbon-engine` (Python)

**Responsibilities:**
- Convert NDVI class → carbon rate (tons CO2e/hectare)
- Multiply by forest area
- Produce total carbon credits
- Store result as static `CarbonAsset`

**This value never changes unless re-verified.**

**Carbon Calculation:**
```
Biomass = a * NDVI^b  (forest-type specific)
CO2e = Biomass * Carbon_Coefficient * Time_Period
Credits = CO2e / 1000  (tCO2e per credit)
```

---

### Marketplace & Blockchain

| Contract | Purpose |
| :--- | :--- |
| `VanshiCredit` | ERC-1155 token for carbon units |
| `VanshiMarketplace` | Trading logic (USDC ↔ Credits) |

**Core Functions:**
* ✅ **Mint**: Create carbon credits after admin approval
* ✅ **Transfer**: Move credits when companies buy
* ✅ **Burn**: Retire credits permanently
* ✅ **Query**: Check ownership and history

**Blockchain Guarantees:**
* **No double minting**
* **No resale after burn**
* **Public audit trail**
* **Immutable retirement proof**

---



## Database Design

VANSHI uses **PostgreSQL** for all off-chain truth.

![Database Schema](./staticFiles/DatabaseSchema.png)

### Core Entities

```sql
-- Villages and forest owners
USERS (id, email, wallet_address, role, created_at)

-- Registered forest land
FOREST_LAND (id, owner_id, geometry, area_hectares, status, created_at)

-- Satellite-verified NDVI data
NDVI_DATA (id, forest_id, ndvi_value, confidence, date_computed, imagery_date)

-- Carbon estimates (immutable once approved)
CARBON_ASSET (id, forest_id, total_credits, vintage_year, status, approved_by, approved_at)

-- User's current credit balance
CARBON_CREDIT_BALANCE (user_id, total_credits, available_credits, retired_credits)

-- Corporate buyers
COMPANY (id, name, wallet_address, sector, created_at)

-- All transactions (buy, sell, retire)
TRANSACTIONS (id, buyer_id, seller_id, credits, price_usd, tx_hash, status, created_at)
```

**These tables ensure:**
- Every forest is owned
- Every forest is verified
- Every carbon credit is tracked
- Every transaction is auditable

---

## Security and Authentication

VANSHI uses **dual-identity security:**

| Layer | Purpose | Mechanism |
|-------|---------|-----------|
| **JWT Login** | Web access & roles | Token-based auth for API |
| **Wallet** | On-chain asset ownership | Digital signature for blockchain |

### Authentication Flow

![Blockchain and Auth Flow](./staticFiles/BlockChainAndAuthFlow.png)

```
User → Backend Login → JWT Token → Frontend Storage
                     ↓
                  API Requests with JWT

User → Wallet Connect → MetaMask Signature → Smart Contract
                      ↓
                   On-Chain Transactions
```

### Roles

| Role | Permissions |
|------|-------------|
| **VILLAGE** | Register forests, receive payments |
| **COMPANY** | Buy credits, burn credits, request verification |
| **ADMIN** | Approve forests, trigger minting, manage settings |

### Smart Contract Enforcement

- Only admin wallet can call `mintCredits()`
- Only credit owner can call `burnCredits()`
- Transfer logic validated in contract
- Event logging for all state changes

---

## Deployment and Scaling

![Deployment Flow](./staticFiles/DeployementFlow.png)

VANSHI scales using **three independent pipelines:**

| Traffic Type | Scaling Method | Max Capacity |
|--------------|----------------|--------------|
| **UI Users** | Load balancer + API pod autoscaling | 100,000+ concurrent |
| **NDVI Jobs** | Queue + worker autoscaling | 1,000+ parallel jobs |
| **Blockchain** | Multiple signing gateways + batching | 10,000+ TPS |

### Horizontal Scaling

**This allows:**
- 10 villages → same system, same cost
- 10,000 villages → same system, 1000x cost (linear scaling)
- Only worker count changes, no code changes

### Infrastructure

```
┌─ Frontend (Vercel CDN) → Static assets cached globally
├─ Backend (Kubernetes) → Auto-scales based on load
├─ GEE Service (Worker Pods) → Queue-driven, scales with job depth
├─ Database (Postgres Primary + Replicas) → Read replicas for scaling
└─ Blockchain (Polygon Amoy → Mainnet) → Layer-2 handles throughput
```

[Research Work](https://drive.google.com/file/d/1kM_ryC1mwCUKTXn4NI6qYcEQvO9HR_Nu/view?usp=sharing)

[References](https://drive.google.com/file/d/1S5DiqRcs9d9PK7uOm2cyrZmNOi5taTvS/view?usp=sharing)


---

## Developer Setup

### Prerequisites

- Node.js 16+ (backend, contracts)
- Python 3.9+ (GEE service)
- Git
- Docker (optional, for containerized services)
- PostgreSQL 12+ (local or managed)
- Hardhat (smart contract development)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/AdityaRawat05/Vanshi_Phase2.git
cd Vanshi_Phase2

# Backend Setup
cd backend
npm install
cp .env.example .env
# Edit .env with your database URL, API keys
npm run dev
# Server runs on http://localhost:3000

# GEE Service Setup
cd ../GEE-Service
pip install -r requirments.txt
# Create Google Cloud service account JSON file
export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account.json"
python app.py
# Service runs on http://localhost:5000

# Smart Contracts Setup
cd ../contracts
npm install
# Create .env with private key
npx hardhat node
# Local blockchain runs on http://localhost:8545

# In another terminal, deploy contracts
npx hardhat run scripts/deploy.js --network localhost

# Frontend Setup
cd ../frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### Environment Variables

**Backend** (`.env`):
```
DATABASE_URL=postgresql://user:pass@localhost:5432/vanshi
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
GOOGLE_CREDENTIALS_PATH=/path/to/service-account.json
BLOCKCHAIN_RPC=https://rpc-amoy.polygon.technology/
CONTRACT_ADDRESS=0x...
ADMIN_WALLET=0x...
```

**GEE Service** (`.env`):
```
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
API_KEY=your-gee-api-key
DATABASE_URL=postgresql://user:pass@localhost:5432/vanshi
```

**Contracts** (`.env`):
```
PRIVATE_KEY=your-wallet-private-key
POLYGON_RPC=https://rpc-amoy.polygon.technology/
USDC_ADDRESS=0x...
```

---

## API Endpoints

### Forest API

```
POST   /api/v1/forests            # Register new forest
GET    /api/v1/forests/:id        # Get forest details
GET    /api/v1/forests/:id/ndvi   # Get NDVI data
PUT    /api/v1/forests/:id        # Update forest metadata
DELETE /api/v1/forests/:id        # Remove forest (admin only)
```

### Carbon API

```
POST   /api/v1/carbon/:id/calculate  # Trigger carbon calculation
GET    /api/v1/carbon/:id            # Get carbon estimate
GET    /api/v1/carbon/:id/history    # Get calculation history
```

### Marketplace API

```
GET    /api/v1/marketplace/prices    # Current credit prices
POST   /api/v1/marketplace/buy        # Initiate credit purchase
POST   /api/v1/marketplace/sell       # List credits for sale
POST   /api/v1/marketplace/retire     # Burn credits
GET    /api/v1/marketplace/transactions  # Transaction history
```

### Admin API

```
GET    /api/v1/admin/pending-approvals   # Forest approval queue
POST   /api/v1/admin/approve/:id         # Approve forest & mint credits
POST   /api/v1/admin/settings            # Update system settings
```

---

## Testing

```bash
# Backend tests
cd backend
npm test

# Contract tests
cd contracts
npx hardhat test

# Load testing
npm install -g k6
k6 run tests/load-test.js
```

---

## Monitoring & Observability

**Key Metrics:**
- API response time (target: <200ms p95)
- NDVI job queue depth
- Blockchain transaction confirmation time
- Credit minting success rate
- Database replication lag

**Monitoring Stack:**
- Application: DataDog / New Relic
- Logs: ELK Stack / Loki
- Metrics: Prometheus / Grafana
- Tracing: Jaeger / Zipkin



## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License – see the LICENSE file for details.

---

## Contact & Support

- **Email:** ayushbutola13@gmail.com
- **GitHub Issues:** [Report bugs or request features](https://github.com/your-org/vanshi/issues)

---

**Built with ❤️ to verify environmental impact and combat greenwashing.**
