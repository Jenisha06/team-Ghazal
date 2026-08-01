"use client";

import { useState } from "react";
import {
  Cpu,
  Bell,
  Wrench,
  BrainCircuit,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Database,
  Server,
  Lock,
  Search,
  FileSearch,
  Share2,
  Sparkles,
  Terminal,
  Zap,
  BarChart2,
  ChevronDown,
  Ticket,
  ClipboardList,
  Radio,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-[#F7F3ED] text-[#2B2118]">
      <NavBar />
      <Hero />
      <ProblemStatement />
      <Solution />
      <HowItWorks />
      <OperationsMemory />
      <Features />
      <Architecture />
      <TechStack />
      <BusinessImpact />
      <FAQ />
      <Team />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ==================== SHARED ==================== */

function SectionTitle({ eyebrow, title, center = true }) {
  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-widest text-[#8A8172] mb-3 uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto leading-tight">
        {title}
      </h2>
    </div>
  );
}

function Container({ children, className = "" }) {
  return (
    <div className={`max-w-6xl mx-auto px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

/* ==================== NAVBAR ==================== */

function NavBar() {
  const links = ["Home", "Features", "Architecture", "Tech Stack", "Team", "FAQ"];
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#FBF7F1]/95 backdrop-blur border-b border-[#E9E2D4]">
      <Container className="flex items-center justify-between h-[72px]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-[#3D2B1F] flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-semibold">OpsMemory AI</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[#6B6357]">
          {links.map((l) => (
            <a key={l} href="#" className="hover:text-[#2B2118] transition">
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-[#2B2118] px-4 py-2 hover:bg-[#F0EAE0] rounded-md transition">
            Login
          </button>
          <button className="bg-[#3D2B1F] text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-[#2B1D14] transition">
            Launch Demo
          </button>
        </div>
      </Container>
    </header>
  );
}

/* ==================== HERO ==================== */

function Hero() {
  const badges = [
    "Local LLM",
    "On-Prem AI",
    "Enterprise Security",
    "PostgreSQL",
    "AI Assisted Repairs",
  ];

  return (
    <section className="pt-40 pb-24 border-b border-[#E9E2D4]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-6">
              Every Repair Should Make the Next One Smarter.
            </h1>
            <p className="text-base text-[#6B6357] leading-relaxed mb-8 max-w-lg">
              Traditional Field Service Management systems only record what
              happened during an incident. Valuable repair knowledge remains
              locked inside technician notes and is rarely reused. OpsMemory
              AI transforms every completed ATM maintenance ticket into
              searchable operational knowledge, enabling AI-assisted
              recommendations for future incidents.
            </p>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-[#3D2B1F] text-white text-sm font-medium px-5 py-3 rounded-md hover:bg-[#2B1D14] transition">
                Launch Demo
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-[#E9E2D4] bg-white text-sm font-medium px-5 py-3 rounded-md hover:bg-[#F0EAE0] transition">
                View Architecture
              </button>
            </div>
          </div>

          <HeroIllustration />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {badges.map((b) => (
            <span
              key={b}
              className="text-xs font-medium text-[#6B6357] bg-white border border-[#E9E2D4] px-4 py-2 rounded-full"
            >
              {b}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

function HeroIllustration() {
  const steps = [
    { icon: Bell, label: "ATM" },
    { icon: Wrench, label: "Technician" },
    { icon: BrainCircuit, label: "AI Review" },
    { icon: BookOpen, label: "Knowledge Base" },
    { icon: CheckCircle2, label: "Recommendation" },
  ];

  return (
    <div className="bg-white border border-[#E9E2D4] rounded-2xl p-8">
      <div className="grid grid-cols-1 gap-4">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-[#FBF3EA] flex items-center justify-center shrink-0">
              <s.icon className="w-5 h-5 text-[#3D2B1F]" />
            </div>
            <span className="text-sm font-medium">{s.label}</span>
            {i < steps.length - 1 && (
              <div className="flex-1 border-b border-dashed border-[#E4DFD3] ml-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==================== PROBLEM STATEMENT ==================== */

function ProblemStatement() {
  const cards = [
    {
      title: "Technician Knowledge is Lost",
      body: "Every repair contains valuable operational insights, but technician notes are stored as plain text and rarely reused.",
    },
    {
      title: "Repeated Failures",
      body: "Different engineers often solve identical ATM failures without access to previous successful repairs.",
    },
    {
      title: "Long Resolution Time",
      body: "Without historical guidance, engineers spend more time diagnosing issues, increasing downtime and operational costs.",
    },
  ];

  const stats = [
    "Average ATM downtime impacts customer availability",
    "Repeated failures increase maintenance cost",
    "Organizations lose years of engineering knowledge",
  ];

  return (
    <section className="py-24 border-b border-[#E9E2D4]">
      <Container>
        <SectionTitle title="The Hidden Cost of Operational Knowledge Loss" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-white border border-[#E9E2D4] rounded-xl p-7"
            >
              <h3 className="text-lg font-semibold mb-3">{c.title}</h3>
              <p className="text-sm text-[#6B6357] leading-relaxed">
                {c.body}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div
              key={s}
              className="flex items-start gap-3 bg-[#FBF3EA] rounded-lg p-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3D2B1F] mt-2 shrink-0" />
              <p className="text-sm text-[#4A3F33] leading-relaxed">{s}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ==================== SOLUTION ==================== */

function Solution() {
  const features = [
    { icon: FileSearch, label: "AI Ticket Review" },
    { icon: Search, label: "Historical Incident Search" },
    { icon: BrainCircuit, label: "Root Cause Detection" },
    { icon: ShieldCheck, label: "Preventive Maintenance Recommendations" },
  ];

  return (
    <section className="py-24 border-b border-[#E9E2D4]">
      <Container>
        <SectionTitle title="Introducing OpsMemory AI" />
        <p className="text-base text-[#6B6357] leading-relaxed max-w-2xl mx-auto text-center -mt-8 mb-16">
          OpsMemory AI automatically reviews completed maintenance tickets
          using a secure Local LLM. It extracts structured repair knowledge,
          identifies root causes, stores operational memory, and provides
          AI-powered recommendations whenever similar incidents occur.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.label}
              className="bg-white border border-[#E9E2D4] rounded-xl p-6 text-center"
            >
              <div className="w-11 h-11 rounded-lg bg-[#FBF3EA] flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-5 h-5 text-[#3D2B1F]" />
              </div>
              <p className="text-sm font-semibold">{f.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ==================== HOW IT WORKS ==================== */

function HowItWorks() {
  const steps = [
    { icon: Radio, label: "Alert Generated" },
    { icon: Ticket, label: "FSM Dispatch" },
    { icon: Wrench, label: "Technician Repair" },
    { icon: CheckCircle2, label: "Ticket Closed" },
    { icon: Lock, label: "AES-256 Encryption" },
    { icon: BrainCircuit, label: "Local LLM Review" },
    { icon: FileSearch, label: "Root Cause Extraction" },
    { icon: Database, label: "Operations Memory Updated" },
    { icon: Sparkles, label: "Future Recommendations" },
  ];

  return (
    <section className="py-24 border-b border-[#E9E2D4]">
      <Container>
        <SectionTitle title="How It Works" />

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-8">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div className="flex flex-col items-center w-28">
                <div className="w-12 h-12 rounded-lg bg-white border border-[#E9E2D4] flex items-center justify-center mb-3">
                  <s.icon className="w-5 h-5 text-[#3D2B1F]" />
                </div>
                <p className="text-xs font-medium text-center leading-snug">
                  {s.label}
                </p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-[#C9C2B2] mx-1 shrink-0 mb-8" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ==================== AI OPERATIONS MEMORY ==================== */

function OperationsMemory() {
  return (
    <section className="py-24 border-b border-[#E9E2D4]">
      <Container>
        <SectionTitle title="Every Closed Ticket Becomes Organizational Knowledge" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start -mt-4">
          <div>
            <label className="block text-xs font-semibold tracking-wide text-[#8A8172] mb-2">
              SEARCH OPERATIONS MEMORY
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#A39B8C] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                defaultValue="Voltage Fluctuation"
                readOnly
                className="w-full rounded-md border border-[#E4DFD3] bg-white pl-11 pr-4 py-3.5 text-sm text-[#2B2118] outline-none"
              />
            </div>
            <p className="text-sm text-[#8A8172] mt-4 leading-relaxed">
              Instead of relying on individual engineer experience, the
              organization now learns collectively from every repair.
            </p>
          </div>

          <div className="bg-white border border-[#E9E2D4] rounded-xl p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <Stat label="OCCURRENCES" value="48" />
              <Stat label="AVG. RESOLUTION TIME" value="17 Minutes" />
            </div>
            <div className="space-y-4 border-t border-[#F0EAE0] pt-5">
              <MemoryRow label="Permanent Repair" value="UPS Controller Replacement" />
              <MemoryRow label="Temporary Repair" value="Battery Replacement" />
              <MemoryRow label="Preventive Action" value="Quarterly Power Audit" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-[10px] tracking-wide font-semibold text-[#8A8172] mb-1.5">
        {label}
      </p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function MemoryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[#6B6357]">{label}</span>
      <span className="text-sm font-semibold text-right">{value}</span>
    </div>
  );
}

/* ==================== FEATURES ==================== */

function Features() {
  const features = [
    {
      icon: Terminal,
      title: "Local LLM Processing",
      body: "Runs completely on-premise using Ollama and Llama 3.1.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Security",
      body: "Sensitive ticket data is encrypted before AI processing.",
    },
    {
      icon: Search,
      title: "Historical Similarity Search",
      body: "Finds previous incidents with matching symptoms and repair outcomes.",
    },
    {
      icon: Database,
      title: "Operations Memory",
      body: "Builds an intelligent repair knowledge base from completed tickets.",
    },
    {
      icon: Sparkles,
      title: "AI Recommendations",
      body: "Suggests the most probable repair based on historical evidence.",
    },
    {
      icon: BarChart2,
      title: "Analytics Dashboard",
      body: "Visualizes repair trends, root causes, engineer performance, and AI confidence.",
    },
  ];

  return (
    <section className="py-24 border-b border-[#E9E2D4]">
      <Container>
        <SectionTitle title="Everything you need to preserve field expertise" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-[#E9E2D4] rounded-xl p-7 flex gap-4"
            >
              <div className="w-11 h-11 rounded-lg bg-[#FBF3EA] flex items-center justify-center shrink-0">
                <f.icon className="w-5 h-5 text-[#3D2B1F]" />
              </div>
              <div>
                <h3 className="text-base font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-[#6B6357] leading-relaxed">
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ==================== ARCHITECTURE ==================== */

function Architecture() {
  const layers = [
    { icon: Server, label: "Users", body: "Field engineers and dispatchers interacting with the platform." },
    { icon: Terminal, label: "Next.js Frontend", body: "React-based dashboard for tickets, analytics, and memory search." },
    { icon: Share2, label: "Node.js API", body: "Orchestrates ticket ingestion, auth, and inference requests." },
    { icon: Lock, label: "AES Encryption", body: "Encrypts sensitive ticket data before AI processing." },
    { icon: BrainCircuit, label: "Local LLM (Ollama + Llama 3.1)", body: "Reviews tickets and extracts structured repair knowledge on-prem." },
    { icon: Sparkles, label: "Recommendation Engine", body: "Matches new incidents against historical operations memory." },
    { icon: Zap, label: "Redis Cache", body: "Caches frequent lookups for low-latency recommendations." },
    { icon: Database, label: "PostgreSQL (Supabase)", body: "Persists tickets, engineers, and the operations memory graph." },
  ];

  return (
    <section className="py-24 border-b border-[#E9E2D4]">
      <Container>
        <SectionTitle title="Technical Architecture" />

        <div className="max-w-lg mx-auto space-y-3">
          {layers.map((l, i) => (
            <div key={l.label}>
              <div className="bg-white border border-[#E9E2D4] rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#FBF3EA] flex items-center justify-center shrink-0">
                  <l.icon className="w-4.5 h-4.5 text-[#3D2B1F]" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">{l.label}</p>
                  <p className="text-xs text-[#8A8172] leading-relaxed">
                    {l.body}
                  </p>
                </div>
              </div>
              {i < layers.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-px h-4 bg-[#E4DFD3]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ==================== TECH STACK ==================== */

function TechStack() {
  const groups = [
    { title: "Frontend", items: ["Next.js", "Tailwind CSS"] },
    { title: "Backend", items: ["Node.js", "Express.js"] },
    { title: "Database", items: ["PostgreSQL", "Supabase"] },
    { title: "Artificial Intelligence", items: ["Ollama", "Llama 3.1 8B"] },
    { title: "Infrastructure", items: ["Redis", "AES-256 Encryption"] },
    { title: "Deployment", items: ["Docker Ready"] },
  ];

  return (
    <section className="py-24 border-b border-[#E9E2D4]">
      <Container>
        <SectionTitle title="Tech Stack" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g) => (
            <div
              key={g.title}
              className="bg-white border border-[#E9E2D4] rounded-xl p-6"
            >
              <p className="text-xs font-semibold tracking-wide text-[#8A8172] mb-4 uppercase">
                {g.title}
              </p>
              <div className="space-y-2.5">
                {g.items.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3D2B1F]" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ==================== BUSINESS IMPACT ==================== */

function BusinessImpact() {
  const kpis = [
    { label: "Reduce Repeat Failures", value: "38%" },
    { label: "Lower Resolution Time", value: "30%" },
    { label: "Faster Knowledge Retrieval", value: "90%" },
    { label: "AI Recommendation Accuracy", value: "94%" },
  ];

  return (
    <section className="py-24 border-b border-[#E9E2D4]">
      <Container>
        <SectionTitle title="Benefits for Field Service Organizations" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="bg-white border border-[#E9E2D4] rounded-xl p-6 text-center"
            >
              <p className="text-3xl font-bold mb-2">{k.value}</p>
              <p className="text-xs text-[#8A8172] font-medium leading-snug">
                {k.label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-base text-[#6B6357] leading-relaxed max-w-2xl mx-auto text-center">
          By transforming completed maintenance tickets into reusable
          operational knowledge, organizations reduce downtime, improve
          first-time fix rates, preserve engineering expertise, and
          continuously improve service quality.
        </p>
      </Container>
    </section>
  );
}

/* ==================== FAQ ==================== */

function FAQ() {
  const faqs = [
    {
      q: "How is data protected?",
      a: "All sensitive ticket information is encrypted using AES-256 before AI processing.",
    },
    {
      q: "Why use a Local LLM instead of Cloud AI?",
      a: "Local AI ensures enterprise data never leaves the organization.",
    },
    {
      q: "When does AI review a ticket?",
      a: "Immediately after the technician closes the maintenance ticket.",
    },
    {
      q: "How does the Operations Memory improve over time?",
      a: "Every completed ticket becomes part of the searchable organizational knowledge base, making future recommendations increasingly accurate.",
    },
  ];

  const [open, setOpen] = useState(0);

  return (
    <section className="py-24 border-b border-[#E9E2D4]">
      <Container>
        <SectionTitle title="Frequently Asked Questions" />

        <div className="max-w-2xl mx-auto space-y-3 -mt-4">
          {faqs.map((f, i) => (
            <div
              key={f.q}
              className="bg-white border border-[#E9E2D4] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-sm font-semibold">{f.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8A8172] shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <p className="px-6 pb-5 text-sm text-[#6B6357] leading-relaxed">
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ==================== TEAM ==================== */

function Team() {
  const team = [
    {
      name: "Ava Chen",
      role: "Frontend & UI",
      body: "Designs and builds the dashboard experience end to end.",
      img: "https://i.pravatar.cc/200?img=47",
    },
    {
      name: "Marcus Reyes",
      role: "Backend & Database",
      body: "Owns the API layer, ticket pipeline, and PostgreSQL schema.",
      img: "https://i.pravatar.cc/200?img=12",
    },
    {
      name: "Priya Nair",
      role: "Artificial Intelligence",
      body: "Builds the local LLM review pipeline and recommendation engine.",
      img: "https://i.pravatar.cc/200?img=32",
    },
  ];

  return (
    <section className="py-24 border-b border-[#E9E2D4]">
      <Container>
        <SectionTitle title="Meet the Team" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((m) => (
            <div
              key={m.name}
              className="bg-white border border-[#E9E2D4] rounded-xl p-7 text-center"
            >
              <img
                src={m.img}
                alt={m.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-base font-semibold">{m.name}</h3>
              <p className="text-xs font-medium text-[#8A8172] mb-3">
                {m.role}
              </p>
              <p className="text-sm text-[#6B6357] leading-relaxed">
                {m.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ==================== FINAL CTA ==================== */

function FinalCTA() {
  return (
    <section className="py-28 border-b border-[#E9E2D4]">
      <Container className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold max-w-xl mx-auto mb-8 leading-tight">
          Ready to Experience Smarter Field Service Management?
        </h2>
        <div className="flex items-center justify-center gap-3 mb-8">
          <button className="flex items-center gap-2 bg-[#3D2B1F] text-white text-sm font-medium px-5 py-3 rounded-md hover:bg-[#2B1D14] transition">
            Launch Demo
            <ArrowRight className="w-4 h-4" />
          </button>
        <button className="border border-[#E9E2D4] bg-white text-sm font-medium px-5 py-3 rounded-md hover:bg-[#F0EAE0] transition">
  GitHub Repository
</button>
        </div>
        <p className="text-sm text-[#8A8172]">
          Built for Hackathon 2026
          <br />
          Powered by Local AI, Enterprise Security, and Operations Memory.
        </p>
      </Container>
    </section>
  );
}

/* ==================== FOOTER ==================== */

function Footer() {
  const links = ["Dashboard", "Tickets", "Operations Memory", "Analytics", "Security"];

  return (
    <footer className="py-14">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-md bg-[#3D2B1F] flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold">OpsMemory AI</span>
            </div>
            <p className="text-sm text-[#8A8172] leading-relaxed">
              AI-powered Operations Memory for Enterprise Field Service
              Management.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#6B6357]">
            {links.map((l) => (
              <a key={l} href="#" className="hover:text-[#2B2118] transition">
                {l}
              </a>
            ))}
           <a href="#" className="hover:text-[#2B2118] transition">
  GitHub
</a>
          </nav>
        </div>

        <div className="border-t border-[#E9E2D4] pt-6">
          <p className="text-xs text-[#A39B8C]">
            © 2026 OpsMemory AI. Built for Hackathon.
          </p>
        </div>
      </Container>
    </footer>
  );
}