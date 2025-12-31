# Vanshi – Forest Verification & Carbon Estimation (GEE Service)

This repository contains the **Python-based Google Earth Engine (GEE) microservice** used in the Vanshi platform to perform **satellite-driven forest verification and carbon credit estimation**.

The service provides an **objective, reproducible, and transparent verification layer** that operates independently from business logic and user management.

---

## 🌍 Problem Statement

Carbon credit systems often rely on manual surveys or self-reported data, which are:
*   **Expensive**
*   **Time-consuming**
*   **Prone to false claims**

This service addresses the problem by using **satellite imagery and automated verification** to assess forest health and estimate carbon sequestration potential.

---

## 🎯 Purpose of This Service

*   Verify forest health using **Sentinel-2 satellite data**
*   Automatically classify forests as **Dense, Moderate, Sparse, or Non-Forest**
*   Flag low-confidence cases for **manual review**
*   Estimate yearly carbon sequestration potential
*   Act as the **scientific source of truth** for the platform

---

## 🛰️ Data Source

| Parameter | Details |
| :--- | :--- |
| **Platform** | Google Earth Engine |
| **Satellite** | Sentinel-2 |
| **Dataset** | `COPERNICUS/S2_SR_HARMONIZED` |

> *The harmonized dataset is used to ensure consistent band availability across time and avoid schema conflicts.*

---

## 🧠 NDVI-Based Analysis

Vegetation health is measured using **NDVI (Normalized Difference Vegetation Index)**:

```math
NDVI = (NIR - RED) / (NIR + RED)
```

**Where:**
*   `NIR` = Band 8
*   `RED` = Band 4

### Processing Steps
1.  Filter imagery by forest location
2.  Remove cloudy pixels
3.  Mask non-vegetation pixels (`NDVI < 0.3`)
4.  Compute mean NDVI over the estimated forest area

---

## ✅ Verification Logic

| NDVI Range | Forest Health | Verification Status |
| :--- | :--- | :--- |
| **≥ 0.65** | Dense | ✅ Auto-Verified |
| **0.45 – 0.64** | Moderate | ✅ Auto-Verified |
| **0.30 – 0.44** | Sparse | ⚠️ Manual Review |
| **< 0.30** | Non-Forest | ❌ Rejected |

---

## 🌱 Carbon Estimation Model

```math
Carbon Credits (tCO₂e/year) = Forest Area (ha) * Carbon Rate
```

*   NDVI determines **forest quality**
*   Area determines **carbon quantity**
*   Rejected forests receive **zero credits**

---

## 🔌 API Specification

### Analyze Forest Endpoint
`POST /analyze-forest`

#### Request Body
```json
{
  "latitude": 30.3165,
  "longitude": 78.0322,
  "forest_area_ha": 5
}
```

#### Response Example
```json
{
  "ndvi": 0.4076,
  "forest_health": "SPARSE",
  "verification_status": "MANUAL_REVIEW",
  "carbon_tco2e": 50
}
```

---

## 🧱 Architecture

*   **Python GEE Service** → Satellite analysis & verification
*   **Node.js Backend** → Users, admins, database, marketplace

> *Admins cannot modify NDVI or satellite data.*

---

## 🧪 Local Setup

### 1. Create Virtual Environment
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment
Create a `.env` file or export the variable:
```bash
export EE_SERVICE_ACCOUNT_KEY=<service account JSON>
```

### 4. Run Service
```bash
python app.py
```

---

## 🚀 Future Improvements

*   [ ] Time-series NDVI analysis
*   [ ] Biomass-based carbon estimation
*   [ ] Deforestation alerts
*   [ ] Area validation from satellite data
