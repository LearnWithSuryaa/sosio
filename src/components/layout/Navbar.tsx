"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Activity,
  Map,
  BookOpen,
  Lightbulb,
  Menu,
  X,
  ChevronDown,
  FileText,
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

  // === PRIMARY (JANGAN DI DROPDOWN)
  const primaryLinks = [
    { href: "/", label: "Beranda" },
    { href: "/peta", label: "Peta", icon: Map },
    { href: "/hasil", label: "Hasil", icon: BarChart3 },
  ];
  // === SECONDARY (DROPDOWN)
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

      // Hide on scroll down, show on scroll up
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

  // Lock body scroll when mobile menu is open
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
          "fixed w-full top-0 z-50 transition-all duration-300",
          scrolled ? "glass-nav-light" : "bg-transparent",
          !isVisible && "-translate-y-full",
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-extrabold text-xl sm:text-2xl"
              onClick={closeMobile}
            >
              GESA<span className="text-orange-500">MEGA</span>
            </Link>

            {/* Desktop NAV */}
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
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute mt-2 w-52 bg-white rounded-xl shadow-lg p-2"
                    >
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
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute mt-2 w-52 bg-white rounded-xl shadow-lg p-2"
                    >
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

            {/* Right side - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/peta" className="relative group">
                <Button variant="primary" className="text-sm px-6 py-2">
                  Peta Partisipasi
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Buka menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE DRAWER ===== */}
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
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={closeMobile}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
                <Link
                  href="/"
                  className="font-extrabold text-xl"
                  onClick={closeMobile}
                >
                  GESA<span className="text-orange-500">MEGA</span>
                </Link>
                <button
                  onClick={closeMobile}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Tutup menu"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {/* Primary Links */}
                {primaryLinks.map((link) => {
                  const active = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                        active
                          ? "text-orange-600 bg-orange-50"
                          : "text-gray-700 hover:bg-gray-50",
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
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 shrink-0" />
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
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
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
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <Lightbulb className="w-4 h-4 shrink-0" />
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
                              className="block px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
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

              {/* Drawer Footer CTA */}
              <div className="px-5 py-5 border-t border-gray-100">
                <Link href="/peta">
                  <Button
                    variant="primary"
                    className="w-full text-center text-sm"
                    onClick={closeMobile}
                  >
                    Lihat Peta Nasional
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
