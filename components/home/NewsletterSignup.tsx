"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-evergreen rounded-2xl p-8 md:p-12 text-center">
      <h2 className="font-heading text-3xl text-offwhite mb-2">Stay Hungry</h2>
      <p className="text-offwhite/70 mb-6 max-w-md mx-auto">
        Get new recipes, restaurant recs, and lifestyle inspo delivered to your
        inbox.
      </p>

      {status === "success" ? (
        <p className="text-emerald font-semibold">
          You&apos;re in! Check your inbox.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-full px-5 py-3 text-sm bg-offwhite text-evergreen placeholder:text-evergreen/40 focus:outline-none focus:ring-2 focus:ring-emerald"
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Joining..." : "Subscribe"}
          </Button>
        </form>
      )}

      {status === "error" && (
        <p className="text-bubblegum text-sm mt-3">
          Something went wrong. Please try again.
        </p>
      )}
    </section>
  );
}
