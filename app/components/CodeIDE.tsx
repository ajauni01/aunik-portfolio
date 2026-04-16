"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

// Attention-grabbing .NET snippet: Minimal API + DI + EF Core style + Result pattern + validation + logging
const codeLines = [
  "using Microsoft.EntityFrameworkCore;",
  "using Microsoft.AspNetCore.Http.HttpResults;",
  "",
  "var builder = WebApplication.CreateBuilder(args);",
  "builder.Services.AddDbContext<AppDb>(o => o.UseInMemoryDatabase(\"portfolio\"));",
  "builder.Services.AddScoped<IWorkItems, WorkItems>();",
  "builder.Services.AddEndpointsApiExplorer();",
  "",
  "var app = builder.Build();",
  "",
  "app.MapPost(\"/api/work-items\", async (CreateWorkItem req, IWorkItems svc, CancellationToken ct) =>",
  "{",
  "    if (string.IsNullOrWhiteSpace(req.Title))",
  "        return TypedResults.BadRequest(new { error = \"Title is required\" });",
  "",
  "    var result = await svc.CreateAsync(req.Title.Trim(), ct);",
  "    return result.Match(",
  "        ok  => TypedResults.Created($\"/api/work-items/{ok.Id}\", ok),",
  "        err => TypedResults.Problem(err.Message, statusCode: 500)",
  "    );",
  "});",
  "",
  "app.Run();",
  "",
  "public sealed record CreateWorkItem(string Title);",
  "",
  "public sealed record WorkItem(Guid Id, string Title, string Status, DateTime CreatedUtc);",
  "",
  "public interface IWorkItems",
  "{",
  "    Task<Result<WorkItem>> CreateAsync(string title, CancellationToken ct);",
  "}",
  "",
  "public sealed class WorkItems(AppDb db, ILogger<WorkItems> log) : IWorkItems",
  "{",
  "    public async Task<Result<WorkItem>> CreateAsync(string title, CancellationToken ct)",
  "    {",
  "        var item = new WorkItem(Guid.NewGuid(), title, \"Backlog\", DateTime.UtcNow);",
  "        db.WorkItems.Add(item);",
  "        await db.SaveChangesAsync(ct);",
  "        log.LogInformation(\"Created WorkItem {Id} ({Title})\", item.Id, item.Title);",
  "        return Result.Ok(item);",
  "    }",
  "}",
  "",
  "public sealed class AppDb(DbContextOptions<AppDb> o) : DbContext(o)",
  "{",
  "    public DbSet<WorkItem> WorkItems => Set<WorkItem>();",
  "}",
  "",
  "public readonly record struct Result<T>(T? Value, Exception? Error)",
  "{",
  "    public static Result<T> Ok(T value) => new(value, null);",
  "    public static Result<T> Fail(Exception e) => new(default, e);",
  "    public TResult Match<TResult>(Func<T, TResult> ok, Func<Exception, TResult> err)",
  "        => Error is null ? ok(Value!) : err(Error);",
  "}",
];

export default function CodeIDE() {
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Tiny status ticker to make it feel "alive" and production-y.
  const statusMessages = useMemo(
    () => [
      "dotnet build  ✅  Build succeeded",
      "dotnet test   ✅  32 passed",
      "dotnet format ✅  Clean",
      "docker build  ✅  Image ready",
      "deploy        ✅  Ready to ship",
    ],
    []
  );
  const [statusIdx, setStatusIdx] = useState(0);

  // Typewriter effect
  useEffect(() => {
    if (lineIndex < codeLines.length) {
      if (charIndex < codeLines[lineIndex].length) {
        const timeout = setTimeout(() => setCharIndex((prev) => prev + 1), 16);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setLineIndex((prev) => prev + 1);
          setCharIndex(0);
          setDisplayText((prev) => [...prev, codeLines[lineIndex]]);
        }, 60);
        return () => clearTimeout(timeout);
      }
    }
  }, [lineIndex, charIndex]);

  // Status ticker
  useEffect(() => {
    const t = setInterval(() => {
      setStatusIdx((i) => (i + 1) % statusMessages.length);
    }, 2200);
    return () => clearInterval(t);
  }, [statusMessages.length]);

  const keyword = "text-blue-400";
  const type = "text-emerald-400";
  const string = "text-violet-400";
  const dim = "text-muted-foreground/70";

  const renderLine = (line: string, key: string) => {
    const trimmed = line.trim();

    const isComment = trimmed.startsWith("//");
    const isBrace = trimmed === "{" || trimmed === "}";
    const hasString = line.includes('"');

    // C# / .NET keywords-ish (simple & fast highlighting)
    const firstToken = trimmed.split(/\s+/)[0] ?? "";
    const isKeyword =
      /^(using|var|public|sealed|record|interface|class|async|await|return|if|Task|DateTime|Guid|CancellationToken)\b/.test(
        firstToken
      );

    if (isComment) {
      return (
        <div className="leading-6 min-h-6" key={key}>
          <span className={dim}>{line}</span>
        </div>
      );
    }

    if (isBrace) {
      return (
        <div className="leading-6 min-h-6" key={key}>
          <span className={dim}>{line}</span>
        </div>
      );
    }

    if (hasString) {
      const parts = line.split('"');
      return (
        <div className="leading-6 min-h-6" key={key}>
          <span className="text-foreground">{parts[0]}</span>
          <span className={string}>"{parts[1] ?? ""}"</span>
          <span className="text-foreground">{parts.slice(2).join('"')}</span>
        </div>
      );
    }

    if (/WebApplication|DbContext|DbSet|ILogger|TypedResults|UseInMemoryDatabase/.test(line)) {
      return (
        <div className="leading-6 min-h-6" key={key}>
          <span className={type}>{line}</span>
        </div>
      );
    }

    if (isKeyword) {
      return (
        <div className="leading-6 min-h-6" key={key}>
          <span className={keyword}>{firstToken}</span>
          <span className="text-foreground">
            {" "}
            {line.replace(firstToken, "")}
          </span>
        </div>
      );
    }

    return (
      <div className="leading-6 min-h-6" key={key}>
        <span className="text-foreground">{line}</span>
      </div>
    );
  };

  return (
  <div className="w-full max-w-2xl mx-auto mt-12 glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl text-left font-mono">
    {/* Title bar */}
    <div className="flex items-center justify-between px-6 py-3 bg-white/5 border-b border-white/5">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
      </div>

      <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        InterviewMode.Api.cs — .NET
      </div>
    </div>

    {/* IDE body: editor + status bar */}
    <div className="h-[340px] flex flex-col">
      {/* Editor */}
      <div className="relative flex-1 overflow-hidden p-8 text-xs md:text-sm">
        {/* Line numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-white/5 flex flex-col items-center py-8 text-muted-foreground/30 select-none">
          {Array.from({ length: 44 }).map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        <div className="pl-8">
          {displayText.map((line, i) => renderLine(line, `${i}-${line}`))}

          {lineIndex < codeLines.length && (
            <div className="leading-6 flex items-center">
              <span className="text-foreground">
                {codeLines[lineIndex].substring(0, charIndex)}
              </span>
              <motion.div
                animate={{ opacity: [0, 1] }}
                transition={{ repeat: Infinity, duration: 0.75 }}
                className="w-2 h-4 bg-blue-500 ml-1"
              />
            </div>
          )}
        </div>

        {/* Bottom fade (ONLY inside editor, not over status bar) */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background to-transparent" />
      </div>

      {/* Status bar (no absolute positioning = no overlap) */}
      <div className="px-6 py-3 bg-white/5 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="uppercase tracking-widest">
            {statusMessages[statusIdx]}
          </span>
        </div>

        <div className="text-[11px] text-muted-foreground/80">
          <span className="text-blue-400">API</span> •{" "}
          <span className="text-emerald-400">DB</span> •{" "}
          <span className="text-violet-400">UI</span>
        </div>
      </div>
    </div>
  </div>
);
}
