"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Cpu,
  Bell,
  LogOut,
  Search,
  Plus,
  CheckCircle2,
  Lock,
  Brain,
  FileSearch,
  Database,
  Share2,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  Terminal,
  Server,
  Cog,
  ShieldCheck,
  Layers,
  Workflow,
  Send,
  Trash2,
  RefreshCw,
  MessageSquare,
  Bot,
  User,
  BrainCircuit,
  Zap,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { requireAdmin } from "@/lib/protectedRoute";
import { logout } from "@/lib/auth";

/**
 * Admin AI Engine Portal & Conversational Intelligence Assistant
 * 
 * Features:
 * 1. Standard Admin TopNav (Dashboard | Tickets | Analytics | AI Engine).
 * 2. Persistent JSONB chat session stored in Supabase admin_chat_sessions.
 * 3. Fast Redis caching & telemetry-driven AI Assistant responses.
 * 4. Enterprise Pipeline, Tech Stack Grid, & System Architecture Diagram.
 */
export default function AIEnginePage() {
  const [user, setUser] = useState(null);

  // 1. Client-Side Authentication Guard (ADMIN check)
  useEffect(() => {
    const currentUser = requireAdmin();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2B2118]">
      {/* Admin Top Navigation Bar */}
      <AdminTopNav user={user} />

      {/* Main Content Area */}
      <main className="px-10 py-8 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">AI Engine</h1>
            <p className="text-sm text-[#8A8172]">
              Conversational intelligence assistant, ticket processing telemetry, and knowledge extraction.
            </p>
          </div>
        </div>

        {/* Interactive Chatbot Assistant Panel */}
        <AiChatbotPanel />

        {/* Data Processing Pipeline */}
        <DataProcessingPipeline />

        {/* Tech Stack Grid */}
        <TechStackGrid />

        {/* System Architecture */}
        <SystemArchitecture />
      </main>
    </div>
  );
}

/* ---------------- ADMIN TOP NAV ---------------- */

function AdminTopNav({ user }) {
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
          <Link
            href="/aiEngine"
            className="text-[#2B2118] font-medium border-b-2 border-[#2B2118] pb-5 -mb-5"
          >
            AI Engine
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

/* ---------------- INTERACTIVE AI CHATBOT PANEL ---------------- */

function AiChatbotPanel() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(true);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Fetch chat history from Supabase JSONB session
  const loadChatHistory = useCallback(async () => {
    try {
      setFetchingHistory(true);
      const res = await apiFetch("/chat-history");
      if (res.ok) {
        const data = await res.json();
        setMessages(Array.isArray(data.messages) ? data.messages : []);
      }
    } catch (err) {
      console.error("Error fetching chat history:", err);
    } finally {
      setFetchingHistory(false);
    }
  }, []);

  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

  // Send message handler
  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    const userTempMsg = {
      id: Date.now().toString(),
      role: "user",
      content: query.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userTempMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const res = await apiFetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reach AI Engine assistant.");
      }

      if (Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I am unable to connect to the AI Engine database right now. Please try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Clear chat history
  const handleClearHistory = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/chat-history", { method: "DELETE" });
      if (res.ok) {
        setMessages([]);
      }
    } catch (err) {
      console.error("Error clearing chat history:", err);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "Show system-wide ticket summary",
    "How many open tickets are assigned to Rohan Nair (#24)?",
    "What is our average resolution time?",
    "Show closed tickets in database",
  ];

  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl overflow-hidden shadow-sm">
      {/* Panel Header */}
      <div className="bg-[#FBF7F1] border-b border-[#E9E2D4] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#3D2B1F] flex items-center justify-center text-white">
            <BrainCircuit className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#2B2118] flex items-center gap-2">
              OpsMemory Intelligence Assistant
              <span className="text-[10px] font-semibold bg-[#E3F3E5] text-[#2E7D32] px-2 py-0.5 rounded-full uppercase tracking-wider">
                JSONB Persistent Session
              </span>
            </h2>
            <p className="text-xs text-[#8A8172]">Ask questions about tickets, technicians, root causes, or system performance.</p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClearHistory}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#C0392B] hover:bg-[#FBE3E1] px-3 py-1.5 rounded-md transition disabled:opacity-50"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear History
          </button>
        )}
      </div>

      {/* Message Stream */}
      <div className="p-6 h-[340px] overflow-y-auto space-y-4 bg-[#F7F3ED]/30">
        {fetchingHistory ? (
          <div className="h-full flex items-center justify-center text-[#8A8172] text-xs">
            <RefreshCw className="w-5 h-5 animate-spin mr-2 text-[#3D2B1F]" /> Loading conversation history...
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <Bot className="w-10 h-10 text-[#A39B8C] mb-3" />
            <p className="text-sm font-semibold text-[#2B2118]">Welcome to OpsMemory AI Assistant</p>
            <p className="text-xs text-[#8A8172] max-w-md mt-1 mb-4">
              I can query live telemetry, inspect ticket distributions, check engineer workloads, and analyze historical resolution patterns.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl w-full">
              {samplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-left text-xs bg-white border border-[#E9E2D4] p-3 rounded-lg hover:border-[#3D2B1F] hover:bg-[#FBF7F1] transition text-[#2B2118] font-medium"
                >
                  &ldquo;{prompt}&rdquo;
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id || m.timestamp}
                className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isUser ? "bg-[#3D2B1F] text-white" : "bg-[#F3A93C] text-[#3D2B1F]"
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                      ? "bg-[#3D2B1F] text-white rounded-tr-none"
                      : "bg-white border border-[#E9E2D4] text-[#2B2118] shadow-sm rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            );
          })
        )}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F3A93C] text-[#3D2B1F] flex items-center justify-center text-xs font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-[#E9E2D4] px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs text-[#8A8172]">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#3D2B1F]" />
              Querying database telemetry & AI model...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-[#E9E2D4]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask the AI Assistant about tickets, technicians, or root causes..."
            className="flex-1 bg-[#FBF7F1] border border-[#E9E2D4] rounded-lg px-4 py-2.5 text-sm text-[#2B2118] placeholder:text-[#A39B8C] outline-none focus:ring-2 focus:ring-[#3D2B1F]/20 focus:border-[#3D2B1F] transition"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="bg-[#3D2B1F] hover:bg-[#2B1D14] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------- DATA PROCESSING PIPELINE ---------------- */

function DataProcessingPipeline() {
  const steps = [
    { icon: CheckCircle2, label: "Ticket Closed", tag: "TRIGGER" },
    { icon: Lock, label: "AES-256", tag: "SECURITY" },
    { icon: Brain, label: "Llama 3.1", tag: "PROCESSING", active: true },
    { icon: FileSearch, label: "Knowledge", tag: "EXTRACTION" },
    { icon: Database, label: "PostgreSQL", tag: "PERSISTENCE" },
    { icon: Share2, label: "Ops Memory", tag: "GRAPH" },
    { icon: Sparkles, label: "Engine", tag: "INFERENCE" },
  ];

  return (
    <div className="bg-[#FBF3EA] border border-[#F0DDBF] rounded-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold">Data Processing Pipeline</h2>
        <span className="flex items-center gap-2 text-sm font-medium text-[#2E7D32]">
          <span className="w-2 h-2 rounded-full bg-[#2E7D32] inline-block animate-pulse" />
          System Operational
        </span>
      </div>

      <div className="flex items-center overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="flex flex-col items-center w-24 shrink-0">
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 ${
                  s.active
                    ? "bg-[#3D2B1F] text-white shadow-sm"
                    : "bg-white text-[#3D2B1F] border border-[#E9E2D4]"
                }`}
              >
                <s.icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-center">{s.label}</p>
              <p className="text-[10px] tracking-wide text-[#8A8172] font-medium uppercase">
                {s.tag}
              </p>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-[#C9BFA9] mx-3 mb-8 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <InfoCard
          icon={MapPin}
          title="Data Locality"
          body="All processing occurs on-premise or within isolated VPC boundaries. No data ever leaves your encrypted storage except for high-level metadata reporting."
        />
        <InfoCard
          icon={Clock}
          title="Average Latency"
          body="The end-to-end extraction and memory linkage process averages 1.4s per ticket using optimized quantized Llama 3.1 weights on H100 infrastructure."
        />
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, body }) {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-lg p-5">
      <p className="flex items-center gap-2 text-sm font-semibold mb-2.5">
        <Icon className="w-4 h-4 text-[#3D2B1F]" />
        {title}
      </p>
      <p className="text-sm text-[#6B6357] leading-relaxed">{body}</p>
    </div>
  );
}

/* ---------------- TECH STACK GRID ---------------- */

function TechStackGrid() {
  const items = [
    {
      tag: "FRONTEND",
      icon: Terminal,
      name: "Next.js",
      body: "React-based dashboard providing real-time observability into the AI decision graph and operations history.",
    },
    {
      tag: "BACKEND",
      icon: Server,
      name: "Node.js",
      body: "Event-driven orchestration layer managing ticket ingestion, worker queues, and inference API calls.",
    },
    {
      tag: "DATABASE",
      icon: Database,
      name: "PostgreSQL",
      body: "Primary system of record for normalized ticket data and relational organizational hierarchies.",
    },
    {
      tag: "INFERENCE",
      icon: Cog,
      name: "Llama 3.1",
      body: "Advanced LLM running locally via Ollama, fine-tuned for enterprise operational context and reasoning.",
    },
    {
      tag: "CACHE",
      icon: Zap,
      name: "Redis",
      body: "High-performance key-value store for session management, rate limiting, and frequent inference caching.",
    },
    {
      tag: "SECURITY",
      icon: ShieldCheck,
      name: "AES-256",
      body: "Military-grade encryption for all data at rest and in-transit across the entire processing lifecycle.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {items.map((item) => (
        <div
          key={item.name}
          className="bg-white border border-[#E9E2D4] rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <span className="text-[10px] tracking-wide font-semibold text-[#8A8172] bg-[#F0EAE0] px-2.5 py-1 rounded uppercase">
              {item.tag}
            </span>
            <item.icon className="w-4 h-4 text-[#8A8172]" />
          </div>
          <h3 className="text-xl font-bold mb-2">{item.name}</h3>
          <p className="text-sm text-[#6B6357] leading-relaxed">
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- SYSTEM ARCHITECTURE ---------------- */

function SystemArchitecture() {
  return (
    <div className="bg-white border border-[#E9E2D4] rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl font-bold mb-4">System Architecture</h2>
          <p className="text-[#6B6357] leading-relaxed mb-6">
            OpsMemory AI is architected as a modular, containerized ecosystem
            designed for 99.99% reliability. Our multi-agent architecture
            ensures that specialized sub-processes handle distinct parts of
            the operational memory graph.
          </p>

          <div className="space-y-5">
            <ArchPoint
              icon={Layers}
              title="Hierarchical Ingestion"
              body="Intelligently maps tickets to products, teams, and severity levels based on historical patterns."
            />
            <ArchPoint
              icon={Workflow}
              title="Semantic Memory Core"
              body="Builds a permanent knowledge graph of engineering solutions, reducing repeat incident resolution time."
            />
          </div>
        </div>

        <ArchitectureDiagram />
      </div>
    </div>
  );
}

function ArchPoint({ icon: Icon, title, body }) {
  return (
    <div className="flex gap-3">
      <Icon className="w-5 h-5 text-[#3D2B1F] shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold mb-1">{title}</p>
        <p className="text-sm text-[#6B6357] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function ArchitectureDiagram() {
  const nodes = [
    { icon: Server, label: "Deployment" },
    { icon: Cog, label: "AI Engine" },
    { icon: Share2, label: "Memory Graph" },
    { icon: ShieldCheck, label: "Security" },
  ];

  return (
    <div className="bg-[#FBF3EA] border border-[#F0DDBF] rounded-xl p-6">
      <p className="text-sm font-semibold mb-5">
        OpsMemory AI: Enterprise AI Engine Architecture
      </p>

      <div className="grid grid-cols-2 gap-4 mb-5">
        {nodes.map((n) => (
          <div
            key={n.label}
            className="bg-white rounded-xl p-6 flex flex-col items-center justify-center gap-2 shadow-sm"
          >
            <n.icon className="w-6 h-6 text-[#3D2B1F]" />
            <span className="text-[10px] font-medium text-[#8A8172] text-center">
              {n.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[10px] text-[#8A8172] font-medium px-1">
        <span>Data Lake (S3)</span>
        <span>Data Ingestion &amp; Storage</span>
        <span>SQL/NoSQL Databases</span>
      </div>
    </div>
  );
}