"use client";

import { usePathname } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { path: "/survei",   label: "Diagnostik",  hint: "Isi Survei",      id: 1 },
  { path: "/peta",     label: "Pemetaan",    hint: "Lihat Peta",      id: 2 },
  { path: "/komitmen", label: "Komitmen",    hint: "Tanda Tangan",    id: 3 },
];

export function JourneyBar() {
  const pathname = usePathname();
  const currentStep = steps.find(s => s.path === pathname)?.id || 0;

  // Progress width between connectors
  const progressPct =
    currentStep === 1 ? "0%"
    : currentStep === 2 ? "50%"
    : currentStep === 3 ? "100%"
    : "0%";

  return (
    <div id="tour-journey-bar" className="w-full max-w-2xl mx-auto mb-10 mt-4 px-2">
      {/* Step track */}
      <div className="relative flex items-center justify-between">
        {/* Background connector */}
        <div className="absolute top-5 left-0 right-0 h-[2px] bg-gray-200 mx-[2.5rem]" />

        {/* Active connector */}
        <div
          className="absolute top-5 left-0 h-[2px] mx-[2.5rem] transition-all duration-700 ease-out"
          style={{
            width: progressPct,
            background: "linear-gradient(90deg, #f97316, #fb7185)",
          }}
        />

        {steps.map((step) => {
          const isActive  = currentStep === step.id;
          const isPassed  = currentStep > step.id;
          const isFuture  = currentStep < step.id;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 w-1/3">
              {/* Circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400 border-2",
                  isPassed
                    ? "bg-gradient-to-br from-orange-400 to-rose-500 border-orange-400 text-white shadow-lg shadow-orange-400/30"
                    : isActive
                    ? "bg-white border-orange-400 text-orange-500 shadow-lg shadow-orange-400/20 animate-pulse-ring"
                    : "bg-white border-gray-200 text-gray-400"
                )}
              >
                {isPassed
                  ? <Check className="w-5 h-5 stroke-[3]" />
                  : <span className="text-sm font-bold">{step.id}</span>
                }
              </div>

              {/* Label */}
              <div className="flex flex-col items-center text-center">
                <span
                  className={cn(
                    "text-xs font-bold tracking-wide transition-colors",
                    isActive  ? "text-orange-600"
                    : isPassed ? "text-orange-400"
                    : "text-gray-400"
                  )}
                >
                  {step.label}
                </span>
                {isActive && (
                  <span className="text-[10px] text-orange-400 font-medium mt-0.5 hidden sm:block">
                    ← Sekarang
                  </span>
                )}
                {isFuture && step.id === currentStep + 1 && (
                  <span className="text-[10px] text-gray-400 font-medium mt-0.5 hidden sm:block flex items-center gap-0.5">
                    Berikutnya <ArrowRight className="w-2.5 h-2.5 inline" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
