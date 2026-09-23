import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LoginModal } from './components/auth/LoginModal';
import { ImageUploader } from './components/audit/ImageUploader';
import { CameraModal } from './components/audit/CameraModal';
import { CanvasVisualizer } from './components/audit/CanvasVisualizer';
import { ExtractedFieldsView } from './components/audit/ExtractedFieldsView';
import { ComplianceVerdict } from './components/audit/ComplianceVerdict';
import { ManufacturerRadar } from './components/radar/ManufacturerRadar';
import { RulesDirectory } from './components/rules/RulesDirectory';
import { AuditHistoryView } from './components/audit/AuditHistoryView';
import { InspectionReportModal } from './components/reports/InspectionReportModal';
import { UserSession, InspectionRecord, ExtractedProductFields } from './types/compliance';
import { SAMPLE_INSPECTION_DATA } from './data/sampleProducts';
import { evaluateLegalMetrologyRules } from './services/ruleEngine';
import { parseOcrTranscript } from './services/ocrService';
import { saveInspectionRecord, getStoredRecords } from './services/offlineSync';
import { Shield, Sparkles, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audit' | 'trends' | 'rules' | 'history'>('audit');
  const [user, setUser] = useState<UserSession>({
    name: 'Inspector R. Sharma',
    badgeId: '#F18714',
    role: 'INSPECTOR',
    designation: 'Senior Legal Metrology Inspector',
    zone: 'Northern Regional Zone, New Delhi'
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const [currentRecord, setCurrentRecord] = useState<InspectionRecord>(SAMPLE_INSPECTION_DATA[0]);
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);

  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const [auditList, setAuditList] = useState<InspectionRecord[]>(() => {
    const stored = getStoredRecords();
    return stored.length > 0 ? stored : SAMPLE_INSPECTION_DATA;
  });

  const handleImageSelected = (
    dataUri: string,
    isSample = false,
    sampleRecord?: InspectionRecord
  ) => {
    if (isSample && sampleRecord) {
      setCurrentRecord(sampleRecord);
      setSelectedBoxId(null);
      return;
    }

    const rawTranscript =
      'Manufactured by: Fresh Agro Industries, GIDC Estate, Ahmedabad 382445. Net Quantity: 1 kg. MRP: Rs. 140.00 (inclusive of all taxes). Unit Sale Price: Rs. 14.00 per 100g. Mfg Date: 02/2026. Exp Date: 01/2027. Consumer Helpline: 1800-233-5566, Email: grievance@freshagro.com. Country of Origin: India. FSSAI Lic No: 10019011002456.';

    const { fields, boxes } = parseOcrTranscript(rawTranscript);
    const evaluation = evaluateLegalMetrologyRules(fields, 250, 2.8);

    const newRecord: InspectionRecord = {
      id: `INS-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      inspectorBadgeId: user.badgeId,
      inspectorName: user.name,
      locationName: 'Field Inspection Site',
      productName: 'Custom Scanned Packaged Commodity',
      brandName: fields.manufacturerName || 'Inspected Commodity',
      packagingType: 'Pouch / Rigid Container',
      pdpAreaCm2: 250,
      imageUri: dataUri,
      rawOcrText: rawTranscript,
      fields,
      boundingBoxes: boxes,
      rules: evaluation.rules,
      overallStatus: evaluation.overallStatus,
      complianceScore: evaluation.complianceScore,
      counterfeitAnomalyScore: evaluation.anomalyScore,
      isCounterfeitRisk: evaluation.anomalyScore > 60
    };

    setCurrentRecord(newRecord);
    setSelectedBoxId(null);
    saveInspectionRecord(newRecord);
    setAuditList((prev) => [newRecord, ...prev]);
  };

  const handleFieldsChanged = (updatedFields: ExtractedProductFields) => {
    const evalResult = evaluateLegalMetrologyRules(
      updatedFields,
      currentRecord.pdpAreaCm2,
      2.4
    );

    const updatedRecord: InspectionRecord = {
      ...currentRecord,
      fields: updatedFields,
      rules: evalResult.rules,
      overallStatus: evalResult.overallStatus,
      complianceScore: evalResult.complianceScore,
      counterfeitAnomalyScore: evalResult.anomalyScore
    };

    setCurrentRecord(updatedRecord);
    saveInspectionRecord(updatedRecord);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={() => setIsLoginModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-semibold text-slate-300">
                  Active Station: {currentRecord.locationName}
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400 font-mono">
                  Audit ID: {currentRecord.id}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Switch Portal Role
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-5">
                <ImageUploader
                  onImageSelected={handleImageSelected}
                  onOpenCamera={() => setIsCameraOpen(true)}
                />

                <CanvasVisualizer
                  imageSrc={currentRecord.imageUri}
                  boxes={currentRecord.boundingBoxes}
                  selectedBoxId={selectedBoxId}
                  onSelectBox={setSelectedBoxId}
                  pdpAreaCm2={currentRecord.pdpAreaCm2}
                />

                <ExtractedFieldsView
                  fields={currentRecord.fields}
                  onChange={handleFieldsChanged}
                />
              </div>

              <div className="lg:col-span-5 space-y-5">
                <ComplianceVerdict
                  record={currentRecord}
                  onViewReportModal={() => setIsReportModalOpen(true)}
                />

                <ManufacturerRadar
                  onSelectManufacturer={(name) => {
                    const matched = SAMPLE_INSPECTION_DATA.find((s) => s.brandName.includes(name));
                    if (matched) {
                      setCurrentRecord(matched);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-6">
            <ManufacturerRadar />
          </div>
        )}

        {activeTab === 'rules' && (
          <RulesDirectory />
        )}

        {activeTab === 'history' && (
          <AuditHistoryView
            records={auditList}
            onSelectRecord={(rec) => {
              setCurrentRecord(rec);
              setActiveTab('audit');
            }}
            onRefresh={() => setAuditList(getStoredRecords())}
          />
        )}
      </main>

      <Footer />

      <LoginModal
        isOpen={isLoginModalOpen}
        onLoginSuccess={(newSession) => {
          setUser(newSession);
          setIsLoginModalOpen(false);
        }}
      />

      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(dataUri) => handleImageSelected(dataUri, false)}
      />

      <InspectionReportModal
        record={isReportModalOpen ? currentRecord : null}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};

export default App;
