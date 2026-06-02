"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";

export default function PrivacyPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const sections = [
    {
      id: "intro",
      title: "1. Introduction",
      content: `Bookify ("we", "us", "our", or "Company") operates the Bookify platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.

Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Platform. Your use of the Platform is governed by this Privacy Policy.`,
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      content: `We collect information in several ways:

Personal Information You Provide:
• Account registration information (name, email, phone number)
• Payment information (processed securely through third-party providers)
• Booking and transaction history
• Profile information and preferences
• Communication with our support team

Automatically Collected Information:
• Device information (type, operating system, browser)
• Log data (access times, pages visited, referrer pages)
• Location information (if permitted)
• Cookies and similar tracking technologies

Third-Party Information:
• Data from payment processors
• Information from event organizers about your bookings`,
    },
    {
      id: "use-of-information",
      title: "3. How We Use Your Information",
      content: `We use collected information for various purposes:

• Processing and fulfilling your bookings
• Sending transactional emails (tickets, confirmations, receipts)
• Providing customer support and responding to inquiries
• Sending promotional emails and newsletters (with your consent)
• Improving our Platform and services
• Preventing fraud and ensuring security
• Complying with legal obligations
• Analyzing usage patterns and trends
• Personalizing your experience
• Conducting market research and surveys`,
    },
    {
      id: "information-sharing",
      title: "4. Sharing Your Information",
      content: `We may share your information in the following circumstances:

With Event Organizers:
• Your name, email, and booking details are shared with event organizers for ticketing and event management

With Service Providers:
• Payment processors for secure transactions
• Email service providers for communications
• Analytics providers for service improvement

Legal Requirements:
• We may disclose information if required by law or to protect our rights

Business Transfers:
• If we are involved in a merger, acquisition, or bankruptcy, your information may be transferred as part of that transaction

Your Consent:
• We may share information with third parties when you explicitly consent`,
    },
    {
      id: "data-security",
      title: "5. Data Security",
      content: `We implement reasonable security measures to protect your personal information:

• SSL encryption for data in transit
• Secure password storage using hashing
• Regular security audits and updates
• Limited access to personal data
• Compliance with PCI-DSS standards for payment data
• Two-factor authentication options

However, no method of transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.`,
    },
    {
      id: "data-retention",
      title: "6. Data Retention",
      content: `We retain your personal information for as long as necessary to:

• Fulfill the purposes outlined in this Privacy Policy
• Comply with legal and regulatory requirements
• Maintain historical records of transactions

You can request deletion of your account and associated data at any time, subject to legal retention requirements. We will retain transaction records as required by law for financial and tax purposes.`,
    },
    {
      id: "cookies",
      title: "7. Cookies and Tracking Technologies",
      content: `We use cookies and similar tracking technologies to:

• Remember your preferences
• Understand how you use our Platform
• Improve your experience
• Display targeted advertisements

Types of cookies we use:
• Session cookies (deleted when you close your browser)
• Persistent cookies (remain on your device)
• Third-party cookies from analytics and advertising partners

You can control cookie settings through your browser preferences. Disabling cookies may limit some functionality of the Platform.`,
    },
    {
      id: "user-rights",
      title: "8. Your Rights",
      content: `Depending on your location, you may have the following rights:

• Right to access your personal information
• Right to correct inaccurate information
• Right to delete your information
• Right to opt-out of marketing communications
• Right to data portability
• Right to restrict processing
• Right to withdraw consent

To exercise any of these rights, please contact us at privacy@bookify.com with your request and proof of identity.`,
    },
    {
      id: "third-party-links",
      title: "9. Third-Party Links",
      content: `Our Platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party websites before providing personal information.`,
    },
    {
      id: "changes",
      title: "10. Changes to This Privacy Policy",
      content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of the Platform following notification of changes constitutes your acceptance of the updated Privacy Policy.`,
    },
    {
      id: "contact",
      title: "11. Contact Us",
      content: `If you have questions about this Privacy Policy or our privacy practices, please contact us at:

Email: privacy@bookify.com
Address: Bookify Inc., [Your Address]
Phone: +1 (XXX) XXX-XXXX

We will respond to your inquiry within 30 business days.`,
    },
  ];

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative h-[250px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-purple-100">Last updated: June 2, 2026</p>
        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded">
            <p className="text-blue-800 text-sm leading-relaxed">
              <strong>Your privacy matters to us:</strong> We are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, and protect your data when using Bookify.
            </p>
          </div>

          <div className="space-y-4">
            {sections.map((section) => (
              <details
                key={section.id}
                className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:border-purple-300 transition-colors"
                open={expandedSections.has(section.id)}
                onToggle={(e) => {
                  const newExpanded = new Set(expandedSections);
                  if (e.currentTarget.open) {
                    newExpanded.add(section.id);
                  } else {
                    newExpanded.delete(section.id);
                  }
                  setExpandedSections(newExpanded);
                }}
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900 hover:bg-purple-50 transition-colors">
                  <span>{section.title}</span>
                  <svg
                    className={`w-5 h-5 text-purple-600 transition-transform ${
                      expandedSections.has(section.id) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-2 text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </div>
              </details>
            ))}
          </div>

          {/* Data Protection Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔒",
                title: "Secure",
                desc: "Your data is encrypted and protected with industry-leading security standards",
              },
              {
                icon: "👁️",
                title: "Transparent",
                desc: "We clearly explain what data we collect and how we use it",
              },
              {
                icon: "✋",
                title: "Controlled",
                desc: "You have full control over your personal information and preferences",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-purple-50 border border-purple-200 rounded-lg p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Privacy Concerns?</h3>
            <p className="text-gray-600 mb-4">
              We take your privacy seriously. If you have concerns about how we handle your data, please contact us.
            </p>
            <Link
              href="mailto:privacy@bookify.com"
              className="inline-block px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Contact Privacy Team
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer variant="light" showSubscribe={false} />
    </div>
  );
}
