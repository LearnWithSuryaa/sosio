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
  metadataBase: new URL("https://gesamega.web.id"),
  title: {
    default: "GESAMEGA | Gerakan Sekolah Bijak Mengelola Gadget",
    template: "%s | GESAMEGA",
  },
  description:
    "Platform kolaboratif nasional untuk mendorong penggunaan gadget yang sehat, terukur, dan berdampak positif pada kualitas pendidikan sekolah di seluruh Indonesia.",
  keywords: [
    "gesamega",
    "gerakan sadar menggunakan gadget",
    "ekosistem digital sekolah",
    "pendidikan digital indonesia",
    "literasi digital siswa",
    "komitmen digital nasional",
    "survei penggunaan gadget",
    "inovasi pendidikan",
  ],
  authors: [{ name: "GESAMEGA Tim Riset" }],
  creator: "GESAMEGA",
  publisher: "GESAMEGA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://gesamega.web.id",
    title: "GESAMEGA | Gerakan Sekolah Bijak Mengelola Gadget",
    description:
      "Platform kolaboratif nasional untuk mendorong penggunaan gadget yang sehat, terukur, dan berdampak positif pada kualitas pendidikan sekolah di seluruh Indonesia.",
    siteName: "GESAMEGA",
    images: [
      {
        url: "/assets/Logo-Gesa-media.svg",
        width: 1200,
        height: 630,
        alt: "GESAMEGA - Gerakan Sekolah Bijak Mengelola Gadget",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GESAMEGA | Gerakan Sekolah Bijak Mengelola Gadget",
    description:
      "Membangun ekosistem digital sekolah yang sehat dan berkualitas.",
    images: ["/assets/Logo-Gesa-media.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-gray-800">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
