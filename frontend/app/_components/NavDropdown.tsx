"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export interface DropItem {
  label: string;
  href: string;
}

export default function NavDropdown({
  label,
  items,
  variant = "light",
}: {
  label: string;
  items: DropItem[];
  variant?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerColor =
    variant === "dark"
      ? "text-gray-300 hover:text-white"
      : "text-gray-700 hover:text-purple-600";
  const menuBg =
    variant === "dark"
      ? "bg-gray-900 border-gray-800"
      : "bg-white border-gray-200";
  const itemColor =
    variant === "dark"
      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
      : "text-gray-700 hover:bg-purple-50 hover:text-purple-600";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 transition-colors ${triggerColor}`}
      >
        {label}
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div
          className={`absolute left-0 mt-2 min-w-[190px] rounded-lg border shadow-lg py-1 z-50 ${menuBg}`}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 text-sm transition-colors ${itemColor}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
