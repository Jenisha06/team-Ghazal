"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  Bell,
  Settings,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function TicketManagementPage() {
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
            const active = l.label === "Tickets";
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

      <div className="flex items-center gap-3">
        <button className="border border-[#E9E2D4] bg-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#F0EAE0] transition">
          Support
        </button>
        <button className="bg-[#3D2B1F] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#2B1D14] transition">
          Create New
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EAE0] transition">
          <Bell className="w-4.5 h-4.5" />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EAE0] transition">
          <Settings className="w-4.5 h-4.5" />
        </button>
      </div>
    </header>
  );
}

/* ---------------- MAIN CONTENT ---------------- */

function MainContent() {
  return (
    <main className="px-10 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Ticket Management</h1>
          <p className="text-sm text-[#8A8172]">
            Monitor and resolve operational requests across all units.
          </p>
        </div>
       
      </div>

      <Filters />
      <TicketsTable />
    </main>
  );
}

/* ---------------- FILTERS ---------------- */

function Filters() {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
        <FilterInput label="TICKET / ATM ID" placeholder="Search ID..." />
        <FilterInput label="ENGINEER" placeholder="Engineer name..." />
        <FilterInput label="LOCATION" placeholder="Branch or City..." />
        <FilterInput label="ISSUE TYPE" placeholder="Search issues..." />
      </div>

      <div className="border-t border-[#F0EAE0] pt-5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Dropdown label="All Statuses" />
          <Dropdown label="All Priority" />
          <Dropdown label="Any Date" />
        </div>
        <button className="text-sm font-medium text-[#6B6357] hover:text-[#2B2118] transition">
          Clear all filters
        </button>
      </div>
    </div>
  );
}

function FilterInput({ label, placeholder }) {
  return (
    <div>
      <label className="block text-[10px] tracking-wide font-semibold text-[#8A8172] mb-2">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-md border border-[#E9E2D4] bg-[#FBF7F1] px-3.5 py-2.5 text-sm text-[#2B2118] placeholder:text-[#A39B8C] outline-none focus:ring-2 focus:ring-[#3D2B1F]/20 focus:border-[#3D2B1F] transition"
      />
    </div>
  );
}

function Dropdown({ label }) {
  return (
    <button className="flex items-center gap-2 border border-[#E9E2D4] bg-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#F7F3ED] transition">
      {label}
      <ChevronDown className="w-4 h-4 text-[#8A8172]" />
    </button>
  );
}

/* ---------------- TICKETS TABLE ---------------- */

const TICKETS = [
  {
    id: "#T-8429",
    atm: "ATM-NYC-402",
    issue: "Cash Dispenser Jam",
    engineer: "Sarah Jenkins",
    
    
    status: "In Progress",
    created: "Jan 24, 2024",
  },
  {
    id: "#T-8430",
    atm: "ATM-CHI-115",
    issue: "Screen Connectivity Error",
    engineer: "Marcus Thorne",
  
   
    status: "Open",
    created: "Jan 23, 2024",
  },
  {
    id: "#T-8431",
    atm: "ATM-SF-882",
    issue: "Security Camera Obscured",
    engineer: "Elena Rodriguez",

   
    status: "Resolved",
    created: "Jan 22, 2024",
  },
  {
    id: "#T-8432",
    atm: "ATM-LON-021",
    issue: "OS Update Required",
    engineer: "David Chen",
    
    
    status: "In Progress",
    created: "Jan 22, 2024",
  },
];



const statusStyle = {
  "In Progress": "bg-[#F3A93C] text-[#3D2B1F]",
  Open: "bg-[#EDE6D8] text-[#6B6357]",
  Resolved: "bg-[#3D2B1F] text-white",
};

function TicketsTable() {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl overflow-hidden mb-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[10px] tracking-wide text-[#8A8172] font-semibold bg-[#FBF7F1] border-b border-[#E9E2D4]">
            <th className="px-6 py-4">TICKET ID</th>
            <th className="px-6 py-4">ATM ID</th>
            <th className="px-6 py-4">ISSUE</th>
            <th className="px-6 py-4">ENGINEER</th>
           
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
              <td className="px-6 py-5 align-top max-w-[160px]">{t.issue}</td>
              <td className="px-6 py-5 align-top">
                <div className="flex items-center gap-2.5">
                  <span>{t.engineer}</span>
                </div>
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

      <div className="flex items-center justify-between px-6 py-4 border-t border-[#E9E2D4]">
        <p className="text-sm text-[#8A8172]">
          Showing 1-20 of 1,248 tickets
        </p>
        <Pagination />
      </div>
    </div>
  );
}

function Pagination() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3];

  return (
    <div className="flex items-center gap-1.5">
      <button className="w-8 h-8 flex items-center justify-center rounded-md border border-[#E9E2D4] hover:bg-[#F7F3ED] transition">
        <ChevronLeft className="w-4 h-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition ${
            page === p
              ? "border border-[#2B2118]"
              : "hover:bg-[#F7F3ED] text-[#6B6357]"
          }`}
        >
          {p}
        </button>
      ))}
      <span className="px-1 text-[#8A8172]">...</span>
      <button
        onClick={() => setPage(62)}
        className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium hover:bg-[#F7F3ED] text-[#6B6357] transition"
      >
        62
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-md border border-[#E9E2D4] hover:bg-[#F7F3ED] transition">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ---------------- BOTTOM CARDS ---------------- */

function BottomCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      

    
    </div>
  );
}
