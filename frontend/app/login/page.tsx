"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../lib/api";
import DarkNavbar from "@/app/_components/DarkNavbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      router.push("/home");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bookify icon.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10">
        <DarkNavbar />
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-10 shadow-2xl">
          <h1
            className="text-center text-white text-2xl mb-8 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 700 }}
          >
            LOGIN TO YOUR<br />BOOKIFY ACCOUNT
          </h1>

          {error && (
            <div className="mb-4 px-4 py-2 bg-red-500/30 border border-red-400 rounded-lg text-white text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3">
              <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent flex-1 text-gray-700 text-sm outline-none placeholder-gray-500"
              />
            </div>

            <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3">
              <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-transparent flex-1 text-gray-700 text-sm outline-none placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg tracking-widest text-sm transition-all disabled:opacity-70 mt-2"
            >
              {loading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </form>

          <div className="text-center mt-5 space-y-1">
            <p className="text-white text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-bold underline hover:text-purple-200 transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}