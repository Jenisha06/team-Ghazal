"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Cpu,
  Bell,
  Settings,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  Inbox,
  LogOut,
  Search,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { requireTechnician } from "@/lib/protectedRoute";
import { logout } from "@/lib/auth";

/**
 * Dedicated Technician Assigned Tickets Page Component
 * 
 * Requirements:
 * 1. Protected strictly by requireTechnician() guard (Technician role only).
 * 2. Renders Technician Navigation Bar (Dashboard | Assigned Tickets) with TECHNICIAN (#engineer_id) badge.
 * 3. Fetches assigned tickets from GET /technician/tickets.
 * 4. Filters out the redundant "Search by Engineer ID" input while retaining Ticket/ATM ID, Issue Description, and Status filters.
 */
export default function TechnicianTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States (No Engineer ID search since all tickets belong to logged-in technician)
  const [searchId, setSearchId] = useState("");
  const [searchIssue, setSearchIssue] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

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
      console.error("Technician Tickets Data Error:", err);
      setError(err.message || "Unable to fetch assigned tickets.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAssignedTickets();
  }, [loadAssignedTickets]);

  // 3. Filter Logic (Ticket/ATM ID, Issue Description, Status)
  const filteredTickets = tickets.filter((t) => {
    const ticketIdStr = (t.ticket_id || "").toLowerCase();
    const atmIdStr = (t.atm_id || "").toLowerCase();
    const matchesId =
      !searchId ||
      ticketIdStr.includes(searchId.toLowerCase()) ||
      atmIdStr.includes(searchId.toLowerCase());

    const issueStr = (t.issue || "").toLowerCase();
    const matchesIssue =
      !searchIssue || issueStr.includes(searchIssue.toLowerCase());

    const statusStr = (t.status || "").toLowerCase();
    const matchesStatus =
      statusFilter === "ALL" || statusStr === statusFilter.toLowerCase();

    return matchesId && matchesIssue && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2B2118]">
      {/* Technician Navigation Bar */}
      <TechnicianTopNav user={user} />

      {/* Main Content Area */}
      <main className="px-10 py-8 max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Assigned Tickets</h1>
            <p className="text-sm text-[#8A8172]">
              View, filter, and resolve maintenance tickets assigned to your unit.
            </p>
          </div>

          <button
            onClick={loadAssignedTickets}
            disabled={loading}
            className="flex items-center gap-2 border border-[#E9E2D4] bg-white px-3.5 py-2 rounded-md text-sm font-medium hover:bg-[#F0EAE0] transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <p className="font-semibold text-sm">Failed to Load Assigned Tickets</p>
                <p className="text-xs text-red-600 mt-0.5">{error}</p>
              </div>
            </div>
            <button
              onClick={loadAssignedTickets}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-md transition"
            >
              Retry API Call
            </button>
          </div>
        )}

        {/* Technician Filters Component */}
        <TechnicianFilters
          searchId={searchId}
          setSearchId={setSearchId}
          searchIssue={searchIssue}
          setSearchIssue={setSearchIssue}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onReset={() => {
            setSearchId("");
            setSearchIssue("");
            setStatusFilter("ALL");
          }}
        />

        {/* Loading State */}
        {loading ? (
          <div className="py-16 text-center bg-white border border-[#E9E2D4] rounded-xl p-10">
            <RefreshCw className="w-8 h-8 text-[#3D2B1F] animate-spin mx-auto mb-4" />
            <p className="text-base font-semibold text-[#2B2118]">Loading assigned tickets...</p>
            <p className="text-xs text-[#8A8172] mt-1">Filtering records for Engineer ID #{user?.engineer_id || "--"}</p>
          </div>
        ) : (
          /* Technician Tickets Table */
          <TechnicianTicketsTable
            tickets={filteredTickets}
            totalCount={tickets.length}
          />
        )}
      </main>
    </div>
  );
}

/* ---------------- TECHNICIAN TOP NAV ---------------- */

function TechnicianTopNav({ user }) {
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
            className="text-[#6B6357] hover:text-[#2B2118] transition"
          >
            Dashboard
          </Link>
          <Link
            href="/technicianTickets"
            className="text-[#2B2118] font-medium border-b-2 border-[#2B2118] pb-5 -mb-5"
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

/* ---------------- TECHNICIAN FILTERS (No Engineer ID Search Input) ---------------- */

function TechnicianFilters({
  searchId,
  setSearchId,
  searchIssue,
  setSearchIssue,
  statusFilter,
  setStatusFilter,
  onReset,
}) {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Ticket / ATM ID */}
        <div>
          <label className="block text-[10px] tracking-wide font-semibold text-[#8A8172] uppercase mb-1.5">
            TICKET / ATM ID
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Search ID..."
              className="w-full bg-[#FBF7F1] border border-[#E9E2D4] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#3D2B1F] transition"
            />
          </div>
        </div>

        {/* Issue Description */}
        <div>
          <label className="block text-[10px] tracking-wide font-semibold text-[#8A8172] uppercase mb-1.5">
            ISSUE DESCRIPTION
          </label>
          <input
            type="text"
            value={searchIssue}
            onChange={(e) => setSearchIssue(e.target.value)}
            placeholder="Search issue details..."
            className="w-full bg-[#FBF7F1] border border-[#E9E2D4] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#3D2B1F] transition"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#F0EAE0]">
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#8A8172] font-medium">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#FBF7F1] border border-[#E9E2D4] rounded-md px-3 py-1.5 text-xs font-medium text-[#2B2118] focus:outline-none focus:border-[#3D2B1F] transition cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <button
          onClick={onReset}
          className="text-xs font-medium text-[#6B6357] hover:text-[#2B2118] transition"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}

/* ---------------- TECHNICIAN TICKETS TABLE ---------------- */

const statusStyleMap = {
  closed: "bg-[#EDE6D8] text-[#6B6357]",
  resolved: "bg-[#3D2B1F] text-white",
  "in progress": "bg-[#F3A93C] text-[#3D2B1F]",
  open: "bg-[#E3F3E5] text-[#2E7D32]",
};

function TechnicianTicketsTable({ tickets, totalCount }) {
  if (tickets.length === 0) {
    return (
      <div className="bg-white border border-[#E9E2D4] rounded-xl p-12 text-center mb-6">
        <Inbox className="w-10 h-10 text-[#A39B8C] mx-auto mb-3" />
        <h3 className="font-semibold text-lg text-[#2B2118]">No Tickets Found</h3>
        <p className="text-sm text-[#8A8172] max-w-md mx-auto mt-1">
          {totalCount === 0
            ? "There are currently no tickets assigned to your Engineer ID."
            : "No assigned tickets match your selected filter criteria."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] tracking-wide text-[#8A8172] font-semibold bg-[#FBF7F1] border-b border-[#E9E2D4]">
              <th className="px-6 py-4">TICKET ID</th>
              <th className="px-6 py-4">ATM ID</th>
              <th className="px-6 py-4">ISSUE</th>
              <th className="px-6 py-4">STATUS</th>
              <th className="px-6 py-4">CREATED DATE</th>
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
                  <td className="px-6 py-5 align-top max-w-[220px]">
                    <p className="font-medium text-[#2B2118]">{t.issue || "Issue description"}</p>
                    {t.technician_notes && (
                      <p className="text-xs text-[#8A8172] italic truncate mt-0.5">
                        Notes: {t.technician_notes}
                      </p>
                    )}
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
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
