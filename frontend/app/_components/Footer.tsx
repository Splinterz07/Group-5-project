"use client";
import Link from "next/link";
import { useState } from "react";

interface FooterProps {
  email?: string;
  onEmailChange?: (email: string) => void;
  onSubscribe?: (email: string) => Promise<void>;
  showSubscribe?: boolean;
  variant?: "light" | "dark";
}

export default function Footer({
  email = "",
  onEmailChange,
  onSubscribe,
  showSubscribe = true,
  variant = "light",
}: FooterProps) {
  const [localEmail, setLocalEmail] = useState(email);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalEmail(value);
    onEmailChange?.(value);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!localEmail.trim()) {
      setSubscribeMessage({ type: "error", text: "Please enter a valid email" });
      setTimeout(() => setSubscribeMessage(null), 3000);
      return;
    }

    setIsSubscribing(true);
    try {
      if (onSubscribe) {
        await onSubscribe(localEmail);
      }
      setSubscribeMessage({ type: "success", text: "Subscribed successfully!" });
      setLocalEmail("");
      setTimeout(() => setSubscribeMessage(null), 3000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to subscribe";
      setSubscribeMessage({ type: "error", text: errorMsg });
      setTimeout(() => setSubscribeMessage(null), 3000);
    } finally {
      setIsSubscribing(false);
    }
  };

  const bgClasses = {
    light: "bg-white border-t border-gray-200",
    dark: "bg-gray-900 border-t border-gray-800",
  };

  const textClasses = {
    light: "text-gray-900",
    dark: "text-white",
  };

  const secondaryTextClasses = {
    light: "text-gray-500",
    dark: "text-gray-400",
  };

  return (
    <footer className={`${bgClasses[variant]} px-8 pt-12 pb-6`}>
      <div className="max-w-5xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b ${variant === "light" ? "border-gray-200" : "border-gray-800"}`}>
          {/* Brand Section */}
          <div>
            <span className={`text-lg font-bold italic ${textClasses[variant]}`} style={{ fontFamily: "'Dancing Script', cursive" }}>
              Bookify.com
            </span>
            <p className={`${secondaryTextClasses[variant]} text-sm mt-1 mb-4 leading-relaxed`}>
              A ticketing platform for making memorable experience.
            </p>
            {showSubscribe && (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={localEmail}
                    onChange={handleEmailChange}
                    disabled={isSubscribing}
                    className={`flex-1 px-3 py-2 border rounded text-sm outline-none focus:border-purple-400 transition-all ${
                      variant === "light"
                        ? "bg-white border-gray-300"
                        : "bg-gray-800 border-gray-700 text-white"
                    }`}
                  />
                  <button 
                    type="submit"
                    disabled={isSubscribing}
                    className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-purple-600 hover:text-white transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? "..." : "Subscribe"}
                  </button>
                </div>
                {subscribeMessage && (
                  <p className={`text-xs font-medium ${
                    subscribeMessage.type === "success"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {subscribeMessage.text}
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Company Links */}
          <div>
            <h4 className={`font-semibold ${textClasses[variant]} mb-4`}>Company</h4>
            <ul className={`space-y-2 text-sm ${secondaryTextClasses[variant]}`}>
              <li>
                <Link href="/" className="hover:text-purple-600 transition-colors">
                  Homepage
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-purple-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-purple-600 transition-colors">
                  How Bookify works
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className={`font-semibold ${textClasses[variant]} mb-4`}>Follow us</h4>
            <ul className={`space-y-2 text-sm ${secondaryTextClasses[variant]}`}>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">
                  Tiktok
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${secondaryTextClasses[variant]}`}>
          <p>Copyright 2026 . All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-gray-600 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">
              Privacy policy
            </Link>
            <Link href="/refund" className="hover:text-gray-600 transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
