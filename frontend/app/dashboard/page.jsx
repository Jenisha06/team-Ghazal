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

import {apiFetch} from "@/lib/api";
import {useState,useEffect} from "react";


export default function DashboardPage() {


const [tickets,setTickets]=useState([]);


useEffect(()=>{


    async function loadTickets(){

        try{

            const res = await apiFetch("/tickets");


            if(!res.ok){

                throw new Error("Failed to fetch tickets");

            }


            const data = await res.json();


            setTickets(data);


        }
        catch(error){

            console.log(error);

        }


    }


    loadTickets();


},[]);



return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2B2118]">

      <TopNav />

      <div className="flex">

        <MainContent tickets={tickets}/>

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

/* ---------------- MAIN CONTENT ---------------- */

function MainContent({tickets}) {
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
      <StatCards tickets={tickets}/>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_360px] gap-6 mt-6">

        <OpenVsClosed />
<RecentActivity tickets={tickets}/>
        {/* AI Insights spans two rows via grid placement below */}
      </div>

    </main>
  );
}

/* ---------------- STAT CARDS ---------------- */

function StatCards({tickets}) {


const totalTickets = tickets.length;


const openTickets = tickets.filter(
    t=>t.status !== "CLOSED"
).length;


const closedTickets = tickets.filter(
    t=>t.status === "CLOSED"
).length;



const stats = [

{
label:"Total Tickets",
value:totalTickets,
},

{
label:"Open Tickets",
value:openTickets,
},

{
label:"Closed Tickets",
value:closedTickets,
},

{
label:"AI Reviews",
value:tickets.length,
},

{
label:"Avg Res. Time",
value:"--",
},

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

function RecentActivity({tickets}) {
  const rows = tickets.slice(0,5).map(ticket=>({

    id:ticket.ticket_id,

    subject:ticket.issue,

    status:ticket.status,

    time:new Date(ticket.created_at)
        .toLocaleDateString(),

    review:"Pending",

    reviewIcon:Sparkles

}));

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
