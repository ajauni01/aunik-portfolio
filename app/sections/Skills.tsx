"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code,
  Layout,
  Server,
  Database,
  Shield,
  GitBranch,
  Terminal,
} from "lucide-react";

const skills = [
  { name: "C# / .NET", icon: Code, level: 92 },
  { name: "ASP.NET Core (Web APIs)", icon: Server, level: 88 },
  { name: "Entity Framework Core", icon: Database, level: 85 },
  { name: "SQL Server / PostgreSQL", icon: Database, level: 82 },

  { name: "Blazor", icon: Layout, level: 75 },
  { name: "Angular", icon: Layout, level: 78 },
  { name: "React.js", icon: Layout, level: 85 },
  { name: "REST APIs & Integration", icon: Server, level: 86 },

  { name: "Authentication (JWT/Identity)", icon: Shield, level: 72 },
  { name: "Git / CI/CD", icon: GitBranch, level: 86 },
  { name: "Docker (Basics)", icon: Terminal, level: 70 },
  { name: "Azure (Basics)", icon: Terminal, level: 68 },
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
            Full-stack .NET tools I use to ship clean, scalable applications
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
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
                  transition={{ duration: 1, delay: 0.35 + i * 0.06 }}
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
