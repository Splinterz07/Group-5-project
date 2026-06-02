import React, { useState } from "react";

type PaymentMethod = "card" | "bank" | "ussd";

export default function BookingConfirmation() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [squadName, setSquadName] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("card");

  return (
    <div
      className="min-h-screen w-full p-1"
      style={{ background: "#1ea1e0" }}
    >
      <div
        className="min-h-screen w-full font-sans relative overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 0%, #4a2370 0%, #2a1147 40%, #1a0a30 100%)",
        }}
      >
        {/* decorative wave glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(40% 40% at 30% 60%, rgba(120,60,180,0.35) 0%, transparent 70%), radial-gradient(35% 35% at 80% 40%, rgba(90,40,150,0.4) 0%, transparent 70%)",
          }}
        />

        {/* Navbar */}
        <nav className="relative flex items-center justify-between px-10 py-5 bg-black/30">
          <span
            className="text-3xl text-white italic"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            Bookify
          </span>
          <ul className="flex items-center gap-12 text-[15px] text-white">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Event/Booking</li>
            <li className="cursor-pointer">Blog</li>
            <li className="cursor-pointer">Contact</li>
            <li className="cursor-pointer">Profile</li>
          </ul>
        </nav>

        {/* Main card */}
        <main className="relative px-6 py-8 flex justify-center">
          <div
            className="w-full max-w-5xl rounded-[28px] px-10 py-8 shadow-2xl"
            style={{ background: "rgba(206,201,216,0.92)" }}
          >
            <h1 className="text-center text-3xl font-extrabold text-[#15121c] mb-8">
              BOOKING CONFIRMATION - Squad Hackathon 3.0
            </h1>

            <div className="grid grid-cols-12 gap-x-8 gap-y-6">
              {/* Image */}
              <div className="col-span-3">
                <div className="relative h-44 w-full overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=80"
                    alt="Squad Hackathon"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-sm font-bold drop-shadow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                    </svg>
                    MAY 30,2026
                  </div>
                </div>
              </div>

              {/* Event details */}
              <div className="col-span-5 text-[15px] text-[#15121c] leading-tight">
                <Detail label="Event Summary" value="Squad Hackathon 3.0" />
                <Detail
                  label="Event Details"
                  value="Fri 30th May 2026, 5:00 AM - 5:00 PM"
                />
                <Detail label="Location" value="The landmark Centre, VI" />
                <Detail label="Ticket Type" value="Squad Leader (1 Ticket)" />
              </div>

              {/* Payment summary */}
              <div className="col-span-4">
                <div
                  className="rounded-2xl px-5 py-4"
                  style={{ background: "rgba(220,216,229,0.9)" }}
                >
                  <h3 className="font-bold text-[#15121c] mb-2">PAYMENT SUMMARY</h3>
                  <p className="text-[13px] text-[#15121c]">1x Squad Leader Ticket</p>
                  <p className="text-[13px] text-[#15121c]">NGN 150,000</p>
                  <p className="text-[13px] text-[#15121c] mt-1">Service Fee</p>
                  <p className="text-[13px] text-[#15121c]">NGN&nbsp; 1,500</p>
                  <p className="text-[13px] font-bold text-[#15121c] mt-3">
                    Total Amount:
                  </p>
                  <p className="text-[13px] font-bold text-[#15121c]">NGN 151,500</p>
                  <button className="mt-3 w-full rounded-full bg-gradient-to-r from-[#7b3fc4] to-[#9b6fd6] py-2.5 text-sm font-bold text-white tracking-wide">
                    PROCEED TO PAYMENT
                  </button>
                  <p className="mt-2 text-center text-[10px] tracking-wide text-[#15121c]">
                    COMPLETE PURCHASE &amp; SECURE TICKETS
                  </p>
                </div>
              </div>

              {/* Attendee information */}
              <div className="col-span-2" />
              <div className="col-span-6 -mt-2">
                <h3 className="font-bold text-[#15121c] mb-3">
                  Attendee Information:
                </h3>
                <div className="flex flex-col gap-4">
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name (Placeholder)"
                    className="rounded-lg bg-white px-4 py-2.5 text-gray-500 outline-none"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email (Placeholder)"
                    className="rounded-lg bg-white px-4 py-2.5 text-gray-500 outline-none"
                  />
                  <input
                    value={squadName}
                    onChange={(e) => setSquadName(e.target.value)}
                    placeholder="Squad Name (Placeholder)"
                    className="rounded-lg bg-white px-4 py-2.5 text-gray-500 outline-none"
                  />
                </div>
              </div>

              {/* Select payment method */}
              <div className="col-span-4">
                <div
                  className="rounded-2xl px-5 py-4 h-full"
                  style={{ background: "rgba(220,216,229,0.9)" }}
                >
                  <h3 className="font-bold text-[#15121c] leading-tight mb-4">
                    SELECT PAYMENT
                    <br />
                    METHOD
                  </h3>
                  <div className="flex flex-col gap-5">
                    <button
                      onClick={() => setMethod("card")}
                      className="flex items-center gap-3 text-[#15121c]"
                    >
                      <BankIcon />
                      <span>Card</span>
                    </button>
                    <button
                      onClick={() => setMethod("bank")}
                      className="flex items-center gap-3 text-[#15121c]"
                    >
                      <CardIcon />
                      <span>Bank Transfer</span>
                    </button>
                    <button
                      onClick={() => setMethod("ussd")}
                      className="flex items-center gap-3 text-[#15121c]"
                    >
                      <PhoneIcon />
                      <span>USSD</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* View my bookings */}
            <div className="mt-2">
              <button className="rounded-full bg-gradient-to-r from-[#7b3fc4] to-[#9b6fd6] px-10 py-3.5 font-extrabold text-white tracking-wide shadow-lg">
                VIEW MY BOOKINGS
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3">
      <p className="font-bold">{label}</p>
      <p>{value}</p>
    </div>
  );
}

function BankIcon() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded bg-[#15121c]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M12 2L2 7v2h20V7L12 2zM4 10v8H2v2h20v-2h-2v-8h-2v8h-3v-8h-2v8H9v-8H6v8H4v-8z" opacity="0" />
        <text x="12" y="17" fontSize="13" fontWeight="bold" textAnchor="middle" fill="white">$</text>
        <path d="M4 11h16v1H4zM3 18h18v1H3z" fill="white" />
      </svg>
    </span>
  );
}

function CardIcon() {
  return (
    <span className="flex h-7 w-9 items-center justify-center rounded bg-[#15121c]">
      <svg width="22" height="16" viewBox="0 0 24 16" fill="none">
        <rect x="1" y="2" width="22" height="12" rx="2" fill="#15121c" stroke="white" strokeWidth="1" />
        <rect x="1" y="5" width="22" height="2.5" fill="white" />
      </svg>
    </span>
  );
}

function PhoneIcon() {
  return (
    <span className="flex h-8 w-6 items-center justify-center rounded-md bg-[#15121c]">
      <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
        <rect x="1" y="1" width="12" height="18" rx="2" stroke="white" strokeWidth="1.2" />
        <circle cx="7" cy="16" r="1" fill="white" />
      </svg>
    </span>
  );
}
