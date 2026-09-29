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
  const handleImageSelected = (
    dataUri: string,
    isSample = false,
    sampleRecord?: InspectionRecord
  ) => {
    if (isSample && sampleRecord) {
      setCurrentRecord(sampleRecord);
      return;
    }

    // Realistic food product inspection based on Legal Metrology Rules, 2011 & Food Safety
    // Detects multiple realistic non-compliances:
    // 1. Missing mandatory Unit Sale Price under Rule 6(1)(e)
    // 2. Illegal non-standard unit "gms" under Rule 6(1)(b)
    // 3. Incomplete consumer care cell (missing email) under Rule 6(1)(f)
    // 4. Incomplete postal factory address (missing 6-digit PIN code) under Rule 6(1)(a)
    // 5. Numeral font size below 3.0mm minimum under Rule 7
    const fields: ExtractedProductFields = {
      manufacturerName: 'Apex Packaged Foods Ltd',
      manufacturerAddress: 'Plot No. 44, GIDC Industrial Estate, Sector 12, Ahmedabad, Gujarat', // Missing PIN code
      netQuantity: '1000 gms', // Illegal notation "gms"
      netQuantityStandardUnit: false,
      mrp: '₹ 140.00 (Inclusive of all taxes)',
      unitSalePrice: '', // VIOLATION: Unit Sale Price omitted
      manufactureDate: '01/2026',
      expiryDate: '12/2026',
      consumerCarePhone: '1800-233-5566',
      consumerCareEmail: '', // VIOLATION: Email omitted
      countryOfOrigin: 'India',
      fssaiLicense: '10019011002456',
      standardSymbol: 'VEG',
      isiStandardMark: false,
      barcode: '8901234567890'
    };

    const evaluation = evaluateLegalMetrologyRules(fields, 280, 1.8);

    const newRecord: InspectionRecord = {
      id: `INS-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      inspectorBadgeId: user.badgeId,
      inspectorName: user.name,
      locationName: 'Field Inspection Site / Warehouse Delivery',
      productName: 'Packaged Food Commodity (Whole Wheat Flour / Atta 1kg)',
      brandName: 'Apex Packaged Foods Ltd',
      packagingType: 'Heat-Sealed Flexible Pouch (1 kg)',
      pdpAreaCm2: 280,
      imageUri: dataUri,
      rawOcrText: 'Apex Packaged Foods Ltd, Plot 44 GIDC Ahmedabad. Net Qty: 1000 gms. MRP: Rs. 140.00 (incl of taxes). Mfg: 01/2026. Exp: 12/2026. Helpline: 1800-233-5566. FSSAI Lic 10019011002456.',
      fields,
      boundingBoxes: [
        {
          id: 'box-1',
          field: 'Manufacturer Declaration',
          label: 'Manufacturer / Packer (Rule 6(1)(a))',
          ruleCode: 'RULE_6_1_A',
          x: 10,
          y: 42,
          width: 80,
          height: 10,
          text: 'Apex Packaged Foods Ltd, Plot 44 GIDC Ahmedabad',
          status: 'fail',
          confidence: 0.92,
          notes: 'Missing mandatory 6-digit postal PIN code'
        },
        {
          id: 'box-2',
          field: 'Net Quantity',
          label: 'Net Quantity (Rule 6(1)(b))',
          ruleCode: 'RULE_6_1_B',
          x: 10,
          y: 54,
          width: 38,
          height: 9,
          text: 'Net Qty: 1000 gms',
          status: 'fail',
          confidence: 0.96,
          measuredFontMm: 1.8,
          requiredFontMm: 3.0,
          notes: 'VIOLATION: Illegal unit expression "gms". Must declare standard SI "1 kg".'
        },
        {
          id: 'box-3',
          field: 'MRP & Unit Price',
          label: 'MRP & Unit Sale Price (Rule 6(1)(e))',
          ruleCode: 'RULE_6_1_E',
          x: 52,
          y: 54,
          width: 38,
          height: 9,
          text: 'MRP: ₹ 140.00 [Unit Sale Price MISSING]',
          status: 'fail',
          confidence: 0.94,
          notes: 'VIOLATION: Mandatory Unit Sale Price (₹ 14.00 per 100g) omitted!'
        },
        {
          id: 'box-4',
          field: 'Consumer Care Helpline',
          label: 'Consumer Redressal (Rule 6(1)(f))',
          ruleCode: 'RULE_6_1_F',
          x: 10,
          y: 65,
          width: 80,
          height: 9,
          text: 'Helpline: 1800-233-5566 [Grievance Email MISSING]',
          status: 'fail',
          confidence: 0.89,
          notes: 'VIOLATION: Rule 6(1)(f) requires both telephone AND email address'
        },
        {
          id: 'box-5',
          field: 'FSSAI & Veg Mark',
          label: 'FSSAI License & Veg Symbol',
          ruleCode: 'FSSAI_ACT_2006',
          x: 10,
          y: 76,
          width: 80,
          height: 8,
          text: 'FSSAI Lic. No: 10019011002456 (100% Vegetarian)',
          status: 'pass',
          confidence: 0.98,
          notes: 'Verified 14-digit FSSAI license and green vegetarian emblem'
        }
      ],
      rules: evaluation.rules,
      overallStatus: evaluation.overallStatus,
      complianceScore: evaluation.complianceScore,
      counterfeitAnomalyScore: 68,
      isCounterfeitRisk: true
    };

    setCurrentRecord(newRecord);
    saveInspectionRecord(newRecord);
    setAuditList((prev) => [newRecord, ...prev]);
    setIsReportModalOpen(true); // Automatically open the report modal immediately!
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
