"use client";

import Link from "next/link";
import {
  Cpu,
  Settings,
  Bell,
  ClipboardList,
  CheckCircle2,
  Clock,
  ChevronRight,
} from "lucide-react";

export default function TechnicianDashboardPage() {
  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2B2118]">
      <TopNav />
      <MainContent />
    </div>
  );
}

/* ---------------- TOP NAV ---------------- */

function TopNav() {
  const links = [
    { label: "Dashboard", href: "/technicianDashboard" },
    { label: "Tickets", href: "/tickets" },
    
  ];

  return (
    <header className="flex items-center justify-between px-8 h-[72px] bg-[#FBF7F1] border-b border-[#E9E2D4]">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-[#3D2B1F] flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold">OpsMemory AI</span>
        </div>

        <nav className="flex items-center gap-8 text-sm">
          {links.map((l) => {
            const active = l.label === "Dashboard";
            return (
              <Link
                key={l.label}
                href={l.href}
                className={
                  active
                    ? "text-[#2B2118] font-medium border-b-2 border-[#2B2118] pb-5 -mb-5"
                    : "text-[#6B6357] hover:text-[#2B2118] transition"
                }
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EAE0] transition">
          <Bell className="w-4.5 h-4.5" />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EAE0] transition">
          <Settings className="w-4.5 h-4.5" />
        </button>
        <img
          src="https://i.pravatar.cc/72?img=15"
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
    <main className="px-10 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Technician Dashboard</h1>
        <p className="text-sm text-[#8A8172]">
          Welcome back, Sarah. Here&rsquo;s your workload for today.
        </p>
      </div>

      <StatCards />
      <RecentAssignedTickets />
      
    </main>
  );
}

/* ---------------- STAT CARDS ---------------- */

function StatCards() {
  const stats = [
    {
      icon: ClipboardList,
      iconBg: "bg-[#FBEFDB]",
      label: "ASSIGNED TICKETS",
      value: "12",
      delta: "+3 this week",
      deltaColor: "text-[#2E7D32]",
    },
    {
      icon: CheckCircle2,
      iconBg: "bg-[#E3F3E5]",
      label: "COMPLETED TODAY",
      value: "5",
      delta: "On track",
      deltaColor: "text-[#6B6357]",
    },
    {
      icon: Clock,
      iconBg: "bg-[#FBE3E1]",
      label: "PENDING TICKETS",
      value: "7",
      delta: "2 Critical",
      deltaColor: "text-[#C0392B]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-[#E9E2D4] rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div
              className={`w-11 h-11 rounded-lg ${s.iconBg} flex items-center justify-center`}
            >
              <s.icon className="w-5 h-5 text-[#3D2B1F]" />
            </div>
            <span className={`text-xs font-semibold ${s.deltaColor}`}>
              {s.delta}
            </span>
          </div>
          <p className="text-xs tracking-wide text-[#8A8172] font-medium mb-1.5">
            {s.label}
          </p>
          <p className="text-3xl font-bold">{s.value}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- RECENT ASSIGNED TICKETS ---------------- */

const TICKETS = [
  {
    id: "#T-8429",
    atm: "ATM-NYC-402",
    issue: "Cash Dispenser Jam",
    priority: "Critical",
    status: "In Progress",
    created: "Jan 24, 2024",
  },
  {
    id: "#T-8430",
    atm: "ATM-CHI-115",
    issue: "Screen Connectivity Error",
    priority: "Medium",
    status: "Open",
    created: "Jan 23, 2024",
  },
  {
    id: "#T-8431",
    atm: "ATM-SF-882",
    issue: "Security Camera Obscured",
    priority: "High",
    status: "Resolved",
    created: "Jan 22, 2024",
  },
  {
    id: "#T-8432",
    atm: "ATM-LON-021",
    issue: "OS Update Required",
    priority: "Low",
    status: "In Progress",
    created: "Jan 22, 2024",
  },
];

const priorityStyle = {
  Critical: "bg-[#FBE3E1] text-[#C0392B]",
  High: "bg-[#FBEAD4] text-[#B8860B]",
  Medium: "bg-[#EDE6D8] text-[#6B6357]",
  Low: "bg-[#DCEBFB] text-[#2E6DA4]",
};

const statusStyle = {
  "In Progress": "bg-[#F3A93C] text-[#3D2B1F]",
  Open: "bg-[#EDE6D8] text-[#6B6357]",
  Resolved: "bg-[#3D2B1F] text-white",
};

function RecentAssignedTickets() {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E9E2D4]">
        <h3 className="font-semibold text-lg">Recent Assigned Tickets</h3>
        <Link
          href="/tickets"
          className="text-sm font-medium text-[#6B6357] flex items-center gap-1 hover:text-[#2B2118] transition"
        >
          View All Tickets <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[10px] tracking-wide text-[#8A8172] font-semibold bg-[#FBF7F1] border-b border-[#E9E2D4]">
            <th className="px-6 py-4">TICKET ID</th>
            <th className="px-6 py-4">ATM ID</th>
            <th className="px-6 py-4">ISSUE</th>
            <th className="px-6 py-4">PRIORITY</th>
            <th className="px-6 py-4">STATUS</th>
            <th className="px-6 py-4">CREATED</th>
            <th className="px-6 py-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {TICKETS.map((t) => (
            <tr key={t.id} className="border-b border-[#F0EAE0] last:border-0">
              <td className="px-6 py-5 font-medium align-top">{t.id}</td>
              <td className="px-6 py-5 text-[#6B6357] align-top">{t.atm}</td>
              <td className="px-6 py-5 align-top max-w-[180px]">{t.issue}</td>
              <td className="px-6 py-5 align-top">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded ${priorityStyle[t.priority]}`}
                >
                  {t.priority}
                </span>
              </td>
              <td className="px-6 py-5 align-top">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded ${statusStyle[t.status]}`}
                >
                  {t.status}
                </span>
              </td>
              <td className="px-6 py-5 text-[#6B6357] align-top">
                {t.created}
              </td>
              <td className="px-6 py-5 align-top">
                <Link
                  href="/ticketDetails"
                  className="inline-block border border-[#E9E2D4] rounded-md px-4 py-1.5 text-sm font-medium hover:bg-[#F7F3ED] transition"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}