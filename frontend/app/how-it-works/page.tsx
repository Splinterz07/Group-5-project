"use client";
import Link from "next/link";
import Navbar from "@/app/_components/Navbar";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

export default function HowItWorksPage() {
  const attendeeSteps: Step[] = [
    {
      number: 1,
      title: "Discover Events",
      description: "Browse through our extensive collection of events tailored to your interests",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      details: [
        "Search by event type, location, or date",
        "Filter by price range and availability",
        "Read reviews from other attendees",
        "Save favorites for later",
      ],
    },
    {
      number: 2,
      title: "Select Your Tickets",
      description: "Choose the number of tickets and ticket type that suits your needs",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m-4 0v2m4 0a2 2 0 110 4H9m6 0a2 2 0 110 4m0-11V3m0 2.25A6.75 6.75 0 0121 12a6.75 6.75 0 01-6 6.75M15 21H9a6 6 0 01-6-6V5a6 6 0 016-6h6a6 6 0 016 6v12a6 6 0 01-6 6z" />
        </svg>
      ),
      details: [
        "View detailed ticket options",
        "Check real-time availability",
        "Compare different seating areas",
        "See pricing breakdown",
      ],
    },
    {
      number: 3,
      title: "Secure Payment",
      description: "Complete your booking with our safe and encrypted payment system",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      details: [
        "Multiple payment options available",
        "SSL-encrypted transactions",
        "Instant confirmation",
        "Flexible cancellation policies",
      ],
    },
    {
      number: 4,
      title: "Get Your Tickets",
      description: "Receive your digital tickets via email and download them to your device",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      details: [
        "Instant email delivery",
        "Digital and mobile tickets",
        "Barcode/QR code included",
        "Access via Bookify account",
      ],
    },
    {
      number: 5,
      title: "Attend the Event",
      description: "Show your ticket at the venue entrance and enjoy the experience",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      details: [
        "Arrive early for smooth entry",
        "Present your ticket at gate",
        "Enjoy the event",
        "Share your experience",
      ],
    },
    {
      number: 6,
      title: "Share Your Review",
      description: "Help other event-goers by sharing your experience and rating",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      details: [
        "Rate your experience",
        "Write detailed reviews",
        "Upload photos/videos",
        "Help the community",
      ],
    },
  ];

  const organizerSteps: Step[] = [
    {
      number: 1,
      title: "Create Your Account",
      description: "Sign up as an event organizer and verify your details",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      details: [
        "Complete registration form",
        "Verify email address",
        "Set up payment details",
        "Upload organization logo",
      ],
    },
    {
      number: 2,
      title: "Create an Event",
      description: "Add all the details about your event - dates, location, pricing, etc.",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      details: [
        "Fill event information",
        "Set date and time",
        "Define ticket types & pricing",
        "Upload event images/videos",
      ],
    },
    {
      number: 3,
      title: "Configure Ticketing",
      description: "Set up ticket categories, quantities, and pricing tiers",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      details: [
        "Early bird pricing",
        "VIP vs standard tickets",
        "Group discounts",
        "Limited quantity control",
      ],
    },
    {
      number: 4,
      title: "Launch Your Event",
      description: "Publish your event and start selling tickets immediately",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      details: [
        "Make event live",
        "Appear in search results",
        "Share event link",
        "Start receiving bookings",
      ],
    },
    {
      number: 5,
      title: "Manage Sales",
      description: "Track ticket sales, attendee information, and event metrics in real-time",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      details: [
        "Real-time sales dashboard",
        "Attendee list management",
        "Revenue analytics",
        "Export reports",
      ],
    },
    {
      number: 6,
      title: "Execute & Analyze",
      description: "Run your event smoothly and review performance after it concludes",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7 12a5 5 0 1110 0 5 5 0 01-10 0z" />
        </svg>
      ),
      details: [
        "On-site check-in tools",
        "Post-event analytics",
        "Attendee feedback",
        "Plan next event",
      ],
    },
  ];

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">How Bookify Works</h1>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto">
            Whether you're attending or organizing, we make it easy for everyone
          </p>
        </div>
      </section>

      {/* ── FOR ATTENDEES ── */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">For Attendees</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Booking your next event is simple and straightforward with Bookify. Follow these easy steps to secure your tickets.
          </p>

          <div className="space-y-8">
            {attendeeSteps.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 border-2 border-purple-600">
                    <span className="text-2xl font-bold text-purple-600">{step.number}</span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-shrink-0">{step.icon}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA for Attendees */}
          <div className="mt-12 text-center">
            <Link
              href="/events"
              className="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
            >
              Start Exploring Events
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOR ORGANIZERS ── */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">For Event Organizers</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Selling tickets has never been easier. Set up your event and start accepting bookings in minutes.
          </p>

          <div className="space-y-8">
            {organizerSteps.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 border-2 border-purple-600">
                    <span className="text-2xl font-bold text-purple-600">{step.number}</span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-shrink-0">{step.icon}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA for Organizers */}
          <div className="mt-12 text-center">
            <Link
              href="/organizer/create"
              className="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
            >
              Create Your Event
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: "Is my payment information secure?",
                a: "Yes! All transactions are encrypted with SSL security and PCI-DSS compliant. We never store your full credit card information.",
              },
              {
                q: "Can I cancel or reschedule my booking?",
                a: "Yes, most events allow cancellations up to 7 days before the event. Refund policies vary by event, so check the event details for specifics.",
              },
              {
                q: "How will I receive my tickets?",
                a: "Digital tickets are sent to your email immediately after booking. You can also access them from your Bookify account dashboard.",
              },
              {
                q: "What if I lose my ticket?",
                a: "No problem! You can download your ticket again from your account at any time. Your booking is tied to your email address.",
              },
              {
                q: "How much does it cost to list an event?",
                a: "Basic event listing is free! We only take a small commission on each ticket sold, typically 2-5% depending on your plan.",
              },
              {
                q: "Can I sell tickets at different prices?",
                a: "Absolutely! You can create multiple ticket tiers with different prices, early bird offers, and group discounts.",
              },
            ].map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="flex items-center justify-between font-semibold text-gray-900 select-none">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </summary>
                <p className="text-gray-600 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="px-8 py-16 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-purple-100 mb-8">
            Join thousands of users already enjoying Bookify. Whether you're an attendee or organizer, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="inline-block px-8 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-colors"
            >
              Browse Events
            </Link>
            <Link
              href="/organizer/create"
              className="inline-block px-8 py-3 bg-purple-500 text-white font-semibold rounded-full hover:bg-purple-400 transition-colors border border-white"
            >
              Create an Event
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-gray-200 px-8 pt-12 pb-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-gray-200">
            <div>
              <span className="text-lg font-bold italic" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Bookify.com
              </span>
              <p className="text-gray-500 text-sm mt-1 mb-4 leading-relaxed">
                A ticketing platform for making memorable experience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
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
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Follow us</h4>
              <ul className="space-y-2 text-sm text-gray-500">
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
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
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
    </div>
  );
}
