"use client";
import { useState } from "react";

interface NewsletterProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  variant?: "light" | "dark" | "gradient";
  onSubscribe?: (email: string) => void;
  className?: string;
}

export default function Newsletter({
  title = "Subscribe to Our Newsletter",
  subtitle = "Get the latest updates and exclusive offers delivered to your inbox.",
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  variant = "light",
  onSubscribe,
  className = "",
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage({ type: "error", text: "Please enter a valid email" });
      return;
    }

    setIsLoading(true);
    try {
      // Call the onSubscribe callback if provided
      onSubscribe?.(email);
      setMessage({ type: "success", text: "Thank you for subscribing!" });
      setEmail("");
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to subscribe. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const variants = {
    light: "bg-gray-50 border border-gray-200",
    dark: "bg-gray-800 border border-gray-700",
    gradient: "bg-gradient-to-r from-purple-600 to-purple-800",
  };

  const textClasses = {
    light: "text-gray-900",
    dark: "text-white",
    gradient: "text-white",
  };

  const subtitleClasses = {
    light: "text-gray-600",
    dark: "text-gray-400",
    gradient: "text-purple-100",
  };

  const inputClasses = {
    light: "bg-white border-gray-300 text-gray-900 placeholder-gray-500",
    dark: "bg-gray-700 border-gray-600 text-white placeholder-gray-400",
    gradient: "bg-white/20 border-white/30 text-white placeholder-white/60 focus:bg-white/30",
  };

  const buttonClasses = {
    light: "bg-purple-600 hover:bg-purple-700 text-white",
    dark: "bg-purple-600 hover:bg-purple-700 text-white",
    gradient: "bg-white hover:bg-purple-50 text-purple-600",
  };

  return (
    <div className={`${variants[variant]} ${className} rounded-lg p-8 md:p-12`}>
      <div className="max-w-2xl mx-auto">
        <h3 className={`text-2xl md:text-3xl font-bold ${textClasses[variant]} mb-2`}>
          {title}
        </h3>
        <p className={`${subtitleClasses[variant]} text-sm md:text-base mb-6`}>
          {subtitle}
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className={`flex-1 px-4 py-3 rounded border outline-none transition-all ${inputClasses[variant]} focus:ring-2 focus:ring-purple-500`}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 rounded font-semibold transition-all ${buttonClasses[variant]} disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap`}
          >
            {isLoading ? "Subscribing..." : buttonText}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <p className={`text-xs ${subtitleClasses[variant]} mt-4`}>
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
