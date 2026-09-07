import React, { useRef, useState } from 'react';
import { Image as ImageIcon, Plus, X, UploadCloud, Sparkles, ZoomIn } from 'lucide-react';
import { DivePhoto, SupportedLanguage } from '../types';
import { translations } from '../i18n/translations';

interface PhotoUploaderProps {
  photos: DivePhoto[];
  onChange: (photos: DivePhoto[]) => void;
  language: SupportedLanguage;
}

const PRESET_DIVE_PHOTOS = [
  {
    title: 'Arrecife de Coral',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Tortuga Carey',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Rayo de luz en Cenote',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Profundidad Marina',
    url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80',
  },
];

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photos,
  onChange,
  language,
}) => {
  const t = translations[language];
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    Array.from(fileList).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          const newPhoto: DivePhoto = {
            id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            url: result,
            caption: file.name.replace(/\.[^/.]+$/, ''),
          };
          onChange([...photos, newPhoto]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const addPresetPhoto = (url: string, title: string) => {
    const newPhoto: DivePhoto = {
      id: `photo-preset-${Date.now()}`,
      url,
      caption: title,
    };
    onChange([...photos, newPhoto]);
  };

  const removePhoto = (id: string) => {
    onChange(photos.filter((p) => p.id !== id));
  };

  const updateCaption = (id: string, caption: string) => {
    onChange(
      photos.map((p) => (p.id === id ? { ...p, caption } : p))
    );
  };

  return (
    <div className="flex flex-col gap-3 w-full" id="dive-photo-uploader">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            {t.divePhotos}
            <span className="text-xs font-normal text-cyan-400 ml-1 px-2 py-0.5 bg-cyan-950/80 rounded-full border border-cyan-800/50">
              {photos.length} {photos.length === 1 ? 'foto' : 'fotos'}
            </span>
          </label>
          <p className="text-xs text-slate-400 mt-0.5">{t.photosDesc}</p>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-xs rounded-lg transition-colors shadow-sm"
          id="upload-photos-btn"
        >
          <Plus className="w-3.5 h-3.5" />
          {t.uploadPhotoBtn}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Drag & drop area if empty or drop zone */}
      {photos.length === 0 ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all ${
            isDragging
              ? 'border-cyan-400 bg-cyan-950/30'
              : 'border-slate-700 hover:border-slate-600 bg-slate-900/40 hover:bg-slate-900/60'
          }`}
        >
          <UploadCloud className="w-8 h-8 text-cyan-400/80 mb-2 animate-pulse" />
          <p className="text-xs font-medium text-slate-300 text-center">
            {t.dragDropText}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">PNG, JPG, WebP hasta 10MB</p>

          {/* Presets shortcut */}
          <div className="mt-3 pt-3 border-t border-slate-800 w-full flex flex-col items-center">
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-2">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              O agrega fotos de buceo de muestra:
            </span>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {PRESET_DIVE_PHOTOS.map((preset) => (
                <button
                  key={preset.title}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addPresetPhoto(preset.url, preset.title);
                  }}
                  className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
                >
                  + {preset.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative rounded-lg overflow-hidden border border-slate-700/80 bg-slate-900 shadow-sm aspect-video sm:aspect-square flex flex-col"
              >
                <img
                  src={photo.url}
                  alt={photo.caption || 'Foto de buceo'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedPreview(photo.url)}
                      className="p-1 rounded-full bg-slate-900/80 text-slate-200 hover:text-cyan-300 transition-colors"
                      title="Ampliar"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="p-1 rounded-full bg-rose-950/80 text-rose-300 hover:text-rose-100 transition-colors"
                      title="Eliminar foto"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={photo.caption || ''}
                    onChange={(e) => updateCaption(photo.id, e.target.value)}
                    placeholder="Pie de foto..."
                    className="w-full text-[10px] bg-slate-900/90 text-slate-200 border border-slate-700 rounded px-1.5 py-0.5 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            ))}

            {/* Quick add box */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg border-2 border-dashed border-slate-700 hover:border-cyan-500/80 bg-slate-900/40 hover:bg-cyan-950/20 aspect-video sm:aspect-square flex flex-col items-center justify-center text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <Plus className="w-5 h-5 mb-1" />
              <span className="text-[11px] font-medium">{t.uploadPhotoBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPreview && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPreview(null)}
        >
          <div className="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-xl bg-slate-900 border border-slate-700 p-1">
            <button
              type="button"
              onClick={() => setSelectedPreview(null)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-slate-950/80 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPreview}
              alt="Vista previa buceo"
              className="max-h-[80vh] w-auto object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
