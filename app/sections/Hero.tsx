"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import CodeIDE from "@/app/components/CodeIDE";
import HeroBackground from "@/app/components/HeroBackground";
import {
  Code2,
  Rocket,
  Database,
  Cloud,
  Terminal,
  Layers,
} from "lucide-react";

const FloatingIcon = ({
  icon: Icon,
  initialX,
  initialY,
  delay = 0,
  duration = 20,
}: {
  icon: any;
  initialX: string;
  initialY: string;
  delay?: number;
  duration?: number;
}) => {
  return (
    <motion.div
      initial={{ x: initialX, y: initialY, opacity: 0, scale: 0 }}
      animate={{
        y: [initialY, "calc(" + initialY + " - 40px)", initialY],
        opacity: [0, 0.4, 0.4, 0],
        scale: [0.8, 1.1, 0.8],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
        opacity: {
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
        default: { duration: 1, delay: delay * 0.1 },
      }}
      className="absolute hidden lg:block text-blue-500/30"
    >
      <Icon size={40} strokeWidth={1} />
    </motion.div>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(0, springConfig);
  const mouseYSpring = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      setMousePosition({ x, y });
      mouseXSpring.set(clientX);
      mouseYSpring.set(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseXSpring, mouseYSpring]);

  const nameLetters = "Ajharul Islam".split("");
  const surnameLetters = "Aunik".split("");

  return (
    <section
      ref={containerRef}
      className="relative min-h-[160vh] flex flex-col items-center justify-start overflow-hidden pt-40 pb-20"
    >
      <HeroBackground />

      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.08), transparent 40%)`,
        }}
      />

      {/* Floating Decorative Icons */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <FloatingIcon icon={Code2} initialX="15%" initialY="20%" delay={0} />
        <FloatingIcon icon={Database} initialX="80%" initialY="15%" delay={1} />
        <FloatingIcon icon={Cloud} initialX="10%" initialY="70%" delay={2} />
        <FloatingIcon icon={Layers} initialX="85%" initialY="65%" delay={3} />
        <FloatingIcon icon={Terminal} initialX="70%" initialY="40%" delay={4} />
        <FloatingIcon icon={Rocket} initialX="25%" initialY="45%" delay={5} />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 100,
            delay: 0.2,
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full glass text-sm font-medium text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          CS @ Wayne State • Software Engineer (.NET, C#, ASP.NET Core, React, Angular)
        </motion.div>

        {/* Hero Title */}
        <div className="relative mb-8">
          <motion.h1
            style={{ y: y1, scale }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] relative"
          >
            <div className="flex justify-center flex-wrap">
              {nameLetters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.05,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            <div className="flex justify-center flex-wrap text-blue-500 mt-2">
              {surnameLetters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    damping: 12,
                    stiffness: 200,
                    delay: 1.2 + i * 0.1,
                  }}
                  className="inline-block drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.h1>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        </div>

        {/* Subtitle (Short + .NET-focused) */}
        <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 2 }}
  className="max-w-2xl mx-auto text-lg md:text-2xl text-muted-foreground mb-12 leading-relaxed font-light"
>
  Building scalable{" "}
  <span className="text-white font-medium">full-stack applications</span>{" "}
  with <span className="text-blue-400 font-mono">C#/.NET</span>,{" "}
  <span className="text-emerald-400">clean APIs</span>, and{" "}
  <span className="text-blue-300">modern frontend experiences</span>
</motion.p>


        {/* Buttons (Shorter labels) */}
       <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 2.2 }}
  className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
>
  {/* Projects (Secondary) */}
  <a href="#projects" className="w-full sm:w-auto">
    <motion.button
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 30px rgba(59,130,246,0.35)",
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative px-10 py-5 rounded-full font-bold transition-all overflow-hidden w-full sm:w-auto text-white"
    >
      <div className="absolute inset-0 bg-blue-600 opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-white/0 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative z-10 flex items-center gap-2">
        Projects
        <Rocket
          size={20}
          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
        />
      </span>
    </motion.button>
  </a>

  {/* Resume (PRIMARY) — stands out */}
  <a
    href="/resume.pdf"
    download="Ajharul_Islam_Aunik_Resume.pdf"
    className="w-full sm:w-auto"
  >
    <motion.button
      whileHover={{
        scale: 1.06,
        boxShadow: "0 0 40px rgba(16,185,129,0.45)",
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative px-10 py-5 rounded-full font-extrabold transition-all overflow-hidden w-full sm:w-auto text-white"
    >
      {/* Emerald/teal “hire me” vibe */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <span className="relative z-10 flex items-center gap-2">
        Resume
        <Terminal
          size={20}
          className="group-hover:translate-y-[-2px] group-hover:rotate-[-6deg] transition-transform"
        />
      </span>
    </motion.button>
  </a>

  {/* Contact (Tertiary) — outline/glass */}
  <a href="#contact" className="w-full sm:w-auto">
    <motion.button
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(255,255,255,0.08)",
      }}
      whileTap={{ scale: 0.95 }}
      className="px-10 py-5 rounded-full font-bold transition-all w-full sm:w-auto
                 border border-white/20 text-white/90 backdrop-blur-md bg-white/5
                 hover:border-white/35 flex items-center justify-center gap-2"
    >
      Contact <Terminal size={20} />
    </motion.button>
  </a>
</motion.div>



        {/* Code IDE */}
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
          className="relative mt-20"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000" />
            <CodeIDE />
          </div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-12 -right-6 hidden lg:block p-5 glass rounded-3xl border-blue-500/30 backdrop-blur-3xl shadow-2xl"
          >
            <div className="flex items-center gap-3 text-xs font-black tracking-widest text-blue-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              DOTNET_READY • SHIPPING_SOON
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] font-black text-blue-400/50">
          Scroll
        </span>
        <div className="relative w-1 h-20 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
