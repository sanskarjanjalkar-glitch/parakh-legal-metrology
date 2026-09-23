export type UserRole = 'INSPECTOR' | 'SUPERVISOR' | 'ADMIN';

export interface UserSession {
  name: string;
  badgeId: string;
  role: UserRole;
  designation: string;
  zone: string;
  avatarUrl?: string;
}

export type ComplianceVerdictType = 'COMPLIANT_PASS' | 'NON_COMPLIANT_FAIL' | 'COUNTERFEIT_FLAGGED';

export interface BoundingBox {
  id: string;
  field: string;
  label: string;
  ruleCode: string;
  x: number;      // percentage 0 - 100
  y: number;      // percentage 0 - 100
  width: number;  // percentage 0 - 100
  height: number; // percentage 0 - 100
  text: string;
  status: 'pass' | 'fail' | 'warning';
  confidence: number;
  measuredFontMm?: number;
  requiredFontMm?: number;
  notes?: string;
}

export interface RuleEvaluation {
  ruleCode: string;
  ruleName: string;
  actReference: string;
  description: string;
  mandatory: boolean;
  status: 'PASS' | 'FAIL' | 'WARNING';
  extractedValue: string;
  expectedCondition: string;
  explanation: string;
  penaltySection?: string;
}

export interface ExtractedProductFields {
  manufacturerName: string;
  manufacturerAddress: string;
  netQuantity: string;
  netQuantityStandardUnit: boolean;
  mrp: string;
  unitSalePrice: string; // e.g. ₹ 1.70 / 100g (Mandatory Rule 6(1)(e))
  manufactureDate: string;
  expiryDate: string;
  consumerCarePhone: string;
  consumerCareEmail: string;
  countryOfOrigin: string;
  fssaiLicense: string;
  standardSymbol: 'VEG' | 'NON_VEG' | 'NOT_APPLICABLE' | 'MISSING';
  isiStandardMark: boolean;
  barcode: string;
}

export interface InspectionRecord {
  id: string;
  timestamp: string;
  inspectorBadgeId: string;
  inspectorName: string;
  locationName: string;
  productName: string;
  brandName: string;
  packagingType: string;
  pdpAreaCm2: number;
  imageUri: string;
  rawOcrText: string;
  fields: ExtractedProductFields;
  boundingBoxes: BoundingBox[];
  rules: RuleEvaluation[];
  overallStatus: ComplianceVerdictType;
  complianceScore: number; // 0 to 100
  counterfeitAnomalyScore: number; // 0 to 100
  isCounterfeitRisk: boolean;
  offlineQueued?: boolean;
}

export interface ManufacturerMetric {
  companyName: string;
  totalAudits: number;
  passCount: number;
  failCount: number;
  failureRate: number; // e.g. 73%
  riskCategory: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  primaryViolations: string[];
  lastInspectedDate: string;
}

export interface MetrologyRuleGuide {
  ruleCode: string;
  title: string;
  clause: string;
  summary: string;
  statutoryObligation: string;
  minimumFontSizeTable?: { pdpArea: string; minFontMm: string }[];
  penaltyDetails: string;
}
