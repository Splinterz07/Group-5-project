"use client";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: connect to /api/auth/login
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bookify icon.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-5">
        <span
          className="text-white text-2xl"
          style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
        >
          Bookify
        </span>
        <div className="hidden md:flex items-center gap-8 text-white text-sm font-medium">
          <Link href="/" className="hover:text-purple-300 transition-colors">Home</Link>
          <Link href="/events" className="hover:text-purple-300 transition-colors">Event/Booking</Link>
          <Link href="/blog" className="hover:text-purple-300 transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-purple-300 transition-colors">Contact</Link>
          <Link href="/profile" className="hover:text-purple-300 transition-colors">Profile</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/signup"
            className="px-5 py-2 rounded-full border border-purple-400 text-white text-sm hover:bg-purple-400/20 transition-all"
          >
            SIGN UP
          </Link>
          <Link
            href="/login"
            className="px-5 py-2 rounded-full bg-purple-600 text-white text-sm hover:bg-purple-700 transition-all"
          >
            LOG IN
          </Link>
        </div>
      </nav>

      {/* Login Card */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-10 shadow-2xl">
          <h1
            className="text-center text-white text-2xl mb-8 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 700 }}
          >
            LOGIN TO YOUR<br />BOOKIFY ACCOUNT
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
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

            {/* Password */}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg tracking-widest text-sm transition-all disabled:opacity-70 mt-2"
            >
              {loading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </form>

          <div className="text-center mt-5 space-y-1">
            <Link href="/forgot-password" className="block text-white text-sm underline hover:text-purple-200 transition-colors">
              Forgot password?
            </Link>
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
