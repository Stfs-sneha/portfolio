import {
  Atom, AudioWaveform, Brain, Cpu, Database, Code2, KeyRound, Link2, Network, Radio, Server, Sigma, TrendingUp,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Python: Code2,
  FastAPI: Server,
  LangGraph: Network,
  XGBoost: Sigma,
  FAISS: Database,
  OpenAI: Brain,
  FHIR: Link2,
  "Zero-knowledge": KeyRound,
  Encryption: KeyRound,
  Ledger: Link2,
  "Systems design": Network,
  Embedded: Cpu,
  DSP: AudioWaveform,
  "Signal processing": AudioWaveform,
  "Bluetooth audio": Radio,
  PCG: AudioWaveform,
  Agents: Network,
  React: Atom,
  "NSE/BSE": TrendingUp,
};

export function TechBadge({ name }: { name: string }) {
  const Icon = icons[name] ?? Code2;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-zinc-300">
      <Icon className="h-3 w-3 text-accent" />
      {name}
    </span>
  );
}
