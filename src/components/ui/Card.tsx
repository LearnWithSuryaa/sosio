import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "glass" | "glass-dark" | "solid";
  glow?: "blue" | "cyan" | "violet" | "rose" | "amber" | "none";
}

const glowMap = {
  blue:   "hover:shadow-[0_0_30px_rgba(56,189,248,0.3),0_0_60px_rgba(56,189,248,0.1)]",
  cyan:   "hover:shadow-[0_0_30px_rgba(34,211,238,0.3),0_0_60px_rgba(34,211,238,0.1)]",
  violet: "hover:shadow-[0_0_30px_rgba(167,139,250,0.3),0_0_60px_rgba(167,139,250,0.1)]",
  rose:   "hover:shadow-[0_0_30px_rgba(251,113,133,0.3),0_0_60px_rgba(251,113,133,0.1)]",
  amber:  "hover:shadow-[0_0_30px_rgba(251,191,36,0.3),0_0_60px_rgba(251,191,36,0.1)]",
  none:   "",
};

export function Card({ children, className, variant = "glass", glow = "none" }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        variant === "glass" && "glass-card shimmer",
        variant === "glass-dark" && "glass-card bg-white/[0.03]",
        variant === "solid" && "bg-[#0D1730] border border-white/10",
        glow !== "none" && glowMap[glow],
        className
      )}
    >
      {children}
    </div>
  );
}
