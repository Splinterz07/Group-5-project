"use client";
import { useState, useCallback } from "react";
import { searchEvents } from "@/lib/api";

interface SearchEventsProps {
  onSearchResults?: (events: any[]) => void;
  onSearchChange?: (query: string) => void;
  placeholder?: string;
  className?: string;
  variant?: "light" | "dark";
}

export default function SearchEvents({
  onSearchResults,
  onSearchChange,
  placeholder = "Search events...",
  className = "",
  variant = "light",
}: SearchEventsProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = useCallback(
    async (searchQuery: string) => {
      setQuery(searchQuery);
      onSearchChange?.(searchQuery);

      if (!searchQuery.trim()) {
        onSearchResults?.([]);
        setError("");
        return;
      }

      setIsSearching(true);
      setError("");

      try {
        const results = await searchEvents(searchQuery);
        onSearchResults?.(results);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Search failed");
        onSearchResults?.([]);
      } finally {
        setIsSearching(false);
      }
    },
    [onSearchResults, onSearchChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    setError("");
    onSearchChange?.("");
    onSearchResults?.([]);
  };

  const inputClasses = {
    light: "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent",
    dark: "bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent",
  };

  const containerClasses = {
    light: "bg-white",
    dark: "bg-gray-950",
  };

  return (
    <div className={`${containerClasses[variant]} ${className}`}>
      <div className="relative">
        <div className="flex items-center gap-3">
          <svg
            className={`w-5 h-5 flex-shrink-0 ${variant === "light" ? "text-gray-400" : "text-gray-500"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={`flex-1 px-4 py-3 rounded-lg outline-none ${inputClasses[variant]}`}
          />
          {query && (
            <button
              onClick={handleClear}
              className={`flex-shrink-0 p-1 rounded hover:${variant === "light" ? "bg-gray-100" : "bg-gray-800"} transition-colors`}
              title="Clear search"
            >
              <svg className={`w-5 h-5 ${variant === "light" ? "text-gray-400" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {isSearching && (
            <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 border-transparent ${variant === "light" ? "border-t-purple-600 border-r-purple-600" : "border-t-purple-500 border-r-purple-500"} animate-spin`} />
          )}
        </div>
        {error && (
          <p className={`text-sm mt-2 ${variant === "light" ? "text-red-600" : "text-red-400"}`}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
