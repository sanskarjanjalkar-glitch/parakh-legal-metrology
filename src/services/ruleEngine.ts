import { ExtractedProductFields, RuleEvaluation, ComplianceVerdictType } from '../types/compliance';

export function evaluateLegalMetrologyRules(
  fields: ExtractedProductFields,
  pdpAreaCm2 = 250,
  measuredFontMm = 2.4
): {
  rules: RuleEvaluation[];
  overallStatus: ComplianceVerdictType;
  complianceScore: number;
  anomalyScore: number;
  penaltyEstimate: string;
} {
  const evaluations: RuleEvaluation[] = [];
  let passedCount = 0;
  let totalMandatory = 0;

  totalMandatory++;
  const hasValidAddress = fields.manufacturerAddress && fields.manufacturerAddress.length >= 12;
  const mfgPass = Boolean(fields.manufacturerName && hasValidAddress);
  if (mfgPass) passedCount++;
  evaluations.push({
    ruleCode: 'RULE_6_1_A',
    ruleName: 'Manufacturer / Packer Declaration',
    actReference: 'Legal Metrology (Packaged Commodities) Rules, 2011, Rule 6(1)(a)',
    description: 'Name and complete physical street address of manufacturer or packer',
    mandatory: true,
    status: mfgPass ? 'PASS' : 'FAIL',
    extractedValue: `${fields.manufacturerName || 'N/A'}, ${fields.manufacturerAddress || 'N/A'}`,
    expectedCondition: 'Registered business name + Physical facility address',
    explanation: mfgPass
      ? 'Verified full manufacturer identity and address.'
      : 'Non-compliant: Incomplete or missing physical factory address. Violates Section 36(1).',
    penaltySection: mfgPass ? undefined : 'Sec 36(1) Legal Metrology Act, 2009 (Fine up to ₹25,000)'
  });

  totalMandatory++;
  const qtyPass = Boolean(fields.netQuantity && fields.netQuantityStandardUnit);
  if (qtyPass) passedCount++;
  evaluations.push({
    ruleCode: 'RULE_6_1_B',
    ruleName: 'Net Quantity & Standard SI Units',
    actReference: 'Legal Metrology Rules, 2011, Rule 6(1)(b) & Second Schedule',
    description: 'Quantity declared in legal SI symbols (g, kg, ml, l). Non-standard units (gms, kgs) forbidden',
    mandatory: true,
    status: qtyPass ? 'PASS' : 'FAIL',
    extractedValue: fields.netQuantity || 'Not detected',
    expectedCondition: 'Standard SI symbol without pluralization or abbreviations like "gms"',
    explanation: qtyPass
      ? `Net quantity declared in legal SI metric units (${fields.netQuantity}).`
      : `Violation: Non-standard unit expression (${fields.netQuantity}) detected. Rule 6(1)(b) strictly prohibits "gms", "gm", "kgs".`,
    penaltySection: qtyPass ? undefined : 'Sec 36(1) & Sec 30 Legal Metrology Act, 2009'
  });

  totalMandatory++;
  const datePass = Boolean(fields.manufactureDate);
  if (datePass) passedCount++;
  evaluations.push({
    ruleCode: 'RULE_6_1_C_D',
    ruleName: 'Manufacturing Date & Expiry Declaration',
    actReference: 'Legal Metrology Rules, 2011, Rule 6(1)(c) & 6(1)(d)',
    description: 'Legible month & year of packing and Best Before / Expiry for consumables',
    mandatory: true,
    status: datePass ? 'PASS' : 'FAIL',
    extractedValue: `Mfg: ${fields.manufactureDate || 'Missing'} | Exp: ${fields.expiryDate || 'N/A'}`,
    expectedCondition: 'Clear Month & Year format (e.g. MM/YYYY)',
    explanation: datePass
      ? 'Packing and durability dates clearly established.'
      : 'Non-compliant: Date of manufacturing/packing is illegible or missing.',
    penaltySection: datePass ? undefined : 'Sec 36(1) Legal Metrology Act, 2009'
  });

  totalMandatory++;
  const numericQty = parseFloat(fields.netQuantity) || 0;
  const isLargePack = fields.netQuantity.toLowerCase().includes('kg') || 
                      fields.netQuantity.toLowerCase().includes('l') || 
                      numericQty >= 1000;
  
  const uspPass = !isLargePack || Boolean(fields.unitSalePrice && fields.unitSalePrice.trim().length > 0);
  const mrpPass = Boolean(fields.mrp && uspPass);
  if (mrpPass) passedCount++;
  
  evaluations.push({
    ruleCode: 'RULE_6_1_E',
    ruleName: 'Maximum Retail Price & Unit Sale Price (USP)',
    actReference: 'Legal Metrology (Packaged Commodities) Amendment Rules, 2022 (GSR 779(E))',
    description: 'MRP in INR inclusive of all taxes, plus mandatory Unit Sale Price for commodities > 1kg/1L',
    mandatory: true,
    status: mrpPass ? 'PASS' : 'FAIL',
    extractedValue: `${fields.mrp || 'N/A'} ${fields.unitSalePrice ? `| USP: ${fields.unitSalePrice}` : '[USP Missing]'}`,
    expectedCondition: isLargePack
      ? 'Total MRP + Unit Sale Price (e.g. ₹ per 100g / ₹ per kg)'
      : 'Total MRP (inclusive of all taxes)',
    explanation: mrpPass
      ? 'Complies with pricing regulations and mandatory tax declarations.'
      : isLargePack && !fields.unitSalePrice
        ? 'Violation: GSR 779(E) mandates Unit Sale Price for packages of 1kg/1L or larger to protect consumers from deceptive sizing.'
        : 'Non-compliant: MRP declaration missing or non-conforming.',
    penaltySection: mrpPass ? undefined : 'Sec 36(2) Legal Metrology Act, 2009 (Fine up to ₹50,000)'
  });

  totalMandatory++;
  const hasPhone = Boolean(fields.consumerCarePhone && fields.consumerCarePhone.trim().length > 6);
  const hasEmail = Boolean(fields.consumerCareEmail && fields.consumerCareEmail.includes('@'));
  const carePass = Boolean(hasPhone && hasEmail);
  if (carePass) passedCount++;
  evaluations.push({
    ruleCode: 'RULE_6_1_F',
    ruleName: 'Consumer Grievance Cell Details',
    actReference: 'Legal Metrology Rules, 2011, Rule 6(1)(f)',
    description: 'Contact telephone number AND official email of designated grievance officer',
    mandatory: true,
    status: carePass ? 'PASS' : 'FAIL',
    extractedValue: `Phone: ${fields.consumerCarePhone || 'None'} | Email: ${fields.consumerCareEmail || 'None'}`,
    expectedCondition: 'Both active Telephone AND Email address required',
    explanation: carePass
      ? 'Full two-way electronic and telephonic consumer redressal channels declared.'
      : !hasEmail && !hasPhone
        ? 'Critical Violation: Both consumer care phone and email are omitted.'
        : !hasEmail
          ? 'Violation: Consumer care email address omitted. Only phone provided.'
          : 'Violation: Helpline telephone omitted.',
    penaltySection: carePass ? undefined : 'Sec 36(1) Legal Metrology Act, 2009'
  });

  totalMandatory++;
  let requiredMinFont = 2.0;
  if (pdpAreaCm2 <= 50) requiredMinFont = 1.0;
  else if (pdpAreaCm2 <= 100) requiredMinFont = 1.5;
  else if (pdpAreaCm2 <= 500) requiredMinFont = 2.0;
  else if (pdpAreaCm2 <= 1000) requiredMinFont = 4.0;
  else requiredMinFont = 6.0;

  const fontPass = measuredFontMm >= requiredMinFont;
  if (fontPass) passedCount++;
  evaluations.push({
    ruleCode: 'RULE_7',
    ruleName: 'Principal Display Panel Font Height (Rule 7)',
    actReference: 'Legal Metrology Rules, 2011, Rule 7 & Table 1',
    description: `Minimum numeral/letter height based on PDP area (${pdpAreaCm2} cm²)`,
    mandatory: true,
    status: fontPass ? 'PASS' : 'FAIL',
    extractedValue: `Measured: ${measuredFontMm.toFixed(1)} mm (Required: ≥ ${requiredMinFont.toFixed(1)} mm)`,
    expectedCondition: `≥ ${requiredMinFont.toFixed(1)} mm for PDP area ${pdpAreaCm2} cm²`,
    explanation: fontPass
      ? `Typography passes statutory legibility standards (${measuredFontMm.toFixed(1)} mm ≥ ${requiredMinFont.toFixed(1)} mm).`
      : `Violation: Numeral font height of ${measuredFontMm.toFixed(1)} mm is below the statutory threshold of ${requiredMinFont.toFixed(1)} mm.`,
    penaltySection: fontPass ? undefined : 'Sec 36(1) Legal Metrology Act, 2009'
  });

  const originPass = Boolean(fields.countryOfOrigin && fields.countryOfOrigin.trim().length > 1);
  evaluations.push({
    ruleCode: 'RULE_6_10',
    ruleName: 'Country of Origin Declaration',
    actReference: 'Legal Metrology Rules, 2011, Rule 6(10)',
    description: 'Declaration of country of manufacture or assembly',
    mandatory: false,
    status: originPass ? 'PASS' : 'WARNING',
    extractedValue: fields.countryOfOrigin || 'Not declared',
    expectedCondition: 'Country name (e.g., India)',
    explanation: originPass
      ? `Country of origin properly declared as "${fields.countryOfOrigin}".`
      : 'Advisory: Country of origin declaration is missing.',
    penaltySection: originPass ? undefined : 'Statutory warning under Section 36'
  });

  const complianceScore = Math.round((passedCount / totalMandatory) * 100);
  
  let anomalyScore = 10;
  if (!fields.manufacturerAddress || fields.manufacturerAddress.length < 15) anomalyScore += 35;
  if (!fields.fssaiLicense || fields.fssaiLicense.length !== 14) anomalyScore += 25;
  if (!fields.netQuantityStandardUnit) anomalyScore += 15;
  if (fields.mrp.includes('Overwritten') || fields.mrp.includes('Smudged')) anomalyScore += 40;

  let overallStatus: ComplianceVerdictType = 'COMPLIANT_PASS';
  if (anomalyScore >= 65) {
    overallStatus = 'COUNTERFEIT_FLAGGED';
  } else if (complianceScore < 85) {
    overallStatus = 'NON_COMPLIANT_FAIL';
  }

  let penaltyEstimate = 'None (Full Statutory Compliance)';
  if (overallStatus === 'COUNTERFEIT_FLAGGED') {
    penaltyEstimate = 'Immediate Stock Seizure + Criminal Prosecution under Sec 36(1) & IPC 420';
  } else if (overallStatus === 'NON_COMPLIANT_FAIL') {
    const fines = [];
    if (!mfgPass) fines.push('₹25,000 (Sec 36(1) - Address)');
    if (!qtyPass) fines.push('₹25,000 (Sec 36(1) - Units)');
    if (!mrpPass) fines.push('₹50,000 (Sec 36(2) - Price)');
    if (!carePass) fines.push('₹25,000 (Sec 36(1) - Care)');
    penaltyEstimate = `Estimated Compound Penalty: ${fines.join(' + ') || '₹25,000'}`;
  }

  return {
    rules: evaluations,
    overallStatus,
    complianceScore,
    anomalyScore,
    penaltyEstimate
  };
}
