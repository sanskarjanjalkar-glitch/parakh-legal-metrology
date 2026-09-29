import { IndianStandard, TenderAuditResult } from '../types/standards';

export const INDIAN_STANDARDS_DATABASE: IndianStandard[] = [
  {
    id: 'IS-4984',
    standardNumber: 'IS 4984:2016',
    yearPublished: 2016,
    reaffirmedYear: 2021,
    title: 'High Density Polyethylene (HDPE) Pipes for Water Supply — Specification (Fifth Revision)',
    division: 'Civil Engineering (CED 56 - Plastic Piping System)',
    status: 'ACTIVE',
    supersededStandard: 'IS 4984:1995 (Fourth Revision - Superseded)',
    scope: 'Covers requirements for high density polyethylene (HDPE) pipes of nominal sizes from 16 mm to 1000 mm for buried and above-ground water conveyance and potable water supply schemes.',
    keySpecifications: [
      { property: 'Material Designation', requirement: 'PE-63, PE-80, or PE-100 virgin compound', testStandardRef: 'IS 7328 / IS 2530' },
      { property: 'Hydrostatic Strength (100h at 20°C)', requirement: 'No failure or rupture at 12.4 MPa for PE-100', testStandardRef: 'IS 12235 (Part 8/Sec 1)' },
      { property: 'Carbon Black Content & Dispersion', requirement: '2.5 ± 0.5% by mass, dispersion grade ≤ 3', testStandardRef: 'IS 2530:1963' },
      { property: 'Melt Flow Rate (MFR) Variation', requirement: 'Within ± 20% of base compound value', testStandardRef: 'IS 2530 / IS 13360' },
      { property: 'Longitudinal Reversion', requirement: '≤ 3% after thermal exposure', testStandardRef: 'IS 12235 (Part 5)' }
    ],
    amendments: [
      { amdNumber: 'Amendment No. 1', monthYear: 'March 2018', summary: 'Incorporated revised density classification parameters and PE-100 virgin grade verification.', keyChanges: ['PE-100 minimum MRS updated to 10.0 MPa', 'Virgin grade raw material certification made mandatory'] },
      { amdNumber: 'Amendment No. 2', monthYear: 'November 2020', summary: 'Updated normative references for testing dimensional ovality and carbon black dispersion grade limits.', keyChanges: ['Clause 6.2 revised for pipe ovality limits', 'IS 2530 reference updated for spectrophotometric method'] },
      { amdNumber: 'Amendment No. 3', monthYear: 'August 2023', summary: 'Mandated QR code marking for manufacturer traceability and geo-tagging on GeM procurement batches.', keyChanges: ['Clause 10.3: QR code / inkjet traceability along pipe length at 1m intervals', 'Aligned with Jal Jeevan Mission technical guidelines'] }
    ],
    normativeReferences: [
      { code: 'IS 2530:1963', title: 'Methods of test for polyethylene molding materials and polyethylene compounds', category: 'TEST_METHOD', description: 'Mandatory laboratory test for carbon black percentage, density, and melt flow rate', isMandatoryForTender: true },
      { code: 'IS 7328:1992', title: 'High density polyethylene materials for moulding and extrusion', category: 'RAW_MATERIAL', description: 'Specification for virgin polymer base resin used in pipe extrusion', isMandatoryForTender: true },
      { code: 'IS 12235 (Parts 1 to 19)', title: 'Methods of test for unplasticized PVC and Polyethylene pipes', category: 'TEST_METHOD', description: 'Standard test protocols for hydraulic pressure, impact resistance, and reversion', isMandatoryForTender: true },
      { code: 'IS 7634 (Part 2):2012', title: 'Code of practice for plastics pipe work: Laying and jointing of polyethylene pipes', category: 'SAFETY_CODE', description: 'Installation and electrofusion/butt welding engineering standards', isMandatoryForTender: false },
      { code: 'IS 4251:2008', title: 'Glossary of terms relating to plastics pipes and fittings', category: 'TERMINOLOGY', description: 'Defines PN rating, SDR (Standard Dimension Ratio), and PE classes', isMandatoryForTender: false },
      { code: 'IS 14333:1996', title: 'High Density Polyethylene Pipes for Sewerage — Specification', category: 'RELATED_PRODUCT', description: 'Allied standard when procurement involves non-potable effluent drainage', isMandatoryForTender: false }
    ],
    mandatoryCertification: {
      isMandatory: true,
      scheme: 'BIS Product Certification Scheme-I (ISI Mark)',
      qcoName: 'Pipes and Fittings (Quality Control) Order, 2024',
      gazetteNotification: 'S.O. 1248(E) dated 26-Feb-2024',
      ministry: 'Ministry of Chemicals & Fertilizers (DCPC) & DPIIT',
      enforcementDate: '26-Aug-2024 (Strictly Enforced)',
      scopeSummary: 'Prohibits manufacture, import, stocking, sale, or procurement of HDPE water pipes without valid BIS Standard Mark (ISI license). Non-ISI stock cannot be quoted on GeM.',
      penaltiesForNonCompliance: 'Liable for penal action under Section 29 & Section 30 of BIS Act, 2016 (imprisonment up to 2 years or fine up to ₹5,00,000 or both).'
    },
    applicableIndustries: ['Public Health Engineering (PHED)', 'Jal Jeevan Mission (JJM)', 'Municipal Water Supply', 'Irrigation & Canal Works', 'Smart Cities Infrastructure'],
    procurementCategory: 'Pipes, Valves & Water Infrastructure',
    sampleTenderClause: 'The bidder shall supply High Density Polyethylene (HDPE) pipes conforming strictly to IS 4984:2016 with up-to-date Amendments No. 1, 2, and 3. Pipes shall be manufactured from virgin PE-100 grade polymer complying with IS 7328:1992. Raw material test certificate for Melt Flow Rate and Carbon Black content as per IS 2530:1963 must accompany every lot. As per the Pipes & Fittings QCO 2024, the product must bear the valid BIS ISI Mark with valid CML License Number. Quotations without valid BIS License shall be summarily rejected.',
    keywords: ['hdpe', 'pipe', 'water supply', 'pe100', 'pe80', 'potable water', 'drinking water pipe', 'sdr', 'jal jeevan', 'phed', 'water supply pipeline', 'पानी का पाइप', 'एचडीपीई']
  },
  {
    id: 'IS-16102',
    standardNumber: 'IS 16102 (Part 1 & Part 2):2012',
    yearPublished: 2012,
    reaffirmedYear: 2022,
    title: 'Self-Ballasted LED Lamps for General Lighting Services — Safety & Performance Requirements',
    division: 'Electrotechnical (ETD 23 - Electric Lamps and Allied Equipment)',
    status: 'ACTIVE',
    supersededStandard: 'N/A',
    scope: 'Specifies the safety requirements (Part 1) and performance requirements (Part 2) for self-ballasted LED lamps having a rated wattage up to 60 W, supply voltage between 50 V and 250 V AC.',
    keySpecifications: [
      { property: 'Luminous Efficacy', requirement: '≥ 100 lm/W for warm/cool white', testStandardRef: 'IS 16102 (Part 2) Cl 8' },
      { property: 'Lumen Maintenance', requirement: '≥ 90% after 2000 hours', testStandardRef: 'IS 16102 (Part 2) Cl 9' },
      { property: 'Colour Rendering Index (CRI)', requirement: 'Ra ≥ 80', testStandardRef: 'IS 16102 (Part 2) Cl 7' },
      { property: 'Insulation Resistance & Electric Strength', requirement: '≥ 4 MΩ at 500V DC; no flashover', testStandardRef: 'IS 16102 (Part 1) Cl 11' },
      { property: 'Harmonic Current Limits', requirement: 'Class C compliance under THD ≤ 15%', testStandardRef: 'IS 14700 (Part 3/Sec 2)' }
    ],
    amendments: [
      { amdNumber: 'Amendment No. 1', monthYear: 'June 2017', summary: 'Aligned with MeitY CRS compulsory registration scheme and energy efficiency labeling.', keyChanges: ['BEE star labeling alignment', 'Marking requirements revised for CRS R-number'] },
      { amdNumber: 'Amendment No. 2', monthYear: 'May 2021', summary: 'Mandated photobiological safety compliance under IS 16108 and driver surge protection.', keyChanges: ['Blue light hazard evaluation mandated under IS 16108 (Risk Group RG 0 or RG 1)', 'Surge immunity requirement updated to minimum 4.0 kV'] }
    ],
    normativeReferences: [
      { code: 'IS 15885 (Part 2/Sec 13):2012', title: 'Lamp controlgear: AC or DC supplied electronic controlgear for LED modules', category: 'SAFETY_CODE', description: 'Mandatory standard for the internal or external LED electronic driver circuit', isMandatoryForTender: true },
      { code: 'IS 16108:2012', title: 'Photobiological safety of lamps and lamp systems', category: 'TEST_METHOD', description: 'Ensures eye safety from optical radiation and blue light hazard', isMandatoryForTender: true },
      { code: 'IS 14700 (Part 3/Sec 2):2008', title: 'Electromagnetic compatibility (EMC): Limits for harmonic current emissions', category: 'TEST_METHOD', description: 'Restricts total harmonic distortion (THD) injected into the electrical grid', isMandatoryForTender: true },
      { code: 'IS 10322 (Part 5/Sec 3):2012', title: 'Luminaires: Particular requirements — Luminaires for road and street lighting', category: 'RELATED_PRODUCT', description: 'Allied standard when procurement entails outdoor street light fixtures', isMandatoryForTender: false },
      { code: 'IS 16101:2012', title: 'General lighting — LEDs and LED modules — Terms and definitions', category: 'TERMINOLOGY', description: 'Defines optical, thermal, and electrical metrics for solid state lighting', isMandatoryForTender: false }
    ],
    mandatoryCertification: {
      isMandatory: true,
      scheme: 'Compulsory Registration Scheme (CRS) under BIS',
      qcoName: 'Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order',
      gazetteNotification: 'MeitY Notification S.O. 2357(E)',
      ministry: 'Ministry of Electronics and Information Technology (MeitY) & BIS',
      enforcementDate: 'Enforced (Active Requirement)',
      scopeSummary: 'All self-ballasted LED lamps must be registered with BIS under CRS and bear the Standard Mark displaying the unique R-Number (e.g. R-4100XXXX).',
      penaltiesForNonCompliance: 'Goods cannot be cleared through Customs or placed in GeM e-bids. Confiscation under BIS Act 2016.'
    },
    applicableIndustries: ['Energy Efficiency Services Limited (EESL)', 'Municipal Corporation Streetlighting', 'Smart Cities Missions', 'Railways', 'CPWD & PWD Buildings'],
    procurementCategory: 'Electrical, Lighting & Energy',
    sampleTenderClause: 'All LED luminaires/lamps shall conform to IS 16102 (Part 1):2012 for safety and IS 16102 (Part 2):2012 for performance with Amendment 1 & 2. The integral LED driver shall comply with IS 15885 (Part 2/Sec 13):2012. The product must possess valid BIS Compulsory Registration Scheme (CRS) certificate showing valid R-Number. Harmonics must satisfy IS 14700 (Part 3/Sec 2) with THD < 15% and surge protection minimum 4kV. Photobiological safety must conform to IS 16108 RG-0.',
    keywords: ['led', 'lamp', 'bulb', 'luminaire', 'street light', 'lighting', 'driver', 'wattage', 'eesl', 'crs', 'lumen', 'एलईडी', 'लाइट', 'बल्ब']
  },
  {
    id: 'IS-10500',
    standardNumber: 'IS 10500:2012',
    yearPublished: 2012,
    reaffirmedYear: 2023,
    title: 'Drinking Water — Specification (Second Revision)',
    division: 'Food and Agriculture (FAD 25 - Drinking Water)',
    status: 'ACTIVE',
    supersededStandard: 'IS 10500:1991 (First Revision - Superseded)',
    scope: 'Prescribes the quality requirements and tolerances for water intended for human consumption, drinking, domestic purposes, food processing, and public distribution pipelines.',
    keySpecifications: [
      { property: 'TDS (Total Dissolved Solids)', requirement: 'Acceptable limit: 500 mg/l; Permissible limit: 2000 mg/l', testStandardRef: 'IS 3025 (Part 16)' },
      { property: 'Turbidity', requirement: 'Acceptable limit: 1 NTU; Permissible limit: 5 NTU', testStandardRef: 'IS 3025 (Part 10)' },
      { property: 'E. Coli / Thermotolerant Coliforms', requirement: 'Shall not be detectable in any 100 ml sample', testStandardRef: 'IS 15185 / IS 1622' },
      { property: 'Total Hardness (as CaCO3)', requirement: 'Acceptable limit: 200 mg/l; Permissible limit: 600 mg/l', testStandardRef: 'IS 3025 (Part 21)' },
      { property: 'Heavy Metals (Lead, Arsenic, Cadmium)', requirement: 'Lead ≤ 0.01 mg/l, Arsenic ≤ 0.01 mg/l', testStandardRef: 'IS 3025 (Part 47, 37)' }
    ],
    amendments: [
      { amdNumber: 'Amendment No. 1', monthYear: 'March 2018', summary: 'Revised limit for Arsenic to 0.01 mg/l and updated pesticide residue tolerance limits.', keyChanges: ['Arsenic acceptable limit made 0.01 mg/l without relaxation', 'Pesticide testing protocol aligned with GC-MS/LC-MS'] },
      { amdNumber: 'Amendment No. 2', monthYear: 'December 2021', summary: 'Added requirements for Per- and polyfluoroalkyl substances (PFAS) surveillance.', keyChanges: ['PFAS advisory screening recommended', 'Microbial testing frequency guidelines added'] }
    ],
    normativeReferences: [
      { code: 'IS 3025 (Parts 1 to 65)', title: 'Methods of sampling and test (physical and chemical) for water and wastewater', category: 'TEST_METHOD', description: 'Foundational Indian Standard for physical, chemical, and organoleptic testing', isMandatoryForTender: true },
      { code: 'IS 1622:1981', title: 'Methods for sampling and microbiological examination of water', category: 'TEST_METHOD', description: 'Standard bacteriological test method for coliforms and pathogens', isMandatoryForTender: true },
      { code: 'IS 14543:2016', title: 'Packaged Drinking Water (Other than Packaged Natural Mineral Water)', category: 'RELATED_PRODUCT', description: 'Mandatory standard when purchasing bottled or packaged water jars', isMandatoryForTender: false },
      { code: 'IS 13428:2005', title: 'Packaged Natural Mineral Water — Specification', category: 'RELATED_PRODUCT', description: 'Applicable for natural spring mineral water procurement', isMandatoryForTender: false },
      { code: 'IS 17614:2021', title: 'Drinking Water Supply Management System in Rural Areas — Guidelines', category: 'SAFETY_CODE', description: 'Water safety planning code for rural tap water schemes', isMandatoryForTender: false }
    ],
    mandatoryCertification: {
      isMandatory: true,
      scheme: 'Mandatory BIS Certification (For Packaged Water IS 14543 / Municipal Conformity)',
      qcoName: 'Food Safety and Standards / BIS Mandatory Certification Order',
      gazetteNotification: 'DoCA / FSSAI Statutory Order',
      ministry: 'Ministry of Consumer Affairs & Ministry of Jal Shakti',
      enforcementDate: 'Enforced',
      scopeSummary: 'Municipal water supply authorities must comply with IS 10500:2012. Packaged water supplied in institutional tenders must possess mandatory BIS ISI Mark.',
      penaltiesForNonCompliance: 'Tenders violating potable water safety face immediate rejection; vendors subject to FSSAI Section 59 & BIS Act penalties.'
    },
    applicableIndustries: ['Jal Jeevan Mission (JJM)', 'Railways (Water Supply)', 'Defense & Cantonments', 'Hospitality & Institutional Canteens', 'State Water Boards'],
    procurementCategory: 'Water, Sanitation & Public Health',
    sampleTenderClause: 'Potable water supplied through the distribution network or treatment facility must strictly comply with IS 10500:2012 including Amendment No. 1 and 2. All physical, chemical, and toxic substances parameters shall be tested as per the respective parts of IS 3025. Microbiological safety shall be verified in accordance with IS 1622, showing zero detectable E. Coli in 100 ml samples. Accredited NABL test reports referencing IS 10500:2012 must be submitted with each delivery certificate.',
    keywords: ['water', 'drinking water', 'potable water', 'purifier', 'tds', 'turbidity', 'jal jeevan', 'water testing', 'is 10500', 'पानी', 'पीने का पानी', 'जल']
  },
  {
    id: 'IS-269',
    standardNumber: 'IS 269:2015',
    yearPublished: 2015,
    reaffirmedYear: 2020,
    title: 'Ordinary Portland Cement — Specification (Sixth Revision)',
    division: 'Civil Engineering (CED 2 - Cement and Concrete)',
    status: 'ACTIVE',
    supersededStandard: 'IS 8112:1989 (43 Grade) & IS 12269:1987 (53 Grade) amalgamated into IS 269:2015',
    scope: 'Covers the manufacture, chemical and physical requirements of ordinary Portland cement of 33 grade, 43 grade, and 53 grade.',
    keySpecifications: [
      { property: '28-Day Compressive Strength (53 Grade)', requirement: '≥ 53.0 MPa', testStandardRef: 'IS 4031 (Part 6)' },
      { property: 'Initial Setting Time', requirement: '≥ 30 minutes', testStandardRef: 'IS 4031 (Part 5)' },
      { property: 'Final Setting Time', requirement: '≤ 600 minutes', testStandardRef: 'IS 4031 (Part 5)' },
      { property: 'Fineness (Specific Surface)', requirement: '≥ 225 m²/kg', testStandardRef: 'IS 4031 (Part 2)' },
      { property: 'Soundness (Le Chatelier Expansion)', requirement: '≤ 10 mm', testStandardRef: 'IS 4031 (Part 3)' }
    ],
    amendments: [
      { amdNumber: 'Amendment No. 1', monthYear: 'July 2018', summary: 'Clarified permissible performance improvers addition limits up to 5% by mass.', keyChanges: ['Limestone and fly ash admixture limits specified', 'Packaging net weight tolerance aligned with Legal Metrology'] },
      { amdNumber: 'Amendment No. 2', monthYear: 'February 2021', summary: 'Mandated BIS ISI Mark with CML number and batch testing frequency on bags.', keyChanges: ['Marking requirements updated on HDPE/paper bags', 'Traceability QR code recommendations included'] }
    ],
    normativeReferences: [
      { code: 'IS 4031 (Parts 1 to 15)', title: 'Methods of physical tests for hydraulic cement', category: 'TEST_METHOD', description: 'Standard test methods for compressive strength, setting time, and fineness', isMandatoryForTender: true },
      { code: 'IS 4032:1985', title: 'Method of chemical analysis of hydraulic cement', category: 'TEST_METHOD', description: 'Testing insoluble residue, loss on ignition, and magnesia content', isMandatoryForTender: true },
      { code: 'IS 456:2000', title: 'Plain and reinforced concrete — Code of practice', category: 'SAFETY_CODE', description: 'Structural concrete design and construction standard', isMandatoryForTender: true },
      { code: 'IS 4990:2011', title: 'Plywood for concrete shuttering work — Specification', category: 'RELATED_PRODUCT', description: 'Allied standard for formwork in civil tenders', isMandatoryForTender: false },
      { code: 'IS 4837:1990', title: 'Glossary of terms relating to cement and concrete', category: 'TERMINOLOGY', description: 'Standard definitions for clinker, hydration, and cementitious phases', isMandatoryForTender: false }
    ],
    mandatoryCertification: {
      isMandatory: true,
      scheme: 'BIS Product Certification Scheme-I (ISI Mark)',
      qcoName: 'Cement (Quality Control) Order',
      gazetteNotification: 'DPIIT Statutory Notification',
      ministry: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
      enforcementDate: 'Strictly Enforced (Zero Exemption)',
      scopeSummary: 'No person shall manufacture, store, sell, or procure cement of any kind without the BIS Standard Mark (ISI mark) and valid BIS license number.',
      penaltiesForNonCompliance: 'Immediate tender disqualification, blacklisting on GeM, and prosecution under Section 29 of BIS Act 2016.'
    },
    applicableIndustries: ['CPWD / State PWDs', 'National Highways Authority of India (NHAI)', 'Railways & Metro Rail', 'Military Engineer Services (MES)', 'NBCC'],
    procurementCategory: 'Civil Construction & Building Materials',
    sampleTenderClause: 'Cement shall be Ordinary Portland Cement (OPC) 53 Grade conforming strictly to IS 269:2015 with Amendments 1 and 2. The 28-day compressive strength shall not be less than 53.0 MPa when tested in accordance with IS 4031 (Part 6). Soundness and setting times shall satisfy IS 4031. Cement bags must be freshly packed within 60 days of dispatch and bear the valid BIS ISI Mark along with the CML license number and Legal Metrology Rule 6 declarations.',
    keywords: ['cement', 'opc', '53 grade', '43 grade', 'concrete', 'cpwd', 'pwd', 'construction', 'portland cement', 'is 269', 'सीमेंट', 'कंक्रीट']
  },
  {
    id: 'IS-15683',
    standardNumber: 'IS 15683:2018',
    yearPublished: 2018,
    reaffirmedYear: 2023,
    title: 'Portable Fire Extinguishers — Performance and Construction (First Revision)',
    division: 'Civil Engineering (CED 22 - Fire Fighting)',
    status: 'ACTIVE',
    supersededStandard: 'Amalgamated & superseded IS 940, IS 2171, IS 10204, IS 13849',
    scope: 'Specifies the requirements for design, construction, mechanical strength, rating, test methods, and marking of portable fire extinguishers of water, foam, powder, carbon dioxide, and clean agent types.',
    keySpecifications: [
      { property: 'Hydrostatic Test Pressure', requirement: 'Minimum 2.0 to 2.5 times working pressure with no leak/rupture', testStandardRef: 'IS 15683 Cl 8.2' },
      { property: 'Burst Pressure', requirement: '≥ 4.0 times maximum working pressure', testStandardRef: 'IS 15683 Cl 8.3' },
      { property: 'Discharge Duration & Throw', requirement: 'Minimum 85% mass discharge within stipulated duration (e.g. 15s to 30s)', testStandardRef: 'IS 15683 Cl 8.5' },
      { property: 'Electrical Conductivity', requirement: 'Dielectric resistance for Class E suitability', testStandardRef: 'IS 15683 Cl 8.7' },
      { property: 'Extinguishing Rating', requirement: 'Class A and Class B fire performance test verification', testStandardRef: 'IS 15683 Annex B & C' }
    ],
    amendments: [
      { amdNumber: 'Amendment No. 1', monthYear: 'May 2020', summary: 'Introduced eco-friendly clean agent requirements replacing ozone-depleting halons.', keyChanges: ['Halon substitutes certified under Montreal Protocol', 'Pressure gauge reliability test protocol updated'] },
      { amdNumber: 'Amendment No. 2', monthYear: 'September 2022', summary: 'Mandated tamper-proof QR code and serial number stamping on extinguisher cylinder.', keyChanges: ['Stamping depth and legibility standard aligned', 'Inspection certificate validity tracking'] }
    ],
    normativeReferences: [
      { code: 'IS 2190:2010', title: 'Selection, installation and maintenance of portable first-aid fire appliances — Code of practice', category: 'SAFETY_CODE', description: 'Governs extinguisher density, mounting height, and monthly inspection frequency', isMandatoryForTender: true },
      { code: 'IS 4308:2003', title: 'Dry chemical powder for fighting B and C class fires — Specification', category: 'RAW_MATERIAL', description: 'Specification for extinguishing powder chemicals filled inside extinguisher', isMandatoryForTender: true },
      { code: 'IS 14609:1999', title: 'Dry chemical powder for fighting A, B, C class fires — Specification', category: 'RAW_MATERIAL', description: 'Specification for ABC mono-ammonium phosphate powder compound', isMandatoryForTender: true },
      { code: 'IS 7285 (Parts 1 & 2)', title: 'Refillable seamless steel gas cylinders', category: 'RELATED_PRODUCT', description: 'Standard for CO2 extinguisher seamless gas cylinders', isMandatoryForTender: false },
      { code: 'IS 884:1985', title: 'First-aid hose reel for fire fighting', category: 'RELATED_PRODUCT', description: 'Allied firefighting equipment for building safety tenders', isMandatoryForTender: false }
    ],
    mandatoryCertification: {
      isMandatory: true,
      scheme: 'BIS Product Certification Scheme-I (ISI Mark)',
      qcoName: 'Fire Extinguishers (Quality Control) Order',
      gazetteNotification: 'Ministry of Commerce & Industry QCO',
      ministry: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
      enforcementDate: 'Strictly Enforced',
      scopeSummary: 'Portable fire extinguishers supplied to government offices, hospitals, schools, and PSU plants must mandatorily carry the BIS ISI Mark.',
      penaltiesForNonCompliance: 'Rejection of tender bids, confiscation of substandard pressure vessels, and prosecution under Fire Safety Regulations & BIS Act.'
    },
    applicableIndustries: ['Public Sector Undertakings (PSUs)', 'Airports Authority of India (AAI)', 'Railways', 'State Fire Services', 'Educational Institutions & Hospitals'],
    procurementCategory: 'Fire Protection, Safety & Security',
    sampleTenderClause: 'All portable fire extinguishers shall strictly conform to IS 15683:2018 (First Revision) with Amendments 1 and 2. The extinguishers must bear the valid BIS Standard Mark (ISI mark) embossed on the cylinder with CML number. Fire ratings must satisfy minimum 4A:34B for 6kg ABC powder type, tested as per IS 15683. Powder chemical must comply with IS 14609. Installation and commissioning shall be carried out in strict accordance with IS 2190:2010 code of practice.',
    keywords: ['fire extinguisher', 'safety', 'abc extinguisher', 'co2 extinguisher', 'fire fighting', 'is 15683', 'is 2190', 'fire safety', 'आग बुझाने का यंत्र', 'अग्निशामक']
  },
  {
    id: 'IS-16289',
    standardNumber: 'IS 16289:2014',
    yearPublished: 2014,
    reaffirmedYear: 2021,
    title: 'Medical Face Masks — Specification',
    division: 'Chemical (CHD 25 - Textiles for Healthcare and Hygiene)',
    status: 'ACTIVE',
    supersededStandard: 'N/A',
    scope: 'Prescribes the construction, design, performance requirements, and test methods for medical face masks intended to limit the transmission of infective agents from staff to patients and vice versa during surgical and medical procedures.',
    keySpecifications: [
      { property: 'Bacterial Filtration Efficiency (BFE)', requirement: 'Class 1: ≥ 95%, Class 2 & 3: ≥ 98%', testStandardRef: 'IS 16289 Annex B' },
      { property: 'Differential Pressure (Breathability)', requirement: 'Class 1 & 2: < 29.4 Pa/cm², Class 3: < 49.0 Pa/cm²', testStandardRef: 'IS 16289 Annex C' },
      { property: 'Splash Resistance Pressure', requirement: '≥ 16.0 kPa for Class 3 surgical masks', testStandardRef: 'IS 16289 Annex D' },
      { property: 'Microbial Cleanliness (Bioburden)', requirement: '≤ 30 CFU/g of mask material', testStandardRef: 'IS 16289 Annex E' }
    ],
    amendments: [
      { amdNumber: 'Amendment No. 1', monthYear: 'June 2020', summary: 'Aligned with WHO pandemic procurement norms and particulate filtration cross-checks.', keyChanges: ['Sub-micron particulate filtration testing cross-reference', 'Packaging integrity standards for healthcare delivery'] }
    ],
    normativeReferences: [
      { code: 'IS 9473:2002', title: 'Respiratory protective devices — Filtering half masks to protect against particles (FFP1/FFP2/FFP3/N95)', category: 'RELATED_PRODUCT', description: 'Mandatory standard when procuring particulate respirators rather than flat surgical masks', isMandatoryForTender: true },
      { code: 'IS 17334:2020', title: 'Medical textiles — Surgical gowns and drapes', category: 'RELATED_PRODUCT', description: 'Allied hospital procurement standard for surgical attire', isMandatoryForTender: false },
      { code: 'IS 1390:1983', title: 'Methods for determination of pH of aqueous extracts of textile materials', category: 'TEST_METHOD', description: 'Ensures skin biocompatibility and prevents contact dermatitis', isMandatoryForTender: true }
    ],
    mandatoryCertification: {
      isMandatory: true,
      scheme: 'Medical Devices / BIS Certification',
      qcoName: 'Medical Textiles (Quality Control) Order',
      gazetteNotification: 'Ministry of Textiles & CDSCO Notification',
      ministry: 'Ministry of Textiles & Ministry of Health and Family Welfare',
      enforcementDate: 'Active',
      scopeSummary: 'Medical face masks for public hospital procurement must comply with BIS standards and possess valid CDSCO manufacturing license.',
      penaltiesForNonCompliance: 'Rejection of medical consignments and forfeiture of performance security under public health procurement guidelines.'
    },
    applicableIndustries: ['AIIMS & Government Hospitals', 'State Health Societies (NHM)', 'Armed Forces Medical Services (AFMS)', 'ESIC Hospitals'],
    procurementCategory: 'Medical Devices & Healthcare Textiles',
    sampleTenderClause: 'Medical surgical 3-ply face masks shall conform to IS 16289:2014 Class 2 or Class 3 with Amendment 1. The Bacterial Filtration Efficiency (BFE) shall be ≥ 98% when tested according to IS 16289 Annex B, and breathability differential pressure shall be < 29.4 Pa/cm². For particulate respirators, compliance to IS 9473:2002 FFP2/N95 is required. Every packaging box must carry Legal Metrology Rule 6 declarations and CDSCO medical device manufacturing license number.',
    keywords: ['mask', 'face mask', 'surgical mask', 'n95', 'respirator', 'medical ppe', 'hospital procurement', 'bfe', 'is 16289', 'is 9473', 'मास्क', 'सर्जिकल मास्क']
  },
  {
    id: 'IS-1155',
    standardNumber: 'IS 1155:2020',
    yearPublished: 2020,
    reaffirmedYear: 2024,
    title: 'Wheat Atta (Whole Meal Wheat Flour) and Fortified Wheat Flour — Specification (Fifth Revision)',
    division: 'Food and Agriculture (FAD 16 - Foodgrains, Starches and Allied Products)',
    status: 'ACTIVE',
    supersededStandard: 'IS 1155:1968 (Fourth Revision - Superseded)',
    scope: 'Prescribes requirements and methods of sampling and test for wheat atta and fortified wheat atta intended for public distribution system (PDS) and welfare procurement.',
    keySpecifications: [
      { property: 'Moisture Content', requirement: '≤ 13.0% by mass', testStandardRef: 'IS 1155 Annex A' },
      { property: 'Total Ash (Dry Basis)', requirement: '≤ 2.0% by mass', testStandardRef: 'IS 1155 Annex B' },
      { property: 'Acid Insoluble Ash', requirement: '≤ 0.05% by mass', testStandardRef: 'IS 1155 Annex C' },
      { property: 'Gluten Content (Dry Basis)', requirement: '≥ 7.0% by mass', testStandardRef: 'IS 1155 Annex D' },
      { property: 'Fortification (Iron, Folic Acid, B12)', requirement: 'Iron: 28-42.5 mg/kg, Folic Acid: 75-125 µg/kg, Vit B12: 0.75-1.25 µg/kg', testStandardRef: 'FSSAI Fortification Regulations & IS 1155' }
    ],
    amendments: [
      { amdNumber: 'Amendment No. 1', monthYear: 'March 2022', summary: 'Aligned mandatory micronutrient fortification with Department of Food & Public Distribution guidelines.', keyChanges: ['Iron compound types (Sodium Iron EDTA / Ferrous Fumarate) defined', 'Packaging declaration under Legal Metrology Rule 6 reinforced'] }
    ],
    normativeReferences: [
      { code: 'IS 4333 (Parts 1 to 5)', title: 'Methods of analysis for foodgrains', category: 'TEST_METHOD', description: 'Testing foreign matter, damaged grains, and moisture in raw wheat', isMandatoryForTender: true },
      { code: 'IS 17782:2021', title: 'Fortified Rice Kernels (FRK) — Specification', category: 'RELATED_PRODUCT', description: 'Sister standard for public distribution fortified grain supply', isMandatoryForTender: false },
      { code: 'IS 14887:2014', title: 'High density polyethylene (HDPE) / Polypropylene (PP) woven sacks for packaging of 50 kg foodgrains', category: 'SAFETY_CODE', description: 'Mandatory packaging material standard for foodgrain storage', isMandatoryForTender: true }
    ],
    mandatoryCertification: {
      isMandatory: true,
      scheme: 'FSSAI + Legal Metrology + BIS Marking (Voluntary/Mandatory PDS)',
      qcoName: 'Essential Commodities & Fortified Food Distribution Directives',
      gazetteNotification: 'DFPD / FSSAI Statutory Order',
      ministry: 'Ministry of Consumer Affairs, Food & Public Distribution (DoCA / DFPD)',
      enforcementDate: 'Strictly Enforced across PDS/ICDS',
      scopeSummary: 'Grain supply for PMGKAY and state welfare schemes must comply with IS 1155:2020. Packaging bags must strictly comply with Legal Metrology Rules 2011 Rule 6.',
      penaltiesForNonCompliance: 'Rejection of food supply rake, blacklisting of millers, and criminal prosecution under Essential Commodities Act 1955.'
    },
    applicableIndustries: ['Food Corporation of India (FCI)', 'State Civil Supplies Corporations', 'PM-POSHAN (Mid-Day Meal)', 'ICDS Anganwadi Welfare', 'Defense Canteen Stores'],
    procurementCategory: 'Food, Grain & Civil Supplies (Direct DoCA Mandate)',
    sampleTenderClause: 'Whole meal wheat flour (Atta) and Fortified Wheat Atta supplied under the tender must strictly conform to IS 1155:2020 (Fifth Revision). Moisture shall not exceed 13% and total ash shall be below 2.0%. Fortification premix levels must satisfy FSSAI norms (Iron 28-42.5 mg/kg, Folic Acid 75-125 mcg/kg, Vit B12 0.75-1.25 mcg/kg). Packaging must be in virgin food-grade HDPE woven sacks conforming to IS 14887:2014 with complete Legal Metrology Rule 6 declarations printed.',
    keywords: ['atta', 'wheat flour', 'wheat', 'grain', 'fortified atta', 'fci', 'pds', 'civil supplies', 'food distribution', 'is 1155', 'गेहूं', 'आटा', 'खाद्य']
  }
];

export const SAMPLE_TENDER_SNIPPETS: TenderAuditResult[] = [
  {
    tenderTitle: 'CPWD Tender: Supply and Laying of High Density Polyethylene Pipeline for Sub-Zone 4 Water Network',
    procurementAgency: 'Central Public Works Department (CPWD), Northern Zone',
    extractedTextSnippet: 'Supply of HDPE pipes 110mm OD, PN-10 rating conforming to IS 4984:1995 for drinking water pipeline. Jointing to be done as per site engineer instructions. Manufacturer must provide warranty certificate for 1 year.',
    findings: [
      {
        type: 'OUTDATED_STANDARD',
        severity: 'CRITICAL',
        title: 'Deprecated Standard Referenced (IS 4984:1995)',
        description: 'Tender specification references IS 4984:1995 (Fourth Revision), which was superseded by IS 4984:2016 (Fifth Revision with Amendments 1, 2, and 3). Using outdated 1995 standard invites substandard PE-63 material lacking modern PE-100 hydrostatic requirements.',
        recommendedCorrection: 'Update standard reference to "IS 4984:2016 with Amendments No. 1, 2, and 3".'
      },
      {
        type: 'MISSING_MANDATORY_QCO',
        severity: 'CRITICAL',
        title: 'Missing Mandatory Quality Control Order (QCO 2024)',
        description: 'Under the Pipes and Fittings (Quality Control) Order, 2024 (S.O. 1248(E)), HDPE water pipes cannot be legally sold or procured without valid BIS ISI certification. The tender specification fails to mandate BIS License (CML Number), allowing non-certified bidders to participate.',
        recommendedCorrection: 'Insert mandatory condition: "Bidders must hold a valid BIS Product Certification License (ISI Mark) under Scheme-I with active CML number on the date of bid submission."'
      },
      {
        type: 'MISSING_NORMATIVE_TEST',
        severity: 'WARNING',
        title: 'Omission of Mandatory Normative Raw Material & Jointing Standards',
        description: 'The tender omits normative reference IS 7328 (virgin polymer standard), IS 2530 (carbon black UV stability), and installation code IS 7634 (Part 2) for electrofusion/butt welding.',
        recommendedCorrection: 'Stipulate compliance with normative standards IS 7328:1992, IS 2530:1963, and jointing under IS 7634 (Part 2):2012.'
      },
      {
        type: 'AMBIGUOUS_SPECIFICATION',
        severity: 'WARNING',
        title: 'Ambiguous Material Grade Specification',
        description: 'Tender specifies PN-10 rating but fails to specify the raw material polymer grade (PE-80 vs PE-100), leading to disputes over wall thickness and pressure ratings.',
        recommendedCorrection: 'Explicitly specify "Virgin PE-100 compound with SDR 11 / PN 10 rating."'
      }
    ],
    recommendedStandards: [INDIAN_STANDARDS_DATABASE[0]],
    compliantClauseDraft: 'Supply of High Density Polyethylene (HDPE) pipes 110mm OD, PN-10 rating conforming strictly to IS 4984:2016 with Amendments 1, 2, and 3. Pipes shall be manufactured from virgin PE-100 grade polymer complying with IS 7328:1992 and tested as per IS 12235 and IS 2530. As mandated under the Pipes & Fittings QCO 2024, bidder must hold valid BIS ISI license (Scheme-I) with valid CML number. Jointing shall be carried out by qualified technicians in accordance with IS 7634 (Part 2):2012.',
    overallHealthScore: 38
  },
  {
    tenderTitle: 'Municipal Corporation: Procurement of 70W Outdoor Street LED Luminaires for Smart City Corridor',
    procurementAgency: 'Municipal Corporation Smart City Project',
    extractedTextSnippet: '70W LED Street Light fixture with IP66 protection, input voltage 140-270V, aluminium die cast housing. Must be energy efficient and comply with standard electrical norms. Quotation should include 3 years warranty.',
    findings: [
      {
        type: 'OUTDATED_STANDARD',
        severity: 'CRITICAL',
        title: 'Total Omission of Applicable Indian Standards (IS 10322 & IS 16102)',
        description: 'Tender mentions vague "standard electrical norms" without specifying the statutory Indian Standards IS 10322 (Part 5/Sec 3) for street luminaires and IS 16102 (Part 1 & 2) for LED performance.',
        recommendedCorrection: 'Mandate compliance with IS 10322 (Part 5/Sec 3):2012 and IS 16102 (Part 1 & 2):2012.'
      },
      {
        type: 'MISSING_MANDATORY_QCO',
        severity: 'CRITICAL',
        title: 'Omission of Mandatory BIS Compulsory Registration Scheme (CRS)',
        description: 'Under MeitY QCO S.O. 2357(E), all LED lighting and drivers must be registered with BIS under CRS. Bidders might supply uncertified Chinese driver modules if not enforced.',
        recommendedCorrection: 'Require proof of valid BIS CRS Registration (R-Number) for both LED Luminaire and internal driver conforming to IS 15885 (Part 2/Sec 13).'
      },
      {
        type: 'MISSING_NORMATIVE_TEST',
        severity: 'WARNING',
        title: 'Omission of Photobiological Safety (IS 16108) & Grid Harmonics (IS 14700)',
        description: 'No restriction specified on total harmonic distortion (THD) or blue light eye hazard for pedestrian traffic.',
        recommendedCorrection: 'Stipulate THD < 15% as per IS 14700 (Part 3/Sec 2) and photobiological safety Risk Group RG-0/RG-1 under IS 16108.'
      }
    ],
    recommendedStandards: [INDIAN_STANDARDS_DATABASE[1]],
    compliantClauseDraft: 'Procurement of 70W Outdoor Street LED Luminaires conforming strictly to IS 10322 (Part 5/Sec 3):2012 and IS 16102 (Part 1 & 2):2012 with Amendments 1 & 2. The internal LED driver must conform to IS 15885 (Part 2/Sec 13):2012 with surge immunity ≥ 4kV. Both luminaire and driver must carry valid BIS Compulsory Registration Scheme (CRS) R-numbers as per MeitY QCO. Harmonics shall comply with IS 14700 (Part 3/Sec 2) with THD ≤ 15%. Photobiological safety certificate under IS 16108 (RG-0) is mandatory.',
    overallHealthScore: 25
  },
  {
    tenderTitle: 'Food Corporation of India (FCI) / State Civil Supplies: Procurement of Fortified Whole Wheat Flour (Atta) 1kg Packs for Public Distribution',
    procurementAgency: 'Department of Food & Public Distribution (DFPD) / State Civil Supplies Corporation',
    extractedTextSnippet: 'Supply of Whole Wheat Flour (Atta) packed in 1kg poly pouches for distribution under NFSA/PMGKAY welfare schemes. Flour must be clean, wholesome, free from insect infestation, and fit for human consumption. Bidders must quote competitive rates per MT. Delivery within 20 days.',
    findings: [
      {
        type: 'OUTDATED_STANDARD',
        severity: 'CRITICAL',
        title: 'Total Omission of Mandatory Indian Standard (IS 1155:2020)',
        description: 'Tender specification uses vague commercial terms ("clean, wholesome") without mandating Indian Standard IS 1155:2020 (Fifth Revision). This allows low-grade milled flour with excess moisture (>13.0%), high ash content (>2.0%), and deficient gluten (<7.0%) to be supplied.',
        recommendedCorrection: 'Mandatorily stipulate: "Wheat Atta must conform strictly to IS 1155:2020 (Fifth Revision with Amendment 1) with moisture ≤ 13.0%, total ash ≤ 2.0%, and gluten ≥ 7.0% on dry basis."'
      },
      {
        type: 'MISSING_MANDATORY_QCO',
        severity: 'CRITICAL',
        title: 'Omission of Mandatory Food Fortification & FSSAI Standards',
        description: 'Tender fails to mandate mandatory micronutrient fortification (Iron, Folic Acid, Vitamin B12) as per FSSAI Food Safety and Standards (Fortification of Foods) Regulations and Department of Food & Public Distribution directives.',
        recommendedCorrection: 'Mandate fortification premix levels: Iron (28–42.5 mg/kg), Folic Acid (75–125 µg/kg), and Vitamin B12 (0.75–1.25 µg/kg) with certified +F logo and valid FSSAI Central Manufacturing License.'
      },
      {
        type: 'MISSING_NORMATIVE_TEST',
        severity: 'WARNING',
        title: 'Omission of Legal Metrology Rule 6 Packaging & Woven Sack Standards',
        description: 'Tender mentions 1kg poly pouches but omits compliance with Legal Metrology (Packaged Commodities) Rules, 2011 (Rule 6 declarations, Unit Sale Price, complete postal address with PIN code) and primary packaging standard IS 14887:2014.',
        recommendedCorrection: 'Incorporate condition: "Each 1kg consumer pouch must carry mandatory Rule 6 declarations including Unit Sale Price, and transport packaging must comply with IS 14887:2014."'
      }
    ],
    recommendedStandards: [INDIAN_STANDARDS_DATABASE[6]],
    compliantClauseDraft: 'Supply of Whole Meal Wheat Flour (Atta) and Fortified Wheat Atta conforming strictly to IS 1155:2020 (Fifth Revision with Amendment 1). Moisture content shall not exceed 13.0% by mass, total ash ≤ 2.0% (dry basis), and gluten content ≥ 7.0% (dry basis) tested as per IS 1155 Annexures. Flour must be fortified with Iron (28–42.5 mg/kg), Folic Acid (75–125 µg/kg), and Vitamin B12 (0.75–1.25 µg/kg) complying with FSSAI regulations. Consumer 1kg pouches must strictly display all statutory declarations under Rule 6 & 7 of Legal Metrology (Packaged Commodities) Rules 2011 (including Unit Sale Price, batch details, and consumer grievance email). Supplier must hold valid FSSAI Central License and submit NABL accredited batch test reports prior to dispatch.',
    overallHealthScore: 28
  }
];
