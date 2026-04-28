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
    <section className="py-24 px-4 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label-light bg-orange-50 text-orange-600 mb-5">
            Wawasan Terbaru
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5 mb-4 leading-tight tracking-tight">
            Artikel & <span className="text-orange-500">Edukasi</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            Temukan panduan praktis, riset terbaru, dan opini pakar seputar ekosistem digital yang sehat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => {
            let badgeColor = "bg-gray-50 text-gray-600 border-gray-200";
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
                badgeColor = "bg-orange-50 text-orange-600 border-orange-200";
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
                  <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all duration-300 p-6 h-full flex flex-col cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${badgeColor}`}>
                        {badge}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" /> {readTime}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-xl text-gray-900 mb-2 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                      {article.judul}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                      {excerpt}
                    </p>

                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-gray-700">{article.penulis}</p>
                        <p className="text-xs text-gray-400">{dateStr}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
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
            <button className="btn-pill-outline px-8 py-3.5 mx-auto text-sm">
              Lihat Semua Artikel
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
