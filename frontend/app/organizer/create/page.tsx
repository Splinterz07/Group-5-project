"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/api";
import Navbar from "@/app/_components/Navbar";
import CreateEventForm from "@/app/_components/CreateEventForm";

export default function CreateEventPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Create Event</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Event</h1>
            <p className="text-gray-600">Fill in the details below to create and list your event on Bookify</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <CreateEventForm />
          </div>

          {/* Info Box */}
          <div className="mt-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-gray-900 mb-3">Tips for Creating a Successful Event</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Use a clear, descriptive title that tells people what your event is about</li>
              <li>✓ Write a detailed description so attendees know what to expect</li>
              <li>✓ Set a realistic price that reflects the value of your event</li>
              <li>✓ Choose the right date and time for your target audience</li>
              <li>✓ Ensure you have enough seats available to meet demand</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
