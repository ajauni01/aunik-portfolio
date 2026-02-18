"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

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

          {/* LEFT SIDE (TEXT) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Building <span className="text-blue-500">.NET</span> Systems End-to-End.
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
  I’m a senior majoring in Computer Science at Wayne State College, focused on
  full-stack development in the{" "}
  <span className="text-foreground font-medium">C#/.NET</span>{" "}
  ecosystem — building clean APIs, solid data models, and UIs that feel fast
  and straightforward.
</p>


              <p>
                I care about the things teams actually maintain:{" "}
                <span className="text-foreground font-medium">readable code</span>,{" "}
                <span className="text-foreground font-medium">clear boundaries</span>,{" "}
                and{" "}
                <span className="text-foreground font-medium">reliable integrations</span>.
                My default stack is ASP.NET Core + EF Core + SQL, paired with
                React / Angular (and Blazor when it fits).
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <h4 className="text-foreground font-bold text-2xl mb-1">2+</h4>
                  <p className="text-sm">Years Building with C#</p>
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-2xl mb-1">10+</h4>
                  <p className="text-sm">Projects Shipped</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE (PROFILE CARD) */}
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

                  {/* PROFILE IMAGE */}
                  <div className="mb-4">
                   <Image
  src="/picture.jpg"
  alt="Ajharul Islam Aunik"
  width={350}
  height={300}
  priority
  className="rounded-full object-cover mx-auto border-2 border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.25)]"
/>

                  </div>

                  <h3 className="text-xl font-bold mb-2">
                    Wayne State College
                  </h3>
                  <p className="text-muted-foreground tracking-wide uppercase text-xs">
                    CS • .NET Full-Stack Focus
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
