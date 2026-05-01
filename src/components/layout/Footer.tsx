"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/survei", label: "Survei" },
  { href: "/peta", label: "Peta" },
  { href: "/komitmen", label: "Komitmen" },
  { href: "/studi-kasus", label: "Studi Kasus" },
  { href: "/kuis", label: "Kuis Digital" },
];

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isHiddenPage = pathname === "/kuis" || pathname === "/survei";

  if (isHiddenPage) return null;

  return (
    <footer className="bg-white border-t border-gray-200 relative overflow-hidden mt-auto pt-16 pb-8 sm:pt-20 sm:pb-10">
      {/* Decorative gradient top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-rose-400 to-amber-400" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-5">
              <span className="font-extrabold text-2xl tracking-tighter text-gray-900 uppercase">
                GESA<span className="text-orange-500">MEGA</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-6">
              Platform kolaboratif nasional untuk mendorong penggunaan gadget
              yang lebih sehat, terukur, dan berdampak pada kualitas pendidikan.
            </p>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <img
                src="/assets/Logo-Gesa-media.svg"
                alt="Gesa Media Logo"
                className="h-8 sm:h-9 w-auto object-contain"
                style={{ filter: "brightness(0)" }}
              />
              <img
                src="/assets/cross.webp"
                alt="Cross"
                className="h-2 sm:h-5 w-auto object-contain"
              />
              <img
                src="/assets/logo-kmpus.png"
                alt="Logo Kampus"
                className="h-8 sm:h-12 w-auto object-contain"
              />
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/gesamega.official?igsh=YjZ5cGJzcDk3MHV2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200"
                aria-label="Instagram"
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
                  className="w-4 h-4"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase text-gray-900 mb-6">
              Platform
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-orange-600 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-300 opacity-0 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="clean-card p-6 bg-gradient-warm border-orange-100 flex flex-col justify-center h-full">
            <h4 className="text-gray-900 font-bold mb-2">Siap Bergabung?</h4>
            <p className="text-gray-700 text-sm mb-6 leading-relaxed">
              Jelajahi berbagai artikel dan wawasan terbaru untuk membangun
              ekosistem digital yang sehat di sekolah Anda.
            </p>
            <Link href="/artikel" className="block w-full mt-2">
              <Button variant="primary" className="text-sm w-full py-2">
                Baca Artikel
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-gray-500 text-xs sm:text-sm font-medium">
            © {new Date().getFullYear()} GESAMEGA. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
