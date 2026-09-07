import React, { useState } from 'react';
import { ExternalLink, Settings, Megaphone, Sparkles, X, Check } from 'lucide-react';
import { AdBannerConfig, SupportedLanguage } from '../types';
import { translations } from '../i18n/translations';

interface AdBannerProps {
  config: AdBannerConfig;
  onUpdateConfig: (newConfig: AdBannerConfig) => void;
  language: SupportedLanguage;
}

const SPONSOR_PRESETS: Partial<AdBannerConfig>[] = [
  {
    sponsorName: 'MARES DIVING',
    headline: 'Ordenadores Quad Air & Reguladores Dual',
    subtext: 'Máxima precisión bajo el agua con conectividad Bluetooth.',
    ctaText: 'Ver Equipos',
    targetUrl: 'https://www.mares.com',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
    badgeText: 'PATROCINADO',
  },
  {
    sponsorName: 'SCUBAPRO GEAR',
    headline: 'Aletas Seawing Nova & Trajes Everflex',
    subtext: 'La combinación perfecta de propulsión y aislamiento térmico.',
    ctaText: 'Descubrir',
    targetUrl: 'https://www.scubapro.com',
    imageUrl: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=400&q=80',
    badgeText: 'OFERTA PRO',
  },
  {
    sponsorName: 'CENTRO DE BUCEO LOCAL',
    headline: 'Salidas diarias a Arrecife & Cenotes',
    subtext: 'Buceos guiados en grupos reducidos, alquiler Nitrox y cursos PADI/SSI.',
    ctaText: 'Reservar Inmersión',
    targetUrl: 'https://example.com/dive-center',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80',
    badgeText: 'DIVE SHOP',
  },
];

export const AdBanner: React.FC<AdBannerProps> = ({
  config,
  onUpdateConfig,
  language,
}) => {
  const t = translations[language];
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<AdBannerConfig>(config);

  if (!config.isActive && !isEditing) {
    return (
      <div className="flex justify-center my-2">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="text-[11px] text-slate-500 hover:text-cyan-400 flex items-center gap-1 transition-colors"
        >
          <Megaphone className="w-3 h-3" />
          Activar banner de publicidad
        </button>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(editForm);
    setIsEditing(false);
  };

  const applyPreset = (preset: Partial<AdBannerConfig>) => {
    setEditForm((prev) => ({
      ...prev,
      ...preset,
    }));
  };

  return (
    <div className="w-full my-3" id="ad-banner-widget">
      {/* Visual Ad Card */}
      <div className="relative overflow-hidden rounded-xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-850 to-cyan-950/40 p-3 sm:p-4 shadow-md transition-all hover:border-cyan-500/50">
        <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
          {/* Ad Image / Icon */}
          <div className="flex items-center gap-3 min-w-0">
            {config.imageUrl ? (
              <img
                src={config.imageUrl}
                alt={config.sponsorName}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover border border-cyan-400/20 shrink-0"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
                <Megaphone className="w-6 h-6" />
              </div>
            )}

            {/* Content */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/90 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                  {config.badgeText || t.sponsored}
                </span>
                <span className="text-[11px] font-semibold text-slate-300 truncate">
                  {config.sponsorName}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white truncate leading-tight">
                {config.headline}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                {config.subtext}
              </p>
            </div>
          </div>

          {/* CTA & Controls */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <a
              href={config.targetUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <span>{config.ctaText || 'Ver Más'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Edit Banner Settings Button */}
            <button
              type="button"
              onClick={() => {
                setEditForm(config);
                setIsEditing(true);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-cyan-300 border border-slate-700 transition-colors"
              title={t.editAd}
              id="edit-ad-banner-btn"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Inline / Modal Editor for the Ad Banner */}
      {isEditing && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsEditing(false)}
        >
          <div
            className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  {t.customizeAd}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Presets */}
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">
                Cargar plantilla predefinida:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SPONSOR_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded border border-slate-700 transition-colors"
                  >
                    + {p.sponsorName}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    {t.sponsorName}
                  </label>
                  <input
                    type="text"
                    value={editForm.sponsorName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, sponsorName: e.target.value })
                    }
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Etiqueta / Badge
                  </label>
                  <input
                    type="text"
                    value={editForm.badgeText}
                    onChange={(e) =>
                      setEditForm({ ...editForm, badgeText: e.target.value })
                    }
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.adHeadline}
                </label>
                <input
                  type="text"
                  value={editForm.headline}
                  onChange={(e) =>
                    setEditForm({ ...editForm, headline: e.target.value })
                  }
                  className="w-full text-xs bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.adSubtext}
                </label>
                <input
                  type="text"
                  value={editForm.subtext}
                  onChange={(e) =>
                    setEditForm({ ...editForm, subtext: e.target.value })
                  }
                  className="w-full text-xs bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    {t.adCtaText}
                  </label>
                  <input
                    type="text"
                    value={editForm.ctaText}
                    onChange={(e) =>
                      setEditForm({ ...editForm, ctaText: e.target.value })
                    }
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    {t.adTargetUrl}
                  </label>
                  <input
                    type="url"
                    value={editForm.targetUrl}
                    onChange={(e) =>
                      setEditForm({ ...editForm, targetUrl: e.target.value })
                    }
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  {t.adImageUrl}
                </label>
                <input
                  type="url"
                  value={editForm.imageUrl || ''}
                  onChange={(e) =>
                    setEditForm({ ...editForm, imageUrl: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full text-xs bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="ad-active-checkbox"
                  checked={editForm.isActive}
                  onChange={(e) =>
                    setEditForm({ ...editForm, isActive: e.target.checked })
                  }
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-400"
                />
                <label
                  htmlFor="ad-active-checkbox"
                  className="text-xs text-slate-200 cursor-pointer"
                >
                  {t.adActive}
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  {t.saveAd}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
