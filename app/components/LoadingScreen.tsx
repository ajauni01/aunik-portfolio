"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-1000 bg-background flex flex-col items-center justify-center"
        >
          <div className="relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-[2px] bg-blue-500 relative z-10"
            />
            <div className="h-[2px] w-[200px] bg-white/10 absolute top-0" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 text-xs uppercase tracking-[0.4em] font-medium text-muted-foreground"
          >
            Aunik Portfolio <span className="text-blue-500">2026</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
