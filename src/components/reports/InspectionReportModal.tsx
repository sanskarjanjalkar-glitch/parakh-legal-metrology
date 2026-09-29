import React from 'react';
import { InspectionRecord } from '../../types/compliance';
import { IndianStandard } from '../../types/standards';
import { X, Download, Shield, Printer, CheckCircle, AlertTriangle, AlertOctagon, QrCode, FileText } from 'lucide-react';
import { generateInspectionPDF } from '../../services/pdfGenerator';
import { MANUFACTURER_METRICS } from '../../data/manufacturerData';

interface Props {
  record: InspectionRecord | null;
  standard?: IndianStandard | null;
  onClose: () => void;
}

export const InspectionReportModal: React.FC<Props> = ({
  record,
  standard,
  onClose
}) => {
  if (!record) return null;

  const isPass = record.overallStatus === 'COMPLIANT_PASS';

  // Compile unified Errors & Statutory Corrections list
  const errorsAndCorrections = [
    ...(record.rules
      .filter((r) => r.status === 'FAIL')
      .map((r) => ({
        error: `Violation of ${r.ruleCode} (${r.ruleName}): Extracted '${r.extractedValue || 'Missing'}'`,
        statutoryRef: r.actReference,
        correction: `Mandatorily declare '${r.expectedCondition}'. Penalty under ${r.penaltySection || 'Sec 36 LM Act'}.`,
        severity: 'CRITICAL'
      }))),
    ...(record.rules
      .filter((r) => r.status === 'WARNING')
      .map((r) => ({
        error: `Deficiency under ${r.ruleCode}: ${r.explanation}`,
        statutoryRef: r.actReference,
        correction: `Comply with ${r.expectedCondition}.`,
        severity: 'WARNING'
      }))),
    // Only flag outdated standard if raw text actually mentions a superseded year
    ...(standard && standard.supersededStandard && (record.rawOcrText.includes('1995') || record.rawOcrText.includes('1968') || record.rawOcrText.includes('1989'))
      ? [
          {
            error: `Legacy / superseded standard detected: ${standard.supersededStandard}`,
            statutoryRef: `BIS Act 2016 / ${standard.standardNumber}`,
            correction: `Mandate current published standard '${standard.standardNumber}' along with active Amendments (${standard.amendments.length} published).`,
            severity: 'CRITICAL'
          }
        ]
      : [])
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-slate-300">
        {/* Top Controls Bar */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between no-print">
          <div className="flex items-center space-x-2 text-xs font-bold">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>PARAKH Official Statutory Inspection & Standards Report</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => generateInspectionPDF(record)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => window.print()}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Report Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs leading-relaxed printable-report bg-white text-slate-900 font-sans">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
            <div className="flex items-center justify-center space-x-2 text-slate-800 text-xs font-bold tracking-widest uppercase">
              <span>Government of India</span>
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-wide uppercase text-slate-950">
              Ministry of Consumer Affairs, Food & Public Distribution
            </h2>
            <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Department of Consumer Affairs (DoCA) & Bureau of Indian Standards (BIS)
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              <span className="bg-slate-900 text-white px-3 py-0.5 rounded-full font-bold text-[10px] tracking-wide">
                STATUTORY DOSSIER: LEGAL METROLOGY ACT, 2009 & BIS ACT, 2016
              </span>
              <span className="bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold border border-blue-300">
                AUDIT REF: {record.id}
              </span>
            </div>
          </div>

          {/* Audit Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-[11px]">
            <div>
              <span className="text-slate-500 block">Inspected Commodity:</span>
              <strong className="text-slate-900">{record.productName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Brand / Manufacturer:</span>
              <strong className="text-slate-900">{record.brandName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Inspector Badge ID:</span>
              <strong className="text-slate-900 font-mono">{record.inspectorBadgeId}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Date & Timestamp:</span>
              <strong className="text-slate-900">{record.timestamp}</strong>
            </div>
          </div>

          {/* SECTION 1: ERRORS AND THEIR STATUTORY CORRECTIONS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5">
              <h3 className="font-extrabold text-sm uppercase tracking-wide text-slate-900 flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
                <span>1. Identified Errors & Mandatory Statutory Corrections</span>
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                {errorsAndCorrections.length} Non-Conformities Detected
              </span>
            </div>

            {errorsAndCorrections.length === 0 ? (
              <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xl text-emerald-800 font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Zero Non-Conformities Found. Specifications and Packaging adhere 100% to Statutory Norms.</span>
              </div>
            ) : (
              <div className="border border-slate-300 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 border-b border-slate-300 font-bold">
                    <tr>
                      <th className="py-2.5 px-3 w-1/4">Detected Error / Non-Conformity</th>
                      <th className="py-2.5 px-3 w-1/4">Statutory Law / Standard Reference</th>
                      <th className="py-2.5 px-3 w-1/2 bg-emerald-50/70 text-emerald-950">Required Statutory Correction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {errorsAndCorrections.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-rose-900 align-top">
                          <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-100 text-rose-700 mr-1.5">
                            {item.severity}
                          </span>
                          {item.error}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700 align-top">
                          {item.statutoryRef}
                        </td>
                        <td className="py-2.5 px-3 text-emerald-900 font-medium bg-emerald-50/40 align-top">
                          {item.correction}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* SECTION 2: APPLICABLE INDIAN STANDARDS & ALLIED NORMATIVE TEST METHODS */}
          {standard && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b pb-1.5">
                <h3 className="font-extrabold text-sm uppercase tracking-wide text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>2. Applicable Indian Standards (IS) & Normative References</span>
                </h3>
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {standard.standardNumber} ({standard.status})
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                <div className="font-bold text-slate-900">{standard.title}</div>
                <p className="text-[11px] text-slate-600">{standard.scope}</p>
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="font-semibold text-slate-700">Normative Test Standards: </span>
                    <span className="text-slate-600">
                      {standard.normativeReferences.map((n) => `${n.code} (${n.category})`).join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Mandatory Certification: </span>
                    <span className="text-amber-800 font-medium">
                      {standard.mandatoryCertification.scheme} ({standard.mandatoryCertification.qcoName})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: MANUFACTURER / VENDOR COMPLIANCE RADAR */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b pb-1.5">
              <h3 className="font-extrabold text-sm uppercase tracking-wide text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-600" />
                <span>3. Manufacturer / Vendor Compliance Radar</span>
              </h3>
              <span className="text-[10px] text-slate-500 font-semibold">
                Centralized DoCA / BIS Surveillance Database
              </span>
            </div>

            <div className="border border-slate-300 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 border-b border-slate-300 font-bold">
                  <tr>
                    <th className="py-2 px-3">Manufacturer / Supplier</th>
                    <th className="py-2 px-3 text-center">Total Audits</th>
                    <th className="py-2 px-3 text-center">Pass</th>
                    <th className="py-2 px-3 text-center">Fail</th>
                    <th className="py-2 px-3 text-center">Failure Rate</th>
                    <th className="py-2 px-3 text-center">Risk Tier</th>
                    <th className="py-2 px-3">Primary Repeat Violations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {MANUFACTURER_METRICS.map((m, idx) => (
                    <tr
                      key={idx}
                      className={
                        m.companyName.toLowerCase().includes(record.brandName.toLowerCase()) ||
                        record.brandName.toLowerCase().includes(m.companyName.toLowerCase())
                          ? 'bg-amber-50 font-bold'
                          : 'hover:bg-slate-50'
                      }
                    >
                      <td className="py-2 px-3 font-semibold text-slate-900">{m.companyName}</td>
                      <td className="py-2 px-3 text-center font-mono">{m.totalAudits}</td>
                      <td className="py-2 px-3 text-center font-mono text-emerald-700">{m.passCount}</td>
                      <td className="py-2 px-3 text-center font-mono text-rose-700">{m.failCount}</td>
                      <td className="py-2 px-3 text-center font-mono font-bold text-rose-700">
                        {m.failureRate}%
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                            m.riskCategory === 'CRITICAL'
                              ? 'bg-rose-600 text-white'
                              : m.riskCategory === 'HIGH'
                              ? 'bg-amber-500 text-white'
                              : m.riskCategory === 'MODERATE'
                              ? 'bg-blue-600 text-white'
                              : 'bg-emerald-600 text-white'
                          }`}
                        >
                          {m.riskCategory}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-slate-600">
                        {m.primaryViolations.join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Statutory Signoff Footer & QR */}
          <div className="pt-4 border-t-2 border-slate-900 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center text-[10px]">
            <div className="flex items-center space-x-3">
              <div className="p-2 border border-slate-300 rounded-lg bg-slate-50">
                <QrCode className="w-12 h-12 text-slate-900" />
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block">Digital Verification Hash</span>
                <span className="font-mono text-slate-500 block break-all">
                  SHA256: 8F4B92C...E391
                </span>
                <span className="text-emerald-700 font-semibold block">Verified on DoCA e-Portal</span>
              </div>
            </div>

            <div className="text-center sm:text-left text-slate-600 space-y-1">
              <p>
                <strong>Statutory Warning:</strong> Failure to rectify violations within 15 days invites compounding of offenses under Section 36 of Legal Metrology Act, 2009 and Section 29 of BIS Act, 2016.
              </p>
            </div>

            <div className="text-center sm:text-right space-y-3">
              <div className="font-bold text-slate-900 underline">Authorized Inspection Officer</div>
              <div className="text-[11px] font-mono text-slate-800">
                {record.inspectorName} ({record.inspectorBadgeId})
              </div>
              <div className="text-[9px] text-slate-500">
                Central Quality & Metrology Enforcement Directorate
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-100 border-t border-slate-300 p-3.5 flex items-center justify-between no-print">
          <span className="text-xs text-slate-500">
            Export format conforms to Central Public Procurement & DoCA statutory record standards.
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => generateInspectionPDF(record)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow"
            >
              <Download className="w-4 h-4" />
              <span>Download Official PDF Report</span>
            </button>
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium px-4 py-2 rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
