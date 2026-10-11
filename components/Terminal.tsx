"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Minimize2, SquareTerminal, X } from "lucide-react";
import { about, projects, site, skillGroups, timeline } from "@/lib/data";
import { snappy, terminalPanel } from "@/lib/variants";
import { scrollToSection } from "@/lib/utils";

type Line = { kind: "in" | "out" | "err" | "sys"; text: string };

const themes: Record<string, { accent: string; accent2: string }> = {
  indigo: { accent: "129 140 248", accent2: "45 212 191" },
  emerald: { accent: "52 211 153", accent2: "56 189 248" },
  amber: { accent: "251 191 36", accent2: "251 113 133" },
  rose: { accent: "251 113 133", accent2: "192 132 252" },
};

const sections = ["top", "work", "journey", "stack", "contact"];

const BOOT: Line[] = [
  { kind: "sys", text: `${site.handle}.sh — interactive profile shell` },
  { kind: "sys", text: "Type 'help' to see available commands." },
];

function applyTheme(name: string) {
  const t = themes[name];
  if (!t) return false;
  const root = document.documentElement;
  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--accent-2", t.accent2);
  window.dispatchEvent(new Event("accent-change"));
  return true;
}

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [big, setBig] = useState(false);
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const run = useCallback((raw: string): Line[] => {
    const [cmd, ...args] = raw.trim().split(/\s+/);
    const out = (text: string): Line => ({ kind: "out", text });
    switch (cmd.toLowerCase()) {
      case "":
        return [];
      case "help":
        return [
          out("Commands:"),
          out("  bio            who I am"),
          out("  projects       things I'm building"),
          out("  skills         the toolkit"),
          out("  timeline       roles & research"),
          out("  contact        how to reach me"),
          out("  open <section> jump to: work | journey | stack | contact"),
          out("  theme <name>   indigo | emerald | amber | rose"),
          out("  render <mode>  grid | off   (background particles)"),
          out("  clear · exit"),
        ];
      case "bio":
      case "whoami":
        return about.bio.map(out);
      case "projects":
      case "ls":
        return projects.map((p) => out(`${p.index}  ${p.title.padEnd(32)} ${p.status}`));
      case "skills":
        return skillGroups.map((g) => out(`${g.title.padEnd(24)} ${g.items.join(", ")}`));
      case "timeline":
        return timeline.map((t) => out(`${t.period.padEnd(24)} ${t.title} — ${t.org}`));
      case "contact":
        return [out(`email     ${site.email}`), out(`location  ${site.location}`), out(`status    ${site.availability}`)];
      case "open": {
        const target = args[0] === "projects" ? "work" : args[0];
        if (target && sections.includes(target) && scrollToSection(target)) return [out(`→ ${target}`)];
        return [{ kind: "err", text: `usage: open <${sections.slice(1).join(" | ")}>` }];
      }
      case "theme": {
        const name = args[0]?.toLowerCase();
        if (!name || name === "list") return [out(`themes: ${Object.keys(themes).join(", ")}`)];
        return applyTheme(name)
          ? [out(`theme → ${name}`)]
          : [{ kind: "err", text: `unknown theme '${name}'. try: ${Object.keys(themes).join(", ")}` }];
      }
      case "render": {
        const mode = args[0]?.toLowerCase();
        if (mode !== "grid" && mode !== "off") return [{ kind: "err", text: "usage: render <grid | off>" }];
        window.dispatchEvent(new CustomEvent("toggle-particles", { detail: { enabled: mode === "grid" } }));
        return [out(`render → ${mode}`)];
      }
      case "sudo":
        return [{ kind: "err", text: "nice try. permission denied." }];
      case "date":
        return [out(new Date().toString())];
      case "clear":
        return [{ kind: "sys", text: "__clear__" }];
      case "exit":
        return [{ kind: "sys", text: "__exit__" }];
      default:
        return [{ kind: "err", text: `command not found: ${cmd}. type 'help'.` }];
    }
  }, []);

  const submit = () => {
    const raw = input;
    const result = run(raw);
    setHistory((h) => (raw.trim() ? [raw, ...h] : h));
    setCursor(-1);
    setInput("");
    if (result.some((l) => l.text === "__clear__")) return setLines([]);
    setLines((prev) => [...prev, { kind: "in", text: raw }, ...result.filter((l) => l.text !== "__exit__")]);
    if (result.some((l) => l.text === "__exit__")) setOpen(false);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (history[next] !== undefined) {
        setCursor(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setInput(next >= 0 ? history[next] : "");
    } else if (e.key === "Escape") setOpen(false);
  };

  // global toggles: nav button event + backtick shortcut
  useEffect(() => {
    const toggle = () => setOpen((o) => !o);
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA");
      if (e.key === "`" && !typing) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("toggle-terminal", toggle);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("toggle-terminal", toggle);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [lines, open]);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            type="button"
            aria-label="Open terminal"
            data-cursor="hover"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ ...snappy, delay: 1.2 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="glass-strong fixed bottom-5 right-5 z-[80] flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-xs text-zinc-300 shadow-[0_8px_40px_-10px_rgba(0,0,0,0.9)]"
          >
            <SquareTerminal className="h-4 w-4 text-accent" />
            <span className="hidden sm:inline">terminal</span>
            <kbd className="hidden rounded border border-white/15 px-1.5 text-[10px] text-zinc-500 sm:inline">`</kbd>
          </motion.button>
        )}

        {open && (
          <motion.div
            key="panel"
            variants={terminalPanel}
            initial="hidden"
            animate="show"
            exit="exit"
            role="dialog"
            aria-label="Interactive terminal"
            className={`glass-strong fixed bottom-4 right-4 z-[85] flex w-[min(94vw,580px)] flex-col overflow-hidden rounded-2xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.95)] transition-[height] duration-300 ease-out ${big ? "h-[min(78vh,640px)]" : "h-[360px]"}`}
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Close terminal"
                  data-cursor="hover"
                  onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                  className="h-3 w-3 rounded-full bg-rose-400/80 transition-opacity hover:opacity-70"
                />
                <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              <span className="font-mono text-[11px] text-zinc-500">{site.handle}@portfolio ~ zsh</span>
              <div className="flex items-center gap-1 text-zinc-500">
                <button
                  type="button"
                  aria-label={big ? "Shrink terminal" : "Expand terminal"}
                  data-cursor="hover"
                  onClick={(e) => { e.stopPropagation(); setBig((b) => !b); }}
                  className="rounded p-1 hover:bg-white/10 hover:text-white"
                >
                  {big ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                </button>
                <button
                  type="button"
                  aria-label="Close"
                  data-cursor="hover"
                  onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                  className="rounded p-1 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-6">
              {lines.map((l, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap break-words ${
                    l.kind === "in" ? "text-white" : l.kind === "err" ? "text-rose-300" : l.kind === "sys" ? "text-zinc-500" : "text-zinc-300"
                  }`}
                >
                  {l.kind === "in" && <span className="mr-2 text-accent">❯</span>}
                  {l.text}
                </div>
              ))}
              <div className="flex items-center">
                <span className="mr-2 text-accent">❯</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Terminal input"
                  className="flex-1 bg-transparent text-white caret-accent outline-none placeholder:text-zinc-600"
                  placeholder="type 'help'"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
