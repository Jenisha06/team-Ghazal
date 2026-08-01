"use client";

import {
  LayoutDashboard,
  BarChart2,
  Cpu,
  Zap,
  Users,
  Settings,
  FileText,
  LogOut,
  Search,
  Bell,
  Calendar,
  Download,
  MoreHorizontal,
  Filter,
  ChevronRight,
  Bot,
  AlertTriangle,
  Database,
  Timer,
  Printer,
  CreditCard,
  Lightbulb,
  Sparkles,
} from "lucide-react";

export default function AnalyticsPage() {
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
    { icon: BarChart2, label: "Analytics", active: true },
    { icon: Cpu, label: "Memory Bank" },
    { icon: Zap, label: "Automations" },
    { icon: Users, label: "Team" },
    { icon: Settings, label: "Settings" },
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
              Enterprise Tier
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
        <div className="bg-[#FBEFDB] rounded-xl p-4 mb-4">
          <p className="text-xs font-semibold tracking-wide text-[#8A8172] mb-2">
            QUOTA USED
          </p>
          <div className="h-1.5 rounded-full bg-[#EEE2C8] overflow-hidden mb-3">
            <div className="h-full w-[82%] bg-[#3D2B1F] rounded-full" />
          </div>
          <button className="w-full bg-[#3D2B1F] text-white text-sm font-medium py-2.5 rounded-md hover:bg-[#2B1D14] transition">
            Upgrade Plan
          </button>
        </div>

        <div className="space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#6B6357] hover:bg-[#F0EAE0] transition"
          >
            <FileText className="w-4 h-4" />
            Documentation
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#C0392B] hover:bg-[#FBE3E1] transition"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </a>
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
          OpsMemory
          <br className="hidden" /> AI
        </span>
        <nav className="flex items-center gap-8 text-sm text-[#6B6357]">
          <a href="#" className="hover:text-[#2B2118] transition">
            Dashboard
          </a>
          <a
            href="#"
            className="text-[#2B2118] font-medium border-b-2 border-[#2B2118] pb-5 -mb-5"
          >
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

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#A39B8C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search analytics..."
            className="w-64 rounded-full border border-[#E9E2D4] bg-white pl-10 pr-4 py-2.5 text-sm placeholder:text-[#A39B8C] outline-none focus:ring-2 focus:ring-[#3D2B1F]/20 focus:border-[#3D2B1F] transition"
          />
        </div>
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EAE0] transition">
          <Bell className="w-4.5 h-4.5" />
        </button>
        <img
          src="https://i.pravatar.cc/72?img=68"
          alt="User avatar"
          className="w-9 h-9 rounded-full object-cover"
        />
        <button className="bg-[#3D2B1F] text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-[#2B1D14] transition">
          Create New
        </button>
      </div>
    </header>
  );
}

/* ---------------- MAIN CONTENT ---------------- */

function MainContent() {
  return (
    <main className="px-10 py-8">
      {/* Breadcrumb + header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-sm text-[#8A8172] mb-2 flex items-center gap-1.5">
            Organization <ChevronRight className="w-3.5 h-3.5" /> Performance
          </p>
          <h1 className="text-3xl font-bold">Operational Insights</h1>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <button className="flex items-center gap-2 border border-[#E9E2D4] bg-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#F0EAE0] transition">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 border border-[#E9E2D4] bg-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#F0EAE0] transition">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <RootCauseDistribution />
        <MonthlyIncidentTrend />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <FailureByCity />
        <EfficiencyRanking />
        <InventoryStrain />
      </div>
    </main>
  );
}

/* ---------------- STAT CARDS ---------------- */

function StatCards() {
  const stats = [
    {
      icon: Bot,
      iconBg: "bg-[#FBEFDB]",
      label: "AI ACCURACY",
      value: "99.4%",
      delta: "+0.2%",
      deltaColor: "text-[#2E7D32]",
      symbol: "↗",
    },
    {
      icon: AlertTriangle,
      iconBg: "bg-[#FBE3E1]",
      label: "REPEAT FAILURE RATE",
      value: "4.2%",
      delta: "-1.1%",
      deltaColor: "text-[#C0392B]",
      symbol: "↘",
    },
    {
      icon: Database,
      iconBg: "bg-[#FBEFDB]",
      label: "KNOWLEDGE BASE SIZE",
      value: "14.2k",
      valueSuffix: "Entries",
      delta: "Stable",
      deltaColor: "text-[#6B6357]",
      symbol: null,
    },
    {
      icon: Timer,
      iconBg: "bg-[#FBEFDB]",
      label: "AVG. RESOLUTION TIME",
      value: "14.2m",
      delta: "Target: 15m",
      deltaColor: "text-[#6B6357]",
      symbol: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-[#E9E2D4] rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-10 h-10 rounded-lg ${s.iconBg} flex items-center justify-center`}
            >
              <s.icon className="w-5 h-5 text-[#3D2B1F]" />
            </div>
            <span
              className={`text-sm font-semibold flex items-center gap-1 ${s.deltaColor}`}
            >
              {s.symbol && <span>{s.symbol}</span>} {s.delta}
            </span>
          </div>
          <p className="text-xs tracking-wide text-[#8A8172] font-medium mb-1.5">
            {s.label}
          </p>
          <p className="text-2xl font-bold">
            {s.value}{" "}
            {s.valueSuffix && (
              <span className="text-base font-normal text-[#6B6357]">
                {s.valueSuffix}
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- ROOT CAUSE DISTRIBUTION (donut) ---------------- */

function RootCauseDistribution() {
  const segments = [
    { label: "Hardware", pct: 45, color: "#3D2B1F" },
    { label: "Software", pct: 30, color: "#E8973C" },
    { label: "Network", pct: 15, color: "#8A8172" },
    { label: "Human Error", pct: 10, color: "#E9E2D4" },
  ];

  const circumference = 2 * Math.PI * 70;
  let offsetAcc = 0;

  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Root Cause Distribution</h3>
        <MoreHorizontal className="w-4 h-4 text-[#8A8172]" />
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative w-52 h-52">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
            {segments.map((seg) => {
              const dash = (seg.pct / 100) * circumference;
              const gap = circumference - dash;
              const el = (
                <circle
                  key={seg.label}
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="18"
                  strokeDasharray={`${dash} ${gap}`}
                  strokeDashoffset={-offsetAcc}
                  strokeLinecap="butt"
                />
              );
              offsetAcc += dash;
              return el;
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">1.2k</span>
            <span className="text-sm text-[#8A8172]">Total</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2 text-sm">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-[#4A3F33]">
              {seg.label} ({seg.pct}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- MONTHLY INCIDENT TREND (bar chart) ---------------- */

function MonthlyIncidentTrend() {
  const months = [
    { label: "JAN", h: 40 },
    { label: "FEB", h: 58 },
    { label: "MAR", h: 50 },
    { label: "APR", h: 68, highlight: true },
    { label: "MAY", h: 62 },
    { label: "JUN", h: 55 },
    { label: "JUL", h: 82 },
    { label: "AUG", h: 92 },
    { label: "SEP", h: 0 },
    { label: "OCT", h: 60 },
    { label: "NOV", h: 0 },
    { label: "DEC", h: 0 },
  ];

  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Monthly Incident Trend</h3>
        <div className="flex items-center gap-3 text-sm text-[#8A8172]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-px bg-[#8A8172] inline-block" /> 2023
          </span>
          <Filter className="w-4 h-4" />
        </div>
      </div>

      <div className="h-64 flex items-end justify-between gap-2 border-b border-dashed border-[#E9E2D4] pb-0 relative">
        {/* horizontal dashed guide lines */}
        <div className="absolute inset-x-0 top-0 border-t border-dashed border-[#E9E2D4]" />
        <div className="absolute inset-x-0 top-1/3 border-t border-dashed border-[#E9E2D4]" />
        <div className="absolute inset-x-0 top-2/3 border-t border-dashed border-[#E9E2D4]" />

        {months.map((m) => (
          <div key={m.label} className="flex-1 flex flex-col items-center justify-end h-full">
            {m.h > 0 && (
              <div
                className={`w-full max-w-[28px] rounded-t-sm ${
                  m.highlight ? "bg-[#3D2B1F]" : "bg-[#D9CFC0]"
                }`}
                style={{ height: `${m.h}%` }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-3">
        {months.map((m) => (
          <span
            key={m.label}
            className="flex-1 text-center text-[10px] font-medium text-[#8A8172]"
          >
            {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- FAILURE BY CITY ---------------- */

function FailureByCity() {
  const cities = [
    { name: "New York", count: 412, pct: 100 },
    { name: "San Francisco", count: 328, pct: 80 },
    { name: "Chicago", count: 245, pct: 60 },
    { name: "London", count: 198, pct: 48 },
  ];

  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-6">
      <h3 className="font-semibold text-lg mb-6">Failure by City</h3>
      <div className="space-y-6">
        {cities.map((c) => (
          <div key={c.name}>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium">{c.name}</span>
              <span className="text-[#8A8172]">{c.count}</span>
            </div>
            <div className="h-2 rounded-full bg-[#F0EAE0] overflow-hidden">
              <div
                className="h-full bg-[#3D2B1F] rounded-full"
                style={{ width: `${c.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- EFFICIENCY RANKING ---------------- */

function EfficiencyRanking() {
  const people = [
    {
      name: "Sarah Mitchell",
      role: "SENIOR ENGINEER",
      time: "11.4m",
      avatar: "SM",
      bg: "bg-[#F3A93C]",
    },
    {
      name: "James Rodriguez",
      role: "FIELD TECH",
      time: "12.8m",
      avatar: "JR",
      bg: "bg-[#E9C99A]",
    },
    {
      name: "Alex Lee",
      role: "SUPPORT LEAD",
      time: "14.2m",
      avatar: "AL",
      bg: "bg-[#D9CFC0]",
    },
    {
      name: "Elena White",
      role: "ASSOCIATE",
      time: "16.5m",
      avatar: "EW",
      bg: "bg-[#EDE6D8]",
    },
  ];

  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-6">
      <h3 className="font-semibold text-lg mb-4">Efficiency Ranking</h3>
      <div>
        {people.map((p, i) => (
          <div
            key={p.name}
            className={`flex items-center justify-between py-4 ${
              i !== people.length - 1 ? "border-b border-[#F0EAE0]" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full ${p.bg} text-[#3D2B1F] text-xs font-bold flex items-center justify-center`}
              >
                {p.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-[10px] tracking-wide text-[#8A8172] font-medium">
                  {p.role}
                </p>
              </div>
            </div>
            <span className="text-sm font-semibold">{p.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- INVENTORY STRAIN ---------------- */

function InventoryStrain() {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-6 relative overflow-visible">
      <h3 className="font-semibold text-lg mb-4">Inventory Strain</h3>

      <div className="space-y-3 mb-4">
        <InventoryItem
          icon={Printer}
          name="Receipt Printer"
          detail="18 replacements"
          delta="(↓ 5%)"
          deltaColor="text-[#2E7D32]"
        />
        <InventoryItem
          icon={CreditCard}
          name="Card Reader"
          detail="14 replacements"
          delta="(—)"
          deltaColor="text-[#8A8172]"
        />
      </div>

      <div className="bg-[#FBEFDB] rounded-lg p-4 flex items-start gap-3">
        <Lightbulb className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
        <p className="text-sm italic text-[#4A3F33] leading-relaxed">
          AI Predicts: Cash Shutter replacements will spike next month due to
          London site expansion.
        </p>
      </div>

      {/* Floating memory insight tooltip */}
      <div className="hidden lg:block absolute -top-16 -left-10 w-72 bg-[#3D2B1F] text-white rounded-xl p-4 shadow-xl z-10">
        <p className="flex items-center gap-1.5 text-[10px] tracking-wide font-semibold text-[#E9C99A] mb-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          MEMORY INSIGHT
        </p>
        <p className="text-sm leading-relaxed">
          Network-related incidents are down 15% after the recent firmware
          rollout in Chicago.
        </p>
      </div>
    </div>
  );
}

function InventoryItem({ icon: Icon, name, detail, delta, deltaColor }) {
  return (
    <div className="flex items-center gap-3 bg-[#FBF3EA] rounded-lg p-3.5">
      <div className="w-9 h-9 rounded-md bg-white flex items-center justify-center border border-[#E9E2D4]">
        <Icon className="w-4 h-4 text-[#3D2B1F]" />
      </div>
      <div>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-[#8A8172]">
          {detail} <span className={deltaColor}>{delta}</span>
        </p>
      </div>
    </div>
  );
}