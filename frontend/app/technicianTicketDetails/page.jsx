"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Cpu,
  Bell,
  Info,
  UserCog,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  LogOut,
  Sparkles,
  ArrowLeft,
  BrainCircuit,
  Lock,
  CheckCircle2,
  Save,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { requireTechnician } from "@/lib/protectedRoute";
import { logout } from "@/lib/auth";

/**
 * Technician Ticket Detail Content Component
 * Protected strictly by requireTechnician() guard (Technician role only).
 * Features editable Technician Notes & Status toggle when Open/In Progress.
 * Locks notes & database fields once status is set to Closed.
 */
function TechnicianTicketDetailContent() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("id") || searchParams.get("ticket_id");

  const [ticket, setTicket] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form Editing States
  const [notesInput, setNotesInput] = useState("");
  const [statusInput, setStatusInput] = useState("In Progress");
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [formError, setFormError] = useState(null);

  // 1. Client-Side Authentication Guard (TECHNICIAN check)
  useEffect(() => {
    const currentUser = requireTechnician();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // 2. Fetch Ticket Details from Existing Backend API Endpoint
  const fetchTicketDetails = useCallback(async () => {
    if (!ticketId) {
      setError("No Ticket ID provided in request URL.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

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
      setNotesInput(data.technician_notes || "");
      setStatusInput(data.status && data.status.toLowerCase() !== "open" ? data.status : "In Progress");

      // Fetch AI analysis / recommendation
      try {
        const aiRes = await apiFetch(`/analyze/${ticketId}`, { method: "POST" });
        if (aiRes.ok) {
          const aiData = await aiRes.json();
          if (aiData.analysis) {
            setAiAnalysis(aiData.analysis);
          }
        }
      } catch (aiErr) {
        console.log("AI Analysis fetch note:", aiErr);
      }
    } catch (err) {
      console.error("Technician Ticket Details Error:", err);
      setError(err.message || "Failed to load ticket details.");
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchTicketDetails();
  }, [fetchTicketDetails]);

  // 3. Handle Form Submission (Save Progress or Complete & Close Ticket)
  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!ticketId) return;

    try {
      setSaving(true);
      setSuccessMsg(null);
      setFormError(null);

      const res = await apiFetch(`/tickets/${ticketId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          technician_notes: notesInput,
          status: statusInput,
        }),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.error || "Failed to update ticket report");
      }

      if (resData.data) {
        setTicket(resData.data);
      }

      if (resData.analysis?.analysis) {
        setAiAnalysis(resData.analysis.analysis);
      }

      if (statusInput.toLowerCase() === "closed") {
        setSuccessMsg("Ticket successfully marked as Closed and locked in the database!");
      } else {
        setSuccessMsg("Technician notes updated successfully!");
      }

      // Re-sync latest ticket state
      fetchTicketDetails();
    } catch (err) {
      console.error("Form Submit Error:", err);
      setFormError(err.message || "Failed to submit technician report");
    } finally {
      setSaving(false);
    }
  };

  const isClosed = (ticket?.status || "").toLowerCase() === "closed";

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2B2118]">
      {/* Technician Top Navigation Bar */}
      <TechnicianTopNav user={user} />

      <main className="px-10 py-8 max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link
              href="/technicianTickets"
              className="flex items-center gap-1 text-xs font-semibold text-[#6B6357] hover:text-[#2B2118] transition bg-white border border-[#E9E2D4] px-3 py-1.5 rounded-md"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Assigned Tickets
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
            <h3 className="font-semibold text-lg">Unable to Load Ticket Details</h3>
            <p className="text-sm text-red-600 max-w-md mx-auto mt-1 mb-4">{error}</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={fetchTicketDetails}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-md transition"
              >
                Retry Request
              </button>
              <Link
                href="/technicianTickets"
                className="bg-white border border-red-300 text-red-700 text-xs font-semibold px-4 py-2 rounded-md transition"
              >
                Back to Assigned Tickets
              </Link>
            </div>
          </div>
        )}

        {/* Ticket Details Content */}
        {!loading && !error && ticket && (
          <div className="space-y-6">
            {/* Notification Banners */}
            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-xs font-semibold">{successMsg}</p>
                </div>
                <button
                  onClick={() => setSuccessMsg(null)}
                  className="text-xs font-bold text-emerald-800 hover:underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                  <p className="text-xs font-semibold">{formError}</p>
                </div>
                <button
                  onClick={() => setFormError(null)}
                  className="text-xs font-bold text-red-800 hover:underline"
                >
                  Dismiss
                </button>
              </div>
            )}

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
                        isClosed
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

            {/* Technician Report Card (Editable when Open/In Progress, Locked when Closed) */}
            <Card
              icon={UserCog}
              title="Technician Report & Maintenance Notes"
              actionBadge={
                isClosed ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold bg-[#EDE6D8] text-[#6B6357] px-2.5 py-1 rounded-full border border-[#E9E2D4]">
                    <Lock className="w-3 h-3 text-[#6B6357]" /> Locked in DB (Closed)
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-semibold bg-[#E3F3E5] text-[#2E7D32] px-2.5 py-1 rounded-full">
                    Editable (In Progress)
                  </span>
                )
              }
            >
              {isClosed ? (
                /* Read-Only Locked View */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-[#FBF3EA] rounded-lg p-4 border border-[#E9E2D4]">
                    <p className="text-xs font-semibold text-[#8A8172] mb-2 uppercase">
                      Submitted Technician Notes
                    </p>
                    <p className="text-sm italic text-[#4A3F33] leading-relaxed">
                      &ldquo;{ticket.technician_notes || "No technician notes recorded."}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-4 bg-white p-4 rounded-lg border border-[#E9E2D4]">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#6B6357]">Root Cause</span>
                      <span className="text-sm font-semibold text-[#2B2118]">
                        {ticket.root_cause || aiAnalysis?.root_cause || "Hardware wear"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#6B6357]">Repair Method</span>
                      <span className="text-sm font-semibold text-[#2B2118]">
                        {ticket.repair_method || aiAnalysis?.repair_method || "Component replacement"}
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
                        {ticket.preventive_action || aiAnalysis?.preventive_action || "Physical inspection"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Interactive Completion Form for Open / In Progress Tickets */
                <form onSubmit={handleSubmitReport} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#8A8172] uppercase mb-2">
                      Technician Notes (Describe physical fix, parts replaced, or diagnostic steps)
                    </label>
                    <textarea
                      rows={4}
                      value={notesInput}
                      onChange={(e) => setNotesInput(e.target.value)}
                      placeholder="Type details of physical maintenance, error codes cleared, or replacement parts..."
                      className="w-full rounded-lg border border-[#E9E2D4] bg-[#FBF7F1] p-3.5 text-sm text-[#2B2118] placeholder:text-[#A39B8C] outline-none focus:ring-2 focus:ring-[#3D2B1F]/20 focus:border-[#3D2B1F] transition"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-[#F0EAE0]">
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-semibold text-[#6B6357]">Update Ticket Status:</label>
                      <select
                        value={statusInput}
                        onChange={(e) => setStatusInput(e.target.value)}
                        className="border border-[#E9E2D4] bg-white px-3.5 py-2 rounded-md text-xs font-semibold text-[#2B2118] outline-none focus:ring-2 focus:ring-[#3D2B1F]/20 transition"
                      >
                        <option value="In Progress">In Progress (Save Progress)</option>
                        <option value="Closed">Closed (Finalize & Lock Ticket)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 bg-[#3D2B1F] hover:bg-[#2B1D14] text-white text-xs font-semibold px-5 py-2.5 rounded-md transition disabled:opacity-50 shadow-sm"
                    >
                      <Save className="w-4 h-4" />
                      {saving
                        ? "Saving to DB..."
                        : statusInput === "Closed"
                        ? "Complete & Close Ticket"
                        : "Save Notes Progress"}
                    </button>
                  </div>
                </form>
              )}
            </Card>

            {/* AI Recommendation Card (Provides Predictive Insights on Open state & AI analysis on Closed state) */}
            <Card icon={Sparkles} title="OpsMemory AI Recommendation">
              <div className="bg-[#3D2B1F] text-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-[#E9C99A]" />
                    <span className="text-xs font-semibold tracking-wider text-[#E9C99A] uppercase">
                      {isClosed ? "AI RESOLUTION INSIGHT" : "PREDICTIVE REPAIR RECOMMENDATION"}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold bg-[#E9C99A]/20 text-[#E9C99A] px-2 py-0.5 rounded">
                    {isClosed ? "Knowledge Base Updated" : "Matching Historic Patterns"}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#F7F5F0]">
                  {ticket.recommended_fix || aiAnalysis?.recommended_fix || (
                    isClosed
                      ? "AI Recommendation: Verify shutter alignment and clear physical debris to prevent recurring dispenser jams."
                      : "Predictive AI Suggestion: Based on similar past incidents on NCR SelfServ 84 machines, inspect the optical note sensor for paper dust accumulation and verify power feed stability."
                  )}
                </p>
              </div>
            </Card>
          </div>
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

function Card({ icon: Icon, title, actionBadge, children }) {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5 border-b border-[#F0EAE0] pb-3">
        <div className="flex items-center gap-2.5">
          <Icon className="w-4.5 h-4.5 text-[#3D2B1F]" />
          <h3 className="font-semibold text-base text-[#2B2118]">{title}</h3>
        </div>
        {actionBadge}
      </div>
      {children}
    </div>
  );
}

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

function calculateResolutionTime(ticket) {
  if (!ticket) return "--";

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

export default function TechnicianTicketDetailPage() {
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
      <TechnicianTicketDetailContent />
    </Suspense>
  );
}
