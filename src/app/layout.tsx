import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Program Ekosistem Digital 2026 — Membangun Pendidikan Digital Indonesia",
  description: "Platform kolaboratif nasional untuk mendorong penggunaan gadget yang sehat, terukur, dan berdampak pada kualitas pendidikan Indonesia.",
  keywords: ["ekosistem digital", "pendidikan digital", "sekolah", "kominfo", "indonesia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-gray-800">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
