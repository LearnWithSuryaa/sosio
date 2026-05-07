"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

interface ArticleSectionProps {
  articles?: any[];
}

export function ArticleSection({ articles = [] }: ArticleSectionProps) {
  if (articles.length === 0) return null;

  return (
    <section className="relative py-28 px-4 overflow-hidden bg-[#050505]">
      {/* ── Dynamic Glowing Mesh ── */}
      <div className="absolute inset-0 bg-white/[0.01] mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-[20%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-[0.15em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Wawasan Terbaru
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-2 mb-4 leading-tight tracking-tight">
            Artikel &{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Edukasi
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Temukan panduan praktis, riset terbaru, dan opini pakar seputar ekosistem digital yang sehat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => {
            let badgeColor = "bg-white/5 text-white/70 border-white/10";
            let badge = "Artikel";
            switch (article.kategori) {
              case "literasi":
                badgeColor = "bg-purple-500/10 text-purple-400 border-purple-500/20";
                badge = "Edukasi";
                break;
              case "kebijakan":
                badgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
                badge = "Panduan Praktis";
                break;
              case "kesehatan":
                badgeColor = "bg-blue-500/10 text-blue-400 border-blue-500/20";
                badge = "Riset Terbaru";
                break;
              case "guru":
                badgeColor = "bg-orange-500/10 text-orange-400 border-orange-500/20";
                badge = "Tips & Trik";
                break;
            }

            const readTime = Math.max(1, Math.ceil((article.isi?.length || 0) / 1000)) + " menit";
            const dateStr = new Date(article.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            const excerpt = article.isi ? (article.isi.length > 120 ? article.isi.substring(0, 120) + "..." : article.isi) : "";

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <Link href={`/artikel/${article.id}`}>
                  <div className="group bg-white/[0.03] border border-white/10 backdrop-blur-sm rounded-[24px] hover:bg-white/[0.05] hover:border-orange-500/30 transition-all duration-300 p-7 h-full flex flex-col cursor-pointer overflow-hidden relative">
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at top right, rgba(249,115,22,0.1) 0%, transparent 70%)`,
                      }}
                    />

                    <div className="relative z-10 flex items-center justify-between mb-5">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${badgeColor}`}>
                        {badge}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-white/40 font-medium">
                        <Clock className="w-3.5 h-3.5" /> {readTime}
                      </span>
                    </div>

                    <h3 className="relative z-10 font-bold text-xl text-white mb-3 leading-snug group-hover:text-orange-400 transition-colors line-clamp-2">
                      {article.judul}
                    </h3>
                    <p className="relative z-10 text-white/50 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {excerpt}
                    </p>

                    <div className="relative z-10 border-t border-white/10 pt-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white/80">{article.penulis}</p>
                        <p className="text-xs text-white/40 mt-1">{dateStr}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-orange-500/30 group-hover:bg-orange-500/10 transition-all">
                        <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-orange-400 transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/artikel">
            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all duration-300 hover:scale-[1.02]">
              Lihat Semua Artikel
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
