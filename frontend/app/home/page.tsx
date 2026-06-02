"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchEvents } from "../../lib/api";
import DarkNavbar from "@/app/_components/DarkNavbar";

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

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [sortedEvents, setSortedEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [activeSort, setActiveSort] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
        setSortedEvents(data);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setEventsLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleSort = (type: string) => {
    setActiveSort(type);
    const copy = [...events];
    if (type === "Price") {
      copy.sort((a, b) => a.price - b.price);
    } else if (type === "Location") {
      copy.sort((a, b) => a.location.localeCompare(b.location));
    } else if (type === "Ratings") {
      copy.sort((a, b) => b.availableSeats - a.availableSeats);
    }
    setSortedEvents(copy);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">

      {/* ── NAVBAR ── */}
      <DarkNavbar />

      {/* ── SORT BAR ── */}
      <div className="px-8 py-3 bg-gray-950 flex items-center gap-6 text-sm text-gray-400 border-b border-gray-800">
        <span>Sort by:</span>
        {["Location", "Price", "Ratings"].map((type) => (
          <button
            key={type}
            onClick={() => handleSort(type)}
            className={`hover:text-white transition-colors ${activeSort === type ? "text-purple-400 font-semibold" : ""}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* ── FEATURED BANNER ── */}
      <section className="px-8 py-4 bg-gray-900">
        <div className="grid grid-cols-4 gap-2 h-48">
          <div className="relative col-span-1 rounded-lg overflow-hidden bg-gray-800">
            <Image src="/home image2.jpg" alt="She Creates" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <span className="text-purple-400 text-xs font-bold tracking-wider">TiMA</span>
              <p className="text-white text-xs font-bold leading-tight mt-0.5">SHE CREATES</p>
              <p className="text-gray-300 text-[10px] leading-tight mt-0.5">Female creatives, innovators and disruptors</p>
              <p className="text-gray-400 text-[10px] mt-1">Sunday, March 29th 2026</p>
              <p className="text-gray-400 text-[10px]">Popcental Hauz</p>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden bg-gray-800">
            <Image src="/home image3.jpg" alt="Event 2" fill className="object-cover" />
          </div>
          <div className="relative rounded-lg overflow-hidden bg-gray-800">
            <Image src="/home image4.jpg" alt="Event 3" fill className="object-cover" />
          </div>
          <div className="relative rounded-lg overflow-hidden bg-gray-800">
            <Image src="/home image5.jpg" alt="Event 4" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* ── EVENTS FOR YOU ── */}
      <section className="px-8 py-8 bg-gray-900 mt-2">
        <h2 className="text-base font-semibold text-white mb-5">Events for you</h2>
        <div className="flex flex-col gap-4">
          {eventsLoading && <p className="text-gray-400 text-sm">Loading events...</p>}
          {!eventsLoading && sortedEvents.length === 0 && (
            <p className="text-gray-400 text-sm">No events available at the moment.</p>
          )}
          {sortedEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-4 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all">
              <div className="w-36 h-24 flex-shrink-0 bg-purple-900/40 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <Link
                  href={`/events/${event.id}`}
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded font-semibold transition-all"
                >
                  Buy Tickets
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="px-8 py-14 bg-purple-900/50 mt-2 text-center">
        <h3 className="text-white text-xl font-bold">Get Latest Updates Subscribe To Our Newsletter</h3>
        <div className="mt-5 flex items-center justify-center gap-2 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded bg-white/10 border border-white/20 text-white text-sm outline-none placeholder-gray-400 focus:border-purple-400"
          />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 border-t border-gray-800 px-8 pt-10 pb-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 border-b border-gray-800">
            <div>
              <span className="text-white font-bold italic text-lg" style={{ fontFamily: "'Dancing Script', cursive" }}>Bookify.com</span>
              <p className="text-gray-400 text-sm mt-1 mb-4 leading-relaxed">A ticketing platform for making memorable experience.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white outline-none focus:border-purple-400 placeholder-gray-500"
                />
                <button className="px-4 py-2 bg-gray-700 text-gray-300 text-sm rounded hover:bg-purple-600 hover:text-white transition-all">
                  Subscribe
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Homepage</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How Bookify works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Follow us</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tiktok</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>Copyright 2026 . All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms & Conditions</Link>
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy policy</Link>
              <Link href="/refund" className="hover:text-gray-300 transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}