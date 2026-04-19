"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon" | "none";
  children: React.ReactNode;
}

const variants = {
  primary: "bg-gradient-to-r from-[#fb923c] to-[#fb7185] hover:from-[#f97316] hover:to-[#f43f5e] text-white shadow-[0_8px_30px_rgb(249,115,22,0.25)] hover:shadow-[0_8px_30px_rgb(249,115,22,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 border-0 rounded-full transition-all duration-300 font-semibold",
  outline: "bg-white border-2 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-700 shadow-sm rounded-full transition-all duration-300 active:scale-95 font-semibold",
  ghost:   "text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all duration-200 font-medium",
};

const sizes = {
  sm: "px-5 py-2 text-sm",
  md: "px-8 py-3 text-base",
  lg: "px-10 py-4 text-lg",
  icon: "p-3",
  none: "", // untuk styling manual/bawaan form
};

export function Button({ variant = "primary", size = "md", className, children, onClick, ...props }: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Tetesan air (Ripple effect) - memberikan tanggapan fisik atas klik yang premium
    const btn = btnRef.current;
    if (btn) {
      const ripple = document.createElement("span");
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.cssText = `
        position: absolute; border-radius: 50%; transform: scale(0);
        animation: ripple-btn 0.6s ease-out forwards;
        left: ${x}px; top: ${y}px; width: 20px; height: 20px;
        background: rgba(255,255,255,0.4); margin-left: -10px; margin-top: -10px;
        pointer-events: none;
      `;
      btn.style.position = "relative";
      btn.style.overflow = "hidden";
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    }
    onClick?.(e);
  };

  return (
    <>
      <style>{`
        @keyframes ripple-btn {
          to { transform: scale(25); opacity: 0; }
        }
      `}</style>
      <button
        ref={btnRef}
        className={cn(
          variants[variant], 
          sizes[size], 
          "cursor-pointer inline-flex items-center justify-center gap-2 select-none", 
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
