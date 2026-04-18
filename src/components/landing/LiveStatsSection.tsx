"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { School, Handshake, TrendingUp } from "lucide-react";

interface LiveStatsSectionProps {
  schools: number;
  commitments: number;
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("id-ID")}{suffix}
    </span>
  );
}

export function LiveStatsSection({ schools, commitments }: LiveStatsSectionProps) {
  const participationRate = schools > 0 ? Math.round((commitments / schools) * 100) : 0;

  const stats = [
    { icon: School,     value: schools,           suffix: "+", label: "Sekolah Terdaftar",   color: "text-sky-500", bg: "bg-sky-50 border-sky-100" },
    { icon: Handshake,  value: commitments,        suffix: "+", label: "Komitmen Tersahkan",  color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-100" },
    { icon: TrendingUp, value: participationRate,  suffix: "%", label: "Rasio Partisipasi",   color: "text-amber-500", bg: "bg-amber-50 border-amber-100" },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label-light bg-sky-50 text-sky-600 mb-5">Data Real-Time</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5 mb-4 leading-tight tracking-tight">
            Statistik{" "}
            <span className="text-sky-500">Partisipasi</span>{" "}
            Terkini
          </h2>
          <p className="text-gray-600 font-medium max-w-xl mx-auto text-lg">
            Data langsung dari sistem kami, diperbarui secara otomatis setiap kali sekolah baru berpartisipasi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="clean-card bg-white rounded-3xl p-8 text-center flex flex-col items-center"
            >
              <div
                className={`inline-flex p-4 rounded-2xl ${stat.bg} mb-6 shadow-sm border`}
              >
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>

              <h3 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-gray-500 font-semibold uppercase text-xs tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
