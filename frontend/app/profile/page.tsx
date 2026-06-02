"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchBookings, cancelBooking, isLoggedIn, removeToken, getUserName, getUserEmail } from "../../lib/api";
import DarkNavbar from "@/app/_components/DarkNavbar";

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

interface SavedCard {
  id: number;
  label: string;
  type: "visa" | "mastercard" | "other";
}

interface CardForm {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardName: string;
}

const VisaIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-7" fill="none">
    <rect width="48" height="48" rx="6" fill="#1A1F71"/>
    <text x="50%" y="67%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">VISA</text>
  </svg>
);

const MastercardIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-7" fill="none">
    <rect width="48" height="48" rx="6" fill="#252525"/>
    <circle cx="19" cy="24" r="10" fill="#EB001B"/>
    <circle cx="29" cy="24" r="10" fill="#F79E1B"/>
    <path d="M24 16.8A10 10 0 0129 24a10 10 0 01-5 7.2A10 10 0 0119 24a10 10 0 015-7.2z" fill="#FF5F00"/>
  </svg>
);

const GenericCardIcon = ({ color }: { color: string }) => (
  <div className={`w-10 h-7 rounded ${color} flex items-center justify-center`}>
    <svg className="w-6 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="white" strokeWidth="1.5"/>
      <line x1="2" y1="10" x2="22" y2="10" stroke="white" strokeWidth="1.5"/>
    </svg>
  </div>
);

const detectCardType = (number: string): "visa" | "mastercard" | "other" => {
  const clean = number.replace(/\s/g, "");
  if (clean.startsWith("4")) return "visa";
  if (clean.startsWith("5") || clean.startsWith("2")) return "mastercard";
  return "other";
};

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Account Details");
  const [notifications, setNotifications] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([
    { id: 1, label: "Visa ending in 4242", type: "visa" },
    { id: 2, label: "Mastercard ending in 8888", type: "mastercard" },
  ]);
  const [cardForm, setCardForm] = useState<CardForm>({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const userName = getUserName();
  const userEmail = getUserEmail();
  const initials = userName
    ? userName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  const [form, setForm] = useState({
    fullName: userName,
    email: userEmail,
    phone: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCardFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    }
    if (e.target.name === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length >= 2) value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (e.target.name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3);
    }
    setCardForm({ ...cardForm, [e.target.name]: value });
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    const last4 = cardForm.cardNumber.replace(/\s/g, "").slice(-4);
    const type = detectCardType(cardForm.cardNumber);
    const typeLabel = type === "visa" ? "Visa" : type === "mastercard" ? "Mastercard" : "Card";
    setSavedCards([...savedCards, {
      id: savedCards.length + 1,
      label: `${typeLabel} ending in ${last4}`,
      type,
    }]);
    setCardForm({ cardNumber: "", expiry: "", cvv: "", cardName: "" });
    setShowAddCard(false);
  };

  const handleRemoveCard = (id: number) => {
    setSavedCards(savedCards.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bookify icon.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/55" />

      {/* Navbar */}
      <div className="relative z-10">
        <DarkNavbar />
      </div>

      {/* Profile Card */}
      <div className="relative z-10 flex flex-1 items-start justify-center px-4 py-10">
        <div className="w-full max-w-4xl bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl shadow-2xl overflow-hidden">

          {/* Avatar + Name */}
          <div className="flex flex-col items-center pt-10 pb-6">
            <div className="w-24 h-24 rounded-full border-4 border-purple-400 bg-purple-700 flex items-center justify-center mb-3 shadow-lg">
              <span className="text-white text-3xl font-bold">{initials}</span>
            </div>
            <h2 className="text-white text-xl font-bold">{userName || "User"}</h2>
            <p className="text-purple-200 text-sm mt-1">{userEmail}</p>
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
                  <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
                    className="bg-transparent flex-1 text-gray-700 text-sm outline-none placeholder-gray-500" placeholder="Full Name"/>
                </div>

                <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3">
                  <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    className="bg-transparent flex-1 text-gray-700 text-sm outline-none placeholder-gray-500" placeholder="Email Address"/>
                </div>

                <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3">
                  <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                    className="bg-transparent flex-1 text-gray-700 text-sm outline-none placeholder-gray-500" placeholder="Phone Number"/>
                </div>

                <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3">
                  <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  <input type="password" name="password" value={form.password} onChange={handleChange}
                    className="bg-transparent flex-1 text-gray-700 text-sm outline-none placeholder-gray-500" placeholder="New Password"/>
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
                    <span style={{
                      position: "absolute", top: "3px", left: notifications ? "23px" : "3px",
                      width: "18px", height: "18px", backgroundColor: "white", borderRadius: "50%",
                      transition: "left 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    }}/>
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
                {bookingsError && <p className="text-red-300 text-sm">{bookingsError}</p>}
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
                    <div key={booking.id} className="flex items-center gap-4 bg-white/10 rounded-xl border border-white/15 px-4 py-3">
                      <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-semibold">Booking #{booking.id}</p>
                        <p className="text-white/60 text-xs mt-0.5">Event ID: {booking.eventId} • {booking.seats} seat(s)</p>
                        <p className="text-white/40 text-xs">{new Date(booking.createdAt).toLocaleDateString()}</p>
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
              <div className="max-w-sm mx-auto space-y-4">
                {savedCards.map((card) => (
                  <div key={card.id} className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xl px-5 py-4">
                    <div className="flex-shrink-0">
                      {card.type === "visa" && <VisaIcon />}
                      {card.type === "mastercard" && <MastercardIcon />}
                      {card.type === "other" && <GenericCardIcon color="bg-purple-600" />}
                    </div>
                    <span className="flex-1 text-white text-sm font-medium">{card.label}</span>
                    <button
                      onClick={() => handleRemoveCard(card.id)}
                      className="px-3 py-1.5 border border-red-400/50 text-red-300 text-xs rounded-lg hover:bg-red-400/20 transition-all"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {!showAddCard && (
                  <button
                    onClick={() => setShowAddCard(true)}
                    className="w-full py-3 border-2 border-dashed border-white/30 text-white/60 hover:border-purple-400 hover:text-purple-300 rounded-xl text-sm font-semibold transition-all"
                  >
                    + Add New Card
                  </button>
                )}

                {showAddCard && (
                  <form onSubmit={handleAddCard} className="bg-white/10 border border-white/20 rounded-xl p-5 space-y-3">
                    <h3 className="text-white text-sm font-bold mb-2">Add New Card</h3>

                    <input
                      type="text"
                      name="cardName"
                      placeholder="Name on Card"
                      value={cardForm.cardName}
                      onChange={handleCardFormChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm outline-none placeholder-white/40 focus:border-purple-400"
                    />

                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={cardForm.cardNumber}
                      onChange={handleCardFormChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm outline-none placeholder-white/40 focus:border-purple-400"
                    />

                    <div className="flex gap-3 overflow-hidden">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={cardForm.expiry}
                        onChange={handleCardFormChange}
                        required
                        className="w-1/2 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm outline-none placeholder-white/40 focus:border-purple-400"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={cardForm.cvv}
                        onChange={handleCardFormChange}
                        required
                        className="w-1/2 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm outline-none placeholder-white/40 focus:border-purple-400"
                      />
                    </div>

                    <div className="flex gap-3 pt-1">
                      <button type="submit" className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-lg transition-all">
                        Save Card
                      </button>
                      <button type="button" onClick={() => setShowAddCard(false)} className="flex-1 py-2.5 border border-white/30 text-white/70 text-sm rounded-lg hover:bg-white/10 transition-all">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}