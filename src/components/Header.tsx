import React from 'react';
import { 
  Waves, 
  Globe, 
  Code2, 
  Smartphone, 
  Monitor, 
  PlusCircle, 
  Compass,
  Check,
  Gauge
} from 'lucide-react';
import { SupportedLanguage, UnitSystem } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  unitSystem: UnitSystem;
  onUnitSystemChange: (system: UnitSystem) => void;
  showCodeViewer: boolean;
  onToggleCodeViewer: () => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  onAddNewDive: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  unitSystem,
  onUnitSystemChange,
  showCodeViewer,
  onToggleCodeViewer,
  isMobileFrame,
  onToggleMobileFrame,
  onAddNewDive,
}) => {
  const t = translations[language];

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-3" id="app-header">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Logo & Branding */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/20">
            <Waves className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                {t.appTitle}
              </h1>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/80 font-bold">
                PRO LOG
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Add Dive Button in header for desktop */}
          <button
            type="button"
            onClick={onAddNewDive}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95"
            id="header-add-dive-btn"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{t.addNewDive}</span>
          </button>

          {/* Toggle Code Explorer */}
          <button
            type="button"
            onClick={onToggleCodeViewer}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              showCodeViewer
                ? 'bg-cyan-950 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Ver código fuente Flutter / React Native"
            id="toggle-code-view-btn"
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">{t.viewCode}</span>
            <span className="md:hidden">Código</span>
          </button>

          {/* Mobile frame toggle */}
          <button
            type="button"
            onClick={onToggleMobileFrame}
            className={`p-2 rounded-lg border transition-colors hidden sm:flex items-center justify-center ${
              isMobileFrame
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title={isMobileFrame ? t.expandedFrame : t.phoneFrame}
            id="toggle-device-frame-btn"
          >
            {isMobileFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          {/* Metric / Imperial Unit System Selector */}
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800" id="unit-system-switcher" title={t.unitSystem}>
            <Gauge className="w-3.5 h-3.5 text-slate-400 ml-1 mr-1 hidden xs:block" />
            <button
              type="button"
              onClick={() => onUnitSystemChange('metric')}
              className={`px-2 py-0.5 text-xs rounded font-bold transition-all ${
                unitSystem === 'metric'
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title={`${t.metricSystem} (${t.metricUnitsHint})`}
              id="header-metric-unit-btn"
            >
              <span className="hidden sm:inline">{t.metric}</span>
              <span className="sm:hidden">m / °C</span>
            </button>
            <button
              type="button"
              onClick={() => onUnitSystemChange('imperial')}
              className={`px-2 py-0.5 text-xs rounded font-bold transition-all ${
                unitSystem === 'imperial'
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title={`${t.imperialSystem} (${t.imperialUnitsHint})`}
              id="header-imperial-unit-btn"
            >
              <span className="hidden sm:inline">{t.imperial}</span>
              <span className="sm:hidden">ft / °F</span>
            </button>
          </div>

          {/* i18n Language Selector */}
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800" id="i18n-switcher">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1 mr-1.5" />
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => onLanguageChange(lang.code)}
                className={`px-2 py-0.5 text-xs rounded font-bold transition-all ${
                  language === lang.code
                    ? 'bg-cyan-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`Cambiar a ${lang.label}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
