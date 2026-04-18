"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Activity,
  Map,
  PenTool,
  BookOpen,
  Lightbulb,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [insightOpen, setInsightOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // === PRIMARY (JANGAN DI DROPDOWN)
  const primaryLinks = [
    { href: "/", label: "Beranda" },
    { href: "/survei", label: "Survei", icon: Activity },
    { href: "/peta", label: "Peta", icon: Map },
    { href: "/kuis", label: "Kuis", icon: Lightbulb },
  ];

  // === SECONDARY (DROPDOWN)
  const insightLinks = [
    { href: "/komitmen", label: "Komitmen", icon: PenTool },
    { href: "/studi-kasus", label: "Studi Kasus", icon: BookOpen },
  ];

  const aboutLinks = [
    { href: "/tentang", label: "Tentang Kami" },
    { href: "/visi-misi", label: "Visi & Misi" },
    { href: "/tim", label: "Tim Pengembang" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed w-full top-0 z-50 transition-all duration-500",
          scrolled ? "glass-nav-light" : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="font-extrabold text-2xl">
              GESA<span className="text-orange-500">MEGA</span>
            </Link>

            {/* NAV */}
            <div className="hidden md:flex items-center gap-2">
              {/* PRIMARY */}
              {primaryLinks.map((link) => {
                const active = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2",
                      active
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-600 hover:bg-gray-100",
                    )}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {link.label}
                  </Link>
                );
              })}

              {/* INSIGHT DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setInsightOpen(true)}
                onMouseLeave={() => setInsightOpen(false)}
              >
                <button className="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 flex items-center gap-1">
                  Insight <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {insightOpen && (
                    <motion.div className="absolute mt-2 w-52 bg-white rounded-xl shadow-lg p-2">
                      {insightLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50"
                          >
                            <Icon className="w-4 h-4" />
                            {link.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ABOUT DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <button className="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 flex items-center gap-1">
                  Tentang <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div className="absolute mt-2 w-52 bg-white rounded-xl shadow-lg p-2">
                      {aboutLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-3 py-2 rounded-lg hover:bg-gray-50"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/survei"
              className="hidden md:flex btn-pill-primary text-sm"
            >
              Mulai Survei
            </Link>

            {/* Mobile */}
            <button onClick={() => setMobileOpen(true)} className="md:hidden">
              <Menu />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
