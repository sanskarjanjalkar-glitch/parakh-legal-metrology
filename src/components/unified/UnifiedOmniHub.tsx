import React, { useState } from 'react';
import { InspectionRecord } from '../../types/compliance';
import { RecommendationResult, TenderAuditResult, IndianStandard } from '../../types/standards';
import { recommendIndianStandards, auditTenderDocument } from '../../services/standardsEngine';
import { MANUFACTURER_METRICS } from '../../data/manufacturerData';
import { SAMPLE_INSPECTION_DATA } from '../../data/sampleProducts';
import { SAMPLE_TENDER_SNIPPETS, INDIAN_STANDARDS_DATABASE } from '../../data/standardsDatabase';
import { CanvasVisualizer } from '../audit/CanvasVisualizer';
import { ImageUploader } from '../audit/ImageUploader';
import {
  Search,
  Sparkles,
  Shield,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Download,
  Copy,
  Check,
  Layers,
  Globe,
  Upload,
  AlertOctagon,
  Building,
  ArrowRight,
  TrendingDown,
  Printer,
  ShieldAlert,
  Activity,
  Award,
  CheckCircle,
  FileUp,
  Camera
} from 'lucide-react';

interface Props {
  currentRecord: InspectionRecord;
  onRecordChange: (record: InspectionRecord) => void;
  onImageSelected: (dataUri: string, isSample?: boolean, sampleRecord?: InspectionRecord) => void;
  onOpenCamera: () => void;
  onOpenReportModal: () => void;
  onOpenTenderAuditor: () => void;
}

export const UnifiedOmniHub: React.FC<Props> = ({
  currentRecord,
  onRecordChange,
  onImageSelected,
  onOpenCamera,
  onOpenReportModal,
  onOpenTenderAuditor
}) => {
  // Input Mode: 'search' | 'upload_tender'
  const [inputMode, setInputMode] = useState<'search' | 'upload_tender'>('search');

  // Search input state
  const [searchQuery, setSearchQuery] = useState<string>(
    '110mm HDPE Pipes for Drinking Water Supply Network'
  );

  // Tender upload / text state
  const [tenderText, setTenderText] = useState<string>(
    SAMPLE_TENDER_SNIPPETS[0].extractedTextSnippet
  );
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Active results
  const [recommendation, setRecommendation] = useState<RecommendationResult>(() =>
    recommendIndianStandards('110mm HDPE Pipes for Drinking Water Supply Network')
  );
  const [tenderAudit, setTenderAudit] = useState<TenderAuditResult>(() =>
    SAMPLE_TENDER_SNIPPETS[0]
  );

  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
  const [copiedClause, setCopiedClause] = useState<boolean>(false);

  // Curated demo queries
  const quickDemoChips = [
    {
      label: '💧 HDPE Water Pipes',
      query: '110mm HDPE Pipes for Drinking Water Supply Network',
      badge: 'IS 4984',
      sampleIndex: 1
    },
    {
      label: '🌾 Surya Atta (Food Sample - 73% Fail)',
      query: 'Surya Brand Whole Wheat Atta 1kg Apex Foods',
      badge: 'Food Product',
      sampleIndex: 0
    },
    {
      label: '💡 70W LED Street Light',
      query: '70W outdoor street LED luminaires with driver and surge protection',
      badge: 'IS 16102',
      sampleIndex: 2
    },
    {
      label: '🏗️ OPC 53 Cement',
      query: 'Ordinary Portland Cement 53 grade for civil construction',
      badge: 'IS 269',
      sampleIndex: 1
    },
    {
      label: '🧯 Fire Extinguisher',
      query: 'Portable ABC stored pressure fire extinguisher 6kg',
      badge: 'IS 15683',
      sampleIndex: 3
    },
    {
      label: '🇮🇳 पीने के पानी का पाइप (Hindi)',
      query: 'पीने के पानी की आपूर्ति के लिए 110mm एचडीपीई पाइप',
      badge: 'Hindi NLP',
      sampleIndex: 1
    }
  ];

  // Run Search
  const handleRunSearch = (queryToRun?: string) => {
    const q = queryToRun || searchQuery;
    if (!q.trim()) return;
    const rec = recommendIndianStandards(q);
    setRecommendation(rec);

    const audit = auditTenderDocument(q);
    setTenderAudit(audit);

    const lower = q.toLowerCase();
    const matchedSample = SAMPLE_INSPECTION_DATA.find(
      (s) =>
        lower.includes(s.brandName.toLowerCase()) ||
        lower.includes(s.productName.toLowerCase()) ||
        s.productName.toLowerCase().includes(lower)
    );
    if (matchedSample) {
      onRecordChange(matchedSample);
    }
  };

  const handleSelectChip = (chip: typeof quickDemoChips[0]) => {
    setSearchQuery(chip.query);
    setInputMode('search');
    const rec = recommendIndianStandards(chip.query);
    setRecommendation(rec);
    const audit = auditTenderDocument(chip.query);
    setTenderAudit(audit);

    if (chip.sampleIndex !== undefined && SAMPLE_INSPECTION_DATA[chip.sampleIndex]) {
      onRecordChange(SAMPLE_INSPECTION_DATA[chip.sampleIndex]);
    }
  };

  // Run Tender Audit from uploaded file or text
  const handleRunTenderAudit = () => {
    if (!tenderText.trim()) return;
    const audit = auditTenderDocument(tenderText);
    setTenderAudit(audit);
    const rec = recommendIndianStandards(tenderText);
    setRecommendation(rec);
  };

  // File Upload handler (easy for normal people - supports photos, bills, images & documents)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);

    if (file.type.startsWith('image/') || /\.(jpe?g|png|webp|bmp|gif)$/i.test(file.name)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUri = event.target?.result as string;
        if (dataUri) {
          onImageSelected(dataUri, false);
        }
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setTenderText(content.slice(0, 3000));
          const audit = auditTenderDocument(content);
          setTenderAudit(audit);
          const rec = recommendIndianStandards(content);
          setRecommendation(rec);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSelectSampleTender = (index: number) => {
    const sample = SAMPLE_TENDER_SNIPPETS[index];
    setTenderText(sample.extractedTextSnippet);
    setUploadedFileName(null);
    setTenderAudit(sample);
    const rec = recommendIndianStandards(sample.extractedTextSnippet);
    setRecommendation(rec);
  };

  const handleCopyClause = () => {
    navigator.clipboard.writeText(tenderAudit.compliantClauseDraft || recommendation.tenderClauseDraft);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 2500);
  };

  // Synchronize search and tender audit when currentRecord changes (image upload or sample selection)
  React.useEffect(() => {
    const text = `${currentRecord.productName} ${currentRecord.brandName}`.toLowerCase();
    const isFood = text.includes('atta') || text.includes('wheat') || text.includes('flour') || text.includes('food') || text.includes('surya') || text.includes('apex');
    const isLed = text.includes('led') || text.includes('light') || text.includes('luminaire') || text.includes('street');
    const isPipe = text.includes('pipe') || text.includes('hdpe') || text.includes('water');

    if (isFood) {
      const foodQuery = 'Wheat Atta (Whole Meal Wheat Flour 1kg) - Apex Foods';
      setSearchQuery(foodQuery);
      setRecommendation(recommendIndianStandards(foodQuery));
      if (SAMPLE_TENDER_SNIPPETS[2]) {
        setTenderAudit(SAMPLE_TENDER_SNIPPETS[2]);
        setTenderText(SAMPLE_TENDER_SNIPPETS[2].extractedTextSnippet);
      }
    } else if (isLed) {
      const ledQuery = '70W outdoor street LED luminaires with driver and surge protection';
      setSearchQuery(ledQuery);
      setRecommendation(recommendIndianStandards(ledQuery));
      setTenderAudit(SAMPLE_TENDER_SNIPPETS[1]);
      setTenderText(SAMPLE_TENDER_SNIPPETS[1].extractedTextSnippet);
    } else if (isPipe) {
      const pipeQuery = '110mm HDPE Pipes for Drinking Water Supply Network';
      setSearchQuery(pipeQuery);
      setRecommendation(recommendIndianStandards(pipeQuery));
      setTenderAudit(SAMPLE_TENDER_SNIPPETS[0]);
      setTenderText(SAMPLE_TENDER_SNIPPETS[0].extractedTextSnippet);
    } else {
      setSearchQuery(currentRecord.productName);
      setRecommendation(recommendIndianStandards(currentRecord.productName));
      setTenderAudit(auditTenderDocument(currentRecord.productName));
    }
  }, [currentRecord.id]);

  // Dynamically resolve standard for currentRecord
  const isFoodRecord =
    currentRecord.productName.toLowerCase().includes('atta') ||
    currentRecord.productName.toLowerCase().includes('wheat') ||
    currentRecord.productName.toLowerCase().includes('food') ||
    currentRecord.brandName.toLowerCase().includes('surya') ||
    currentRecord.brandName.toLowerCase().includes('apex');

  const currentStandard: IndianStandard = isFoodRecord
    ? INDIAN_STANDARDS_DATABASE.find((s) => s.id === 'IS-1155') || recommendation.primaryStandard
    : recommendation.primaryStandard;

  const isRecordPass = currentRecord.overallStatus === 'COMPLIANT_PASS';

  // Compile simplified Errors & Mandatory Statutory Corrections
  const errorsAndCorrections = [
    // Physical Packaging Metrology failures (PS 26034 - Legal Metrology Rules, 2011)
    ...currentRecord.rules
      .filter((r) => r.status === 'FAIL')
      .map((r) => ({
        error: `Packaging Violation: ${r.ruleName} (${r.ruleCode})`,
        detectedDetail: `Extracted: "${r.extractedValue || 'Missing declaration'}"`,
        statutoryRef: r.actReference,
        correction: `Mandatorily declare "${r.expectedCondition}". Actionable notice under Section 36 of Legal Metrology Act, 2009.`,
        severity: 'CRITICAL' as const
      })),
    // Tender Specification Audit findings (PS 26108 - Indian Standards Recommendation)
    ...tenderAudit.findings.map((f) => ({
      error: `Tender Defect: ${f.title}`,
      detectedDetail: f.description,
      statutoryRef: f.type === 'OUTDATED_STANDARD' ? 'BIS Act, 2016' : 'Statutory Procurement Norms / QCO',
      correction: f.recommendedCorrection,
      severity: f.severity
    }))
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. HERO CARD: CLEAN WHITE BACKGROUND WITH VIBRANT CYAN ACCENTS */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Subtle Cyan Ambient Accent */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-100/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-5">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-cyan-700 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-100/80 border border-cyan-300 text-cyan-900 font-mono">
                  PARAKH AI ENGINE
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-medium">Department of Consumer Affairs (DoCA) & BIS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Indian Standards & Tender Quality Auditor
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Identify applicable Indian Standards (IS), check packaging compliance, and audit tender specifications in seconds.
              </p>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={onOpenReportModal}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] self-start sm:self-auto shrink-0"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download Official Report</span>
            </button>
          </div>

          {/* Clean Segmented Mode Switcher */}
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setInputMode('search')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
                inputMode === 'search'
                  ? 'bg-cyan-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Products & Standards</span>
            </button>
            <button
              onClick={() => setInputMode('upload_tender')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
                inputMode === 'upload_tender'
                  ? 'bg-cyan-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload / Paste Tender Document</span>
            </button>
          </div>

          {/* Mode 1: Search Bar */}
          {inputMode === 'search' && (
            <div className="space-y-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRunSearch();
                }}
                className="relative flex items-center"
              >
                <div className="absolute left-4 pointer-events-none text-cyan-600">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search product (e.g. Wheat Atta, HDPE Pipes, LED Lights), IS code, or Hindi query..."
                  className="w-full bg-slate-50 border border-slate-300 hover:border-cyan-500 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl pl-12 pr-32 py-3.5 text-sm text-slate-900 placeholder-slate-400 transition-all font-medium"
                />
                <div className="absolute right-2 flex items-center">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-sm flex items-center space-x-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Analyze</span>
                  </button>
                </div>
              </form>

              {/* Sample Chips */}
              <div className="flex items-center flex-wrap gap-2 text-xs pt-1">
                <span className="text-slate-500 text-[11px] font-medium mr-1">
                  Presets:
                </span>
                {quickDemoChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectChip(chip)}
                    className={`px-3 py-1.5 rounded-xl border transition-all text-xs font-medium ${
                      searchQuery === chip.query
                        ? 'bg-cyan-50 border-cyan-500 text-cyan-800 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mode 2: Easy Tender Upload (For Normal People) */}
          {inputMode === 'upload_tender' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* File Upload Box */}
                <label className="border-2 border-dashed border-cyan-400/80 hover:border-cyan-600 bg-cyan-50/40 hover:bg-cyan-50/80 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 group">
                  <input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx,image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="h-12 w-12 rounded-2xl bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-700 group-hover:scale-110 transition-transform">
                    <FileUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      {uploadedFileName ? uploadedFileName : 'Click to Upload Tender Document / Photo / Bill'}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Supports JPG, PNG, PDF, TXT, DOCX files
                    </div>
                  </div>
                </label>

                {/* Paste Text Area */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span>Or paste tender specification text directly:</span>
                  </div>
                  <textarea
                    rows={4}
                    value={tenderText}
                    onChange={(e) => setTenderText(e.target.value)}
                    placeholder="Paste tender specification snippet here..."
                    className="w-full bg-slate-50 border border-slate-300 hover:border-cyan-500 focus:border-cyan-600 rounded-2xl p-3 text-xs text-slate-900 font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Sample Tenders & Run Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <div className="flex items-center flex-wrap gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Or test sample tenders:</span>
                  <button
                    type="button"
                    onClick={() => handleSelectSampleTender(0)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-400 text-slate-800 text-xs font-semibold transition-all"
                  >
                    💧 CPWD Water Pipeline Tender (Old 1995 Code)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectSampleTender(1)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-400 text-slate-800 text-xs font-semibold transition-all"
                  >
                    💡 City Street Lights Tender (Missing Standards)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectSampleTender(2)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-400 text-slate-800 text-xs font-semibold transition-all"
                  >
                    🌾 FCI PDS Wheat Atta Tender (Missing IS 1155)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleRunTenderAudit}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/20 flex items-center space-x-1.5 transition-all w-full sm:w-auto justify-center"
                >
                  <FileCheck className="w-4 h-4 text-white" />
                  <span>Audit Tender with AI</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. DUAL INTELLIGENCE WORKBENCH (Clean White Cards) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Recommended Standard & GeM Corrected Clause */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="px-3 py-0.5 rounded-lg bg-cyan-100 text-cyan-900 font-mono font-bold text-sm border border-cyan-300">
                    {currentStandard.standardNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold">
                    {currentStandard.status}
                  </span>
                  {currentStandard.reaffirmedYear && (
                    <span className="text-slate-500 text-xs font-mono">
                      (Reaffirmed {currentStandard.reaffirmedYear})
                    </span>
                  )}
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentStandard.title}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {currentStandard.division} • {currentStandard.procurementCategory}
                </p>
              </div>

              {/* Match Score */}
              <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-3 text-center min-w-[85px] shrink-0">
                <div className="text-xl font-black text-cyan-700 font-mono">
                  {recommendation.matchScore}%
                </div>
                <div className="text-[9px] text-cyan-800 font-bold uppercase tracking-wider">
                  Match
                </div>
              </div>
            </div>

            {/* AI-Corrected Tender Specification Clause (Ready to copy for GeM) */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Corrected, 100% Compliant Tender Specification Clause</span>
                </span>
                <button
                  onClick={handleCopyClause}
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center space-x-1 shadow-sm transition-all"
                >
                  {copiedClause ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedClause ? 'Copied!' : 'Copy Clause'}</span>
                </button>
              </div>
              <div className="font-mono text-xs text-slate-800 select-all leading-relaxed p-2 max-h-36 overflow-y-auto bg-white rounded-xl border border-slate-200">
                {tenderAudit.compliantClauseDraft || recommendation.tenderClauseDraft}
              </div>
            </div>

            {/* Mandatory QCO & Lab Tests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-1">
                <span className="text-[10px] text-cyan-700 font-bold uppercase tracking-wider block">
                  Mandatory Certification (QCO)
                </span>
                <div className="text-slate-900 font-semibold">
                  {currentStandard.mandatoryCertification.scheme}
                </div>
                <div className="text-[11px] text-slate-600 line-clamp-1">
                  {currentStandard.mandatoryCertification.qcoName}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-1">
                <span className="text-[10px] text-cyan-700 font-bold uppercase tracking-wider block">
                  Normative Lab Tests
                </span>
                <div className="text-slate-900 font-semibold line-clamp-1">
                  {currentStandard.normativeReferences.slice(0, 2).map((n) => n.code).join(', ')}
                </div>
                <div className="text-[11px] text-slate-600">
                  {currentStandard.normativeReferences.length} standard test methods mapped
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Tender Health Score & Packaging Verification */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
            {/* Tender Health Index */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Tender Health Status</span>
                <span className="text-[11px] text-slate-500">
                  {tenderAudit.findings.length === 0
                    ? '100% Compliant Tender'
                    : `${tenderAudit.findings.length} Discrepancies Detected`}
                </span>
              </div>

              <div
                className={`px-3 py-1 rounded-xl font-mono font-bold text-sm ${
                  tenderAudit.overallHealthScore < 50
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}
              >
                Score: {tenderAudit.overallHealthScore}/100
              </div>
            </div>

            {/* Quick Packaging Metrology Snapshot */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">
                  Physical Packaging & Metrology (PS 26034)
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    isRecordPass
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {isRecordPass ? 'COMPLIANT' : 'DEFECTS FLAGGED'}
                </span>
              </div>

              {/* Canvas visualizer */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-950">
                <CanvasVisualizer
                  imageSrc={currentRecord.imageUri}
                  boxes={currentRecord.boundingBoxes}
                  selectedBoxId={selectedBoxId}
                  onSelectBox={setSelectedBoxId}
                  pdpAreaCm2={currentRecord.pdpAreaCm2}
                />
              </div>

              {/* Upload & Camera Buttons */}
              <div className="pt-1">
                <ImageUploader
                  onImageSelected={onImageSelected}
                  onOpenCamera={onOpenCamera}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. IDENTIFIED ERRORS & MANDATORY STATUTORY CORRECTIONS */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-rose-100 border border-rose-300 text-rose-700">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Identified Errors & Mandatory Statutory Corrections</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 font-mono font-bold">
                  {errorsAndCorrections.length} Issues
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Actionable statutory remedies required under Legal Metrology Rules, 2011 and BIS Standards.
              </p>
            </div>
          </div>
        </div>

        {errorsAndCorrections.length === 0 ? (
          <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Zero errors found! Specifications and packaging are 100% compliant.</span>
          </div>
        ) : (
          <div className="space-y-3">
            {errorsAndCorrections.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 border border-slate-200 hover:border-slate-300 rounded-2xl p-4 transition-all grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
              >
                {/* Error */}
                <div className="md:col-span-5 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 uppercase">
                      {item.severity}
                    </span>
                    <span className="font-bold text-slate-900 text-xs">{item.error}</span>
                  </div>
                  <p className="text-xs text-rose-700">{item.detectedDetail}</p>
                  <p className="text-[10px] font-mono text-slate-500">
                    Statute: {item.statutoryRef}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex md:col-span-1 justify-center">
                  <ArrowRight className="w-4 h-4 text-cyan-600" />
                </div>

                {/* Easy Fix */}
                <div className="md:col-span-6 bg-emerald-50/80 border border-emerald-300 rounded-xl p-3">
                  <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>How to Fix (Required Statutory Correction):</span>
                  </div>
                  <p className="text-xs text-slate-900 leading-relaxed font-medium">
                    {item.correction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. MANUFACTURER COMPLIANCE RADAR */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-100 text-cyan-800">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Manufacturer Compliance Radar
              </h3>
              <p className="text-xs text-slate-500">
                Surveillance database tracking supplier failure rates under DoCA & BIS.
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-600">
            Active: <span className="text-cyan-800 font-bold">{currentRecord.brandName}</span>
          </div>
        </div>

        {/* Horizontal Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MANUFACTURER_METRICS.map((m, idx) => {
            const isSelected =
              m.companyName.toLowerCase().includes(currentRecord.brandName.toLowerCase()) ||
              currentRecord.brandName.toLowerCase().includes(m.companyName.toLowerCase());

            return (
              <div
                key={idx}
                onClick={() => {
                  const matched = SAMPLE_INSPECTION_DATA.find((s) => s.brandName.includes(m.companyName));
                  if (matched) onRecordChange(matched);
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-50/70 border-cyan-400 shadow-sm'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-900 text-xs">{m.companyName}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                      m.riskCategory === 'CRITICAL'
                        ? 'bg-rose-600 text-white'
                        : m.riskCategory === 'HIGH'
                        ? 'bg-amber-500 text-black'
                        : m.riskCategory === 'MODERATE'
                        ? 'bg-cyan-600 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {m.riskCategory}
                  </span>
                </div>

                <div className="space-y-1 my-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">Failure Rate:</span>
                    <span
                      className={`font-mono font-bold ${
                        m.failureRate > 50 ? 'text-rose-700' : m.failureRate > 20 ? 'text-amber-700' : 'text-emerald-700'
                      }`}
                    >
                      {m.failureRate}% ({m.failCount} / {m.totalAudits} audits)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        m.failureRate > 50
                          ? 'bg-rose-500'
                          : m.failureRate > 20
                          ? 'bg-amber-500'
                          : 'bg-cyan-600'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(5, m.failureRate))}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 line-clamp-1">
                  {m.primaryViolations.join(' • ')}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. DOWNLOAD OFFICIAL REPORT ACTION BANNER */}
      <section className="bg-gradient-to-r from-cyan-50 via-white to-teal-50 border border-cyan-200 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
            <Award className="w-5 h-5 text-cyan-700" />
            <span>Official Statutory Inspection & Standards Dossier</span>
          </h4>
          <p className="text-xs text-slate-600 max-w-2xl">
            Generates an official Government of India Notice (PDF) under Section 36 of Legal Metrology Act, 2009 & BIS Act, 2016, with errors, corrections, and manufacturer radar.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-5 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 flex items-center space-x-2 transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Printer className="w-4 h-4 text-white" />
          <span>Generate & Print Report</span>
        </button>
      </section>
    </div>
  );
};

export default UnifiedOmniHub;
