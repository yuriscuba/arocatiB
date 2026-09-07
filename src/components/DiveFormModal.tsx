import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Waves, 
  Clock, 
  MapPin, 
  Thermometer, 
  Scale, 
  Eye, 
  FileText, 
  UserCheck, 
  Compass, 
  Award, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { DiveLog, DiveCategory, WaterType, SuitType, SupportedLanguage, UnitSystem } from '../types';
import { translations } from '../i18n/translations';
import { SignaturePad } from './SignaturePad';
import { PhotoUploader } from './PhotoUploader';
import { 
  metersToFeet, 
  feetToMeters, 
  celsiusToFahrenheit, 
  fahrenheitToCelsius, 
  kgToLbs, 
  lbsToKg, 
  barToPsi, 
  psiToBar, 
  M_TO_FT 
} from '../utils/units';

interface DiveFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dive: DiveLog) => void;
  initialDive?: DiveLog | null;
  defaultCategory?: DiveCategory;
  nextDiveNumber: number;
  language: SupportedLanguage;
  unitSystem: UnitSystem;
}

export const DiveFormModal: React.FC<DiveFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDive,
  defaultCategory = 'recreational',
  nextDiveNumber,
  language,
  unitSystem,
}) => {
  const t = translations[language];

  // Active form unit system (user can toggle while entering data)
  const [formUnitSystem, setFormUnitSystem] = useState<UnitSystem>(unitSystem);

  // Initialize form state matching the current formUnitSystem
  const [formData, setFormData] = useState<DiveLog>(() => {
    if (initialDive) {
      if (unitSystem === 'imperial') {
        return {
          ...initialDive,
          maxDepth: metersToFeet(initialDive.maxDepth),
          temperature: celsiusToFahrenheit(initialDive.temperature),
          weight: kgToLbs(initialDive.weight),
          visibility: Math.round(initialDive.visibility * M_TO_FT),
          startingPressure: initialDive.startingPressure ? barToPsi(initialDive.startingPressure) : 3000,
          endingPressure: initialDive.endingPressure ? barToPsi(initialDive.endingPressure) : 725,
        };
      }
      return initialDive;
    }

    const today = new Date().toISOString().split('T')[0];

    return {
      id: `dive-${Date.now()}`,
      diveNumber: nextDiveNumber,
      category: defaultCategory,
      date: today,
      timeIn: '10:00',
      timeOut: '10:45',
      siteName: '',
      location: '',
      maxDepth: unitSystem === 'imperial' ? 60 : 18,
      bottomTime: 45,
      waterType: 'salt',
      temperature: unitSystem === 'imperial' ? 79 : 26,
      weight: unitSystem === 'imperial' ? 8.8 : 4,
      suitType: 'wetsuit_3mm',
      visibility: unitSystem === 'imperial' ? 65 : 20,
      startingPressure: unitSystem === 'imperial' ? 3000 : 200,
      endingPressure: unitSystem === 'imperial' ? 725 : 50,
      gasMix: 'Aire 21%',
      courseName: defaultCategory === 'instruction' ? 'Open Water Diver' : '',
      instructorName: '',
      instructorNumber: '',
      instructorSignature: '',
      photos: [],
      notes: '',
      buddies: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  // Keep form unit system synced if parent prop changes
  const handleToggleFormUnit = (newSystem: UnitSystem) => {
    if (newSystem === formUnitSystem) return;

    if (newSystem === 'imperial') {
      // Convert current metric values to imperial
      setFormData((prev) => ({
        ...prev,
        maxDepth: metersToFeet(Number(prev.maxDepth) || 0),
        temperature: celsiusToFahrenheit(Number(prev.temperature) || 0),
        weight: kgToLbs(Number(prev.weight) || 0),
        visibility: Math.round((Number(prev.visibility) || 0) * M_TO_FT),
        startingPressure: prev.startingPressure ? barToPsi(Number(prev.startingPressure)) : 3000,
        endingPressure: prev.endingPressure ? barToPsi(Number(prev.endingPressure)) : 725,
      }));
    } else {
      // Convert current imperial values to metric
      setFormData((prev) => ({
        ...prev,
        maxDepth: feetToMeters(Number(prev.maxDepth) || 0),
        temperature: fahrenheitToCelsius(Number(prev.temperature) || 0),
        weight: lbsToKg(Number(prev.weight) || 0),
        visibility: feetToMeters(Number(prev.visibility) || 0),
        startingPressure: prev.startingPressure ? psiToBar(Number(prev.startingPressure)) : 200,
        endingPressure: prev.endingPressure ? psiToBar(Number(prev.endingPressure)) : 50,
      }));
    }
    setFormUnitSystem(newSystem);
  };

  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.siteName.trim()) {
      setValidationError('Por favor ingresa el nombre del sitio de buceo.');
      return;
    }

    if (!formData.instructorName.trim()) {
      setValidationError('Por favor ingresa el nombre del guía o instructor que valida la inmersión.');
      return;
    }

    // Always normalize to metric before persisting
    const normalizedMaxDepth = formUnitSystem === 'imperial'
      ? feetToMeters(Number(formData.maxDepth) || 0)
      : Number(formData.maxDepth) || 0;

    const normalizedTemperature = formUnitSystem === 'imperial'
      ? fahrenheitToCelsius(Number(formData.temperature) || 0)
      : Number(formData.temperature) || 0;

    const normalizedWeight = formUnitSystem === 'imperial'
      ? lbsToKg(Number(formData.weight) || 0)
      : Number(formData.weight) || 0;

    const normalizedVisibility = formUnitSystem === 'imperial'
      ? feetToMeters(Number(formData.visibility) || 0)
      : Number(formData.visibility) || 0;

    const normalizedStartPressure = formData.startingPressure
      ? (formUnitSystem === 'imperial' ? psiToBar(Number(formData.startingPressure)) : Number(formData.startingPressure))
      : undefined;

    const normalizedEndPressure = formData.endingPressure
      ? (formUnitSystem === 'imperial' ? psiToBar(Number(formData.endingPressure)) : Number(formData.endingPressure))
      : undefined;

    onSave({
      ...formData,
      maxDepth: normalizedMaxDepth,
      bottomTime: Number(formData.bottomTime) || 0,
      temperature: normalizedTemperature,
      weight: normalizedWeight,
      visibility: normalizedVisibility,
      startingPressure: normalizedStartPressure,
      endingPressure: normalizedEndPressure,
      updatedAt: new Date().toISOString(),
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
      id="dive-form-modal-overlay"
    >
      <div
        className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        id="dive-form-modal-container"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg border ${
              formData.category === 'instruction'
                ? 'bg-amber-950/70 border-amber-500/40 text-amber-400'
                : 'bg-cyan-950/70 border-cyan-500/40 text-cyan-400'
            }`}>
              {formData.category === 'instruction' ? (
                <Award className="w-5 h-5" />
              ) : (
                <Waves className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                {initialDive ? t.editDive : t.addNewDive}
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                  #{formData.diveNumber}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {formData.category === 'instruction' ? t.instructionalDesc : t.recreationalDesc}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto px-5 py-4 space-y-6 flex-1 text-slate-200">
          {validationError && (
            <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-200 text-xs rounded-lg flex items-center justify-between">
              <span>{validationError}</span>
              <button
                type="button"
                onClick={() => setValidationError(null)}
                className="text-rose-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Section 0: Category Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              {t.category}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, category: 'instruction' })}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all text-left ${
                  formData.category === 'instruction'
                    ? 'bg-amber-950/40 border-amber-500 text-white ring-1 ring-amber-500'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Award className={`w-5 h-5 shrink-0 ${formData.category === 'instruction' ? 'text-amber-400' : 'text-slate-500'}`} />
                <div>
                  <div className="text-xs font-bold text-slate-100">{t.instructional}</div>
                  <div className="text-[11px] text-slate-400">Cursos & Certificaciones</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, category: 'recreational' })}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all text-left ${
                  formData.category === 'recreational'
                    ? 'bg-cyan-950/40 border-cyan-500 text-white ring-1 ring-cyan-500'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Waves className={`w-5 h-5 shrink-0 ${formData.category === 'recreational' ? 'text-cyan-400' : 'text-slate-500'}`} />
                <div>
                  <div className="text-xs font-bold text-slate-100">{t.recreational}</div>
                  <div className="text-[11px] text-slate-400">Placer & Exploración</div>
                </div>
              </button>
            </div>
          </div>

          {/* Section 1: General Info */}
          <div className="space-y-3 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {t.generalInfo}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.diveNumber}
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.diveNumber}
                  onChange={(e) => setFormData({ ...formData, diveNumber: parseInt(e.target.value) || 1 })}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.date}
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              {formData.category === 'instruction' && (
                <div>
                  <label className="text-xs text-amber-300 font-medium block mb-1">
                    {t.courseName}
                  </label>
                  <input
                    type="text"
                    value={formData.courseName || ''}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    placeholder={t.courseNamePlaceholder}
                    className="w-full text-xs bg-slate-900 border border-amber-600/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.siteName} *
                </label>
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  placeholder={t.siteNamePlaceholder}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.location}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder={t.locationPlaceholder}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Entry & Exit Times */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.timeIn}
                </label>
                <input
                  type="time"
                  value={formData.timeIn}
                  onChange={(e) => setFormData({ ...formData, timeIn: e.target.value })}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.timeOut}
                </label>
                <input
                  type="time"
                  value={formData.timeOut}
                  onChange={(e) => setFormData({ ...formData, timeOut: e.target.value })}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Physics & Profile (Depth, Bottom Time, Water, Temp, Weight, Suit, Visibility) */}
          <div className="space-y-3 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                {t.profileAndConditions}
              </h4>
              {/* In-form Unit Toggle */}
              <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-700 text-[11px]" id="modal-unit-toggle">
                <button
                  type="button"
                  onClick={() => handleToggleFormUnit('metric')}
                  className={`px-2 py-0.5 rounded font-bold transition-all ${
                    formUnitSystem === 'metric'
                      ? 'bg-cyan-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  id="modal-unit-metric-btn"
                >
                  {t.metric} (m, °C, kg, bar)
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleFormUnit('imperial')}
                  className={`px-2 py-0.5 rounded font-bold transition-all ${
                    formUnitSystem === 'imperial'
                      ? 'bg-cyan-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  id="modal-unit-imperial-btn"
                >
                  {t.imperial} (ft, °F, lbs, psi)
                </button>
              </div>
            </div>

            {/* Max Depth & Bottom Time */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.maxDepth} ({formUnitSystem === 'imperial' ? t.feetShort : t.metersShort}) *
                </label>
                <input
                  type="number"
                  step={formUnitSystem === 'imperial' ? '1' : '0.1'}
                  min="1"
                  max={formUnitSystem === 'imperial' ? '400' : '120'}
                  value={formData.maxDepth}
                  onChange={(e) => setFormData({ ...formData, maxDepth: parseFloat(e.target.value) || 0 })}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.bottomTime} *
                </label>
                <input
                  type="number"
                  min="1"
                  max="300"
                  value={formData.bottomTime}
                  onChange={(e) => setFormData({ ...formData, bottomTime: parseInt(e.target.value) || 0 })}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.temperature} ({formUnitSystem === 'imperial' ? '°F' : '°C'})
                </label>
                <input
                  type="number"
                  step="1"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) || 0 })}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.ballastWeight} ({formUnitSystem === 'imperial' ? t.poundsShort : 'kg'})
                </label>
                <input
                  type="number"
                  step={formUnitSystem === 'imperial' ? '1' : '0.5'}
                  min="0"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Water Type & Visibility & Suit Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.waterType}
                </label>
                <select
                  value={formData.waterType}
                  onChange={(e) => setFormData({ ...formData, waterType: e.target.value as WaterType })}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="salt">{t.saltWater}</option>
                  <option value="fresh">{t.freshWater}</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.visibility} ({formUnitSystem === 'imperial' ? t.feetShort : t.metersShort})
                </label>
                <input
                  type="number"
                  min="1"
                  max={formUnitSystem === 'imperial' ? '330' : '100'}
                  value={formData.visibility}
                  onChange={(e) => setFormData({ ...formData, visibility: parseInt(e.target.value) || 0 })}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.suitType}
                </label>
                <select
                  value={formData.suitType}
                  onChange={(e) => setFormData({ ...formData, suitType: e.target.value as SuitType })}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="rashguard">{t.rashguard}</option>
                  <option value="shorty_2mm">{t.shorty_2mm}</option>
                  <option value="wetsuit_3mm">{t.wetsuit_3mm}</option>
                  <option value="wetsuit_5mm">{t.wetsuit_5mm}</option>
                  <option value="wetsuit_7mm">{t.wetsuit_7mm}</option>
                  <option value="semidry">{t.semidry}</option>
                  <option value="drysuit">{t.drysuit}</option>
                </select>
              </div>
            </div>

            {/* Tank Pressures & Gas Mix */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.startPressure} ({formUnitSystem === 'imperial' ? t.psiShort : t.barShort})
                </label>
                <input
                  type="number"
                  value={formData.startingPressure || (formUnitSystem === 'imperial' ? 3000 : 200)}
                  onChange={(e) => setFormData({ ...formData, startingPressure: parseInt(e.target.value) || 0 })}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.endPressure} ({formUnitSystem === 'imperial' ? t.psiShort : t.barShort})
                </label>
                <input
                  type="number"
                  value={formData.endingPressure || (formUnitSystem === 'imperial' ? 725 : 50)}
                  onChange={(e) => setFormData({ ...formData, endingPressure: parseInt(e.target.value) || 0 })}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.gasMix}
                </label>
                <input
                  type="text"
                  value={formData.gasMix || 'Aire 21%'}
                  onChange={(e) => setFormData({ ...formData, gasMix: e.target.value })}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Multiple Photos Uploader */}
          <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
            <PhotoUploader
              photos={formData.photos}
              onChange={(photos) => setFormData({ ...formData, photos })}
              language={language}
            />
          </div>

          {/* Section 4: Notes & Buddies */}
          <div className="space-y-3 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              {t.notesTitle}
            </h4>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                {t.notesTitle}
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={t.notesPlaceholder}
                className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                {t.buddiesTitle}
              </label>
              <input
                type="text"
                value={formData.buddies || ''}
                onChange={(e) => setFormData({ ...formData, buddies: e.target.value })}
                placeholder={t.buddiesPlaceholder}
                className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Section 5: Instructor Validation & Tactile Digital Signature */}
          <div className="space-y-3 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" />
              {t.validationAndSignature}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.instructorName} *
                </label>
                <input
                  type="text"
                  value={formData.instructorName}
                  onChange={(e) => setFormData({ ...formData, instructorName: e.target.value })}
                  placeholder={t.instructorNamePlaceholder}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.instructorNumber}
                </label>
                <input
                  type="text"
                  value={formData.instructorNumber}
                  onChange={(e) => setFormData({ ...formData, instructorNumber: e.target.value })}
                  placeholder={t.instructorNumberPlaceholder}
                  className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Tactile Signature Pad */}
            <SignaturePad
              value={formData.instructorSignature}
              onChange={(sig) => setFormData({ ...formData, instructorSignature: sig })}
              language={language}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800 sticky bottom-0 bg-slate-900/95 py-2 -mx-5 px-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
              id="save-dive-btn"
            >
              <Check className="w-4 h-4" />
              {t.saveDive}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
