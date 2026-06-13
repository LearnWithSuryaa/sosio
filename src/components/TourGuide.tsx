"use client";

import { useEffect, useState } from "react";
import { driver, DriveStep } from "driver.js";
import "driver.js/dist/driver.css";
import { HelpCircle } from "lucide-react";

interface TourGuideProps {
  steps: DriveStep[];
  pageName: string;
}

export function TourGuide({ steps, pageName }: TourGuideProps) {
  const [driverObj, setDriverObj] = useState<any>(null);

  useEffect(() => {
    // Prevent SSR errors, load driver only on client
    const d = driver({
      showProgress: true,
      nextBtnText: "Lanjut",
      prevBtnText: "Kembali",
      doneBtnText: "Selesai",
      progressText: "Langkah {{current}} dari {{total}}",
      popoverClass: "gesamega-tour-theme", // Custom theme via globals.css
      steps: steps,
      smoothScroll: true,
    });
    setDriverObj(d);
  }, [steps]);

  return (
    <button
      onClick={() => driverObj?.drive()}
      className="fixed bottom-8 right-8 z-9999 w-14 h-14 bg-white border border-slate-200 text-blue-600 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center hover:shadow-[0_12px_40px_rgb(0,0,0,0.16)] hover:-translate-y-1 active:scale-95 transition-all duration-300 group"
      aria-label={`Tampilkan Panduan ${pageName}`}
    >
      {/* Background fill on hover */}
      <div className="absolute inset-0 rounded-full bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Pulsing ring indicator */}
      <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-20" />

      <HelpCircle className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />

      {/* Tooltip - Clean Dark Style for contrast */}
      <div className="absolute right-[130%] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none">
        <div className="relative bg-slate-900 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 whitespace-nowrap">
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              Butuh Bantuan?
            </span>
            <span className="text-sm font-semibold text-white tracking-tight">
              Pelajari {pageName}
            </span>
          </div>

          {/* Decorative Arrow */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-slate-900 rotate-45 rounded-sm" />
        </div>
      </div>
    </button>
  );
}
