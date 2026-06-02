"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";

export default function RefundPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections = [
    {
      id: "overview",
      title: "1. Refund Policy Overview",
      content: `Bookify is committed to ensuring customer satisfaction. Our refund policy is designed to be fair to both attendees and event organizers while protecting the integrity of our platform.

This policy outlines the circumstances under which refunds are issued and the procedures for requesting a refund. Please read this carefully before booking your tickets.`,
    },
    {
      id: "general-refunds",
      title: "2. General Refund Policy",
      content: `Refund eligibility depends on the specific event's refund policy set by the event organizer:

Refundable Tickets:
• Refunds are available if requested before the refund deadline (typically 7-14 days before the event)
• Refunds are processed to the original payment method
• Processing typically takes 5-10 business days after approval

Non-Refundable Tickets:
• Some events are marked as non-refundable at the time of booking
• No refunds are issued for non-refundable tickets under any circumstances (except as noted below)
• These tickets may still be transferable to another person

Each event listing clearly displays the refund policy before you complete your purchase.`,
    },
    {
      id: "event-cancellation",
      title: "3. Event Cancellation or Postponement",
      content: `If an event is cancelled or significantly postponed by the organizer:

• Full refunds are issued automatically
• Refunds are processed within 30 days of cancellation
• You will be notified by email of the cancellation
• If the event is rescheduled to a nearby date, you may choose:
  - Attend the rescheduled event
  - Transfer your ticket to another person
  - Request a full refund

Bookify will make reasonable attempts to notify attendees of cancellations, but it is your responsibility to check your email for updates.`,
    },
    {
      id: "partial-refunds",
      title: "4. Partial Refunds & Service Fees",
      content: `Refunds are calculated as follows:

• Ticket Price: Full refund of the ticket price
• Booking Fees: Non-refundable service fees charged by Bookify (typically 2-5%)
• Payment Processing Fees: Non-refundable fees charged by payment processors
• Transaction Fees: Non-refundable fees for secure transactions

Example:
If you paid ₦10,000 for a ticket with ₦500 booking fee:
Refund Amount = ₦10,000 (not including the ₦500 fee)`,
    },
    {
      id: "refund-process",
      title: "5. How to Request a Refund",
      content: `To request a refund, follow these steps:

1. Log into your Bookify account
2. Go to "My Bookings" or "Order History"
3. Find the booking you want to refund
4. Click "Request Refund" (if available)
5. Select your reason for the refund
6. Submit the request

Alternatively, you can:
• Email support@bookify.com with your booking reference
• Include reason for refund and any supporting documents
• Provide your original payment method details

Our team will review your request and respond within 5 business days.`,
    },
    {
      id: "refund-timeline",
      title: "6. Refund Processing Timeline",
      content: `The timeline for receiving your refund depends on several factors:

Approval Process: 1-5 business days
• We verify your request and the event's refund policy
• We confirm your account details and payment method

Processing: 5-10 business days
• We initiate the refund to your original payment method
• Bank processing may take additional time

Bank Processing: 3-7 business days
• Your bank processes the refund
• The exact timeline depends on your financial institution

Total Timeline: 10-30 business days

Note: Refunds are only issued during business hours. Weekend and holiday processing may be delayed.`,
    },
    {
      id: "special-circumstances",
      title: "7. Special Circumstances",
      content: `Full refunds are issued (regardless of refund policy) in these cases:

• Event cancelled or significantly changed by organizer
• Tickets purchased due to fraudulent activity
• Technical error in booking process
• Double-charged for the same ticket
• Tickets damaged or undeliverable
• Force majeure events (natural disasters, government action, etc.)

For these situations, contact support@bookify.com with proof and documentation.`,
    },
    {
      id: "no-refunds",
      title: "8. When Refunds Cannot Be Issued",
      content: `We cannot process refunds for:

• Personal reasons (changed mind, schedule conflict, lost interest)
• Attendee no-show at event
• Disputes over event quality or experience
• Duplicate refund requests for the same ticket
• Refund requests after the refund deadline has passed
• Lost or stolen tickets (transfer to another person instead)
• Tickets transferred to another person (refund available only from ticket recipient)

Exception: If you have a legitimate complaint about the event quality, contact us within 48 hours of the event with evidence.`,
    },
    {
      id: "disputes",
      title: "9. Dispute Resolution",
      content: `If you believe a refund was incorrectly denied:

1. Contact our support team at support@bookify.com with:
   - Your booking reference number
   - Detailed explanation of your dispute
   - Supporting documentation (screenshots, emails, etc.)

2. Appeal Process:
   - Our team reviews your appeal within 7 business days
   - We may request additional information
   - We'll provide a final decision within 14 business days

3. Further Resolution:
   - If you're unsatisfied with our decision, you may pursue it through:
   - Your payment provider's chargeback process
   - Applicable consumer protection agencies
   - Legal proceedings in your jurisdiction`,
    },
    {
      id: "transfers",
      title: "10. Ticket Transfers vs. Refunds",
      content: `Instead of requesting a refund, you can transfer your ticket to another person:

How to Transfer:
1. Go to your booking details
2. Select "Transfer Ticket"
3. Enter recipient's email address
4. Send transfer request
5. Recipient accepts the transfer
6. They receive the digital ticket

Benefits of Transferring:
• No waiting for refund processing
• Instant resolution
• Helps another person enjoy the event
• Supports the event organizer

Transferring is available for most events regardless of refund policy.`,
    },
    {
      id: "contact",
      title: "11. Contact & Support",
      content: `For refund-related questions or issues:

Email: support@bookify.com
Response Time: 1-2 business days

Phone: +1 (XXX) XXX-XXXX
Hours: Monday - Friday, 9 AM - 6 PM

Live Chat: Available on our website
Hours: Monday - Friday, 10 AM - 5 PM

Mailing Address:
Bookify Inc.
[Your Address]
[City, Country]

Please include your booking reference number in all inquiries for faster resolution.`,
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
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">Refund Policy</h1>
          <p className="text-purple-100">Last updated: June 2, 2026</p>
        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-12 rounded">
            <p className="text-green-800 text-sm leading-relaxed">
              <strong>Your satisfaction matters:</strong> We want you to feel confident when booking with Bookify. 
              This Refund Policy ensures a fair process for managing cancellations and refund requests.
            </p>
          </div>

          <div className="space-y-4">
            {sections.map((section) => (
              <details
                key={section.id}
                className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:border-purple-300 transition-colors"
                open={expandedSection === section.id}
                onToggle={() =>
                  setExpandedSection(
                    expandedSection === section.id ? null : section.id
                  )
                }
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900 hover:bg-purple-50 transition-colors">
                  <span>{section.title}</span>
                  <svg
                    className={`w-5 h-5 text-purple-600 transition-transform ${
                      expandedSection === section.id ? "rotate-180" : ""
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

          {/* Quick Reference */}
          <div className="mt-12 bg-purple-50 rounded-lg p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Reference Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "Refund Deadline",
                  value: "Typically 7-14 days before event",
                },
                {
                  label: "Processing Time",
                  value: "10-30 business days",
                },
                {
                  label: "Service Fees",
                  value: "Non-refundable",
                },
                {
                  label: "Cancellation by Organizer",
                  value: "Full refund issued",
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded p-4">
                  <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                  <p className="font-semibold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help with a Refund?</h3>
            <p className="text-gray-600 mb-4">
              Our support team is here to help! Reach out to us for any refund-related questions or concerns.
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
