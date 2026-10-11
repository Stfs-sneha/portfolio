"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Github, Linkedin, Mail, Send } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { SplitText } from "./SplitText";
import { site } from "@/lib/data";
import { fadeUp, snappy, staggerContainer, viewportOnce } from "@/lib/variants";

const socials = [
  { label: "GitHub", href: site.github, icon: Github, external: true },
  { label: "LinkedIn", href: site.linkedin, icon: Linkedin, external: true },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail, external: false },
];

function Field({
  id, label, type = "text", multiline = false, value, onChange, error,
}: {
  id: string; label: string; type?: string; multiline?: boolean;
  value: string; onChange: (v: string) => void; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const shared = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    placeholder: " ",
    "aria-invalid": !!error,
    className:
      "peer w-full bg-transparent px-4 pb-2.5 pt-6 text-[15px] text-white outline-none placeholder:text-transparent",
  };
  return (
    <div>
      <motion.div
        animate={{
          scale: focused ? 1.012 : 1,
          borderColor: error ? "rgba(251,113,133,0.6)" : focused ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.1)",
          boxShadow: focused ? "0 0 0 4px rgba(255,255,255,0.04), 0 10px 40px -12px rgb(129 140 248 / 0.35)" : "0 0 0 0 rgba(0,0,0,0)",
        }}
        transition={snappy}
        className="relative rounded-2xl border bg-white/[0.03]"
      >
        {multiline ? (
          <textarea {...shared} rows={5} className={`${shared.className} resize-none`} />
        ) : (
          <input {...shared} type={type} />
        )}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-4 origin-left text-sm text-zinc-500 transition-all duration-200 peer-focus:top-2 peer-focus:scale-[0.78] peer-focus:text-zinc-400 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-[0.78]"
        >
          {label}
        </label>
      </motion.div>
      {error && <p className="mt-1.5 pl-1 text-xs text-rose-300">{error}</p>}
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Tell me who you are.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "That email doesn't look right.";
    if (message.trim().length < 10) next.message = "A little more detail, please.";
    setErrors(next);
    if (Object.keys(next).length) return;

    // No backend required: opens the visitor's mail client with the message prefilled.
    // To send server-side instead, POST to an API route (e.g. Resend) here.
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Field id="name" label="Your name" value={name} onChange={setName} error={errors.name} />
      <Field id="email" label="Email address" type="email" value={email} onChange={setEmail} error={errors.email} />
      <Field id="message" label="What are we building?" multiline value={message} onChange={setMessage} error={errors.message} />
      <MagneticButton
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-medium text-zinc-950 sm:w-auto"
      >
        {sent ? (
          <>
            <Check className="h-4 w-4" /> Opening your mail app…
          </>
        ) : (
          <>
            Send message
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </>
        )}
      </MagneticButton>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section pb-12">
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-14 lg:grid-cols-[1.1fr_1fr]"
      >
        <div>
          <motion.div variants={fadeUp} className="mb-8 inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-400" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">{site.availability}</span>
          </motion.div>

          <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-white sm:text-6xl">
            <SplitText text="Let's build something that matters." trigger="view" accentWords={["matters."]} />
          </h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-md leading-relaxed text-zinc-400">
            Clinical collaborations, research, health-tech builds — if it makes care better, I'd like to hear about it.
          </motion.p>

          <motion.a
            variants={fadeUp}
            href={`mailto:${site.email}`}
            data-cursor="hover"
            className="group mt-8 inline-flex items-center gap-2 break-all font-mono text-sm text-zinc-300 transition-colors hover:text-white"
          >
            {site.email}
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.a>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon, external }) => (
              <MagneticButton
                key={label}
                href={href}
                external={external}
                ariaLabel={label}
                strength={0.5}
                className="glass flex h-12 w-12 items-center justify-center rounded-2xl text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </MagneticButton>
            ))}
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="glass rounded-3xl p-6 sm:p-8">
          <ContactForm />
        </motion.div>
      </motion.div>

      <footer className="mt-24 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} {site.name}. Built with Next.js, Tailwind &amp; Framer Motion.</p>
        <p className="font-mono">
          press <kbd className="rounded border border-white/15 px-1.5">`</kbd> for the terminal
        </p>
      </footer>
    </section>
  );
}
