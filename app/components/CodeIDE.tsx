"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const codeLines = [
  'import { useMotionValue, useSpring } from "framer-motion";',
  "",
  "export const useScrollVelocity = () => {",
  "  const scrollY = useScrollY();",
  "  const velocity = useMotionValue(0);",
  "  ",
  "  useEffect(() => {",
  "    return scrollY.onChange((v) => {",
  "      velocity.set(v - scrollY.getPrevious());",
  "    });",
  "  }, [scrollY, velocity]);",
  "",
  "  return useSpring(velocity, {",
  "    stiffness: 100,",
  "    damping: 30,",
  "  });",
  "};",
];

export default function CodeIDE() {
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < codeLines.length) {
      if (charIndex < codeLines[lineIndex].length) {
        const timeout = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setLineIndex((prev) => prev + 1);
          setCharIndex(0);
          setDisplayText((prev) => [...prev, codeLines[lineIndex]]);
        }, 100);
        return () => clearTimeout(timeout);
      }
    }
  }, [lineIndex, charIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl text-left font-mono">
      <div className="flex items-center justify-between px-6 py-3 bg-white/5 border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          MotionHook.ts — Edit
        </div>
      </div>
      <div className="p-8 text-xs md:text-sm overflow-hidden h-[320px] relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-white/5 flex flex-col items-center py-8 text-muted-foreground/30 select-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="pl-8">
          {displayText.map((line, i) => (
            <div key={i} className="leading-6 min-h-6">
              <span className="text-blue-400">
                {line.startsWith("import")
                  ? "import"
                  : line.startsWith("export")
                    ? "export"
                    : ""}
              </span>
              <span className="text-foreground">
                {" "}
                {line.replace(/import|export/g, "")}
              </span>
            </div>
          ))}
          {lineIndex < codeLines.length && (
            <div className="leading-6 flex items-center">
              <span className="text-foreground">
                {codeLines[lineIndex].substring(0, charIndex)}
              </span>
              <motion.div
                animate={{ opacity: [0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-blue-500 ml-1"
              />
            </div>
          )}
        </div>

        {/* Syntax highlighting overlay/blur for effect */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-background to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
