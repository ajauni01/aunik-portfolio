"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="about"
      className="py-24 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 2, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Engineering <span className="text-blue-500">Digital</span>{" "}
              Experiences.
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I am a dedicated Computer Science student at Wayne State
                College, driven by the intersection of complex backend
                architecture and elegant frontend design.
              </p>
              <p>
                My philosophy revolves around creating software that is not only
                functional but also provides a seamless and delightful user
                experience. I believe that every line of code should contribute
                to a larger, purposeful narrative.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <h4 className="text-foreground font-bold text-2xl mb-1">
                    2+
                  </h4>
                  <p className="text-sm">Years of Coding</p>
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-2xl mb-1">
                    10+
                  </h4>
                  <p className="text-sm">Projects Completed</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="aspect-square glass rounded-3xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-linear-to-tr from-blue-500/20 to-violet-500/20 group-hover:opacity-0 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">👨‍💻</div>
                  <h3 className="text-xl font-bold mb-2">
                    Wayne State College
                  </h3>
                  <p className="text-muted-foreground tracking-wide uppercase text-xs">
                    Computer Science
                  </p>
                </div>
              </div>
            </div> 

            {/* Abstract decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-violet-500/10 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
