# ⚖️ PARAKH: Legal Metrology AI Compliance Verification System
### Smart India Hackathon 2026 • Problem Statement ID: 26034
**Theme**: Agriculture, FoodTech and Rural Development | **Category**: Software  
**Team ID**: AFRD02 | **Team Name**: PARAKH  
**Sub-title**: Software System to check compliance of Packaged Commodities under Legal Metrology (Packaged Commodities) Rules, 2011 by scanning products, images and labels.

---

## 🚀 Live Access & Deployment

### 1. Run Locally (PC & Mobile Smartphone)
- **Desktop / PC Browser**: Open [http://localhost:3000](http://localhost:3000)
- **Mobile Smartphone**: Open `http://192.168.1.3:3000` (Use rear camera for 1-tap live label inspection)

To restart the server manually:
```bash
npm run dev        # Development mode
npm run build      # Production build
npm run preview    # Production preview (Port 3000)
```

---

## ⚡ How to Deploy to Vercel in 2 Minutes

This project is optimized for **zero-configuration** deployment to **Vercel**:

1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Import this GitHub repository (`sanskarjanjalkar-glitch/parakh-legal-metrology`).
3. Vercel will automatically detect `vite` and `vercel.json`.
4. Click **Deploy**. Your live production URL (`https://parakh-*.vercel.app`) will be ready in ~30 seconds!

---

## 📋 Features Implemented

- **Hybrid OCR & Image Input**: Camera capture, file picker, and drag-and-drop.
- **OpenCV CLAHE / Denoising**: Canvas CV filters for glare/curved surfaces.
- **YOLOv8 Bounding Boxes**: Visual detection overlay showing detected fields with confidence scores.
- **Legal Metrology Rules 2011 Engine**: Rule 6(1)(a-f), Rule 6(10) Origin, 2022 Unit Sale Price mandate.
- **Rule 7 Font Size Compliance**: Minimum numeral/letter height validation.
- **Manufacturer Risk Radar**: Failure rate analytics (Apex Foods 73%, Kavya 58%, Tata Consumer 2.1%).
- **Official PDF Inspection Report**: Statutory notice under Section 36 of Legal Metrology Act, 2009.
- **Offline Resilience**: Local storage caching & background sync.

---
*Developed for Smart India Hackathon 2026 by Team PARAKH (AFRD02)*
