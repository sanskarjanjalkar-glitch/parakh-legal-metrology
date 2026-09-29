export type StandardStatus = 'ACTIVE' | 'SUPERSEDED' | 'UNDER_REVISION';

export interface StandardAmendment {
  amdNumber: string;
  monthYear: string;
  summary: string;
  keyChanges: string[];
}

export interface NormativeReference {
  code: string;
  title: string;
  category: 'TEST_METHOD' | 'RAW_MATERIAL' | 'SAFETY_CODE' | 'TERMINOLOGY' | 'RELATED_PRODUCT';
  description: string;
  isMandatoryForTender: boolean;
}

export interface MandatoryCertification {
  isMandatory: boolean;
  scheme: string; // e.g. "BIS Product Certification Scheme-I (ISI Mark)" or "Compulsory Registration Scheme (CRS)"
  qcoName: string; // Quality Control Order Gazette title
  gazetteNotification: string; // e.g. "S.O. 1248(E)"
  ministry: string;
  enforcementDate: string;
  scopeSummary: string;
  penaltiesForNonCompliance: string;
}

export interface IndianStandard {
  id: string;
  standardNumber: string; // e.g. "IS 4984:2016"
  yearPublished: number;
  reaffirmedYear?: number;
  title: string;
  division: string; // e.g. "Civil Engineering (CED 56)", "Electrotechnical (ETD 23)"
  status: StandardStatus;
  supersededStandard?: string; // e.g. "IS 4984:1995"
  scope: string;
  keySpecifications: {
    property: string;
    requirement: string;
    testStandardRef: string;
  }[];
  amendments: StandardAmendment[];
  normativeReferences: NormativeReference[];
  mandatoryCertification: MandatoryCertification;
  applicableIndustries: string[];
  procurementCategory: string; // e.g. "Pipes & Infrastructure", "Smart Lighting & Electronics", "Civil Construction"
  sampleTenderClause: string;
  keywords: string[];
}

export interface ProcurementQuery {
  rawQuery: string;
  detectedLanguage: string; // "en" | "hi" | "mr" | "ta" | "bn"
  translatedQuery: string;
  extractedParameters: {
    productType?: string;
    material?: string;
    gradeOrRating?: string;
    application?: string;
  };
}

export interface RecommendationResult {
  query: ProcurementQuery;
  primaryStandard: IndianStandard;
  matchScore: number; // e.g. 98.6%
  semanticRationale: string;
  alliedStandards: NormativeReference[];
  amendmentsNotice: string;
  certificationStatus: MandatoryCertification;
  tenderClauseDraft: string;
  alternativeStandards: {
    standard: IndianStandard;
    score: number;
    differenceNotes: string;
  }[];
}

export interface TenderAuditFinding {
  type: 'OUTDATED_STANDARD' | 'MISSING_MANDATORY_QCO' | 'MISSING_NORMATIVE_TEST' | 'AMBIGUOUS_SPECIFICATION';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  description: string;
  recommendedCorrection: string;
}

export interface TenderAuditResult {
  tenderTitle: string;
  procurementAgency: string;
  extractedTextSnippet: string;
  findings: TenderAuditFinding[];
  recommendedStandards: IndianStandard[];
  compliantClauseDraft: string;
  overallHealthScore: number; // 0 - 100
}
