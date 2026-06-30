/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  ShieldAlert, 
  Thermometer, 
  User, 
  Search, 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Moon, 
  Sun, 
  FileText, 
  RefreshCw,
  X,
  Stethoscope,
  Activity,
  HeartPulse,
  Brain,
  Zap,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MEDICATIONS, MEDICAL_CONDITIONS, CONDITION_CONTRAINDICATIONS, Medication } from './data/medications';
import { scanPrescription } from './services/geminiService';
import { cn } from './lib/utils';

// --- Types ---
interface PatientProfile {
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  history: string[]; // IDs from MEDICAL_CONDITIONS
}

interface ActiveMedication {
  id: string;
  name: string;
  dosage?: string;
  frequency?: string;
  source: 'OCR' | 'Manual';
}

interface InteractionResult {
  drugAId: string;
  drugA: string;
  drugBId: string;
  drugB: string;
  severity: 'Minor' | 'Moderate' | 'Major';
  description: string;
}

interface ConditionConflict {
  drugId: string;
  drug: string;
  condition: string;
  description: string;
}

// --- Main Component ---
export default function App() {
  console.log("App started"); 
  const [darkMode, setDarkMode] = useState(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  }
  return true;
});
  const [activeTab, setActiveTab] = useState<'profile' | 'results'>('profile');
  const [patient, setPatient] = useState<PatientProfile>({
    age: 30,
    gender: 'Male',
    history: []
  });
  const [activeMeds, setActiveMeds] = useState<ActiveMedication[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<Medication | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [interchangerTarget, setInterchangerTarget] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Effects ---
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      setDarkMode(JSON.parse(saved));
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- Handlers ---
  const handleAddMed = (med: Medication, customName?: string) => {
    if (!activeMeds.find(m => m.id === med.id)) {
      setActiveMeds([...activeMeds, { id: med.id, name: customName || med.name, source: 'Manual' }]);
    }
    setSearchQuery('');
  };

  const handleRemoveMed = (id: string) => {
    setActiveMeds(activeMeds.filter(m => m.id !== id));
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Environment camera failed, trying default", err);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (fallbackErr) {
        console.error("Camera access denied", fallbackErr);
        alert("Please allow camera access or use the Upload Photo option instead.");
      }
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const processOCR = async (base64Image: string, isFromCamera: boolean = false) => {
    setIsScanning(true);
    try {
      const results = await scanPrescription(base64Image);
      const newMeds: ActiveMedication[] = [];
      
      results.forEach((res: any) => {
        const found = MEDICATIONS.find(m => 
          m.name.toLowerCase().includes(res.name.toLowerCase()) || 
          m.genericName.toLowerCase().includes(res.name.toLowerCase())
        );
        if (found && !activeMeds.find(m => m.id === found.id)) {
          newMeds.push({
            id: found.id,
            name: found.name,
            dosage: res.dosage,
            frequency: res.frequency,
            source: 'OCR'
          });
        }
      });
      
      setActiveMeds(prev => [...prev, ...newMeds]);
      if (isFromCamera) {
        stopCamera();
      }
      setActiveTab('results');
    } catch (err: any) {
      alert(err.message || "Failed to scan prescription. Try manual entry.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = (reader.result as string);
      await processOCR(base64String, false);
    };
    reader.readAsDataURL(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const captureAndScan = async () => {
    if (!videoRef.current) return;
    
    let width = videoRef.current.videoWidth;
    let height = videoRef.current.videoHeight;
    const MAX_WIDTH = 1024;

    if (width > MAX_WIDTH) {
      height = Math.round((height * MAX_WIDTH) / width);
      width = MAX_WIDTH;
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(videoRef.current, 0, 0, width, height);
    
    const base64Image = canvas.toDataURL('image/jpeg', 0.7);
    await processOCR(base64Image, true);
  };

  // --- Logic ---
  const getInteractions = (): InteractionResult[] => {
    const results: InteractionResult[] = [];
    const processedPairs = new Set<string>();

    for (let i = 0; i < activeMeds.length; i++) {
      const medA_data = MEDICATIONS.find(m => m.id === activeMeds[i].id);
      if (!medA_data) continue;
      
      for (let j = 0; j < activeMeds.length; j++) {
        if (i === j) continue;
        const medB = activeMeds[j];
        const pairKey = [activeMeds[i].id, medB.id].sort().join('-');
        if (processedPairs.has(pairKey)) continue;

        const interaction = medA_data.interactions.find(it => it.drugId === medB.id);
        if (interaction) {
          results.push({
            drugAId: medA_data.id,
            drugA: medA_data.name,
            drugBId: medB.id,
            drugB: medB.name,
            severity: interaction.severity,
            description: interaction.description
          });
          processedPairs.add(pairKey);
        } else {
          // Check the other way too
          const medB_data = MEDICATIONS.find(m => m.id === medB.id);
          const reverseInteraction = medB_data?.interactions.find(it => it.drugId === medA_data.id);
          if (reverseInteraction) {
            results.push({
              drugAId: medB_data!.id,
              drugA: medB_data!.name,
              drugBId: medA_data.id,
              drugB: medA_data.name,
              severity: reverseInteraction.severity,
              description: reverseInteraction.description
            });
            processedPairs.add(pairKey);
          }
        }
      }
    }
    return results;
  };

  const getConditionConflicts = (): ConditionConflict[] => {
    const conflicts: ConditionConflict[] = [];
    activeMeds.forEach(med => {
      patient.history.forEach(condId => {
        const contra = CONDITION_CONTRAINDICATIONS[condId];
        if (contra?.includes(med.id)) {
          const cond = MEDICAL_CONDITIONS.find(c => c.id === condId);
          conflicts.push({
            drugId: med.id,
            drug: med.name,
            condition: cond?.label || condId,
            description: `Contraindicated in ${cond?.label}. Risk of complications.`
          });
        }
      });
    });
    return conflicts;
  };

  const calculateSafetyScore = () => {
    const interactions = getInteractions();
    const conflicts = getConditionConflicts();
    
    let score = 100;
    
    // Deduct for interactions
    interactions.forEach(it => {
      if (it.severity === 'Major') score -= 35;
      if (it.severity === 'Moderate') score -= 20;
      if (it.severity === 'Minor') score -= 10;
    });

    // Deduct for condition conflicts
    conflicts.forEach(() => score -= 30);

    // Deduct for polypharmacy (more than 5 drugs)
    if (activeMeds.length > 5) score -= 15;
    else if (activeMeds.length > 3) score -= 5;

    // Small deduction for each drug to show reactivity
    score -= activeMeds.length * 1;

    // Age factor (higher risk for elderly or children)
    if (patient.age > 65 || patient.age < 12) {
      if (activeMeds.length > 2) score -= 10;
    }
    
    // Deduct for general medical conditions only if they have conflicts
    if (conflicts.length > 0) {
      score -= patient.history.length * 2;
    }

    return Math.max(0, score);
  };

  const safetyScore = calculateSafetyScore();
  const interactions = getInteractions();
  const conflicts = getConditionConflicts();

  // Debugging safety score
  useEffect(() => {
    console.log("Safety Score Updated:", safetyScore, { interactions, conflicts });
  }, [safetyScore, interactions.length, conflicts.length]);

  // --- Render Helpers ---
  const filteredDrugs = searchQuery.length > 0 
    ? (() => {
        const query = searchQuery.toLowerCase().trim();
        
        // Find all matches
        const matches = MEDICATIONS.filter(m => 
          m.name.toLowerCase().includes(query) || 
          m.genericName.toLowerCase().includes(query) ||
          m.brands?.some(b => b.toLowerCase().includes(query))
        );

        // Check for an exact match (either generic name, a brand name, or the main part of the name)
        const exactMatch = matches.find(m => {
          const generic = m.genericName.toLowerCase();
          const name = m.name.toLowerCase();
          const mainName = name.split(' (')[0].toLowerCase(); // Part before parentheses
          
          return generic === query || 
                 m.brands?.some(b => b.toLowerCase() === query) ||
                 name === query ||
                 mainName === query
        });

        // If exact match found, only return that one
        if (exactMatch) {
          return [exactMatch];
        }

        // Otherwise return sorted matches
        return matches.sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          const aMain = aName.split(' (')[0];
          const bMain = bName.split(' (')[0];
          
          const aBrandMatch = a.brands?.some(b => b.toLowerCase().startsWith(query));
          const bBrandMatch = b.brands?.some(b => b.toLowerCase().startsWith(query));

          // Exact brand start priority
          if (aBrandMatch && !bBrandMatch) return -1;
          if (!aBrandMatch && bBrandMatch) return 1;

          // Starts with priority for main name
          if (aMain.startsWith(query) && !bMain.startsWith(query)) return -1;
          if (!aMain.startsWith(query) && bMain.startsWith(query)) return 1;
          
          return aName.localeCompare(bName);
        }).slice(0, 10);
      })()
    : [];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 py-3 flex items-center justify-between shrink-0 overflow-hidden">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
            <ShieldAlert size={24} />
          </div>
          <div className="truncate">
            <h1 className="text-lg font-bold tracking-tight leading-none truncate">DDI-CDS</h1>
            <p className="text-[10px] uppercase tracking-widest opacity-50 font-semibold truncate">Clinical Support System</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center justify-center"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-blue-600" />}
          </button>
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10">
            <User size={14} className="opacity-50" />
            <span className="text-xs font-medium">{patient.age}y, {patient.gender}</span>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Tabs */}
      <div className="lg:hidden flex border-b border-slate-200 dark:border-white/10 bg-white dark:bg-black sticky top-[65px] z-40">
        <button 
          onClick={() => setActiveTab('profile')}
          className={cn(
            "flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2",
            activeTab === 'profile' ? "border-blue-600 text-blue-600" : "border-transparent opacity-50"
          )}
        >
          Profile
        </button>
        <button 
          onClick={() => setActiveTab('results')}
          className={cn(
            "flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2",
            activeTab === 'results' ? "border-blue-600 text-blue-600" : "border-transparent opacity-50"
          )}
        >
          Results
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto">
        
        {/* Left Column: Input & Profile (Desktop) */}
        <div className={cn(
          "lg:col-span-4 space-y-6 w-full",
          activeTab !== 'profile' && "hidden lg:block"
        )}>
          {/* Patient Profile Card */}
          <section className="bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User className="text-blue-500" size={18} />
                <h2 className="font-bold">Patient Profile</h2>
              </div>
              {patient.history.length > 0 && (
                <button 
                  onClick={() => setPatient({...patient, history: []})}
                  className="text-[10px] font-bold text-red-500 hover:underline"
                >
                  Clear History
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold opacity-50">Age</label>
                  <input 
                    type="number" 
                    value={patient.age}
                    onChange={(e) => setPatient({...patient, age: e.target.value === '' ? '' as any : parseInt(e.target.value) || 0})}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm focus:ring-2 ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold opacity-50">Gender</label>
                  <select 
                    value={patient.gender}
                    onChange={(e) => setPatient({...patient, gender: e.target.value as any})}
                    className="w-full bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg px-3 py-2 text-sm focus:ring-2 ring-blue-500 outline-none dark:text-white"
                  >
                    <option value="Male" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Male</option>
                    <option value="Female" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Female</option>
                    <option value="Other" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-wider font-bold opacity-50">Medical History</label>
                  <span className="text-[10px] opacity-40">{patient.history.length} Selected</span>
                </div>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
                  {MEDICAL_CONDITIONS.map(cond => (
                    <button
                      key={cond.id}
                      onClick={() => {
                        const newHistory = patient.history.includes(cond.id)
                          ? patient.history.filter(h => h !== cond.id)
                          : [...patient.history, cond.id];
                        setPatient({...patient, history: newHistory});
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                        patient.history.includes(cond.id)
                          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 opacity-60 hover:opacity-100"
                      )}
                    >
                      {cond.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Medication Input Card */}
          <section className="bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Thermometer className="text-emerald-500" size={18} />
                <h2 className="font-bold">Medications</h2>
              </div>
              <div className="flex items-center gap-3">
                {activeMeds.length > 0 && (
                  <button 
                    onClick={() => setActiveMeds([])}
                    className="text-[10px] font-bold text-red-500 hover:underline"
                  >
                    Clear All
                  </button>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-colors"
                >
                  <Upload size={14} />
                  Upload Photo
                </button>
                <button 
                  onClick={() => {
                    if (cameraStream) stopCamera();
                    else startCamera();
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors"
                >
                  <Camera size={14} />
                  {cameraStream ? "Close Camera" : "Smart Scan"}
                </button>
              </div>
            </div>

            {/* Camera View */}
            {cameraStream && (
              <div className="relative mb-4 rounded-xl overflow-hidden bg-black aspect-video border border-white/10">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-2 border-blue-500/50 m-8 rounded-lg pointer-events-none" />
                <button 
                  onClick={captureAndScan}
                  disabled={isScanning}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 disabled:opacity-50"
                >
                  {isScanning ? <RefreshCw className="animate-spin" size={16} /> : <Camera size={16} />}
                  {isScanning ? "Analyzing..." : "Capture Prescription"}
                </button>
              </div>
            )}

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Search drug or Indian brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 ring-blue-500"
              />
              
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-40 max-h-60 overflow-y-auto">
                    {filteredDrugs.length > 0 ? (
                      filteredDrugs.map(drug => {
                        const query = searchQuery.toLowerCase().trim();
                        
                        // Determine the best display name
                        // 1. Check for exact brand match
                        const exactBrand = drug.brands?.find(b => b.toLowerCase() === query);
                        // 2. Check for partial brand match
                        const partialBrand = drug.brands?.find(b => b.toLowerCase().includes(query));
                        // 3. Check for exact generic name match
                        const isExactGeneric = drug.genericName.toLowerCase() === query;
                        // 4. Check for main name match
                        const mainName = drug.name.split(' (')[0];
                        const isExactMain = mainName.toLowerCase() === query;

                        const displayName = exactBrand || (isExactMain ? mainName : null) || (isExactGeneric ? drug.genericName : null) || partialBrand || drug.name;

                        return (
                          <button
                            key={drug.id}
                            onClick={() => handleAddMed(drug, displayName)}
                            className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-between border-b border-slate-100 dark:border-white/5 last:border-0 group"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold group-hover:text-blue-500 transition-colors truncate">{displayName}</p>
                              <p className="text-[10px] opacity-50 truncate font-medium uppercase tracking-wider">
                                {drug.genericName} • {drug.category}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 ml-4">
                              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded uppercase tracking-tighter">Add</span>
                              <Plus size={16} className="text-blue-500" />
                            </div>
                          </button>
                        );
                      })
                    ) : (
                    <div className="p-4 text-center text-xs opacity-50">No drugs found in database</div>
                  )}
                </div>
              )}
            </div>

            {/* Active Meds List */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
              {activeMeds.length > 0 ? (
                activeMeds.map(med => (
                  <div 
                    key={med.id}
                    onClick={() => setSelectedDrug(MEDICATIONS.find(m => m.id === med.id) || null)}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-blue-500/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                        <Activity size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{med.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <input 
                            type="text" 
                            placeholder="Set dosage..." 
                            value={med.dosage || ''}
                            onChange={(e) => {
                              const newMeds = [...activeMeds];
                              const index = newMeds.findIndex(m => m.id === med.id);
                              if (index !== -1) {
                                newMeds[index].dosage = e.target.value;
                                setActiveMeds(newMeds);
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] bg-white dark:bg-black border border-slate-200 dark:border-white/10 rounded px-1.5 py-0.5 outline-none focus:border-blue-500 w-24 text-slate-900 dark:text-slate-100 placeholder:opacity-50"
                          />
                          <span className="text-[10px] opacity-50">• {med.source === 'OCR' ? 'Scanned' : 'Manual'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveMed(med.id);
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center border-2 border-dashed border-slate-200 dark:border-white/5 rounded-2xl">
                  <p className="text-xs opacity-40">Add medications to begin analysis</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Results & Analysis (Desktop) */}
        <div className={cn(
          "lg:col-span-8 space-y-6 w-full max-w-full overflow-x-hidden pb-20 lg:pb-0",
          activeTab !== 'results' && "hidden lg:block"
        )}>
          {/* Safety Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Safety Score Card */}
            <div className="md:col-span-2 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between shadow-sm overflow-hidden relative">
              <div className="relative z-10 flex-1 w-full min-w-0">
                <h3 className="text-xs md:text-sm font-bold opacity-50 uppercase tracking-wider mb-1">Safety Score</h3>
                <div className="flex items-baseline gap-2">
                  <motion.span 
                    key={safetyScore}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={cn(
                      "text-4xl md:text-5xl font-black tracking-tighter",
                      safetyScore > 80 ? "text-emerald-500" : safetyScore > 50 ? "text-amber-500" : "text-red-500"
                    )}
                  >
                    {safetyScore}
                  </motion.span>
                  <span className="text-lg md:text-xl font-bold opacity-30">/100</span>
                </div>
                <p className="text-[10px] md:text-xs mt-2 font-medium opacity-70">
                  {safetyScore > 80 ? "Safe to proceed with caution." : safetyScore > 50 ? "Moderate risks detected. Consult MD." : "High risk detected. Immediate review required."}
                </p>

                {/* Score Breakdown */}
                <div className="mt-4 space-y-1.5 border-t border-slate-100 dark:border-white/5 pt-3">
                  <div className="flex items-center justify-between text-[9px] md:text-[10px] font-bold uppercase tracking-wider opacity-40">
                    <span>Risk Factors</span>
                    <span>Deduction</span>
                  </div>
                  {interactions.length > 0 && (
                    <div className="flex items-center justify-between text-[10px] md:text-[11px] font-medium text-amber-500">
                      <span>Drug Interactions ({interactions.length})</span>
                      <span>-{interactions.reduce((acc, it) => acc + (it.severity === 'Major' ? 35 : it.severity === 'Moderate' ? 20 : 10), 0)}</span>
                    </div>
                  )}
                  {conflicts.length > 0 && (
                    <div className="flex items-center justify-between text-[10px] md:text-[11px] font-medium text-red-500">
                      <span>Condition Conflicts ({conflicts.length})</span>
                      <span>-{conflicts.length * 30}</span>
                    </div>
                  )}
                  {activeMeds.length > 5 && (
                    <div className="flex items-center justify-between text-[10px] md:text-[11px] font-medium text-blue-500">
                      <span>Polypharmacy Risk</span>
                      <span>-10</span>
                    </div>
                  )}
                  {(patient.age > 65 || patient.age < 12) && activeMeds.length > 2 && (
                    <div className="flex items-center justify-between text-[10px] md:text-[11px] font-medium text-purple-500">
                      <span>Age-Related Risk</span>
                      <span>-10</span>
                    </div>
                  )}
                  {interactions.length === 0 && conflicts.length === 0 && activeMeds.length <= 5 && !(patient.age > 65 || patient.age < 12) && (
                    <div className="text-[10px] md:text-[11px] font-medium text-emerald-500 italic">No major risks detected.</div>
                  )}
                </div>
              </div>
              
              {/* Visual Gauge */}
              <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center mt-6 md:mt-0 md:ml-6 shrink-0">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="56" cy="56" r="50" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-white/5 md:hidden" />
                  <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="10" className="text-slate-100 dark:text-white/5 hidden md:block" />
                  
                  {/* Mobile Circle */}
                  <motion.circle 
                    cx="56" cy="56" r="50" fill="none" stroke="currentColor" strokeWidth="8" 
                    strokeDasharray={314.16}
                    initial={{ strokeDashoffset: 314.16 }}
                    animate={{ strokeDashoffset: 314.16 - (314.16 * safetyScore) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={cn(
                      "md:hidden",
                      safetyScore > 80 ? "text-emerald-500" : safetyScore > 50 ? "text-amber-500" : "text-red-500"
                    )}
                  />
                  
                  {/* Desktop Circle */}
                  <motion.circle 
                    cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="10" 
                    strokeDasharray={351.8}
                    initial={{ strokeDashoffset: 351.8 }}
                    animate={{ strokeDashoffset: 351.8 - (351.8 * safetyScore) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={cn(
                      "hidden md:block",
                      safetyScore > 80 ? "text-emerald-500" : safetyScore > 50 ? "text-amber-500" : "text-red-500"
                    )}
                  />
                </svg>
                <ShieldAlert className="absolute text-slate-300 dark:text-white/10" size={32} />
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <Stethoscope size={24} />
                <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full font-bold uppercase">Live Analysis</span>
              </div>
              <div>
                <p className="text-3xl font-black tracking-tighter">{interactions.length + conflicts.length}</p>
                <p className="text-xs font-medium opacity-80">Total Alerts Detected</p>
              </div>
            </div>
          </div>

          {/* Interaction Matrix (Glassmorphism) */}
          <section className="relative bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Zap className="text-amber-500" size={20} />
                <h2 className="text-lg md:text-xl font-black tracking-tight">Interaction Matrix</h2>
              </div>
              <button 
                onClick={() => setShowReport(!showReport)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black px-4 py-2.5 rounded-xl text-xs font-bold hover:scale-105 transition-transform"
              >
                <FileText size={14} />
                {showReport ? "Hide Report" : "Full Medical Report"}
              </button>
            </div>

            <div className="space-y-4">
              {/* Drug-Drug Interactions */}
              {interactions.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Drug-to-Drug Interactions</h3>
                  {interactions.map((it, idx) => (
                    <div key={idx} className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                        it.severity === 'Major' ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                      )}>
                        <AlertTriangle size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-bold text-sm truncate max-w-[120px]">{it.drugA}</span>
                          <RefreshCw size={12} className="opacity-30 shrink-0" />
                          <span className="font-bold text-sm truncate max-w-[120px]">{it.drugB}</span>
                          <span className={cn(
                            "text-[8px] px-1.5 py-0.5 rounded font-black uppercase shrink-0",
                            it.severity === 'Major' ? "bg-red-500 text-white" : "bg-amber-500 text-white"
                          )}>
                            {it.severity}
                          </span>
                        </div>
                        <p className="text-xs opacity-70 leading-relaxed">{it.description}</p>
                      </div>
                      <button 
                        onClick={() => {
                          setInterchangerTarget(it.drugAId);
                        }}
                        className="w-full sm:w-auto px-3 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-white/10 transition-colors shrink-0"
                      >
                        Find Alternatives
                      </button>
                    </div>
                  ))}
                </div>
              ) : activeMeds.length > 1 && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-500">
                  <CheckCircle2 size={18} />
                  <p className="text-xs font-bold">No significant drug-drug interactions detected.</p>
                </div>
              )}

              {/* Condition Conflicts */}
              {conflicts.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Drug-to-Condition Contraindications</h3>
                  {conflicts.map((cf, idx) => (
                    <div key={idx} className="bg-red-500/5 border border-red-500/20 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                        <Brain size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-bold text-sm truncate max-w-[150px]">{cf.drug}</span>
                          <X size={12} className="text-red-500 shrink-0" />
                          <span className="font-bold text-sm truncate max-w-[150px]">{cf.condition}</span>
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-red-600 text-white font-black uppercase shrink-0">Contraindicated</span>
                        </div>
                        <p className="text-xs text-red-500/80 leading-relaxed font-medium">{cf.description}</p>
                      </div>
                      <button 
                        onClick={() => {
                          setInterchangerTarget(cf.drugId);
                        }}
                        className="w-full sm:w-auto px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-red-500/20 transition-colors shrink-0 text-red-600 dark:text-red-400"
                      >
                        Alternatives
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeMeds.length === 0 && (
                <div className="py-20 text-center opacity-30">
                  <Activity size={48} className="mx-auto mb-4" />
                  <p className="text-sm font-bold">Waiting for input data...</p>
                </div>
              )}
            </div>
          </section>

          {/* Optimization Suggestions */}
          {(interactions.length > 0 || conflicts.length > 0) && (
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap size={120} strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Zap size={20} className="fill-current" />
                  Optimization Suggestions
                </h3>
                <p className="text-sm opacity-90 mb-6 max-w-md">
                  We've identified safer alternatives for some of your medications that could reduce the risk of interactions and side effects.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[...new Set([...interactions.map(i => i.drugAId), ...interactions.map(i => i.drugBId), ...conflicts.map(c => c.drugId)])].slice(0, 4).map(drugId => {
                    const med = MEDICATIONS.find(m => m.id === drugId);
                    if (!med || !med.alternatives || med.alternatives.length === 0) return null;
                    
                    return (
                      <div key={drugId} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase opacity-60 mb-0.5">Replace</p>
                          <p className="text-xs font-bold truncate">{med.name}</p>
                        </div>
                        <button 
                          onClick={() => {
                            setInterchangerTarget(drugId);
                          }}
                          className="px-3 py-1.5 bg-white text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-blue-50 transition-colors shrink-0"
                        >
                          Safer Options
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Expandable Medical Report */}
          <AnimatePresence>
            {showReport && (
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="lg:col-span-12 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-sm mt-6"
              >
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-white/5 pb-6">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">Clinical Decision Report</h2>
                    <p className="text-xs opacity-50 font-medium">Generated on {new Date().toLocaleDateString()} • Patient ID: #CDS-{Math.floor(Math.random()*10000)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase opacity-40">Safety Status</p>
                    <p className={cn(
                      "text-sm font-bold",
                      safetyScore > 80 ? "text-emerald-500" : "text-red-500"
                    )}>
                      {safetyScore > 80 ? "APPROVED" : "REVIEW REQUIRED"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">Patient Summary</h4>
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Age/Gender:</strong> {patient.age} / {patient.gender}</p>
                        <p className="text-sm"><strong>Medical History:</strong> {patient.history.length > 0 ? patient.history.map(h => MEDICAL_CONDITIONS.find(c => c.id === h)?.label).join(', ') : 'None reported'}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">Safe Usage & Dosage</h4>
                      <div className="space-y-4">
                        {activeMeds.map(m => {
                          const medData = MEDICATIONS.find(med => med.id === m.id);
                          const hasConflict = conflicts.some(c => c.drug === m.name);
                          return (
                            <div key={m.id} className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                              <p className="text-xs font-bold mb-1">{m.name} ({medData?.genericName})</p>
                              <p className="text-[10px] opacity-70 leading-relaxed">
                                <strong>Recommended Dose:</strong> {medData?.safeDose || 'Consult physician'}
                              </p>
                              {hasConflict && (
                                <p className="text-[10px] text-red-500 font-bold mt-1">
                                  ⚠️ WARNING: This medication has conflicts with your medical history. Use with extreme caution.
                                </p>
                              )}
                              <p className="text-[10px] opacity-70 mt-1">
                                <strong>Usage:</strong> {medData?.properties}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">Clinical Observations</h4>
                      <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                        <p className="text-xs leading-relaxed opacity-80 italic">
                          "Based on the clinical profile, the patient exhibits {conflicts.length > 0 ? 'significant contraindications' : 'no major contraindications'} with the current regimen. {interactions.length > 0 ? `There are ${interactions.length} potential drug-drug interactions that require monitoring.` : 'The drug combination appears stable.'} Renal and hepatic functions should be monitored if medications like {activeMeds[0]?.name || 'current drugs'} are continued."
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">Recommended Actions</h4>
                      <ul className="space-y-2">
                        {safetyScore < 80 && <li className="text-xs text-red-500 font-bold">• Re-evaluate medication regimen immediately.</li>}
                        <li className="text-xs opacity-70">• Monitor vital signs every 4-6 hours.</li>
                        <li className="text-xs opacity-70">• Schedule follow-up blood work for renal markers.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-slate-200 dark:border-white/10 px-6 py-3 flex items-center justify-around z-50">
        <button 
          onClick={() => setActiveTab('profile')}
          className={cn("flex flex-col items-center gap-1", activeTab === 'profile' ? "text-blue-500" : "opacity-40")}
        >
          <User size={20} />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
        <button 
          onClick={() => setActiveTab('results')}
          className={cn("flex flex-col items-center gap-1", activeTab === 'results' ? "text-blue-500" : "opacity-40")}
        >
          <Activity size={20} />
          <span className="text-[10px] font-bold">Results</span>
        </button>
      </nav>

      {/* Drug Details Modal */}
      <AnimatePresence>
        {selectedDrug && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDrug(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#111] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col max-h-[90vh]"
            >
              <div className="p-5 md:p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-white/5 shrink-0">
                <div className="min-w-0">
                  <h2 className="text-xl md:text-2xl font-black tracking-tight truncate">{selectedDrug.name}</h2>
                  <p className="text-[10px] md:text-xs opacity-50 font-bold uppercase tracking-widest truncate">{selectedDrug.genericName} • {selectedDrug.category}</p>
                </div>
                <button onClick={() => setSelectedDrug(null)} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors shrink-0">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-5 md:p-6 overflow-y-auto space-y-8 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <section>
                      <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Mechanism of Action</h4>
                      <p className="text-sm leading-relaxed">{selectedDrug.mechanismOfAction}</p>
                    </section>
                    <section>
                      <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Safe Dosage</h4>
                      <p className="text-sm font-bold text-blue-500">{selectedDrug.safeDose}</p>
                    </section>
                    <section>
                      <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Used For</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDrug.usedFor.map(use => (
                          <span key={use} className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded text-[10px] font-bold">{use}</span>
                        ))}
                      </div>
                    </section>
                  </div>
                  
                  <div className="space-y-6">
                    <section>
                      <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Side Effects</h4>
                      <ul className="space-y-1">
                        {selectedDrug.sideEffects.map(effect => (
                          <li key={effect} className="text-sm flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-amber-500" />
                            {effect}
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section>
                      <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 text-red-500">Overdose Effects</h4>
                      <p className="text-sm text-red-500/80 font-medium">{selectedDrug.overdoseEffects}</p>
                    </section>
                    <section>
                      <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Contraindications</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDrug.contraindications.map(contra => (
                          <span key={contra} className="px-2 py-1 bg-red-500/10 text-red-500 rounded text-[10px] font-bold">{contra}</span>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">Suggested Alternatives (Interchanger)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedDrug.alternatives.map(altId => {
                      const alt = MEDICATIONS.find(m => m.id === altId);
                      return alt ? (
                        <div key={altId} className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold">{alt.name}</p>
                            <p className="text-[10px] opacity-50">{alt.category}</p>
                          </div>
                          <button 
                            onClick={() => {
                              handleRemoveMed(selectedDrug.id);
                              handleAddMed(alt);
                              setSelectedDrug(null);
                            }}
                            className="text-[10px] font-bold text-emerald-500 hover:underline"
                          >
                            Switch to this
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interchanger Modal */}
      <AnimatePresence>
        {interchangerTarget && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInterchangerTarget(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white dark:bg-[#111] rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-white/10"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-blue-500/20">
                  <RefreshCw size={32} />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Drug Interchanger</h2>
                <p className="text-sm opacity-50 mt-2">Finding safer alternatives for <strong>{MEDICATIONS.find(m => m.id === interchangerTarget)?.name || 'Unknown Drug'}</strong></p>
              </div>

              <div className="space-y-3">
                {MEDICATIONS.find(m => m.id === interchangerTarget)?.alternatives.map(altId => {
                  const alt = MEDICATIONS.find(m => m.id === altId);
                  return alt ? (
                    <button
                      key={altId}
                      onClick={() => {
                        const targetMed = activeMeds.find(m => m.id === interchangerTarget);
                        if (targetMed) {
                          handleRemoveMed(targetMed.id);
                        }
                        handleAddMed(alt);
                        setInterchangerTarget(null);
                      }}
                      className="w-full p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-left hover:border-blue-500 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold">{alt.name}</p>
                          <p className="text-[10px] opacity-50 uppercase tracking-wider">{alt.category}</p>
                        </div>
                        <Plus size={18} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ) : null;
                })}
              </div>

              <button 
                onClick={() => setInterchangerTarget(null)}
                className="w-full mt-8 py-3 text-sm font-bold opacity-50 hover:opacity-100 transition-opacity"
              >
                Cancel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
