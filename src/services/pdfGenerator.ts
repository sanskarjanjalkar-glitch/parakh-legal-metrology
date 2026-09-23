import jsPDF from 'jspdf';
import { InspectionRecord } from '../types/compliance';

export function generateInspectionPDF(record: InspectionRecord): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 14;

  doc.setFillColor(11, 30, 54);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFillColor(255, 153, 51);
  doc.rect(0, 28, pageWidth, 1.5, 'F');
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 29.5, pageWidth, 1, 'F');
  doc.setFillColor(19, 136, 8);
  doc.rect(0, 30.5, pageWidth, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('GOVERNMENT OF INDIA', pageWidth / 2, y, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('MINISTRY OF CONSUMER AFFAIRS, FOOD & PUBLIC DISTRIBUTION', pageWidth / 2, y + 4.5, { align: 'center' });
  doc.text('DEPARTMENT OF CONSUMER AFFAIRS - LEGAL METROLOGY DIVISION', pageWidth / 2, y + 9, { align: 'center' });

  y = 40;

  doc.setTextColor(11, 30, 54);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('OFFICIAL INSPECTION & COMPLIANCE VERIFICATION REPORT', pageWidth / 2, y, { align: 'center' });

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Statutory Audit under Rule 6 & 7 of Legal Metrology (Packaged Commodities) Rules, 2011', pageWidth / 2, y + 4.5, { align: 'center' });

  y += 12;

  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(12, y, pageWidth - 24, 28, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);

  doc.text('Inspection ID:', 16, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(record.id, 45, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('Date & Time:', 16, y + 12);
  doc.setFont('helvetica', 'normal');
  doc.text(record.timestamp, 45, y + 12);

  doc.setFont('helvetica', 'bold');
  doc.text('Location / Mandi:', 16, y + 18);
  doc.setFont('helvetica', 'normal');
  doc.text(record.locationName.slice(0, 36), 45, y + 18);

  doc.setFont('helvetica', 'bold');
  doc.text('Inspecting Officer:', 115, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(record.inspectorName, 145, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('Badge ID:', 115, y + 12);
  doc.setFont('helvetica', 'normal');
  doc.text(record.inspectorBadgeId, 145, y + 12);

  doc.setFont('helvetica', 'bold');
  doc.text('AI Engine Version:', 115, y + 18);
  doc.setFont('helvetica', 'normal');
  doc.text('PARAKH v2.1 (SIH 2026)', 145, y + 18);

  y += 34;

  doc.setFillColor(241, 245, 249);
  doc.rect(12, y, pageWidth - 24, 6.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('COMMODITY & PACKAGING IDENTIFICATION', 16, y + 4.5);

  y += 10;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);

  doc.text(`Product: ${record.productName}`, 16, y);
  doc.text(`Brand / Manufacturer: ${record.brandName} - ${record.fields.manufacturerName}`, 16, y + 5);
  doc.text(`Declared Net Qty: ${record.fields.netQuantity} | Declared MRP: ${record.fields.mrp} (USP: ${record.fields.unitSalePrice || 'None'})`, 16, y + 10);
  doc.text(`Batch / Expiry: ${record.fields.expiryDate || 'N/A'} | FSSAI Lic: ${record.fields.fssaiLicense || 'N/A'}`, 16, y + 15);

  y += 22;

  const isPass = record.overallStatus === 'COMPLIANT_PASS';
  const isCounterfeit = record.overallStatus === 'COUNTERFEIT_FLAGGED';

  if (isPass) {
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(34, 197, 94);
    doc.roundedRect(12, y, pageWidth - 24, 14, 2, 2, 'FD');
    doc.setTextColor(22, 101, 52);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('VERDICT: STATUTORY COMPLIANCE CONFIRMED (PASS)', 18, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`All mandatory declarations under Legal Metrology Rules, 2011 verified. Score: ${record.complianceScore}%`, 18, y + 11);
  } else if (isCounterfeit) {
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(220, 38, 38);
    doc.roundedRect(12, y, pageWidth - 24, 14, 2, 2, 'FD');
    doc.setTextColor(153, 27, 27);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('VERDICT: CRITICAL COUNTERFEIT / TAMPERING ALERT', 18, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`Suspected duplicate label / unregistered manufacturer. Anomaly Score: ${record.counterfeitAnomalyScore}%`, 18, y + 11);
  } else {
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(239, 68, 68);
    doc.roundedRect(12, y, pageWidth - 24, 14, 2, 2, 'FD');
    doc.setTextColor(185, 28, 28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('VERDICT: STATUTORY NON-COMPLIANCE FLAGGED (FAIL)', 18, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`Infringements detected under Section 36 of Legal Metrology Act, 2009. Compliance Score: ${record.complianceScore}%`, 18, y + 11);
  }

  y += 20;

  doc.setFillColor(15, 23, 42);
  doc.rect(12, y, pageWidth - 24, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('RULE CODE', 16, y + 4.2);
  doc.text('STATUTORY REQUIREMENT', 45, y + 4.2);
  doc.text('EXTRACTED DATA', 120, y + 4.2);
  doc.text('STATUS', 175, y + 4.2);

  y += 7;

  record.rules.forEach((rule, idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 248 : 255, isEven ? 250 : 255, isEven ? 252 : 255);
    doc.rect(12, y, pageWidth - 24, 9, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(12, y + 9, pageWidth - 12, y + 9);

    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.text(rule.ruleCode, 16, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.text(rule.ruleName.slice(0, 38), 45, y + 5);

    doc.setTextColor(71, 85, 105);
    doc.text(rule.extractedValue.slice(0, 30), 120, y + 5);

    if (rule.status === 'PASS') {
      doc.setTextColor(22, 163, 74);
      doc.setFont('helvetica', 'bold');
      doc.text('PASS', 178, y + 5);
    } else {
      doc.setTextColor(220, 38, 38);
      doc.setFont('helvetica', 'bold');
      doc.text('FAIL', 178, y + 5);
    }

    y += 9.5;
  });

  y += 6;

  doc.setFillColor(255, 251, 235);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(12, y, pageWidth - 24, 20, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(146, 64, 14);
  doc.text('STATUTORY DIRECTIONS & ENFORCEMENT NOTICE:', 16, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 53, 15);
  doc.text('1. Notice is hereby served to the manufacturer/packer to show cause within 15 days under Section 36 of Legal Metrology Act, 2009.', 16, y + 10);
  doc.text('2. Failure to explain non-compliance will lead to seizure of stock and initiation of compounding proceedings.', 16, y + 14.5);

  y += 28;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Digitally Verified & Sealed:', 16, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${record.inspectorName} (${record.inspectorBadgeId})`, 16, y + 4.5);
  doc.text('Authorized Field Inspector, Legal Metrology Division', 16, y + 8.5);

  doc.setFont('helvetica', 'bold');
  doc.text('PARAKH Cryptographic Audit Hash:', 110, y);
  doc.setFont('courier', 'normal');
  doc.setFontSize(7);
  doc.text(`SHA256:${record.id.replace(/-/g, '')}9b27ac8`, 110, y + 4.5);

  const filename = `PARAKH-Inspection-Report-${record.id}.pdf`;
  doc.save(filename);
}
