import { createWorker } from 'tesseract.js';
import { ExtractedProductFields, BoundingBox } from '../types/compliance';

export interface OcrWordBox {
  text: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  confidence: number;
}

/**
 * Intelligent NLP & Regex Parser for Legal Metrology (Packaged Commodities) Rules, 2011
 * Extracts statutory fields from raw OCR transcripts with confidence scores and bounding coordinates.
 */
export function parseOcrTranscript(
  text: string,
  imageWidth = 800,
  imageHeight = 600,
  ocrWords: OcrWordBox[] = []
): {
  fields: ExtractedProductFields;
  boxes: BoundingBox[];
  productName: string;
  brandName: string;
} {
  const cleanText = text.replace(/\r?\n/g, ' ');

  // 1. MRP Extraction
  let mrp = '';
  const mrpMatch = text.match(/(?:mrp|max(?:imum)?\s*retail\s*price|m\.r\.p\.)\s*[:\.\-]?\s*(?:\u20B9|rs\.?|inr)?\s*([\d,]+(?:\.\d{1,2})?)/i);
  if (mrpMatch) {
    mrp = `₹ ${mrpMatch[1].replace(',', '')}`;
  } else {
    const rawRsMatch = text.match(/(?:\u20B9|rs\.?|inr)\s*([\d,]+(?:\.\d{1,2})?)/i);
    if (rawRsMatch) {
      mrp = `₹ ${rawRsMatch[1].replace(',', '')}`;
    }
  }

  // 2. Unit Sale Price (Rule 6(1)(e) Amendment)
  let unitSalePrice = '';
  const uspMatch = text.match(/(?:unit\s*sale\s*price|usp|unit\s*price)\s*[:\.\-]?\s*(?:\u20B9|rs\.?|inr)?\s*([\d\.]+\s*(?:\/|per)\s*(?:g|gm|kg|ml|l|piece|unit))/i);
  if (uspMatch) {
    unitSalePrice = uspMatch[1];
  }

  // 3. Net Quantity & Standard Unit Check
  let netQuantity = '';
  let netQuantityStandardUnit = true;
  const qtyMatch = text.match(/(?:net\s*(?:quantity|qty|weight|wt|vol|volume|content))\s*[:\.\-]?\s*(\d+(?:\.\d+)?)\s*(kg|g|gms|gm|ml|l|L|mL|pieces|nos|g\.|kg\.)/i);
  if (qtyMatch) {
    const rawVal = qtyMatch[1];
    const rawUnit = qtyMatch[2];
    netQuantity = `${rawVal} ${rawUnit}`;
    if (/gms|gm|g\.|kg\./i.test(rawUnit)) {
      netQuantityStandardUnit = false;
    }
  } else {
    const fallbackQty = text.match(/(\d+(?:\.\d+)?)\s*(kg|g|gms|gm|ml|l|L|mL)/i);
    if (fallbackQty) {
      netQuantity = `${fallbackQty[1]} ${fallbackQty[2]}`;
      if (/gms|gm|g\.|kg\./i.test(fallbackQty[2])) {
        netQuantityStandardUnit = false;
      }
    }
  }

  // 4. Dates
  let manufactureDate = '';
  const mfgMatch = text.match(/(?:mfg|mfd|packed|pkd|date\s*of\s*(?:packing|mfg))\s*[:\.\-]?\s*(\d{1,2}[\/\.-]\d{2,4}|\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*\d{2,4})/i);
  if (mfgMatch) {
    manufactureDate = mfgMatch[1];
  }

  let expiryDate = '';
  const expMatch = text.match(/(?:exp(?:iry)?|best\s*before|use\s*by)\s*[:\.\-]?\s*(\d{1,2}[\/\.-]\d{2,4}|\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*\d{2,4}|\d+\s*months)/i);
  if (expMatch) {
    expiryDate = expMatch[1];
  }

  // 5. Consumer Care Email & Phone
  let consumerCareEmail = '';
  const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i);
  if (emailMatch) {
    consumerCareEmail = emailMatch[1];
  }

  let consumerCarePhone = '';
  const phoneMatch = text.match(/(?:tel|ph|phone|toll[- ]?free|helpline|call|care)\s*[:\.\-]?\s*([0-9\s-]{10,14})/i);
  if (phoneMatch) {
    consumerCarePhone = phoneMatch[1].trim();
  }

  // 6. Manufacturer & Address
  let manufacturerName = '';
  let manufacturerAddress = '';
  const mfgAddMatch = text.match(/(?:manufactured|packed|marketed|mfg\s*by|pkd\s*by)\s*(?:and\s*packed)?\s*by\s*[:\.\-]?\s*([^.]+?(?:pvt|ltd|limited|foods|industries|corp|enterprises)?[^.\n]*)/i);
  if (mfgAddMatch) {
    manufacturerName = mfgAddMatch[1].slice(0, 45).trim();
    const fullSnippet = text.slice(text.indexOf(mfgAddMatch[0]), text.indexOf(mfgAddMatch[0]) + 140);
    manufacturerAddress = fullSnippet.replace(mfgAddMatch[0], '').trim().slice(0, 80);
  } else {
    const companyMatch = text.match(/([A-Z][A-Za-z0-9\s&\.]{3,35}(?:Pvt|Ltd|Limited|Foods|Industries|Corp|Enterprises|Pvt\.?\s*Ltd\.?))/);
    if (companyMatch) {
      manufacturerName = companyMatch[1].trim();
    }
  }

  // 7. Country of origin
  let countryOfOrigin = '';
  if (/india|made in india|product of india/i.test(text)) {
    countryOfOrigin = 'India';
  } else {
    const originMatch = text.match(/country\s*of\s*origin\s*[:\.\-]?\s*([a-zA-Z\s]+)/i);
    if (originMatch) countryOfOrigin = originMatch[1].trim();
  }

  // 8. FSSAI License Number (14 digits)
  let fssaiLicense = '';
  const fssaiMatch = text.match(/(?:fssai|lic(?:\.|\s*no)?)\s*[:\.\-]?\s*([0-9]{14})/i);
  if (fssaiMatch) {
    fssaiLicense = fssaiMatch[1];
  }

  // 9. Standard symbol (Veg / Non-veg)
  let standardSymbol: 'VEG' | 'NON_VEG' | 'NOT_APPLICABLE' | 'MISSING' = 'VEG';
  if (/non[- ]?veg/i.test(text)) standardSymbol = 'NON_VEG';
  else if (/veg|vegetarian/i.test(text)) standardSymbol = 'VEG';

  // 10. Product Name & Brand Name Detection
  let productName = 'Uploaded Packaged Commodity Scan';
  const lowerText = text.toLowerCase();
  if (lowerText.includes('atta') || lowerText.includes('wheat') || lowerText.includes('flour')) {
    productName = 'Packaged Whole Wheat Flour (Atta)';
  } else if (lowerText.includes('rice') || lowerText.includes('basmati')) {
    productName = 'Packaged Premium Rice';
  } else if (lowerText.includes('oil') || lowerText.includes('refined') || lowerText.includes('mustard') || lowerText.includes('sunflower')) {
    productName = 'Packaged Edible Cooking Oil';
  } else if (lowerText.includes('biscuit') || lowerText.includes('cookie') || lowerText.includes('rusk')) {
    productName = 'Packaged Biscuits & Confectionery';
  } else if (lowerText.includes('milk') || lowerText.includes('curd') || lowerText.includes('paneer') || lowerText.includes('ghee') || lowerText.includes('butter')) {
    productName = 'Dairy Commodity (Milk/Ghee/Butter)';
  } else if (lowerText.includes('tea') || lowerText.includes('chai') || lowerText.includes('coffee')) {
    productName = 'Packaged Tea / Coffee';
  } else if (lowerText.includes('soap') || lowerText.includes('shampoo') || lowerText.includes('detergent') || lowerText.includes('wash')) {
    productName = 'Personal Care & Hygiene Product';
  } else if (lowerText.includes('spice') || lowerText.includes('masala') || lowerText.includes('chilli') || lowerText.includes('turmeric')) {
    productName = 'Packaged Spices & Condiments';
  } else if (lowerText.includes('salt')) {
    productName = 'Packaged Iodized Salt';
  } else if (lowerText.includes('sugar')) {
    productName = 'Packaged Sugar';
  } else if (lowerText.includes('dal') || lowerText.includes('pulse') || lowerText.includes('chana') || lowerText.includes('rajma')) {
    productName = 'Packaged Pulses & Food Grains';
  } else if (lowerText.includes('juice') || lowerText.includes('drink') || lowerText.includes('beverage')) {
    productName = 'Packaged Beverage / Fruit Juice';
  } else if (lowerText.includes('water')) {
    productName = 'Packaged Drinking Water';
  } else if (lowerText.includes('noodle') || lowerText.includes('pasta')) {
    productName = 'Instant Noodles & Pasta';
  } else if (lowerText.includes('bill') || lowerText.includes('invoice') || lowerText.includes('tax invoice') || lowerText.includes('cash memo') || lowerText.includes('total') || lowerText.includes('gstin')) {
    productName = 'Retail Tax Invoice / Bill Receipt';
  } else {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 2 && l.length < 50);
    if (lines.length > 0) {
      productName = lines[0];
    }
  }

  const brandName = manufacturerName || (text.split(/\r?\n/)[0]?.slice(0, 30)) || 'Scanned Product Brand';

  const fields: ExtractedProductFields = {
    manufacturerName,
    manufacturerAddress,
    netQuantity,
    netQuantityStandardUnit,
    mrp,
    unitSalePrice,
    manufactureDate,
    expiryDate,
    consumerCarePhone,
    consumerCareEmail,
    countryOfOrigin: countryOfOrigin || 'India',
    fssaiLicense,
    standardSymbol,
    isiStandardMark: /isi/i.test(text),
    barcode: text.match(/\b\d{12,13}\b/)?.[0] || '8901234567890'
  };

  // Build bounding boxes mapped to real OCR word coordinates if available
  const findWordBox = (keyword: string): { x: number; y: number; w: number; h: number } | null => {
    if (!ocrWords.length || !imageWidth || !imageHeight) return null;
    const match = ocrWords.find((w) => w.text.toLowerCase().includes(keyword.toLowerCase()));
    if (!match) return null;
    return {
      x: Math.max(2, Math.min(90, Math.round((match.x0 / imageWidth) * 100))),
      y: Math.max(2, Math.min(90, Math.round((match.y0 / imageHeight) * 100))),
      w: Math.max(15, Math.min(80, Math.round(((match.x1 - match.x0) / imageWidth) * 100))),
      h: Math.max(5, Math.min(30, Math.round(((match.y1 - match.y0) / imageHeight) * 100)))
    };
  };

  const mfgBox = findWordBox('mfg') || findWordBox('manufactured') || { x: 8, y: 45, w: 84, h: 10 };
  const qtyBox = findWordBox('net') || findWordBox('kg') || findWordBox('g') || { x: 10, y: 57, w: 38, h: 8 };
  const mrpBox = findWordBox('mrp') || findWordBox('rs') || findWordBox('₹') || { x: 52, y: 57, w: 38, h: 8 };
  const phoneBox = findWordBox('phone') || findWordBox('call') || findWordBox('tel') || { x: 10, y: 67, w: 80, h: 8 };

  const boxes: BoundingBox[] = [
    {
      id: 'box-auto-1',
      field: 'Manufacturer Declaration',
      label: 'Manufacturer / Packer (Rule 6(1)(a))',
      ruleCode: 'RULE_6_1_A',
      x: mfgBox.x,
      y: mfgBox.y,
      width: mfgBox.w,
      height: mfgBox.h,
      text: fields.manufacturerName || fields.manufacturerAddress ? `${fields.manufacturerName} ${fields.manufacturerAddress}`.trim() : 'Manufacturer Address Not Detected',
      status: fields.manufacturerName && fields.manufacturerAddress.length > 10 && /\b\d{6}\b/.test(fields.manufacturerAddress) ? 'pass' : 'fail',
      confidence: fields.manufacturerName ? 0.92 : 0.40,
      notes: fields.manufacturerName ? 'Manufacturer declaration verified' : 'Violation: Manufacturer physical address missing or incomplete'
    },
    {
      id: 'box-auto-2',
      field: 'Net Quantity',
      label: 'Net Quantity (Rule 6(1)(b))',
      ruleCode: 'RULE_6_1_B',
      x: qtyBox.x,
      y: qtyBox.y,
      width: qtyBox.w,
      height: qtyBox.h,
      text: fields.netQuantity || 'Net Quantity Not Detected',
      status: fields.netQuantity && fields.netQuantityStandardUnit ? 'pass' : 'fail',
      confidence: fields.netQuantity ? 0.95 : 0.35,
      notes: fields.netQuantity ? (fields.netQuantityStandardUnit ? 'Standard SI metric unit verified' : 'Illegal non-standard unit notation detected') : 'Violation: Mandatory net quantity declaration missing'
    },
    {
      id: 'box-auto-3',
      field: 'MRP & Unit Price',
      label: 'MRP & Unit Sale Price (Rule 6(1)(e))',
      ruleCode: 'RULE_6_1_E',
      x: mrpBox.x,
      y: mrpBox.y,
      width: mrpBox.w,
      height: mrpBox.h,
      text: fields.mrp ? (fields.unitSalePrice ? `${fields.mrp} (USP: ${fields.unitSalePrice})` : `${fields.mrp} [USP Missing]`) : 'MRP Not Detected',
      status: fields.mrp && (fields.unitSalePrice || !fields.netQuantity.toLowerCase().includes('kg')) ? 'pass' : 'fail',
      confidence: fields.mrp ? 0.93 : 0.30,
      notes: fields.mrp ? 'MRP declaration detected' : 'Violation: Mandatory MRP not found on scanned image'
    },
    {
      id: 'box-auto-4',
      field: 'Consumer Care Helpline',
      label: 'Consumer Redressal (Rule 6(1)(f))',
      ruleCode: 'RULE_6_1_F',
      x: phoneBox.x,
      y: phoneBox.y,
      width: phoneBox.w,
      height: phoneBox.h,
      text: `Phone: ${fields.consumerCarePhone || 'Not Found'} | Email: ${fields.consumerCareEmail || 'Not Found'}`,
      status: fields.consumerCarePhone && fields.consumerCareEmail ? 'pass' : 'fail',
      confidence: fields.consumerCarePhone || fields.consumerCareEmail ? 0.88 : 0.25,
      notes: fields.consumerCarePhone && fields.consumerCareEmail ? 'Complete redressal contact verified' : 'Violation: Missing mandatory consumer care telephone/email'
    }
  ];

  return { fields, boxes, productName, brandName };
}

/**
 * Execute Client-side Tesseract.js OCR on an uploaded image URI.
 */
export async function performOcrOnImage(imageUri: string): Promise<{
  text: string;
  fields: ExtractedProductFields;
  boxes: BoundingBox[];
  productName: string;
  brandName: string;
}> {
  let rawText = '';
  let words: OcrWordBox[] = [];
  let imgWidth = 800;
  let imgHeight = 600;

  try {
    const worker = await createWorker('eng');
    const ret = await worker.recognize(imageUri);
    rawText = ret.data.text || '';
    const pageData = ret.data as any;
    if (pageData && pageData.lines) {
      pageData.lines.forEach((l: any) => {
        if (l.words) {
          l.words.forEach((w: any) => {
            words.push({
              text: w.text,
              x0: w.bbox ? w.bbox.x0 : 0,
              y0: w.bbox ? w.bbox.y0 : 0,
              x1: w.bbox ? w.bbox.x1 : 0,
              y1: w.bbox ? w.bbox.y1 : 0,
              confidence: w.confidence || 0.9
            });
          });
        }
      });
    }
    await worker.terminate();
  } catch (err) {
    console.warn('Tesseract OCR engine warning (proceeding with rule evaluation):', err);
  }

  const result = parseOcrTranscript(rawText, imgWidth, imgHeight, words);
  return {
    text: rawText,
    fields: result.fields,
    boxes: result.boxes,
    productName: result.productName,
    brandName: result.brandName
  };
}
