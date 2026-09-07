import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Waves, 
  PlusCircle, 
  Search, 
  Filter, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Download, 
  Upload, 
  AlertCircle,
  Smartphone,
  CheckCircle,
  Wifi,
  Battery,
  Signal
} from 'lucide-react';
import { DiveLog, DiveCategory, SupportedLanguage, UnitSystem, AdBannerConfig } from './types';
import { translations } from './i18n/translations';
import { initialDives, initialAdConfig } from './data/initialData';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { AdBanner } from './components/AdBanner';
import { DiveCard } from './components/DiveCard';
import { DiveFormModal } from './components/DiveFormModal';
import { DiveDetailModal } from './components/DiveDetailModal';
import { MobileCodeViewer } from './components/MobileCodeViewer';

const LOCAL_STORAGE_KEY_DIVES = 'dive_logbook_dives_v1';
const LOCAL_STORAGE_KEY_AD = 'dive_logbook_ad_v1';
const LOCAL_STORAGE_KEY_LANG = 'dive_logbook_lang_v1';
const LOCAL_STORAGE_KEY_UNITS = 'dive_logbook_unit_system_v1';

export default function App() {
  // Language state (defaulting to Spanish as requested in prompt)
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_LANG);
    return (saved === 'en' || saved === 'fr' || saved === 'es') ? saved : 'es';
  });

  // Metric vs Imperial unit system
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_UNITS);
    return (saved === 'imperial' || saved === 'metric') ? saved : 'metric';
  });

  const t = translations[language];

  // Active Category tab: 'instruction' | 'recreational' | 'all'
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'all' | DiveCategory>('instruction');

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Dive logs state with localStorage persistence
  const [dives, setDives] = useState<DiveLog[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_DIVES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading dives from localStorage', e);
    }
    return initialDives;
  });

  // Ad banner configuration with localStorage persistence
  const [adConfig, setAdConfig] = useState<AdBannerConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_AD);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.error('Error loading ad from localStorage', e);
    }
    return initialAdConfig;
  });

  // UI modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingDive, setEditingDive] = useState<DiveLog | null>(null);
  const [selectedDiveDetail, setSelectedDiveDetail] = useState<DiveLog | null>(null);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_DIVES, JSON.stringify(dives));
    } catch (e) {
      console.error('Failed to save dives to localStorage', e);
    }
  }, [dives]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_AD, JSON.stringify(adConfig));
    } catch (e) {
      console.error('Failed to save ad config to localStorage', e);
    }
  }, [adConfig]);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    localStorage.setItem(LOCAL_STORAGE_KEY_LANG, newLang);
  };

  const handleUnitSystemChange = (newSystem: UnitSystem) => {
    setUnitSystem(newSystem);
    localStorage.setItem(LOCAL_STORAGE_KEY_UNITS, newSystem);
  };

  // Next dive number calculation
  const nextDiveNumber = dives.length > 0
    ? Math.max(...dives.map((d) => d.diveNumber || 0)) + 1
    : 1;

  // Add or Update Dive
  const handleSaveDive = (dive: DiveLog) => {
    if (editingDive) {
      setDives((prev) => prev.map((d) => (d.id === dive.id ? dive : d)));
    } else {
      setDives((prev) => [dive, ...prev]);
    }
    setEditingDive(null);
  };

  const handleDeleteDive = (id: string) => {
    setDives((prev) => prev.filter((d) => d.id !== id));
  };

  const openNewDiveModal = (categoryOverride?: DiveCategory) => {
    setEditingDive(null);
    if (categoryOverride) {
      setSelectedCategoryTab(categoryOverride);
    }
    setIsFormModalOpen(true);
  };

  const openEditDiveModal = (dive: DiveLog) => {
    setEditingDive(dive);
    setIsFormModalOpen(true);
  };

  // Filter dives based on active tab and search query
  const filteredDives = dives.filter((dive) => {
    // Category match
    if (selectedCategoryTab !== 'all' && dive.category !== selectedCategoryTab) {
      return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSite = dive.siteName.toLowerCase().includes(q);
      const matchLoc = dive.location.toLowerCase().includes(q);
      const matchInstructor = dive.instructorName.toLowerCase().includes(q);
      const matchCourse = (dive.courseName || '').toLowerCase().includes(q);
      const matchNotes = (dive.notes || '').toLowerCase().includes(q);
      return matchSite || matchLoc || matchInstructor || matchCourse || matchNotes;
    }

    return true;
  });

  const instructionDivesCount = dives.filter((d) => d.category === 'instruction').length;
  const recreationalDivesCount = dives.filter((d) => d.category === 'recreational').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* App Header */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        unitSystem={unitSystem}
        onUnitSystemChange={handleUnitSystemChange}
        showCodeViewer={showCodeViewer}
        onToggleCodeViewer={() => setShowCodeViewer(!showCodeViewer)}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
        onAddNewDive={() => openNewDiveModal()}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5 flex flex-col">
        {/* Mobile Simulated Frame wrapper (if enabled) */}
        <div
          className={`w-full transition-all duration-300 mx-auto ${
            isMobileFrame
              ? 'max-w-[420px] bg-slate-900 border-[10px] border-slate-800 rounded-[44px] shadow-2xl p-4 my-4 overflow-hidden relative'
              : 'max-w-5xl'
          }`}
        >
          {/* Simulated Mobile Status Bar if in Mobile Mode */}
          {isMobileFrame && (
            <div className="flex items-center justify-between px-3 py-1 mb-2 text-slate-400 text-[11px] font-mono border-b border-slate-800/60 select-none">
              <span className="font-bold text-white">09:41</span>
              {/* Dynamic Island Pill */}
              <div className="w-18 h-4 bg-black rounded-full mx-auto flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-500/80 mr-1" />
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

          {/* Quick Stats telemetry bar */}
          <StatsBar dives={dives} language={language} unitSystem={unitSystem} />

          {/* Architecture & Source Code Explorer (Conditional) */}
          {showCodeViewer && (
            <MobileCodeViewer language={language} />
          )}

          {/* Editable Ad Banner Widget */}
          <AdBanner
            config={adConfig}
            onUpdateConfig={(newConfig) => setAdConfig(newConfig)}
            language={language}
          />

          {/* Categorization & Navigation Section */}
          <div className="mt-4 space-y-3">
            {/* Primary Category Segmented Control */}
            <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl grid grid-cols-2 gap-1.5" id="category-selector-tabs">
              {/* Tab 1: Buceos de Instrucción */}
              <button
                type="button"
                onClick={() => setSelectedCategoryTab('instruction')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  selectedCategoryTab === 'instruction'
                    ? 'bg-amber-950/80 border border-amber-500/50 text-amber-300 shadow-md ring-1 ring-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
                id="tab-instruction-dives"
              >
                <Award className={`w-4 h-4 ${selectedCategoryTab === 'instruction' ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{t.instructional}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-normal ${
                  selectedCategoryTab === 'instruction'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {instructionDivesCount}
                </span>
              </button>

              {/* Tab 2: Buceos Recreacionales */}
              <button
                type="button"
                onClick={() => setSelectedCategoryTab('recreational')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  selectedCategoryTab === 'recreational'
                    ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 shadow-md ring-1 ring-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
                id="tab-recreational-dives"
              >
                <Waves className={`w-4 h-4 ${selectedCategoryTab === 'recreational' ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{t.recreational}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-normal ${
                  selectedCategoryTab === 'recreational'
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {recreationalDivesCount}
                </span>
              </button>
            </div>

            {/* Section Description & Dedicated "Añadir nuevo buceo" button visible in both sections */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                  {selectedCategoryTab === 'instruction' ? (
                    <>
                      <Award className="w-4 h-4 text-amber-400" />
                      {t.instructional}
                    </>
                  ) : (
                    <>
                      <Waves className="w-4 h-4 text-cyan-400" />
                      {t.recreational}
                    </>
                  )}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedCategoryTab === 'instruction' 
                    ? t.instructionalDesc 
                    : t.recreationalDesc}
                </p>
              </div>

              {/* Explicit requirement: "Incluye un botón visible de 'Añadir nuevo buceo' en ambas secciones para permitir la creación de registros ilimitados." */}
              <button
                type="button"
                onClick={() => openNewDiveModal(selectedCategoryTab)}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 shrink-0 ${
                  selectedCategoryTab === 'instruction'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-950/40'
                    : 'bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 shadow-cyan-950/40'
                }`}
                id={`btn-add-dive-section-${selectedCategoryTab}`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t.addNewDive}</span>
              </button>
            </div>

            {/* Search Filter input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full text-xs bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                id="search-dives-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-white text-xs absolute right-3 top-1/2 -translate-y-1/2 px-1 py-0.5"
                >
                  &times;
                </button>
              )}
            </div>

            {/* List of Dive Records */}
            {filteredDives.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {filteredDives.map((dive) => (
                  <DiveCard
                    key={dive.id}
                    dive={dive}
                    onSelect={(d) => setSelectedDiveDetail(d)}
                    onEdit={(d) => openEditDiveModal(d)}
                    language={language}
                    unitSystem={unitSystem}
                  />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  {selectedCategoryTab === 'instruction' ? (
                    <Award className="w-7 h-7 text-amber-500/50" />
                  ) : (
                    <Waves className="w-7 h-7 text-cyan-500/50" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {t.noDivesFound}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    {t.startLogging}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openNewDiveModal(selectedCategoryTab)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  <PlusCircle className="w-4 h-4" />
                  {t.addNewDive}
                </button>
              </div>
            )}
          </div>

          {/* Floating Action Button for Mobile Touch Access */}
          <div className="fixed bottom-5 right-5 z-30 sm:hidden">
            <button
              type="button"
              onClick={() => openNewDiveModal(selectedCategoryTab)}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-sm rounded-full shadow-lg shadow-cyan-500/30 active:scale-95 transition-transform"
              id="mobile-floating-add-btn"
            >
              <PlusCircle className="w-5 h-5" />
              <span>{t.addNewDive}</span>
            </button>
          </div>
        </div>
      </main>

      {/* Modal Dialog: Add / Edit Dive Record */}
      <DiveFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingDive(null);
        }}
        onSave={handleSaveDive}
        initialDive={editingDive}
        defaultCategory={selectedCategoryTab === 'all' ? 'instruction' : selectedCategoryTab}
        nextDiveNumber={editingDive ? editingDive.diveNumber : nextDiveNumber}
        language={language}
        unitSystem={unitSystem}
      />

      {/* Modal Dialog: Full Dive Details Inspection */}
      <DiveDetailModal
        dive={selectedDiveDetail}
        onClose={() => setSelectedDiveDetail(null)}
        onEdit={(dive) => {
          setSelectedDiveDetail(null);
          openEditDiveModal(dive);
        }}
        onDelete={handleDeleteDive}
        language={language}
        unitSystem={unitSystem}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            {t.appTitle} &bull; Registro oficial de buceo para Android & iOS
          </span>
          <span className="font-mono text-[11px] text-slate-400">
            Firma táctil digital &bull; i18n &bull; Fotos &bull; {dives.length} registros
          </span>
        </div>
      </footer>
    </div>
  );
}
