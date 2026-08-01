"use client";

import { useState, useEffect, useCallback } from "react";
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
  RefreshCw,
  AlertTriangle,
  Inbox,
  LogOut,
  Filter as FilterIcon,
  Search,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { requireAdmin } from "@/lib/protectedRoute";
import { logout } from "@/lib/auth";

/**
 * Admin Ticket Management Page Component
 * 
 * Flow:
 * 1. Checks JWT token & verifies ADMIN role via requireAdmin() client-side guard.
 * 2. Fetches real ticket data from existing backend API endpoint (GET /tickets).
 * 3. Handles Loading, Error, Empty, and Filtered Data states.
 * 4. Maps database fields dynamically to UI components without modifying UI layout.
 */
export default function TicketManagementPage() {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchId, setSearchId] = useState("");
  const [searchEngineer, setSearchEngineer] = useState("");
  const [searchIssue, setSearchIssue] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // 1. Client-Side Authentication & Role Guard (ADMIN check)
  useEffect(() => {
    // requireAdmin checks JWT token cookie & role === "admin"
    // Redirects to /login if token is missing, invalid, or non-admin
    const currentUser = requireAdmin();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // 2. Fetch Real Ticket Data from Existing Backend Database API
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
      console.error("Ticket Management Data Fetch Error:", err);
      setError(err.message || "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  // Clear all filter inputs
  const handleClearFilters = () => {
    setSearchId("");
    setSearchEngineer("");
    setSearchIssue("");
    setStatusFilter("ALL");
  };

  // Dynamic Filtering Logic
  const filteredTickets = tickets.filter((t) => {
    const idMatch = searchId === "" || 
      String(t.ticket_id || "").toLowerCase().includes(searchId.toLowerCase()) ||
      String(t.atm_id || "").toLowerCase().includes(searchId.toLowerCase());

    const engineerMatch = searchEngineer === "" ||
      String(t.engineer_id || "").toLowerCase().includes(searchEngineer.toLowerCase());

    const issueMatch = searchIssue === "" ||
      String(t.issue || "").toLowerCase().includes(searchIssue.toLowerCase());

    const statusMatch = statusFilter === "ALL" ||
      (t.status || "").toLowerCase() === statusFilter.toLowerCase();

    return idMatch && engineerMatch && issueMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2B2118]">
      {/* Top Navigation Bar */}
      <TopNav user={user} />

      {/* Main Content Area */}
      <MainContent
        tickets={tickets}
        filteredTickets={filteredTickets}
        loading={loading}
        error={error}
        onRetry={loadTickets}
        searchId={searchId}
        setSearchId={setSearchId}
        searchEngineer={searchEngineer}
        setSearchEngineer={setSearchEngineer}
        searchIssue={searchIssue}
        setSearchIssue={setSearchIssue}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onClearFilters={handleClearFilters}
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
            href="/dashboard"
            className="text-[#6B6357] hover:text-[#2B2118] transition"
          >
            Dashboard
          </Link>
          <Link
            href="/tickets"
            className="text-[#2B2118] font-medium border-b-2 border-[#2B2118] pb-5 -mb-5"
          >
            Tickets
          </Link>
          <Link
            href="/analytics"
            className="text-[#6B6357] hover:text-[#2B2118] transition"
          >
            Analytics
          </Link>
          <Link
            href="/security"
            className="text-[#6B6357] hover:text-[#2B2118] transition"
          >
            Security
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Admin Role Badge */}
        <span className="text-xs font-semibold bg-[#3D2B1F] text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
          ADMIN
        </span>

        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EAE0] transition" title="Notifications">
          <Bell className="w-4.5 h-4.5" />
        </button>

        {/* User Info Avatar & Logout Button */}
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

function MainContent({
  tickets,
  filteredTickets,
  loading,
  error,
  onRetry,
  searchId,
  setSearchId,
  searchEngineer,
  setSearchEngineer,
  searchIssue,
  setSearchIssue,
  statusFilter,
  setStatusFilter,
  onClearFilters,
}) {
  return (
    <main className="px-10 py-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Ticket Management</h1>
          <p className="text-sm text-[#8A8172]">
            Monitor, filter, and resolve operational requests across all units in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRetry}
            disabled={loading}
            className="flex items-center gap-2 border border-[#E9E2D4] bg-white px-3.5 py-2 rounded-md text-sm font-medium hover:bg-[#F0EAE0] transition disabled:opacity-50"
            title="Refresh Tickets"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* API Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Failed to Load Tickets Data</p>
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

      {/* Filter Component */}
      <Filters
        searchId={searchId}
        setSearchId={setSearchId}
        searchEngineer={searchEngineer}
        setSearchEngineer={setSearchEngineer}
        searchIssue={searchIssue}
        setSearchIssue={setSearchIssue}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onClearFilters={onClearFilters}
      />

      {/* Loading State */}
      {loading ? (
        <div className="py-16 text-center bg-white border border-[#E9E2D4] rounded-xl p-10">
          <RefreshCw className="w-8 h-8 text-[#3D2B1F] animate-spin mx-auto mb-4" />
          <p className="text-base font-semibold text-[#2B2118]">Loading database tickets...</p>
          <p className="text-xs text-[#8A8172] mt-1">Fetching real-time records from backend API</p>
        </div>
      ) : (
        /* Tickets Table Component */
        <TicketsTable
          tickets={filteredTickets}
          totalCount={tickets.length}
        />
      )}
    </main>
  );
}

/* ---------------- FILTERS ---------------- */

function Filters({
  searchId,
  setSearchId,
  searchEngineer,
  setSearchEngineer,
  searchIssue,
  setSearchIssue,
  statusFilter,
  setStatusFilter,
  onClearFilters,
}) {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div>
          <label className="block text-[10px] tracking-wide font-semibold text-[#8A8172] mb-2 uppercase">
            TICKET / ATM ID
          </label>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Search ID..."
            className="w-full rounded-md border border-[#E9E2D4] bg-[#FBF7F1] px-3.5 py-2.5 text-sm text-[#2B2118] placeholder:text-[#A39B8C] outline-none focus:ring-2 focus:ring-[#3D2B1F]/20 focus:border-[#3D2B1F] transition"
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-wide font-semibold text-[#8A8172] mb-2 uppercase">
            ENGINEER ID
          </label>
          <input
            type="text"
            value={searchEngineer}
            onChange={(e) => setSearchEngineer(e.target.value)}
            placeholder="Engineer ID..."
            className="w-full rounded-md border border-[#E9E2D4] bg-[#FBF7F1] px-3.5 py-2.5 text-sm text-[#2B2118] placeholder:text-[#A39B8C] outline-none focus:ring-2 focus:ring-[#3D2B1F]/20 focus:border-[#3D2B1F] transition"
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-wide font-semibold text-[#8A8172] mb-2 uppercase">
            ISSUE DESCRIPTION
          </label>
          <input
            type="text"
            value={searchIssue}
            onChange={(e) => setSearchIssue(e.target.value)}
            placeholder="Search issue details..."
            className="w-full rounded-md border border-[#E9E2D4] bg-[#FBF7F1] px-3.5 py-2.5 text-sm text-[#2B2118] placeholder:text-[#A39B8C] outline-none focus:ring-2 focus:ring-[#3D2B1F]/20 focus:border-[#3D2B1F] transition"
          />
        </div>
      </div>

      <div className="border-t border-[#F0EAE0] pt-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-[#6B6357]">Filter Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[#E9E2D4] bg-white px-3.5 py-2 rounded-md text-xs font-medium text-[#2B2118] outline-none focus:ring-2 focus:ring-[#3D2B1F]/20 transition"
          >
            <option value="ALL">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <button
          onClick={onClearFilters}
          className="text-xs font-medium text-[#6B6357] hover:text-[#2B2118] transition"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
}

/* ---------------- TICKETS TABLE (Dynamic Database Mapping) ---------------- */

const statusStyleMap = {
  closed: "bg-[#EDE6D8] text-[#6B6357]",
  resolved: "bg-[#3D2B1F] text-white",
  "in progress": "bg-[#F3A93C] text-[#3D2B1F]",
  open: "bg-[#E3F3E5] text-[#2E7D32]",
  pending: "bg-[#FBEAD4] text-[#B8860B]",
};

function TicketsTable({ tickets, totalCount }) {
  // Handle empty database or empty search results
  if (tickets.length === 0) {
    return (
      <div className="bg-white border border-[#E9E2D4] rounded-xl p-12 text-center mb-6">
        <Inbox className="w-10 h-10 text-[#A39B8C] mx-auto mb-3" />
        <h3 className="font-semibold text-lg text-[#2B2118]">No Tickets Found</h3>
        <p className="text-sm text-[#8A8172] max-w-md mx-auto mt-1">
          {totalCount === 0
            ? "There are currently no ticket records stored in the database."
            : "No ticket records match your selected filter criteria."}
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
              <th className="px-6 py-4">ATM ID / LOCATION</th>
              <th className="px-6 py-4">ISSUE</th>
              <th className="px-6 py-4">ENGINEER ID</th>
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

              const formattedDate = t.created_at
                ? new Date(t.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Jan 24, 2024";

              const displayAtmId = t.atm_id || (t.ticket_id ? `ATM-SYS-${t.ticket_id}` : "ATM-NYC-402");
              const displayEngineer = t.engineer_id || "Unassigned";

              return (
                <tr key={t.ticket_id} className="border-b border-[#F0EAE0] last:border-0 hover:bg-[#FBF7F1]/50 transition">
                  <td className="px-6 py-5 font-semibold align-top text-[#2B2118]">
                    #{t.ticket_id}
                  </td>
                  <td className="px-6 py-5 text-[#6B6357] align-top font-medium">
                    {displayAtmId}
                  </td>
                  <td className="px-6 py-5 align-top max-w-[220px]">
                    <p className="font-medium text-[#2B2118]">{t.issue || "Operational issue"}</p>
                    {t.technician_notes && (
                      <p className="text-xs text-[#8A8172] italic truncate mt-1" title={t.technician_notes}>
                        Notes: {t.technician_notes}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-5 align-top text-[#2B2118]">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#EDE6D8] text-[#3D2B1F] text-[10px] font-bold flex items-center justify-center">
                        {String(displayEngineer).slice(0, 2).toUpperCase()}
                      </span>
                      <span className="font-medium">{displayEngineer}</span>
                    </div>
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
                      href={`/ticketDetails?id=${t.ticket_id}`}
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

      <div className="flex items-center justify-between px-6 py-4 border-t border-[#E9E2D4]">
        <p className="text-sm text-[#8A8172]">
          Showing {tickets.length} of {totalCount} tickets
        </p>
        <Pagination count={tickets.length} />
      </div>
    </div>
  );
}

function Pagination({ count }) {
  return (
    <div className="flex items-center gap-1.5">
      <button className="w-8 h-8 flex items-center justify-center rounded-md border border-[#E9E2D4] hover:bg-[#F7F3ED] transition text-[#8A8172]">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium border border-[#2B2118] bg-white text-[#2B2118]">
        1
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-md border border-[#E9E2D4] hover:bg-[#F7F3ED] transition text-[#8A8172]">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
