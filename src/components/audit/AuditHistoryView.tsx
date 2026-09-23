import React, { useState } from 'react';
import { InspectionRecord } from '../../types/compliance';
import { FileText, Download, CheckCircle, XCircle, AlertOctagon, RefreshCw, Eye } from 'lucide-react';
import { generateInspectionPDF } from '../../services/pdfGenerator';

interface AuditHistoryViewProps {
  records: InspectionRecord[];
  onSelectRecord: (record: InspectionRecord) => void;
  onRefresh: () => void;
}

export const AuditHistoryView: React.FC<AuditHistoryViewProps> = ({
  records,
  onSelectRecord,
  onRefresh
}) => {
  const [filter, setFilter] = useState<'ALL' | 'PASS' | 'FAIL' | 'COUNTERFEIT'>('ALL');

  const filtered = records.filter((r) => {
    if (filter === 'PASS') return r.overallStatus === 'COMPLIANT_PASS';
    if (filter === 'FAIL') return r.overallStatus === 'NON_COMPLIANT_FAIL';
    if (filter === 'COUNTERFEIT') return r.overallStatus === 'COUNTERFEIT_FLAGGED';
    return true;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <span>Inspection Log & Statutory Audit Trail</span>
          </h2>
          <p className="text-xs text-slate-400">
            Immutable log of scanned packaged commodities, detected violations, and penalty notices
          </p>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
              filter === 'ALL' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            All ({records.length})
          </button>
          <button
            onClick={() => setFilter('PASS')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
              filter === 'PASS' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            Compliant
          </button>
          <button
            onClick={() => setFilter('FAIL')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
              filter === 'FAIL' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            Violations
          </button>
          <button
            onClick={() => setFilter('COUNTERFEIT')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
              filter === 'COUNTERFEIT' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            Counterfeits
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-3">Audit Ref & Timestamp</th>
              <th className="py-2.5 px-3">Commodity & Brand</th>
              <th className="py-2.5 px-3 text-center">Score</th>
              <th className="py-2.5 px-3 text-center">Verdict</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-medium">
            {filtered.map((item) => {
              const isPass = item.overallStatus === 'COMPLIANT_PASS';
              const isCounterfeit = item.overallStatus === 'COUNTERFEIT_FLAGGED';

              return (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3">
                    <div className="font-mono font-bold text-slate-200">{item.id}</div>
                    <div className="text-[10px] text-slate-500">{item.timestamp}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-white">{item.productName}</div>
                    <div className="text-[11px] text-slate-400">{item.brandName} • {item.fields.netQuantity}</div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold">
                    <span className={isPass ? 'text-emerald-400' : 'text-rose-400'}>
                      {item.complianceScore}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    {isPass ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>PASS</span>
                      </span>
                    ) : isCounterfeit ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                        <AlertOctagon className="w-3 h-3 text-amber-400" />
                        <span>COUNTERFEIT</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                        <XCircle className="w-3 h-3 text-rose-400" />
                        <span>FAIL</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onSelectRecord(item)}
                        className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 px-2 py-1 rounded text-xs flex items-center space-x-1"
                        title="Load into inspector workstation"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                      <button
                        onClick={() => generateInspectionPDF(item)}
                        className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded text-xs flex items-center space-x-1"
                        title="Download official PDF report"
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
