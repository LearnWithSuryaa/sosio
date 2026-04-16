"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Activity, Map, PenTool, BookOpen, Lightbulb } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  
  const links = [
    { href: "/survei", label: "Survei", icon: Activity },
    { href: "/peta", label: "Peta", icon: Map },
    { href: "/komitmen", label: "Komitmen", icon: PenTool },
    { href: "/studi-kasus", label: "Studi Kasus", icon: BookOpen },
    { href: "/kuis", label: "Kuis", icon: Lightbulb },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b-0 border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-kominfo-navy to-kominfo-blue flex items-center justify-center text-white font-bold">
              E
            </div>
            <span className="font-bold text-lg text-kominfo-navy tracking-tight">
              EkosistemDigital
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const active = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                    active
                      ? "bg-kominfo-light text-kominfo-navy"
                      : "text-gray-600 hover:text-kominfo-blue hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
