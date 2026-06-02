"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserName, isLoggedIn, isOrganizer, removeToken } from "@/lib/api";
import NavDropdown, { DropItem } from "./NavDropdown";

const eventItems: DropItem[] = [
  { label: "Browse Events", href: "/events" },
  { label: "Book a Ticket", href: "/booking-page" },
];

const moreItems: DropItem[] = [
  { label: "Book a Ticket", href: "/booking-page" },
  { label: "My Tickets", href: "/my-tickets" },
  { label: "Upcoming Tickets", href: "/upcoming-tickets" },
  { label: "Past Tickets", href: "/past-tickets" },
  { label: "Cancelled Tickets", href: "/cancelled-tickets" },
  { label: "Checkout", href: "/checkout" },
];

const organizerItems: DropItem[] = [
  { label: "Create Event", href: "/organizer/create" },
  { label: "Organizer Dashboard", href: "/organizer-dashboard" },
  { label: "Attendee List", href: "/attendee-list" },
];

export default function DarkNavbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [organizer, setOrganizer] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setUserName(getUserName());
    setOrganizer(isOrganizer());
  }, []);

  const handleLogout = () => {
    removeToken();
    setLoggedIn(false);
    setUserName("");
    setOrganizer(false);
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-950 border-b border-gray-800">
      <Link href="/" className="hover:text-white transition-colors">
        <span className="text-lg font-bold italic" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Bookify
        </span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
        <Link href="/home" className="hover:text-white transition-colors">Home</Link>
        <NavDropdown label="Event/Booking" items={eventItems} variant="dark" />
        <NavDropdown label="More" items={moreItems} variant="dark" />
        {organizer && <NavDropdown label="Organizer" items={organizerItems} variant="dark" />}
        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        <Link href="/profile" className="hover:text-white transition-colors">Profile</Link>
      </div>
      <div className="flex items-center gap-3">
        {loggedIn ? (
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
            <Link href="/signup-choice" className="px-4 py-1.5 border border-purple-500 text-white text-sm rounded hover:bg-purple-500/20 transition-all">
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
