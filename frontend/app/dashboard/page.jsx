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
  RefreshCw,
  AlertTriangle,
  Inbox,
  CheckCircle2,
  Clock,
  Activity,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { requireAdmin } from "@/lib/protectedRoute";
import { logout } from "@/lib/auth";
import { useState, useEffect, useCallback } from "react";

/**
 * Admin Dashboard Page Component
 * 
 * Flow:
 * 1. Checks JWT token & verifies ADMIN role via requireAdmin() client-side guard.
 * 2. Fetches real-time ticket data from backend API endpoint (GET /tickets).
 * 3. Handles Loading, Error, Empty, and Success states.
 * 4. Passes real database data to child UI components for dynamic metric calculation.
 */
export default function DashboardPage() {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Client-Side Authentication & Role Guard (ADMIN check)
  useEffect(() => {
    // requireAdmin checks JWT token cookie & role === "admin"
    // Redirects to /login if token is missing, invalid, or non-admin
    const currentUser = requireAdmin();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // 2. Fetch Ticket Data from Backend Database API
  const loadTickets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Existing API Route call: GET /tickets (protected by verifyToken)
      const res = await apiFetch("/tickets");

      if (res.status === 401 || res.status === 403) {
        throw new Error("Unauthorized access. Please log in again.");
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch tickets from server (Status ${res.status})`);
      }

      const data = await res.json();
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Dashboard Data Fetch Error:", err);
      setError(err.message || "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2B2118]">
      {/* Top Navigation Bar with User Info & Logout */}
      <TopNav user={user} />

      <div className="flex">
        {/* Main Dashboard Content */}
        <MainContent
          tickets={tickets}
          loading={loading}
          error={error}
          onRetry={loadTickets}
        />
      </div>
    </div>
  );
}

/* ---------------- TOP NAV ---------------- */

function TopNav({ user }) {
  return (
    <header className="flex items-center justify-between px-8 h-[72px] bg-[#FBF7F1] border-b border-[#E9E2D4]">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-[#3D2B1F] flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold">OpsMemory AI</span>
        </div>

        <nav className="flex items-center gap-8 text-sm text-[#6B6357]">
          <a
            href="/dashboard"
            className="text-[#2B2118] font-medium border-b-2 border-[#2B2118] pb-5 -mb-5"
          >
            Dashboard
          </a>
          <a href="/analytics" className="hover:text-[#2B2118] transition">
            Analytics
          </a>
          <a href="/tickets" className="hover:text-[#2B2118] transition">
            Tickets
          </a>
          <a href="/security" className="hover:text-[#2B2118] transition">
            Security
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Admin Role Tag */}
        <span className="text-xs font-semibold bg-[#3D2B1F] text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
          ADMIN
        </span>

        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EAE0] transition" title="Notifications">
          <Bell className="w-4.5 h-4.5" />
        </button>

        {/* User Info Avatar & Logout */}
        <div className="flex items-center gap-3 pl-2 border-l border-[#E9E2D4]">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold leading-none">{user?.name || user?.email || "Admin User"}</p>
            <p className="text-[10px] text-[#8A8172] mt-0.5">{user?.email || "admin@opsmemory.com"}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#3D2B1F] text-white text-xs font-bold flex items-center justify-center">
            {(user?.name || user?.email || "A").charAt(0).toUpperCase()}
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1 text-xs font-medium text-[#C0392B] hover:bg-[#FBE3E1] px-2.5 py-1.5 rounded-md transition ml-1"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------- MAIN CONTENT ---------------- */

function MainContent({ tickets, loading, error, onRetry }) {
  return (
    <main className="flex-1 px-10 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-sm text-[#8A8172]">
            Real-time operational health, ticket analytics, and AI memory performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRetry}
            disabled={loading}
            className="flex items-center gap-2 border border-[#E9E2D4] bg-white px-3.5 py-2 rounded-md text-sm font-medium hover:bg-[#F0EAE0] transition disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button className="flex items-center gap-2 border border-[#E9E2D4] bg-white px-4 py-2 rounded-md text-sm font-medium">
            <Calendar className="w-4 h-4" />
            Live DB Feed
          </button>
        </div>
      </div>

      {/* API Error State Handling */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Failed to Load Dashboard Data</p>
              <p className="text-xs text-red-600 mt-0.5">{error}</p>
            </div>
          </div>
          <button
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-md transition"
          >
            Retry API Call
          </button>
        </div>
      )}

      {/* Loading State Handling */}
      {loading ? (
        <div className="py-16 text-center bg-white border border-[#E9E2D4] rounded-xl p-10">
          <RefreshCw className="w-8 h-8 text-[#3D2B1F] animate-spin mx-auto mb-4" />
          <p className="text-base font-semibold text-[#2B2118]">Fetching database metrics...</p>
          <p className="text-xs text-[#8A8172] mt-1">Connecting to backend APIs and Supabase database</p>
        </div>
      ) : (
        <>
          {/* Stat Cards populated from database */}
          <StatCards tickets={tickets} />

          {/* Empty State Handling */}
          {tickets.length === 0 ? (
            <div className="bg-white border border-[#E9E2D4] rounded-xl p-12 text-center mt-6">
              <Inbox className="w-10 h-10 text-[#A39B8C] mx-auto mb-3" />
              <h3 className="font-semibold text-lg text-[#2B2118]">No Tickets Found</h3>
              <p className="text-sm text-[#8A8172] max-w-md mx-auto mt-1">
                There are currently no ticket records in the database. New tickets created by users or technicians will appear here automatically.
              </p>
            </div>
          ) : (
            /* Charts & Tables Row */
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-6 mt-6">
              {/* Dynamic Open vs Closed Chart */}
              <OpenVsClosed tickets={tickets} />

              {/* Dynamic Recent Activity Table */}
              <RecentActivity tickets={tickets} />
            </div>
          )}
        </>
      )}
    </main>
  );
}

/* ---------------- STAT CARDS (Dynamic Calculation from Database) ---------------- */

function StatCards({ tickets }) {
  // Total tickets count
  const totalTickets = tickets.length;

  // Open tickets count (Status != "Closed" case-insensitive)
  const openTickets = tickets.filter(
    (t) => (t.status || "").toLowerCase() !== "closed"
  ).length;

  // Closed tickets count (Status == "Closed" case-insensitive)
  const closedTickets = tickets.filter(
    (t) => (t.status || "").toLowerCase() === "closed"
  ).length;

  // AI Reviewed tickets (tickets with technician notes or closed status)
  const aiReviewedCount = tickets.filter(
    (t) => t.technician_notes || (t.status || "").toLowerCase() === "closed"
  ).length;

  // Average Resolution Time calculated from database timestamps (created_at vs updated_at)
  const avgResTime = calculateAvgResolutionTime(tickets);

  const stats = [
    {
      label: "Total Tickets",
      value: totalTickets,
      subtext: "Total in DB",
      icon: Activity,
    },
    {
      label: "Open Tickets",
      value: openTickets,
      subtext: openTickets > 0 ? "Pending resolution" : "All resolved",
      icon: Clock,
    },
    {
      label: "Closed Tickets",
      value: closedTickets,
      subtext: "Successfully completed",
      icon: CheckCircle2,
    },
    {
      label: "AI Reviews",
      value: aiReviewedCount,
      subtext: "Knowledge extracted",
      icon: Sparkles,
    },
    {
      label: "Avg Res. Time",
      value: avgResTime,
      subtext: "Closed tickets avg",
      icon: Hourglass,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="bg-white border border-[#E9E2D4] rounded-xl p-4 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-[#8A8172] font-medium">{s.label}</p>
              <Icon className="w-4 h-4 text-[#8A8172]" />
            </div>
            <p className="text-2xl font-bold my-1">{s.value}</p>
            <p className="text-[10px] text-[#A39B8C] font-medium">{s.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Calculates Average Resolution Time from DB timestamps for closed tickets
 */
function calculateAvgResolutionTime(tickets) {
  const closedTickets = tickets.filter(
    (t) => (t.status || "").toLowerCase() === "closed"
  );

  if (closedTickets.length === 0) return "--";

  let totalMs = 0;
  let count = 0;

  closedTickets.forEach((t) => {
    if (t.created_at && t.updated_at) {
      const created = new Date(t.created_at).getTime();
      const updated = new Date(t.updated_at).getTime();
      const diff = updated - created;

      if (!isNaN(diff) && diff > 0) {
        totalMs += diff;
        count += 1;
      }
    }
  });

  if (count === 0) return "--";

  const avgMinutes = Math.round(totalMs / count / (1000 * 60));
  if (avgMinutes >= 60) {
    const hours = (avgMinutes / 60).toFixed(1);
    return `${hours}h`;
  }
  return `${avgMinutes}m`;
}

/* ---------------- OPEN VS CLOSED CHART (Dynamic Calculation from DB) ---------------- */

function OpenVsClosed({ tickets }) {
  // Aggregate real database tickets by Day of Week
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayStats = {};
  daysOfWeek.forEach((d) => {
    dayStats[d] = { open: 0, closed: 0, total: 0 };
  });

  tickets.forEach((ticket) => {
    if (!ticket.created_at) return;
    const date = new Date(ticket.created_at);
    // getDay(): 0 = Sun, 1 = Mon ... 6 = Sat
    const dayIndex = (date.getDay() + 6) % 7; // Map Mon=0 ... Sun=6
    const dayName = daysOfWeek[dayIndex];

    const isClosed = (ticket.status || "").toLowerCase() === "closed";
    if (isClosed) {
      dayStats[dayName].closed += 1;
    } else {
      dayStats[dayName].open += 1;
    }
    dayStats[dayName].total += 1;
  });

  // Filter to days that have recorded tickets, or show default week days
  const rows = daysOfWeek.map((day) => {
    const { open, closed, total } = dayStats[day];
    const closedPct = total > 0 ? Math.round((closed / total) * 100) : 0;
    const openPct = total > 0 ? 100 - closedPct : 0;
    return { day, closed, open, total, closedPct, openPct };
  });

  const hasData = rows.some((r) => r.total > 0);

  return (
    <ChartCard
      title="Open vs Closed Tickets"
      action={
        <div className="flex items-center gap-4 text-xs text-[#6B6357]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3D2B1F] inline-block" />
            Closed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8C99A] inline-block" />
            Open
          </span>
        </div>
      }
    >
      <div className="space-y-4 pt-3">
        {!hasData ? (
          <p className="text-xs text-[#8A8172] italic text-center py-6">
            No ticket distribution data available for current period.
          </p>
        ) : (
          rows.map((r) => (
            <div key={r.day}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-[#2B2118]">{r.day}</span>
                <span className="text-[#8A8172]">
                  {r.total > 0
                    ? `${r.closedPct}% Closed (${r.closed}) vs ${r.openPct}% Open (${r.open})`
                    : "No tickets"}
                </span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden flex w-full bg-[#F0EAE0]">
                {r.total > 0 ? (
                  <>
                    <div
                      className="h-full bg-[#3D2B1F] transition-all duration-500"
                      style={{ width: `${r.closedPct}%` }}
                      title={`${r.closed} Closed`}
                    />
                    <div
                      className="h-full bg-[#E8C99A] transition-all duration-500"
                      style={{ width: `${r.openPct}%` }}
                      title={`${r.open} Open`}
                    />
                  </>
                ) : (
                  <div className="h-full w-full bg-[#F0EAE0]" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </ChartCard>
  );
}

/* ---------------- SHARED CHART CARD WRAPPER ---------------- */

function ChartCard({ title, action, children }) {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4 border-b border-[#F0EAE0] pb-3">
        <h3 className="font-semibold text-base">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

/* ---------------- RECENT ACTIVITY TABLE (Dynamic DB Data) ---------------- */

function RecentActivity({ tickets }) {
  // Sort tickets by created_at descending and get top 5
  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    .slice(0, 5);

  const statusStyleMap = {
    closed: "bg-[#EDE6D8] text-[#6B6357]",
    "in progress": "bg-[#F3A93C] text-[#3D2B1F]",
    open: "bg-[#E3F3E5] text-[#2E7D32]",
    pending: "bg-[#FBEAD4] text-[#B8860B]",
  };

  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E9E2D4]">
          <h3 className="font-semibold text-base">Recent Database Tickets</h3>
          <a
            href="/tickets"
            className="text-xs font-medium text-[#6B6357] flex items-center gap-1 hover:text-[#2B2118] transition"
          >
            View All ({tickets.length}) <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[10px] tracking-wider uppercase text-[#8A8172] bg-[#FBF7F1] border-b border-[#E9E2D4]">
                <th className="px-4 py-3 font-semibold">Ticket ID</th>
                <th className="px-4 py-3 font-semibold">Issue</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Created Date</th>
                <th className="px-4 py-3 font-semibold">AI Review</th>
              </tr>
            </thead>
            <tbody>
              {recentTickets.map((ticket) => {
                const statusKey = (ticket.status || "open").toLowerCase();
                const badgeStyle =
                  statusStyleMap[statusKey] || "bg-[#F0EAE0] text-[#6B6357]";

                const formattedDate = ticket.created_at
                  ? new Date(ticket.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "--";

                const isReviewed =
                  ticket.technician_notes || statusKey === "closed";

                return (
                  <tr
                    key={ticket.ticket_id}
                    className="border-b border-[#F0EAE0] last:border-0 hover:bg-[#FBF7F1]/50 transition"
                  >
                    <td className="px-4 py-3.5 font-semibold text-[#2B2118]">
                      <a href={`/ticketDetails?id=${ticket.ticket_id}`} className="hover:underline hover:text-[#3D2B1F]">
                        #{ticket.ticket_id}
                      </a>
                    </td>
                    <td className="px-4 py-3.5 text-[#2B2118] max-w-[180px] truncate" title={ticket.issue}>
                      {ticket.issue || "No description"}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full uppercase ${badgeStyle}`}
                      >
                        {ticket.status || "Open"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#8A8172]">{formattedDate}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`flex items-center gap-1 font-medium ${
                          isReviewed ? "text-[#2E7D32]" : "text-[#B8860B]"
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        {isReviewed ? "Reviewed" : "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
