import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  Waves, 
  Award, 
  Thermometer, 
  Scale, 
  Compass, 
  CheckCircle2, 
  ShieldCheck, 
  Edit3, 
  Trash2, 
  Share2, 
  ZoomIn,
  Users
} from 'lucide-react';
import { DiveLog, SupportedLanguage, UnitSystem } from '../types';
import { translations } from '../i18n/translations';
import { 
  formatDepth, 
  formatTemperature, 
  formatWeight, 
  formatVisibility, 
  formatPressure 
} from '../utils/units';

interface DiveDetailModalProps {
  dive: DiveLog | null;
  onClose: () => void;
  onEdit: (dive: DiveLog) => void;
  onDelete: (id: string) => void;
  language: SupportedLanguage;
  unitSystem: UnitSystem;
}

export const DiveDetailModal: React.FC<DiveDetailModalProps> = ({
  dive,
  onClose,
  onEdit,
  onDelete,
  language,
  unitSystem,
}) => {
  const t = translations[language];
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);

  if (!dive) return null;

  const isInstruction = dive.category === 'instruction';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
      id="dive-detail-modal-overlay"
    >
      <div
        className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        id="dive-detail-modal-container"
      >
        {/* Header with dive image backdrop or gradient */}
        <div className="relative bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${
              isInstruction
                ? 'bg-amber-950/60 border-amber-500/50 text-amber-400'
                : 'bg-cyan-950/60 border-cyan-500/50 text-cyan-400'
            }`}>
              {isInstruction ? <Award className="w-6 h-6" /> : <Waves className="w-6 h-6" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                  Buceo #{dive.diveNumber}
                </span>
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isInstruction 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                }`}>
                  {isInstruction ? t.instructionalShort : t.recreationalShort}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                {dive.siteName}
              </h2>
              {dive.location && (
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  {dive.location}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(dive);
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title={t.editDive}
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('¿Seguro que deseas eliminar este registro de buceo?')) {
                  onDelete(dive.id);
                  onClose();
                }
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title={t.deleteDive}
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto px-5 py-4 space-y-5 flex-1 text-slate-200">
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
                {t.maxDepth}
              </span>
              <span className="text-2xl font-black text-cyan-300 font-mono mt-0.5 block">
                {formatDepth(dive.maxDepth, unitSystem).display}{' '}
                <span className="text-sm font-normal text-cyan-500">{formatDepth(dive.maxDepth, unitSystem).unit}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                ≈ {formatDepth(dive.maxDepth, unitSystem === 'metric' ? 'imperial' : 'metric').display}{' '}
                {formatDepth(dive.maxDepth, unitSystem === 'metric' ? 'imperial' : 'metric').unit}
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
                {t.bottomTime}
              </span>
              <span className="text-2xl font-black text-blue-300 font-mono mt-0.5 block">
                {dive.bottomTime} <span className="text-sm font-normal text-blue-500">{t.minutesShort}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                {dive.timeIn} - {dive.timeOut}
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
                {t.temperature}
              </span>
              <span className="text-2xl font-black text-emerald-300 font-mono mt-0.5 block">
                {formatTemperature(dive.temperature, unitSystem).display}{' '}
                <span className="text-sm font-normal text-emerald-500">{formatTemperature(dive.temperature, unitSystem).unit}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                ≈ {formatTemperature(dive.temperature, unitSystem === 'metric' ? 'imperial' : 'metric').display}{' '}
                {formatTemperature(dive.temperature, unitSystem === 'metric' ? 'imperial' : 'metric').unit}
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
                {t.visibility}
              </span>
              <span className="text-2xl font-black text-indigo-300 font-mono mt-0.5 block">
                {formatVisibility(dive.visibility, unitSystem).display}{' '}
                <span className="text-sm font-normal text-indigo-500">{formatVisibility(dive.visibility, unitSystem).unit}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                ≈ {formatVisibility(dive.visibility, unitSystem === 'metric' ? 'imperial' : 'metric').display}{' '}
                {formatVisibility(dive.visibility, unitSystem === 'metric' ? 'imperial' : 'metric').unit}
              </span>
            </div>
          </div>

          {/* If instruction: course specialty banner */}
          {isInstruction && dive.courseName && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Certificación / Ejercicio:</strong> {dive.courseName}
              </span>
            </div>
          )}

          {/* Condition & Equipment Matrix */}
          <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Detalles de Inmersión y Equipo
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
              <div>
                <span className="text-slate-400 block">{t.date}</span>
                <span className="font-medium text-white flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  {dive.date}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block">Horario Entrada / Salida</span>
                <span className="font-medium text-white flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {dive.timeIn} - {dive.timeOut}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block">{t.waterType}</span>
                <span className="font-medium text-white mt-0.5 block">
                  {dive.waterType === 'salt' ? t.saltWater : t.freshWater}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block">{t.ballastWeight}</span>
                <span className="font-medium text-white mt-0.5 block font-mono">
                  {formatWeight(dive.weight, unitSystem).display} {formatWeight(dive.weight, unitSystem).unit}{' '}
                  <span className="text-slate-500 text-[10px]">
                    ({formatWeight(dive.weight, unitSystem === 'metric' ? 'imperial' : 'metric').display}{' '}
                    {formatWeight(dive.weight, unitSystem === 'metric' ? 'imperial' : 'metric').unit})
                  </span>
                </span>
              </div>

              <div>
                <span className="text-slate-400 block">{t.suitType}</span>
                <span className="font-medium text-white mt-0.5 block capitalize">
                  {dive.suitType.replace('_', ' ')}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block">Gas & {t.tankPressure}</span>
                <span className="font-medium text-white mt-0.5 block font-mono">
                  {dive.gasMix || 'Aire'} (
                  {formatPressure(dive.startingPressure || 200, unitSystem).display}
                  {formatPressure(dive.startingPressure || 200, unitSystem).unit} &rarr;{' '}
                  {formatPressure(dive.endingPressure || 50, unitSystem).display}
                  {formatPressure(dive.endingPressure || 50, unitSystem).unit}
                  )
                </span>
              </div>
            </div>
          </div>

          {/* Photos Carousel / Gallery */}
          {dive.photos && dive.photos.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  Fotos Exclusivas ({dive.photos.length})
                </h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {dive.photos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    onClick={() => {
                      setActivePhotoIndex(idx);
                      setIsPhotoZoomed(true);
                    }}
                    className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video cursor-pointer"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || 'Foto de buceo'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                    {photo.caption && (
                      <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 backdrop-blur-xs p-1 text-[10px] text-slate-300 truncate">
                        {photo.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes & Buddies */}
          {(dive.notes || dive.buddies) && (
            <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-4 space-y-3">
              {dive.notes && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    {t.notesTitle}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                    {dive.notes}
                  </p>
                </div>
              )}

              {dive.buddies && (
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs">
                  <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-400 font-medium">Compañeros:</span>
                  <span className="text-slate-200">{dive.buddies}</span>
                </div>
              )}
            </div>
          )}

          {/* Instructor Validation & Digital Signature Certificate Box */}
          <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/30 p-4 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-3 border-b border-cyan-500/20 pb-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {t.validationAndSignature}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold">
                {t.verifiedStamp}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400">{t.instructorName}:</span>
                <p className="text-sm font-bold text-white">
                  {dive.instructorName || 'Instructor no registrado'}
                </p>
                {dive.instructorNumber && (
                  <p className="text-xs text-cyan-400 font-mono">
                    Acreditación: {dive.instructorNumber}
                  </p>
                )}
                <p className="text-[10px] text-slate-500 pt-1">
                  Validez formal conforme a estándares de registro PADI / SSI / CMAS.
                </p>
              </div>

              {/* Digital Signature Display */}
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">
                  Firma Digital Verificada
                </span>
                {dive.instructorSignature ? (
                  <img
                    src={dive.instructorSignature}
                    alt="Firma del Instructor"
                    className="h-16 w-auto max-w-full object-contain filter invert-0 drop-shadow-sm"
                  />
                ) : (
                  <span className="text-xs text-slate-500 italic py-3">
                    Sin firma digital capturada
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Registro ID: {dive.id}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>

      {/* Lightbox for Zoomed Photo */}
      {isPhotoZoomed && dive.photos && (
        <div
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsPhotoZoomed(false)}
        >
          <button
            type="button"
            onClick={() => setIsPhotoZoomed(false)}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-slate-900/80 hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={dive.photos[activePhotoIndex]?.url}
            alt="Foto de buceo ampliada"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};
