"use client";

import { usePathname } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { path: "/survei", label: "1. Diagnostik", id: 1 },
  { path: "/peta", label: "2. Pemetaan", id: 2 },
  { path: "/komitmen", label: "3. Komitmen", id: 3 },
];

export function JourneyBar() {
  const pathname = usePathname();

  // Find current step index (1-based)
  const currentStep = steps.find(s => s.path === pathname)?.id || 0;

  return (
    <div className="w-full max-w-2xl mx-auto mb-10 mt-6 relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full -z-10 px-8">
        <div 
          className="h-full bg-kominfo-blue transition-all duration-500 rounded-full"
          style={{ width: currentStep === 1 ? '10%' : currentStep === 2 ? '50%' : currentStep === 3 ? '100%' : '0%' }}
        />
      </div>
      
      <div className="flex justify-between items-center w-full px-4">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isPassed = currentStep > step.id;

          return (
            <div key={step.id} className="flex flex-col items-center bg-transparent group">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white border-2",
                  isPassed ? "bg-kominfo-blue border-kominfo-blue text-white" : 
                  isActive ? "border-kominfo-blue text-kominfo-blue border-4" : 
                  "border-gray-300 text-gray-400"
                )}
              >
                {isPassed ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold">{step.id}</span>}
              </div>
              <span className={cn(
                "text-xs sm:text-sm font-semibold mt-2 absolute translate-y-11 transition-colors bg-blue-50/80 backdrop-blur-sm px-2 py-1 rounded-md",
                isActive ? "text-kominfo-navy" : isPassed ? "text-kominfo-blue" : "text-gray-400"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
