"use client";

import { useState } from "react";
import {
  Bell,
  Wrench,
  BrainCircuit,
  BookOpen,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* LEFT PANEL */}
      <div className="bg-[#F5F1EA] flex flex-col justify-between px-10 py-12 lg:px-16 lg:py-16">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-md bg-[#3D2B1F] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-white"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="3" />
                <path
                  d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            <span className="font-semibold text-sm text-[#2B2118]">
              OpsMemory AI
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-lg font-semibold text-[#2B2118] mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-[#6B6357] leading-relaxed max-w-xs mb-8">
            Sign in to access your AI-powered Operations Memory platform.
          </p>

          {/* Illustration card */}
          <div className="relative rounded-xl border border-[#E4DFD3] bg-[repeating-conic-gradient(#EFEBE1_0%_25%,#F7F4EC_0%_50%)] bg-[length:16px_16px] h-72 flex items-center justify-center overflow-hidden">
            <div className="flex items-center gap-3">
              <IconStep icon={<Bell className="w-5 h-5" />} label="ALERT" />
              <Arrow />
              <IconStep
                icon={<Wrench className="w-5 h-5" />}
                label={
                  <>
                    ENGINEER
                    <br />
                    REPAIR
                  </>
                }
              />
              <Arrow />
              <IconStep
                icon={<BrainCircuit className="w-5 h-5" />}
                label="AI REVIEW"
              />
              <Arrow />
              <IconStep
                icon={<BookOpen className="w-5 h-5" />}
                label={
                  <>
                    KNOWLEDGE
                    <br />
                    MEMORY
                  </>
                }
              />
              <Arrow />
              <IconStep
                icon={<CheckCircle2 className="w-5 h-5" />}
                label="RECOMMENDATION"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-16 mt-10">
          <div>
            <p className="text-xs tracking-wide text-[#8A8172] font-medium mb-1">
              PRECISION
            </p>
            <p className="text-sm font-semibold text-[#2B2118]">
              99.9% Contextual Accuracy
            </p>
          </div>
          <div>
            <p className="text-xs tracking-wide text-[#8A8172] font-medium mb-1">
              VELOCITY
            </p>
            <p className="text-sm font-semibold text-[#2B2118]">
              Real-time Engineering Loop
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h2 className="text-lg font-semibold text-[#2B2118] mb-1">
            Account Login
          </h2>
          <p className="text-sm text-[#6B6357] mb-8">
            Enter your enterprise credentials to continue.
          </p>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              // handle sign in
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#2B2118] mb-1.5"
              >
                Work Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-[#E4DFD3] bg-[#F7F5F0] px-3.5 py-2.5 text-sm text-[#2B2118] placeholder:text-[#A39B8C] outline-none focus:ring-2 focus:ring-[#3D2B1F]/20 focus:border-[#3D2B1F] transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#2B2118]"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-[#8A8172] hover:text-[#3D2B1F] transition"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-[#E4DFD3] bg-[#F7F5F0] px-3.5 py-2.5 text-sm text-[#2B2118] placeholder:text-[#A39B8C] outline-none focus:ring-2 focus:ring-[#3D2B1F]/20 focus:border-[#3D2B1F] transition"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-[#C9C2B2] text-[#3D2B1F] focus:ring-[#3D2B1F]/30"
              />
              <span className="text-sm text-[#6B6357]">
                Remember me for 30 days
              </span>
            </label>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-md bg-[#3D2B1F] hover:bg-[#2B1D14] transition text-white text-sm font-medium py-2.5"
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-[#E4DFD3]" />
            <span className="text-xs tracking-wide text-[#A39B8C]">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-[#E4DFD3]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-md border border-[#E4DFD3] py-2.5 text-sm font-medium text-[#2B2118] hover:bg-[#F7F5F0] transition">
              <MicrosoftIcon />
              Microsoft
            </button>
            <button className="flex items-center justify-center gap-2 rounded-md border border-[#E4DFD3] py-2.5 text-sm font-medium text-[#2B2118] hover:bg-[#F7F5F0] transition">
              <GoogleIcon />
              Google
            </button>
          </div>

          <div className="text-center mt-8">
            <p className="flex items-center justify-center gap-1.5 text-xs font-medium tracking-wide text-[#8A8172] mb-1">
              <Lock className="w-3.5 h-3.5" />
              SECURE ENTERPRISE LOGIN
            </p>
            <p className="text-xs text-[#A39B8C]">
              SSO automatically enforced for verified domains.
            </p>
            <p className="text-xs text-[#A39B8C]">
              Need an account?{" "}
              <a href="#" className="font-medium text-[#6B6357]">
                Contact your administrator.
              </a>
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <a href="#" className="text-xs text-[#C9C2B2] hover:text-[#8A8172]">
              PRIVACY POLICY
            </a>
            <a href="#" className="text-xs text-[#C9C2B2] hover:text-[#8A8172]">
              TERMS OF SERVICE
            </a>
            <a href="#" className="text-xs text-[#C9C2B2] hover:text-[#8A8172]">
              SUPPORT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconStep({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-1.5 w-16">
      <div className="text-[#3D2B1F]">{icon}</div>
      <span className="text-[8px] leading-tight tracking-wide text-[#8A8172] font-medium text-center">
        {label}
      </span>
    </div>
  );
}

function Arrow() {
  return <ArrowRight className="w-3.5 h-3.5 text-[#C9C2B2] shrink-0 -mt-3" />;
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 21 21" className="w-4 h-4">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 01-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0012 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 010-4.58V6.6H1.27a12 12 0 000 10.8l4-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 001.27 6.6l4 3.11C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}