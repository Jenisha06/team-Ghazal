"use client";

import {
  Search,
  Bell,
  Info,
  UserCog,
  History,
  Sparkles,
  Lightbulb,
  BarChart2,
  List,
  ChevronRight,
  Check,
} from "lucide-react";

export default function TicketDetailPage() {
  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2B2118]">
      <TopNav />
      <MainContent />
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
          <a href="#" className="hover:text-[#2B2118] transition">
            Dashboard
          </a>
          <a href="#" className="hover:text-[#2B2118] transition">
            Analytics
          </a>
          <a
            href="#"
            className="text-[#2B2118] font-medium border-b-2 border-[#2B2118] pb-5 -mb-5"
          >
            Assets
          </a>
          <a href="#" className="hover:text-[#2B2118] transition">
            Workflows
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EAE0] transition">
          <Search className="w-4.5 h-4.5" />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EAE0] transition">
          <Bell className="w-4.5 h-4.5" />
        </button>
        <div className="w-9 h-9 rounded-full bg-[#3D2B1F] text-white text-xs font-semibold flex items-center justify-center">
          SJ
        </div>
      </div>
    </header>
  );
}

/* ---------------- MAIN CONTENT ---------------- */

function MainContent() {
  return (
    <main className="px-10 py-8">
      {/* Breadcrumb + header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium bg-[#EDE6D8] text-[#6B6357] px-3 py-1.5 rounded-full">
              Ticket #T-8429
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#A39B8C]" />
          </div>
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
        <div className="space-y-6">
          <TicketInformation />
          <TechnicianReport />
          <HistoricalIncidents />
        </div>

        <div className="space-y-6">
          {/* <OpsMemoryIntelligence /> */}
          {/* <AIHealthReview /> */}
          {/* <ActivityTimeline /> */}
        </div>
      </div>
    </main>
  );
}

/* ---------------- SHARED CARD ---------------- */

function Card({ icon: Icon, title, children }) {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-6">
      <div className="flex items-center gap-2.5 mb-5">
        <Icon className="w-4.5 h-4.5 text-[#3D2B1F]" />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* ---------------- TICKET INFORMATION ---------------- */

function TicketInformation() {
  return (
    <Card icon={Info} title="Ticket Information">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
        <Field label="TICKET ID" value="#T-8429" />
        <Field label="ATM ID" value="ATM-NYC-402" />
        <Field label="LOCATION" value="5th Ave, New York, NY" />
        <Field
          label="PRIORITY"
          value={
            <span className="text-xs font-semibold bg-[#FBE3E1] text-[#C0392B] px-2.5 py-1 rounded">
              CRITICAL
            </span>
          }
        />
        <Field
          label="ENGINEER"
          value={
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#F3A93C] text-[#3D2B1F] text-[10px] font-bold flex items-center justify-center">
                SJ
              </span>
              Sarah Jenkins
            </span>
          }
        />
        <Field label="ISSUE" value="Mechanical Jam" />
        <Field label="CREATED" value="Jan 24, 08:30 AM" />
        <Field label="CLOSED" value="Jan 24, 11:45 AM" />
      </div>
    </Card>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-[10px] tracking-wide font-semibold text-[#8A8172] mb-1.5">
        {label}
      </p>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

/* ---------------- TECHNICIAN REPORT ---------------- */

function TechnicianReport() {
  return (
    <Card icon={UserCog} title="Technician Report">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-5">
        <div className="bg-[#FBF3EA] rounded-lg p-4">
          <p className="text-xs font-semibold text-[#8A8172] mb-2">
            Technician Notes
          </p>
          <p className="text-sm italic text-[#4A3F33] leading-relaxed">
            &ldquo;Found physical obstruction in the shutter assembly.
            Cleared debris and ran three test cycles to ensure smooth
            delivery of notes.&rdquo;
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6B6357]">Root Cause</span>
            <span className="text-sm font-semibold">
              Foreign object in shutter
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6B6357]">Repair Method</span>
            <span className="text-sm font-semibold">
              Physical clearance &amp; reset
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6B6357]">Repair Type</span>
            <span className="text-xs font-semibold bg-[#F3A93C] text-[#3D2B1F] px-2.5 py-1 rounded">
              HARDWARE MAINTENANCE
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ---------------- HISTORICAL SIMILAR INCIDENTS ---------------- */

function HistoricalIncidents() {
  const rows = [
    {
      ticket: "#T-7102",
      rootCause: "Shutter Jam",
      resolution: "Belt Replacement",
      similarity: "94%",
      strong: true,
    },
    {
      ticket: "#T-6541",
      rootCause: "Physical Obstruction",
      resolution: "Debris Removal",
      similarity: "88%",
      strong: false,
    },
  ];

  return (
    <Card icon={History} title="Historical Similar Incidents">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-[#8A8172] font-medium bg-[#FBF3EA]">
            <th className="px-4 py-3 rounded-l-md">Ticket</th>
            <th className="px-4 py-3">Root Cause</th>
            <th className="px-4 py-3">Resolution</th>
            <th className="px-4 py-3 text-right rounded-r-md">Similarity %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.ticket} className="border-b border-[#F0EAE0] last:border-0">
              <td className="px-4 py-4 font-semibold">{r.ticket}</td>
              <td className="px-4 py-4 text-[#4A3F33]">{r.rootCause}</td>
              <td className="px-4 py-4 text-[#4A3F33]">{r.resolution}</td>
              <td className="px-4 py-4 text-right">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded ${
                    r.strong
                      ? "bg-[#3D2B1F] text-white"
                      : "bg-[#EDE6D8] text-[#6B6357]"
                  }`}
                >
                  {r.similarity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
