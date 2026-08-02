"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Cpu,
  Bell,
  Info,
  UserCog,
  History,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  LogOut,
  Sparkles,
  ArrowLeft,
  Clock,
  CheckCircle2,
  Wrench,
  ShieldCheck,
  BrainCircuit,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { requireAdmin } from "@/lib/protectedRoute";
import { logout } from "@/lib/auth";

/**
 * Admin Ticket Detail Content Component
 * Wrapped inside Suspense boundary for Next.js App Router query parameter reading.
 */
function TicketDetailContent() {
  const searchParams = useSearchParams();

  // Read ticket_id from URL query parameter (e.g. /ticketDetails?id=T0059 or /ticketDetails?id=1)
  const ticketId = searchParams.get("id") || searchParams.get("ticket_id");

  const [ticket, setTicket] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Client-Side Authentication Guard (ADMIN role check)
  useEffect(() => {
    const currentUser = requireAdmin();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const backLink = "/tickets";

  // 2. Fetch Ticket Details from Existing Backend API Endpoint (GET /tickets/:ticket_id)
  const fetchTicketDetails = useCallback(async () => {
    if (!ticketId) {
      setError("No Ticket ID provided in request URL.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Existing API Route: GET /tickets/:ticket_id (protected by verifyToken)
      const res = await apiFetch(`/tickets/${ticketId}`);

      if (res.status === 404) {
        throw new Error(`Ticket #${ticketId} was not found in the database.`);
      }

      if (res.status === 401 || res.status === 403) {
        throw new Error("Unauthorized access. Please log in again.");
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch ticket #${ticketId} (Status ${res.status})`);
      }

      const data = await res.json();
      setTicket(data);

      // Optionally fetch AI analysis if endpoint exists
      try {
        const aiRes = await apiFetch(`/analyze/${ticketId}`, { method: "POST" });
        if (aiRes.ok) {
          const aiData = await aiRes.json();
          if (aiData.analysis) {
            setAiAnalysis(aiData.analysis);
          }
        }
      } catch (aiErr) {
        // AI analysis is optional, proceed gracefully if unavailable
        console.log("AI Analysis optional fetch:", aiErr);
      }
    } catch (err) {
      console.error("Ticket Details Fetch Error:", err);
      setError(err.message || "Failed to load ticket details.");
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchTicketDetails();
  }, [fetchTicketDetails]);

  // Calculate resolution time duration
  const resolutionTime = calculateResolutionTime(ticket?.created_at, ticket?.updated_at, ticket?.status);

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2B2118]">
      {/* Top Navigation Bar */}
      <TopNav user={user} />

      <main className="px-10 py-8 max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link
              href={backLink}
              className="flex items-center gap-1 text-xs font-semibold text-[#6B6357] hover:text-[#2B2118] transition bg-white border border-[#E9E2D4] px-3 py-1.5 rounded-md"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#A39B8C]" />
            <span className="text-xs font-semibold bg-[#EDE6D8] text-[#3D2B1F] px-3 py-1 rounded-full uppercase">
              Ticket #{ticketId || "--"}
            </span>
          </div>

          <button
            onClick={fetchTicketDetails}
            disabled={loading}
            className="flex items-center gap-2 border border-[#E9E2D4] bg-white px-3.5 py-1.5 rounded-md text-xs font-medium hover:bg-[#F0EAE0] transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh Data
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-16 text-center bg-white border border-[#E9E2D4] rounded-xl p-10">
            <RefreshCw className="w-8 h-8 text-[#3D2B1F] animate-spin mx-auto mb-4" />
            <p className="text-base font-semibold text-[#2B2118]">Loading ticket details...</p>
            <p className="text-xs text-[#8A8172] mt-1">Fetching record for Ticket #{ticketId}</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 text-center my-6">
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Unable to Load Ticket</h3>
            <p className="text-sm text-red-600 max-w-md mx-auto mt-1 mb-4">{error}</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={fetchTicketDetails}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-md transition"
              >
                Retry Request
              </button>
              <Link
                href="/tickets"
                className="bg-white border border-red-300 text-red-700 text-xs font-semibold px-4 py-2 rounded-md transition"
              >
                Return to Tickets List
              </Link>
            </div>
          </div>
        )}

        {/* Ticket Details View */}
        {!loading && !error && ticket && (
          <div className="space-y-6">
            {/* Ticket Information Card */}
            <Card icon={Info} title="Ticket Information">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                <Field label="TICKET ID" value={`#${ticket.ticket_id}`} />
                <Field
                  label="ATM ID"
                  value={ticket.atm_id || `ATM-SYS-${ticket.ticket_id}`}
                />
                <Field
                  label="LOCATION"
                  value={ticket.location || "Central Hub Site"}
                />
                <Field
                  label="ASSET MODEL"
                  value={ticket.asset_model || "NCR SelfServ 84"}
                />
                <Field
                  label="ENGINEER"
                  value={
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#F3A93C] text-[#3D2B1F] text-[10px] font-bold flex items-center justify-center">
                        {String(ticket.engineer_id || "UN").slice(0, 2).toUpperCase()}
                      </span>
                      {ticket.engineer_id || "Unassigned"}
                    </span>
                  }
                />
                <Field
                  label="STATUS"
                  value={
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase ${
                        (ticket.status || "").toLowerCase() === "closed"
                          ? "bg-[#EDE6D8] text-[#6B6357]"
                          : "bg-[#F3A93C] text-[#3D2B1F]"
                      }`}
                    >
                      {ticket.status || "Open"}
                    </span>
                  }
                />
                <Field
                  label="CREATED DATE"
                  value={
                    (ticket.created_date || ticket.created_at)
                      ? new Date(ticket.created_date || ticket.created_at).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "--"
                  }
                />
                <Field label="RESOLUTION TIME" value={calculateResolutionTime(ticket)} />
              </div>

              {/* Issue Description */}
              <div className="mt-6 pt-5 border-t border-[#F0EAE0]">
                <p className="text-[10px] tracking-wide font-semibold text-[#8A8172] mb-1.5 uppercase">
                  ISSUE DESCRIPTION
                </p>
                <p className="text-sm font-medium text-[#2B2118] bg-[#FBF7F1] p-3.5 rounded-lg border border-[#E9E2D4]">
                  {ticket.issue || "No issue description provided."}
                </p>
              </div>
            </Card>

            {/* Technician Report Card */}
            <Card icon={UserCog} title="Technician Report">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[#FBF3EA] rounded-lg p-4 border border-[#E9E2D4]">
                  <p className="text-xs font-semibold text-[#8A8172] mb-2 uppercase">
                    Technician Notes
                  </p>
                  <p className="text-sm italic text-[#4A3F33] leading-relaxed">
                    &ldquo;{ticket.technician_notes || "No technician notes recorded for this ticket yet."}&rdquo;
                  </p>
                </div>

                <div className="space-y-4 bg-white p-4 rounded-lg border border-[#E9E2D4]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B6357]">Root Cause</span>
                    <span className="text-sm font-semibold text-[#2B2118]">
                      {ticket.root_cause || aiAnalysis?.root_cause || "Pending Investigation"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B6357]">Repair Method</span>
                    <span className="text-sm font-semibold text-[#2B2118]">
                      {ticket.repair_method || aiAnalysis?.repair_method || "Pending Reset"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B6357]">Repair Type</span>
                    <span className="text-xs font-semibold bg-[#F3A93C] text-[#3D2B1F] px-2.5 py-1 rounded">
                      {ticket.repair_type || aiAnalysis?.repair_type || "HARDWARE MAINTENANCE"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B6357]">Preventive Action</span>
                    <span className="text-sm font-semibold text-[#2B2118]">
                      {ticket.preventive_action || aiAnalysis?.preventive_action || "Physical clearance & inspection"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* AI Recommendation & Intelligence Card */}
            <Card icon={Sparkles} title="OpsMemory AI Recommendation">
              <div className="bg-[#3D2B1F] text-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <BrainCircuit className="w-4 h-4 text-[#E9C99A]" />
                  <span className="text-xs font-semibold tracking-wider text-[#E9C99A] uppercase">
                    AI RESOLUTION INSIGHT
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#F7F5F0]">
                  {ticket.recommended_fix || aiAnalysis?.recommended_fix || "AI Recommendation: Verify shutter alignment and clear physical debris to prevent recurring dispenser jams."}
                </p>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

/**
 * Top Navigation Component
 */
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
            className="text-[#6B6357] hover:text-[#2B2118] transition"
          >
            Tickets
          </Link>
          <Link
            href="/analytics"
            className="text-[#6B6357] hover:text-[#2B2118] transition"
          >
            Analytics
          </Link>
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

        {/* User Info & Logout */}
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

/**
 * Shared Card Wrapper
 */
function Card({ icon: Icon, title, children }) {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2.5 mb-5 border-b border-[#F0EAE0] pb-3">
        <Icon className="w-4.5 h-4.5 text-[#3D2B1F]" />
        <h3 className="font-semibold text-base text-[#2B2118]">{title}</h3>
      </div>
      {children}
    </div>
  );
}

/**
 * Shared Information Field Component
 */
function Field({ label, value }) {
  return (
    <div>
      <p className="text-[10px] tracking-wide font-semibold text-[#8A8172] mb-1.5 uppercase">
        {label}
      </p>
      <div className="text-sm font-medium text-[#2B2118]">{value}</div>
    </div>
  );
}

/**
 * Helper to compute ticket resolution duration
 */
function calculateResolutionTime(ticket) {
  if (!ticket) return "--";

  // 1. Direct resolution_time integer column from database schema (e.g. 15 for 15 mins)
  if (ticket.resolution_time != null && !isNaN(Number(ticket.resolution_time))) {
    const mins = Number(ticket.resolution_time);
    if (mins >= 60) {
      return `${(mins / 60).toFixed(1)} hrs`;
    }
    return `${mins} mins`;
  }

  if ((ticket.status || "").toLowerCase() !== "closed") {
    return "In Progress";
  }

  const rawCreated = ticket.created_date || ticket.created_at;
  const rawUpdated = ticket.updated_at || ticket.closed_at;

  if (rawCreated && rawUpdated) {
    const start = new Date(rawCreated).getTime();
    const end = new Date(rawUpdated).getTime();
    const diffMs = end - start;

    if (!isNaN(diffMs) && diffMs > 0) {
      const minutes = Math.round(diffMs / (1000 * 60));
      if (minutes >= 60) {
        const hours = (minutes / 60).toFixed(1);
        return `${hours} hrs`;
      }
      return `${minutes} mins`;
    }
  }

  return "--";
}

/**
 * Export default TicketDetailPage with Suspense boundary for Next.js App Router query params
 */
export default function TicketDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F3ED] flex items-center justify-center text-[#2B2118]">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 text-[#3D2B1F] animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold">Loading Ticket Details...</p>
          </div>
        </div>
      }
    >
      <TicketDetailContent />
    </Suspense>
  );
}