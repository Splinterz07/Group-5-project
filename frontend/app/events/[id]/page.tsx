"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchEvent, createBooking, isLoggedIn } from "@/lib/api";

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

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", seats: 1 });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name);
  }, []);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await fetchEvent(id);
        setEvent(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load event");
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }
    setBookingLoading(true);
    setBookingError("");
    try {
      await createBooking(id, bookingForm.name, bookingForm.email, bookingForm.seats);
      setBookingSuccess(true);
    } catch (err: unknown) {
      setBookingError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

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

      <div className="max-w-3xl mx-auto px-8 py-10">

        {loading && <p className="text-gray-400 text-sm">Loading event...</p>}

        {error && (
          <div className="px-4 py-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {event && (
          <>
            {/* Event Details */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden mb-8">
              <div className="w-full h-48 bg-purple-900/40 flex items-center justify-center">
                <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white">{event.title}</h1>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">{event.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Date</p>
                    <p className="text-white text-sm mt-1">{event.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Location</p>
                    <p className="text-white text-sm mt-1">{event.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Price</p>
                    <p className="text-purple-400 text-sm mt-1 font-semibold">₦{event.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Available Seats</p>
                    <p className="text-white text-sm mt-1">{event.availableSeats} / {event.totalSeats}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h2 className="text-lg font-bold text-white mb-6">Book Tickets</h2>

              {bookingSuccess ? (
                <div className="text-center py-6">
                  <p className="text-green-400 font-semibold text-lg">Booking confirmed! 🎉</p>
                  <p className="text-gray-400 text-sm mt-2">Check your profile for booking details.</p>
                  <Link href="/events" className="mt-4 inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-all">
                    Browse More Events
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  {bookingError && (
                    <div className="px-4 py-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
                      {bookingError}
                    </div>
                  )}

                  <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-4 py-3 border border-gray-700">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      required
                      className="bg-transparent flex-1 text-white text-sm outline-none placeholder-gray-500"
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-4 py-3 border border-gray-700">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      required
                      className="bg-transparent flex-1 text-white text-sm outline-none placeholder-gray-500"
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-4 py-3 border border-gray-700">
                    <input
                      type="number"
                      placeholder="Number of Seats"
                      min={1}
                      max={event.availableSeats}
                      value={bookingForm.seats}
                      onChange={(e) => setBookingForm({ ...bookingForm, seats: Number(e.target.value) })}
                      required
                      className="bg-transparent flex-1 text-white text-sm outline-none placeholder-gray-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={bookingLoading || event.availableSeats === 0}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg tracking-widest text-sm transition-all disabled:opacity-70"
                  >
                    {bookingLoading ? "BOOKING..." : event.availableSeats === 0 ? "SOLD OUT" : "BOOK NOW"}
                  </button>

                  <p className="text-gray-500 text-xs text-center">
                    You need to be logged in to book.{" "}
                    <Link href="/login" className="text-purple-400 hover:text-purple-300 underline">
                      Login here
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}