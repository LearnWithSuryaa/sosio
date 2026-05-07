"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MapPin, Activity } from "lucide-react";

const navLinks = [
  { href: "/survei", label: "Survei" },
  { href: "/peta", label: "Peta" },
  { href: "/komitmen", label: "Komitmen" },
  { href: "/studi-kasus", label: "Studi Kasus" },
  { href: "/kuis", label: "Kuis Digital" },
  { href: "/artikel", label: "Artikel" },
];

export function Footer() {
  const pathname = usePathname();
  const isHiddenPage = pathname === "/kuis" || pathname === "/survei";
  if (isHiddenPage) return null;

  return (
    <footer
      className="relative overflow-hidden mt-auto"
      style={{
        background:
          "linear-gradient(160deg, #060a12 0%, #080d18 60%, #050810 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Background decorations (mirrors MapPreview) ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* mesh glow */}
        <div
          className="absolute bottom-0 left-[10%] w-[500px] h-[300px] rounded-full opacity-[0.035] blur-[100px]"
          style={{
            background: "radial-gradient(circle, #f97316, transparent)",
          }}
        />
        <div
          className="absolute top-0 right-[5%] w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[90px]"
          style={{
            background: "radial-gradient(circle, #fb923c, transparent)",
          }}
        />
        {/* grid dots */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.022]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="footer-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>

        {/* top orange accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #fb923c 30%, #ea580c 70%, transparent 100%)",
            opacity: 0.4,
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-4 sm:pt-8 sm:pb-6">
        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-4">
          {/* Brand col */}
          <div className="md:col-span-5">
            {/* Wordmark */}
            <div className="mb-4">
              <span className="font-black text-2xl tracking-tighter text-white uppercase">
                GESA
                <span
                  style={{
                    background:
                      "linear-gradient(120deg, #fb923c 0%, #f97316 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  MEGA
                </span>
              </span>
            </div>

            <p className="text-white/40 text-xs leading-relaxed max-w-xs mb-4 font-medium">
              Platform kolaboratif nasional untuk mendorong penggunaan gadget
              yang lebih sehat, terukur, dan berdampak pada kualitas pendidikan.
            </p>

            {/* Partner logos */}
            <div
              className="inline-flex items-center gap-4 px-4 py-2.5 rounded-2xl mb-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <img
                src="/assets/Logo-Gesa-media.svg"
                alt="Gesa Media Logo"
                className="h-5 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.6 }}
              />
              <div
                className="w-px h-4 self-center"
                style={{ background: "rgba(255,255,255,0.12)" }}
              />
              <img
                src="/assets/logo-kmpus.png"
                alt="Logo Kampus"
                className="h-6 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.55 }}
              />
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/gesamega.official?igsh=YjZ5cGJzcDk3MHV2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(249,115,22,0.12)";
                  el.style.borderColor = "rgba(249,115,22,0.3)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(255,255,255,0.05)";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 text-white/50 group-hover:text-orange-400 transition-colors duration-200"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav col */}
          <div className="md:col-span-3">
            <h4 className="text-[9px] font-black tracking-[0.2em] uppercase text-white/25 mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2.5 text-xs font-medium text-white/45 hover:text-white transition-colors duration-200"
                  >
                    <span
                      className="w-1 h-1 rounded-full transition-all duration-200 group-hover:w-3"
                      style={{
                        background: "#f97316",
                        opacity: 0,
                        transition:
                          "width 200ms, opacity 200ms, background 200ms",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLSpanElement).style.opacity =
                          "1")
                      }
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card */}
          <div className="md:col-span-4">
            <div
              className="relative rounded-2xl p-5 overflow-hidden h-full flex flex-col justify-between"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none opacity-50">
                <svg viewBox="0 0 48 48" fill="none">
                  <path
                    d="M46 24 L46 2 L24 2"
                    stroke="#f97316"
                    strokeWidth="1.5"
                    strokeOpacity="0.5"
                  />
                </svg>
              </div>

              {/* glow */}
              <div
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full blur-2xl opacity-10"
                style={{ background: "#f97316" }}
              />

              <div className="relative z-10">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{
                    background: "rgba(249,115,22,0.12)",
                    border: "1px solid rgba(249,115,22,0.25)",
                  }}
                >
                  <Activity className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <h4 className="text-white font-bold text-sm mb-1.5">
                  Siap Bergabung?
                </h4>
                <p className="text-white/35 text-xs leading-relaxed mb-4">
                  Jelajahi berbagai artikel dan wawasan terbaru untuk membangun
                  ekosistem digital yang sehat di sekolah Anda.
                </p>
              </div>

              <Link href="/artikel" className="relative z-10 block">
                <button
                  className="group w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-bold text-xs text-white transition-all duration-200"
                  style={{
                    background:
                      "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
                    boxShadow: "0 0 20px rgba(249,115,22,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.boxShadow = "0 0 32px rgba(249,115,22,0.45)";
                    el.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.boxShadow = "0 0 20px rgba(249,115,22,0.25)";
                    el.style.transform = "scale(1)";
                  }}
                >
                  Baca Artikel
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/20 text-[10px] font-medium tracking-wide">
            © {new Date().getFullYear()} GESAMEGA. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-orange-500/50" />
            <span className="text-white/20 text-[10px] font-medium">
              Indonesia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
