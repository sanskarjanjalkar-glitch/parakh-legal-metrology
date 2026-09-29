import React, { useState } from 'react';
import { Navbar, AppNavTab } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LoginModal } from './components/auth/LoginModal';
import { UnifiedOmniHub } from './components/unified/UnifiedOmniHub';
import { TenderSpecificationAuditor } from './components/standards/TenderSpecificationAuditor';
import { ManufacturerRadar } from './components/radar/ManufacturerRadar';
import { RulesDirectory } from './components/rules/RulesDirectory';
import { AuditHistoryView } from './components/audit/AuditHistoryView';
import { InspectionReportModal } from './components/reports/InspectionReportModal';
import { CameraModal } from './components/audit/CameraModal';
import { UserSession, InspectionRecord, ExtractedProductFields } from './types/compliance';
import { SAMPLE_INSPECTION_DATA } from './data/sampleProducts';
import { evaluateLegalMetrologyRules } from './services/ruleEngine';
import { performOcrOnImage } from './services/ocrService';
import { saveInspectionRecord, getStoredRecords } from './services/offlineSync';
import { INDIAN_STANDARDS_DATABASE } from './data/standardsDatabase';
import { IndianStandard } from './types/standards';

export const App: React.FC = () => {
  // Navigation & Session
  const [activeTab, setActiveTab] = useState<AppNavTab>('unified');
  const [user, setUser] = useState<UserSession>({
    name: 'Officer S. Verma',
    badgeId: '#PROC-9821',
    role: 'SUPERVISOR',
    designation: 'Senior Procurement & Quality Compliance Officer',
    zone: 'Central Public Procurement Division, New Delhi'
  });

  // Active Inspection Record
  const [currentRecord, setCurrentRecord] = useState<InspectionRecord>(SAMPLE_INSPECTION_DATA[0]);

  // Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // History list
  const [auditList, setAuditList] = useState<InspectionRecord[]>(() => {
    const stored = getStoredRecords();
    return stored.length > 0 ? stored : SAMPLE_INSPECTION_DATA;
  });

  // Handle uploaded image or sample selection
  const handleImageSelected = async (
    dataUri: string,
    isSample = false,
    sampleRecord?: InspectionRecord
  ) => {
    if (isSample && sampleRecord) {
      setCurrentRecord(sampleRecord);
      return;
    }

    // Perform dynamic OCR analysis on uploaded image or bill photo
    const ocrResult = await performOcrOnImage(dataUri);
    const fields = ocrResult.fields;
    const evaluation = evaluateLegalMetrologyRules(fields, 280, 1.8);

    const newRecord: InspectionRecord = {
      id: `INS-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      inspectorBadgeId: user.badgeId,
      inspectorName: user.name,
      locationName: 'Field Inspection Site / Packaging & Bill Scan',
      productName: ocrResult.productName || 'Uploaded Packaged Commodity',
      brandName: ocrResult.brandName || 'Scanned Brand',
      packagingType: 'Uploaded Image / Packaging Scan',
      pdpAreaCm2: 280,
      imageUri: dataUri,
      rawOcrText: ocrResult.text || 'No legible text detected on uploaded image.',
      fields: ocrResult.fields,
      boundingBoxes: ocrResult.boxes,
      rules: evaluation.rules,
      overallStatus: evaluation.overallStatus,
      complianceScore: evaluation.complianceScore,
      counterfeitAnomalyScore: evaluation.anomalyScore,
      isCounterfeitRisk: evaluation.anomalyScore >= 50
    };

    setCurrentRecord(newRecord);
    saveInspectionRecord(newRecord);
    setAuditList((prev) => [newRecord, ...prev]);
    setIsReportModalOpen(true);
  };

  // Dynamically resolve standard for currentRecord (never hardcode!)
  const getMatchingStandard = (record: InspectionRecord): IndianStandard => {
    const text = `${record.productName} ${record.brandName} ${record.rawOcrText}`.toLowerCase();
    if (text.includes('atta') || text.includes('wheat') || text.includes('flour') || text.includes('food') || text.includes('surya') || text.includes('apex')) {
      return INDIAN_STANDARDS_DATABASE.find((s) => s.id === 'IS-1155') || INDIAN_STANDARDS_DATABASE[5];
    }
    if (text.includes('led') || text.includes('lamp') || text.includes('light') || text.includes('luminaire') || text.includes('street')) {
      return INDIAN_STANDARDS_DATABASE.find((s) => s.id === 'IS-16102') || INDIAN_STANDARDS_DATABASE[1];
    }
    if (text.includes('cement') || text.includes('concrete')) {
      return INDIAN_STANDARDS_DATABASE.find((s) => s.id === 'IS-269') || INDIAN_STANDARDS_DATABASE[3];
    }
    if (text.includes('fire') || text.includes('extinguisher')) {
      return INDIAN_STANDARDS_DATABASE.find((s) => s.id === 'IS-15683') || INDIAN_STANDARDS_DATABASE[4];
    }
    if (text.includes('mask') || text.includes('surgical') || text.includes('respirator')) {
      return INDIAN_STANDARDS_DATABASE.find((s) => s.id === 'IS-16289') || INDIAN_STANDARDS_DATABASE[5];
    }
    if (text.includes('water') || text.includes('drinking')) {
      return INDIAN_STANDARDS_DATABASE.find((s) => s.id === 'IS-10500') || INDIAN_STANDARDS_DATABASE[2];
    }
    return INDIAN_STANDARDS_DATABASE[0]; // IS 4984 HDPE pipes
  };

  const dynamicStandard = getMatchingStandard(currentRecord);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-cyan-500 selection:text-white">
      {/* Primary White Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={() => setIsLoginModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Inspection & Tender Hub */}
        {activeTab === 'unified' && (
          <UnifiedOmniHub
            currentRecord={currentRecord}
            onRecordChange={setCurrentRecord}
            onImageSelected={handleImageSelected}
            onOpenCamera={() => setIsCameraOpen(true)}
            onOpenReportModal={() => setIsReportModalOpen(true)}
            onOpenTenderAuditor={() => setActiveTab('tender')}
          />
        )}

        {/* Tab 2: Tender Specification Auditor */}
        {activeTab === 'tender' && (
          <div className="space-y-6">
            <TenderSpecificationAuditor
              isOpen={true}
              onClose={() => setActiveTab('unified')}
            />
          </div>
        )}

        {/* Tab 3: Manufacturer Compliance Radar */}
        {activeTab === 'radar' && (
          <div className="space-y-6">
            <ManufacturerRadar
              onSelectManufacturer={(name) => {
                const matched = SAMPLE_INSPECTION_DATA.find((s) => s.brandName.includes(name));
                if (matched) {
                  setCurrentRecord(matched);
                  setActiveTab('unified');
                }
              }}
            />
          </div>
        )}

        {/* Tab 4: Standards & Rules Directory */}
        {activeTab === 'rules' && (
          <RulesDirectory />
        )}

        {/* Tab 5: Audit History */}
        {activeTab === 'history' && (
          <AuditHistoryView
            records={auditList}
            onSelectRecord={(rec) => {
              setCurrentRecord(rec);
              setActiveTab('unified');
            }}
            onRefresh={() => setAuditList(getStoredRecords())}
          />
        )}
      </main>

      {/* Clean White Footer */}
      <Footer />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onLoginSuccess={(newSession) => {
          setUser(newSession);
          setIsLoginModalOpen(false);
        }}
      />

      {/* Live Camera Scanner Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(dataUri) => handleImageSelected(dataUri, false)}
      />

      {/* Printable Statutory Inspection & Standards Report Modal (Dynamically Matched Standard!) */}
      <InspectionReportModal
        record={isReportModalOpen ? currentRecord : null}
        standard={dynamicStandard}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};

export default App;
