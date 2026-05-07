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
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] mb-3.5 text-white/25">
        Bagikan artikel
      </p>
      <div className="flex flex-wrap gap-2">
        {/* X / Twitter */}
        <button
          onClick={handleTwitter}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-normal text-white transition-all hover:shadow-[0_0_18px_rgba(249,115,22,0.35)]"
          style={{
            background: "linear-gradient(135deg, #ea580c, #f97316)",
            border: "none",
          }}
        >
          <X className="w-3.5 h-3.5" />
          X / Twitter
        </button>

        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-normal transition-all text-white/65 hover:text-white hover:bg-white/[0.08]"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "0.5px solid rgba(255,255,255,0.10)",
          }}
        >
          <Share2 className="w-3.5 h-3.5" />
          WhatsApp
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-normal transition-all text-white/65 hover:text-white hover:bg-white/[0.08]"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "0.5px solid rgba(255,255,255,0.10)",
          }}
        >
          <Link2 className="w-3.5 h-3.5" />
          {copied ? "Tersalin ✓" : "Salin"}
        </button>
      </div>
    </div>
  );
}
