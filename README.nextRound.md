# 🚀 Round-2 Improvements & Future Roadmap

This document outlines the strategic transition from the current **Vanshi Prototype** to a **Production-Grade Infrastructure**.

---

## 1. 📊 Evolution Strategy (Current vs. Round-2)

| Feature | 🚧 Current Prototype (v1) | 🚀 Round-2 Target (v2) |
| :--- | :--- | :--- |
| **Geometry Support** | Circular Approximation (Lat/Long + Radius) | **Exact Polygons** (GeoJSON/KML Upload) |
| **Analysis Window** | Single-Time Snapshot | **TimeSeries Analysis** (Monthly/Seasonal Trends) |
| **Estimation Logic** | Rule-Based (Dense/Sparse/Moderate) | **AI/ML Biomass Models** (Specific to forest type) |
| **Verification** | Manual Admin Approval | **Automated Deforestation Alerts** & On-Chain Audit Trails |
| **Governance** | Centralized Admin Control | **Multi-Sig & DAO** Community Voting |

---

## 2. 🌍 Advanced Spatial & Temporal Verification

To prevent "ghost forests" and ensure precise accounting:

*   **Boundary Precision**: Move from simple coordinates to **User-Uploaded Polygons**. This prevents claiming carbon credits for roads or rivers inside a forest area.
*   **Temporal Monitoring**: Instead of one-time checks, implement **Continuous Monitoring**.
    *   *Goal*: Check NDVI every 15 days using Sentinel-2.
    *   *Result*: Automated **Deforestation Alerts** if vegetation health drops suddenly.

---

## 3. 🧠 AI-Based Ecology Models

Moving beyond simple NDVI thresholds to true ecological modeling:

*   **Forest Type Classification**: Use machine learning to distinguish between *Monoculture Plantations* (lower value) and *Biodiverse Native Forests* (higher value).
*   **Biomass Estimation**: Integrate **GEDI (LiDAR)** data to estimate tree height and biomass volume, not just greenery.
*   **Anomaly Detection**: Automatically flag "too perfect" data or impossible growth rates that indicate fraud.

---

## 4. 🔐 Blockchain & Trust Architecture

Strengthening the "Trustless" layer of Vanshi:

*   **Proof of Verification (PoV)**: Store the **hash** of the satellite analysis report on-chain. This proves the data hasn't been tampered with after generation.
*   **Dynamic NFTs (dNFTs)**: Carbon credit tokens that change metadata based on real-time forest health (e.g., a token "wilts" if the forest degrades).
*   **Community DAO**: Allow villagers to vote on how carbon credit revenue is reinvested into conservation efforts.

---

## 5. 🏗 Why These Improvements Matter

1.  **Scientific Credibility**: Moving from "estimates" to "measurements" satisfies strict global standards (Verra/Gold Standard).
2.  **Fraud Resistance**: Continuous monitoring makes it impossible to cut down a forest after selling the credits.
3.  **Market Value**: Higher quality verification = Higher price per carbon credit for the villagers.

---

> **Round-2 Goal:** Transform VANSHI from a *verified prototype* into a *scalable, continuously monitored carbon infrastructure* for community forests.
