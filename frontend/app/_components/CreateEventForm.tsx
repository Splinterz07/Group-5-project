"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent, isLoggedIn } from "@/lib/api";

interface CreateEventFormProps {
  onSuccess?: () => void;
  isModal?: boolean;
}

export default function CreateEventForm({ onSuccess, isModal = false }: CreateEventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    totalSeats: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }

    // Validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.location ||
      !formData.totalSeats ||
      !formData.price
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createEvent({
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        totalSeats: Number(formData.totalSeats),
        price: Number(formData.price),
      });

      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        totalSeats: "",
        price: "",
      });

      if (onSuccess) {
        onSuccess();
      } else {
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  if (success && !isModal) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Created Successfully! 🎉</h2>
        <p className="text-gray-600 mb-6">Your event has been created and is now live. Redirecting you...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="px-4 py-3 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {success && isModal && (
        <div className="px-4 py-3 bg-green-100 border border-green-400 rounded-lg text-green-700 text-sm">
          Event created successfully!
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Music Festival 2026"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your event..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Lagos, Nigeria"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Seats *</label>
          <input
            type="number"
            name="totalSeats"
            value={formData.totalSeats}
            onChange={handleChange}
            placeholder="500"
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price (₦) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="5000"
            min="0"
            step="100"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all disabled:opacity-70"
      >
        {loading ? "Creating Event..." : "Create Event"}
      </button>
    </form>
  );
}
