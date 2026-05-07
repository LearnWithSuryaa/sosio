import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { Clock, User, Calendar, ImageIcon, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShareButtons from "./ShareButtons";
import ReadingProgressBar from "./ReadingProgressBar";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { data: article } = await supabase
    .from("articles")
    .select("judul, isi, thumbnail_url, kategori")
    .eq("id", resolvedParams.slug)
    .single();

  if (!article) return { title: "Artikel Tidak Ditemukan" };

  const description = article.isi.substring(0, 160) + "...";
  const ogImage =
    article.thumbnail_url ||
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";

  return {
    title: `${article.judul} | GESAMEGA`,
    description,
    openGraph: {
      title: article.judul,
      description,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.judul }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.judul,
      description,
      images: [ogImage],
    },
  };
}

export default async function ArtikelDetail({ params }: Props) {
  const resolvedParams = await params;

  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", resolvedParams.slug)
    .single();

  if (error || !article) notFound();

  const { data: related } = await supabase
    .from("articles")
    .select("id, judul, created_at, thumbnail_url, kategori")
    .neq("id", resolvedParams.slug)
    .limit(4);

  const relatedBlogs = related || [];

  const dateStr = new Date(article.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const wordCount = (article.isi?.split(/\s+/) || []).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200)) + " menit baca";

  const paragraphs = article.isi
    .split("\n")
    .filter((p: string) => p.trim() !== "");

  return (
    <div style={{ background: "#050505" }} className="min-h-screen relative">
      {/* Sticky Reading Progress */}
      <ReadingProgressBar />

      {/* ── Glowing Mesh ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-[10%] right-[5%] w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(234,88,12,0.09) 0%, transparent 70%)",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute bottom-[10%] -left-[5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* ── Hero ── */}
      <div className="relative w-full h-[55vh] min-h-[380px] max-h-[600px] overflow-hidden">
        {/* Image */}
        <img
          src={
            article.thumbnail_url ||
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
          }
          alt={article.judul}
          className="w-full h-full object-cover"
        />
        {/* Multi-layer overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.55) 60%, rgba(5,5,5,0.98) 100%)",
          }}
        />
        {/* Category badge over image */}
        <div className="absolute top-28 left-0 right-0 z-10 max-w-[780px] mx-auto px-6">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest"
            style={{
              background: "rgba(249,115,22,0.18)",
              border: "1px solid rgba(249,115,22,0.35)",
              color: "#fb923c",
            }}
          >
            <Tag className="w-3 h-3" />
            {article.kategori || "Umum"}
          </span>
        </div>
        {/* Title over image */}
        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-[780px] mx-auto px-6 pb-10">
          <h1
            className="text-3xl md:text-[42px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-white"
            style={{ fontFamily: "'Georgia', serif", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            {article.judul}
          </h1>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">

        {/* ── Meta bar ── */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-8"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Back + author */}
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/artikel"
              className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest transition-colors text-white/30 hover:text-orange-400"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Artikel
            </Link>
            <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }} />
            <div className="flex items-center gap-2">
              {/* Author avatar placeholder */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{
                  background: "linear-gradient(135deg, #ea580c, #f97316)",
                  color: "white",
                }}
              >
                {(article.penulis || "A")[0].toUpperCase()}
              </div>
              <span className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.60)" }}>
                {article.penulis}
              </span>
            </div>
          </div>
          {/* Date + readtime */}
          <div className="flex items-center gap-4">
            <span
              className="flex items-center gap-1.5 text-[11px]"
              style={{ color: "rgba(255,255,255,0.30)" }}
            >
              <Calendar className="w-3 h-3" />
              {dateStr}
            </span>
            <span
              className="flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full"
              style={{
                background: "rgba(249,115,22,0.10)",
                border: "1px solid rgba(249,115,22,0.20)",
                color: "#fb923c",
              }}
            >
              <Clock className="w-3 h-3" />
              {readTime}
            </span>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-14">

          {/* ── Article Body ── */}
          <article>
            {/* Lead paragraph */}
            {paragraphs.length > 0 && (
              <p
                className="text-[18px] md:text-[19px] leading-[1.80] mb-8 pl-5"
                style={{
                  color: "rgba(255,255,255,0.58)",
                  fontFamily: "'Georgia', serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  borderLeft: "2px solid #f97316",
                }}
              >
                {paragraphs[0]}
              </p>
            )}

            {/* Body */}
            <div className="space-y-0">
              {paragraphs.slice(1).map((p: string, idx: number) => {
                const isHeading = p.length < 80 && !p.endsWith(".") && !p.endsWith(",");

                if (isHeading) {
                  return (
                    <h2
                      key={idx}
                      className="text-[22px] md:text-[24px] font-semibold mt-12 mb-5 leading-snug"
                      style={{
                        color: "#ffffff",
                        fontFamily: "'Georgia', serif",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {p}
                    </h2>
                  );
                }

                return (
                  <p
                    key={idx}
                    className="text-[16px] md:text-[17px] leading-[1.85] mb-6"
                    style={{ color: "rgba(255,255,255,0.42)" }}
                  >
                    {p}
                  </p>
                );
              })}
            </div>

            {/* ── Article Footer ── */}
            <div
              className="mt-14 pt-10"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Tags row */}
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest mr-2" style={{ color: "rgba(255,255,255,0.22)" }}>
                  Tag
                </span>
                {[article.kategori || "Umum"].map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[11px] font-semibold capitalize"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "0.5px solid rgba(255,255,255,0.10)",
                      color: "rgba(255,255,255,0.50)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author card */}
              <div
                className="flex items-start gap-4 p-6 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #ea580c, #f97316)",
                    color: "white",
                  }}
                >
                  {(article.penulis || "A")[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-[13px] font-bold mb-1" style={{ color: "rgba(255,255,255,0.80)" }}>
                    {article.penulis}
                  </p>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Kontributor di GESAMEGA — platform riset ekosistem pendidikan digital nasional.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* ── Sticky Sidebar ── */}
          <aside className="lg:sticky lg:top-24 h-fit space-y-6">
            {/* Share */}
            <ShareButtons title={article.judul} />

            {/* Divider */}
            <div className="h-px" style={{ background: "rgba(255,255,255,0.07)" }} />

            {/* Stats card */}
            <div
              className="rounded-2xl p-5 space-y-4"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.22)" }}>
                Info Artikel
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>Penulis</span>
                  <span className="text-[12px] font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>{article.penulis}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>Diterbitkan</span>
                  <span className="text-[12px] font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>{dateStr}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>Estimasi baca</span>
                  <span className="text-[12px] font-semibold" style={{ color: "#fb923c" }}>{readTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>Kategori</span>
                  <span
                    className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{
                      background: "rgba(249,115,22,0.12)",
                      border: "1px solid rgba(249,115,22,0.25)",
                      color: "#fb923c",
                    }}
                  >
                    {article.kategori || "Umum"}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: "rgba(255,255,255,0.07)" }} />

            {/* Related articles */}
            {relatedBlogs.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-4" style={{ color: "rgba(255,255,255,0.22)" }}>
                  Artikel Terkait
                </p>
                <div className="flex flex-col gap-1">
                  {relatedBlogs.map((blog, i) => (
                    <Link
                      href={`/artikel/${blog.id}`}
                      key={i}
                      className="flex gap-3 items-start p-2.5 rounded-xl transition-all group hover:bg-white/[0.04]"
                    >
                      {/* Thumbnail */}
                      <div
                        className="w-[68px] h-[50px] rounded-lg overflow-hidden flex-shrink-0"
                        style={{ border: "0.5px solid rgba(255,255,255,0.08)" }}
                      >
                        {blog.thumbnail_url ? (
                          <img
                            src={blog.thumbnail_url}
                            alt={blog.judul}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.06)" }}
                          >
                            <ImageIcon className="w-4 h-4" style={{ color: "rgba(255,255,255,0.20)" }} />
                          </div>
                        )}
                      </div>
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[11px] mb-0.5"
                          style={{ color: "rgba(255,255,255,0.22)" }}
                        >
                          {blog.kategori || "Umum"}
                        </p>
                        <h4
                          className="text-[12px] font-normal leading-snug line-clamp-2 transition-colors group-hover:text-orange-400"
                          style={{ color: "rgba(255,255,255,0.60)" }}
                        >
                          {blog.judul}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA back to all */}
            <Link
              href="/artikel"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[12px] font-semibold transition-all hover:bg-white/[0.08]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Semua Artikel
            </Link>
          </aside>
        </div>

        {/* ── More Articles (bottom) ── */}
        {relatedBlogs.length > 0 && (
          <div
            className="mt-20 pt-12"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
              <p className="text-[10px] font-black uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.22)" }}>
                Baca Juga
              </p>
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedBlogs.map((blog, i) => (
                <Link href={`/artikel/${blog.id}`} key={i} className="group">
                  <div
                    className="rounded-2xl overflow-hidden transition-all duration-300 group-hover:translate-y-[-4px]"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      {blog.thumbnail_url ? (
                        <img
                          src={blog.thumbnail_url}
                          alt={blog.judul}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                          <ImageIcon className="w-8 h-8" style={{ color: "rgba(255,255,255,0.15)" }} />
                        </div>
                      )}
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(5,5,5,0.6), transparent)" }}
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: "#fb923c" }}>
                        {blog.kategori || "Umum"}
                      </p>
                      <h3
                        className="text-[13px] font-medium leading-snug line-clamp-2 transition-colors group-hover:text-white"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        {blog.judul}
                      </h3>
                      <p className="text-[11px] mt-2" style={{ color: "rgba(255,255,255,0.22)" }}>
                        {new Date(blog.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
