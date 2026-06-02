"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "user" | "organizer";

export default function SignUp() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("user");

  const handleContinue = () => {
    router.push(role === "organizer" ? "/signup-organizer" : "/signup");
  };

  return (
    <div
      className="min-h-screen w-full font-sans relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #3a2160 0%, #241141 45%, #1c0d34 100%)" }}
    >
      {/* background image — replace src with your exported Figma asset */}
      <img
        src="/signup-bg.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
      />

      <div className="relative">
        <nav className="px-8 py-3">
          <span
            className="text-2xl text-white italic"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            Bookify
          </span>
        </nav>

        <main className="flex justify-center px-6 py-8">
          <div
            className="w-full max-w-lg rounded-[28px] px-10 py-9 shadow-2xl"
            style={{ background: "rgba(206,201,216,0.92)" }}
          >
            <h1 className="text-center text-3xl font-extrabold text-[#15121c]">
              CREATE YOUR ACCOUNT
            </h1>
            <p className="mt-1 text-center text-[14px] text-[#3a3340]">
              Sign up to start booking or hosting events.
            </p>

            {/* Role selection */}
            <p className="mt-6 mb-2 text-[14px] font-bold text-[#15121c]">
              I am signing up as:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <RoleCard
                title="User"
                desc="Discover & book events"
                active={role === "user"}
                onClick={() => setRole("user")}
                icon={
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6z" />
                }
              />
              <RoleCard
                title="Organizer"
                desc="Create & manage events"
                active={role === "organizer"}
                onClick={() => setRole("organizer")}
                icon={
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h2v2H9V9zm4 0h2v2h-2V9zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z" />
                }
              />
            </div>

            <button
              onClick={handleContinue}
              className="mt-6 w-full rounded-full bg-[#6b2fb5] py-3 text-[14px] font-bold text-white hover:bg-[#5a279c] transition"
            >
              CONTINUE
            </button>

            <p className="mt-6 text-center text-[13px] text-[#3a3340]">
              Already have an account?{" "}
              <a href="/login" className="font-bold text-[#6b2fb5] underline">
                Log in
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

function RoleCard({
  title,
  desc,
  active,
  onClick,
  icon,
}: {
  title: string;
  desc: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center rounded-2xl px-4 py-5 text-center transition ${
        active
          ? "bg-white ring-2 ring-[#6b2fb5]"
          : "bg-white/50 ring-1 ring-transparent hover:bg-white/70"
      }`}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        stroke={active ? "#6b2fb5" : "#3a3340"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </svg>
      <span className="mt-2 font-bold text-[#15121c]">{title}</span>
      <span className="text-[12px] text-[#3a3340]">{desc}</span>
    </button>
  );
}
