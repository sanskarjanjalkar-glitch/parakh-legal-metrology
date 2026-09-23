import { MetrologyRuleGuide } from '../types/compliance';

export const METROLOGY_RULES_2011: MetrologyRuleGuide[] = [
  {
    ruleCode: 'RULE_6_1_A',
    title: 'Manufacturer, Packer & Importer Identification',
    clause: 'Rule 6(1)(a) of Legal Metrology (Packaged Commodities) Rules, 2011',
    summary: 'Every package shall bear the name and complete postal address of the manufacturer, or where manufacturer is not the packer, the name and address of the manufacturer and packer.',
    statutoryObligation: 'Must declare physical street address, city, state, and pin code. Merely writing "Marketed by" without manufacturer or packer details is an offense.',
    penaltyDetails: 'Section 36(1) of Legal Metrology Act, 2009: Fine up to ₹25,000 (first offense), ₹50,000 (second offense), or imprisonment up to 1 year.'
  },
  {
    ruleCode: 'RULE_6_1_B',
    title: 'Net Quantity & Standard Measurement Units',
    clause: 'Rule 6(1)(b) & Second Schedule of Rules, 2011',
    summary: 'Net quantity in terms of standard unit of weight or measure (g, kg, ml, l) must be declared without symbols of non-standard units (e.g. gms, kgs, no, pieces without weight).',
    statutoryObligation: 'Units must follow SI symbols: g (gram), kg (kilogram), ml or mL (millilitre), l or L (litre), m (metre). Symbols like "gm", "gms", "KG", "ML" are non-compliant.',
    penaltyDetails: 'Section 36(1): Fine up to ₹25,000 for incorrect declaration; Section 30 for delivering short weight.'
  },
  {
    ruleCode: 'RULE_6_1_C',
    title: 'Month and Year of Manufacture / Packing',
    clause: 'Rule 6(1)(c) of Rules, 2011',
    summary: 'The month and year in which the commodity is manufactured or packed or imported shall be clearly mentioned on the principal display panel.',
    statutoryObligation: 'Must be unambiguous, e.g., "Mfg Date: 03/2026" or "Packed: March 2026". Pre-dating or omitting month is strictly prohibited.',
    penaltyDetails: 'Section 36(1): Non-compliance attracts seizure of consignment and prosecution.'
  },
  {
    ruleCode: 'RULE_6_1_D',
    title: 'Best Before / Use-by Date for Perishables',
    clause: 'Rule 6(1)(d) of Rules, 2011',
    summary: 'For commodities which may become unfit for human consumption after a period of time, the "Best Before" or "Use By" date, month and year shall be declared.',
    statutoryObligation: 'Mandatory on all foodstuffs, beverages, cosmetics, and perishable agricultural commodities.',
    penaltyDetails: 'Joint violation under Legal Metrology Act, 2009 and Food Safety and Standards Act, 2006.'
  },
  {
    ruleCode: 'RULE_6_1_E',
    title: 'MRP & Unit Sale Price (USP) Mandate',
    clause: 'Rule 6(1)(e) as amended in 2022 (Notification GSR 779(E))',
    summary: 'Maximum Retail Price (MRP) must include all taxes, with the words "inclusive of all taxes". Packages with net quantity > 1kg/1L must also declare the Unit Sale Price (e.g., ₹ 1.70 per 100g / ₹ 17.00 per kg).',
    statutoryObligation: 'Declaration must clearly state: "MRP ₹ ... (inclusive of all taxes)". Smudging, overwriting, or dual-pricing stickers is an offense.',
    penaltyDetails: 'Section 36(2): Selling above MRP or omitting USP attracts penalty up to ₹50,000.'
  },
  {
    ruleCode: 'RULE_6_1_F',
    title: 'Consumer Care & Grievance Redressal Mechanism',
    clause: 'Rule 6(1)(f) of Rules, 2011',
    summary: 'Name, address, telephone number, and email address of the person who can be contacted by the consumer in case of consumer complaints.',
    statutoryObligation: 'All four components (Contact Person/Officer, Physical Address, Active Phone/Toll-free, and Valid Email ID) must be provided.',
    penaltyDetails: 'Section 36(1): Seizure of non-compliant packaged stock.'
  },
  {
    ruleCode: 'RULE_6_10',
    title: 'Country of Origin Declaration',
    clause: 'Rule 6(10) of Rules, 2011',
    summary: 'Every package shall contain the name of the country of origin or manufacture or assembly.',
    statutoryObligation: 'Mandatory declaration: "Country of Origin: India" (or foreign state). E-commerce marketplaces and physical packaging must both display this.',
    penaltyDetails: 'Section 36(1): Statutory penalty and immediate compliance order.'
  },
  {
    ruleCode: 'RULE_7',
    title: 'Principal Display Panel & Minimum Font Height',
    clause: 'Rule 7 & Table 1 of Legal Metrology (Packaged Commodities) Rules, 2011',
    summary: 'Prescribes the minimum numeral and letter height for net quantity and mandatory declarations depending on the area of the Principal Display Panel (PDP).',
    statutoryObligation: 'Area <= 50 cm²: min 1.0 mm (blown/moulded 2.0 mm); 50 < Area <= 100 cm²: min 1.5 mm; 100 < Area <= 500 cm²: min 2.0 mm; 500 < Area <= 1000 cm²: min 4.0 mm; Area > 1000 cm²: min 6.0 mm.',
    minimumFontSizeTable: [
      { pdpArea: 'Area ≤ 50 cm²', minFontMm: '1.0 mm' },
      { pdpArea: '50 cm² < Area ≤ 100 cm²', minFontMm: '1.5 mm' },
      { pdpArea: '100 cm² < Area ≤ 500 cm²', minFontMm: '2.0 mm' },
      { pdpArea: '500 cm² < Area ≤ 1000 cm²', minFontMm: '4.0 mm' },
      { pdpArea: 'Area > 1000 cm²', minFontMm: '6.0 mm' }
    ],
    penaltyDetails: 'Section 36(1): Fine up to ₹25,000 for undersized numerals.'
  }
];
