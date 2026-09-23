import React from 'react';
import { InspectionRecord } from '../../types/compliance';
import { Download, FileJson, CheckCircle2, XCircle, AlertTriangle, AlertOctagon, Scale } from 'lucide-react';
import { generateInspectionPDF } from '../../services/pdfGenerator';

interface ComplianceVerdictProps {
  record: InspectionRecord;
  onViewReportModal: () => void;
}

export const ComplianceVerdict: React.FC<ComplianceVerdictProps> = ({
  record,
  onViewReportModal
}) => {
  const isPass = record.overallStatus === 'COMPLIANT_PASS';
  const isCounterfeit = record.overallStatus === 'COUNTERFEIT_FLAGGED';

  const exportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(record, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `PARAKH-Audit-${record.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Compliance Status
          </span>
          <div className="flex items-center space-x-2 mt-0.5">
            {isPass ? (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-700 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Compliant (PASS)</span>
              </span>
            ) : isCounterfeit ? (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-extrabold bg-amber-950 text-amber-300 border border-amber-600 shadow-sm animate-pulse">
                <AlertOctagon className="w-4 h-4 text-amber-400" />
                <span>Counterfeit Flagged (High Risk)</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-extrabold bg-rose-950 text-rose-300 border border-rose-700 shadow-sm">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Non-Compliance Flagged</span>
              </span>
            )}
            <span className="text-xs font-mono font-bold text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              Score: {record.complianceScore}%
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => generateInspectionPDF(record)}
            className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-3.5 rounded-lg shadow-lg shadow-emerald-600/20 flex items-center justify-center space-x-1.5 transition"
            title="Generates official Government of India Legal Metrology Inspection Notice"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Official Inspection Report (PDF)</span>
          </button>
          <button
            onClick={exportJson}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-3 rounded-lg border border-slate-700 flex items-center space-x-1 transition"
          >
            <FileJson className="w-3.5 h-3.5 text-blue-400" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center justify-between">
          <span className="flex items-center space-x-1.5">
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            <span>Legal Metrology Act, 2009 & Rules 2011 Audit</span>
          </span>
          <span className="text-[10px] text-slate-500 font-normal">
            Explainable AI Validation
          </span>
        </h4>

        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {record.rules.map((rule) => {
            const passed = rule.status === 'PASS';
            return (
              <div
                key={rule.ruleCode}
                className={`p-2.5 rounded-lg border text-xs transition-colors ${
                  passed
                    ? 'bg-slate-950/60 border-slate-800 hover:border-emerald-900/50'
                    : 'bg-rose-950/20 border-rose-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1.5">
                    {passed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    )}
                    <span className="font-bold text-slate-200">
                      {rule.ruleName}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      passed
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                        : 'bg-rose-950 text-rose-400 border border-rose-800/60'
                    }`}
                  >
                    {rule.ruleCode}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 pl-5">
                  <div>
                    <span className="text-slate-500">Extracted:</span>{' '}
                    <span className="font-mono text-slate-300">{rule.extractedValue}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {rule.explanation}
                  </div>
                  {rule.penaltySection && (
                    <div className="text-[10px] text-rose-300 font-semibold mt-1 bg-rose-950/40 p-1 rounded border border-rose-900/40 inline-block">
                      ⚖️ Penalty: {rule.penaltySection}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
