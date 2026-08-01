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
  Calendar,
  Download,
  MoreHorizontal,
  Filter,
  BarChart2,
  Sparkles,
  Hourglass,
  ChevronRight,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2B2118]">
      <TopNav />
      <div className="flex">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

/* ---------------- TOP NAV ---------------- */

function TopNav() {
  return (
    <header className="flex items-center justify-between px-8 h-[72px] bg-[#FBF7F1] border-b border-[#E9E2D4]">
      <div className="flex items-center gap-10">
        <span className="text-lg font-semibold">OpsMemory AI</span>
        <nav className="flex items-center gap-8 text-sm text-[#6B6357]">
          <a href="#" className="text-[#2B2118] font-medium border-b-2 border-[#2B2118] pb-5 -mb-5">
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

      <div className="flex items-center gap-4">
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EAE0] transition">
          <Bell className="w-4.5 h-4.5" />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EAE0] transition">
          <Settings className="w-4.5 h-4.5" />
        </button>
        <button className="bg-[#3D2B1F] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#2B1D14] transition">
          Create New
        </button>
        <button className="border border-[#E9E2D4] text-sm font-medium px-4 py-2 rounded-md hover:bg-[#F0EAE0] transition">
          Support
        </button>
        <div className="w-9 h-9 rounded-full bg-[#D9CFC0] overflow-hidden">
          <img
            src="https://i.pravatar.cc/72"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}

/* ---------------- SIDEBAR ---------------- */

function Sidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: Cpu, label: "Memory Bank" },
    { icon: Zap, label: "Automations" },
    { icon: Users, label: "Team" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-[280px] shrink-0 border-r border-[#E9E2D4] px-5 py-6 flex flex-col justify-between min-h-[calc(100vh-72px)]">
      <div>
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-9 h-9 rounded-md bg-[#3D2B1F] text-white flex items-center justify-center text-xs font-bold">
            OM
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

        <div className="bg-[#FBEFDB] rounded-xl p-4">
          <p className="text-sm font-semibold mb-2">Storage Capacity</p>
          <div className="h-1.5 rounded-full bg-[#EEE2C8] overflow-hidden mb-2">
            <div className="h-full w-[74%] bg-[#3D2B1F] rounded-full" />
          </div>
          <p className="text-xs text-[#8A8172] mb-4">74% of 10TB used</p>
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
    <main className="flex-1 px-10 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard Overview</h1>
          <p className="text-sm text-[#8A8172]">
            Real-time operational health and AI memory performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-[#E9E2D4] bg-white px-4 py-2 rounded-md text-sm font-medium">
            <Calendar className="w-4 h-4" />
            Oct 24, 2023 - Oct 31, 2023
          </button>
          <button className="flex items-center gap-2 border border-[#E9E2D4] bg-white px-4 py-2 rounded-md text-sm font-medium">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <StatCards />

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_360px] gap-6 mt-6">
        <TicketsOverTime />
        <RootCause />
        <AIInsights />

        <OpenVsClosed />
        <ResTimeTrend />
        {/* AI Insights spans two rows via grid placement below */}
      </div>

      {/* Recent activity */}
      <RecentActivity />
    </main>
  );
}

/* ---------------- STAT CARDS ---------------- */

function StatCards() {
  const stats = [
    { label: "Total Tickets", value: "12,482", delta: "+12.5%", trend: "up" },
    { label: "Open Tickets", value: "843", delta: "-3.2%", trend: "down" },
    { label: "Closed Tickets", value: "11,639", delta: "Stable", trend: "stable" },
    { label: "AI Reviews", value: "8,921", delta: "Active", trend: "active" },
    { label: "Recommendations", value: "1,240", delta: "98% Acc.", trend: "sparkle" },
    { label: "Avg Res. Time", value: "14.2m", delta: "-2.4m", trend: "down" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-[#E9E2D4] rounded-xl p-4"
        >
          <p className="text-xs text-[#8A8172] font-medium mb-3">{s.label}</p>
          <p className="text-2xl font-bold mb-2">{s.value}</p>
          <DeltaBadge trend={s.trend} text={s.delta} />
        </div>
      ))}
    </div>
  );
}

function DeltaBadge({ trend, text }) {
  const map = {
    up: { color: "text-[#2E7D32]", symbol: "↗" },
    down: { color: "text-[#C0392B]", symbol: "↘" },
    stable: { color: "text-[#8A8172]", symbol: "◎" },
    active: { color: "text-[#B8860B]", symbol: "⚡" },
    sparkle: { color: "text-[#8A8172]", symbol: "✧" },
  };
  const { color, symbol } = map[trend] || map.stable;
  return (
    <p className={`text-xs font-medium flex items-center gap-1 ${color}`}>
      <span>{symbol}</span> {text}
    </p>
  );
}

/* ---------------- TICKETS OVER TIME (bar chart) ---------------- */

function TicketsOverTime() {
  const bars = [55, 68, 88, 100, 78, 62, 74]; // relative heights %
  const highlightIndex = 3;

  return (
    <ChartCard
      title="Tickets Over Time"
      action={<MoreHorizontal className="w-4 h-4 text-[#8A8172]" />}
    >
      <div className="h-56 bg-[#FBF3EA] rounded-lg flex items-end justify-center gap-4 px-6 pb-6 pt-6">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`w-8 rounded-t-sm ${
              i === highlightIndex ? "bg-[#3D2B1F]" : "bg-[#D9CFC0]"
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </ChartCard>
  );
}

/* ---------------- ROOT CAUSE (donut chart) ---------------- */

function RootCause() {
  const pct = 42;
  const circumference = 2 * Math.PI * 70;
  const dash = (pct / 100) * circumference;

  return (
    <ChartCard
      title="Root Cause"
      action={<Filter className="w-4 h-4 text-[#8A8172]" />}
    >
      <div className="h-56 flex items-center justify-center">
        <div className="relative w-44 h-44">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#EDE6D8"
              strokeWidth="16"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#3D2B1F"
              strokeWidth="16"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{pct}%</span>
            <span className="text-[10px] tracking-wide text-[#8A8172] font-medium">
              INFRASTRUCTURE
            </span>
          </div>
        </div>
      </div>
    </ChartCard>
  );
}

/* ---------------- OPEN VS CLOSED (progress bars) ---------------- */

function OpenVsClosed() {
  const rows = [
    { day: "Mon", closed: 82, open: 18 },
    { day: "Tue", closed: 74, open: 26 },
    { day: "Wed", closed: 91, open: 9 },
  ];

  return (
    <ChartCard
      title="Open vs Closed"
      action={
        <div className="flex items-center gap-4 text-xs text-[#6B6357]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3D2B1F] inline-block" />
            Closed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E8C99A] inline-block" />
            Open
          </span>
        </div>
      }
      titleWrap
    >
      <div className="space-y-5 pt-2">
        {rows.map((r) => (
          <div key={r.day}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-[#6B6357]">{r.day}</span>
              <span className="text-[#8A8172] text-xs">
                {r.closed}% vs {r.open}%
              </span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden flex w-full bg-[#F0EAE0]">
              <div
                className="h-full bg-[#3D2B1F]"
                style={{ width: `${r.closed}%` }}
              />
              <div
                className="h-full bg-[#E8C99A]"
                style={{ width: `${r.open}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

/* ---------------- RES TIME TREND (line/area chart) ---------------- */

function ResTimeTrend() {
  return (
    <ChartCard
      title="Res. Time Trend"
      action={<BarChart2 className="w-4 h-4 text-[#8A8172]" />}
    >
      <div className="h-40 mt-2">
        <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EFC98F" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#EFC98F" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,60 C30,80 60,80 90,55 C120,30 150,20 180,45 C210,70 240,80 270,50 C285,35 300,30 300,30 L300,100 L0,100 Z"
            fill="url(#areaFill)"
          />
          <path
            d="M0,60 C30,80 60,80 90,55 C120,30 150,20 180,45 C210,70 240,80 270,50 C285,35 300,30 300,30"
            fill="none"
            stroke="#3D2B1F"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="flex justify-between text-xs text-[#A39B8C] mt-2">
        <span>00:00</span>
        <span>08:00</span>
        <span>16:00</span>
        <span>23:59</span>
      </div>
    </ChartCard>
  );
}

/* ---------------- AI INSIGHTS (right column) ---------------- */

function AIInsights() {
  return (
    <div className="row-span-2 bg-white border border-[#E9E2D4] rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#FBEFDB] flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-[#3D2B1F]" />
        </div>
        <h3 className="font-semibold">AI Insights</h3>
      </div>

      <InsightCard
        eyebrow="TOP RECURRING ISSUE"
        title="Database Latency (Region US-East)"
        body="AI detected a 14% efficiency loss due to redundant query patterns in Postgres clusters."
      />

      <InsightCard
        eyebrow="MOST SUCCESSFUL REPAIR"
        title="Auto-scaling Adjustment"
        body="Applied to 14 Kubernetes nodes. Resulted in 0 downtime during the peak traffic window."
      />

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#FBF3EA] rounded-lg p-3">
          <p className="text-[10px] tracking-wide text-[#8A8172] font-medium mb-1">
            AFFECTED REGION
          </p>
          <p className="text-lg font-bold leading-tight">EMEA-West</p>
        </div>
        <div className="bg-[#F3A93C] rounded-lg p-3">
          <p className="text-[10px] tracking-wide text-[#5A4321] font-medium mb-1">
            AI CONFIDENCE
          </p>
          <p className="text-lg font-bold leading-tight text-[#3D2B1F]">
            94.2%
          </p>
        </div>
      </div>

      <div className="border-t border-[#E9E2D4] pt-4">
        <p className="text-sm font-semibold mb-3">System Health Monitoring</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-[#6B6357] mb-1">
              Node Sync <span className="float-right text-[#2E7D32]">Active</span>
            </p>
            <div className="h-1 rounded-full bg-[#3D2B1F] w-full" />
          </div>
          <div>
            <p className="text-xs text-[#6B6357] mb-1">
              API Gateway <span className="float-right text-[#2E7D32]">Stable</span>
            </p>
            <div className="h-1 rounded-full bg-[#3D2B1F] w-full" />
          </div>
        </div>
        <button className="w-full border border-[#E9E2D4] rounded-md py-2.5 text-sm font-medium hover:bg-[#F0EAE0] transition">
          Deep Analysis Mode
        </button>
      </div>
    </div>
  );
}

function InsightCard({ eyebrow, title, body }) {
  return (
    <div className="bg-[#FBF3EA] rounded-lg p-4">
      <p className="text-[10px] tracking-wide text-[#B8860B] font-semibold mb-1.5">
        {eyebrow}
      </p>
      <p className="text-sm font-semibold mb-1.5">{title}</p>
      <p className="text-xs text-[#8A8172] leading-relaxed">{body}</p>
    </div>
  );
}

/* ---------------- SHARED CHART CARD WRAPPER ---------------- */

function ChartCard({ title, action, children, titleWrap }) {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-5">
      <div className="flex items-start justify-between mb-2">
        <h3 className={`font-semibold text-lg ${titleWrap ? "max-w-[10rem]" : ""}`}>
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

/* ---------------- RECENT ACTIVITY TABLE ---------------- */

function RecentActivity() {
  const rows = [
    {
      id: "#INC-8821",
      subject: "Memory Leak in AuthService",
      status: "CLOSED",
      time: "2m ago",
      review: "Optimized",
      reviewIcon: Sparkles,
    },
    {
      id: "#INC-8819",
      subject: "DNS Resolution Error: EMEA",
      status: "CLOSED",
      time: "14m ago",
      review: "Resolved",
      reviewIcon: Sparkles,
    },
    {
      id: "#INC-8815",
      subject: "API Latency Spike - v2 Endpoints",
      status: "INVESTIGATING",
      time: "28m ago",
      review: "Queued",
      reviewIcon: Hourglass,
    },
  ];

  const statusStyle = {
    CLOSED: "bg-[#EDE6D8] text-[#6B6357]",
    INVESTIGATING: "bg-[#F3A93C] text-[#5A4321]",
  };

  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl mt-6 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E9E2D4]">
        <h3 className="font-semibold text-lg">Recent Activity</h3>
        <a
          href="#"
          className="text-sm font-medium text-[#6B6357] flex items-center gap-1 hover:text-[#2B2118] transition"
        >
          View All Logs <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-[#8A8172] border-b border-[#E9E2D4]">
            <th className="px-5 py-3 font-medium">Ticket ID</th>
            <th className="px-5 py-3 font-medium">Subject</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Time</th>
            <th className="px-5 py-3 font-medium">AI Review</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const ReviewIcon = r.reviewIcon;
            return (
              <tr key={r.id} className="border-b border-[#F0EAE0] last:border-0">
                <td className="px-5 py-4 font-medium">{r.id}</td>
                <td className="px-5 py-4 text-[#2B2118]">{r.subject}</td>
                <td className="px-5 py-4">
                  <span
                    className={`text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded ${statusStyle[r.status]}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-[#8A8172]">{r.time}</td>
                <td className="px-5 py-4">
                  <span className="flex items-center gap-1.5 font-medium text-[#B8860B]">
                    <ReviewIcon className="w-3.5 h-3.5" />
                    {r.review}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}