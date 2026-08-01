"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const router = useRouter();
const [error,setError]=useState("");
const [loading,setLoading]=useState(false);


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F7F3ED] px-4 py-10">
      <div className="w-full max-w-4xl bg-white border border-[#E4DFD3] rounded-3xl p-3 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          {/* LEFT IMAGE PANEL */}
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden relative min-h-[260px] md:min-h-[520px]">
            <img
              src="/data.jpg"
              alt="Welcome"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>

          {/* RIGHT FORM PANEL */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-10 md:px-10">
            <div className="w-full max-w-sm mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-[#2B2118] mb-1.5">
                  Welcome Back!
                </h2>
                <p className="text-sm text-[#6B6357]">
                  Enter your enterprise credentials to continue.
                </p>
              </div>

              <form
                className="space-y-5"
                onSubmit={async (e) => {

    e.preventDefault();

    try {

        setLoading(true);
        setError("");

        console.log("Sending login");

        const response = await fetch(
            "http://127.0.0.1:5000/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        console.log(response);


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.error || "Login failed"
            );

        }


      


        // Redirect based on role

        if(data.user.role === "admin"){

    router.push("/dashboard");

}
else if(data.user.role === "technician"){

    router.push("/technicianDashboard");

}
else{

    throw new Error("Invalid user role");

}


    }
    catch(err){

        setError(err.message);

    }
    finally{

        setLoading(false);

    }

}}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#2B2118] mb-1.5"
                  >
                    Email Address
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

                {
error && (
    <p className="text-red-500 text-sm text-center">
        {error}
    </p>
)
}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-[#3D2B1F] hover:bg-[#2B1D14] transition text-white text-sm font-medium py-2.5"
                >
                  {loading ? "Signing In..." : "Sign In"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-center gap-4 mt-8">
                <a
                  href="#"
                  className="text-xs text-[#C9C2B2] hover:text-[#8A8172]"
                >
                  PRIVACY POLICY
                </a>
                <a
                  href="#"
                  className="text-xs text-[#C9C2B2] hover:text-[#8A8172]"
                >
                  TERMS OF SERVICE
                </a>
                <a
                  href="#"
                  className="text-xs text-[#C9C2B2] hover:text-[#8A8172]"
                >
                  SUPPORT
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}