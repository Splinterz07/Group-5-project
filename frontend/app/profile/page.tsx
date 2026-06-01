"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchBookings, cancelBooking, isLoggedIn, removeToken } from "../../lib/api";

const TABS = ["Account Details", "My Bookings", "Payments"] as const;
type Tab = (typeof TABS)[number];

interface Booking {
  id: number;
  eventId: number;
  name: string;
  email: string;
  seats: number;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Account Details");
  const [notifications, setNotifications] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState("");
  const [form, setForm] = useState({
    fullName: "Philemon Michael-Hussaini",
    email: "philemon@example.com",
    phone: "+234 800 000 0000",
    password: "",
  });

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (activeTab === "My Bookings") {
      const loadBookings = async () => {
        setBookingsLoading(true);
        setBookingsError("");
        try {
          const data = await fetchBookings();
          setBookings(data);
        } catch (err: unknown) {
          setBookingsError(err instanceof Error ? err.message : "Failed to load bookings");
        } finally {
          setBookingsLoading(false);
        }
      };
      loadBookings();
    }
  }, [activeTab]);

  const handleCancelBooking = async (id: number) => {
    try {
      await cancelBooking(id);
      setBookings(bookings.filter((b) => b.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to cancel booking");
    }
  };

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bookify icon.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/55" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-5">
        <span className="text-white text-2xl" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}>
          Bookify
        </span>
        <div className="hidden md:flex items-center gap-8 text-white text-sm font-medium">
          <Link href="/" className="hover:text-purple-300 transition-colors">Home</Link>
          <Link href="/events" className="hover:text-purple-300 transition-colors">Event/Booking</Link>
          <Link href="/blog" className="hover:text-purple-300 transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-purple-300 transition-colors">Contact</Link>
          <Link href="/profile" className="text-purple-300">Profile</Link>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-full border border-red-400 text-white text-sm hover:bg-red-400/20 transition-all"
          >
            LOG OUT
          </button>
        </div>
      </nav>

      {/* Profile Card */}
      <div className="relative z-10 flex flex-1 items-start justify-center px-4 py-10">
        <div className="w-full max-w-4xl bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl shadow-2xl overflow-hidden">

          {/* Avatar + Name */}
          <div className="flex flex-col items-center pt-10 pb-6">
            <div className="w-24 h-24 rounded-full border-4 border-purple-400 overflow-hidden mb-3 shadow-lg">
              <Image
                src="/bookify icon.jpg"
                alt="Profile"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="text-white text-xl font-bold">{form.fullName}</h2>
            <p className="text-purple-200 text-sm mt-1">Gen Z Ambassador</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/20">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-semibold tracking-wide transition-all ${
                  activeTab === tab
                    ? "text-white border-b-2 border-purple-400"
                    : "text-white/60 hover:text-white/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">

            {/* Account Details */}
            {activeTab === "Account Details" && (
              <div className="space-y-4 max-w-sm mx-auto">
                <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3">
                  <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="bg-transparent flex-1 text-gray-700 text-sm outline-none placeholder-gray-500"
                    placeholder="Full Name"
                  />
                </div>

                <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3">
                  <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-transparent flex-1 text-gray-700 text-sm outline-none placeholder-gray-500"
                    placeholder="Email Address"
                  />
                </div>

                <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3">
                  <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="bg-transparent flex-1 text-gray-700 text-sm outline-none placeholder-gray-500"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3">
                  <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-transparent flex-1 text-gray-700 text-sm outline-none placeholder-gray-500"
                    placeholder="New Password"
                  />
                </div>

                <div className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3">
                  <span className="text-white text-sm">Notification Preferences</span>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    style={{
                      position: "relative", width: "44px", height: "24px", borderRadius: "12px",
                      backgroundColor: notifications ? "#9333ea" : "rgba(255,255,255,0.3)",
                      transition: "background-color 0.3s", flexShrink: 0, border: "none",
                      cursor: "pointer", padding: 0,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute", top: "3px", left: notifications ? "23px" : "3px",
                        width: "18px", height: "18px", backgroundColor: "white", borderRadius: "50%",
                        transition: "left 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                      }}
                    />
                  </button>
                </div>

                <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg tracking-widest text-sm transition-all">
                  UPDATE INFORMATION
                </button>
              </div>
            )}

            {/* My Bookings */}
            {activeTab === "My Bookings" && (
              <div>
                {bookingsLoading && <p className="text-white/70 text-sm">Loading bookings...</p>}
                {bookingsError && (
                  <p className="text-red-300 text-sm">{bookingsError}</p>
                )}
                {!bookingsLoading && !bookingsError && bookings.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-white/60 text-sm">No bookings yet.</p>
                    <Link href="/events" className="mt-3 inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-all">
                      Browse Events
                    </Link>
                  </div>
                )}
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center gap-4 bg-white/10 rounded-xl overflow-hidden border border-white/15 px-4 py-3">
                      <div className="flex-1">
                        <p className="text-white text-sm font-semibold">Booking #{booking.id}</p>
                        <p className="text-white/60 text-xs mt-1">Event ID: {booking.eventId}</p>
                        <p className="text-white/60 text-xs">{booking.seats} seat(s) • {booking.email}</p>
                        <p className="text-white/40 text-xs mt-1">{new Date(booking.createdAt).toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-4 py-1.5 border border-red-400/60 text-red-300 text-xs rounded-lg hover:bg-red-400/20 transition-all font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payments */}
            {activeTab === "Payments" && (
              <div className="space-y-4 max-w-sm mx-auto">
                {[
                  { label: "Saved Card 1", color: "bg-blue-500" },
                  { label: "Saved Card 2", color: "bg-red-500" },
                  { label: "Saved Card 3", color: "bg-blue-700" },
                ].map((card) => (
                  <div key={card.label} className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xl px-5 py-4">
                    <div className={`w-10 h-7 rounded ${card.color} flex items-center justify-center`}>
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="white" strokeWidth="1.5"/>
                        <line x1="2" y1="10" x2="22" y2="10" stroke="white" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="flex-1 text-white text-sm font-medium">{card.label}</span>
                    <button className="px-4 py-1.5 border border-white/40 text-white text-xs rounded-lg hover:bg-white/10 transition-all">
                      Manage
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}