"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}

export default function ThemeToggle({ mobile = false }: { mobile?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const nextTheme: Theme =
      saved === "light" || saved === "dark"
        ? (saved as Theme)
        : "dark";

    setTheme(nextTheme);
    applyTheme(nextTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={`rounded-full border border-border ${
          mobile ? "h-10 w-10" : "h-9 w-9"
        }`}
      />
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      whileTap={{ scale: 0.92 }}
      className={`group relative grid place-items-center overflow-hidden rounded-full border border-border/70 bg-background/70 backdrop-blur-md transition-colors hover:border-blue-400/50 ${
        mobile ? "h-10 w-10" : "h-9 w-9"
      }`}
    >
      <span className="pointer-events-none absolute inset-0 bg-linear-to-r from-blue-500/15 to-cyan-400/10" />
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            <Sun className="h-4 w-4 text-foreground" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            <Moon className="h-4 w-4 text-foreground" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
