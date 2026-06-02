"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";

export default function TermsPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: `By accessing and using Bookify (the "Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. We reserve the right to make changes to these Terms & Conditions at any time and without notice. Your continued use of the Platform following the posting of revised Terms & Conditions means that you accept and agree to the changes.`,
    },
    {
      id: "use-license",
      title: "2. Use License",
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on Bookify's Platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

• Modifying or copying the materials
• Using the materials for any commercial purpose or for any public display
• Attempting to decompile or reverse engineer any software contained on the Platform
• Removing any copyright or other proprietary notations from the materials
• Transferring the materials to another person or "mirroring" the materials on any other server
• Using the materials for any illegal purpose or in violation of any applicable law or regulation`,
    },
    {
      id: "disclaimer",
      title: "3. Disclaimer",
      content: `The materials on Bookify's Platform are provided on an 'as is' basis. Bookify makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, Bookify does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.`,
    },
    {
      id: "limitations",
      title: "4. Limitations of Liability",
      content: `In no event shall Bookify or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Bookify's Platform, even if Bookify or an authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.`,
    },
    {
      id: "accuracy",
      title: "5. Accuracy of Materials",
      content: `The materials appearing on Bookify's Platform could include technical, typographical, or photographic errors. Bookify does not warrant that any of the materials on its Platform are accurate, complete, or current. Bookify may make changes to the materials contained on its Platform at any time without notice. However, Bookify does not make any commitment to update the materials.`,
    },
    {
      id: "links",
      title: "6. Links",
      content: `Bookify has not reviewed all of the sites linked to its Platform and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Bookify of the site. Use of any such linked website is at the user's own risk. If you notice a link to an inappropriate site, please contact us so we may investigate and take appropriate action.`,
    },
    {
      id: "modifications",
      title: "7. Modifications",
      content: `Bookify may revise these Terms & Conditions for its Platform at any time without notice. By using this Platform, you are agreeing to be bound by the then current version of these Terms & Conditions.`,
    },
    {
      id: "governing-law",
      title: "8. Governing Law",
      content: `These Terms & Conditions and any separate agreements we provide to render services to you are governed by and construed in accordance with the laws of the jurisdiction in which Bookify operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.`,
    },
    {
      id: "user-accounts",
      title: "9. User Accounts",
      content: `When you create an account on Bookify, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account information and password, and you are responsible for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.`,
    },
    {
      id: "booking-terms",
      title: "10. Booking Terms",
      content: `• All bookings are subject to event availability
• Tickets are non-refundable unless otherwise stated by the event organizer
• Bookify reserves the right to cancel or reschedule events
• Users are responsible for verifying event details before booking
• Digital tickets are provided via email and must be presented at the event venue
• Lost or damaged tickets cannot be replaced without proof of purchase`,
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
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">Terms & Conditions</h1>
          <p className="text-purple-100">Last updated: June 2, 2026</p>
        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded">
            <p className="text-blue-800 text-sm leading-relaxed">
              <strong>Important:</strong> Please read these Terms & Conditions carefully before using Bookify. 
              By accessing and using our platform, you acknowledge that you have read, understood, and agree to be bound by all the terms below.
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

          {/* Contact Section */}
          <div className="mt-12 bg-purple-50 border border-purple-200 rounded-lg p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Questions About Our Terms?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms & Conditions, please don't hesitate to contact us.
            </p>
            <Link
              href="mailto:support@bookify.com"
              className="inline-block px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer variant="light" showSubscribe={false} />
    </div>
  );
}
