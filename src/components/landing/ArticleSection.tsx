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
    <section className="relative py-28 px-4 overflow-hidden bg-white">
      {/* ── Dynamic Glowing Mesh ── */}
      <div className="absolute inset-0 bg-surface/50 mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-[20%] w-125 h-125 bg-primary-soft/50 rounded-full blur-[140px] mix-blend-multiply pointer-events-none transform-gpu" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-soft bg-surface-alt text-primary text-xs font-bold uppercase tracking-[0.15em] mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Wawasan Terbaru
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mt-2 mb-4 leading-tight tracking-tight">
            Artikel &{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #64B5F6 0%, #2E7D32 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Edukasi
            </span>
          </h2>
          <p className="text-text-dark max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Temukan panduan praktis, riset terbaru, dan opini pakar seputar ekosistem digital yang sehat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => {
            let badgeColor = "bg-surface text-text-dark border-slate-200";
            let badge = "Artikel";
            switch (article.kategori) {
              case "literasi":
                badgeColor = "bg-purple-50 text-purple-600 border-purple-200";
                badge = "Edukasi";
                break;
              case "kebijakan":
                badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-200";
                badge = "Panduan Praktis";
                break;
              case "kesehatan":
                badgeColor = "bg-blue-50 text-blue-600 border-blue-200";
                badge = "Riset Terbaru";
                break;
              case "guru":
                badgeColor = "bg-surface-alt text-primary border-primary-soft";
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
                  <div className="group bg-white border border-slate-200 shadow-sm rounded-3xl hover:shadow-md hover:border-primary-soft transition-all duration-300 p-7 h-full flex flex-col cursor-pointer overflow-hidden relative">
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at top right, rgba(46, 125, 50,0.05) 0%, transparent 70%)`,
                      }}
                    />

                    <div className="relative z-10 flex items-center justify-between mb-5">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${badgeColor}`}>
                        {badge}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5" /> {readTime}
                      </span>
                    </div>

                    <h3 className="relative z-10 font-bold text-xl text-text-dark mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {article.judul}
                    </h3>
                    <p className="relative z-10 text-text-dark text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {excerpt}
                    </p>

                    <div className="relative z-10 border-t border-slate-100 pt-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-text-dark">{article.penulis}</p>
                        <p className="text-xs text-slate-500 mt-1">{dateStr}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-primary-soft group-hover:bg-surface-alt transition-all">
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
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
            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-slate-200 bg-white hover:bg-surface text-text-dark font-bold text-sm transition-all duration-300 hover:scale-[1.02] shadow-sm">
              Lihat Semua Artikel
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
