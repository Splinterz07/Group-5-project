"use client";
import { useState, useCallback } from "react";
import { searchEvents } from "@/lib/api";

interface SearchEventsProps {
  /** Callback when search results are retrieved */
  onSearchResults?: (events: any[]) => void;
  /** Callback when search query changes - fires before API call */
  onSearchChange?: (query: string) => void;
  /** Callback after search is complete - fires after API call */
  onSearchComplete?: (query: string, results: any[]) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Visual theme variant - "light" for white backgrounds, "dark" for gray/black backgrounds */
  variant?: "light" | "dark";
  /** Whether to show a rounded-full style (pill-shaped) instead of rounded-lg */
  rounded?: "full" | "lg";
  /** Whether to show the clear button */
  showClearButton?: boolean;
  /** Whether to show the loading spinner */
  showLoadingSpinner?: boolean;
}

export default function SearchEvent({
  onSearchResults,
  onSearchChange,
  onSearchComplete,
  placeholder = "Search events...",
  className = "",
  variant = "light",
  rounded = "lg",
  showClearButton = true,
  showLoadingSpinner = true,
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
        onSearchComplete?.(searchQuery, []);
        setError("");
        return;
      }

      setIsSearching(true);
      setError("");

      try {
        const results = await searchEvents(searchQuery);
        onSearchResults?.(results);
        onSearchComplete?.(searchQuery, results);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Search failed";
        setError(errorMessage);
        onSearchResults?.([]);
        onSearchComplete?.(searchQuery, []);
      } finally {
        setIsSearching(false);
      }
    },
    [onSearchResults, onSearchChange, onSearchComplete]
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
    onSearchComplete?.("", []);
  };

  const inputClasses = {
    light: "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-600 focus:border-transparent",
    dark: "bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent",
  };

  const roundedClasses = {
    full: "rounded-full",
    lg: "rounded-lg",
  };

  const iconColor = {
    light: "text-gray-400",
    dark: "text-gray-500",
  };

  return (
    <div className={className}>
      <div className="relative">
        <div className={`flex items-center gap-3 px-4 py-3 ${inputClasses[variant]} ${roundedClasses[rounded]}`}>
          {/* Search Icon */}
          <svg
            className={`w-5 h-5 flex-shrink-0 ${iconColor[variant]}`}
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

          {/* Input Field */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={`flex-1 bg-transparent outline-none text-sm`}
          />

          {/* Clear Button */}
          {showClearButton && query && (
            <button
              onClick={handleClear}
              className={`flex-shrink-0 p-1 rounded transition-colors ${
                variant === "light"
                  ? "hover:bg-gray-100 text-gray-400"
                  : "hover:bg-gray-700 text-gray-400"
              }`}
              title="Clear search"
              type="button"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Loading Spinner */}
          {showLoadingSpinner && isSearching && (
            <div
              className={`flex-shrink-0 w-5 h-5 rounded-full border-2 border-transparent animate-spin ${
                variant === "light"
                  ? "border-t-purple-600 border-r-purple-600"
                  : "border-t-purple-500 border-r-purple-500"
              }`}
            />
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            className={`text-sm mt-2 ${
              variant === "light" ? "text-red-600" : "text-red-400"
            }`}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
