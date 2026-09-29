import React, { useState } from 'react';
import { IndianStandard, RecommendationResult } from '../../types/standards';
import { recommendIndianStandards } from '../../services/standardsEngine';
import { INDIAN_STANDARDS_DATABASE } from '../../data/standardsDatabase';
import {
  Search,
  Sparkles,
  BookOpen,
  FileCheck,
  AlertTriangle,
  Layers,
  Copy,
  Check,
  Globe,
  Award,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  FileText,
  Activity,
  History,
  Info
} from 'lucide-react';

interface Props {
  onOpenTenderAuditor: () => void;
}

export const StandardsRecommender: React.FC<Props> = ({ onOpenTenderAuditor }) => {
  const [searchQuery, setSearchQuery] = useState<string>(
    'High density polyethylene pipes 110mm for drinking water supply network'
  );
  const [result, setResult] = useState<RecommendationResult>(() =>
    recommendIndianStandards('High density polyethylene pipes 110mm for drinking water supply network')
  );
  const [activeSubTab, setActiveSubTab] = useState<'allied' | 'amendments' | 'certification' | 'tenderClause' | 'specs'>('allied');
  const [copied, setCopied] = useState<boolean>(false);

  const sampleQueries = [
    { label: 'HDPE Pipes (JJM Water)', query: 'High density polyethylene pipes 110mm for drinking water supply network' },
    { label: 'एचडीपीई पाइप (हिंदी)', query: 'पीने के पानी की आपूर्ति के लिए 110mm एचडीपीई पाइप' },
    { label: '70W LED Street Light', query: '70W outdoor street LED luminaires with driver and surge protection' },
    { label: 'एलईडी स्ट्रीट लाइट (हिंदी)', query: 'स्मार्ट सिटी के लिए 70W एलईडी स्ट्रीट लाइट' },
    { label: 'OPC 53 Grade Cement', query: 'Ordinary Portland Cement 53 grade for high strength civil bridge construction' },
    { label: 'ABC Fire Extinguisher', query: 'Portable ABC stored pressure fire extinguisher 6kg for hospital buildings' },
    { label: '3-Ply Surgical Masks', query: 'Medical surgical 3 ply face masks with high bacterial filtration efficiency' },
    { label: 'Fortified Wheat Atta (PDS)', query: 'Fortified wheat flour atta for public distribution system civil supplies' }
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    const res = recommendIndianStandards(searchQuery);
    setResult(res);
  };

  const handleSelectSample = (query: string) => {
    setSearchQuery(query);
    const res = recommendIndianStandards(query);
    setResult(res);
  };

  const handleCopyClause = () => {
    navigator.clipboard.writeText(result.tenderClauseDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const { primaryStandard, matchScore, semanticRationale, alliedStandards, certificationStatus } = result;

  return (
    <div className="space-y-6">
      {/* Top Banner / Problem Statement Alignment */}
      <div className="bg-gradient-to-r from-blue-950/70 via-indigo-950/50 to-slate-900 border border-blue-800/40 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300">
                SIH Problem Statement ID: 26108
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300">Theme: Smart Automation</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-300 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Department of Consumer Affairs (DoCA) & BIS
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              AI-Powered Indian Standards (IS) Recommendation Engine
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Assists procurement officials, PSEs, and GeM buyers in identifying applicable Indian Standards,
              normative references, test methods, latest amendments, and mandatory Quality Control Orders (QCOs).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenTenderAuditor}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-xs shadow-lg shadow-amber-900/30 flex items-center space-x-2 transition-all"
            >
              <FileCheck className="w-4 h-4" />
              <span>Audit Tender Spec Document</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Multilingual Controls */}
        <form onSubmit={handleSearch} className="mt-5">
          <div className="relative flex items-center">
            <div className="absolute left-4 pointer-events-none text-blue-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter product description, technical spec, or query in English or Hindi (e.g., एचडीपीई पाइप)..."
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-12 pr-32 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-inner"
            />
            <div className="absolute right-2 flex items-center space-x-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md flex items-center space-x-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommend</span>
              </button>
            </div>
          </div>
        </form>

        {/* Multilingual / Quick Query Chips */}
        <div className="mt-3 flex items-center flex-wrap gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Try sample queries:</span>
          </span>
          {sampleQueries.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSample(chip.query)}
              className={`px-2.5 py-1 rounded-lg border transition-all text-xs ${
                searchQuery === chip.query
                  ? 'bg-blue-600/30 border-blue-500 text-blue-200'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Primary Recommendation Card & Detailed Technical Explorer */}
        <div className="lg:col-span-8 space-y-6">
          {/* Primary Standard Highlight Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-400 font-mono font-bold text-sm border border-blue-500/30">
                    {primaryStandard.standardNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-medium flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    Status: {primaryStandard.status}
                  </span>
                  {primaryStandard.reaffirmedYear && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">
                      Reaffirmed {primaryStandard.reaffirmedYear}
                    </span>
                  )}
                </div>
                <h2 className="text-lg md:text-xl font-bold text-white mt-1">
                  {primaryStandard.title}
                </h2>
                <p className="text-xs text-blue-300/80 font-medium">
                  {primaryStandard.division} • Category: {primaryStandard.procurementCategory}
                </p>
              </div>

              {/* Confidence Score Pill */}
              <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/40 rounded-xl p-3 text-center min-w-[120px]">
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {matchScore}%
                </div>
                <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">
                  Semantic Match
                </div>
              </div>
            </div>

            {/* AI Semantic Rationale */}
            <div className="mt-4 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-300 flex items-start space-x-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Semantic Matching Rationale: </span>
                {semanticRationale}
                {result.query.detectedLanguage === 'hi' && (
                  <span className="ml-1 text-emerald-400 font-medium">
                    (Natural Language Query automatically translated from Hindi)
                  </span>
                )}
              </div>
            </div>

            {/* Superseded Warning Banner if applicable */}
            {primaryStandard.supersededStandard && (
              <div className="mt-3 bg-amber-950/40 border border-amber-600/40 rounded-xl p-3 text-xs text-amber-200 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold">Supercession Advisory: </span>
                  This active standard replaces <span className="font-mono underline">{primaryStandard.supersededStandard}</span>. Tenders citing previous editions should be revised immediately.
                </div>
              </div>
            )}

            {/* Scope Summary */}
            <div className="mt-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
              <span className="font-semibold text-slate-200">Standard Scope: </span>
              {primaryStandard.scope}
            </div>

            {/* Sub-Tabs Selector */}
            <div className="mt-5 border-b border-slate-800 flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => setActiveSubTab('allied')}
                className={`pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                  activeSubTab === 'allied'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Allied & Normative Standards ({alliedStandards.length})</span>
              </button>

              <button
                onClick={() => setActiveSubTab('amendments')}
                className={`pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                  activeSubTab === 'amendments'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Amendments ({primaryStandard.amendments.length})</span>
              </button>

              <button
                onClick={() => setActiveSubTab('certification')}
                className={`pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                  activeSubTab === 'certification'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Mandatory QCO / BIS Marking</span>
              </button>

              <button
                onClick={() => setActiveSubTab('specs')}
                className={`pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                  activeSubTab === 'specs'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Key Test Specifications</span>
              </button>

              <button
                onClick={() => setActiveSubTab('tenderClause')}
                className={`pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                  activeSubTab === 'tenderClause'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Copy className="w-3.5 h-3.5" />
                <span>GeM Tender Clause Draft</span>
              </button>
            </div>

            {/* Sub-Tab 1: Allied & Normative References */}
            {activeSubTab === 'allied' && (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-400">
                  Normative reference standards that must be complied with to fulfill the principal standard:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {alliedStandards.map((std, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between hover:border-slate-700 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-blue-400">
                            {std.code}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                              std.category === 'TEST_METHOD'
                                ? 'bg-purple-900/40 text-purple-300 border border-purple-700/50'
                                : std.category === 'RAW_MATERIAL'
                                ? 'bg-amber-900/40 text-amber-300 border border-amber-700/50'
                                : std.category === 'SAFETY_CODE'
                                ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            {std.category.replace('_', ' ')}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-white leading-snug">
                          {std.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1">
                          {std.description}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Tender Prerequisite:</span>
                        <span
                          className={`font-semibold ${
                            std.isMandatoryForTender ? 'text-amber-400' : 'text-slate-400'
                          }`}
                        >
                          {std.isMandatoryForTender ? 'Mandatory for Lot Inspection' : 'Supplementary Reference'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Amendments & Revisions */}
            {activeSubTab === 'amendments' && (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-400">
                  Published gazette amendments issued by BIS Technical Committee:
                </p>
                <div className="space-y-3">
                  {primaryStandard.amendments.map((amd, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-400 flex items-center gap-1.5">
                          <History className="w-3.5 h-3.5" />
                          {amd.amdNumber}
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">
                          Effective: {amd.monthYear}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium">
                        {amd.summary}
                      </p>
                      <div className="bg-slate-900/60 rounded-lg p-2.5 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Key Technical Amendments:</span>
                        <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                          {amd.keyChanges.map((change, cIdx) => (
                            <li key={cIdx}>{change}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-Tab 3: Mandatory Certification & QCO */}
            {activeSubTab === 'certification' && (
              <div className="mt-4 space-y-4">
                <div className="bg-gradient-to-r from-red-950/40 to-slate-950 border border-red-800/40 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-xs font-bold text-red-400 mb-1">
                    <ShieldAlert className="w-4 h-4" />
                    <span>MANDATORY QUALITY CONTROL ORDER (QCO) ENFORCED</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {certificationStatus.qcoName}
                  </h3>
                  <div className="text-xs text-slate-300 mt-1 space-y-1">
                    <p>
                      <span className="text-slate-400">Gazette Notification:</span>{' '}
                      <span className="font-mono text-amber-300">{certificationStatus.gazetteNotification}</span>
                    </p>
                    <p>
                      <span className="text-slate-400">Issuing Authority:</span>{' '}
                      <span>{certificationStatus.ministry}</span>
                    </p>
                    <p>
                      <span className="text-slate-400">Enforcement Date:</span>{' '}
                      <span className="text-emerald-400 font-semibold">{certificationStatus.enforcementDate}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                    <span className="font-bold text-slate-300">Statutory Certification Scheme:</span>
                    <p className="text-slate-300 leading-relaxed">
                      {certificationStatus.scheme}
                    </p>
                    <span className="text-[11px] text-slate-400 block pt-1">
                      Bidders must upload valid BIS License (CML Number) or CRS Registration (R-Number) on GeM.
                    </span>
                  </div>

                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                    <span className="font-bold text-rose-300">Penalties for Non-Conformity:</span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {certificationStatus.penaltiesForNonCompliance}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 4: Key Specifications */}
            {activeSubTab === 'specs' && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-slate-400">
                  Critical performance parameters and normative test standard mappings:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3 font-semibold">Technical Property</th>
                        <th className="py-2.5 px-3 font-semibold">Standard Requirement</th>
                        <th className="py-2.5 px-3 font-semibold">Test Method Reference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                      {primaryStandard.keySpecifications.map((spec, sIdx) => (
                        <tr key={sIdx} className="hover:bg-slate-800/40">
                          <td className="py-2.5 px-3 font-medium text-white">{spec.property}</td>
                          <td className="py-2.5 px-3 text-slate-300">{spec.requirement}</td>
                          <td className="py-2.5 px-3 font-mono text-blue-400">{spec.testStandardRef}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-Tab 5: GeM Tender Clause Draft */}
            {activeSubTab === 'tenderClause' && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    Ready-to-copy technical specification clause for GeM or CPPP procurement documents:
                  </p>
                  <button
                    onClick={handleCopyClause}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Clause'}</span>
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-200 leading-relaxed select-all">
                  {result.tenderClauseDraft}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Alternative Standards & Blended Metrology Bridge */}
        <div className="lg:col-span-4 space-y-6">
          {/* Alternative / Allied Standards Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>Related Indian Standards</span>
              </span>
              <span className="text-[11px] text-slate-400">
                BIS Catalog
              </span>
            </h3>

            <div className="space-y-3">
              {result.alternativeStandards.map((alt, aIdx) => (
                <div
                  key={aIdx}
                  onClick={() => handleSelectSample(alt.standard.title)}
                  className="bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 rounded-xl p-3 cursor-pointer transition-all hover:bg-slate-950"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-blue-400">
                      {alt.standard.standardNumber}
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px] font-semibold">
                      {alt.score}% match
                    </span>
                  </div>
                  <h4 className="text-xs font-medium text-white mt-1 line-clamp-1">
                    {alt.standard.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {alt.differenceNotes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Blended Bridge Card: Linking PS 26108 to PS 26034 */}
          <div className="bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-950 border border-indigo-700/40 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-indigo-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Unified DoCA Quality Lifecycle</span>
            </div>
            <h3 className="text-sm font-bold text-white">
              From Specification to Delivery Inspection
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Once you finalize the tender specification with Indian Standards, incoming delivery samples
              must comply with the <span className="text-amber-300 font-semibold">Legal Metrology (Packaged Commodities) Rules, 2011</span> and bear verifiable BIS ISI / CRS markings.
            </p>

            <div className="pt-2 border-t border-indigo-900/50 flex flex-col gap-2">
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>Phase 1 (PS 26108):</span>
                <span className="text-blue-300 font-medium">Standards Specification</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>Phase 2 (PS 26034):</span>
                <span className="text-emerald-300 font-medium">Label Metrology & ISI Audit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
