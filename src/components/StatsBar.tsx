import React from 'react';
import { Anchor, Compass, Clock, Award, Waves } from 'lucide-react';
import { DiveLog, SupportedLanguage, UnitSystem } from '../types';
import { translations } from '../i18n/translations';
import { formatDepth } from '../utils/units';

interface StatsBarProps {
  dives: DiveLog[];
  language: SupportedLanguage;
  unitSystem: UnitSystem;
}

export const StatsBar: React.FC<StatsBarProps> = ({ dives, language, unitSystem }) => {
  const t = translations[language];

  const totalDivesCount = dives.length;
  const instructionalCount = dives.filter((d) => d.category === 'instruction').length;
  const recreationalCount = dives.filter((d) => d.category === 'recreational').length;

  const totalMinutes = dives.reduce((acc, d) => acc + (Number(d.bottomTime) || 0), 0);
  const hours = Math.floor(totalMinutes / 60);
  const remainingMins = totalMinutes % 60;

  const maxDepth = dives.length > 0 
    ? Math.max(...dives.map((d) => Number(d.maxDepth) || 0)) 
    : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 my-3" id="stats-dashboard-bar">
      {/* Total Dives */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
          <Anchor className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-medium text-slate-400 block leading-tight">
            {t.totalDives}
          </span>
          <span className="text-xl font-extrabold text-white font-mono">
            {totalDivesCount}
          </span>
          <span className="text-[10px] text-slate-500 block">
            {recreationalCount} rec · {instructionalCount} inst
          </span>
        </div>
      </div>

      {/* Bottom Time */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-medium text-slate-400 block leading-tight">
            {t.totalBottomTime}
          </span>
          <span className="text-xl font-extrabold text-white font-mono">
            {hours}h {remainingMins}m
          </span>
          <span className="text-[10px] text-slate-500 block">
            {totalMinutes} {t.minutesShort} totales
          </span>
        </div>
      </div>

      {/* Max Depth */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-indigo-400 shrink-0">
          <Waves className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-medium text-slate-400 block leading-tight">
            {t.maxDepthReached}
          </span>
          <span className="text-xl font-extrabold text-cyan-300 font-mono">
            {formatDepth(maxDepth, unitSystem).display} <span className="text-sm font-normal text-cyan-400">{formatDepth(maxDepth, unitSystem).unit}</span>
          </span>
          <span className="text-[10px] text-slate-500 block">
            Récord personal
          </span>
        </div>
      </div>

      {/* Training / Certs */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-medium text-slate-400 block leading-tight">
            {t.instructionalShort}
          </span>
          <span className="text-xl font-extrabold text-emerald-300 font-mono">
            {instructionalCount}
          </span>
          <span className="text-[10px] text-slate-500 block">
            Inmersiones avaladas
          </span>
        </div>
      </div>
    </div>
  );
};
