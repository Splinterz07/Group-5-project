"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserName, isLoggedIn, isOrganizer, removeToken } from "@/lib/api";
import { useRouter } from "next/navigation";
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

export default function Navbar() {
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
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <div>
        <Link href="/" className="hover:text-purple-600 transition-colors">
          <span className="text-xl font-bold italic" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Bookify
          </span>
        </Link>
        <p className="text-xs text-gray-500">Discover. Book. Experience.</p>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
        <Link href="/home" className="hover:text-purple-600 transition-colors">Home</Link>
        <NavDropdown label="Event/Booking" items={eventItems} variant="light" />
        <NavDropdown label="More" items={moreItems} variant="light" />
        {organizer && <NavDropdown label="Organizer" items={organizerItems} variant="light" />}
        <Link href="/blog" className="hover:text-purple-600 transition-colors">Blog</Link>
        <Link href="/contact" className="hover:text-purple-600 transition-colors">Contact</Link>
        <Link href="/profile" className="hover:text-purple-600 transition-colors">Profile</Link>
      </div>
      <div className="flex items-center gap-3">
        {loggedIn ? (
          <>
            <span className="text-sm font-medium text-gray-700">Hi, {userName}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-full hover:bg-purple-700 transition-all"
            >
              LOG OUT
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Log In
            </Link>
            <Link href="/signup-choice" className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-full hover:bg-purple-700 transition-all">
              SIGN UP
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
