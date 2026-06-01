import React, { useState } from "react";

import React, { useEffect, useRef, useState } from "react";

const MENU_ITEMS = [
  { label: "Attendee List", href: "/attendees" },
  { label: "Organizer Dashboard", href: "/dashboard" },
  { label: "Create Event", href: "/create-event" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="flex items-center justify-between px-8 py-3">
      <span
        className="text-2xl text-white italic"
        style={{ fontFamily: "'Brush Script MT', cursive" }}
      >
        Bookify
      </span>

      <div className="flex items-center gap-8 text-[12px] text-white">
        <span className="cursor-pointer">Home</span>
        <span className="cursor-pointer">Event/Booking</span>
        <span className="cursor-pointer">Blog</span>
        <span className="cursor-pointer">Contact</span>
        <span className="cursor-pointer">Profile</span>

        {/* Menu dropdown */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-full bg-[#6b2fb5] px-4 py-1.5 text-[11px] font-bold text-white"
          >
            Menu
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl bg-white shadow-xl">
              {MENU_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-3 text-[13px] text-[#15121c] hover:bg-[#ede8f5]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}


export default function CreateYourEvent() {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="min-h-screen w-full p-1" style={{ background: "#1ea1e0" }}>
      <div
        className="min-h-screen w-full font-sans relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #2a1147 0%, #1a0a30 50%, #2a1147 100%)",
        }}
      >
        {/* diagonal streaks */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "repeating-linear-gradient(115deg, rgba(120,70,180,0.10) 0px, rgba(120,70,180,0.10) 2px, transparent 2px, transparent 22px)",
          }}
        />

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

        {/* Title */}
        <h1 className="relative text-center text-4xl font-extrabold text-white tracking-wide mt-4 mb-6">
          CREATE YOUR EVENT
        </h1>

        {/* Card */}
        <main className="relative flex justify-center px-6 pb-10">
          <div
            className="w-full max-w-2xl rounded-[28px] px-8 py-7 shadow-2xl"
            style={{ background: "#3b3340" }}
          >
            <div className="flex flex-col gap-4">
              {/* Event title */}
              <Field>
                <span className="font-bold text-[#15121c]">EVENT TITLE</span>
                <span className="text-gray-500">(e,g, Tech Summit 2026)</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="ml-2 flex-1 bg-transparent outline-none text-[#15121c]"
                />
              </Field>

              {/* Date & time */}
              <Field>
                <span className="font-bold text-[#15121c]">EVENT DATE & TIME</span>
                <input
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="ml-2 flex-1 bg-transparent outline-none text-[#15121c]"
                />
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15121c" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                  <circle cx="17" cy="16" r="3" fill="#15121c" stroke="none" />
                </svg>
              </Field>

              {/* Location */}
              <Field>
                <span className="font-bold text-[#15121c]">LOCATION</span>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="ml-2 flex-1 bg-transparent outline-none text-[#15121c]"
                />
              </Field>

              {/* Category */}
              <Field>
                <span className="font-bold text-[#15121c]">EVENT CATEGORY</span>
                <span className="text-gray-500">(Drop down for music, sports.. )</span>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="ml-2 flex-1 bg-transparent outline-none text-[#15121c]"
                />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15121c" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Field>

              {/* Description */}
              <div className="rounded-xl bg-white px-4 py-3">
                <div className="flex items-baseline">
                  <span className="font-bold text-[#15121c]">EVENT DESCRIPTION</span>
                  <span className="ml-1 text-gray-500">
                    (Large text area for polished text)
                  </span>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1 w-full resize-none bg-transparent outline-none text-[#15121c]"
                />
              </div>

              {/* Banner image */}
              <Field>
                <span className="font-bold text-[#15121c]">EVENT BANNER IMAGE</span>
                <span className="flex-1" />
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15121c" strokeWidth="2">
                  <path d="M12 3v12M8 7l4-4 4 4M5 15v4a2 2 0 002 2h10a2 2 0 002-2v-4" />
                </svg>
              </Field>

              {/* Two panels */}
              <div className="grid grid-cols-2 gap-5 mt-1">
                {/* Ticket types */}
                <div
                  className="rounded-xl px-4 py-4"
                  style={{ background: "rgba(255,255,255,0.10)" }}
                >
                  <h3 className="font-bold text-white text-sm mb-3">
                    TICKET TYPES & PRICING
                  </h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      placeholder="Ticket Name"
                      className="w-1/2 rounded-md bg-white px-3 py-1.5 text-xs text-gray-500 outline-none"
                    />
                    <input
                      placeholder="Quantity"
                      className="w-1/2 rounded-md bg-white px-3 py-1.5 text-xs text-gray-500 outline-none"
                    />
                  </div>
                  <input
                    placeholder="Price"
                    className="w-full rounded-md bg-white px-3 py-1.5 text-xs text-gray-500 outline-none mb-3"
                  />
                  <button className="w-full rounded-full bg-[#6b2fb5] py-2 text-xs font-bold text-white">
                    + Add Ticket
                  </button>
                </div>

                {/* Attendee questions */}
                <div
                  className="rounded-xl px-4 py-4"
                  style={{ background: "rgba(255,255,255,0.10)" }}
                >
                  <h3 className="font-bold text-white text-sm mb-3">
                    ATTENDEE QUESTIONS
                  </h3>
                  <input
                    placeholder="Question Name"
                    className="w-full rounded-md bg-white px-3 py-1.5 text-xs text-gray-500 outline-none mb-2"
                  />
                  <input
                    placeholder="Question Type"
                    className="w-full rounded-md bg-white px-3 py-1.5 text-xs text-gray-500 outline-none mb-3"
                  />
                  <button className="w-full rounded-full bg-[#6b2fb5] py-2 text-xs font-bold text-white">
                    + Add Question
                  </button>
                </div>
              </div>

              {/* Bottom buttons */}
              <div className="flex items-center justify-between mt-4">
                <button className="rounded-full bg-[#6b2fb5] px-8 py-3 text-sm font-bold text-white">
                  PUBLISH EVENT
                </button>
                <button className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[#6b2fb5]">
                  SAVE AS DRAFT
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center rounded-full bg-white px-5 py-2.5 text-[15px]">
      {children}
    </div>
  );
}
