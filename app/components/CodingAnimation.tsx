"use client";

import { motion } from "framer-motion";

const codeSnippets = [
  'const dev = "Aunik";',
  'import { motion } from "framer-motion";',
  'function build() { return "Success"; }',
  "interface Portfolio { owner: string; }",
  'git commit -m "Initial commit"',
  "npm install experience",
  "await solve(problem);",
  "if (bug) fix(bug);",
  "Map<String, String> skills = new HashMap<>();",
  'console.log("Hello World");',
];

export default function CodingAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {codeSnippets.map((snippet, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100 + "px"],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
          className="absolute whitespace-nowrap font-mono text-xs md:text-sm text-blue-500/50"
        >
          {snippet}
        </motion.div>
      ))}
    </div>
  );
}
