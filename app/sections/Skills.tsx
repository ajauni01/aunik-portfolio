"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Cpu,
  Code,
  Layout,
  Server,
  Database,
  Layers,
  Terminal,
  Globe,
  Zap,
  Shield,
  GitBranch,
  PenTool,
} from "lucide-react";

const skills = [
  { name: "React / Next.js", icon: Code, level: 95, color: "blue" },
  { name: "TypeScript", icon: Zap, level: 90, color: "yellow" },
  { name: "Tailwind CSS", icon: Layout, level: 95, color: "cyan" },
  { name: "Node.js", icon: Server, level: 85, color: "green" },
  { name: "PostgreSQL", icon: Database, level: 80, color: "indigo" },
  { name: "Three.js / Canvas", icon: Globe, level: 75, color: "purple" },
  { name: "UI/UX Design", icon: PenTool, level: 85, color: "rose" },
  { name: "Git / CI/CD", icon: GitBranch, level: 90, color: "orange" },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="skills" className="py-24 md:py-32 bg-accent/20" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Technical Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Tools and technologies I use to bring ideas to life.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group p-6 glass rounded-2xl border border-transparent hover:border-blue-500/50 transition-all cursor-default"
            >
              <div className="mb-4 p-3 inline-block rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <skill.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">{skill.name}</h3>
              <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className="h-full bg-blue-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
