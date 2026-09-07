import React from 'react';
import { 
  Waves, 
  Award, 
  MapPin, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Image as ImageIcon, 
  ArrowRight, 
  Eye, 
  Thermometer,
  Compass
} from 'lucide-react';
import { DiveLog, SupportedLanguage, UnitSystem } from '../types';
import { translations } from '../i18n/translations';
import { formatDepth, formatTemperature } from '../utils/units';

interface DiveCardProps {
  dive: DiveLog;
  onSelect: (dive: DiveLog) => void;
  onEdit: (dive: DiveLog) => void;
  language: SupportedLanguage;
  unitSystem: UnitSystem;
}

export const DiveCard: React.FC<DiveCardProps> = ({
  dive,
  onSelect,
  onEdit,
  language,
  unitSystem,
}) => {
  const t = translations[language];
  const isInstruction = dive.category === 'instruction';

  return (
    <div
      onClick={() => onSelect(dive)}
      className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 transition-all duration-200 shadow-sm hover:shadow-cyan-950/20 hover:shadow-lg cursor-pointer overflow-hidden flex flex-col justify-between"
      id={`dive-card-${dive.id}`}
    >
      {/* Top row: Number, Category tag, Date */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
              #{dive.diveNumber}
            </span>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 ${
                isInstruction
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                  : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
              }`}
            >
              {isInstruction ? (
                <>
                  <Award className="w-3 h-3 text-amber-400" />
                  {t.instructionalShort}
                </>
              ) : (
                <>
                  <Waves className="w-3 h-3 text-cyan-400" />
                  {t.recreationalShort}
                </>
              )}
            </span>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
            <Calendar className="w-3 h-3 text-slate-500" />
            {dive.date}
          </div>
        </div>

        {/* Site Name & Location */}
        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
          {dive.siteName}
        </h3>
        {dive.location && (
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 line-clamp-1">
            <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
            {dive.location}
          </p>
        )}

        {/* If instruction: course name badge */}
        {isInstruction && dive.courseName && (
          <div className="mt-2 text-[11px] font-medium text-amber-200/90 bg-amber-950/40 border border-amber-800/40 px-2 py-1 rounded-lg line-clamp-1">
            {dive.courseName}
          </div>
        )}

        {/* Primary Diving Telemetry Matrix */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-center">
          <div className="bg-slate-950/50 rounded-lg p-1.5 border border-slate-800/60">
            <span className="text-[10px] uppercase text-slate-400 block">{t.maxDepth}</span>
            <span className="text-sm font-bold text-cyan-300 font-mono">
              {formatDepth(dive.maxDepth, unitSystem).display}{' '}
              <span className="text-[10px] font-normal text-cyan-500">{formatDepth(dive.maxDepth, unitSystem).unit}</span>
            </span>
          </div>

          <div className="bg-slate-950/50 rounded-lg p-1.5 border border-slate-800/60">
            <span className="text-[10px] uppercase text-slate-400 block">{t.bottomTime}</span>
            <span className="text-sm font-bold text-blue-300 font-mono">
              {dive.bottomTime} <span className="text-[10px] font-normal text-blue-500">min</span>
            </span>
          </div>

          <div className="bg-slate-950/50 rounded-lg p-1.5 border border-slate-800/60">
            <span className="text-[10px] uppercase text-slate-400 block">{t.temperature}</span>
            <span className="text-sm font-bold text-emerald-300 font-mono">
              {formatTemperature(dive.temperature, unitSystem).display}{' '}
              <span className="text-[10px] font-normal text-emerald-500">{formatTemperature(dive.temperature, unitSystem).unit}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer info: Instructor signature stamp & photos indicator */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {dive.instructorSignature ? (
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" />
              <span className="truncate max-w-[120px]">{dive.instructorName || 'Firmado'}</span>
            </div>
          ) : (
            <span className="text-[10px] text-slate-500 italic">Sin firma</span>
          )}

          {dive.photos && dive.photos.length > 0 && (
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <ImageIcon className="w-3 h-3 text-cyan-400" />
              <span>{dive.photos.length}</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(dive);
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300"
        >
          <span>{t.viewDetails}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
