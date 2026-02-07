"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MessageSquare, Linkedin, Github, Send } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-6xl font-bold mb-8 tracking-tighter">
                Let's Build <br /> Something{" "}
                <span className="text-blue-500">Amazing</span>.
              </h2>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                I'm currently looking for new opportunities and collaborations.
                Whether you have a question or just want to say hi, my inbox is
                always open!
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:hello@aunik.dev"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                      Email Me
                    </p>
                    <p className="text-lg font-bold">hello@aunik.dev</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                      Connect
                    </p>
                    <a
                      href="https://www.linkedin.com/in/ajharul-islam-aunik/"
                      className="text-lg font-bold"
                      target="_blank"
                    >
                      linkedin.com/in/ajharul-islam-aunik
                    </a>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-8 md:p-12 rounded-4xl border-white/10"
            >
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 group">
                  Send Message{" "}
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
