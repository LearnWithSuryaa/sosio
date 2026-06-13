"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-999 h-0.75 bg-slate-200/50 backdrop-blur-sm">
      <div
        className="h-full transition-[width] duration-75 ease-out bg-linear-to-r from-info via-primary to-info"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
