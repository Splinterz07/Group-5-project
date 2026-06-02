"use client";
import DarkNavbar from "@/app/_components/DarkNavbar";

const ATTENDEES = [
  { id: "SQH3-001", name: "Femi Adebayo", email: "F.Adebayo@mail.com", squad: "Code Warriors", status: "Checked-in", ticket: "Premium" },
  { id: "SQH3-002", name: "Femi Adebayo", email: "F.Adebayo@mail.com", squad: "Code Warriors", status: "Checked-in", ticket: "Premium" },
  { id: "SQH3-003", name: "Femi Adebayo", email: "F.Adebayo@mail.com", squad: "Code Warriors", status: "Checked-in", ticket: "Premium" },
  { id: "SQH3-004", name: "Femi Adebayo", email: "F.Adebayo@mail.com", squad: "Code Warriors", status: "Checked-in", ticket: "Premium" },
  { id: "SQH3-005", name: "Femi Adebayo", email: "F.Adebayo@mail.com", squad: "Code Warriors", status: "Checked-in", ticket: "Premium" },
];

export default function AttendeeList() {
  return (
    <>
      <DarkNavbar />
    <div className="min-h-screen w-full font-sans relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #3a2160 0%, #241141 45%, #1c0d34 100%)" }}
    >
      {/* background image — replace src with your exported Figma asset */}
      <img
        src="/attendee-bg.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
      />

      <div className="relative">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-3">
          <span className="text-2xl text-white italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
            Bookify
          </span>
          <div className="flex items-center gap-8 text-[12px] text-white">
            <span className="cursor-pointer">Home</span>
            <span className="cursor-pointer">Event/Booking</span>
            <span className="cursor-pointer">Blog</span>
            <span className="cursor-pointer">Contact</span>
            <span className="cursor-pointer">Profile</span>
          </div>
        </nav>

        <main className="px-8 py-4">
          {/* Column headers */}
          <div className="grid grid-cols-12 gap-2 px-5 pb-3 text-[13px] font-bold text-white">
            <div className="col-span-2">ATTENDEE ID</div>
            <div className="col-span-2">NAME</div>
            <div className="col-span-3">EMAIL ADDRESS</div>
            <div className="col-span-2">SQUAD NAME</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-1">TICKET TYPE</div>
          </div>

          {/* Rows container */}
          <div className="rounded-3xl p-4" style={{ background: "rgba(255,255,255,0.10)" }}>
            <div className="flex flex-col gap-3">
              {ATTENDEES.map((a) => (
                <div
                  key={a.id}
                  className="grid grid-cols-12 items-center gap-2 rounded-2xl px-5 py-4 text-[14px] text-[#15121c]"
                  style={{ background: "rgba(214,209,219,0.92)" }}
                >
                  <div className="col-span-2">{a.id}</div>
                  <div className="col-span-2">{a.name}</div>
                  <div className="col-span-3">{a.email}</div>
                  <div className="col-span-2">{a.squad}</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                    {a.status}
                  </div>
                  <div className="col-span-1">{a.ticket}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters + search */}
          <div className="mt-5 flex items-center gap-4">
            <Dropdown label="Filter By Squad" />
            <Dropdown label="By Ticket Type" />
            <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-5 py-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b2fb5" strokeWidth="2.5">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.5-4.5" />
              </svg>
              <input
                placeholder="Search"
                className="flex-1 bg-transparent text-[15px] text-gray-600 outline-none"
              />
            </div>
          </div>

          {/* Download button */}
          <div className="mt-8 flex justify-end">
            <button className="rounded-full bg-[#6b2fb5] px-8 py-3.5 text-[14px] font-bold text-white">
              DOWNLOAD ATTENDEE LIST
            </button>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}

function Dropdown({ label }: { label: string }) {
  return (
    <div className="flex w-56 items-center justify-between rounded-full bg-white px-5 py-3 text-[15px] text-gray-700">
      <span>{label}</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15121c" strokeWidth="2.5">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}
