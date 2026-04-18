"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ShieldCheck, Users, Activity } from "lucide-react";

interface StatsSectionProps {
  schools: number;
  students: number;
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <h3 ref={ref} className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">{count.toLocaleString("id-ID")}{suffix}</h3>;
}

export function StatsSection({ schools, students }: StatsSectionProps) {
  const stats = [
    { icon: ShieldCheck, value: schools,  suffix: "+", label: "Sekolah Berkomitmen",  color: "text-sky-500", bg: "bg-sky-50" },
    { icon: Users,       value: students, suffix: "+", label: "Siswa Terdampak",       color: "text-emerald-500", bg: "bg-emerald-50" },
    { icon: Activity,    value: 100,      suffix: "%", label: "Transparansi Data",     color: "text-violet-500", bg: "bg-violet-50" },
  ];

  return (
    <section className="relative z-20 w-full max-w-5xl px-4 mx-auto -mt-16 pb-12 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="clean-card bg-white rounded-3xl p-8 text-center group flex flex-col items-center border border-gray-100 shadow-xl shadow-gray-200/40"
          >
            <div
              className={`inline-flex p-4 rounded-2xl ${stat.bg} mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-white`}
            >
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            <p className="text-gray-500 font-semibold mt-2 uppercase text-xs tracking-wide">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
