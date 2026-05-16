"use client";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans">
      {/* ── NAVBAR ── */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div>
          <span className="text-xl font-bold italic" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Bookify
          </span>
          <p className="text-xs text-gray-500">Discover. Book. Experience.</p>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
          <Link href="/events" className="hover:text-purple-600 transition-colors">Event/Booking</Link>
          <Link href="/blog" className="hover:text-purple-600 transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-purple-600 transition-colors">Contact</Link>
          <Link href="/profile" className="hover:text-purple-600 transition-colors">Profile</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded hover:bg-purple-700 transition-all"
          >
            SIGN UP
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hompage image.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center gap-4 px-4 w-full max-w-xl">
          <h1
            className="text-white text-3xl md:text-4xl text-center font-bold tracking-widest uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Find Your Next Experience
          </h1>
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 w-full max-w-sm shadow">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="search event"
              className="bg-transparent flex-1 text-sm text-gray-600 outline-none placeholder-gray-400"
            />
          </div>
        </div>
      </section>

      {/* ── UNIQUE EXPERIENCE SECTION ── */}
      <section className="px-8 py-12 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight max-w-xs">
            There is a unique experience for everyone
          </h2>
          <p className="text-gray-500 text-sm max-w-xs md:pt-2">
            From talk shows to powertalks, Tech events, Movies and lots more.
          </p>
        </div>

        {/* Category Icons */}
        <div className="max-w-5xl mx-auto mt-10 flex items-center justify-between gap-4 flex-wrap">
          {[
            { label: "Community", icon: "/image 1.jpg" },
            { label: "Movies", icon: "/image 2.jpg" },
            { label: "Sports", icon: "/image 3.jpg" },
            { label: "Food", icon: "/image 4.jpg" },
            { label: "Wellness", icon: "/image 5.jpg" },
          ].map((cat) => (
            <div key={cat.label} className="flex flex-col items-center gap-2 cursor-pointer group">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-purple-400 transition-all">
                <Image
                  src={cat.icon}
                  alt={cat.label}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-xs text-gray-600 font-medium">{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANNING AN EVENT ── */}
      <section className="px-8 py-10 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-lg font-bold text-gray-900">Planning an event?</h3>
          <p className="text-lg font-bold text-gray-900">Selling tickets has never been easier!</p>
          <button className="mt-4 px-6 py-2 bg-gray-200 text-gray-600 text-sm rounded hover:bg-purple-600 hover:text-white transition-all">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
