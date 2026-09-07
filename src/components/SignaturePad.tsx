import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Check, PenTool, CheckCircle2, ShieldCheck } from 'lucide-react';
import { translations } from '../i18n/translations';
import { SupportedLanguage } from '../types';

interface SignaturePadProps {
  value: string; // Base64 data URL
  onChange: (dataUrl: string) => void;
  language: SupportedLanguage;
  disabled?: boolean;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  value,
  onChange,
  language,
  disabled = false,
}) => {
  const t = translations[language];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(!!value);
  const [penColor, setPenColor] = useState('#0284c7'); // Ocean blue signature ink

  // Setup canvas resolution and context
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = penColor;

    // If there's an existing signature image, draw it
    if (value) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        setHasContent(true);
      };
      img.src = value;
    }
  };

  useEffect(() => {
    initCanvas();
    // Re-init on resize
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update strokeStyle if penColor changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = penColor;
    }
  }, [penColor]);

  // Pointer coordinate calculation helper
  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y); // For dots
    ctx.stroke();
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasContent(true);
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.releasePointerCapture(e.pointerId);
    setIsDrawing(false);

    // Save as PNG
    const dataUrl = canvas.toDataURL('image/png');
    onChange(dataUrl);
  };

  const handleClear = () => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    setHasContent(false);
    onChange('');
  };

  return (
    <div className="flex flex-col gap-2 w-full" id="instructor-signature-container">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5 font-medium text-slate-300">
          <PenTool className="w-3.5 h-3.5 text-cyan-400" />
          {t.signatureInstruction}
        </span>
        
        <div className="flex items-center gap-2">
          {/* Color picker pills */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-md border border-slate-800">
            {[
              { color: '#0284c7', label: 'Cyan / Ocean' },
              { color: '#0f172a', label: 'Dark Navy' },
              { color: '#10b981', label: 'Emerald' },
            ].map((c) => (
              <button
                key={c.color}
                type="button"
                onClick={() => setPenColor(c.color)}
                className={`w-4 h-4 rounded-full transition-transform ${
                  penColor === c.color ? 'scale-125 ring-2 ring-cyan-400' : 'opacity-70'
                }`}
                style={{ backgroundColor: c.color }}
                title={c.label}
              />
            ))}
          </div>

          {hasContent && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 rounded transition-colors"
              id="clear-signature-btn"
            >
              <RotateCcw className="w-3 h-3" />
              {t.clearSignature}
            </button>
          )}
        </div>
      </div>

      <div className="relative rounded-xl border border-slate-700 bg-slate-900/90 shadow-inner overflow-hidden">
        {/* Subtle grid pattern / signature baseline */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute bottom-6 left-6 right-6 border-b border-dashed border-slate-700 pointer-events-none">
          <span className="absolute -top-4 right-0 text-[10px] tracking-wider uppercase text-slate-500 font-mono">
            X ____________________
          </span>
        </div>

        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          className="w-full h-36 touch-none cursor-crosshair relative z-10"
          style={{ touchAction: 'none' }}
        />

        {/* Verification stamp pill */}
        {hasContent && (
          <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] font-medium backdrop-blur-sm shadow-sm animate-fade-in">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.signatureCaptured}</span>
          </div>
        )}
      </div>
      <p className="text-[11px] text-slate-400">
        Firma táctil digital vinculada permanentemente al registro del buceo para certificar horas de fondo y ejercicios.
      </p>
    </div>
  );
};
