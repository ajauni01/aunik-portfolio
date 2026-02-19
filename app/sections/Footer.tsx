"use client";

import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold tracking-tighter mb-2">
              AUNIK<span className="text-blue-500">.</span>
            </h3>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Ajharul Islam Aunik. All rights
              reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">

            <a
              href="https://www.linkedin.com/in/ajharul-islam-aunik/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-3 glass rounded-full hover:bg-blue-500 hover:text-white transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/ajauni01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-3 glass rounded-full hover:bg-blue-500 hover:text-white transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            
          </div>

          <div className="text-muted-foreground text-sm flex gap-6">
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">
            Handcrafted with Next.js, Framer Motion & ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
