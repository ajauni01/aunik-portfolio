"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Mail, Linkedin, Send, Briefcase, Sparkles } from "lucide-react";

const TOAST_DURATION_MS = 3200;

type FormState = {
  name: string;
  email: string;
  message: string;
};

type ToastState = {
  open: boolean;
  status: "success" | "error";
  title: string;
  message: string;
};

const INITIAL_FORM_STATE: FormState = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    open: false,
    status: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showToast = (nextToast: Omit<ToastState, "open">) => {
    setToast({ ...nextToast, open: true });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(
      () => setToast((prev) => ({ ...prev, open: false })),
      TOAST_DURATION_MS
    );
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formState.name.trim() ||
      !formState.email.trim() ||
      !formState.message.trim()
    ) {
      showToast({
        status: "error",
        title: "Missing details",
        message: "Please fill in all fields before sending.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;
        throw new Error(data?.message || "Failed to send message.");
      }

      setFormState(INITIAL_FORM_STATE);
      showToast({
        status: "success",
        title: "Message sent",
        message: "Got it—I'll reply soon.",
      });
    } catch (error) {
      showToast({
        status: "error",
        title: "Could not send",
        message:
          error instanceof Error ? error.message : "Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Recruiter-first pitch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-6xl font-bold mb-6 tracking-tighter">
                Hire-ready. <br />
                <span className="text-blue-500">Easy to reach.</span>
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Recruiter-friendly inbox: tell me the role + stack (C#/.NET, APIs,
                SQL, React/Angular/Blazor) and I’ll reply with the best-matching projects and resume
              </p>

              {/* Quick bullets recruiters care about */}
              <div className="grid gap-3 mb-10">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Briefcase className="w-4 h-4" />
                  </span>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-semibold">
                      Best-fit roles:
                    </span>{" "}
                    .NET Full-Stack / Backend (ASP.NET Core, EF Core, SQL) +
                    modern UI (React/Angular/Blazor).
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-semibold">
                      What you get:
                    </span>{" "}
                    clean code, strong ownership, and production-minded
                    execution.
                  </p>
                </div>
              </div>

              {/* Contact links */}
              <div className="space-y-6">
                <a
                  href="mailto:aunik15711@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                      Email
                    </p>
                    <p className="text-lg font-bold">aunik15711@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/ajharul-islam-aunik/"
                  className="flex items-center gap-4 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                      LinkedIn
                    </p>
                    <p className="text-lg font-bold">
                      linkedin.com/in/ajharul-islam-aunik
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right: Form (recruiter optimized prompts) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-8 md:p-12 rounded-4xl border-white/10"
            >
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                  Send a recruiting note
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Include role title, location/remote, and start date—I'll reply
                  with the best-matching projects and resume.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Recruiter / Hiring Manager"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="name@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    placeholder={`Open Role:
Primary Stack:
Biggest engineering challenge right now:
When can we talk?`}

                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 group disabled:opacity-60 disabled:hover:scale-100"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  Prefer LinkedIn? Send a message with the role + stack and I’ll
                  respond quickly.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div
              className={`glass rounded-2xl px-4 py-3 shadow-2xl backdrop-blur-xl ${
                toast.status === "success"
                  ? "border border-blue-400/30"
                  : "border border-red-400/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    toast.status === "success"
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  <Send className="w-4 h-4 -rotate-12" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {toast.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{toast.message}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
