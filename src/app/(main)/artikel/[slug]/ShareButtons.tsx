"use client";

import { X, Share2, Link2 } from "lucide-react";
import { useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const handleTwitter = () => {
    const url = getUrl();
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const handleWhatsApp = () => {
    const url = getUrl();
    window.open(
      `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
      "_blank"
    );
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] mb-3.5 text-slate-400">
        Bagikan artikel
      </p>
      <div className="flex flex-wrap gap-2">
        {/* X / Twitter */}
        <button
          onClick={handleTwitter}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-normal text-white transition-all hover:shadow-md bg-linear-to-br from-info to-primary"
        >
          <X className="w-3.5 h-3.5" />
          X / Twitter
        </button>

        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-normal transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-50 bg-white border border-slate-200 shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5" />
          WhatsApp
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-normal transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-50 bg-white border border-slate-200 shadow-sm"
        >
          <Link2 className="w-3.5 h-3.5" />
          {copied ? "Tersalin ✓" : "Salin"}
        </button>
      </div>
    </div>
  );
}
