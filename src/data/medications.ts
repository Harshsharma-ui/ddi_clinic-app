/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  category: string;
  properties: string;
  usedFor: string[];
  safeDose: string;
  sideEffects: string[];
  overdoseEffects: string;
  mechanismOfAction: string;
  contraindications: string[];
  interactions: {
    drugId: string;
    severity: 'Minor' | 'Moderate' | 'Major';
    description: string;
  }[];
  alternatives: string[]; // IDs of alternative medications
  brands?: string[];
}

export const MEDICATIONS: Medication[] = [
  {
    id: 'paracetamol',
    name: 'Paracetamol (Crocin, Calpol, Dolo 650)',
    genericName: 'Acetaminophen',
    brands: ['Crocin', 'Calpol', 'Dolo 650', 'Dolo', 'Tylenol', 'Panadol'],
    category: 'Analgesic/Antipyretic',
    properties: 'Pain reliever and fever reducer.',
    usedFor: ['Fever', 'Headache', 'Muscle aches', 'Arthritis'],
    safeDose: '500mg - 1000mg every 4-6 hours. Max 4000mg/day.',
    sideEffects: ['Nausea', 'Stomach pain', 'Loss of appetite', 'Itching'],
    overdoseEffects: 'Severe liver damage, jaundice, confusion, sweating.',
    mechanismOfAction: 'Inhibits prostaglandin synthesis in the central nervous system.',
    contraindications: ['Severe liver disease', 'Hypersensitivity'],
    interactions: [
      { drugId: 'warfarin', severity: 'Moderate', description: 'May increase the risk of bleeding.' },
      { drugId: 'alcohol', severity: 'Major', description: 'Increased risk of liver toxicity.' }
    ],
    alternatives: ['ibuprofen', 'naproxen']
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen (Advil, Motrin, Brufen)',
    genericName: 'Ibuprofen',
    brands: ['Advil', 'Motrin', 'Brufen', 'Ibugesic'],
    category: 'NSAID',
    properties: 'Nonsteroidal anti-inflammatory drug.',
    usedFor: ['Pain', 'Fever', 'Inflammation'],
    safeDose: '200mg - 400mg every 4-6 hours. Max 1200mg/day (OTC) or 3200mg/day (Prescription).',
    sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness', 'Ringing in ears'],
    overdoseEffects: 'Gastrointestinal bleeding, kidney failure, seizures, coma.',
    mechanismOfAction: 'Inhibits cyclooxygenase (COX) enzymes, reducing prostaglandin production.',
    contraindications: ['Peptic ulcer', 'Severe heart failure', 'Kidney disease', 'Pregnancy (3rd trimester)'],
    interactions: [
      { drugId: 'aspirin', severity: 'Major', description: 'Increases risk of GI bleeding and reduces aspirin effect.' },
      { drugId: 'lisinopril', severity: 'Moderate', description: 'May reduce the blood pressure lowering effect.' }
    ],
    alternatives: ['paracetamol', 'naproxen']
  },
  {
    id: 'lisinopril',
    name: 'Lisinopril (Zestril, Prinivil)',
    genericName: 'Lisinopril',
    brands: ['Zestril', 'Prinivil', 'Listril'],
    category: 'ACE Inhibitor',
    properties: 'Angiotensin-converting enzyme inhibitor.',
    usedFor: ['Hypertension', 'Heart failure', 'Post-myocardial infarction'],
    safeDose: '10mg - 40mg once daily.',
    sideEffects: ['Dry cough', 'Dizziness', 'Headache', 'Fatigue'],
    overdoseEffects: 'Severe hypotension, electrolyte disturbances, renal failure.',
    mechanismOfAction: 'Prevents conversion of angiotensin I to angiotensin II, leading to vasodilation.',
    contraindications: ['History of angioedema', 'Pregnancy', 'Bilateral renal artery stenosis'],
    interactions: [
      { drugId: 'ibuprofen', severity: 'Moderate', description: 'May reduce the blood pressure lowering effect and worsen kidney function.' },
      { drugId: 'spironolactone', severity: 'Major', description: 'High risk of hyperkalemia (high potassium).' }
    ],
    alternatives: ['losartan', 'amlodipine']
  },
  {
    id: 'metformin',
    name: 'Metformin (Glucophage, Glycomet)',
    genericName: 'Metformin',
    brands: ['Glucophage', 'Glycomet', 'Metfor'],
    category: 'Biguanide',
    properties: 'Antidiabetic agent.',
    usedFor: ['Type 2 Diabetes Mellitus', 'PCOS'],
    safeDose: '500mg - 2550mg daily, usually divided with meals.',
    sideEffects: ['Diarrhea', 'Nausea', 'Gas', 'Metallic taste'],
    overdoseEffects: 'Lactic acidosis (medical emergency), severe hypoglycemia.',
    mechanismOfAction: 'Decreases hepatic glucose production and increases insulin sensitivity.',
    contraindications: ['Severe renal impairment (eGFR < 30)', 'Metabolic acidosis', 'Liver disease'],
    interactions: [
      { drugId: 'contrast_dye', severity: 'Major', description: 'Risk of lactic acidosis. Discontinue before imaging.' }
    ],
    alternatives: ['glipizide', 'sitagliptin']
  },
  {
    id: 'cetirizine',
    name: 'Cetirizine (Okacet, Zyrtec)',
    genericName: 'Cetirizine',
    brands: ['Okacet', 'Zyrtec', 'Cetzine', 'Alerid'],
    category: 'Antihistamine',
    properties: 'Second-generation antihistamine used to treat hay fever, allergies, and hives.',
    usedFor: ['Allergies', 'Hay fever', 'Hives', 'Itching'],
    safeDose: '5mg - 10mg once daily.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue', 'Dizziness'],
    overdoseEffects: 'Severe drowsiness, agitation, restlessness.',
    mechanismOfAction: 'Selective H1 receptor antagonist.',
    contraindications: ['Severe renal impairment', 'Hypersensitivity'],
    interactions: [
      { drugId: 'alcohol', severity: 'Moderate', description: 'Increased drowsiness and sedation.' }
    ],
    alternatives: ['levocetirizine', 'fexofenadine', 'loratadine']
  },
  {
    id: 'levocetirizine',
    name: 'Levocetirizine (Levocet, Xyzal)',
    genericName: 'Levocetirizine',
    brands: ['Levocet', 'Xyzal', 'L-Cet'],
    category: 'Antihistamine',
    properties: 'Third-generation antihistamine, more potent than cetirizine.',
    usedFor: ['Allergic rhinitis', 'Chronic hives'],
    safeDose: '5mg once daily in the evening.',
    sideEffects: ['Somnolence', 'Nasopharyngitis', 'Dry mouth', 'Fatigue'],
    overdoseEffects: 'Extreme drowsiness in adults, agitation then drowsiness in children.',
    mechanismOfAction: 'Potent and selective peripheral H1 receptor antagonist.',
    contraindications: ['End-stage renal disease', 'Hypersensitivity'],
    interactions: [
      { drugId: 'alcohol', severity: 'Moderate', description: 'Increased risk of central nervous system depression.' }
    ],
    alternatives: ['cetirizine', 'fexofenadine']
  },
  {
    id: 'fexofenadine',
    name: 'Fexofenadine (Allegra)',
    genericName: 'Fexofenadine',
    brands: ['Allegra', 'Fexova'],
    category: 'Antihistamine',
    properties: 'Non-sedating second-generation antihistamine.',
    usedFor: ['Seasonal allergies', 'Chronic idiopathic urticaria'],
    safeDose: '60mg twice daily or 180mg once daily.',
    sideEffects: ['Headache', 'Dizziness', 'Nausea', 'Drowsiness (rare)'],
    overdoseEffects: 'Dizziness, drowsiness, dry mouth.',
    mechanismOfAction: 'Peripheral H1 receptor antagonist.',
    contraindications: ['Hypersensitivity'],
    interactions: [
      { drugId: 'antacids', severity: 'Minor', description: 'May reduce fexofenadine absorption.' }
    ],
    alternatives: ['cetirizine', 'loratadine']
  },
  {
    id: 'montelukast',
    name: 'Montelukast (Montek, Singulair)',
    genericName: 'Montelukast',
    brands: ['Montek', 'Singulair', 'Telekast'],
    category: 'Leukotriene Receptor Antagonist',
    properties: 'Used for long-term treatment of asthma and seasonal allergies.',
    usedFor: ['Asthma', 'Allergic rhinitis', 'Exercise-induced bronchoconstriction'],
    safeDose: '10mg once daily in the evening.',
    sideEffects: ['Upper respiratory infection', 'Fever', 'Headache', 'Sore throat'],
    overdoseEffects: 'Abdominal pain, somnolence, thirst, headache, vomiting.',
    mechanismOfAction: 'Blocks leukotriene receptors, reducing inflammation and mucus production.',
    contraindications: ['Hypersensitivity'],
    interactions: [
      { drugId: 'phenobarbital', severity: 'Minor', description: 'May reduce montelukast levels.' }
    ],
    alternatives: ['cetirizine', 'fexofenadine']
  },
  {
    id: 'atorvastatin',
    name: 'Atorvastatin (Lipitor, Atorva)',
    genericName: 'Atorvastatin',
    brands: ['Lipitor', 'Atorva', 'Lipvas'],
    category: 'Statin',
    properties: 'HMG-CoA reductase inhibitor.',
    usedFor: ['Hypercholesterolemia', 'Cardiovascular disease prevention'],
    safeDose: '10mg - 80mg once daily.',
    sideEffects: ['Muscle pain', 'Joint pain', 'Diarrhea', 'Nausea'],
    overdoseEffects: 'Muscle breakdown (rhabdomyolysis), liver enzyme elevation.',
    mechanismOfAction: 'Inhibits HMG-CoA reductase, the rate-limiting enzyme in cholesterol synthesis.',
    contraindications: ['Active liver disease', 'Pregnancy', 'Breastfeeding'],
    interactions: [
      { drugId: 'clarithromycin', severity: 'Major', description: 'Increases atorvastatin levels, risk of muscle damage.' },
      { drugId: 'grapefruit_juice', severity: 'Moderate', description: 'Increases statin concentration.' }
    ],
    alternatives: ['rosuvastatin', 'simvastatin']
  },
  {
    id: 'amlodipine',
    name: 'Amlodipine (Norvasc, Amlokind)',
    genericName: 'Amlodipine',
    brands: ['Norvasc', 'Amlokind', 'Stamlo'],
    category: 'Calcium Channel Blocker',
    properties: 'Dihydropyridine calcium channel blocker.',
    usedFor: ['Hypertension', 'Angina'],
    safeDose: '2.5mg - 10mg once daily.',
    sideEffects: ['Swelling (edema)', 'Dizziness', 'Flushing', 'Palpitations'],
    overdoseEffects: 'Severe peripheral vasodilation, reflex tachycardia, hypotension.',
    mechanismOfAction: 'Relaxes vascular smooth muscle by inhibiting calcium influx.',
    contraindications: ['Severe hypotension', 'Hypersensitivity'],
    interactions: [
      { drugId: 'simvastatin', severity: 'Moderate', description: 'Amlodipine increases simvastatin levels.' }
    ],
    alternatives: ['lisinopril', 'losartan']
  },
  {
    id: 'warfarin',
    name: 'Warfarin (Coumadin, Uniwarfin)',
    genericName: 'Warfarin',
    brands: ['Coumadin', 'Uniwarfin'],
    category: 'Anticoagulant',
    properties: 'Vitamin K antagonist.',
    usedFor: ['Blood clots', 'Atrial fibrillation', 'Heart valve replacement'],
    safeDose: 'Highly individualized based on INR (usually 2mg - 10mg daily).',
    sideEffects: ['Bleeding', 'Bruising', 'Nausea', 'Abdominal pain'],
    overdoseEffects: 'Severe internal bleeding, hemorrhage.',
    mechanismOfAction: 'Inhibits Vitamin K epoxide reductase, depleting clotting factors II, VII, IX, and X.',
    contraindications: ['Active bleeding', 'Severe hypertension', 'Pregnancy (except mechanical heart valves)'],
    interactions: [
      { drugId: 'aspirin', severity: 'Major', description: 'Significantly increases bleeding risk.' },
      { drugId: 'paracetamol', severity: 'Moderate', description: 'May increase INR if taken regularly.' },
      { drugId: 'ibuprofen', severity: 'Major', description: 'Increases bleeding risk and GI irritation.' }
    ],
    alternatives: ['rivaroxaban', 'apixaban']
  },
  {
    id: 'aspirin',
    name: 'Aspirin (Ecosprin, Disprin)',
    genericName: 'Acetylsalicylic Acid',
    brands: ['Ecosprin', 'Disprin', 'Bayer'],
    category: 'NSAID/Antiplatelet',
    properties: 'Salicylate drug used for pain, fever, and as an antiplatelet.',
    usedFor: ['Pain', 'Fever', 'Inflammation', 'Heart attack prevention', 'Stroke prevention'],
    safeDose: '81mg (antiplatelet) to 325mg-650mg (pain/fever) every 4-6 hours.',
    sideEffects: ['Stomach irritation', 'Bleeding', 'Tinnitus'],
    overdoseEffects: 'Salicylate poisoning, rapid breathing, metabolic acidosis, seizures.',
    mechanismOfAction: 'Irreversibly inhibits COX-1 and COX-2 enzymes.',
    contraindications: ['Bleeding disorders', 'Aspirin-induced asthma', 'Children with viral infections (Reye syndrome)'],
    interactions: [
      { drugId: 'warfarin', severity: 'Major', description: 'High risk of severe bleeding.' },
      { drugId: 'ibuprofen', severity: 'Major', description: 'Interferes with antiplatelet effect and increases GI risk.' }
    ],
    alternatives: ['clopidogrel', 'paracetamol']
  },
  {
    id: 'losartan',
    name: 'Losartan (Cozaar, Losar)',
    genericName: 'Losartan',
    brands: ['Cozaar', 'Losar'],
    category: 'ARB',
    properties: 'Angiotensin II receptor blocker.',
    usedFor: ['Hypertension', 'Diabetic nephropathy'],
    safeDose: '25mg - 100mg once or twice daily.',
    sideEffects: ['Dizziness', 'Fatigue', 'High potassium', 'Back pain'],
    overdoseEffects: 'Hypotension, tachycardia, bradycardia.',
    mechanismOfAction: 'Blocks the binding of angiotensin II to the AT1 receptor.',
    contraindications: ['Pregnancy', 'Concomitant use with aliskiren in diabetics'],
    interactions: [
      { drugId: 'spironolactone', severity: 'Major', description: 'High risk of hyperkalemia.' }
    ],
    alternatives: ['lisinopril', 'valsartan']
  },
  {
    id: 'spironolactone',
    name: 'Spironolactone (Aldactone)',
    genericName: 'Spironolactone',
    brands: ['Aldactone'],
    category: 'Potassium-Sparing Diuretic',
    properties: 'Aldosterone antagonist.',
    usedFor: ['Heart failure', 'Hypertension', 'Edema', 'Hyperaldosteronism'],
    safeDose: '25mg - 100mg daily.',
    sideEffects: ['High potassium', 'Gynecomastia', 'Irregular menses', 'Headache'],
    overdoseEffects: 'Severe hyperkalemia, dehydration, drowsiness.',
    mechanismOfAction: 'Competes with aldosterone for receptors in the distal renal tubules.',
    contraindications: ['Hyperkalemia', "Addison's disease", 'Severe renal impairment'],
    interactions: [
      { drugId: 'lisinopril', severity: 'Major', description: 'Severe risk of hyperkalemia.' },
      { drugId: 'losartan', severity: 'Major', description: 'Severe risk of hyperkalemia.' }
    ],
    alternatives: ['eplerenone', 'furosemide']
  },
  {
    id: 'furosemide',
    name: 'Furosemide (Lasix)',
    genericName: 'Furosemide',
    brands: ['Lasix'],
    category: 'Loop Diuretic',
    properties: 'Potent diuretic used to reduce fluid retention.',
    usedFor: ['Edema', 'Heart failure', 'Liver disease', 'Kidney disease'],
    safeDose: '20mg - 80mg once or twice daily.',
    sideEffects: ['Dehydration', 'Electrolyte imbalance', 'Low blood pressure', 'Hearing loss (high doses)'],
    overdoseEffects: 'Severe dehydration, electrolyte depletion, circulatory collapse.',
    mechanismOfAction: 'Inhibits sodium-potassium-chloride cotransporter in the thick ascending limb of the loop of Henle.',
    contraindications: ['Anuria', 'Severe electrolyte depletion', 'Hypersensitivity to sulfonamides'],
    interactions: [
      { drugId: 'aspirin', severity: 'Moderate', description: 'May reduce the diuretic effect.' },
      { drugId: 'lisinopril', severity: 'Moderate', description: 'Increased risk of hypotension and renal impairment.' },
      { drugId: 'spironolactone', severity: 'Major', description: 'High risk of hyperkalemia.' },
      { drugId: 'metformin', severity: 'Moderate', description: 'May increase risk of lactic acidosis.' }
    ],
    alternatives: ['torsemide', 'bumetanide']
  },
  {
    id: 'clopidogrel',
    name: 'Clopidogrel (Plavix, Clopilet)',
    genericName: 'Clopidogrel',
    brands: ['Plavix', 'Clopilet'],
    category: 'Antiplatelet',
    properties: 'P2Y12 adenosine diphosphate (ADP) receptor inhibitor.',
    usedFor: ['Stroke prevention', 'Heart attack prevention', 'Peripheral arterial disease'],
    safeDose: '75mg once daily.',
    sideEffects: ['Bleeding', 'Bruising', 'Itching', 'Abdominal pain'],
    overdoseEffects: 'Prolonged bleeding time and subsequent bleeding complications.',
    mechanismOfAction: 'Irreversibly inhibits the P2Y12 subtype of ADP receptor, which is important in platelet aggregation.',
    contraindications: ['Active pathological bleeding (e.g., peptic ulcer, intracranial hemorrhage)'],
    interactions: [
      { drugId: 'omeprazole', severity: 'Major', description: 'Reduces the antiplatelet effect of clopidogrel.' },
      { drugId: 'aspirin', severity: 'Moderate', description: 'Increased risk of bleeding.' },
      { drugId: 'warfarin', severity: 'Major', description: 'High risk of severe bleeding.' }
    ],
    alternatives: ['ticagrelor', 'prasugrel', 'aspirin']
  },
  {
    id: 'omeprazole',
    name: 'Omeprazole (Prilosec, Omez)',
    genericName: 'Omeprazole',
    brands: ['Prilosec', 'Omez'],
    category: 'Proton Pump Inhibitor',
    properties: 'Reduces stomach acid production.',
    usedFor: ['GERD', 'Peptic ulcer disease', 'Zollinger-Ellison syndrome'],
    safeDose: '20mg - 40mg once daily.',
    sideEffects: ['Headache', 'Abdominal pain', 'Nausea', 'Diarrhea'],
    overdoseEffects: 'Confusion, drowsiness, blurred vision, tachycardia, nausea.',
    mechanismOfAction: 'Irreversibly inhibits the H+/K+ ATPase enzyme system (the proton pump) in gastric parietal cells.',
    contraindications: ['Hypersensitivity to substituted benzimidazoles'],
    interactions: [
      { drugId: 'clopidogrel', severity: 'Major', description: 'Reduces the antiplatelet effect of clopidogrel.' },
      { drugId: 'warfarin', severity: 'Moderate', description: 'May increase INR and bleeding risk.' }
    ],
    alternatives: ['pantoprazole', 'esomeprazole']
  },
  {
    id: 'levothyroxine',
    name: 'Levothyroxine (Synthroid, Thyronorm)',
    genericName: 'Levothyroxine',
    brands: ['Synthroid', 'Thyronorm', 'Eltroxin'],
    category: 'Thyroid Hormone',
    properties: 'Synthetic form of thyroxine (T4).',
    usedFor: ['Hypothyroidism', 'Thyroid cancer'],
    safeDose: '25mcg - 200mcg once daily, usually on an empty stomach.',
    sideEffects: ['Palpitations', 'Weight loss', 'Nervousness', 'Heat intolerance'],
    overdoseEffects: 'Hyperthyroidism, thyrotoxic crisis (medical emergency).',
    mechanismOfAction: 'Acts as a replacement for endogenous thyroid hormone.',
    contraindications: ['Untreated subclinical or overt thyrotoxicosis', 'Acute myocardial infarction', 'Uncorrected adrenal insufficiency'],
    interactions: [
      { drugId: 'calcium_carbonate', severity: 'Moderate', description: 'Reduces absorption of levothyroxine.' },
      { drugId: 'warfarin', severity: 'Moderate', description: 'May increase the anticoagulant effect of warfarin.' }
    ],
    alternatives: ['liothyronine']
  },
  {
    id: 'amoxicillin',
    name: 'Amoxicillin (Amoxil, Mox)',
    genericName: 'Amoxicillin',
    brands: ['Amoxil', 'Mox', 'Novamox'],
    category: 'Penicillin Antibiotic',
    properties: 'Broad-spectrum beta-lactam antibiotic.',
    usedFor: ['Bacterial infections (ear, nose, throat, skin, urinary tract)'],
    safeDose: '250mg - 500mg every 8 hours or 500mg - 875mg every 12 hours.',
    sideEffects: ['Diarrhea', 'Nausea', 'Rash', 'Vomiting'],
    overdoseEffects: 'Renal failure (crystalluria), neuromuscular hyperexcitability, seizures.',
    mechanismOfAction: 'Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins.',
    contraindications: ['Hypersensitivity to penicillins'],
    interactions: [
      { drugId: 'methotrexate', severity: 'Major', description: 'Increases methotrexate levels, risk of toxicity.' },
      { drugId: 'warfarin', severity: 'Moderate', description: 'May increase the risk of bleeding.' }
    ],
    alternatives: ['cephalexin', 'azithromycin']
  },
  {
    id: 'telmisartan',
    name: 'Telmisartan (Telma)',
    genericName: 'Telmisartan',
    brands: ['Telma', 'Telmikind', 'Telvas'],
    category: 'ARB',
    properties: 'Angiotensin II receptor blocker.',
    usedFor: ['Hypertension', 'Cardiovascular risk reduction'],
    safeDose: '40mg - 80mg once daily.',
    sideEffects: ['Dizziness', 'Back pain', 'Sinusitis', 'Diarrhea'],
    overdoseEffects: 'Hypotension, tachycardia, bradycardia.',
    mechanismOfAction: 'Blocks the binding of angiotensin II to the AT1 receptor.',
    contraindications: ['Pregnancy', 'Severe renal impairment', 'Biliary obstructive disorders'],
    interactions: [
      { drugId: 'spironolactone', severity: 'Major', description: 'High risk of hyperkalemia.' },
      { drugId: 'furosemide', severity: 'Moderate', description: 'Increased risk of hypotension.' }
    ],
    alternatives: ['losartan', 'lisinopril']
  },
  {
    id: 'pantoprazole',
    name: 'Pantoprazole (Pantocid)',
    genericName: 'Pantoprazole',
    brands: ['Pantocid', 'Pan', 'Pantodac'],
    category: 'PPI',
    properties: 'Proton pump inhibitor.',
    usedFor: ['GERD', 'Peptic ulcer', 'Zollinger-Ellison syndrome'],
    safeDose: '40mg once daily.',
    sideEffects: ['Headache', 'Diarrhea', 'Nausea', 'Abdominal pain'],
    overdoseEffects: 'No specific symptoms, generally well-tolerated.',
    mechanismOfAction: 'Irreversibly inhibits the H+/K+ ATPase enzyme system at the secretory surface of the gastric parietal cell.',
    contraindications: ['Hypersensitivity to pantoprazole'],
    interactions: [
      { drugId: 'clopidogrel', severity: 'Moderate', description: 'May slightly reduce clopidogrel effectiveness.' },
      { drugId: 'warfarin', severity: 'Moderate', description: 'May increase INR.' }
    ],
    alternatives: ['omeprazole', 'rabeprazole']
  },
  {
    id: 'amoxicillin_clav',
    name: 'Amoxicillin + Clavulanic Acid (Augmentin)',
    genericName: 'Amoxicillin/Clavulanate',
    brands: ['Augmentin', 'Clavam', 'Moxikind-CV'],
    category: 'Antibiotic',
    properties: 'Beta-lactam antibiotic with a beta-lactamase inhibitor.',
    usedFor: ['Bacterial infections', 'Sinusitis', 'Pneumonia', 'UTI'],
    safeDose: '500mg/125mg or 875mg/125mg twice daily.',
    sideEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Skin rash'],
    overdoseEffects: 'Gastrointestinal symptoms, fluid and electrolyte imbalance.',
    mechanismOfAction: 'Amoxicillin inhibits bacterial cell wall synthesis; Clavulanic acid protects amoxicillin from degradation by beta-lactamase enzymes.',
    contraindications: ['Penicillin allergy', 'History of cholestatic jaundice/hepatic dysfunction associated with Augmentin'],
    interactions: [
      { drugId: 'warfarin', severity: 'Moderate', description: 'May increase risk of bleeding.' },
      { drugId: 'metformin', severity: 'Minor', description: 'May slightly increase metformin levels.' }
    ],
    alternatives: ['azithromycin', 'cefuroxime']
  },
  {
    id: 'azithromycin',
    name: 'Azithromycin (Azithral)',
    genericName: 'Azithromycin',
    brands: ['Azithral', 'Azee', 'Zithrox'],
    category: 'Macrolide Antibiotic',
    properties: 'Broad-spectrum antibiotic.',
    usedFor: ['Respiratory infections', 'Skin infections', 'STDs'],
    safeDose: '500mg once daily for 3-5 days.',
    sideEffects: ['Diarrhea', 'Nausea', 'Abdominal pain'],
    overdoseEffects: 'Hearing loss, severe nausea, vomiting, diarrhea.',
    mechanismOfAction: 'Inhibits bacterial protein synthesis by binding to the 50S ribosomal subunit.',
    contraindications: ['History of cholestatic jaundice/hepatic dysfunction', 'Hypersensitivity to macrolides'],
    interactions: [
      { drugId: 'warfarin', severity: 'Minor', description: 'May slightly increase bleeding risk.' },
      { drugId: 'atorvastatin', severity: 'Moderate', description: 'May increase risk of muscle damage.' }
    ],
    alternatives: ['amoxicillin', 'clarithromycin']
  },
  {
    id: 'rosuvastatin',
    name: 'Rosuvastatin (Crestor)',
    genericName: 'Rosuvastatin',
    brands: ['Crestor', 'Rosuvas', 'Razel'],
    category: 'Statin',
    properties: 'Potent HMG-CoA reductase inhibitor.',
    usedFor: ['Hypercholesterolemia', 'Cardiovascular risk reduction'],
    safeDose: '5mg - 40mg once daily.',
    sideEffects: ['Muscle pain', 'Diabetes mellitus (new onset)', 'Headache', 'Nausea'],
    overdoseEffects: 'Liver damage, rhabdomyolysis.',
    mechanismOfAction: 'Inhibits HMG-CoA reductase to reduce LDL cholesterol.',
    contraindications: ['Active liver disease', 'Pregnancy', 'Severe renal impairment'],
    interactions: [
      { drugId: 'warfarin', severity: 'Moderate', description: 'May increase INR.' },
      { drugId: 'gemfibrozil', severity: 'Major', description: 'Increased risk of muscle damage.' }
    ],
    alternatives: ['atorvastatin', 'simvastatin']
  },
  {
    id: 'metoprolol',
    name: 'Metoprolol (Metolar)',
    genericName: 'Metoprolol',
    brands: ['Metolar', 'Metpure', 'Seloken'],
    category: 'Beta Blocker',
    properties: 'Selective beta-1 blocker.',
    usedFor: ['Hypertension', 'Angina', 'Heart failure', 'Post-MI'],
    safeDose: '25mg - 200mg daily.',
    sideEffects: ['Fatigue', 'Dizziness', 'Slow heart rate', 'Shortness of breath'],
    overdoseEffects: 'Bradycardia, hypotension, bronchospasm, heart failure.',
    mechanismOfAction: 'Reduces heart rate and cardiac output by blocking beta-1 receptors.',
    contraindications: ['Severe bradycardia', 'Heart block', 'Decompensated heart failure'],
    interactions: [
      { drugId: 'amlodipine', severity: 'Moderate', description: 'Increased risk of hypotension and bradycardia.' },
      { drugId: 'insulin', severity: 'Moderate', description: 'May mask symptoms of hypoglycemia.' }
    ],
    alternatives: ['atenolol', 'carvedilol', 'bisoprolol']
  },
  {
    id: 'naproxen',
    name: 'Naproxen (Naprosyn)',
    genericName: 'Naproxen',
    brands: ['Naprosyn', 'Naprox', 'Aleve'],
    category: 'NSAID',
    properties: 'Long-acting nonsteroidal anti-inflammatory drug.',
    usedFor: ['Pain', 'Inflammation', 'Arthritis', 'Menstrual cramps'],
    safeDose: '250mg - 500mg twice daily.',
    sideEffects: ['Stomach pain', 'Heartburn', 'Dizziness', 'Headache'],
    overdoseEffects: 'GI bleeding, kidney damage, seizures.',
    mechanismOfAction: 'Inhibits COX-1 and COX-2 enzymes.',
    contraindications: ['Peptic ulcer', 'Severe renal impairment', 'Heart failure'],
    interactions: [
      { drugId: 'aspirin', severity: 'Major', description: 'Increased risk of GI bleeding.' },
      { drugId: 'warfarin', severity: 'Major', description: 'High risk of bleeding.' }
    ],
    alternatives: ['ibuprofen', 'paracetamol']
  },
  {
    id: 'salbutamol',
    name: 'Salbutamol (Asthalin)',
    genericName: 'Albuterol/Salbutamol',
    brands: ['Asthalin', 'Ventolin'],
    category: 'Beta-2 Agonist',
    properties: 'Short-acting bronchodilator.',
    usedFor: ['Asthma', 'COPD', 'Bronchospasm'],
    safeDose: '1-2 puffs every 4-6 hours as needed.',
    sideEffects: ['Tremor', 'Tachycardia', 'Headache', 'Muscle cramps'],
    overdoseEffects: 'Severe tachycardia, hypokalemia, hypertension.',
    mechanismOfAction: 'Stimulates beta-2 receptors in bronchial smooth muscle, causing relaxation.',
    contraindications: ['Hypersensitivity'],
    interactions: [
      { drugId: 'metoprolol', severity: 'Major', description: 'Beta blockers may antagonize the effect of salbutamol.' }
    ],
    alternatives: ['levalbuterol', 'terbutaline']
  },
  {
    id: 'gabapentin',
    name: 'Gabapentin (Neurontin)',
    genericName: 'Gabapentin',
    category: 'Anticonvulsant/Neuropathic Pain',
    properties: 'GABA analog.',
    usedFor: ['Neuropathic pain', 'Seizures', 'Postherpetic neuralgia'],
    safeDose: '300mg - 3600mg daily in divided doses.',
    sideEffects: ['Dizziness', 'Drowsiness', 'Peripheral edema', 'Fatigue'],
    overdoseEffects: 'Double vision, slurred speech, drowsiness, lethargy, diarrhea.',
    mechanismOfAction: 'Binds to the alpha-2-delta subunit of voltage-gated calcium channels.',
    contraindications: ['Hypersensitivity'],
    interactions: [
      { drugId: 'morphine', severity: 'Moderate', description: 'Increased risk of CNS depression.' }
    ],
    alternatives: ['pregabalin', 'amitriptyline']
  },
  {
    id: 'sertraline',
    name: 'Sertraline (Zoloft)',
    genericName: 'Sertraline',
    category: 'SSRI',
    properties: 'Selective serotonin reuptake inhibitor.',
    usedFor: ['Depression', 'Anxiety', 'OCD', 'PTSD'],
    safeDose: '50mg - 200mg once daily.',
    sideEffects: ['Nausea', 'Insomnia', 'Sexual dysfunction', 'Diarrhea'],
    overdoseEffects: 'Serotonin syndrome, seizures, heart rhythm changes.',
    mechanismOfAction: 'Inhibits the reuptake of serotonin in the brain.',
    contraindications: ['Concomitant use of MAOIs', 'Pimozide use'],
    interactions: [
      { drugId: 'aspirin', severity: 'Moderate', description: 'Increased risk of bleeding.' },
      { drugId: 'tramadol', severity: 'Major', description: 'Risk of serotonin syndrome.' }
    ],
    alternatives: ['fluoxetine', 'escitalopram']
  },
  {
    id: 'alprazolam',
    name: 'Alprazolam (Alprax/Xanax)',
    genericName: 'Alprazolam',
    category: 'Benzodiazepine',
    properties: 'Anxiolytic agent.',
    usedFor: ['Anxiety', 'Panic disorder'],
    safeDose: '0.25mg - 1mg three times daily.',
    sideEffects: ['Drowsiness', 'Dizziness', 'Dry mouth', 'Coordination problems'],
    overdoseEffects: 'Severe respiratory depression, coma, confusion.',
    mechanismOfAction: 'Enhances the effect of GABA at the GABA-A receptor.',
    contraindications: ['Acute narrow-angle glaucoma', 'Severe respiratory insufficiency'],
    interactions: [
      { drugId: 'alcohol', severity: 'Major', description: 'Severe CNS and respiratory depression.' },
      { drugId: 'clarithromycin', severity: 'Moderate', description: 'Increases alprazolam levels.' }
    ],
    alternatives: ['diazepam', 'lorazepam']
  },
  {
    id: 'ciprofloxacin',
    name: 'Ciprofloxacin (Ciplox)',
    genericName: 'Ciprofloxacin',
    category: 'Fluoroquinolone Antibiotic',
    properties: 'Broad-spectrum antibiotic.',
    usedFor: ['UTI', 'Respiratory infections', 'Bone and joint infections'],
    safeDose: '250mg - 750mg twice daily.',
    sideEffects: ['Nausea', 'Diarrhea', 'Tendon rupture (rare)', 'Photosensitivity'],
    overdoseEffects: 'Renal toxicity, seizures.',
    mechanismOfAction: 'Inhibits DNA gyrase and topoisomerase IV, preventing bacterial DNA replication.',
    contraindications: ['History of tendon disorders', 'Hypersensitivity to quinolones'],
    interactions: [
      { drugId: 'warfarin', severity: 'Moderate', description: 'May increase bleeding risk.' },
      { drugId: 'tizanidine', severity: 'Major', description: 'Severe hypotension and sedation.' }
    ],
    alternatives: ['levofloxacin', 'amoxicillin']
  },
  {
    id: 'ondansetron',
    name: 'Ondansetron (Emset/Zofran)',
    genericName: 'Ondansetron',
    category: 'Antiemetic',
    properties: '5-HT3 receptor antagonist.',
    usedFor: ['Nausea', 'Vomiting', 'Chemotherapy-induced nausea'],
    safeDose: '4mg - 8mg as needed.',
    sideEffects: ['Headache', 'Constipation', 'Fatigue', 'Dizziness'],
    overdoseEffects: 'QT prolongation, severe constipation, hypotension.',
    mechanismOfAction: 'Blocks serotonin receptors in the chemoreceptor trigger zone and vagal nerve terminals.',
    contraindications: ['Congenital long QT syndrome', 'Apomorphine use'],
    interactions: [
      { drugId: 'tramadol', severity: 'Moderate', description: 'May reduce the analgesic effect of tramadol.' }
    ],
    alternatives: ['metoclopramide', 'domperidone']
  },
  {
    id: 'diclofenac',
    name: 'Diclofenac (Voveran)',
    genericName: 'Diclofenac',
    category: 'NSAID',
    properties: 'Potent anti-inflammatory and analgesic.',
    usedFor: ['Arthritis', 'Acute pain', 'Migraine'],
    safeDose: '50mg - 75mg twice daily.',
    sideEffects: ['Stomach pain', 'Nausea', 'Headache', 'Dizziness'],
    overdoseEffects: 'GI bleeding, kidney failure, cardiovascular events.',
    mechanismOfAction: 'Inhibits COX-1 and COX-2 enzymes.',
    contraindications: ['Peptic ulcer', 'Severe heart failure', 'Asthma'],
    interactions: [
      { drugId: 'warfarin', severity: 'Major', description: 'High risk of bleeding.' },
      { drugId: 'aspirin', severity: 'Major', description: 'Increased GI risk.' }
    ],
    alternatives: ['ibuprofen', 'naproxen']
  },
  {
    id: 'domperidone',
    name: 'Domperidone (Domstal)',
    genericName: 'Domperidone',
    category: 'Antiemetic/Prokinetic',
    properties: 'Dopamine antagonist.',
    usedFor: ['Nausea', 'Vomiting', 'Dyspepsia'],
    safeDose: '10mg three times daily.',
    sideEffects: ['Dry mouth', 'Headache', 'Dizziness'],
    overdoseEffects: 'Extrapyramidal symptoms, cardiac arrhythmias.',
    mechanismOfAction: 'Blocks dopamine receptors in the gut and chemoreceptor trigger zone.',
    contraindications: ['Prolactinoma', 'GI hemorrhage', 'Cardiac conduction issues'],
    interactions: [
      { drugId: 'ketoconazole', severity: 'Major', description: 'Increases domperidone levels, risk of arrhythmia.' }
    ],
    alternatives: ['metoclopramide', 'ondansetron']
  },
  {
    id: 'metoclopramide',
    name: 'Metoclopramide (Reglan/Perinorm)',
    genericName: 'Metoclopramide',
    category: 'Antiemetic/Prokinetic',
    properties: 'Dopamine and serotonin antagonist.',
    usedFor: ['Nausea', 'Vomiting', 'GERD', 'Gastroparesis'],
    safeDose: '10mg three times daily.',
    sideEffects: ['Drowsiness', 'Restlessness', 'Extrapyramidal symptoms'],
    overdoseEffects: 'Tardive dyskinesia, severe drowsiness, confusion.',
    mechanismOfAction: 'Stimulates upper GI motility and blocks dopamine receptors.',
    contraindications: ['Pheochromocytoma', 'Epilepsy', 'GI obstruction'],
    interactions: [
      { drugId: 'levodopa', severity: 'Major', description: 'Antagonizes the effect of levodopa.' }
    ],
    alternatives: ['domperidone', 'ondansetron']
  },
  {
    id: 'ranitidine',
    name: 'Ranitidine (Rantac/Zinetac)',
    genericName: 'Ranitidine',
    category: 'H2 Blocker',
    properties: 'Histamine H2-receptor antagonist.',
    usedFor: ['Acidity', 'Heartburn', 'Stomach ulcers'],
    safeDose: '150mg twice daily.',
    sideEffects: ['Headache', 'Dizziness', 'Constipation'],
    overdoseEffects: 'Muscular tremors, vomiting, rapid heart rate.',
    mechanismOfAction: 'Blocks H2 receptors in parietal cells, reducing acid secretion.',
    contraindications: ['Hypersensitivity'],
    interactions: [
      { drugId: 'warfarin', severity: 'Minor', description: 'May slightly increase warfarin effect.' }
    ],
    alternatives: ['famotidine', 'pantoprazole']
  },
  {
    id: 'famotidine',
    name: 'Famotidine (Pepcid)',
    genericName: 'Famotidine',
    category: 'H2 Blocker',
    properties: 'Potent H2-receptor antagonist.',
    usedFor: ['GERD', 'Ulcers', 'Heartburn'],
    safeDose: '20mg - 40mg daily.',
    sideEffects: ['Headache', 'Dizziness', 'Constipation'],
    overdoseEffects: 'Generally safe, may cause confusion in elderly.',
    mechanismOfAction: 'Competitive inhibition of H2 receptors.',
    contraindications: ['Hypersensitivity'],
    interactions: [
      { drugId: 'ketoconazole', severity: 'Moderate', description: 'Reduces absorption of ketoconazole.' }
    ],
    alternatives: ['ranitidine', 'omeprazole']
  },
  {
    id: 'doxycycline',
    name: 'Doxycycline (Doxy-1)',
    genericName: 'Doxycycline',
    category: 'Tetracycline Antibiotic',
    properties: 'Broad-spectrum antibiotic.',
    usedFor: ['Acne', 'Respiratory infections', 'Malaria prophylaxis'],
    safeDose: '100mg once or twice daily.',
    sideEffects: ['Photosensitivity', 'Nausea', 'Tooth discoloration (in children)'],
    overdoseEffects: 'Liver toxicity, severe GI distress.',
    mechanismOfAction: 'Inhibits protein synthesis by binding to the 30S ribosomal subunit.',
    contraindications: ['Pregnancy', 'Children under 8 years'],
    interactions: [
      { drugId: 'warfarin', severity: 'Moderate', description: 'May increase bleeding risk.' },
      { drugId: 'isotretinoin', severity: 'Major', description: 'Risk of intracranial hypertension.' }
    ],
    alternatives: ['azithromycin', 'amoxicillin']
  },
  {
    id: 'metronidazole',
    name: 'Metronidazole (Flagyl)',
    genericName: 'Metronidazole',
    category: 'Antiprotozoal/Antibiotic',
    properties: 'Effective against anaerobic bacteria and protozoa.',
    usedFor: ['Amoebiasis', 'Giardiasis', 'Bacterial vaginosis', 'Dental infections'],
    safeDose: '200mg - 500mg three times daily.',
    sideEffects: ['Metallic taste', 'Nausea', 'Dark urine', 'Headache'],
    overdoseEffects: 'Ataxia, seizures, peripheral neuropathy.',
    mechanismOfAction: 'Interacts with DNA to cause loss of helical structure and strand breakage.',
    contraindications: ['First trimester of pregnancy', 'Alcohol consumption'],
    interactions: [
      { drugId: 'alcohol', severity: 'Major', description: 'Disulfiram-like reaction (severe vomiting, flushing).' },
      { drugId: 'warfarin', severity: 'Major', description: 'Significantly increases bleeding risk.' }
    ],
    alternatives: ['tinidazole', 'clindamycin']
  },
  {
    id: 'combiflam',
    name: 'Combiflam (Ibuprofen + Paracetamol)',
    genericName: 'Ibuprofen + Paracetamol',
    brands: ['Combiflam', 'Ibugesic Plus', 'Flexon'],
    category: 'Analgesic/NSAID Combination',
    properties: 'Combination of pain reliever and anti-inflammatory.',
    usedFor: ['Body ache', 'Headache', 'Muscle pain', 'Fever'],
    safeDose: '1 tablet every 6-8 hours. Max 3 tablets/day.',
    sideEffects: ['Stomach upset', 'Heartburn', 'Nausea'],
    overdoseEffects: 'GI bleeding, liver damage, kidney issues.',
    mechanismOfAction: 'Inhibits COX enzymes and prostaglandin synthesis.',
    contraindications: ['Peptic ulcer', 'Severe liver/kidney disease', 'Asthma'],
    interactions: [
      { drugId: 'alcohol', severity: 'Major', description: 'Increased risk of liver damage and GI bleeding.' }
    ],
    alternatives: ['paracetamol', 'ibuprofen']
  },
  {
    id: 'digene',
    name: 'Digene (Antacid & Antigas)',
    genericName: 'Magnesium Hydroxide + Aluminium Hydroxide + Simethicone',
    brands: ['Digene', 'Gelusil', 'MPC'],
    category: 'Antacid',
    properties: 'Neutralizes stomach acid and relieves gas.',
    usedFor: ['Acidity', 'Heartburn', 'Gas', 'Indigestion'],
    safeDose: '2-4 tablets or 10-20ml liquid after meals or as needed.',
    sideEffects: ['Constipation', 'Diarrhea (rare)'],
    overdoseEffects: 'Electrolyte imbalance, magnesium toxicity.',
    mechanismOfAction: 'Chemical neutralization of gastric acid and surfactant action to break gas bubbles.',
    contraindications: ['Severe renal impairment', 'Hypophosphatemia'],
    interactions: [
      { drugId: 'ciprofloxacin', severity: 'Moderate', description: 'Antacids reduce absorption of quinolones.' },
      { drugId: 'doxycycline', severity: 'Moderate', description: 'Reduces tetracycline absorption.' }
    ],
    alternatives: ['pudin_hara', 'pantoprazole']
  },
  {
    id: 'meftal_spas',
    name: 'Meftal Spas (Mefenamic Acid + Dicyclomine)',
    genericName: 'Mefenamic Acid + Dicyclomine',
    brands: ['Meftal Spas', 'Cyclopam', 'Spasmonil'],
    category: 'Antispasmodic/Analgesic',
    properties: 'Relieves smooth muscle spasms and pain.',
    usedFor: ['Menstrual cramps', 'Abdominal pain', 'Colic'],
    safeDose: '1 tablet up to three times daily.',
    sideEffects: ['Dry mouth', 'Dizziness', 'Blurred vision', 'Nausea'],
    overdoseEffects: 'Seizures, GI bleeding, severe anticholinergic symptoms.',
    mechanismOfAction: 'NSAID (Mefenamic acid) + Anticholinergic (Dicyclomine).',
    contraindications: ['Peptic ulcer', 'Glaucoma', 'Myasthenia gravis'],
    interactions: [
      { drugId: 'warfarin', severity: 'Major', description: 'Increased bleeding risk.' }
    ],
    alternatives: ['buscopan', 'dicyclomine']
  },
  {
    id: 'avil',
    name: 'Avil (Pheniramine Maleate)',
    genericName: 'Pheniramine Maleate',
    brands: ['Avil'],
    category: 'Antihistamine',
    properties: 'First-generation antihistamine with sedative properties.',
    usedFor: ['Allergic reactions', 'Hay fever', 'Motion sickness'],
    safeDose: '25mg - 50mg up to three times daily.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Blurred vision', 'Urinary retention'],
    overdoseEffects: 'Severe sedation, hallucinations, seizures, coma.',
    mechanismOfAction: 'H1 receptor antagonist.',
    contraindications: ['BPH', 'Glaucoma', 'Severe liver disease'],
    interactions: [
      { drugId: 'alcohol', severity: 'Major', description: 'Severe CNS depression.' }
    ],
    alternatives: ['cetirizine', 'levocetirizine']
  },
  {
    id: 'sumo',
    name: 'Sumo (Nimesulide + Paracetamol)',
    genericName: 'Nimesulide + Paracetamol',
    brands: ['Sumo', 'Nimucet', 'Nicip P'],
    category: 'Analgesic/Antipyretic',
    properties: 'Potent pain reliever and fever reducer.',
    usedFor: ['Acute pain', 'Osteoarthritis pain', 'Fever'],
    safeDose: '1 tablet twice daily. Short-term use only.',
    sideEffects: ['Nausea', 'Stomach pain', 'Dizziness', 'Liver enzyme elevation'],
    overdoseEffects: 'Severe liver damage, GI bleeding.',
    mechanismOfAction: 'Selective COX-2 inhibitor (Nimesulide) + CNS prostaglandin inhibitor (Paracetamol).',
    contraindications: ['Liver disease', 'Peptic ulcer', 'Children under 12'],
    interactions: [
      { drugId: 'alcohol', severity: 'Major', description: 'High risk of hepatotoxicity.' }
    ],
    alternatives: ['combiflam', 'paracetamol']
  },
  {
    id: 'ascoril',
    name: 'Ascoril (Terbutaline + Bromhexine + Guaifenesin + Menthol)',
    genericName: 'Terbutaline + Bromhexine + Guaifenesin + Menthol',
    brands: ['Ascoril', 'Bro-Zedex', 'Solvin Expect'],
    category: 'Expectorant/Bronchodilator',
    properties: 'Relieves cough with mucus and opens airways.',
    usedFor: ['Productive cough', 'Bronchitis', 'Asthma'],
    safeDose: '5ml - 10ml three times daily.',
    sideEffects: ['Tremors', 'Palpitations', 'Nausea', 'Dizziness'],
    overdoseEffects: 'Severe tachycardia, hypokalemia, agitation.',
    mechanismOfAction: 'Beta-2 agonist (Terbutaline) + Mucolytic (Bromhexine) + Expectorant (Guaifenesin).',
    contraindications: ['Severe heart disease', 'Hyperthyroidism'],
    interactions: [
      { drugId: 'metoprolol', severity: 'Major', description: 'Beta blockers antagonize terbutaline.' }
    ],
    alternatives: ['salbutamol', 'ambroxol']
  },
  {
    id: 'benadryl',
    name: 'Benadryl (Diphenhydramine)',
    genericName: 'Diphenhydramine',
    brands: ['Benadryl'],
    category: 'Antihistamine/Antitussive',
    properties: 'First-generation antihistamine used for allergies and cough.',
    usedFor: ['Cough', 'Allergies', 'Insomnia (short-term)'],
    safeDose: '25mg - 50mg every 6-8 hours.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Blurred vision', 'Confusion'],
    overdoseEffects: 'Anticholinergic toxicity, seizures, coma.',
    mechanismOfAction: 'H1 receptor antagonist with central effects.',
    contraindications: ['Glaucoma', 'BPH', 'Asthma (acute)'],
    interactions: [
      { drugId: 'alcohol', severity: 'Major', description: 'Severe CNS depression.' },
      { drugId: 'alprazolam', severity: 'Major', description: 'Increased risk of respiratory depression.' }
    ],
    alternatives: ['cetirizine', 'levocetirizine']
  },
  {
    id: 'budesonide',
    name: 'Budesonide (Pulmicort)',
    genericName: 'Budesonide',
    category: 'Corticosteroid',
    properties: 'Anti-inflammatory steroid.',
    usedFor: ['Asthma', 'COPD', 'Crohn\'s disease'],
    safeDose: '200mcg - 800mcg daily (inhaled).',
    sideEffects: ['Oral candidiasis (thrush)', 'Hoarseness', 'Cough'],
    overdoseEffects: 'Cushingoid features (long-term), adrenal suppression.',
    mechanismOfAction: 'Reduces inflammation by suppressing immune response.',
    contraindications: ['Status asthmaticus', 'Active fungal infections'],
    interactions: [
      { drugId: 'ketoconazole', severity: 'Moderate', description: 'Increases budesonide levels.' }
    ],
    alternatives: ['fluticasone', 'beclomethasone']
  },
  {
    id: 'fluticasone',
    name: 'Fluticasone (Flonase/Flovent)',
    genericName: 'Fluticasone',
    category: 'Corticosteroid',
    properties: 'Potent anti-inflammatory.',
    usedFor: ['Allergic rhinitis', 'Asthma'],
    safeDose: '50mcg - 250mcg daily.',
    sideEffects: ['Nosebleeds', 'Headache', 'Sore throat'],
    overdoseEffects: 'Adrenal suppression with chronic high doses.',
    mechanismOfAction: 'Binds to glucocorticoid receptors to inhibit inflammatory cytokines.',
    contraindications: ['Hypersensitivity'],
    interactions: [
      { drugId: 'ritonavir', severity: 'Major', description: 'Significantly increases fluticasone levels.' }
    ],
    alternatives: ['mometasone', 'budesonide']
  },
  {
    id: 'prednisone',
    name: 'Prednisone (Wysolone)',
    genericName: 'Prednisone',
    category: 'Corticosteroid',
    properties: 'Systemic anti-inflammatory and immunosuppressant.',
    usedFor: ['Allergies', 'Autoimmune diseases', 'Inflammation'],
    safeDose: '5mg - 60mg daily (tapering required).',
    sideEffects: ['Weight gain', 'Increased appetite', 'Insomnia', 'High blood sugar'],
    overdoseEffects: 'Cushing\'s syndrome, osteoporosis, severe infection risk.',
    mechanismOfAction: 'Glucocorticoid receptor agonist.',
    contraindications: ['Systemic fungal infections', 'Live vaccines'],
    interactions: [
      { drugId: 'ibuprofen', severity: 'Moderate', description: 'Increased risk of GI ulcers.' },
      { drugId: 'insulin', severity: 'Moderate', description: 'Reduces effect of insulin.' }
    ],
    alternatives: ['methylprednisolone', 'dexamethasone']
  },
  {
    id: 'dexamethasone',
    name: 'Dexamethasone (Decadron)',
    genericName: 'Dexamethasone',
    brands: ['Decadron', 'Dexona'],
    category: 'Corticosteroid',
    properties: 'Long-acting, potent corticosteroid.',
    usedFor: ['Severe inflammation', 'Cerebral edema', 'COVID-19 (severe)'],
    safeDose: '0.75mg - 9mg daily.',
    sideEffects: ['Fluid retention', 'Mood swings', 'Muscle weakness'],
    overdoseEffects: 'Hypertension, electrolyte imbalance, hyperglycemia.',
    mechanismOfAction: 'Suppresses multiple inflammatory genes.',
    contraindications: ['Systemic fungal infections'],
    interactions: [
      { drugId: 'warfarin', severity: 'Moderate', description: 'May alter anticoagulant effect.' }
    ],
    alternatives: ['prednisone', 'betamethasone']
  },
  {
    id: 'tramadol',
    name: 'Tramadol (Ultram)',
    genericName: 'Tramadol',
    brands: ['Ultram', 'Tramazac'],
    category: 'Opioid Analgesic',
    properties: 'Centrally acting analgesic.',
    usedFor: ['Moderate to severe pain'],
    safeDose: '50mg - 100mg every 4-6 hours. Max 4000mg/day.',
    sideEffects: ['Dizziness', 'Nausea', 'Constipation', 'Drowsiness'],
    overdoseEffects: 'Respiratory depression, seizures, coma.',
    mechanismOfAction: 'Mu-opioid receptor agonist and weak serotonin/norepinephrine reuptake inhibitor.',
    contraindications: ['Severe respiratory depression', 'Acute asthma', 'MAOI use'],
    interactions: [
      { drugId: 'sertraline', severity: 'Major', description: 'Risk of serotonin syndrome.' },
      { drugId: 'alcohol', severity: 'Major', description: 'Severe CNS depression.' }
    ],
    alternatives: ['morphine', 'tapentadol']
  },
  {
    id: 'morphine',
    name: 'Morphine',
    genericName: 'Morphine',
    category: 'Opioid Analgesic',
    properties: 'Potent opioid analgesic.',
    usedFor: ['Severe pain', 'Cancer pain', 'Post-operative pain'],
    safeDose: '10mg - 30mg every 4 hours (highly variable).',
    sideEffects: ['Constipation', 'Nausea', 'Sedation', 'Itching'],
    overdoseEffects: 'Pinpoint pupils, severe respiratory depression, death.',
    mechanismOfAction: 'Pure opioid agonist, primarily at the mu-receptor.',
    contraindications: ['Respiratory insufficiency', 'Biliary tract disease'],
    interactions: [
      { drugId: 'gabapentin', severity: 'Moderate', description: 'Increased CNS depression.' },
      { drugId: 'alcohol', severity: 'Major', description: 'Fatal respiratory depression.' }
    ],
    alternatives: ['fentanyl', 'oxycodone']
  },
  {
    id: 'atenolol',
    name: 'Atenolol (Tenormin)',
    genericName: 'Atenolol',
    brands: ['Tenormin', 'Aten'],
    category: 'Beta Blocker',
    properties: 'Cardioselective beta-1 blocker.',
    usedFor: ['Hypertension', 'Angina', 'Post-MI'],
    safeDose: '25mg - 100mg once daily.',
    sideEffects: ['Fatigue', 'Cold extremities', 'Dizziness'],
    overdoseEffects: 'Bradycardia, hypotension, heart failure.',
    mechanismOfAction: 'Reduces heart rate and force of contraction.',
    contraindications: ['Sinus bradycardia', 'Heart block', 'Cardiogenic shock'],
    interactions: [
      { drugId: 'verapamil', severity: 'Major', description: 'Severe bradycardia and heart block.' }
    ],
    alternatives: ['metoprolol', 'bisoprolol']
  },
  {
    id: 'bisoprolol',
    name: 'Bisoprolol (Concor)',
    genericName: 'Bisoprolol',
    brands: ['Concor', 'Zebeta'],
    category: 'Beta Blocker',
    properties: 'Highly selective beta-1 blocker.',
    usedFor: ['Hypertension', 'Heart failure'],
    safeDose: '2.5mg - 10mg once daily.',
    sideEffects: ['Fatigue', 'Dizziness', 'Headache'],
    overdoseEffects: 'Bradycardia, hypotension, bronchospasm.',
    mechanismOfAction: 'Decreases cardiac workload.',
    contraindications: ['Acute heart failure', 'Severe asthma'],
    interactions: [
      { drugId: 'digoxin', severity: 'Moderate', description: 'Increased risk of bradycardia.' }
    ],
    alternatives: ['metoprolol', 'atenolol']
  },
  {
    id: 'carvedilol',
    name: 'Carvedilol (Cardivas)',
    genericName: 'Carvedilol',
    brands: ['Cardivas', 'Coreg'],
    category: 'Alpha/Beta Blocker',
    properties: 'Non-selective beta blocker with alpha-1 blocking activity.',
    usedFor: ['Heart failure', 'Hypertension', 'Post-MI'],
    safeDose: '3.125mg - 25mg twice daily.',
    sideEffects: ['Dizziness', 'Weight gain', 'Fatigue', 'Hypotension'],
    overdoseEffects: 'Severe hypotension, bradycardia, seizures.',
    mechanismOfAction: 'Blocks beta-1, beta-2, and alpha-1 receptors.',
    contraindications: ['Severe asthma', 'Severe liver impairment'],
    interactions: [
      { drugId: 'insulin', severity: 'Moderate', description: 'May mask hypoglycemia.' }
    ],
    alternatives: ['metoprolol', 'bisoprolol']
  },
  {
    id: 'valsartan',
    name: 'Valsartan (Diovan)',
    genericName: 'Valsartan',
    category: 'ARB',
    properties: 'Angiotensin II receptor blocker.',
    usedFor: ['Hypertension', 'Heart failure'],
    safeDose: '80mg - 320mg once daily.',
    sideEffects: ['Dizziness', 'High potassium', 'Fatigue'],
    overdoseEffects: 'Hypotension, tachycardia.',
    mechanismOfAction: 'Blocks AT1 receptors.',
    contraindications: ['Pregnancy', 'Severe liver disease'],
    interactions: [
      { drugId: 'spironolactone', severity: 'Major', description: 'Risk of hyperkalemia.' }
    ],
    alternatives: ['losartan', 'telmisartan']
  },
  {
    id: 'enalapril',
    name: 'Enalapril (Envas)',
    genericName: 'Enalapril',
    category: 'ACE Inhibitor',
    properties: 'Angiotensin-converting enzyme inhibitor.',
    usedFor: ['Hypertension', 'Heart failure'],
    safeDose: '5mg - 40mg daily.',
    sideEffects: ['Dry cough', 'Dizziness', 'Headache'],
    overdoseEffects: 'Severe hypotension, renal failure.',
    mechanismOfAction: 'Inhibits ACE, reducing angiotensin II.',
    contraindications: ['History of angioedema', 'Pregnancy'],
    interactions: [
      { drugId: 'ibuprofen', severity: 'Moderate', description: 'Reduces antihypertensive effect.' }
    ],
    alternatives: ['lisinopril', 'ramipril']
  },
  {
    id: 'digoxin',
    name: 'Digoxin (Lanoxin)',
    genericName: 'Digoxin',
    brands: ['Lanoxin'],
    category: 'Cardiac Glycoside',
    properties: 'Increases heart contraction force.',
    usedFor: ['Heart failure', 'Atrial fibrillation'],
    safeDose: '0.125mg - 0.25mg daily.',
    sideEffects: ['Nausea', 'Blurred vision (yellow halos)', 'Confusion'],
    overdoseEffects: 'Life-threatening arrhythmias, severe vomiting.',
    mechanismOfAction: 'Inhibits Na+/K+ ATPase pump.',
    contraindications: ['Ventricular fibrillation', 'Wolff-Parkinson-White syndrome'],
    interactions: [
      { drugId: 'furosemide', severity: 'Major', description: 'Hypokalemia increases digoxin toxicity.' },
      { drugId: 'amiodarone', severity: 'Major', description: 'Increases digoxin levels.' }
    ],
    alternatives: ['bisoprolol', 'carvedilol']
  },
  {
    id: 'nitroglycerin',
    name: 'Nitroglycerin (Angispan)',
    genericName: 'Nitroglycerin',
    brands: ['Angispan', 'Nitrostat'],
    category: 'Nitrate',
    properties: 'Potent vasodilator.',
    usedFor: ['Angina', 'Heart failure'],
    safeDose: '0.4mg sublingual as needed.',
    sideEffects: ['Headache', 'Flushing', 'Dizziness', 'Hypotension'],
    overdoseEffects: 'Severe hypotension, syncope, methemoglobinemia.',
    mechanismOfAction: 'Relaxes vascular smooth muscle by releasing nitric oxide.',
    contraindications: ['Severe anemia', 'Increased intracranial pressure', 'Sildenafil use'],
    interactions: [
      { drugId: 'sildenafil', severity: 'Major', description: 'Fatal drop in blood pressure.' }
    ],
    alternatives: ['isosorbide mononitrate']
  },
  {
    id: 'glipizide',
    name: 'Glipizide (Glynase)',
    genericName: 'Glipizide',
    category: 'Sulfonylurea',
    properties: 'Insulin secretagogue.',
    usedFor: ['Type 2 Diabetes'],
    safeDose: '5mg - 20mg daily.',
    sideEffects: ['Hypoglycemia', 'Weight gain', 'Nausea'],
    overdoseEffects: 'Severe, prolonged hypoglycemia.',
    mechanismOfAction: 'Stimulates insulin release from pancreatic beta cells.',
    contraindications: ['Type 1 Diabetes', 'Diabetic ketoacidosis'],
    interactions: [
      { drugId: 'alcohol', severity: 'Moderate', description: 'Risk of hypoglycemia and disulfiram-like reaction.' }
    ],
    alternatives: ['metformin', 'glimepiride']
  },
  {
    id: 'sitagliptin',
    name: 'Sitagliptin (Januvia)',
    genericName: 'Sitagliptin',
    category: 'DPP-4 Inhibitor',
    properties: 'Incretin enhancer.',
    usedFor: ['Type 2 Diabetes'],
    safeDose: '100mg once daily.',
    sideEffects: ['Upper respiratory infection', 'Headache', 'Sore throat'],
    overdoseEffects: 'Generally safe, may cause mild hypoglycemia.',
    mechanismOfAction: 'Inhibits DPP-4 enzyme, increasing GLP-1 levels.',
    contraindications: ['Hypersensitivity'],
    interactions: [
      { drugId: 'digoxin', severity: 'Minor', description: 'May slightly increase digoxin levels.' }
    ],
    alternatives: ['vildagliptin', 'linagliptin']
  },
  {
    id: 'pioglitazone',
    name: 'Pioglitazone (Pioz)',
    genericName: 'Pioglitazone',
    category: 'Thiazolidinedione',
    properties: 'Insulin sensitizer.',
    usedFor: ['Type 2 Diabetes'],
    safeDose: '15mg - 45mg once daily.',
    sideEffects: ['Edema', 'Weight gain', 'Bone fractures', 'Heart failure risk'],
    overdoseEffects: 'Hypoglycemia (rare alone), fluid overload.',
    mechanismOfAction: 'Agonist at PPAR-gamma receptors.',
    contraindications: ['Heart failure', 'Bladder cancer'],
    interactions: [
      { drugId: 'insulin', severity: 'Moderate', description: 'Increased risk of edema and heart failure.' }
    ],
    alternatives: ['metformin', 'glipizide']
  },
  {
    id: 'empagliflozin',
    name: 'Empagliflozin (Jardiance)',
    genericName: 'Empagliflozin',
    brands: ['Jardiance', 'Gibtulio'],
    category: 'SGLT2 Inhibitor',
    properties: 'Promotes glucose excretion in urine.',
    usedFor: ['Type 2 Diabetes', 'Heart failure'],
    safeDose: '10mg - 25mg once daily.',
    sideEffects: ['UTIs', 'Yeast infections', 'Dehydration', 'Ketoacidosis'],
    overdoseEffects: 'Dehydration, electrolyte imbalance.',
    mechanismOfAction: 'Inhibits SGLT2 in the kidney.',
    contraindications: ['Severe renal impairment (eGFR < 30)'],
    interactions: [
      { drugId: 'furosemide', severity: 'Moderate', description: 'Increased risk of dehydration.' }
    ],
    alternatives: ['dapagliflozin', 'canagliflozin']
  },
  {
    id: 'fluoxetine',
    name: 'Fluoxetine (Prozac)',
    genericName: 'Fluoxetine',
    category: 'SSRI',
    properties: 'Long-acting antidepressant.',
    usedFor: ['Depression', 'OCD', 'Bulimia', 'Panic disorder'],
    safeDose: '20mg - 60mg once daily.',
    sideEffects: ['Insomnia', 'Nausea', 'Anxiety', 'Sexual dysfunction'],
    overdoseEffects: 'Seizures, serotonin syndrome, heart rhythm changes.',
    mechanismOfAction: 'Blocks serotonin reuptake.',
    contraindications: ['MAOI use', 'Thioridazine use'],
    interactions: [
      { drugId: 'tramadol', severity: 'Major', description: 'Risk of serotonin syndrome.' },
      { drugId: 'warfarin', severity: 'Moderate', description: 'Increased bleeding risk.' }
    ],
    alternatives: ['sertraline', 'escitalopram']
  },
  {
    id: 'escitalopram',
    name: 'Escitalopram (Nexito/Lexapro)',
    genericName: 'Escitalopram',
    category: 'SSRI',
    properties: 'Highly selective serotonin reuptake inhibitor.',
    usedFor: ['Depression', 'Generalized Anxiety Disorder'],
    safeDose: '10mg - 20mg once daily.',
    sideEffects: ['Nausea', 'Sleepiness', 'Sweating', 'Sexual dysfunction'],
    overdoseEffects: 'QT prolongation, serotonin syndrome.',
    mechanismOfAction: 'Inhibits serotonin transporter.',
    contraindications: ['MAOI use', 'Pimozide use'],
    interactions: [
      { drugId: 'aspirin', severity: 'Moderate', description: 'Increased bleeding risk.' }
    ],
    alternatives: ['sertraline', 'fluoxetine']
  },
  {
    id: 'amitriptyline',
    name: 'Amitriptyline (Tryptomer)',
    genericName: 'Amitriptyline',
    brands: ['Tryptomer', 'Elavil'],
    category: 'Tricyclic Antidepressant',
    properties: 'Antidepressant and neuropathic pain reliever.',
    usedFor: ['Depression', 'Neuropathic pain', 'Migraine prophylaxis'],
    safeDose: '10mg - 150mg daily (usually at bedtime).',
    sideEffects: ['Dry mouth', 'Blurred vision', 'Constipation', 'Weight gain'],
    overdoseEffects: 'Fatal arrhythmias, seizures, severe hypotension.',
    mechanismOfAction: 'Inhibits reuptake of serotonin and norepinephrine.',
    contraindications: ['Recent MI', 'Heart block', 'Glaucoma'],
    interactions: [
      { drugId: 'alcohol', severity: 'Major', description: 'Severe CNS depression.' },
      { drugId: 'tramadol', severity: 'Major', description: 'Increased seizure risk and serotonin syndrome.' }
    ],
    alternatives: ['nortriptyline', 'gabapentin']
  },
  {
    id: 'diazepam',
    name: 'Diazepam (Calmpose/Valium)',
    genericName: 'Diazepam',
    brands: ['Calmpose', 'Valium'],
    category: 'Benzodiazepine',
    properties: 'Long-acting anxiolytic and muscle relaxant.',
    usedFor: ['Anxiety', 'Muscle spasms', 'Seizures', 'Alcohol withdrawal'],
    safeDose: '2mg - 10mg two to four times daily.',
    sideEffects: ['Drowsiness', 'Fatigue', 'Muscle weakness', 'Ataxia'],
    overdoseEffects: 'Respiratory depression, coma, profound sedation.',
    mechanismOfAction: 'Enhances GABA activity.',
    contraindications: ['Myasthenia gravis', 'Severe respiratory failure'],
    interactions: [
      { drugId: 'alcohol', severity: 'Major', description: 'Potentially fatal CNS depression.' }
    ],
    alternatives: ['lorazepam', 'alprazolam']
  },
  {
    id: 'lorazepam',
    name: 'Lorazepam (Ativan)',
    genericName: 'Lorazepam',
    brands: ['Ativan', 'Larpose'],
    category: 'Benzodiazepine',
    properties: 'Intermediate-acting anxiolytic.',
    usedFor: ['Anxiety', 'Insomnia', 'Status epilepticus'],
    safeDose: '1mg - 4mg daily.',
    sideEffects: ['Sedation', 'Dizziness', 'Weakness', 'Unsteadiness'],
    overdoseEffects: 'Hypotension, respiratory depression, coma.',
    mechanismOfAction: 'Binds to benzodiazepine receptors.',
    contraindications: ['Narrow-angle glaucoma', 'Severe respiratory insufficiency'],
    interactions: [
      { drugId: 'alcohol', severity: 'Major', description: 'Severe CNS depression.' }
    ],
    alternatives: ['diazepam', 'alprazolam']
  },
  {
    id: 'allopurinol',
    name: 'Allopurinol (Zyloric)',
    genericName: 'Allopurinol',
    category: 'Xanthine Oxidase Inhibitor',
    properties: 'Uric acid lowering agent.',
    usedFor: ['Gout', 'Kidney stones', 'Hyperuricemia'],
    safeDose: '100mg - 300mg once daily.',
    sideEffects: ['Skin rash', 'Nausea', 'Diarrhea'],
    overdoseEffects: 'Severe skin reactions (SJS/TEN), liver toxicity.',
    mechanismOfAction: 'Inhibits xanthine oxidase, reducing uric acid production.',
    contraindications: ['Hypersensitivity'],
    interactions: [
      { drugId: 'azathioprine', severity: 'Major', description: 'Increases azathioprine levels to toxic levels.' }
    ],
    alternatives: ['febuxostat']
  },
  {
    id: 'tamsulosin',
    name: 'Tamsulosin (Urimax)',
    genericName: 'Tamsulosin',
    category: 'Alpha-1 Blocker',
    properties: 'Uroselective alpha blocker.',
    usedFor: ['BPH (Enlarged Prostate)'],
    safeDose: '0.4mg once daily.',
    sideEffects: ['Dizziness', 'Retrograde ejaculation', 'Orthostatic hypotension'],
    overdoseEffects: 'Severe hypotension, headache.',
    mechanismOfAction: 'Relaxes smooth muscle in the prostate and bladder neck.',
    contraindications: ['Hypersensitivity'],
    interactions: [
      { drugId: 'sildenafil', severity: 'Moderate', description: 'Increased risk of hypotension.' }
    ],
    alternatives: ['silodosin', 'alfuzosin']
  },
  {
    id: 'sildenafil',
    name: 'Sildenafil (Viagra/Manforce)',
    genericName: 'Sildenafil',
    brands: ['Viagra', 'Manforce', 'Revatio'],
    category: 'PDE5 Inhibitor',
    properties: 'Erectile dysfunction agent.',
    usedFor: ['Erectile dysfunction', 'Pulmonary hypertension'],
    safeDose: '25mg - 100mg as needed.',
    sideEffects: ['Headache', 'Flushing', 'Dyspepsia', 'Vision changes'],
    overdoseEffects: 'Priapism (painful prolonged erection), severe hypotension.',
    mechanismOfAction: 'Inhibits PDE5, increasing cGMP and causing vasodilation.',
    contraindications: ['Nitrate use', 'Severe heart disease'],
    interactions: [
      { drugId: 'nitroglycerin', severity: 'Major', description: 'Fatal drop in blood pressure.' },
      { drugId: 'tamsulosin', severity: 'Moderate', description: 'Risk of hypotension.' }
    ],
    alternatives: ['tadalafil', 'vardenafil']
  },
  {
    id: 'tadalafil',
    name: 'Tadalafil (Cialis)',
    genericName: 'Tadalafil',
    brands: ['Cialis', 'Megalis'],
    category: 'PDE5 Inhibitor',
    properties: 'Long-acting erectile dysfunction agent.',
    usedFor: ['Erectile dysfunction', 'BPH', 'Pulmonary hypertension'],
    safeDose: '5mg - 20mg as needed or 2.5mg - 5mg daily.',
    sideEffects: ['Back pain', 'Muscle aches', 'Headache', 'Dyspepsia'],
    overdoseEffects: 'Prolonged erection, severe hypotension.',
    mechanismOfAction: 'Inhibits PDE5, with a longer half-life than sildenafil.',
    contraindications: ['Nitrate use', 'Severe heart disease'],
    interactions: [
      { drugId: 'nitroglycerin', severity: 'Major', description: 'Fatal drop in blood pressure.' }
    ],
    alternatives: ['sildenafil', 'vardenafil']
  },
  {
    id: 'amiodarone',
    name: 'Amiodarone (Cordarone)',
    genericName: 'Amiodarone',
    category: 'Antiarrhythmic (Class III)',
    properties: 'Broad-spectrum antiarrhythmic.',
    usedFor: ['Ventricular arrhythmias', 'Atrial fibrillation'],
    safeDose: '100mg - 400mg daily (after loading dose).',
    sideEffects: ['Pulmonary toxicity', 'Thyroid dysfunction', 'Liver toxicity', 'Blue-gray skin discoloration'],
    overdoseEffects: 'Bradycardia, heart block, hypotension.',
    mechanismOfAction: 'Blocks potassium channels, prolonging action potential duration.',
    contraindications: ['Severe sinus node dysfunction', '2nd/3rd degree heart block', 'Iodine allergy'],
    interactions: [
      { drugId: 'warfarin', severity: 'Major', description: 'Significantly increases warfarin levels and bleeding risk.' },
      { drugId: 'digoxin', severity: 'Major', description: 'Significantly increases digoxin levels.' },
      { drugId: 'simvastatin', severity: 'Major', description: 'Increases risk of rhabdomyolysis.' }
    ],
    alternatives: ['sotalol', 'dronedarone']
  },
  {
    id: 'verapamil',
    name: 'Verapamil (Calaptin)',
    genericName: 'Verapamil',
    category: 'Calcium Channel Blocker (Non-DHP)',
    properties: 'Antiarrhythmic and antihypertensive.',
    usedFor: ['Angina', 'Hypertension', 'Supraventricular tachycardia', 'Migraine prophylaxis'],
    safeDose: '120mg - 480mg daily in divided doses.',
    sideEffects: ['Constipation', 'Dizziness', 'Gingival hyperplasia', 'Bradycardia'],
    overdoseEffects: 'Severe hypotension, heart block, cardiogenic shock.',
    mechanismOfAction: 'Inhibits calcium influx in cardiac and smooth muscle.',
    contraindications: ['Severe heart failure', 'Sick sinus syndrome', '2nd/3rd degree heart block'],
    interactions: [
      { drugId: 'atenolol', severity: 'Major', description: 'Severe bradycardia and heart block.' },
      { drugId: 'digoxin', severity: 'Major', description: 'Increases digoxin levels.' },
      { drugId: 'simvastatin', severity: 'Major', description: 'Increases simvastatin levels.' }
    ],
    alternatives: ['diltiazem', 'amlodipine']
  },
  {
    id: 'prednisolone',
    name: 'Prednisolone (Wysolone)',
    genericName: 'Prednisolone',
    brands: ['Wysolone', 'Omnipred'],
    category: 'Corticosteroid',
    properties: 'Systemic glucocorticoid.',
    usedFor: ['Inflammation', 'Allergies', 'Autoimmune disorders'],
    safeDose: '5mg - 60mg daily.',
    sideEffects: ['Weight gain', 'Hyperglycemia', 'Mood changes', 'Osteoporosis'],
    overdoseEffects: 'Cushingoid features, hypertension, muscle weakness.',
    mechanismOfAction: 'Suppresses inflammation and immune response.',
    contraindications: ['Systemic fungal infections', 'Active untreated infections'],
    interactions: [
      { drugId: 'aspirin', severity: 'Moderate', description: 'Increased risk of GI ulcers.' },
      { drugId: 'metformin', severity: 'Moderate', description: 'May decrease metformin effectiveness.' }
    ],
    alternatives: ['prednisone', 'dexamethasone']
  },
  {
    id: 'zerodol_p',
    name: 'Zerodol P (Aceclofenac + Paracetamol)',
    genericName: 'Aceclofenac + Paracetamol',
    brands: ['Zerodol P', 'Hifenac P', 'Ibugesic ASP'],
    category: 'Analgesic/NSAID Combination',
    properties: 'Potent pain reliever for inflammatory conditions.',
    usedFor: ['Back pain', 'Arthritis', 'Post-operative pain', 'Fever'],
    safeDose: '1 tablet twice daily.',
    sideEffects: ['Stomach pain', 'Nausea', 'Diarrhea', 'Dizziness'],
    overdoseEffects: 'Liver toxicity, GI bleeding, kidney failure.',
    mechanismOfAction: 'Inhibits COX enzymes and prostaglandin synthesis.',
    contraindications: ['Peptic ulcer', 'Severe heart failure', 'Pregnancy'],
    interactions: [
      { drugId: 'warfarin', severity: 'Major', description: 'Increased bleeding risk.' },
      { drugId: 'lisinopril', severity: 'Moderate', description: 'Reduced BP effect and renal risk.' }
    ],
    alternatives: ['combiflam', 'diclofenac']
  },
  {
    id: 'becosules',
    name: 'Becosules (B-Complex + Vitamin C)',
    genericName: 'Vitamin B-Complex + Vitamin C',
    brands: ['Becosules', 'Cobadex Forte', 'Polybion'],
    category: 'Vitamin Supplement',
    properties: 'Water-soluble vitamins for nutritional support.',
    usedFor: ['Mouth ulcers', 'Vitamin deficiency', 'Convalescence'],
    safeDose: '1 capsule daily.',
    sideEffects: ['Bright yellow urine (harmless)', 'Mild nausea'],
    overdoseEffects: 'Generally safe, excessive Vitamin C can cause kidney stones.',
    mechanismOfAction: 'Co-factors in various metabolic processes.',
    contraindications: ['Hypersensitivity'],
    interactions: [],
    alternatives: ['zincovit', 'revital']
  },
  {
    id: 'zincovit',
    name: 'Zincovit (Multivitamin + Minerals)',
    genericName: 'Multivitamin + Multimineral + Zinc',
    brands: ['Zincovit', 'Supradyn', 'A to Z'],
    category: 'Nutritional Supplement',
    properties: 'Comprehensive supplement for immunity and health.',
    usedFor: ['Immunity boost', 'General weakness', 'Recovery from illness'],
    safeDose: '1 tablet daily.',
    sideEffects: ['Nausea', 'Metallic taste', 'Stomach upset'],
    overdoseEffects: 'Vitamin toxicity (especially A and D), mineral overload.',
    mechanismOfAction: 'Provides essential micronutrients for cellular function.',
    contraindications: ['Hypervitaminosis'],
    interactions: [],
    alternatives: ['revital', 'becosules']
  },
  {
    id: 'sinarest',
    name: 'Sinarest (Paracetamol + Phenylephrine + Chlorpheniramine)',
    genericName: 'Paracetamol + Phenylephrine + Chlorpheniramine',
    brands: ['Sinarest', 'Solvin Cold', 'Cheston Cold'],
    category: 'Cold and Flu Combination',
    properties: 'Relieves symptoms of common cold and fever.',
    usedFor: ['Common cold', 'Fever', 'Nasal congestion', 'Sneezing'],
    safeDose: '1 tablet every 6-8 hours. Max 4 tablets/day.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Dizziness', 'Palpitations'],
    overdoseEffects: 'Liver damage, severe hypertension, arrhythmias.',
    mechanismOfAction: 'Analgesic + Decongestant + Antihistamine.',
    contraindications: ['Severe hypertension', 'Liver disease', 'Glaucoma'],
    interactions: [
      { drugId: 'alcohol', severity: 'Major', description: 'Increased liver risk and sedation.' }
    ],
    alternatives: ['paracetamol', 'cetirizine']
  },
  {
    id: 'saridon',
    name: 'Saridon (Paracetamol + Propyphenazone + Caffeine)',
    genericName: 'Paracetamol + Propyphenazone + Caffeine',
    brands: ['Saridon'],
    category: 'Analgesic',
    properties: 'Triple action formula for headache relief.',
    usedFor: ['Headache', 'Toothache', 'Menstrual pain'],
    safeDose: '1 tablet every 4-6 hours. Max 3 tablets/day.',
    sideEffects: ['Palpitations', 'Insomnia', 'Stomach upset'],
    overdoseEffects: 'Liver toxicity, severe restlessness, arrhythmias.',
    mechanismOfAction: 'Synergistic analgesic effect with caffeine as an adjuvant.',
    contraindications: ['Severe liver/kidney disease', 'Peptic ulcer'],
    interactions: [
      { drugId: 'alcohol', severity: 'Major', description: 'Increased risk of liver damage.' }
    ],
    alternatives: ['paracetamol', 'combiflam']
  },
  {
    id: 'buscopan',
    name: 'Buscopan (Hyoscine Butylbromide)',
    genericName: 'Hyoscine Butylbromide',
    brands: ['Buscopan'],
    category: 'Antispasmodic',
    properties: 'Relieves abdominal cramps and spasms.',
    usedFor: ['Abdominal pain', 'Bladder spasms', 'IBS'],
    safeDose: '10mg - 20mg up to four times daily.',
    sideEffects: ['Dry mouth', 'Blurred vision', 'Tachycardia', 'Constipation'],
    overdoseEffects: 'Anticholinergic syndrome, urinary retention, dilated pupils.',
    mechanismOfAction: 'Antimuscarinic agent that relaxes smooth muscle.',
    contraindications: ['Myasthenia gravis', 'Megacolon', 'Glaucoma'],
    interactions: [],
    alternatives: ['meftal_spas', 'dicyclomine']
  },
  {
    id: 'eldoper',
    name: 'Eldoper (Loperamide)',
    genericName: 'Loperamide',
    brands: ['Eldoper', 'Imodium', 'Lopamide'],
    category: 'Antidiarrheal',
    properties: 'Slows intestinal motility to treat diarrhea.',
    usedFor: ['Acute diarrhea', 'Chronic diarrhea (IBS)'],
    safeDose: '4mg initially, then 2mg after each loose stool. Max 16mg/day.',
    sideEffects: ['Constipation', 'Abdominal cramps', 'Dizziness', 'Nausea'],
    overdoseEffects: 'CNS depression, toxic megacolon, cardiac arrhythmias (QT prolongation).',
    mechanismOfAction: 'Opioid receptor agonist in the gut wall.',
    contraindications: ['Infectious diarrhea (dysentery)', 'Ulcerative colitis (acute)', 'Children under 2'],
    interactions: [],
    alternatives: ['racecadotril', 'probiotics']
  },
  {
    id: 'dexona',
    name: 'Dexona (Dexamethasone)',
    genericName: 'Dexamethasone',
    brands: ['Dexona', 'Decadron'],
    category: 'Corticosteroid',
    properties: 'Potent systemic glucocorticoid.',
    usedFor: ['Severe allergies', 'Inflammation', 'Autoimmune conditions', 'Dexamethasone suppression test'],
    safeDose: '0.5mg - 9mg daily in divided doses.',
    sideEffects: ['Weight gain', 'Hyperglycemia', 'Mood changes', 'Increased infection risk'],
    overdoseEffects: 'Cushingoid features, severe hypertension, electrolyte imbalance.',
    mechanismOfAction: 'Suppresses inflammation and immune response.',
    contraindications: ['Systemic fungal infections', 'Live virus vaccines'],
    interactions: [
      { drugId: 'metformin', severity: 'Moderate', description: 'May decrease metformin effectiveness.' },
      { drugId: 'warfarin', severity: 'Moderate', description: 'May alter warfarin effect.' }
    ],
    alternatives: ['prednisone', 'betamethasone']
  },
  {
    id: 'vicks_action_500',
    name: 'Vicks Action 500 (Paracetamol + Phenylephrine + Caffeine)',
    genericName: 'Paracetamol + Phenylephrine + Caffeine',
    brands: ['Vicks Action 500'],
    category: 'Cold and Flu Combination',
    properties: 'Relieves cold symptoms and headache.',
    usedFor: ['Common cold', 'Headache', 'Nasal congestion'],
    safeDose: '1 tablet every 6-8 hours. Max 4 tablets/day.',
    sideEffects: ['Drowsiness', 'Palpitations', 'Insomnia'],
    overdoseEffects: 'Liver damage, severe hypertension, arrhythmias.',
    mechanismOfAction: 'Analgesic + Decongestant + CNS Stimulant.',
    contraindications: ['Severe hypertension', 'Liver disease', 'Glaucoma'],
    interactions: [
      { drugId: 'alcohol', severity: 'Major', description: 'Increased liver risk and sedation.' }
    ],
    alternatives: ['sinarest', 'paracetamol']
  },
  {
    id: 'liv_52',
    name: 'Liv 52 (Herbal Liver Support)',
    genericName: 'Herbal Formulation',
    brands: ['Liv 52'],
    category: 'Hepatoprotective',
    properties: 'Herbal supplement for liver health.',
    usedFor: ['Liver cirrhosis', 'Hepatitis', 'Loss of appetite'],
    safeDose: '1-2 tablets twice or thrice daily.',
    sideEffects: ['Generally safe, occasional GI upset'],
    overdoseEffects: 'No specific symptoms reported.',
    mechanismOfAction: 'Protects liver parenchyma and promotes hepatocellular regeneration.',
    contraindications: ['Hypersensitivity'],
    interactions: [],
    alternatives: []
  },
  {
    id: 'pudin_hara',
    name: 'Pudin Hara (Peppermint Oil)',
    genericName: 'Mentha Piperita Oil',
    brands: ['Pudin Hara'],
    category: 'Carminative',
    properties: 'Herbal remedy for stomach ache and gas.',
    usedFor: ['Stomach ache', 'Gas', 'Indigestion'],
    safeDose: '1-2 pearls or 8-10 drops in water as needed.',
    sideEffects: ['Heartburn', 'Anal burning (rare)'],
    overdoseEffects: 'Generally safe, excessive use can cause GI irritation.',
    mechanismOfAction: 'Antispasmodic effect on intestinal smooth muscle.',
    contraindications: ['Bile duct obstruction', 'Severe liver disease'],
    interactions: [],
    alternatives: ['digene']
  },
  {
    id: 'stemetil',
    name: 'Stemetil (Prochlorperazine)',
    genericName: 'Prochlorperazine',
    brands: ['Stemetil', 'Vomitil'],
    category: 'Antiemetic/Antipsychotic',
    properties: 'Relieves severe nausea, vomiting, and vertigo.',
    usedFor: ['Vertigo', 'Nausea', 'Vomiting', 'Migraine'],
    safeDose: '5mg - 10mg up to three times daily.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Extrapyramidal symptoms', 'Blurry vision'],
    overdoseEffects: 'Severe CNS depression, hypotension, extrapyramidal reactions.',
    mechanismOfAction: 'Dopamine D2 receptor antagonist.',
    contraindications: ['Comatose states', 'Bone marrow depression', 'Children under 2'],
    interactions: [
      { drugId: 'alcohol', severity: 'Major', description: 'Increased sedation and risk of hypotension.' }
    ],
    alternatives: ['ondansetron', 'domperidone']
  },
  {
    id: 'vertin',
    name: 'Vertin (Betahistine)',
    genericName: 'Betahistine',
    brands: ['Vertin', 'Betavert'],
    category: 'Antivertigo',
    properties: 'Improves blood flow in the inner ear.',
    usedFor: ["Meniere's disease", 'Vertigo', 'Tinnitus'],
    safeDose: '8mg - 16mg three times daily.',
    sideEffects: ['Nausea', 'Indigestion', 'Headache'],
    overdoseEffects: 'Nausea, somnolence, abdominal pain, seizures (high doses).',
    mechanismOfAction: 'H1 agonist and H3 antagonist in the inner ear.',
    contraindications: ['Pheochromocytoma', 'Peptic ulcer (active)'],
    interactions: [
      { drugId: 'cetirizine', severity: 'Minor', description: 'Antihistamines may reduce betahistine effect.' }
    ],
    alternatives: ['stemetil']
  },
  {
    id: 'aciloc',
    name: 'Aciloc (Ranitidine)',
    genericName: 'Ranitidine',
    brands: ['Aciloc', 'Rantac', 'Zinetac'],
    category: 'H2 Blocker',
    properties: 'Reduces stomach acid.',
    usedFor: ['Acidity', 'Heartburn', 'Stomach ulcers'],
    safeDose: '150mg twice daily.',
    sideEffects: ['Headache', 'Dizziness', 'Constipation'],
    overdoseEffects: 'Muscular tremors, vomiting, rapid heart rate.',
    mechanismOfAction: 'Blocks H2 receptors in parietal cells.',
    contraindications: ['Hypersensitivity'],
    interactions: [
      { drugId: 'warfarin', severity: 'Minor', description: 'May slightly increase warfarin effect.' }
    ],
    alternatives: ['famotidine', 'pantoprazole']
  },
  {
    id: 'febrex_plus',
    name: 'Febrex Plus (Paracetamol + Phenylephrine + Chlorpheniramine)',
    genericName: 'Paracetamol + Phenylephrine + Chlorpheniramine',
    brands: ['Febrex Plus', 'Sinarest', 'Solvin Cold'],
    category: 'Cold and Flu Combination',
    properties: 'Relieves symptoms of common cold and fever.',
    usedFor: ['Common cold', 'Fever', 'Nasal congestion'],
    safeDose: '1 tablet every 6-8 hours.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Dizziness'],
    overdoseEffects: 'Liver damage, severe hypertension.',
    mechanismOfAction: 'Analgesic + Decongestant + Antihistamine.',
    contraindications: ['Severe hypertension', 'Liver disease'],
    interactions: [
      { drugId: 'alcohol', severity: 'Major', description: 'Increased liver risk.' }
    ],
    alternatives: ['paracetamol', 'cetirizine']
  },
  {
    id: 'meftal_p',
    name: 'Meftal P (Mefenamic Acid)',
    genericName: 'Mefenamic Acid',
    brands: ['Meftal P', 'Ponstan'],
    category: 'NSAID',
    properties: 'Pain reliever and anti-inflammatory, often used in children.',
    usedFor: ['Fever in children', 'Mild to moderate pain'],
    safeDose: '250mg - 500mg three times daily (adults).',
    sideEffects: ['Diarrhea', 'Abdominal pain', 'Nausea'],
    overdoseEffects: 'Seizures, GI bleeding, kidney failure.',
    mechanismOfAction: 'Inhibits prostaglandin synthesis.',
    contraindications: ['Peptic ulcer', 'Severe renal impairment'],
    interactions: [
      { drugId: 'warfarin', severity: 'Major', description: 'Increased bleeding risk.' }
    ],
    alternatives: ['paracetamol', 'ibuprofen']
  },
  {
    id: 'pan_d',
    name: 'Pan-D (Pantoprazole + Domperidone)',
    genericName: 'Pantoprazole + Domperidone',
    brands: ['Pan-D', 'Pantocid D', 'Pantosec D'],
    category: 'PPI + Antiemetic',
    properties: 'Reduces acidity and prevents nausea/vomiting.',
    usedFor: ['Acidity with nausea', 'GERD', 'Dyspepsia'],
    safeDose: '1 capsule once daily before breakfast.',
    sideEffects: ['Dry mouth', 'Headache', 'Dizziness'],
    overdoseEffects: 'Extrapyramidal symptoms (from domperidone), severe diarrhea.',
    mechanismOfAction: 'PPI + Dopamine antagonist.',
    contraindications: ['Cardiac arrhythmias', 'Prolonged QT interval', 'Liver disease'],
    interactions: [
      { drugId: 'stemetil', severity: 'Moderate', description: 'Increased risk of extrapyramidal effects.' }
    ],
    alternatives: ['pantoprazole', 'aciloc']
  },
  {
    id: 'cefixime',
    name: 'Cefixime (Zifi, Taxim-O, Milixim)',
    genericName: 'Cefixime',
    brands: ['Zifi', 'Taxim-O', 'Milixim', 'Suprax'],
    category: 'Antibiotic (Cephalosporin)',
    properties: 'Third-generation cephalosporin antibiotic.',
    usedFor: ['Typhoid fever', 'Urinary tract infections', 'Bronchitis'],
    safeDose: '200mg - 400mg daily in divided doses.',
    sideEffects: ['Diarrhea', 'Nausea', 'Abdominal pain', 'Rash'],
    overdoseEffects: 'Seizures (rare), severe GI upset.',
    mechanismOfAction: 'Inhibits bacterial cell wall synthesis.',
    contraindications: ['Cephalosporin allergy', 'Penicillin allergy (cross-reactivity)'],
    interactions: [
      { drugId: 'warfarin', severity: 'Moderate', description: 'May increase bleeding risk.' }
    ],
    alternatives: ['amoxicillin', 'azithromycin']
  },
  {
    id: 'augmentin',
    name: 'Augmentin (Amoxicillin + Clavulanic Acid)',
    genericName: 'Amoxicillin + Clavulanic Acid',
    brands: ['Augmentin', 'Clavam', 'Moxikind-CV'],
    category: 'Antibiotic (Penicillin)',
    properties: 'Broad-spectrum antibiotic combination.',
    usedFor: ['Sinusitis', 'Pneumonia', 'Ear infections', 'Skin infections'],
    safeDose: '625mg twice or thrice daily.',
    sideEffects: ['Diarrhea', 'Nausea', 'Vaginal yeast infection', 'Rash'],
    overdoseEffects: 'Seizures, severe GI distress, kidney damage.',
    mechanismOfAction: 'Penicillin + Beta-lactamase inhibitor.',
    contraindications: ['Penicillin allergy', 'History of jaundice with Augmentin'],
    interactions: [
      { drugId: 'warfarin', severity: 'Moderate', description: 'Increased risk of bleeding.' },
      { drugId: 'metformin', severity: 'Minor', description: 'May slightly alter metformin levels.' }
    ],
    alternatives: ['cefixime', 'azithromycin']
  },
];

export const MEDICAL_CONDITIONS = [
  { id: 'ckd', label: 'Chronic Kidney Disease', severity: 'High' },
  { id: 'hypertension', label: 'Hypertension', severity: 'Medium' },
  { id: 'liver_cirrhosis', label: 'Liver Cirrhosis', severity: 'High' },
  { id: 'pregnancy', label: 'Pregnancy', severity: 'High' },
  { id: 'stroke', label: 'Stroke', severity: 'High' },
  { id: 'paralysis', label: 'Paralysis', severity: 'Medium' },
  { id: 'brain_hemorrhage', label: 'Brain Hemorrhage', severity: 'High' },
  { id: 'diabetes_t1', label: 'Diabetes Type 1', severity: 'High' },
  { id: 'diabetes_t2', label: 'Diabetes Type 2', severity: 'High' },
  { id: 'heart_failure', label: 'Heart Failure', severity: 'High' },
  { id: 'atrial_fibrillation', label: 'Atrial Fibrillation', severity: 'Medium' },
  { id: 'peptic_ulcer', label: 'Peptic Ulcer', severity: 'Medium' },
  { id: 'asthma', label: 'Asthma', severity: 'Medium' },
  { id: 'hypothyroidism', label: 'Hypothyroidism', severity: 'Low' },
  { id: 'glaucoma', label: 'Glaucoma', severity: 'Medium' },
  { id: 'gout', label: 'Gout', severity: 'Medium' },
  { id: 'bph', label: 'Enlarged Prostate (BPH)', severity: 'Low' },
  { id: 'depression', label: 'Depression', severity: 'Medium' },
  { id: 'anxiety', label: 'Anxiety', severity: 'Medium' }
];

export const CONDITION_CONTRAINDICATIONS: Record<string, string[]> = {
  'ckd': ['ibuprofen', 'metformin', 'spironolactone', 'furosemide', 'diclofenac', 'naproxen', 'empagliflozin', 'enalapril', 'lisinopril'],
  'liver_cirrhosis': ['paracetamol', 'atorvastatin', 'warfarin', 'amoxicillin', 'diclofenac', 'rosuvastatin', 'carvedilol', 'amiodarone', 'valsartan'],
  'pregnancy': ['lisinopril', 'losartan', 'atorvastatin', 'warfarin', 'aspirin', 'telmisartan', 'valsartan', 'enalapril', 'doxycycline', 'metronidazole', 'fluoxetine', 'sertraline'],
  'stroke': ['ibuprofen', 'aspirin', 'diclofenac', 'naproxen', 'sildenafil', 'tadalafil'],
  'brain_hemorrhage': ['warfarin', 'aspirin', 'clopidogrel', 'diclofenac', 'naproxen', 'sildenafil', 'tadalafil'],
  'hypertension': ['ibuprofen', 'diclofenac', 'naproxen', 'prednisone', 'dexamethasone', 'pseudoephedrine'],
  'diabetes_t2': ['furosemide', 'prednisone', 'dexamethasone', 'metoprolol', 'atenolol'],
  'diabetes_t1': ['furosemide', 'prednisone', 'dexamethasone', 'metoprolol', 'atenolol'],
  'heart_failure': ['ibuprofen', 'diclofenac', 'naproxen', 'pioglitazone', 'spironolactone', 'verapamil', 'amlodipine'],
  'peptic_ulcer': ['aspirin', 'ibuprofen', 'warfarin', 'clopidogrel', 'diclofenac', 'naproxen', 'prednisone', 'dexamethasone'],
  'asthma': ['aspirin', 'ibuprofen', 'diclofenac', 'naproxen', 'metoprolol', 'atenolol', 'bisoprolol', 'carvedilol'],
  'glaucoma': ['amitriptyline', 'alprazolam', 'diazepam', 'lorazepam', 'fluoxetine', 'sertraline'],
  'gout': ['aspirin', 'furosemide', 'hydrochlorothiazide', 'niacin'],
  'atrial_fibrillation': ['ibuprofen', 'diclofenac', 'naproxen', 'sildenafil', 'tadalafil'],
  'bph': ['amitriptyline', 'diazepam', 'diphenhydramine', 'pseudoephedrine'],
  'depression': ['tramadol', 'morphine', 'alprazolam', 'diazepam', 'lorazepam']
};
