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
              Assets / ATM / NYC-402
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#A39B8C]" />
            <span className="text-xs text-[#8A8172]">Ticket #T-8429</span>
          </div>
          <h1 className="text-3xl font-bold">#T-8429 - Cash Dispenser Jam</h1>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <button className="border border-[#E9E2D4] bg-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-[#F0EAE0] transition">
            Export Report
          </button>
          <button className="bg-[#3D2B1F] text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-[#2B1D14] transition">
            Support Ticket
          </button>
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
          <OpsMemoryIntelligence />
          <AIHealthReview />
          <ActivityTimeline />
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

/* ---------------- OPSMEMORY INTELLIGENCE ---------------- */

function OpsMemoryIntelligence() {
  return (
    <div className="bg-white border border-[#E9C99A] rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#F3A93C] to-[#E8973C] px-6 py-4 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white">
          <Sparkles className="w-4 h-4" />
          OPSMEMORY INTELLIGENCE
        </span>
        <span className="text-2xl font-bold text-white">92%</span>
      </div>

      <div className="p-6">
        <p className="text-[10px] tracking-wide font-semibold text-[#8A8172] mb-1.5">
          RECOMMENDED REPAIR
        </p>
        <h4 className="text-xl font-bold mb-3 leading-snug">
          Proactive Shutter Assembly Replacement
        </h4>
        <p className="text-sm text-[#6B6357] leading-relaxed mb-4">
          Frequent jams at this specific location suggest{" "}
          <span className="font-semibold text-[#2B2118]">belt fatigue</span>{" "}
          rather than isolated debris incidents.
        </p>

        <div className="bg-[#FBF3EA] rounded-lg p-4 flex items-start gap-3 mb-5">
          <Lightbulb className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
          <p className="text-sm text-[#4A3F33]">
            Predicted next failure:{" "}
            <span className="font-semibold">14-22 days</span> if not
            addressed.
          </p>
        </div>

        <button className="w-full bg-[#3D2B1F] text-white text-sm font-semibold py-3 rounded-md hover:bg-[#2B1D14] transition">
          Schedule Replacement
        </button>
      </div>
    </div>
  );
}

/* ---------------- AI HEALTH REVIEW ---------------- */

function AIHealthReview() {
  const rows = [
    { label: "AI Confidence", value: "98.4%" },
    { label: "Detected Root Cause", value: "Component Wear" },
    { label: "Preventive Action", value: "Replace belt within 30d" },
    { label: "Risk Level", value: "" },
  ];

  return (
    <Card icon={BarChart2} title="AI Health Review">
      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between">
            <span className="text-sm text-[#6B6357]">{r.label}</span>
            <span className="text-sm font-semibold text-right">
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------------- ACTIVITY TIMELINE ---------------- */

function ActivityTimeline() {
  const events = [
    { title: "AI Review Complete", time: "11:50 AM", done: true },
    { title: "Ticket Closed", time: "11:45 AM", done: true },
    { title: "Repair Started", time: "09:45 AM", done: false },
    { title: "Engineer Arrived", time: "09:12 AM", done: false },
    {
      title: "Engineer Assigned",
      time: "08:30 AM · Sarah Jenkins",
      done: false,
    },
    { title: "Alert Generated", time: "08:15 AM", done: false },
  ];

  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-6 relative">
      <div className="flex items-center gap-2.5 mb-6">
        <List className="w-4.5 h-4.5 text-[#3D2B1F]" />
        <h3 className="font-semibold text-lg">Activity Timeline</h3>
      </div>

      <ol className="relative border-l border-[#E9E2D4] ml-2.5 space-y-6">
        {events.map((e, i) => (
          <li key={i} className="ml-5">
            <span
              className={`absolute -left-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center ${
                e.done ? "bg-[#3D2B1F]" : "bg-[#D9CFC0]"
              }`}
              style={{ width: 18, height: 18 }}
            >
              {e.done && <Check className="w-3 h-3 text-white" />}
            </span>
            <p className="text-sm font-semibold">{e.title}</p>
            <p className="text-xs text-[#8A8172] mt-0.5">{e.time}</p>
          </li>
        ))}
      </ol>

      {/* Map thumbnail overlapping bottom-right */}
      <div className="hidden xl:block absolute -right-4 bottom-16 w-52 rounded-lg overflow-hidden border border-[#E9E2D4] shadow-lg">
        <img
          src="https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=11&size=300x220&maptype=roadmap&key=YOUR_API_KEY"
          alt="Map location"
          className="w-full h-32 object-cover bg-[#DCE9E4]"
        />
        <button className="w-full bg-white/95 text-xs font-semibold py-2 hover:bg-white transition">
          VIEW LOCATION
        </button>
      </div>
    </div>
  );
}