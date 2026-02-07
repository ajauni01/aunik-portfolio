"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const events = [
  {
    type: "education",
    title: "Wayne State College",
    role: "B.S. in Computer Science",
    date: "2023 - Present",
    description:
      "Focusing on software engineering principles, algorithms, and full-stack development.",
    icon: GraduationCap,
    highlight: true,
  },
  {
    type: "work",
    title: "Innovate Tech Labs",
    role: "Frontend Developer Intern",
    date: "Summer 2024",
    description:
      "Developed responsive user interfaces using Next.js and Tailwind CSS. Optimized core web vitals.",
    icon: Briefcase,
  },
  {
    type: "education",
    title: "Self-Directed Learning",
    role: "Advanced Web Engineering",
    date: "2022 - 2023",
    description:
      "In-depth study of React ecosystem, cloud infrastructure, and performance optimization.",
    icon: GraduationCap,
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="experience" className="py-24 md:py-32 bg-accent/20" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Journey & Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            My academic and professional pathway in the tech world.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`relative mb-12 last:mb-0 pl-16 md:pl-0`}
            >
              {/* Timeline line */}
              <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

              <div
                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="flex-1 w-full">
                  <div
                    className={`p-8 glass rounded-3xl border ${event.highlight ? "border-blue-500/50" : "border-border/50"} hover:border-blue-500 transition-all group`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">
                        {event.date}
                      </span>
                      <event.icon className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                    <p className="text-foreground font-medium mb-3">
                      {event.role}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="absolute left-8 md:static flex items-center justify-center w-12 h-12 bg-background border-2 border-border rounded-full z-10 shrink-0 shadow-lg group-hover:border-blue-500 transition-colors">
                  <div
                    className={`w-3 h-3 rounded-full ${event.highlight ? "bg-blue-500 animate-pulse" : "bg-muted-foreground"}`}
                  />
                </div>

                <div className="flex-1 hidden md:block" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
