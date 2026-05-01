import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { Clock, User, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShareButtons from "./ShareButtons";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate SEO Metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { data: article } = await supabase
    .from("articles")
    .select("judul, isi, thumbnail_url, kategori")
    .eq("id", resolvedParams.slug)
    .single();

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.judul,
        },
      ],
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

  if (error || !article) {
    notFound();
  }

  const { data: related } = await supabase
    .from("articles")
    .select("id, judul, created_at, thumbnail_url")
    .neq("id", resolvedParams.slug)
    .limit(3);

  const relatedBlogs = related || [];

  const dateStr = new Date(article.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const readTime =
    Math.max(1, Math.ceil((article.isi?.length || 0) / 1000)) + " min read";
  const paragraphs = article.isi
    .split("\n")
    .filter((p: string) => p.trim() !== "");

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-emerald-50/50 to-transparent pointer-events-none -z-10" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            Home
          </Link>
          <span>•</span>
          <Link
            href="/artikel"
            className="hover:text-emerald-600 transition-colors"
          >
            Our Blogs
          </Link>
          <span>•</span>
          <span className="text-gray-900 capitalize">
            {article.kategori || "Umum"}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-semibold text-gray-900 mb-8 leading-[1.1] tracking-tight max-w-4xl">
          {article.judul}
        </h1>

        {/* Meta Data Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center overflow-hidden">
                <User className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {article.penulis}
              </span>
            </div>

            <div className="px-4 py-2 rounded-full bg-gray-50 border border-gray-100">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {article.kategori || "Umum"}
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {readTime}
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {dateStr}
              </span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 lg:gap-16">
          {/* Main Content (Left) */}
          <article>
            {/* Featured Image */}
            <div className="w-full aspect-[16/9] rounded-[2rem] overflow-hidden mb-12 relative shadow-sm border border-gray-100">
              <img
                src={
                  article.thumbnail_url ||
                  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                }
                alt={article.judul}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Body */}
            <div className="prose prose-lg max-w-none text-gray-600 prose-headings:font-semibold prose-headings:text-gray-900 prose-a:text-emerald-600">
              {paragraphs.map((p: string, idx: number) => {
                // Determine if a line is a subheading (short line, no period at end, not first line)
                if (p.length < 80 && !p.endsWith(".") && idx > 0) {
                  return (
                    <h2
                      key={idx}
                      className="text-3xl font-semibold text-gray-900 mt-12 mb-6 tracking-tight"
                    >
                      {p}
                    </h2>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed mb-6 text-[1.1rem]">
                    {p}
                  </p>
                );
              })}
            </div>
          </article>

          {/* Sidebar (Right) */}
          <aside className="space-y-12">
            {/* Share on Social Media */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-4">
                Share on Social Media
              </h3>
              <ShareButtons title={article.judul} />
            </div>

            {/* All Tags */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-4">All Tags</h3>
              <div className="flex flex-wrap gap-2">
                {[article.kategori || "Umum"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Blogs */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-6">
                Related Blogs
              </h3>
              <div className="space-y-6">
                {relatedBlogs.map((blog, i) => (
                  <Link
                    href={`/artikel/${blog.id}`}
                    key={i}
                    className="flex gap-4 group"
                  >
                    <div className="w-24 h-[4.5rem] rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={
                          blog.thumbnail_url ||
                          "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=200&q=80"
                        }
                        alt={blog.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {blog.judul}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
