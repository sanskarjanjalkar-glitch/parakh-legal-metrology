import { InspectionRecord } from '../types/compliance';

export function createSvgLabel(
  title: string,
  brand: string,
  mrp: string,
  netQty: string,
  mfg: string,
  extra: string,
  bgColor = '#1e293b',
  badgeColor = '#ef4444'
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="780" viewBox="0 0 600 780">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="600" height="780" rx="20" fill="url(#grad)" stroke="#334155" stroke-width="4"/>
    
    <rect x="30" y="30" width="540" height="90" rx="10" fill="#1e3a8a"/>
    <text x="300" y="70" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">${brand.toUpperCase()}</text>
    <text x="300" y="100" font-family="Arial, sans-serif" font-size="16" fill="#93c5fd" text-anchor="middle">${title}</text>
    
    <rect x="40" y="140" width="520" height="180" rx="12" fill="#020617" stroke="#1e293b" stroke-width="2"/>
    <circle cx="300" cy="220" r="45" fill="#3b82f6" fill-opacity="0.2"/>
    <text x="300" y="232" font-family="Arial, sans-serif" font-size="34" text-anchor="middle">🌾</text>
    <text x="300" y="290" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">AUTHENTIC PACKAGED COMMODITY</text>
    
    <rect x="40" y="340" width="520" height="390" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
    <rect x="50" y="350" width="500" height="28" fill="#1e293b"/>
    <text x="60" y="369" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#38bdf8">LEGAL METROLOGY MANDATORY DECLARATIONS (RULE 6)</text>
    
    <text x="60" y="405" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#94a3b8">MANUFACTURED & PACKED BY:</text>
    <text x="60" y="425" font-family="Arial, sans-serif" font-size="13" fill="#f8fafc">${mfg}</text>
    
    <rect x="60" y="445" width="230" height="55" rx="6" fill="#1e293b" stroke="#475569"/>
    <text x="75" y="468" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8">NET QUANTITY / Wt:</text>
    <text x="75" y="490" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#38bdf8">${netQty}</text>
    
    <rect x="310" y="445" width="230" height="55" rx="6" fill="#1e293b" stroke="#475569"/>
    <text x="325" y="468" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8">MAX RETAIL PRICE:</text>
    <text x="325" y="490" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#f59e0b">${mrp}</text>
    
    <text x="60" y="530" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">CONSUMER CARE & COMPLIANCE:</text>
    <text x="60" y="550" font-family="Arial, sans-serif" font-size="12" fill="#e2e8f0">${extra}</text>
    
    <rect x="60" y="660" width="30" height="30" rx="3" fill="#ffffff" stroke="#16a34a" stroke-width="2"/>
    <circle cx="75" cy="675" r="7" fill="#16a34a"/>
    <text x="100" y="675" font-family="Arial, sans-serif" font-size="11" fill="#cbd5e1">100% Vegetarian</text>
    <text x="100" y="690" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8">FSSAI Lic. No. 10021011000342</text>
    
    <rect x="420" y="655" width="120" height="42" fill="#ffffff"/>
    <line x1="430" y1="660" x2="430" y2="690" stroke="#000" stroke-width="2"/>
    <line x1="435" y1="660" x2="435" y2="690" stroke="#000" stroke-width="3"/>
    <line x1="442" y1="660" x2="442" y2="690" stroke="#000" stroke-width="1"/>
    <line x1="448" y1="660" x2="448" y2="690" stroke="#000" stroke-width="4"/>
    <line x1="458" y1="660" x2="458" y2="690" stroke="#000" stroke-width="2"/>
    <line x1="465" y1="660" x2="465" y2="690" stroke="#000" stroke-width="3"/>
    <line x1="475" y1="660" x2="475" y2="690" stroke="#000" stroke-width="1"/>
    <line x1="485" y1="660" x2="485" y2="690" stroke="#000" stroke-width="3"/>
    <line x1="495" y1="660" x2="495" y2="690" stroke="#000" stroke-width="2"/>
    <line x1="505" y1="660" x2="505" y2="690" stroke="#000" stroke-width="4"/>
    <line x1="515" y1="660" x2="515" y2="690" stroke="#000" stroke-width="2"/>
    <line x1="525" y1="660" x2="525" y2="690" stroke="#000" stroke-width="1"/>
    <text x="475" y="705" font-family="Courier, monospace" font-size="10" fill="#000000" text-anchor="middle">8901030894218</text>
    
    <rect x="420" y="45" width="135" height="24" rx="12" fill="${badgeColor}"/>
    <text x="487" y="61" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">AI AUDIT READY</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_INSPECTION_DATA: InspectionRecord[] = [
  {
    id: 'INS-2026-SURYA-01',
    timestamp: '2026-09-17 14:15 IST',
    inspectorBadgeId: '#F18714',
    inspectorName: 'Inspector R. Sharma (ISN-01)',
    locationName: 'APMC Mandi Yard, Azadpur, New Delhi',
    productName: 'Surya Classic Basmati Rice (1kg)',
    brandName: 'Surya Foods',
    packagingType: 'Laminated Flexible Plastic Pouch',
    pdpAreaCm2: 260,
    imageUri: createSvgLabel(
      'Surya Classic Premium Basmati Rice',
      'Surya Foods India',
      '₹ 162.00 (incl. of all taxes)',
      'Net Qty: 1 kg',
      'Surya Foods, D-18, Phase-I, New Delhi - 110020',
      'Mfg: 04/2026 | Exp: 03/2028 | Web: www.punjabfoodsindia.com'
    ),
    rawOcrText: 'Manufactured by: Surya Foods, D-18, Phase-I, New Delhi 110020. MRP: ₹ 162.00 (incl. of all taxes). Net Quantity: 1 kg. Expiry Date: 03/2028. Consumer care: www.punjabfoodsindia.com. Made in India.',
    fields: {
      manufacturerName: 'Surya Foods',
      manufacturerAddress: 'D-18, Phase-I, New Delhi - 110020',
      netQuantity: '1 kg',
      netQuantityStandardUnit: true,
      mrp: '₹ 162.00',
      unitSalePrice: '',
      manufactureDate: '04/2026',
      expiryDate: '03/2028',
      consumerCarePhone: '',
      consumerCareEmail: '',
      countryOfOrigin: 'India',
      fssaiLicense: '10021011000342',
      standardSymbol: 'VEG',
      isiStandardMark: false,
      barcode: '8901030894218'
    },
    boundingBoxes: [
      {
        id: 'box-1',
        field: 'Manufacturer Identity',
        label: 'Manufacturer & Packer Info',
        ruleCode: 'RULE_6_1_A',
        x: 8,
        y: 49,
        width: 84,
        height: 7,
        text: 'Surya Foods, D-18, Phase-I, New Delhi - 110020',
        status: 'pass',
        confidence: 0.96,
        notes: 'Complete postal address verified'
      },
      {
        id: 'box-2',
        field: 'Net Quantity',
        label: 'Net Weight (Rule 6(1)(b))',
        ruleCode: 'RULE_6_1_B',
        x: 10,
        y: 57,
        width: 38,
        height: 7,
        text: 'Net Qty: 1 kg',
        status: 'pass',
        confidence: 0.98,
        measuredFontMm: 3.1,
        requiredFontMm: 2.0
      },
      {
        id: 'box-3',
        field: 'MRP & Unit Price',
        label: 'MRP & Unit Sale Price',
        ruleCode: 'RULE_6_1_E',
        x: 52,
        y: 57,
        width: 38,
        height: 7,
        text: 'MRP: ₹ 162.00 (Missing Unit Sale Price)',
        status: 'fail',
        confidence: 0.94,
        notes: 'Non-compliant: Packages of 1kg must specify Unit Sale Price (e.g., ₹16.20/100g)'
      },
      {
        id: 'box-4',
        field: 'Consumer Care Contact',
        label: 'Grievance Redressal (Rule 6(1)(f))',
        ruleCode: 'RULE_6_1_F',
        x: 10,
        y: 67,
        width: 80,
        height: 8,
        text: 'Web: www.punjabfoodsindia.com (No phone / email)',
        status: 'fail',
        confidence: 0.91,
        notes: 'Non-compliant: Omits mandatory contact telephone & email ID of grievance officer'
      },
      {
        id: 'box-5',
        field: 'Font Size PDP',
        label: 'Font Height Inspection (Rule 7)',
        ruleCode: 'RULE_7',
        x: 10,
        y: 76,
        width: 40,
        height: 6,
        text: 'Measured Font: 1.4 mm (Below minimum 2.0 mm)',
        status: 'fail',
        confidence: 0.89,
        measuredFontMm: 1.4,
        requiredFontMm: 2.0,
        notes: 'Area is 260 cm²; Rule 7 mandates min 2.0 mm height'
      }
    ],
    rules: [
      {
        ruleCode: 'RULE_6_1_A',
        ruleName: 'Manufacturer / Packer Declaration',
        actReference: 'Legal Metrology Rules 2011, Rule 6(1)(a)',
        description: 'Complete name and physical factory address',
        mandatory: true,
        status: 'PASS',
        extractedValue: 'Surya Foods, D-18, Phase-I, New Delhi 110020',
        expectedCondition: 'Street address + City + PIN code present',
        explanation: 'Full address detected with valid pin code.'
      },
      {
        ruleCode: 'RULE_6_1_B',
        ruleName: 'Standard Unit of Measurement',
        actReference: 'Legal Metrology Rules 2011, Rule 6(1)(b)',
        description: 'Net quantity in standard SI units (g, kg, ml, l)',
        mandatory: true,
        status: 'PASS',
        extractedValue: '1 kg',
        expectedCondition: 'Standard unit notation without period or plural',
        explanation: 'Symbol "kg" complies with Second Schedule standards.'
      },
      {
        ruleCode: 'RULE_6_1_E',
        ruleName: 'Mandatory Unit Sale Price (USP)',
        actReference: 'Legal Metrology Amendment Rules 2022, Rule 6(1)(e)',
        description: 'Commodities > 1kg/1L must declare per-unit price alongside MRP',
        mandatory: true,
        status: 'FAIL',
        extractedValue: 'MRP ₹ 162.00 (Only total MRP present)',
        expectedCondition: 'Unit Sale Price declared (e.g. ₹ 16.20 / 100g or ₹ 162.00 / kg)',
        explanation: 'Package of 1 kg fails to display Unit Sale Price as mandated by GSR 779(E).',
        penaltySection: 'Sec 36(2) Legal Metrology Act, 2009'
      },
      {
        ruleCode: 'RULE_6_1_F',
        ruleName: 'Consumer Care Cell Details',
        actReference: 'Legal Metrology Rules 2011, Rule 6(1)(f)',
        description: 'Officer name, postal address, telephone, and email',
        mandatory: true,
        status: 'FAIL',
        extractedValue: 'Only URL provided: www.punjabfoodsindia.com',
        expectedCondition: 'Active Telephone No. AND Email ID required',
        explanation: 'Statutory phone number and designated email ID omitted.',
        penaltySection: 'Sec 36(1) Legal Metrology Act, 2009'
      },
      {
        ruleCode: 'RULE_7',
        ruleName: 'Numeral & Letter Font Height',
        actReference: 'Legal Metrology Rules 2011, Rule 7 Table-I',
        description: 'Minimum font height based on Principal Display Panel area',
        mandatory: true,
        status: 'FAIL',
        extractedValue: '1.4 mm measured height',
        expectedCondition: 'Minimum 2.0 mm required for PDP area 260 cm²',
        explanation: 'Numeral font height fails legal readability threshold by 0.6 mm.',
        penaltySection: 'Sec 36(1) Legal Metrology Act, 2009'
      }
    ],
    overallStatus: 'NON_COMPLIANT_FAIL',
    complianceScore: 54,
    counterfeitAnomalyScore: 18,
    isCounterfeitRisk: false
  },
  {
    id: 'INS-2026-TATA-02',
    timestamp: '2026-09-17 11:20 IST',
    inspectorBadgeId: '#F18714',
    inspectorName: 'Inspector R. Sharma (ISN-01)',
    locationName: 'Reliance Smart Superstore, Sector 18, Noida',
    productName: 'Tata Tea Gold - Premium Black Tea (500g)',
    brandName: 'Tata Consumer',
    packagingType: 'Stand-up Barrier Pouch',
    pdpAreaCm2: 240,
    imageUri: createSvgLabel(
      'Tata Tea Gold - Exquisite Assam Leaf & Gently Rolled Long Leaf',
      'Tata Consumer Products',
      '₹ 310.00 (incl. of taxes) | USP: ₹ 0.62 / g',
      'Net Qty: 500 g',
      'Tata Consumer Products Ltd, 1 Bishop Lefroy Rd, Kolkata 700020',
      'Mfg: 08/2026 | Exp: 07/2027 | Care: 1800-345-1720 / care@tataconsumer.com',
      '#064e3b',
      '#10b981'
    ),
    rawOcrText: 'Manufactured by: Tata Consumer Products Ltd, 1 Bishop Lefroy Rd, Kolkata 700020. Net Qty: 500 g. MRP: ₹ 310.00 (incl. of all taxes). Unit Sale Price: ₹ 0.62 per gram. Country of Origin: India. Consumer Care: 1800-345-1720, care@tataconsumer.com. FSSAI Lic No: 10014031001025.',
    fields: {
      manufacturerName: 'Tata Consumer Products Ltd',
      manufacturerAddress: '1 Bishop Lefroy Road, Kolkata - 700020, West Bengal',
      netQuantity: '500 g',
      netQuantityStandardUnit: true,
      mrp: '₹ 310.00',
      unitSalePrice: '₹ 0.62 / g',
      manufactureDate: '08/2026',
      expiryDate: '07/2027',
      consumerCarePhone: '1800-345-1720',
      consumerCareEmail: 'care@tataconsumer.com',
      countryOfOrigin: 'India',
      fssaiLicense: '10014031001025',
      standardSymbol: 'VEG',
      isiStandardMark: false,
      barcode: '8901030894218'
    },
    boundingBoxes: [
      {
        id: 't-1',
        field: 'Manufacturer Identity',
        label: 'Manufacturer / Packer',
        ruleCode: 'RULE_6_1_A',
        x: 8,
        y: 49,
        width: 84,
        height: 7,
        text: 'Tata Consumer Products Ltd, Kolkata 700020',
        status: 'pass',
        confidence: 0.99
      },
      {
        id: 't-2',
        field: 'Net Quantity',
        label: 'Net Quantity (Rule 6(1)(b))',
        ruleCode: 'RULE_6_1_B',
        x: 10,
        y: 57,
        width: 38,
        height: 7,
        text: 'Net Qty: 500 g',
        status: 'pass',
        confidence: 0.99,
        measuredFontMm: 3.2,
        requiredFontMm: 2.0
      },
      {
        id: 't-3',
        field: 'MRP & Unit Sale Price',
        label: 'MRP with Unit Price',
        ruleCode: 'RULE_6_1_E',
        x: 52,
        y: 57,
        width: 38,
        height: 7,
        text: 'MRP ₹ 310.00 | USP ₹ 0.62/g',
        status: 'pass',
        confidence: 0.97
      },
      {
        id: 't-4',
        field: 'Consumer Care',
        label: 'Consumer Care Redressal',
        ruleCode: 'RULE_6_1_F',
        x: 10,
        y: 67,
        width: 80,
        height: 8,
        text: '1800-345-1720 / care@tataconsumer.com',
        status: 'pass',
        confidence: 0.98
      }
    ],
    rules: [
      {
        ruleCode: 'RULE_6_1_A',
        ruleName: 'Manufacturer Declaration',
        actReference: 'Rule 6(1)(a)',
        description: 'Complete name and physical factory address',
        mandatory: true,
        status: 'PASS',
        extractedValue: 'Tata Consumer Products Ltd, Kolkata 700020',
        expectedCondition: 'Full address & valid PIN present',
        explanation: 'Manufacturer identity verified in MCA database.'
      },
      {
        ruleCode: 'RULE_6_1_B',
        ruleName: 'Standard Unit of Measurement',
        actReference: 'Rule 6(1)(b)',
        description: 'Net quantity in standard SI units',
        mandatory: true,
        status: 'PASS',
        extractedValue: '500 g',
        expectedCondition: 'Standard unit notation (g)',
        explanation: 'Complies with Second Schedule.'
      },
      {
        ruleCode: 'RULE_6_1_E',
        ruleName: 'MRP & Unit Sale Price',
        actReference: 'Rule 6(1)(e)',
        description: 'Maximum retail price inclusive of taxes with unit price',
        mandatory: true,
        status: 'PASS',
        extractedValue: 'MRP ₹ 310.00 (USP ₹ 0.62/g)',
        expectedCondition: 'Taxes inclusive + Unit Sale Price present',
        explanation: 'Unit sale price clearly visible in same font size as MRP.'
      },
      {
        ruleCode: 'RULE_6_1_F',
        ruleName: 'Consumer Care Helpline',
        actReference: 'Rule 6(1)(f)',
        description: 'Toll-free phone and official email',
        mandatory: true,
        status: 'PASS',
        extractedValue: '1800-345-1720 / care@tataconsumer.com',
        expectedCondition: 'Phone & email accessible',
        explanation: 'Active toll-free helpline and valid corporate email present.'
      },
      {
        ruleCode: 'RULE_7',
        ruleName: 'Font Height Compliance',
        actReference: 'Rule 7 Table-I',
        description: 'Minimum numeral size on PDP',
        mandatory: true,
        status: 'PASS',
        extractedValue: '3.2 mm measured',
        expectedCondition: '≥ 2.0 mm',
        explanation: 'Numerals exceed legal height threshold by 60%.'
      }
    ],
    overallStatus: 'COMPLIANT_PASS',
    complianceScore: 100,
    counterfeitAnomalyScore: 2,
    isCounterfeitRisk: false
  },
  {
    id: 'INS-2026-APEX-03',
    timestamp: '2026-09-17 15:40 IST',
    inspectorBadgeId: '#F18714',
    inspectorName: 'Inspector R. Sharma (ISN-01)',
    locationName: 'Local Kirana Mart, Ghaziabad, UP',
    productName: 'Apex Digestive Wheat Crackers (200g)',
    brandName: 'Apex Foods Ltd',
    packagingType: 'Flow-wrap Polypropylene Pack',
    pdpAreaCm2: 120,
    imageUri: createSvgLabel(
      'Apex Digestive High Fibre Crisp Crackers',
      'Apex Foods Ltd',
      '₹ 45.00 (Overwritten / Smudged)',
      'Net Qty: 200 GMS.',
      'Apex Foods Ltd, Plot 44, GIDC Industrial Estate, Gujarat (No PIN)',
      'Batch: AP-992 | Mfg: 06/2026 | Ph: 9876543210 (No Email)',
      '#450a0a',
      '#dc2626'
    ),
    rawOcrText: 'Apex Foods Ltd. Net Qty: 200 GMS. MRP ₹ 45.00. Plot 44, GIDC, Gujarat. Ph: 9876543210. Batch AP-992. Exp: 12/2026.',
    fields: {
      manufacturerName: 'Apex Foods Ltd',
      manufacturerAddress: 'Plot 44, GIDC Industrial Estate, Gujarat',
      netQuantity: '200 GMS.',
      netQuantityStandardUnit: false,
      mrp: '₹ 45.00',
      unitSalePrice: '',
      manufactureDate: '06/2026',
      expiryDate: '12/2026',
      consumerCarePhone: '9876543210',
      consumerCareEmail: '',
      countryOfOrigin: '',
      fssaiLicense: '10019999000111',
      standardSymbol: 'VEG',
      isiStandardMark: false,
      barcode: '8901030894218'
    },
    boundingBoxes: [
      {
        id: 'ap-1',
        field: 'Manufacturer Identity',
        label: 'Manufacturer Address',
        ruleCode: 'RULE_6_1_A',
        x: 8,
        y: 49,
        width: 84,
        height: 7,
        text: 'Plot 44, GIDC, Gujarat (Missing PIN code)',
        status: 'fail',
        confidence: 0.88,
        notes: 'Incomplete postal address: PIN code omitted'
      },
      {
        id: 'ap-2',
        field: 'Net Quantity',
        label: 'Non-standard Unit "GMS."',
        ruleCode: 'RULE_6_1_B',
        x: 10,
        y: 57,
        width: 38,
        height: 7,
        text: '200 GMS. (Illegal symbol)',
        status: 'fail',
        confidence: 0.95,
        notes: 'Rule 6(1)(b) prohibits "GMS.", "gms.", or periods after unit'
      },
      {
        id: 'ap-3',
        field: 'Counterfeit Anomaly',
        label: 'Label Template Anomaly',
        ruleCode: 'ANOMALY_CHECK',
        x: 10,
        y: 20,
        width: 80,
        height: 18,
        text: 'High Counterfeit Anomaly: Font Mismatch & Unregistered Facility',
        status: 'fail',
        confidence: 0.84,
        notes: 'High Anomaly Score (73%): Suspected duplicate packaging'
      }
    ],
    rules: [
      {
        ruleCode: 'RULE_6_1_A',
        ruleName: 'Incomplete Manufacturer Address',
        actReference: 'Rule 6(1)(a)',
        description: 'Complete address with postal PIN code',
        mandatory: true,
        status: 'FAIL',
        extractedValue: 'Plot 44, GIDC, Gujarat (No PIN)',
        expectedCondition: 'Valid 6-digit postal code mandatory',
        explanation: 'Address fails statutory specificity requirement.',
        penaltySection: 'Sec 36(1) Legal Metrology Act, 2009'
      },
      {
        ruleCode: 'RULE_6_1_B',
        ruleName: 'Non-Standard Quantity Unit Notation',
        actReference: 'Rule 6(1)(b) & Second Schedule',
        description: 'Standard unit of weight declaration',
        mandatory: true,
        status: 'FAIL',
        extractedValue: '200 GMS.',
        expectedCondition: 'Permitted standard symbol is only "g"',
        explanation: 'Use of "GMS." is an explicit statutory violation under Rule 6(1)(b).',
        penaltySection: 'Sec 36(1) Legal Metrology Act, 2009'
      },
      {
        ruleCode: 'RULE_6_1_F',
        ruleName: 'Missing Grievance Email',
        actReference: 'Rule 6(1)(f)',
        description: 'Designated consumer email address',
        mandatory: true,
        status: 'FAIL',
        extractedValue: 'Only mobile phone number provided',
        expectedCondition: 'Email address mandatory for redressal',
        explanation: 'No electronic grievance address declared.',
        penaltySection: 'Sec 36(1) Legal Metrology Act, 2009'
      }
    ],
    overallStatus: 'COUNTERFEIT_FLAGGED',
    complianceScore: 32,
    counterfeitAnomalyScore: 78,
    isCounterfeitRisk: true
  }
];
