"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Map,
  BookOpen,
  Lightbulb,
  Menu,
  X,
  ChevronDown,
  Newspaper,
  BarChart3,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [insightOpen, setInsightOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileInsightOpen, setMobileInsightOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const isHiddenPage = pathname === "/kuis" || pathname === "/survei";

  const primaryLinks = [
    { href: "/", label: "Beranda" },
    { href: "/peta", label: "Peta", icon: Map },
    { href: "/hasil", label: "Hasil", icon: BarChart3 },
  ];

  const insightLinks = [
    { href: "/studi-kasus", label: "Studi Kasus", icon: BookOpen },
    { href: "/artikel", label: "Artikel & Edukasi", icon: Newspaper },
  ];

  const aboutLinks = [
    { href: "/tentang", label: "Tentang Kami" },
    { href: "/visi-misi", label: "Visi & Misi" },
    { href: "/tim", label: "Tim Pengembang" },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileInsightOpen(false);
    setMobileAboutOpen(false);
  };

  if (isHiddenPage) return null;

  return (
    <>
      <nav
        className={cn(
          "fixed w-full top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/10 backdrop-blur-xl"
            : "bg-transparent",
          !isVisible && "-translate-y-full",
        )}
        style={scrolled ? { backgroundColor: "rgba(3,7,18,0.85)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              onClick={closeMobile}
              className={cn(
                "font-extrabold text-xl sm:text-2xl tracking-tight text-white transition-opacity duration-300",
                mobileOpen ? "opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto" : "opacity-100"
              )}
            >
              GESA<span className="text-orange-500">MEGA</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {primaryLinks.map((link) => {
                const active = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-200",
                      active
                        ? "text-orange-400 bg-orange-500/10 border border-orange-500/20"
                        : "text-white/60 hover:text-white hover:bg-white/8",
                    )}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {link.label}
                  </Link>
                );
              })}

              {/* Insight Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setInsightOpen(true)}
                onMouseLeave={() => setInsightOpen(false)}
              >
                <button
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-all duration-200",
                    insightOpen
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white hover:bg-white/8",
                  )}
                >
                  Insight
                  <motion.span
                    animate={{ rotate: insightOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {insightOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 w-52 rounded-2xl p-2 border border-white/10 backdrop-blur-xl"
                      style={{ backgroundColor: "rgba(15,17,24,0.95)" }}
                    >
                      {insightLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/8 transition-all duration-150"
                          >
                            <Icon className="w-4 h-4 text-orange-400/70" />
                            {link.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <button
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-all duration-200",
                    aboutOpen
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white hover:bg-white/8",
                  )}
                >
                  Tentang
                  <motion.span
                    animate={{ rotate: aboutOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 w-52 rounded-2xl p-2 border border-white/10 backdrop-blur-xl"
                      style={{ backgroundColor: "rgba(15,17,24,0.95)" }}
                    >
                      {aboutLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/8 transition-all duration-150"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* CTA Desktop */}
            <div className="hidden lg:flex items-center">
              <Link href="/peta">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02]">
                  Peta Partisipasi
                </button>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Buka menu"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={closeMobile}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs flex flex-col border-l border-white/10"
              style={{
                backgroundColor: "rgba(10,10,18,0.97)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/8">
                <Link
                  href="/"
                  className="font-extrabold text-xl text-white tracking-tight"
                  onClick={closeMobile}
                >
                  GESA<span className="text-orange-500">MEGA</span>
                </Link>
                <button
                  onClick={closeMobile}
                  className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Tutup menu"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
                {primaryLinks.map((link) => {
                  const active = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150",
                        active
                          ? "text-orange-400 bg-orange-500/10 border border-orange-500/20"
                          : "text-white/60 hover:text-white hover:bg-white/6",
                      )}
                    >
                      {Icon && <Icon className="w-4 h-4 shrink-0" />}
                      {link.label}
                    </Link>
                  );
                })}

                {/* Insight Accordion */}
                <div>
                  <button
                    onClick={() => setMobileInsightOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/6 transition-all duration-150"
                  >
                    <span className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 shrink-0 text-orange-400/70" />
                      Insight
                    </span>
                    <motion.span
                      animate={{ rotate: mobileInsightOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {mobileInsightOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 mt-1 space-y-1">
                          {insightLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMobile}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-orange-400 hover:bg-orange-500/8 transition-all duration-150"
                              >
                                <Icon className="w-4 h-4 shrink-0" />
                                {link.label}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* About Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAboutOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/6 transition-all duration-150"
                  >
                    <span className="flex items-center gap-3">
                      <Lightbulb className="w-4 h-4 shrink-0 text-orange-400/70" />
                      Tentang
                    </span>
                    <motion.span
                      animate={{ rotate: mobileAboutOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {mobileAboutOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 mt-1 space-y-1">
                          {aboutLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={closeMobile}
                              className="block px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-orange-400 hover:bg-orange-500/8 transition-all duration-150"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

              {/* Drawer Footer */}
              <div className="px-5 py-5 border-t border-white/8">
                <Link href="/peta" onClick={closeMobile}>
                  <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-orange-500/25">
                    Lihat Peta Nasional
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
