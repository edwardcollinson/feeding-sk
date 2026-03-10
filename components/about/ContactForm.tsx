"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const inquiryTypes = [
  "Brand Collaboration",
  "Recipe Feature",
  "Event / Partnership",
  "General Inquiry",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-emerald/10 rounded-2xl p-8 text-center">
        <h3 className="font-heading text-2xl text-evergreen mb-2">
          Message Sent!
        </h3>
        <p className="text-evergreen/70">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-evergreen mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-xl border border-evergreen/20 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-evergreen mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-xl border border-evergreen/20 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-evergreen mb-1">
          Company (optional)
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full rounded-xl border border-evergreen/20 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="inquiryType" className="block text-sm font-medium text-evergreen mb-1">
          Inquiry Type
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          required
          className="w-full rounded-xl border border-evergreen/20 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent"
        >
          <option value="">Select one...</option>
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-evergreen mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-evergreen/20 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent resize-none"
        />
      </div>

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>

      {status === "error" && (
        <p className="text-bubblegum text-sm">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
