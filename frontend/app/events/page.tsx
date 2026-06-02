"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchEvents } from "@/lib/api";
import DarkNavbar from "@/app/_components/DarkNavbar";
import SearchEvent from "@/app/_components/SearchEvents";

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
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
        setDisplayedEvents(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleSearchComplete = (query: string, results: any[]) => {
    setSearchQuery(query);
    if (query.trim()) {
      setDisplayedEvents(results);
    } else {
      setDisplayedEvents(events);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">

      {/* Navbar */}
      <DarkNavbar />
      {/* Navbar */}
        <nav className="relative flex items-center justify-between px-8 py-4">
          <span
            className="text-2xl text-white italic"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            Bookify
          </span>
          <div className="flex items-center gap-7 text-[12px] text-white">
            <span className="cursor-pointer">Home</span>
            <span className="cursor-pointer">Event/Booking</span>
            <span className="cursor-pointer">Blog</span>
            <span className="cursor-pointer">Contact</span>
            <span className="cursor-pointer">Profile</span>
          </div>
        </nav>

      {/* Page Header */}
      <div className="px-8 py-8 bg-gray-900 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">All Events</h1>
        <p className="text-gray-400 text-sm mt-1">Browse and book your next experience</p>
      </div>

      {/* Search Bar */}
      <div className="px-8 py-6 bg-gray-900 border-b border-gray-800">
        <div className="max-w-3xl">
          <SearchEvent
            placeholder="Search events by title, location..."
            variant="dark"
            onSearchComplete={handleSearchComplete}
          />
        </div>
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

        {!loading && !error && events.length > 0 && displayedEvents.length === 0 && searchQuery && (
          <p className="text-gray-400 text-sm">No events found matching "{searchQuery}"</p>
        )}

        <div className="flex flex-col gap-4">
          {displayedEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-4 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all">
              
              <div className="w-36 h-24 flex-shrink-0 overflow-hidden">
                 <img
                   src="/event-placeholder.jpg"
                   alt={event.title}
                   className="w-full h-full object-cover"
                   />
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