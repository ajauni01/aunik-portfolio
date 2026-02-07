"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const lines = [
  { text: "> Initializing portfolio...", delay: 0 },
  { text: "> Loading skills: React, Next.js, TypeScript", delay: 1000 },
  { text: "> Fetching projects...", delay: 2000 },
  { text: "> System: Ready for deployment.", delay: 3000 },
];

export default function TerminalMockup() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    lines.forEach((_, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, lines[i].delay);
    });
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mt-12 glass rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="ml-2 text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
          bash — 80x24
        </span>
      </div>
      <div className="p-6 font-mono text-xs md:text-sm text-left min-h-[160px]">
        {lines.map(
          (line, i) =>
            visibleLines.includes(i) && (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`mb-2 ${i === lines.length - 1 ? "text-emerald-400" : "text-blue-400"}`}
              >
                {line.text}
              </motion.div>
            ),
        )}
        {visibleLines.length === lines.length && (
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-blue-500 ml-1 translate-y-1"
          />
        )}
      </div>
    </div>
  );
}
