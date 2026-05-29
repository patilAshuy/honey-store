"use client";
import React, { useState } from "react";

type State = "idle" | "loading" | "success" | "error";

export default function NewsletterSection() {
  const [email, setEmail]   = useState("");
  const [state, setState]   = useState<State>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to subscribe");

      setState("success");
      setMessage(data.message || "Subscribed! 🎉 Check your inbox for your 15% off code.");
      setEmail("");
    } catch (err: any) {
      setState("error");
      setMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-primary-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-center text-white">
      {/* Decorative blur */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        <h2 className="text-4xl lg:text-5xl font-bold font-outfit">
          Join the Sweet Revolution
        </h2>
        <p className="text-primary-100 text-lg opacity-80">
          Subscribe and get <strong>15% off</strong> your first order. Stay updated on new harvests and limited editions.
        </p>

        {state === "success" ? (
          <div className="flex items-center justify-center gap-3 bg-white/10 border border-white/20 rounded-full px-8 py-4 text-white font-bold">
            <span>🍯</span>
            <span>{message}</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-80 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="w-full sm:w-auto px-10 py-4 bg-white text-primary-900 rounded-full font-bold hover:bg-primary-50 transition-colors shadow-xl disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {state === "loading"
                ? <><div className="w-4 h-4 border-2 border-primary-900 border-t-transparent rounded-full animate-spin" /> Subscribing...</>
                : "Subscribe"}
            </button>
          </form>
        )}

        {state === "error" && (
          <p className="text-red-300 text-sm">{message}</p>
        )}

        <p className="text-white/40 text-xs">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </div>
  );
}
