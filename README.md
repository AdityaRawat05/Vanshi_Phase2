🌱 VANSHI
Satellite-Verified Carbon Credit Infrastructure for Community Forests

🔗 Live Platform: https://vanshi-murex.vercel.app

🎥 Demo Video: https://drive.google.com/file/d/1MzYgxs4N3Qy0qpLMQ8HXDCANpFYPLT1E/view

📽️ Project Explanation: https://drive.google.com/file/d/1T4YZkm9MVB9vtZ1dL5MvTVQSlMJhKRo7/view

🌍 What is VANSHI?

VANSHI is a satellite-verified carbon credit infrastructure that converts real forest health into trustworthy, auditable carbon credits.

Unlike traditional carbon platforms that rely on manual surveys and opaque certification, VANSHI enforces:

Ecological truth off-chain (satellites & science)

Economic truth on-chain (blockchain & immutability)

This design eliminates greenwashing, reduces verification costs, and makes carbon markets accessible to community-managed forests.

🚨 Problem Statement
Why Carbon Markets Fail Today

Community forests protect vast areas of land but earn nothing for their environmental service.
At the same time, companies struggle to find trustworthy carbon credits.

Current System Issues

Expensive manual field surveys

Dominance of middlemen & certifiers

Self-reported forest data

Low buyer trust & high fraud risk

The Core Issue

❌ The problem is not carbon trading
✅ The problem is verification and trust at scale

💡 VANSHI’s Solution

VANSHI replaces manual trust with verifiable signals.

Traditional System	VANSHI
Manual audits	Satellite verification
Self-reported data	NDVI-based validation
Central registries	Blockchain ledger
High cost	Scalable automation
✨ Key Features

🌐 Forest registration using geo-coordinates

🛰️ Satellite-based NDVI verification (Sentinel-2)

📊 Rule-based carbon credit calculation

🛡️ Admin-verified issuance

🔗 ERC-1155 blockchain minting

💵 USDC-based carbon marketplace

🔥 On-chain credit retirement (burn)

📜 Public, auditable proof of offset

🧠 Core Design Philosophy
Trust by Design

Ecological Truth (Off-Chain)

Satellite imagery

NDVI vegetation analysis

Carbon science

Economic Truth (On-Chain)

Credit issuance

Ownership tracking

Permanent retirement

Satellites verify reality.
Blockchain guarantees ownership.

🏗️ System Architecture

VANSHI uses a service-oriented, layered architecture to ensure scalability and reliability.

Architecture Layers
Layer	Responsibility
Frontend	Village portal, Admin panel, Company dashboard
Backend Services	Forest, NDVI, Carbon, Transactions
Data Layer	PostgreSQL + Redis
Blockchain	Polygon + ERC-1155
Satellite	Sentinel-2 via Google Earth Engine

📌 Heavy computation stays off-chain.
📌 Blockchain is used only where immutability matters.

Architecture Diagrams




🔄 End-to-End System Flow
Forest Registration

Village submits coordinates & area

Backend validates inputs

Polygon boundary auto-generated

Forest stored as PENDING_VERIFICATION

Satellite Verification

Forest picked from verification queue

Sentinel-2 imagery fetched

NDVI computed over polygon

Forest classified or rejected

Carbon Credit Generation
Forest Area × Carbon Rate → Credits
1 Credit = 1 tCO₂e

Full Verification Pipeline
Forest → Satellite NDVI → Carbon Calculation
→ Admin Approval → Blockchain Mint
→ Company Purchase → Credit Burn


Guarantees

No credit without satellite proof

No double counting

Permanent retirement

🛰️ Satellite & NDVI Engine

Satellite: Sentinel-2 (ESA)

Platform: Google Earth Engine

Data: Surface Reflectance

NDVI Formula

(NIR − RED) / (NIR + RED)


Classification

NDVI	Forest Type
≥ 0.65	Dense
0.45–0.65	Moderate
0.30–0.45	Sparse
< 0.30	Rejected

📌 No manual edits allowed.
📌 Cloud-masked & deterministic.

🌱 Carbon Accounting Engine

Rule-based (no black-box ML)

Transparent & auditable

Carbon Logic

Credits = Area × Rate

Forest Type	tCO₂ / ha / year
Dense	28
Moderate	22
Sparse	15

Once approved, the carbon asset is immutable.

🔗 Marketplace & Blockchain

Contracts

VanshiCredit (ERC-1155)

VanshiMarketplace

Blockchain Guarantees

No double minting

No resale after burn

Public audit trail

Blockchain handles finality, not computation.

🗄️ Database Design

PostgreSQL stores all off-chain truth.

Key guarantees:

Every forest is owned

Every credit is verified

Every transaction is auditable

🔐 Security & Authentication

Dual Identity Model

JWT → platform access

Wallet → on-chain ownership

Roles

Role	Capability
Village	Register forests
Company	Buy & retire credits
Admin	Approve verification

Smart contracts enforce minting & burning rules.

📈 Deployment & Scaling

VANSHI scales linearly.

Component	Scaling Strategy
UI	CDN + static hosting
APIs	Stateless autoscaling
NDVI Jobs	Queue + workers
Blockchain	Layer-2 throughput

🧪 Testing & Monitoring

Metrics Tracked

API latency

NDVI job backlog

Mint success rate

Blockchain confirmation time

Tools

Prometheus + Grafana

ELK / Loki

Jaeger tracing

🤝 Contributing

Fork repo

Create feature branch

Commit & push

Open PR

📄 License

MIT License

📬 Contact

📧 Email: ayushbutola13@gmail.com

🐙 GitHub Issues: Report bugs or request features

🌱 Final Note

VANSHI is not a demo marketplace.
It is a trust infrastructure for climate accountability.
