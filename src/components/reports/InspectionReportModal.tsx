import React, { useState } from 'react';
import { InspectionRecord } from '../../types/compliance';
import { X, Download, Shield, Printer, CheckCircle, XCircle } from 'lucide-react';
import { generateInspectionPDF } from '../../services/pdfGenerator';

interface InspectionReportModalProps {
  record: InspectionRecord | null;
  onClose: () => void;
}

export const InspectionReportModal: React.FC<InspectionReportModalProps> = ({
  record,
  onClose
}) => {
  if (!record) return null;

  const isPass = record.overallStatus === 'COMPLIANT_PASS';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between no-print">
          <div className="flex items-center space-x-2 text-xs font-bold">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>Statutory Inspection Record Viewer</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => generateInspectionPDF(record)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save PDF</span>
            </button>
            <button
              onClick={() => window.print()}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed">
          <div className="text-center border-b pb-3 space-y-1">
            <h2 className="text-base font-extrabold tracking-wide uppercase text-slate-900">
              Government of India
            </h2>
            <p className="text-[11px] font-semibold text-slate-700">
              Ministry of Consumer Affairs, Food & Public Distribution
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
              Department of Consumer Affairs • Legal Metrology Division
            </p>
            <div className="pt-1">
              <span className="bg-slate-100 text-slate-800 px-3 py-0.5 rounded-full font-bold text-[10px] border border-slate-300">
                Statutory Notice of Inspection under Sec 36, Legal Metrology Act, 2009
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-[11px]">
            <div>
              <strong>Report Ref:</strong> {record.id}<br />
              <strong>Timestamp:</strong> {record.timestamp}<br />
              <strong>Location:</strong> {record.locationName}
            </div>
            <div>
              <strong>Field Officer:</strong> {record.inspectorName}<br />
              <strong>Badge ID:</strong> {record.inspectorBadgeId}<br />
              <strong>Commodity:</strong> {record.productName}
            </div>
          </div>

          <div
            className={`p-3 rounded-lg border flex items-center justify-between ${
              isPass
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}
          >
            <div>
              <div className="font-bold text-sm">
                VERDICT: {isPass ? 'COMPLIANCE CERTIFIED (PASS)' : 'NON-COMPLIANCE FLAGGED (FAIL)'}
              </div>
              <div className="text-[11px]">
                {isPass
                  ? 'All mandatory packaging declarations conform to statutory provisions.'
                  : 'Infringements detected under Rule 6 / Rule 7 of Legal Metrology Rules, 2011.'}
              </div>
            </div>
            <div className="text-right font-mono font-bold text-sm">
              Score: {record.complianceScore}%
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-1.5 uppercase text-[11px]">
              Summary of Declarations & Infringements
            </h4>
            <table className="w-full border border-slate-300 text-[11px]">
              <thead className="bg-slate-100 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2 text-left">Rule Reference</th>
                  <th className="p-2 text-left">Extracted Value</th>
                  <th className="p-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {record.rules.map((rule) => (
                  <tr key={rule.ruleCode}>
                    <td className="p-2">
                      <div className="font-bold">{rule.ruleName}</div>
                      <div className="text-slate-500 font-mono text-[10px]">{rule.actReference}</div>
                    </td>
                    <td className="p-2 font-mono text-slate-700">{rule.extractedValue}</td>
                    <td className="p-2 text-center font-bold">
                      {rule.status === 'PASS' ? (
                        <span className="text-emerald-700">PASS</span>
                      ) : (
                        <span className="text-rose-700">FAIL</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t flex justify-between items-end text-[11px] text-slate-600">
            <div>
              <p className="font-semibold text-slate-900">Digitally Verified & Sealed</p>
              <p>{record.inspectorName} ({record.inspectorBadgeId})</p>
              <p>Legal Metrology Inspectorate</p>
            </div>
            <div className="text-right font-mono text-[10px] text-slate-400">
              Generated via PARAKH Engine<br />
              SIH-2026-AFRD02
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
