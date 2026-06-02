"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchEvents } from "@/lib/api";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  totalSeats: number;
  availableSeats: number;
  price: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name);
  }, []);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUserName(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-gray-950 border-b border-gray-800">
        <span className="text-lg font-bold italic" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Bookify
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/events" className="text-white">Event/Booking</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/profile" className="hover:text-white transition-colors">Profile</Link>
        </div>
        <div className="flex items-center gap-3">
          {userName ? (
            <>
              <Link href="/profile" className="text-sm text-gray-300 hover:text-white transition-colors">
                Hi, {userName}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-all"
              >
                LOG OUT
              </button>
            </>
          ) : (
            <>
              <Link href="/signup" className="px-4 py-1.5 border border-purple-500 text-white text-sm rounded hover:bg-purple-500/20 transition-all">
                SIGN UP
              </Link>
              <Link href="/login" className="px-4 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-all">
                LOG IN
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Page Header */}
      <div className="px-8 py-8 bg-gray-900 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">All Events</h1>
        <p className="text-gray-400 text-sm mt-1">Browse and book your next experience</p>
      </div>

      {/* Content */}
      <section className="px-8 py-8 bg-gray-900">
        {loading && <p className="text-gray-400 text-sm">Loading events...</p>}

        {error && (
          <div className="px-4 py-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="text-gray-400 text-sm">No events available at the moment.</p>
        )}

        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center gap-4 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all">
              <div className="w-36 h-24 flex-shrink-0 bg-purple-900/40 flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div className="flex-1 py-3 pr-2">
                <p className="text-white text-sm font-semibold">{event.title}</p>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed">{event.description}</p>
                <p className="text-purple-400 text-xs mt-1 font-semibold">₦{event.price.toLocaleString()}</p>
              </div>
              <div className="flex flex-col items-end gap-2 pr-4 py-3 flex-shrink-0">
                <p className="text-gray-400 text-xs">• {event.date}</p>
                <p className="text-gray-400 text-xs">• {event.location}</p>
                <p className="text-gray-500 text-xs">{event.availableSeats} seats left</p>
                <Link
                  href={`/events/${event.id}`}
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded font-semibold transition-all"
                >
                  View & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}