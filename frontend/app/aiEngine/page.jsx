"use client";

import {
  LayoutDashboard,
  Cpu,
  Zap,
  Users,
  Settings,
  FileText,
  LogOut,
  Search,
  Plus,
  CheckCircle2,
  Lock,
  Brain,
  FileSearch,
  Database,
  Share2,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  Terminal,
  Server,
  Cog,
  ShieldCheck,
  Layers,
  Workflow,
} from "lucide-react";

export default function AIEnginePage() {
  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2B2118] flex">
      <Sidebar />
      <MainContent />
    </div>
  );
}

/* ---------------- SIDEBAR ---------------- */

function Sidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: Cpu, label: "Memory Bank" },
    { icon: Zap, label: "Automations", active: true },
    { icon: Users, label: "Team" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-[268px] shrink-0 border-r border-[#E9E2D4] px-5 py-6 flex flex-col justify-between min-h-screen bg-[#F7F3ED]">
      <div>
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-9 h-9 rounded-md bg-[#3D2B1F] text-white flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">OpsMemory</p>
            <p className="text-[10px] tracking-wide text-[#A39B8C] font-medium">
              ENTERPRISE TIER
            </p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map(({ icon: Icon, label, active }) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-[#3D2B1F] text-white"
                  : "text-[#6B6357] hover:bg-[#F0EAE0]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div>
        <div className="border-t border-[#E9E2D4] pt-4 space-y-1 mb-4">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#6B6357] hover:bg-[#F0EAE0] transition"
          >
            <FileText className="w-4 h-4" />
            Documentation
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#6B6357] hover:bg-[#F0EAE0] transition"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </a>
        </div>

        <div>
          <p className="text-xs font-medium text-[#8A8172] mb-2">
            Usage: 84%
          </p>
          <div className="h-1.5 rounded-full bg-[#EEE2C8] overflow-hidden mb-3">
            <div className="h-full w-[84%] bg-[#3D2B1F] rounded-full" />
          </div>
          <button className="w-full bg-[#3D2B1F] text-white text-sm font-medium py-2.5 rounded-md hover:bg-[#2B1D14] transition">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ---------------- MAIN CONTENT ---------------- */

function MainContent() {
  return (
    <main className="flex-1 px-10 py-8 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">AI Engine</h1>
          <p className="text-sm text-[#8A8172]">
            Technical transparency of ticket processing and knowledge
            extraction.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-[#A39B8C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search architecture..."
              className="w-64 rounded-md border border-[#E9E2D4] bg-white pl-10 pr-4 py-2.5 text-sm placeholder:text-[#A39B8C] outline-none focus:ring-2 focus:ring-[#3D2B1F]/20 focus:border-[#3D2B1F] transition"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#3D2B1F] text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-[#2B1D14] transition whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Create New
          </button>
        </div>
      </div>

      <DataProcessingPipeline />
      <TechStackGrid />
      <SystemArchitecture />
    </main>
  );
}

/* ---------------- DATA PROCESSING PIPELINE ---------------- */

function DataProcessingPipeline() {
  const steps = [
    { icon: CheckCircle2, label: "Ticket Closed", tag: "TRIGGER" },
    { icon: Lock, label: "AES-256", tag: "SECURITY" },
    { icon: Brain, label: "Llama 3.1", tag: "PROCESSING", active: true },
    { icon: FileSearch, label: "Knowledge", tag: "EXTRACTION" },
    { icon: Database, label: "PostgreSQL", tag: "PERSISTENCE" },
    { icon: Share2, label: "Ops Memory", tag: "GRAPH" },
    { icon: Sparkles, label: "Engine", tag: "INFERENCE" },
  ];

  return (
    <div className="bg-[#FBF3EA] border border-[#F0DDBF] rounded-xl p-8 mb-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold">Data Processing Pipeline</h2>
        <span className="flex items-center gap-2 text-sm font-medium text-[#2E7D32]">
          <span className="w-2 h-2 rounded-full bg-[#2E7D32] inline-block" />
          System Operational
        </span>
      </div>

      <div className="flex items-center overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="flex flex-col items-center w-24 shrink-0">
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 ${
                  s.active
                    ? "bg-[#3D2B1F] text-white"
                    : "bg-white text-[#3D2B1F] border border-[#E9E2D4]"
                }`}
              >
                <s.icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-center">{s.label}</p>
              <p className="text-[10px] tracking-wide text-[#8A8172] font-medium">
                {s.tag}
              </p>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-[#C9BFA9] mx-3 mb-8 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <InfoCard
          icon={MapPin}
          title="Data Locality"
          body="All processing occurs on-premise or within isolated VPC boundaries. No data ever leaves your encrypted storage except for high-level metadata reporting."
        />
        <InfoCard
          icon={Clock}
          title="Average Latency"
          body="The end-to-end extraction and memory linkage process averages 1.4s per ticket using optimized quantized Llama 3.1 weights on H100 infrastructure."
        />
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, body }) {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-lg p-5">
      <p className="flex items-center gap-2 text-sm font-semibold mb-2.5">
        <Icon className="w-4 h-4 text-[#3D2B1F]" />
        {title}
      </p>
      <p className="text-sm text-[#6B6357] leading-relaxed">{body}</p>
    </div>
  );
}

/* ---------------- TECH STACK GRID ---------------- */

function TechStackGrid() {
  const items = [
    {
      tag: "FRONTEND",
      icon: Terminal,
      name: "Next.js",
      body: "React-based dashboard providing real-time observability into the AI decision graph and operations history.",
    },
    {
      tag: "BACKEND",
      icon: Server,
      name: "Node.js",
      body: "Event-driven orchestration layer managing ticket ingestion, worker queues, and inference API calls.",
    },
    {
      tag: "DATABASE",
      icon: Database,
      name: "PostgreSQL",
      body: "Primary system of record for normalized ticket data and relational organizational hierarchies.",
    },
    {
      tag: "INFERENCE",
      icon: Cog,
      name: "Llama 3.1",
      body: "Advanced LLM running locally via Ollama, fine-tuned for enterprise operational context and reasoning.",
    },
    {
      tag: "CACHE",
      icon: Zap,
      name: "Redis",
      body: "High-performance key-value store for session management, rate limiting, and frequent inference caching.",
    },
    {
      tag: "SECURITY",
      icon: ShieldCheck,
      name: "AES-256",
      body: "Military-grade encryption for all data at rest and in-transit across the entire processing lifecycle.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
      {items.map((item) => (
        <div
          key={item.name}
          className="bg-white border border-[#E9E2D4] rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <span className="text-[10px] tracking-wide font-semibold text-[#8A8172] bg-[#F0EAE0] px-2.5 py-1 rounded">
              {item.tag}
            </span>
            <item.icon className="w-4 h-4 text-[#8A8172]" />
          </div>
          <h3 className="text-xl font-bold mb-2">{item.name}</h3>
          <p className="text-sm text-[#6B6357] leading-relaxed">
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- SYSTEM ARCHITECTURE ---------------- */

function SystemArchitecture() {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl font-bold mb-4">System Architecture</h2>
          <p className="text-[#6B6357] leading-relaxed mb-6">
            OpsMemory AI is architected as a modular, containerized ecosystem
            designed for 99.99% reliability. Our multi-agent architecture
            ensures that specialized sub-processes handle distinct parts of
            the operational memory graph.
          </p>

          <div className="space-y-5">
            <ArchPoint
              icon={Layers}
              title="Hierarchical Ingestion"
              body="Intelligently maps tickets to products, teams, and severity levels based on historical patterns."
            />
            <ArchPoint
              icon={Workflow}
              title="Semantic Memory Core"
              body="Builds a permanent knowledge graph of engineering solutions, reducing repeat incident resolution time."
            />
          </div>
        </div>

        <ArchitectureDiagram />
      </div>
    </div>
  );
}

function ArchPoint({ icon: Icon, title, body }) {
  return (
    <div className="flex gap-3">
      <Icon className="w-5 h-5 text-[#3D2B1F] shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold mb-1">{title}</p>
        <p className="text-sm text-[#6B6357] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function ArchitectureDiagram() {
  const nodes = [
    { icon: Server, label: "Deployment" },
    { icon: Cog, label: "AI Engine" },
    { icon: Share2, label: "Memory Graph" },
    { icon: ShieldCheck, label: "Security" },
  ];

  return (
    <div className="bg-[#FBF3EA] border border-[#F0DDBF] rounded-xl p-6">
      <p className="text-sm font-semibold mb-5">
        OpsMemory AI: Enterprise AI Engine Architecture
      </p>

      <div className="grid grid-cols-2 gap-4 mb-5">
        {nodes.map((n) => (
          <div
            key={n.label}
            className="bg-white rounded-xl p-6 flex flex-col items-center justify-center gap-2 shadow-sm"
          >
            <n.icon className="w-6 h-6 text-[#3D2B1F]" />
            <span className="text-[10px] font-medium text-[#8A8172] text-center">
              {n.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[10px] text-[#8A8172] font-medium px-1">
        <span>Data Lake (S3)</span>
        <span>Data Ingestion &amp; Storage</span>
        <span>SQL/NoSQL Databases</span>
      </div>
    </div>
  );
}