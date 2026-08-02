"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Cpu,
  Settings,
  Bell,
  ClipboardList,
  CheckCircle2,
  Clock,
  ChevronRight,
  LogOut,
  RefreshCw,
  AlertTriangle,
  Inbox,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { requireTechnician } from "@/lib/protectedRoute";
import { logout } from "@/lib/auth";

/**
 * Technician Dashboard Page Component
 * 
 * Flow:
 * 1. Checks JWT token & verifies TECHNICIAN role via requireTechnician() guard.
 * 2. Fetches assigned tickets from backend API (GET /technician/tickets).
 * 3. Renders live workload statistics and assigned ticket records.
 */
export default function TechnicianDashboardPage() {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Client-Side Authentication Guard (TECHNICIAN check)
  useEffect(() => {
    const currentUser = requireTechnician();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // 2. Fetch Technician Assigned Tickets from Backend API
  const loadAssignedTickets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Existing API Route: GET /technician/tickets (protected by verifyToken)
      const res = await apiFetch("/technician/tickets");

      if (res.status === 401 || res.status === 403) {
        throw new Error("Unauthorized access. Please log in again.");
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch assigned tickets (Status ${res.status})`);
      }

      const data = await res.json();
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Technician Dashboard Data Error:", err);
      setError(err.message || "Unable to fetch assigned tickets.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAssignedTickets();
  }, [loadAssignedTickets]);

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2B2118]">
      {/* Top Navigation Bar */}
      <TopNav user={user} />

      {/* Main Content Area */}
      <MainContent
        user={user}
        tickets={tickets}
        loading={loading}
        error={error}
        onRetry={loadAssignedTickets}
      />
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

        <nav className="flex items-center gap-8 text-sm">
          <Link
            href="/technicianDashboard"
            className="text-[#2B2118] font-medium border-b-2 border-[#2B2118] pb-5 -mb-5"
          >
            Dashboard
          </Link>
          <Link
            href="/technicianTickets"
            className="text-[#6B6357] hover:text-[#2B2118] transition"
          >
            Assigned Tickets
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Technician Role Badge */}
        <span className="text-xs font-semibold bg-[#F3A93C] text-[#3D2B1F] px-2.5 py-1 rounded-full uppercase tracking-wider">
          TECHNICIAN {user?.engineer_id ? `(#${user.engineer_id})` : ""}
        </span>

        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EAE0] transition" title="Notifications">
          <Bell className="w-4.5 h-4.5" />
        </button>

        {/* User Info Avatar & Logout */}
        <div className="flex items-center gap-3 pl-2 border-l border-[#E9E2D4]">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold leading-none">{user?.name || user?.email || "Technician"}</p>
            <p className="text-[10px] text-[#8A8172] mt-0.5">{user?.email || "tech@opsmemory.com"}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#3D2B1F] text-white text-xs font-bold flex items-center justify-center">
            {(user?.name || user?.email || "T").charAt(0).toUpperCase()}
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

function MainContent({ user, tickets, loading, error, onRetry }) {
  return (
    <main className="px-10 py-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Technician Dashboard</h1>
          <p className="text-sm text-[#8A8172]">
            Welcome back{user?.name ? `, ${user.name}` : ""}. Here&rsquo;s your assigned maintenance workload.
          </p>
        </div>

        <button
          onClick={onRetry}
          disabled={loading}
          className="flex items-center gap-2 border border-[#E9E2D4] bg-white px-3.5 py-2 rounded-md text-sm font-medium hover:bg-[#F0EAE0] transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Workload
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Failed to Load Workload</p>
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

      {/* Loading State */}
      {loading ? (
        <div className="py-16 text-center bg-white border border-[#E9E2D4] rounded-xl p-10">
          <RefreshCw className="w-8 h-8 text-[#3D2B1F] animate-spin mx-auto mb-4" />
          <p className="text-base font-semibold text-[#2B2118]">Fetching assigned tickets...</p>
          <p className="text-xs text-[#8A8172] mt-1">Connecting to database for Engineer ID #{user?.engineer_id || "--"}</p>
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <StatCards tickets={tickets} />

          {/* Assigned Tickets Table */}
          <RecentAssignedTickets tickets={tickets} />
        </>
      )}
    </main>
  );
}

/* ---------------- STAT CARDS ---------------- */

function StatCards({ tickets }) {
  const totalAssigned = tickets.length;
  const completedCount = tickets.filter(
    (t) => (t.status || "").toLowerCase() === "closed" || (t.status || "").toLowerCase() === "resolved"
  ).length;
  const pendingCount = totalAssigned - completedCount;

  const stats = [
    {
      icon: ClipboardList,
      iconBg: "bg-[#FBEFDB]",
      label: "ASSIGNED TICKETS",
      value: totalAssigned,
      delta: `${totalAssigned} total assigned`,
      deltaColor: "text-[#2E7D32]",
    },
    {
      icon: CheckCircle2,
      iconBg: "bg-[#E3F3E5]",
      label: "COMPLETED",
      value: completedCount,
      delta: completedCount > 0 ? "Resolved & Closed" : "0 completed",
      deltaColor: "text-[#6B6357]",
    },
    {
      icon: Clock,
      iconBg: "bg-[#FBE3E1]",
      label: "PENDING TICKETS",
      value: pendingCount,
      delta: pendingCount > 0 ? "Requires action" : "All clear",
      deltaColor: pendingCount > 0 ? "text-[#C0392B]" : "text-[#2E7D32]",
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

const statusStyleMap = {
  closed: "bg-[#EDE6D8] text-[#6B6357]",
  resolved: "bg-[#3D2B1F] text-white",
  "in progress": "bg-[#F3A93C] text-[#3D2B1F]",
  open: "bg-[#E3F3E5] text-[#2E7D32]",
};

function RecentAssignedTickets({ tickets }) {
  if (tickets.length === 0) {
    return (
      <div className="bg-white border border-[#E9E2D4] rounded-xl p-12 text-center">
        <Inbox className="w-10 h-10 text-[#A39B8C] mx-auto mb-3" />
        <h3 className="font-semibold text-lg text-[#2B2118]">No Assigned Tickets</h3>
        <p className="text-sm text-[#8A8172] max-w-md mx-auto mt-1">
          You currently have no tickets assigned to your Engineer ID in the database.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E9E2D4]">
        <h3 className="font-semibold text-lg">Assigned Tickets List</h3>
        <span className="text-xs font-semibold bg-[#FBF7F1] text-[#6B6357] border border-[#E9E2D4] px-3 py-1 rounded-full">
          Total: {tickets.length}
        </span>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[10px] tracking-wide text-[#8A8172] font-semibold bg-[#FBF7F1] border-b border-[#E9E2D4]">
            <th className="px-6 py-4">TICKET ID</th>
            <th className="px-6 py-4">ATM ID</th>
            <th className="px-6 py-4">ISSUE</th>
            <th className="px-6 py-4">STATUS</th>
            <th className="px-6 py-4">CREATED</th>
            <th className="px-6 py-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => {
            const statusKey = (t.status || "open").toLowerCase();
            const badgeStyle =
              statusStyleMap[statusKey] || "bg-[#F0EAE0] text-[#6B6357]";

            const rawDate = t.created_date || t.created_at;
            const formattedDate = rawDate
              ? new Date(rawDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "--";

            return (
              <tr key={t.ticket_id || t.id} className="border-b border-[#F0EAE0] last:border-0 hover:bg-[#FBF7F1]/50 transition">
                <td className="px-6 py-5 font-semibold align-top text-[#2B2118]">
                  #{t.ticket_id}
                </td>
                <td className="px-6 py-5 text-[#6B6357] align-top font-medium">
                  {t.atm_id || `ATM-SYS-${t.ticket_id}`}
                </td>
                <td className="px-6 py-5 align-top max-w-[200px]">
                  <p className="font-medium text-[#2B2118]">{t.issue || "Issue description"}</p>
                </td>
                <td className="px-6 py-5 align-top">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${badgeStyle}`}
                  >
                    {t.status || "Open"}
                  </span>
                </td>
                <td className="px-6 py-5 text-[#6B6357] align-top">
                  {formattedDate}
                </td>
                <td className="px-6 py-5 align-top">
                  <Link
                    href={`/technicianTicketDetails?id=${t.ticket_id}`}
                    className="inline-block border border-[#E9E2D4] rounded-md px-4 py-1.5 text-sm font-medium hover:bg-[#F7F3ED] transition"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}