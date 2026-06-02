"use client";
import Link from "next/link";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  icon: React.ReactNode;
}

export default function AboutPage() {
  const teamMembers: TeamMember[] = [
    {
      name: "Vision",
      role: "Our Mission",
      bio: "To revolutionize event ticketing by making it accessible, transparent, and enjoyable for everyone.",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      name: "Values",
      role: "What We Believe",
      bio: "Integrity, innovation, and community are at the heart of everything we do. We're committed to creating memorable experiences.",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: "Innovation",
      role: "Our Approach",
      bio: "We leverage cutting-edge technology to simplify event discovery, booking, and management for attendees and organizers alike.",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5.657 5.657l-.707.707M9 19.414l-.707-.707M19 4.414l-.707.707" />
        </svg>
      ),
    },
  ];

  const stats = [
    { label: "Events Listed", value: "1000+" },
    { label: "Active Users", value: "50K+" },
    { label: "Tickets Sold", value: "100K+" },
    { label: "Countries", value: "5+" },
  ];

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">About Bookify</h1>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto">
            Empowering experiences through technology and community
          </p>
        </div>
      </section>

      {/* ── STORY SECTION ── */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Bookify was founded with a simple yet powerful vision: to make event discovery and ticketing effortless 
              for everyone. In a world where events bring people together, we saw an opportunity to simplify the process 
              and make it more accessible to all.
            </p>
            <p>
              What started as a small project has grown into a comprehensive platform serving thousands of users across 
              multiple countries. We partner with event organizers, venues, and communities to showcase unique experiences 
              that create lasting memories.
            </p>
            <p>
              Today, Bookify stands as a trusted partner for both attendees seeking unforgettable experiences and organizers 
              looking to reach their audience efficiently. Our commitment to excellence and customer satisfaction drives 
              every decision we make.
            </p>
          </div>
        </div>
      </section>

      {/* ── VALUES SECTION ── */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-all text-center"
              >
                <div className="flex justify-center mb-4">{member.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-sm text-purple-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATISTICS SECTION ── */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-purple-600 mb-2">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM HIGHLIGHTS ── */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Bookify?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Diverse Event Library",
                description:
                  "From concerts to conferences, sports to wellness events, we offer a curated selection of experiences for every interest.",
                icon: "🎭",
              },
              {
                title: "Seamless Booking",
                description:
                  "Our intuitive platform makes finding and booking events as simple as a few clicks. No unnecessary complications.",
                icon: "✨",
              },
              {
                title: "Secure Transactions",
                description:
                  "Your payment information is protected with industry-leading security standards to ensure safe and secure transactions.",
                icon: "🔒",
              },
              {
                title: "Customer Support",
                description:
                  "Our dedicated support team is available to help you with any questions or issues throughout your experience.",
                icon: "💬",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="px-8 py-16 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-purple-100 mb-8">
            Discover thousands of events and book your next unforgettable experience today.
          </p>
          <Link
            href="/events"
            className="inline-block px-8 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-colors"
          >
            Browse Events
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer variant="light" showSubscribe={false} />
    </div>
  );
}
