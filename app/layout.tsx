import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import LoadingScreen from "./components/LoadingScreen";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Ajharul Islam Aunik | Software Engineer",
  description:
    "Personal portfolio of Ajharul Islam Aunik, a Computer Science student at Wayne State College specializing in high-end frontend development and software engineering.",
  keywords: [
    "Ajharul Islam Aunik",
    "Software Engineer",
    "Wayne State College",
    "Portfolio",
    "Next.js",
    "React",
  ],
  openGraph: {
    title: "Ajharul Islam Aunik | Software Engineer",
    description:
      "High-end personal portfolio exploring modern web experiences.",
    url: "https://aunik.dev",
    siteName: "Aunik's Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem("theme");
                  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  var theme = savedTheme === "light" || savedTheme === "dark"
                    ? savedTheme
                    : (prefersDark ? "dark" : "light");
                  document.documentElement.classList.toggle("dark", theme === "dark");
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${outfit.variable} font-sans antialiased text-foreground bg-background`}
      >
        <div className="noise-overlay" />
        <LoadingScreen />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
