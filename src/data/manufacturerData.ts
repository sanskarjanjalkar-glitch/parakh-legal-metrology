import { ManufacturerMetric } from '../types/compliance';

export const INITIAL_MANUFACTURERS: ManufacturerMetric[] = [
  {
    companyName: 'Apex Foods Ltd',
    totalAudits: 16,
    passCount: 4,
    failCount: 12,
    failureRate: 73,
    riskCategory: 'CRITICAL',
    primaryViolations: ['Rule 6(1)(e): Missing Unit Sale Price', 'Rule 7: Font size < 2mm', 'Rule 6(1)(f): Incomplete customer care email'],
    lastInspectedDate: '2026-09-15'
  },
  {
    companyName: 'Kavya Agro',
    totalAudits: 18,
    passCount: 7,
    failCount: 11,
    failureRate: 58,
    riskCategory: 'HIGH',
    primaryViolations: ['Rule 6(1)(b): Non-standard quantity unit "gms"', 'Rule 6(1)(c): Ambiguous packaging date'],
    lastInspectedDate: '2026-09-14'
  },
  {
    companyName: 'ShivShakti Spices',
    totalAudits: 95,
    passCount: 56,
    failCount: 39,
    failureRate: 41,
    riskCategory: 'MODERATE',
    primaryViolations: ['Rule 6(1)(a): Missing complete factory postal address', 'Rule 6(10): Missing Country of Origin'],
    lastInspectedDate: '2026-09-12'
  },
  {
    companyName: 'Tata Consumer',
    totalAudits: 101,
    passCount: 99,
    failCount: 2,
    failureRate: 2.1,
    riskCategory: 'LOW',
    primaryViolations: ['Rule 7: Border spacing tolerance warning'],
    lastInspectedDate: '2026-09-16'
  },
  {
    companyName: 'ITC Foods Division',
    totalAudits: 88,
    passCount: 85,
    failCount: 3,
    failureRate: 3.4,
    riskCategory: 'LOW',
    primaryViolations: ['Minor ink smudge on batch code'],
    lastInspectedDate: '2026-09-10'
  },
  {
    companyName: 'Surya Packaging & Foods',
    totalAudits: 29,
    passCount: 8,
    failCount: 21,
    failureRate: 72.4,
    riskCategory: 'CRITICAL',
    primaryViolations: ['Rule 6(1)(e): Overprinted MRP sticker', 'Rule 6(1)(a): Unregistered packer facility'],
    lastInspectedDate: '2026-09-17'
  }
];
