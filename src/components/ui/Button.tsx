"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "glow";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variants = {
  primary: "btn-glow-primary rounded-xl",
  outline: "btn-glass-outline rounded-xl",
  ghost:   "text-sky-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200",
  glow:    "btn-glow-primary rounded-xl ring-2 ring-sky-400/30 hover:ring-sky-400/60",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({ variant = "primary", size = "md", className, children, onClick, ...props }: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Ripple effect
    const btn = btnRef.current;
    if (btn) {
      const ripple = document.createElement("span");
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.cssText = `
        position: absolute; border-radius: 50%; transform: scale(0);
        animation: ripple-anim 0.6s ease-out forwards;
        left: ${x}px; top: ${y}px; width: 10px; height: 10px;
        background: rgba(255,255,255,0.35); margin-left: -5px; margin-top: -5px;
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
        @keyframes ripple-anim {
          to { transform: scale(30); opacity: 0; }
        }
      `}</style>
      <button
        ref={btnRef}
        className={cn(variants[variant], sizes[size], "font-semibold cursor-pointer inline-flex items-center justify-center gap-2 select-none", className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
