"use client";

import { motion } from "framer-motion";

const columns = Array.from({ length: 20 });

export default function LogicFlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div className="absolute inset-0 flex justify-around">
        {columns.map((_, i) => (
          <div
            key={i}
            className="relative w-px h-full bg-linear-to-b from-transparent via-blue-500/20 to-transparent"
          >
            <motion.div
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
              className="absolute left-1/2 -translate-x-1/2 w-4 flex flex-col items-center gap-1"
            >
              {[0, 1, 0, 1, 0].map((bit, j) => (
                <span
                  key={j}
                  className="text-[10px] font-mono text-blue-500/40"
                >
                  {bit}
                </span>
              ))}
              <div className="w-[2px] h-20 bg-linear-to-b from-blue-500 to-transparent blur-[1px]" />
            </motion.div>
          </div>
        ))}
      </div>

      {/* Horizontal grid lines */}
      <div className="absolute inset-0 flex flex-col justify-around opacity-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-full h-px bg-blue-500/20" />
        ))}
      </div>
    </div>
  );
}
