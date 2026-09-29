# 🇮🇳 PARAKH: Unified AI Compliance & Indian Standards Procurement Engine

### Smart India Hackathon 2026 • Dual Problem Statement Blend
- **PS ID 26034**: AI System to check compliance of Packaged Commodities under Legal Metrology Rules, 2011 by scanning products, images and labels.
- **PS ID 26108**: AI-Powered Recommendation Engine for Identifying Applicable Indian Standards (IS) for Public Procurement Specifications (GeM / CPP Portal).
- **Ministry**: Ministry of Consumer Affairs, Food & Public Distribution (DoCA) & Bureau of Indian Standards (BIS).
- **Theme**: Agriculture, FoodTech, Quality Standards and Public Procurement | **Category**: Software  
- **Team**: PARAKH  

---

## 🌟 Overview: The Blended Vision

**PARAKH** is an enterprise-grade AI compliance and standards engine that unifies:
1. **Pre-Procurement Tender Auditing (PS 26108)**: Scans procurement tenders to automatically identify applicable Indian Standards (IS), eliminate outdated/superseded standards, enforce Quality Control Orders (QCOs), and generate 100% compliant GeM tender clauses.
2. **Post-Procurement Physical Delivery Inspection (PS 26034)**: Scans delivered commodity packaging using computer vision and OCR to verify mandatory declarations under Rule 6 & 7 of the Legal Metrology (Packaged Commodities) Rules, 2011.
3. **Surveillance & Supplier Risk Radar**: A centralized cross-departmental compliance radar linking physical packaging failures directly to vendor credibility on the Government e-Marketplace (GeM).

---

## 🚀 Key Features

### 1. Dual Intelligence Omni-Hub
- **Single Unified Search Bar**: One bar for product names, Indian Standard numbers, or natural language queries (English, Hindi, and Hinglish).
- **Hindi Multilingual Semantic NLP**: Translates and maps Hindi procurement terms (e.g. `पीने के पानी का पाइप`, `गेहूं का आटा`, `स्ट्रीट लाइट`) directly to relevant Indian Standards.

### 2. Tender Specification Auditor (PS 26108)
- **Outdated Standard Detection**: Flags deprecated standards (e.g. `IS 4984:1995` or `IS 1155:1968`) and replaces them with active reaffirmed editions with all published amendments.
- **Mandatory QCO Enforcer**: Checks statutory Quality Control Orders (e.g., Pipes & Fittings QCO 2024, MeitY CRS, Food Fortification directives) to prevent non-certified vendors from bidding.
- **1-Click Compliant GeM Clause**: Automatically generates ready-to-copy, legally ironclad procurement clauses.

### 3. Packaging Metrology Vision Scanner (PS 26034)
- **Computer Vision & OCR**: Detects MRP, Unit Sale Price (USP), Net Quantity, Manufacturing/Expiry Dates, FSSAI numbers, and Consumer Care contacts.
- **Rule 6 & 7 Compliance Engine**: Automatically verifies:
  - **Rule 6(1)(a)**: Physical factory address + 6-digit postal PIN code.
  - **Rule 6(1)(b)**: Metric SI units (detects and flags illegal notations like `gms`).
  - **Rule 6(1)(e)**: Unit Sale Price (USP) for items ≥ 1 kg under GSR 779(E).
  - **Rule 6(1)(f)**: Consumer grievance helpline and email.
  - **Rule 7**: Principal Display Panel (PDP) font height measurement.

### 4. Identified Errors & Statutory Corrections Engine
- Directly pairs every identified non-conformity with its **mandatory statutory correction**, statutory reference, and penalty section under Section 36 of the Legal Metrology Act, 2009.

### 5. Official Inspection Report (PDF)
- Generates a Government of India statutory inspection dossier with QR verification, error tables, standard test methods, and manufacturer surveillance metrics.

---

## 💻 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Document Processing**: jsPDF, Canvas HTML5, Custom NLP Parsing
- **Design System**: Official GOI Light Theme (Clean White `#ffffff` with Cyan accents)
- **Offline First**: IndexedDB / LocalStorage offline caching with auto-sync

---

## 🛠️ Local Development & Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Production build
npm run build

# 4. Preview production build (Port 3000)
npm run preview
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚖️ Statutory References

- **Legal Metrology Act, 2009** (Act No. 1 of 2010)
- **Legal Metrology (Packaged Commodities) Rules, 2011** (GSR 202(E))
- **Legal Metrology (Amendment) Rules, 2022** (GSR 779(E) - Unit Sale Price)
- **Bureau of Indian Standards Act, 2016** (Act No. 11 of 2016)
- **Quality Control Orders (QCOs)** issued under BIS Act & Section 16
- **Food Safety and Standards Act, 2006** & Packaging/Fortification Regulations

---

*Developed for Smart India Hackathon (SIH 2026) by Team PARAKH*
