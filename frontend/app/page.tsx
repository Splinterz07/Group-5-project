"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/app/_components/Navbar";
import SearchEvent from "@/app/_components/SearchEvents";
import Footer from "@/app/_components/Footer";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearchComplete = (query: string, results: any[]) => {
    if (query.trim()) {
      setSearchResults(results);
      setShowSearchResults(results.length > 0);
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  const handleViewEvent = (eventId: number) => {
    window.location.href = `/events/${eventId}`;
  };

  const handleSubscribeNewsletter = async (subscriberEmail: string) => {
    try {
      // TODO: Replace with actual API call to your backend
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: subscriberEmail })
      // });
      // if (!response.ok) throw new Error('Failed to subscribe');
      
      // For now, just simulate success
      console.log("Subscribed:", subscriberEmail);
    } catch (error) {
      throw new Error("Failed to subscribe to newsletter");
    }
  };

  return (
    <div className="min-h-screen font-sans">
      
      {/* ── NAVBAR ── */}
      <Navbar />


      {/* ── HERO ── */}
      <section className="relative h-[380px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hompage image.jpg')" }} />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex flex-col items-center gap-3 px-4 w-full max-w-xl text-center">
          <p className="text-purple-300 text-sm tracking-[0.3em] uppercase font-semibold">BOOKIFY</p>
          <h1 className="text-white text-3xl md:text-4xl font-bold tracking-widest uppercase leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            Find Your Next Experience
          </h1>
          <div className="relative w-full max-w-sm mt-2">
            <SearchEvent
              placeholder="search event"
              variant="light"
              rounded="full"
              onSearchComplete={handleSearchComplete}
            />
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
                {searchResults.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => handleViewEvent(event.id)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <p className="font-semibold text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── UNIQUE EXPERIENCE ── */}
      <section className="px-8 py-14 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight max-w-xs">
            There is a unique experience for everyone
          </h2>
          <p className="text-gray-500 text-sm max-w-xs md:pt-2 leading-relaxed">
            From talk shows to powertalks, Tech events, Movies and lots more.
          </p>
        </div>

        {/* Category Icons */}
        <div className="max-w-5xl mx-auto mt-12 flex items-center justify-between gap-4 flex-wrap">
          {[
            {
              label: "Community",
              svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
            },
            {
              label: "Movies",
              svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10"><rect x="2" y="3" width="20" height="18" rx="2"/><path strokeLinecap="round" d="M7 3v18M17 3v18M2 12h20M2 7h5M17 7h5M2 17h5M17 17h5"/></svg>,
            },
            {
              label: "Sports",
              svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/><path strokeLinecap="round" d="M2 12h20"/></svg>,
            },
            {
              label: "Food",
              svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>,
            },
            {
              label: "Wellness",
              svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>,
            },
          ].map((cat) => (
            <div key={cat.label} className="flex flex-col items-center gap-3 cursor-pointer group">
              <div className="w-20 h-20 rounded-full border-2 border-gray-200 group-hover:border-purple-400 transition-all flex items-center justify-center text-gray-600 group-hover:text-purple-600">
                {cat.svg}
              </div>
              <span className="text-sm text-gray-600 font-medium">{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANNING AN EVENT ── */}
      <section className="px-8 py-14 bg-gray-50 border-t border-gray-100 text-center">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900">Planning an event?</h3>
          <p className="text-xl font-bold text-gray-900">Selling tickets has never been easier!</p>
          <Link href="/organizer/create" className="mt-6 inline-block px-8 py-3 border-2 border-gray-400 text-gray-700 text-sm rounded-full hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all font-medium">
            Create an event
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer 
        email={email}
        onEmailChange={setEmail}
        onSubscribe={handleSubscribeNewsletter}
        showSubscribe={true}
        variant="light"
      />
    </div>
  );
}
