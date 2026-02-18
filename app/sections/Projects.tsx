"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "FoundrLab",
    description:
      "An AI-powered platform helping rural Nebraska CS students build like founders-structured program, product-building workflows, and mentor/investor guidance.",
    image:
      "FoundrLab.png",
    tags: [
      "ASP.NET Core",
      "C#",
      "EF Core",
      "PostgreSQL",
      "Blazor",
      "REST APIs",
      "Azure",
    ],
    github: "https://github.com/ajauni01/Foundrlab-frontend",
    live: "https://fbefa24550c74f0bafe19fff83f94126-main.projects.builder.my/",
  },
  {
    title: "StudentHub",
    description:
      "A student-first hub for housing, volunteering and peer connections—currently in development with a mobile-first experience.",
    image:
      "StudentHub.png",
    tags: [
      "ASP.NET Core",
      "C#",
      "EF Core",
      "PostgreSQL",
      "React Native",
      "Mobile API",
      "Auth",
    ],
    github: "https://github.com/ajauni01/StudentHub-frontend",
    live: "https://54247e79019e4d87a2b9eaaef65d1aa4-main.projects.builder.my/",
  },
  {
    title: "Ema-John (E-commerce)",
    description:
      "A clean e-commerce site built to practice real-world flows—product listing, cart, and checkout basics with a focus on UI and state management.",
    image: "e-commerce.png",
    tags: ["React", "JavaScript", "Firebase/Auth", "REST APIs", "UI"],
    github: "https://github.com/ajauni01/e-commerce-website",
    live: "https://e-commerce-website-dusky-seven.vercel.app/",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="projects" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Real builds in the C#/.NET ecosystem—API-first, maintainable, and
              made to ship
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <a
              href="https://github.com/ajauni01"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 font-medium hover:underline flex items-center gap-2"
            >
              View All GitHub <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group bg-accent/30 rounded-3xl overflow-hidden border border-border/50 hover:border-blue-500/50 transition-all"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover actions */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 glass rounded-full hover:bg-white/20"
                      aria-label={`${project.title} GitHub`}
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 glass rounded-full hover:bg-white/20"
                      aria-label={`${project.title} Live link`}
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional: quick credibility line under cards */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="text-center text-xs text-muted-foreground mt-10"
        >
          Built with a focus on clean architecture, readable code, and
          production-style workflows (API design, database modeling, and UI
          polish).
        </motion.p>
      </div>
    </section>
  );
}
