/**
 * Single source of truth for all portfolio content.
 * Edit this file — components never hard-code copy.
 */

export const site = {
  name: "Snehangshu Roy",
  handle: "snehangshu",
  role: "MBBS student · Healthtech builder",
  email: "snehangshu_roy.mbbs-2023@aiimskalyani.edu.in",
  location: "Kolkata, India",
  // TODO: replace with your real profile URLs
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/in/",
  availability: "Available for select collaborations",
};

export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  category: string;
  status: string;
  period: string;
  summary: string;
  problem: string;
  approach: string[];
  guardrails?: string;
  stack: string[];
  link?: { label: string; href: string };
  span: string; // tailwind col-span classes for the bento grid
  hue: string; // "r g b" used for card glow
};

export const projects: Project[] = [
  {
    id: "sugarpath",
    index: "01",
    title: "SugarPath AI",
    tagline: "Diabetes adherence, with a clinician in the loop.",
    category: "Digital health · AI",
    status: "Active development",
    period: "Sep 2026 — Present",
    summary:
      "A multi-agent assistant that turns everyday meal logs into glycaemic insight and coaching, with a clinician-facing review layer.",
    problem:
      "Diabetes management fails in the gaps between visits: logs are incomplete, advice is generic, and clinicians see data too late to act on it.",
    approach: [
      "FastAPI backend orchestrating a LangGraph pipeline: meal parser → ML spike prediction → clinical guardrail → coaching agent.",
      "XGBoost models for post-meal glucose rise, trained on the public CGMacros dataset (meal-only and personalised variants).",
      "Retrieval over guideline documents (FAISS) so coaching stays grounded in published dietary guidance.",
      "Patient dashboard plus a clinician review surface — outputs are assistive, never autonomous.",
    ],
    guardrails:
      "Scoped as an assistive tool: it does not diagnose, prescribe, or give autonomous clinical advice. A human stays in control.",
    stack: ["FastAPI", "LangGraph", "XGBoost", "FAISS", "OpenAI", "Python"],
    link: { label: "Live demo", href: "https://sugarpath-care.netlify.app" },
    span: "lg:col-span-2",
    hue: "129 140 248",
  },
  {
    id: "ciphed",
    index: "02",
    title: "Ciphed",
    tagline: "A trust layer for health data.",
    category: "Health data infrastructure",
    status: "Concept & research",
    period: "Aug 2026 — Present",
    summary:
      "A proposed interoperability layer that lets patients hold the keys to their records while hospitals, insurers and researchers query them with proof, not copies.",
    problem:
      "Health records are fragmented across legacy EMR and lab systems, and sharing them means either exposing raw data or not sharing at all.",
    approach: [
      "FHIR translation of legacy EMR/LIS data into a common schema.",
      "Zero-knowledge proofs so a verifier can confirm a claim without seeing the underlying record.",
      "Off-chain encrypted storage with on-chain proofs; patient-held consent keys.",
      "Consortium-owned ledger rather than a single vendor's database.",
    ],
    guardrails: "Early stage: architecture and research foundation (a 300-respondent eHealth literacy study) — no production deployment yet.",
    stack: ["FHIR", "Zero-knowledge", "Encryption", "Ledger", "Systems design"],
    span: "lg:col-span-1",
    hue: "45 212 191",
  },
  {
    id: "stethoscope",
    index: "03",
    title: "Untethered Digital Stethoscope",
    tagline: "Auscultation, wirelessly, with a live PCG.",
    category: "Medical hardware",
    status: "Proposal · Collaboration",
    period: "2026",
    summary:
      "A point-of-care digital auscultation system: a wireless chestpiece streaming to everyday earbuds, plus a smart dock that renders the phonocardiogram in real time.",
    problem:
      "Digital stethoscopes are tethered, expensive and closed — and the sounds they capture rarely become structured data.",
    approach: [
      "Wireless chestpiece with a low-noise analog front end, targeting under 40 ms latency to off-the-shelf earbuds.",
      "Smart dock with real-time PCG display and on-device detection of S1–S4 and murmurs.",
      "Benchmarking against a commercial reference stethoscope and public PhysioNet PCG datasets.",
      "Planned collaboration: clinical, acoustics and ethics at AIIMS Kalyani with embedded/DSP at IIT Indore.",
    ],
    stack: ["Embedded", "DSP", "Signal processing", "Bluetooth audio", "PCG"],
    span: "lg:col-span-1",
    hue: "251 113 133",
  },
  {
    id: "stockdesk",
    index: "04",
    title: "StockDesk",
    tagline: "A multi-agent research desk for Indian equities.",
    category: "Agents · Finance",
    status: "In progress",
    period: "2026",
    summary:
      "A team of cooperating agents — a chief, leads and specialists — that research NSE/BSE-listed companies, starting with a market-news vertical slice.",
    problem:
      "Equity research is a coordination problem: news, fundamentals and filings live in different places and need different expertise.",
    approach: [
      "Hierarchical agent design: a Chief delegates to team Leads, who delegate to narrow specialists.",
      "Built vertically — the Market News team first — so each slice is useful on its own.",
      "Full-stack: Python backend with tool-calling agents and a purpose-built frontend.",
    ],
    stack: ["Python", "Agents", "OpenAI", "React", "NSE/BSE"],
    span: "lg:col-span-2",
    hue: "251 191 36",
  },
];

export type TimelineItem = {
  id: string;
  period: string;
  title: string;
  org: string;
  kind: "venture" | "research" | "education" | "fellowship";
  body: string;
};

export const timeline: TimelineItem[] = [
  {
    id: "sugarpath",
    period: "Sep 2026 — Present",
    title: "Founder & Clinical Lead",
    org: "SugarPath AI",
    kind: "venture",
    body: "Building an assistive, clinician-in-the-loop platform for diabetes adherence — voice-friendly meal logging, glycaemic prediction and coaching.",
  },
  {
    id: "ciphed",
    period: "Aug 2026 — Present",
    title: "Founder & CEO",
    org: "Ciphed",
    kind: "venture",
    body: "Designing a decentralized health-data layer for EHR interoperability and privacy-preserving epidemiological tracking.",
  },
  {
    id: "cmfm",
    period: "Aug 2026 — Present",
    title: "Independent Researcher",
    org: "Community Medicine (CMFM) · AIIMS Kalyani",
    kind: "research",
    body: "Cross-sectional study of eHealth literacy and digital health behaviour among school students (n = 300), analysed with logistic regression.",
  },
  {
    id: "iitm",
    period: "Aug 2026 — Present",
    title: "BS in Data Science (dual degree)",
    org: "IIT Madras",
    kind: "education",
    body: "Studying data science alongside medicine to build the quantitative foundation for health-AI work.",
  },
  {
    id: "nasa",
    period: "2026",
    title: "Programme Fellow",
    org: "NASA-DUTC",
    kind: "fellowship",
    body: "Selected as a fellow of the NASA-DUTC programme.",
  },
  {
    id: "mck",
    period: "2026",
    title: "Participant",
    org: "McKinsey Forward",
    kind: "fellowship",
    body: "Completed McKinsey's Forward programme on professional and digital skills.",
  },
  {
    id: "iisc",
    period: "Jul — Aug 2026",
    title: "Summer Research Intern",
    org: "IISc Bangalore · Materials Engineering",
    kind: "research",
    body: "Quantitative evaluation of a ceramic orthodontic biomaterial under Dr. Prosenjit Das, structured as a clinical research protocol with an active patent filing.",
  },
  {
    id: "aiims",
    period: "2023 — 2028 (expected)",
    title: "MBBS",
    org: "AIIMS Kalyani",
    kind: "education",
    body: "Clinical training in medicine and surgery — the ground truth every project here is built against.",
  },
];

export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  items: string[];
  span: string;
  icon: "cpu" | "brain" | "stethoscope" | "chip";
};

export const skillGroups: SkillGroup[] = [
  {
    id: "systems",
    title: "Systems & Engineering",
    blurb: "Backends, data layers and interfaces that hold up outside a demo.",
    items: ["Python", "FastAPI", "TypeScript", "React / Next.js", "SQL", "pgvector", "Redis"],
    span: "md:col-span-3 lg:col-span-3",
    icon: "cpu",
  },
  {
    id: "ai",
    title: "AI / ML",
    blurb: "Agentic pipelines and predictive models with guardrails built in.",
    items: ["LangGraph", "RAG", "XGBoost", "PyTorch (learning)", "LLM tool-use"],
    span: "md:col-span-3 lg:col-span-3",
    icon: "brain",
  },
  {
    id: "clinical",
    title: "Clinical & Research",
    blurb: "Study design and statistics, grounded in clinical training.",
    items: ["Biostatistics", "Logistic regression", "Cross-sectional design", "Clinical guardrails"],
    span: "md:col-span-3 lg:col-span-2",
    icon: "stethoscope",
  },
  {
    id: "hardware",
    title: "Hardware & Prototyping",
    blurb: "From analog front end to a signal you can actually look at.",
    items: ["Signal processing", "PCG / auscultation", "Embedded concepts"],
    span: "md:col-span-3 lg:col-span-4",
    icon: "chip",
  },
];

export const marquee = [
  "Python", "FastAPI", "LangGraph", "XGBoost", "Next.js", "React", "TypeScript",
  "FAISS", "SQL", "Signal Processing", "FHIR", "Biostatistics", "RAG", "Tailwind",
];

export const about = {
  headline: "Clinician by training. Builder by instinct.",
  blurb:
    "I'm a medical student at AIIMS Kalyani building the software and instruments healthcare is still missing — assistive AI for chronic disease, trust infrastructure for health data, and tools for the clinic.",
  bio: [
    "Snehangshu Roy — third-year MBBS student at AIIMS Kalyani, Kolkata.",
    "Studying data science at IIT Madras alongside medicine.",
    "Founder of SugarPath AI (diabetes adherence) and Ciphed (health-data trust layer).",
    "Research: eHealth literacy, biomaterials (IISc), and medical-device concepts.",
  ],
};
