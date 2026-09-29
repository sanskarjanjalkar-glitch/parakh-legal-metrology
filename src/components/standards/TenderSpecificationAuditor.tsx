import React, { useState } from 'react';
import { TenderAuditResult } from '../../types/standards';
import { SAMPLE_TENDER_SNIPPETS } from '../../data/standardsDatabase';
import { auditTenderDocument } from '../../services/standardsEngine';
import {
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Building
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TenderSpecificationAuditor: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [customText, setCustomText] = useState<string>(SAMPLE_TENDER_SNIPPETS[0].extractedTextSnippet);
  const [auditResult, setAuditResult] = useState<TenderAuditResult>(SAMPLE_TENDER_SNIPPETS[0]);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    const snippet = SAMPLE_TENDER_SNIPPETS[index];
    setCustomText(snippet.extractedTextSnippet);
    setAuditResult(snippet);
  };

  const handleRunAudit = () => {
    if (!customText.trim()) return;
    const result = auditTenderDocument(customText);
    setAuditResult(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(auditResult.compliantClauseDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Tender Document Technical Specification Auditor</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-normal">
                  PS 26108 Engine
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Audits public tenders for outdated standards, omitted test methods, and missing mandatory QCO notifications.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Preset Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Select Sample Public Procurement Tender or Paste Technical Clause:
            </label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_TENDER_SNIPPETS.map((snippet, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(idx)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                    selectedPresetIndex === idx
                      ? 'bg-blue-600/30 border-blue-500 text-blue-200 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-slate-200 line-clamp-1">{snippet.tenderTitle}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{snippet.procurementAgency}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Textarea for Tender Text */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-300">Tender Clause / Specification Text:</span>
              <button
                onClick={handleRunAudit}
                className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Run AI Audit</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Paste tender specification snippet here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Health Score & Summary Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="md:col-span-4 flex items-center space-x-3">
              <div
                className={`p-3 rounded-xl font-mono text-2xl font-black ${
                  auditResult.overallHealthScore < 50
                    ? 'bg-rose-950/70 text-rose-400 border border-rose-800/50'
                    : 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/50'
                }`}
              >
                {auditResult.overallHealthScore}/100
              </div>
              <div>
                <div className="text-xs font-bold text-white">Tender Health Index</div>
                <div className="text-[11px] text-slate-400">
                  {auditResult.overallHealthScore < 50
                    ? 'Critical Legal & Standard Risks'
                    : 'Satisfactory Compliance'}
                </div>
              </div>
            </div>

            <div className="md:col-span-8 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-slate-200">{auditResult.tenderTitle}</div>
              <div className="text-slate-400 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                <span>{auditResult.procurementAgency}</span>
              </div>
            </div>
          </div>

          {/* Detailed Audit Findings */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Identified Non-Conformities & Omissions ({auditResult.findings.length})</span>
            </h3>

            <div className="space-y-3">
              {auditResult.findings.map((f, fIdx) => (
                <div
                  key={fIdx}
                  className={`border rounded-xl p-4 space-y-2 text-xs ${
                    f.severity === 'CRITICAL'
                      ? 'bg-rose-950/20 border-rose-900/50 text-rose-200'
                      : 'bg-amber-950/20 border-amber-900/50 text-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          f.severity === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {f.severity}
                      </span>
                      <span>{f.title}</span>
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      Issue #{fIdx + 1}
                    </span>
                  </div>

                  <p className="text-slate-300 leading-relaxed">
                    {f.description}
                  </p>

                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 text-slate-200">
                    <span className="text-emerald-400 font-semibold">Recommended Correction: </span>
                    {f.recommendedCorrection}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI-Generated Corrected GeM Technical Clause */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>AI-Corrected, 100% Compliant Tender Clause</span>
              </h3>
              <button
                onClick={handleCopy}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Corrected Clause'}</span>
              </button>
            </div>
            <div className="bg-slate-950 border border-emerald-900/40 rounded-xl p-4 font-mono text-xs text-slate-200 leading-relaxed select-all">
              {auditResult.compliantClauseDraft}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Aligned with GeM (Government e-Marketplace) & CPPP Tender Formats</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
