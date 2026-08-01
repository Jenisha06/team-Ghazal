"use client";

import {
  LayoutDashboard,
  Cpu,
  Zap,
  Users,
  Settings,
  FileText,
  LogOut,
  Bell,
  Share2,
  Lock,
  Database,
  Ticket,
  ShieldCheck,
  ChevronRight,
  Info,
  BadgeCheck,
  Download,
} from "lucide-react";

export default function SecurityCompliancePage() {
  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2B2118] flex">
      <Sidebar />
      <div className="flex-1">
        <TopNav />
        <MainContent />
      </div>
    </div>
  );
}

/* ---------------- SIDEBAR ---------------- */

function Sidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: Cpu, label: "Memory Bank" },
    { icon: Zap, label: "Automations" },
    { icon: Users, label: "Team" },
    { icon: Settings, label: "Settings", active: true },
  ];

  return (
    <aside className="w-[280px] shrink-0 border-r border-[#E9E2D4] px-5 py-6 flex flex-col justify-between min-h-screen">
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

        <div className="bg-[#3D2B1F] rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-white mb-3">
            Active Plan: Enterprise
          </p>
          <button className="w-full bg-white text-[#2B2118] text-sm font-medium py-2.5 rounded-md hover:bg-[#F0EAE0] transition">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ---------------- TOP NAV ---------------- */

function TopNav() {
  return (
    <header className="flex items-center justify-between px-8 h-[72px] bg-[#FBF7F1] border-b border-[#E9E2D4]">
      <div className="flex items-center gap-10">
        <span className="text-lg font-semibold leading-tight">
          OpsMemory AI
        </span>
        <nav className="flex items-center gap-8 text-sm text-[#6B6357]">
          <a href="#" className="hover:text-[#2B2118] transition">
            Dashboard
          </a>
          <a href="#" className="hover:text-[#2B2118] transition">
            Analytics
          </a>
          <a href="#" className="hover:text-[#2B2118] transition">
            Assets
          </a>
          <a href="#" className="hover:text-[#2B2118] transition">
            Workflows
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <button className="border border-[#E9E2D4] bg-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#F0EAE0] transition">
          Support
        </button>
        <button className="bg-[#3D2B1F] text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-[#2B1D14] transition text-center leading-tight">
          Create
          <br className="hidden" /> New
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EAE0] transition">
          <Bell className="w-4.5 h-4.5" />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EAE0] transition">
          <Settings className="w-4.5 h-4.5" />
        </button>
        <img
          src="https://i.pravatar.cc/72?img=68"
          alt="User avatar"
          className="w-9 h-9 rounded-full object-cover"
        />
      </div>
    </header>
  );
}

/* ---------------- MAIN CONTENT ---------------- */

function MainContent() {
  return (
    <main className="px-10 py-8">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-4xl font-bold mb-3">Security Compliance</h1>
        <p className="text-[#6B6357] leading-relaxed">
          Enterprise-grade data protection and local-first AI architecture
          designed for the most sensitive operational environments.
        </p>
      </div>

      <FeatureCards />
      <SecurityFlow />
      <FooterBar />
    </main>
  );
}

/* ---------------- FEATURE CARDS ---------------- */

function FeatureCards() {
  const cards = [
    {
      icon: Share2,
      title: "Local AI",
      body: "Runs completely on-premise. Your data never leaves your network boundaries, ensuring total sovereignty and compliance with strict data residency laws.",
    },
    {
      icon: Lock,
      title: "AES-256 Encryption",
      body: "Sensitive technician notes encrypted. Military-grade protection for all data at rest and in transit using hardware-accelerated crypto modules.",
    },
    {
      icon: Database,
      title: "Redis Cache",
      body: "Fast recommendation retrieval. Encrypted in-memory caching for low-latency performance without compromising the underlying data security posture.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((c) => (
        <div
          key={c.title}
          className="bg-white border border-[#E9E2D4] rounded-xl p-7"
        >
          <div className="w-12 h-12 rounded-xl bg-[#FBEAE4] flex items-center justify-center mb-6">
            <c.icon className="w-5 h-5 text-[#3D2B1F]" />
          </div>
          <h3 className="text-xl font-bold mb-3">{c.title}</h3>
          <p className="text-sm text-[#6B6357] leading-relaxed">{c.body}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- END-TO-END SECURITY FLOW ---------------- */

function SecurityFlow() {
  const steps = [
    {
      icon: Ticket,
      label: "Ticket",
      sub: "Incoming request data",
      style: "bg-[#FBEAE4] text-[#3D2B1F]",
    },
    {
      icon: Lock,
      label: "Encryption",
      sub: "AES-256 wrapping",
      style: "bg-[#F3A93C] text-[#3D2B1F]",
    },
    {
      icon: Cpu,
      label: "Local AI",
      sub: "On-prem inference",
      style: "bg-[#3D2B1F] text-white",
      big: true,
    },
    {
      icon: Lock,
      label: "Encryption",
      sub: "Secure output wrap",
      style: "bg-[#F3A93C] text-[#3D2B1F]",
    },
    {
      icon: ShieldCheck,
      label: "Secure Storage",
      sub: "Cold data retention",
      style: "bg-white text-[#3D2B1F] border-2 border-[#F0DDBF]",
    },
  ];

  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-8 mb-6">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold">End-to-End Security Flow</h2>
        <span className="flex items-center gap-2 text-sm font-medium text-[#2E7D32]">
          <span className="w-2 h-2 rounded-full bg-[#2E7D32] inline-block" />
          System Status: Secure
        </span>
      </div>

      <div className="flex items-start justify-center gap-4 md:gap-8 mb-8 overflow-x-auto">
        {steps.map((s, i) => (
          <div key={i} className="flex items-start">
            <div className="flex flex-col items-center w-32 shrink-0">
              <div
                className={`${
                  s.big ? "w-20 h-20 rounded-2xl" : "w-16 h-16 rounded-full"
                } flex items-center justify-center mb-3 ${s.style}`}
              >
                <s.icon className={s.big ? "w-8 h-8" : "w-6 h-6"} />
              </div>
              <p className="text-base font-bold text-center">{s.label}</p>
              <p className="text-xs text-[#8A8172] text-center mt-1">
                {s.sub}
              </p>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight className="w-5 h-5 text-[#C9BFA9] mt-7 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-[#F0EAE0] pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#8A8172] shrink-0 mt-0.5" />
          <p className="text-sm text-[#6B6357] leading-relaxed">
            The process isolation ensures that raw data is never exposed to
            external networks during processing.
          </p>
        </div>
        <div className="flex items-start gap-2.5">
          <BadgeCheck className="w-4 h-4 text-[#8A8172] shrink-0 mt-0.5" />
          <p className="text-sm text-[#6B6357] leading-relaxed">
            SOC2 and HIPAA compliant architecture designed for
            enterprise-wide scalability.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- FOOTER BAR ---------------- */

function FooterBar() {
  return (
    <div className="flex items-center justify-between px-1 py-2">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-md bg-[#F0EAE0] flex items-center justify-center">
          <Users className="w-4 h-4 text-[#8A8172]" />
        </div>
        <span className="text-sm text-[#6B6357]">
          Audited by External Security Partners
        </span>
      </div>
      <a
        href="#"
        className="flex items-center gap-2 text-sm font-medium text-[#2B2118] hover:text-[#3D2B1F] transition"
      >
        Download full security report
        <Download className="w-4 h-4" />
      </a>
    </div>
  );
}