"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "Code Sports 2026",
    description:
      "Get what it takes! Discover your path to becoming one of the next luminaries of the tech industry.",
    date: "25TH APRIL",
    location: "SST FOYER",
    image: "/profile image2.jpg",
  },
  {
    id: 2,
    title: "Fatherland The Musical",
    description:
      "Experience the magic in tale of the people of Nikatia.",
    date: "5TH MAY 2026",
    location: "ABUJA CLASSROOM, TYO",
    image: "/profile image1.jpg",
  },
  {
    id: 3,
    title: "Squad Hackathon 3.0",
    description:
      "Stand a chance to win ₦10,000,000 at Hackathon 3.0 by Squad.",
    date: "30TH MAY 2026",
    location: "THE LANDMARK CENTER, IK",
    image: "/home image.jpg",
  },
];

export default function HomePage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">

      {/* ── NAVBAR ── */}
      <nav className="flex items-center justify-between px-8 py-4 bg-gray-950 border-b border-gray-800">
        <span className="text-lg font-bold italic" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Bookify
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/events" className="hover:text-white transition-colors">Event/Booking</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/profile" className="hover:text-white transition-colors">Profile</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/signup"
            className="px-4 py-1.5 border border-purple-500 text-white text-sm rounded hover:bg-purple-500/20 transition-all"
          >
            SIGN UP
          </Link>
          <Link
            href="/login"
            className="px-4 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-all"
          >
            LOG IN
          </Link>
        </div>
      </nav>

      {/* ── NIGERIA HERO BANNER ── */}
      <section className="px-8 py-4 bg-gray-900">
        <p className="text-sm text-gray-400">Nigeria</p>
        {/* Placeholder image strip */}
        <div className="mt-3 grid grid-cols-4 gap-2 h-32">
          {["/image 1.jpg", "/image 2.jpg", "/image 3.jpg", "/image 4.jpg"].map((src, i) => (
            <div key={i} className="relative rounded overflow-hidden bg-gray-800">
              <Image src={src} alt={`banner-${i}`} fill className="object-cover opacity-70" />
            </div>
          ))}
        </div>
      </section>

      {/* ── EVENTS FOR YOU ── */}
      <section className="px-8 py-8 bg-gray-900 mt-2">
        <h2 className="text-base font-semibold text-white mb-4">Events for you</h2>
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-4 bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
            >
              {/* Event image */}
              <div className="w-36 h-24 flex-shrink-0 relative">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
              </div>

              {/* Event info */}
              <div className="flex-1 py-3 pr-2">
                <p className="text-white text-sm font-semibold">{event.title}</p>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2">{event.description}</p>
              </div>

              {/* Date + location + button */}
              <div className="flex flex-col items-end gap-2 pr-4 py-3 flex-shrink-0">
                <p className="text-gray-400 text-xs">• {event.date}</p>
                <p className="text-gray-400 text-xs">• {event.location}</p>
                <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded font-semibold transition-all">
                  Buy Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="px-8 py-12 bg-purple-900/40 mt-2 text-center">
        <h3 className="text-white text-lg font-bold">
          Get Latest Updates Subscribe To Our Newsletter
        </h3>
        <div className="mt-4 flex items-center justify-center gap-2 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 rounded bg-white/10 border border-white/20 text-white text-sm outline-none placeholder-gray-400 focus:border-purple-400"
          />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-8 py-6 bg-gray-950 border-t border-gray-800 flex items-center justify-between">
        <span className="text-white font-bold italic" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Bookify
        </span>
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </footer>
    </div>
  );
}
