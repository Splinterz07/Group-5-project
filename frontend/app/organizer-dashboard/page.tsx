import React from "react";
import DarkNavbar from "@/app/_components/DarkNavbar";

export default function OrganizerDashboard() {
  return (
    <div className="min-h-screen w-full p-1" style={{ background: "#9aa0a6" }}>
      <div
        className="min-h-screen w-full font-sans relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #3a2160 0%, #241141 45%, #1c0d34 100%)",
        }}
      >
        {/* background image — replace src with your exported Figma asset */}
        <img
          src="/dashboard-bg.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        />

        {/* Navbar */}
      <DarkNavbar />
        <main className="relative px-8 py-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h1 className="text-4xl font-extrabold text-white">
              ORGANIZER DASHBOARD
            </h1>
            <button className="rounded-full bg-[#6b2fb5] px-5 py-2.5 text-[12px] font-bold text-white">
              CREATE NEW EVENT
            </button>
          </div>

          <h2 className="mt-3 text-xl font-extrabold text-white">SALES OVERVIEW</h2>

          {/* Stat cards row 1 */}
          <div className="mt-4 grid grid-cols-3 gap-5">
            <StatCard label="TOTAL REVENUE (NGN)" value="NGN 10,500,000" up />
            <StatCard label="TICKETS SOLD" value="1,250" up />
            <StatCard label="AVG ORDER VALUE" value="NGN 8400" />
          </div>

          {/* Stat card row 2 + download */}
          <div className="mt-5 flex items-center justify-between gap-5">
            <div className="w-1/2">
              <StatCard label="AVG ORDER VALUE" value="NGN 11,000,000" up />
            </div>
            <button className="rounded-full bg-[#6b2fb5] px-7 py-3 text-[12px] font-bold text-white">
              DOWNLOAD REPORT
            </button>
          </div>

          {/* Section headers */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            <h3 className="text-2xl font-extrabold text-white">EVENT STATS</h3>
            <h3 className="text-2xl font-extrabold text-white">ATTENDEE INSIGHTS</h3>
          </div>

          {/* Bottom cards */}
          <div className="mt-2 grid grid-cols-2 gap-6">
            {/* Event stats */}
            <div
              className="rounded-2xl px-6 py-5 text-[#15121c]"
              style={{ background: "rgba(214,209,224,0.92)" }}
            >
              <StatRow label="ACTIVE EVENTS:" value="2" />
              <StatRow label="UPCOMING EVENTS:" value="3" />
              <StatRow label="CANCELLED EVENTS:" value="0" />
              <p className="mt-5 font-bold">TOP EVENT:</p>
              <p className="font-bold">Squad Hackathon 3.0 (900 tickets)</p>
            </div>

            {/* Attendee insights */}
            <div
              className="rounded-2xl px-6 py-5 text-[#15121c]"
              style={{ background: "rgba(214,209,224,0.92)" }}
            >
              <StatRow label="PREMIUM:" value="450" />
              <StatRow label="VIP:" value="150" />
              <StatRow label="STANDARD:" value="300" />
              <div className="mt-5 flex items-center justify-between font-bold">
                <span>CHECK-IN RATE:</span>
                <span>75%</span>
              </div>
              <div className="mt-2 h-3 w-full rounded-full bg-white/70 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "75%",
                    background: "linear-gradient(90deg, #6b2fb5, #9b6fd6)",
                  }}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  up,
}: {
  label: string;
  value: string;
  up?: boolean;
}) {
  return (
    <div
      className="rounded-2xl px-5 py-4 text-[#15121c]"
      style={{ background: "rgba(214,209,224,0.92)" }}
    >
      <p className="text-[11px] tracking-wide text-gray-600">{label}</p>
      <p className="mt-1 text-2xl font-extrabold flex items-center gap-1">
        {value}
        {up && <span className="text-green-600 text-lg">↑up</span>}
      </p>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between font-bold leading-relaxed">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
