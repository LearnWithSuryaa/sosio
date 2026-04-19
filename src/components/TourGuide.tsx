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
      nextBtnText: "Selanjutnya",
      prevBtnText: "Sebelumnya",
      doneBtnText: "Tutup",
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
      className="fixed bottom-5 right-5 z-[9999] w-9 h-9 bg-white border border-orange-200 text-orange-500 rounded-full shadow-[0_6px_20px_rgba(249,115,22,0.2)] flex items-center justify-center hover:bg-orange-50 hover:-translate-y-0.5 active:scale-95 transition-all group overflow-visible"
      aria-label={`Tampilkan Panduan ${pageName}`}
    >
      <HelpCircle className="w-4 h-4" />
      {/* Tooltip */}
      <div className="absolute right-[110%] top-1/2 -translate-y-1/2 bg-gray-900 text-white text-[11px] px-2.5 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
        Panduan
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-900" />
      </div>
    </button>
  );
}
