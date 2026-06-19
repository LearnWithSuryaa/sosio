"use client";

import { forwardRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { PenTool, RefreshCw, AlertTriangle } from "lucide-react";

interface SignatureFieldProps {
  isLocked: boolean;
  error?: string;
  onBegin: () => void;
  onClear: () => void;
}

export const SignatureField = forwardRef<SignatureCanvas, SignatureFieldProps>(
  ({ isLocked, error, onBegin, onClear }, ref) => {
    return (
      <div id="tour-komitmen-signature" className="space-y-3">
        <label className="block text-sm font-bold text-text-dark/80">
          Tanda Tangan Digital <span className="text-red-400">*</span>
        </label>
        <div
          className={`border-2 rounded-2xl overflow-hidden relative transition-all ${isLocked ? "opacity-50 cursor-not-allowed" : error ? "border-red-500/40" : "border-black/10 hover:border-primary/30"}`}
          style={{
            background: isLocked
              ? "rgba(255,255,255,0.02)"
              : "rgba(255,255,255,0.03)",
          }}
          onClick={onBegin}
        >
          {isLocked && (
            <div className="absolute inset-0 z-10 backdrop-blur-[1px]" />
          )}
          {!isLocked && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center select-none"
              style={{ color: "rgba(55, 71, 79, 0.2)" }}
            >
              <PenTool className="w-8 h-8 mb-2" />
              <span className="text-lg font-bold uppercase tracking-widest">
                Tanda Tangan Di Sini
              </span>
            </div>
          )}
          <SignatureCanvas
            ref={ref}
            canvasProps={{
              className: "w-full h-48 cursor-crosshair relative z-10",
              style: { background: "transparent" },
            }}
            onBegin={onBegin}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="absolute bottom-3 right-3 z-20 text-xs font-semibold flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.12)",
              color: "rgba(55, 71, 79, 0.6)",
            }}
          >
            <RefreshCw className="w-3.5 h-3.5" /> Bersihkan
          </button>
        </div>
        {error && (
          <p className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertTriangle className="w-3.5 h-3.5" /> {error}
          </p>
        )}
      </div>
    );
  }
);
SignatureField.displayName = "SignatureField";
