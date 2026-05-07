"use client";

import { useState, useRef } from "react";
import {
  BookOpen,
  Clock,
  ArrowRight,
  Search,
  Sparkles,
  Smartphone,
  Brain,
  Shield,
  GraduationCap,
  X,
  ImageIcon,
  TrendingUp,
  User,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { label: "Semua", value: "all", icon: Sparkles },
  { label: "Literasi Digital", value: "literasi", icon: Brain },
  { label: "Kebijakan Sekolah", value: "kebijakan", icon: Shield },
  { label: "Kesehatan Digital", value: "kesehatan", icon: Smartphone },
  { label: "Panduan Guru", value: "guru", icon: GraduationCap },
];

/* Badge accent per kategori */
const BADGE_STYLE: Record<string, { bg: string; border: string; color: string }> = {
  literasi: { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.28)", color: "#c084fc" },
  kebijakan: { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.28)", color: "#34d399" },
  kesehatan: { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.28)", color: "#60a5fa" },
  guru: { bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.28)", color: "#fb923c" },
  default: { bg: "rgba(255,255,255,0.07)", border: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.55)" },
};

function getBadge(category: string) {
  return BADGE_STYLE[category] ?? BADGE_STYLE.default;
}

export default function ClientArticleList({
  initialArticles,
}: {
  initialArticles: any[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = initialArticles.filter((a) => {
    const matchCat = activeCategory === "all" || a.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const hero = filtered[0];
  const rest = filtered.slice(1);
  const showHero = activeCategory === "all" && searchQuery === "";

  return (
    <div
      className="min-h-screen pt-24 pb-20 relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* ── Ambient Glowing Mesh ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-right warm glow */}
        <div
          className="absolute -top-[8%] right-[-5%] w-[750px] h-[750px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(234,88,12,0.13) 0%, rgba(249,115,22,0.04) 50%, transparent 70%)",
            mixBlendMode: "screen",
          }}
        />
        {/* Center amber pulse */}
        <div
          className="absolute top-[30%] left-[30%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 60%)",
            mixBlendMode: "screen",
          }}
        />
        {/* Bottom-left cool accent */}
        <div
          className="absolute bottom-0 left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 65%)",
            mixBlendMode: "screen",
          }}
        />
        {/* Subtle warm strip across header */}
        <div
          className="absolute top-0 left-0 right-0 h-[320px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(234,88,12,0.06) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex p-3 rounded-2xl mb-5"
            style={{
              background: "rgba(249,115,22,0.12)",
              border: "1px solid rgba(249,115,22,0.25)",
            }}
          >
            <BookOpen className="w-6 h-6" style={{ color: "#fb923c" }} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
          >
            Artikel &amp;{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #fb923c 0%, #f97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Edukasi
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            Wawasan, riset, dan panduan praktis untuk ekosistem pendidikan
            digital yang sehat.
          </motion.p>

          {/* ── Search Bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 max-w-lg mx-auto"
          >
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <Search className="w-4 h-4 shrink-0" style={{ color: "rgba(255,255,255,0.25)" }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm font-medium text-white placeholder:text-white/25"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="shrink-0 transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.30)" }}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Category Filters ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.value;
            return (
              <motion.button
                key={cat.value}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
                onClick={() => setActiveCategory(cat.value)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={
                  active
                    ? {
                        background: "linear-gradient(135deg, #ea580c, #f97316)",
                        color: "white",
                        boxShadow: "0 0 22px rgba(249,115,22,0.40)",
                      }
                    : {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        color: "rgba(255,255,255,0.40)",
                      }
                }
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </motion.button>
            );
          })}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="ml-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.20)" }}
          >
            {filtered.length} artikel
          </motion.span>
        </div>

        {/* ── Hero Featured Article ── */}
        <AnimatePresence mode="wait">
          {showHero && hero && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-4 h-4" style={{ color: "#fb923c" }} />
                <span
                  className="text-xs font-black uppercase tracking-widest"
                  style={{ color: "#fb923c" }}
                >
                  Terbaru
                </span>
              </div>
              <Link href={`/artikel/${hero.slug}`} className="group block">
                <div
                  className="relative rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(249,115,22,0.12)]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  {/* top glow strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(249,115,22,0.6), transparent)",
                    }}
                  />
                  <div className="grid md:grid-cols-[1fr_380px]">
                    {/* Text */}
                    <div className="p-8 md:p-10 flex flex-col justify-between">
                      <div>
                        <HeroBadge category={hero.category} badge={hero.badge} />
                        <h2
                          className="text-2xl md:text-3xl font-extrabold text-white mt-4 mb-4 leading-snug group-hover:text-orange-300 transition-colors"
                          style={{ letterSpacing: "-0.02em" }}
                        >
                          {hero.title}
                        </h2>
                        <p
                          className="text-[15px] leading-relaxed line-clamp-3"
                          style={{ color: "rgba(255,255,255,0.38)" }}
                        >
                          {hero.excerpt}
                        </p>
                      </div>
                      <div className="mt-8 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                            style={{
                              background: "linear-gradient(135deg,#ea580c,#f97316)",
                              color: "white",
                            }}
                          >
                            {(hero.author || "A")[0].toUpperCase()}
                          </div>
                          <div>
                            <p
                              className="text-[12px] font-semibold"
                              style={{ color: "rgba(255,255,255,0.60)" }}
                            >
                              {hero.author}
                            </p>
                            <p
                              className="text-[10px]"
                              style={{ color: "rgba(255,255,255,0.25)" }}
                            >
                              {hero.date} · {hero.readTime}
                            </p>
                          </div>
                        </div>
                        <div
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all group-hover:shadow-[0_0_16px_rgba(249,115,22,0.3)]"
                          style={{
                            background: "linear-gradient(135deg,#ea580c,#f97316)",
                            color: "white",
                          }}
                        >
                          Baca <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                    {/* Image */}
                    <div className="relative h-56 md:h-auto overflow-hidden">
                      <img
                        src={hero.thumbnail}
                        alt={hero.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(5,5,5,0.5) 0%, transparent 50%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Article Grid ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <Search
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: "rgba(255,255,255,0.12)" }}
              />
              <p
                className="font-semibold text-lg"
                style={{ color: "rgba(255,255,255,0.30)" }}
              >
                Artikel tidak ditemukan.
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "rgba(255,255,255,0.18)" }}
              >
                Coba kata kunci lain atau pilih kategori berbeda.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {(showHero ? rest : filtered).map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20 rounded-3xl p-10 text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(234,88,12,0.09) 0%, rgba(249,115,22,0.05) 100%)",
              border: "1px solid rgba(249,115,22,0.18)",
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.12), transparent 60%)",
              }}
            />
            <div className="relative z-10">
              <div
                className="inline-flex p-3 rounded-2xl mb-4"
                style={{
                  background: "rgba(249,115,22,0.15)",
                  border: "1px solid rgba(249,115,22,0.30)",
                }}
              >
                <Sparkles className="w-5 h-5" style={{ color: "#fb923c" }} />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">
                Ikuti Dampak Nyata
              </h3>
              <p
                className="mb-6 max-w-sm mx-auto text-sm"
                style={{ color: "rgba(255,255,255,0.40)" }}
              >
                Lihat bagaimana sekolah-sekolah di seluruh Indonesia
                berpartisipasi dalam gerakan GESAMEGA.
              </p>
              <Link
                href="/peta"
                className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-2xl transition-all"
                style={{
                  background: "linear-gradient(135deg, #ea580c, #f97316)",
                  color: "white",
                  boxShadow: "0 0 28px rgba(249,115,22,0.35)",
                }}
              >
                Lihat Peta Partisipasi <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function HeroBadge({ category, badge }: { category: string; badge: string }) {
  const s = getBadge(category);
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
    >
      {badge}
    </span>
  );
}

function ArticleCard({ article, index }: { article: any; index: number }) {
  const badge = getBadge(article.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Link href={`/artikel/${article.slug}`} className="group block h-full">
        <div
          className="rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-[0_0_32px_rgba(249,115,22,0.10)] group-hover:translate-y-[-3px]"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Thumbnail */}
          <div className="relative aspect-[16/9] overflow-hidden">
            {article.thumbnail ? (
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <ImageIcon
                  className="w-8 h-8"
                  style={{ color: "rgba(255,255,255,0.15)" }}
                />
              </div>
            )}
            {/* Overlay gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.1) 60%, transparent 100%)",
              }}
            />
            {/* Badge over image */}
            <div className="absolute bottom-3 left-3">
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-sm"
                style={{
                  background: badge.bg,
                  border: `1px solid ${badge.border}`,
                  color: badge.color,
                }}
              >
                {article.badge}
              </span>
            </div>
            {/* Read time */}
            <div className="absolute bottom-3 right-3">
              <span
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium backdrop-blur-sm"
                style={{
                  background: "rgba(5,5,5,0.55)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                <Clock className="w-2.5 h-2.5" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <h3
              className="font-extrabold text-white mb-2 leading-snug line-clamp-2 transition-colors group-hover:text-orange-400"
              style={{ fontSize: "15px" }}
            >
              {article.title}
            </h3>
            <p
              className="text-[13px] leading-relaxed line-clamp-2 flex-1 mb-4"
              style={{ color: "rgba(255,255,255,0.32)" }}
            >
              {article.excerpt}
            </p>

            {/* Footer */}
            <div
              className="flex items-center justify-between pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                  style={{
                    background: "linear-gradient(135deg,#ea580c,#f97316)",
                    color: "white",
                  }}
                >
                  {(article.author || "A")[0].toUpperCase()}
                </div>
                <div>
                  <p
                    className="text-[11px] font-semibold leading-none"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {article.author}
                  </p>
                  <p
                    className="text-[10px] leading-none mt-0.5"
                    style={{ color: "rgba(255,255,255,0.22)" }}
                  >
                    {article.date}
                  </p>
                </div>
              </div>
              <ArrowRight
                className="w-4 h-4 transition-all group-hover:text-orange-400 group-hover:translate-x-0.5"
                style={{ color: "rgba(255,255,255,0.15)" }}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
