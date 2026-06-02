"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserName, isLoggedIn, removeToken } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setUserName(getUserName());
  }, []);

  const handleLogout = () => {
    removeToken();
    setLoggedIn(false);
    setUserName("");
    router.push("/");
  };

  return (
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
  );
}