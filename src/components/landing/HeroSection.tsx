"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Users, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return count;
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const { scrollY } = useScroll();
  const sunY = useTransform(scrollY, [0, 800], [0, 150]);
  const cloud1Y = useTransform(scrollY, [0, 800], [0, 80]);
  const cloud2Y = useTransform(scrollY, [0, 800], [0, 100]);
  const buildingY = useTransform(scrollY, [0, 800], [0, 40]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const schools = useCountUp(500, inView);
  const students = useCountUp(12000, inView);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[92vh] overflow-hidden bg-gradient-to-b from-[#FFF7ED] to-[#FFEDD5] flex items-center pt-24 pb-20 lg:pt-32"
    >
      {/* Background layer - Parallax Illustrations */}

      {/* Sun */}
      <motion.div
        style={{ y: sunY }}
        className="absolute top-20 right-[15%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-amber-400 to-orange-300 opacity-60 blur-xl"
      />
      <motion.div
        style={{ y: sunY }}
        className="absolute top-24 right-[16%] w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-amber-300 to-orange-200 shadow-[0_0_80px_rgba(251,191,36,0.5)]"
      />

      {/* Clouds */}
      <motion.div
        style={{ y: cloud1Y }}
        className="absolute top-32 left-[10%] opacity-80 animate-cloud-slow"
      >
        <div className="w-32 h-10 bg-white rounded-full relative">
          <div className="absolute -top-6 left-4 w-12 h-12 bg-white rounded-full" />
          <div className="absolute -top-8 left-12 w-16 h-16 bg-white rounded-full" />
        </div>
      </motion.div>

      <motion.div
        style={{ y: cloud2Y }}
        className="absolute top-48 right-[8%] opacity-60 animate-cloud-fast"
      >
        <div className="w-24 h-8 bg-white rounded-full relative scale-75 md:scale-100">
          <div className="absolute -top-4 left-3 w-8 h-8 bg-white rounded-full" />
          <div className="absolute -top-6 left-8 w-12 h-12 bg-white rounded-full" />
        </div>
      </motion.div>

      <motion.div
        style={{ y: cloud1Y, animationDelay: "2s" }}
        className="absolute top-80 left-[85%] opacity-50 animate-cloud-slow"
      >
        <div className="w-40 h-12 bg-white rounded-full relative scale-50">
          <div className="absolute -top-6 left-4 w-16 h-16 bg-white rounded-full" />
          <div className="absolute -top-10 left-12 w-20 h-20 bg-white rounded-full" />
        </div>
      </motion.div>

      {/* Cityscape / Flat elements at bottom */}
      <motion.div
        style={{ y: buildingY }}
        className="absolute bottom-0 left-0 right-0 h-48 md:h-64 pointer-events-none opacity-20"
      >
        {/* geometric shapes acting as distant flat cityscape */}
        <div className="absolute bottom-0 left-[10%] w-32 h-40 bg-orange-800/10 rounded-t-lg" />
        <div className="absolute bottom-0 left-[18%] w-24 h-56 bg-orange-900/10 rounded-t-lg" />
        <div className="absolute bottom-0 left-[26%] w-40 h-32 bg-orange-700/10 rounded-t-lg" />

        <div className="absolute bottom-0 right-[25%] w-28 h-48 bg-orange-800/10 rounded-t-lg" />
        <div className="absolute bottom-0 right-[15%] w-36 h-36 bg-orange-900/10 rounded-t-lg" />
        <div className="absolute bottom-0 right-[5%] w-20 h-52 bg-orange-700/10 rounded-t-lg" />
      </motion.div>

      <div className="relative z-10 max-w-7xl px-4 mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 section-label-light mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Gerakan Nasional Ekosistem Digital 2026
          </motion.div>

          {/* Headline */}
          <div className="mb-6 overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-5xl lg:text-7xl font-extrabold py-1 text-gray-900 leading-[1.1] tracking-tight"
            >
              Membangun <span className="gradient-text-warm">Pendidikan</span>{" "}
              Era Digital
            </motion.h1>
          </div>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="max-w-xl mb-10 text-lg md:text-xl text-gray-600 leading-relaxed font-medium"
          >
            Inisiatif kolaboratif berbasis partisipasi untuk menciptakan
            penggunaan gadget yang lebih sehat, terukur, dan berdampak pada
            kualitas pendidikan anak negeri.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/panduan" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto text-base shadow-orange-500/20 px-8 py-4">
                  Pelajari Panduan <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/peta" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto text-base px-8 py-4">
                  Lihat Peta Nasional
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Mobile Stats display */}
          <div className="flex md:hidden gap-6 justify-center mt-10">
            <div className="flex flex-col items-center">
              <p className="text-2xl font-black text-orange-500">
                {schools.toLocaleString("id-ID")}+
              </p>
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Sekolah
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl font-black text-rose-500">
                {students.toLocaleString("id-ID")}+
              </p>
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Siswa
              </p>
            </div>
          </div>
        </div>

        {/* Right Content (Stats / Illustration Card) */}
        <div className="lg:col-span-5 relative hidden md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="relative rounded-[2.5rem] bg-white border-2 border-orange-100 p-8 shadow-2xl shadow-orange-500/10 rotate-2 hover:rotate-0 transition-transform duration-500"
          >
            {/* Decorative elements inside card */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-75" />

            <div className="relative flex flex-col gap-8">
              {[
                {
                  icon: ShieldCheck,
                  value: `${schools.toLocaleString("id-ID")}+`,
                  label: "Sekolah Aktif",
                  color: "text-orange-500",
                  bg: "bg-orange-50",
                },
                {
                  icon: Users,
                  value: `${students.toLocaleString("id-ID")}+`,
                  label: "Siswa Terlibat",
                  color: "text-rose-500",
                  bg: "bg-rose-50",
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.2 }}
                  className="flex items-center gap-5 p-4 rounded-2xl transition-all hover:bg-orange-50/50"
                >
                  <div
                    className={`w-14 h-14 rounded-full ${stat.bg} flex items-center justify-center shrink-0`}
                  >
                    <stat.icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900 tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into next section which is white */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
