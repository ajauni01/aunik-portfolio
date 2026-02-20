"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Briefcase,
  GraduationCap,
  Users,
  MapPin,
  BadgeCheck,
} from "lucide-react";

const events = [
  {
    type: "work",
    title: "Nucor Corporation (Vulcraft/Verco Group)",
    role: "Incoming Software Development Intern",
    date: "Summer 2026",
    description:
      "Selected to join Nucor to build production software—shipping measurable improvements with a strong engineering cadence and .NET-first mindset.",
    icon: Briefcase,
    highlight: true,
  },
  {
    type: "work",
    title: "Wayne State College",
    role: "Peer Tutor (Computer Science)",
    date: "Jan 2024 – Mar 2025",
    description:
      "Mentored 30+ CS students across React, Node, MySQL, and Git—helping 10+ projects ship through debugging, architecture support, and clean code coaching.",
    icon: Users,
  },
  {
    type: "work",
    title: "Daycos",
    role: "Software Engineer Intern",
    date: "May 2024 – Nov 2024",
    description:
      "Helped relaunch a core service to 2 customers, cutting annual labor 2,500→440 hours (82%) while modernizing performance with Node.js, SvelteKit, and Hasura GraphQL.",
    icon: Briefcase,
  },
  {
    type: "work",
    title: "Esri",
    role: "Student Assistant — Esri User Conference",
    date: "Jul 2024",
    description:
      "Supported operations for 2,000+ attendees at Esri’s flagship conference—improving check-in flow and session accessibility with on-site teams.",
    icon: MapPin,
  },
  {
    type: "leadership",
    title: "ACM (Association for Computing Machinery)",
    role: "Secretary (Volunteer Leadership)",
    date: "Jan 2024 – Apr 2025",
    description:
      "Led logistics + communication for 30+ member events, streamlining attendance and coordination to keep the club operating like a high-output team.",
    icon: BadgeCheck,
  },
  {
    type: "education",
    title: "Wayne State College",
    role: "B.S. in Computer Science, Minor in Geospatial Technology",
    date: "2022 – Present",
    description:
      "Senior CS major focused on full-stack systems—building maintainable software with strong fundamentals, clean APIs, and modern UI engineering.",
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
            Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.80}}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Professional impact + strong co-curricular leadership—built for teams
            that ship.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {events.map((event, i) => (
            <motion.div
              key={`${event.title}-${event.role}-${event.date}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.50, 1] }}
              className="relative mb-12 last:mb-0 pl-16 md:pl-0"
            >
              {/* Timeline line */}
              <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

              <div
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 w-full">
                  <div
                    className={`p-8 glass rounded-3xl border ${
                      event.highlight
                        ? "border-blue-500/60"
                        : "border-border/50"
                    } hover:border-blue-500/50 transition-all group`}
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

                {/* Node */}
                <div className="absolute left-8 md:static flex items-center justify-center w-12 h-12 bg-background border-2 border-border rounded-full z-10 shrink-0 shadow-lg">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      event.highlight
                        ? "bg-blue-500 animate-pulse"
                        : "bg-muted-foreground"
                    }`}
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
