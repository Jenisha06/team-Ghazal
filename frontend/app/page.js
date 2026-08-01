"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
      <Architecture />
      <FAQ />
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
  const links = [
  { name: "Home", href: "#home" },

  { name: "Architecture", href: "#architecture" },
 
  
  { name: "FAQ", href: "#faq" },
];
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#FBF7F1]/90 backdrop-blur border-b border-[#e7dcc6]">
      <Container className="flex items-center justify-between h-[72px]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-[#3D2B1F] flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-semibold">OpsMemory AI</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[#6B6357]">
       {links.map((link) => (
  <a
    key={link.name}
    href={link.href}
    className="hover:text-[#2B2118] transition"
  >
    {link.name}
  </a>
))}
        </nav>

        <div className="flex items-center gap-3">
        <Link
  href="/login"
  className="text-sm font-medium text-[#2B2118] px-4 py-2 hover:bg-[#F0EAE0] rounded-md transition"
>
  Login
</Link>
         
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
   <section id="home" className="pt-40 pb-24 border-b border-[#E9E2D4]">
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
          <a
            href="#architecture"
            className="flex items-center gap-2 bg-[#3D2B1F] text-white text-sm font-medium px-5 py-3 rounded-md hover:bg-[#2B1D14] transition"
          >
            View Architecture
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Hero Image */}
      <div className="flex justify-center">
        <img
          src="/hero.png"
          alt="OpsMemory AI Hero Illustration"
          className="w-full max-w-xl object-contain"
        />
      </div>
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



  return (
    <section id="problem" className="py-24 border-b border-[#E9E2D4]">
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
    <section id="solution" className="py-24 border-b border-[#E9E2D4]">
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



/* ==================== AI OPERATIONS MEMORY ==================== */



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



/* ==================== ARCHITECTURE ==================== */
function Architecture() {
  const layers = [
    {
      icon: Server,
      label: "Users",
      body: "Field engineers and dispatchers interacting with the platform.",
    },
    {
      icon: Terminal,
      label: "Next.js Frontend",
      body: "React-based dashboard for tickets, analytics, and memory search.",
    },
    {
      icon: Share2,
      label: "Node.js API",
      body: "Orchestrates ticket ingestion, auth, and inference requests.",
    },
    {
      icon: Lock,
      label: "AES Encryption",
      body: "Encrypts sensitive ticket data before AI processing.",
    },
    {
      icon: BrainCircuit,
      label: "Local LLM (Ollama + Llama 3.1)",
      body: "Reviews tickets and extracts structured repair knowledge on-prem.",
    },
    {
      icon: Sparkles,
      label: "Recommendation Engine",
      body: "Matches new incidents against historical operations memory.",
    },
    {
      icon: Zap,
      label: "Redis Cache",
      body: "Caches frequent lookups for low-latency recommendations.",
    },
    {
      icon: Database,
      label: "PostgreSQL (Supabase)",
      body: "Persists tickets, engineers, and the operations memory graph.",
    },
  ];

  return (
    <section
      id="architecture"
      className="h-screen border-b border-[#E9E2D4] bg-[#F7F3ED]"
    >
      <Container className="h-full flex flex-col justify-center">
        <SectionTitle title="Technical Architecture" />

        <div
          className="
            max-w-xl
            mx-auto
            w-full
            h-[480px]
            overflow-y-auto
            space-y-1
            pr-2
            rounded-xl
            scrollbar-thin
            scrollbar-thumb-[#C9B9A5]
            scrollbar-track-transparent
          "
        >
          {layers.map((layer, index) => (
            <div key={index}>
              <div className="bg-white border border-[#E9E2D4] rounded-xl p-5 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#FBF3EA] flex items-center justify-center shrink-0">
                  <layer.icon className="w-5 h-5 text-[#3D2B1F]" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-1">
                    {layer.label}
                  </h3>

                  <p className="text-xs text-[#8A8172] leading-relaxed">
                    {layer.body}
                  </p>
                </div>
              </div>

              {index < layers.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="w-px h-5 bg-[#E4DFD3]" />
                </div>
              )}
            </div>
          ))}
        </div>
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
    <section id="faq" className="py-24 border-b border-[#E9E2D4]">
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
    <section id="team" className="py-24 border-b border-[#E9E2D4]">
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
  const quickLinks = [
    { name: "Home", href: "#home" },
   
    { name: "Architecture", href: "#architecture" },
   
   
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <footer className="border-t border-[#E9E2D4] bg-[#FBF7F1]">
      <Container className="py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#3D2B1F] flex items-center justify-center shadow-sm">
                <Cpu className="w-5 h-5 text-white" />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  OpsMemory AI
                </h3>
                <p className="text-xs text-[#8A8172]">
                  Enterprise Operations Memory
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 text-[#6B6357] max-w-sm">
              Transforming every completed maintenance ticket into searchable
              organizational knowledge with secure, on-premise AI.
            </p>
          </div>

          {/* Center */}
          <div>
            <h4 className="font-semibold mb-5">
              Quick Links
            </h4>

            <div className="grid grid-cols-2 gap-y-3 text-sm">
              {quickLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[#6B6357] hover:text-[#3D2B1F] transition"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

        

        </div>

        <div className="mt-14 pt-6 border-t border-[#E9E2D4] flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-[#8A8172]">
            © 2026 OpsMemory AI. All Rights Reserved.
          </p>

          <p className="text-sm text-[#8A8172]">
            Designed & Developed for Hackathon 2026
          </p>

        </div>

      </Container>
    </footer>
  );
}