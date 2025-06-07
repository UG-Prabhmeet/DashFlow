"use client";

import React from "react";

export default function CTASection() {
  return (
    <section className="w-full bg-white py-16 flex flex-col items-center relative overflow-x-hidden">
      {/* Floating avatars */}
      <span className="absolute left-6 top-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-gray-300 rounded-full" />
        <span className="bg-black text-white border border-gray-200 rounded px-2 py-0.5 text-xs font-medium shadow">
          Kira
        </span>
      </span>
      <span className="absolute left-6 bottom-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-gray-300 rounded-full" />
        <span className="bg-black text-white border border-gray-200 rounded px-2 py-0.5 text-xs font-medium shadow">
          Ali
        </span>
      </span>
      <span className="absolute right-6 top-6 flex items-center gap-2">
        <span className="bg-black text-white border border-gray-200 rounded px-2 py-0.5 text-xs font-medium shadow">
          Mira
        </span>
        <span className="w-2 h-2 bg-gray-300 rounded-full" />
      </span>
      <span className="absolute right-6 bottom-6 flex items-center gap-2">
        <span className="bg-black text-white border border-gray-200 rounded px-2 py-0.5 text-xs font-medium shadow">
          Dev Team
        </span>
        <span className="w-2 h-2 bg-gray-300 rounded-full" />
      </span>

      {/* Headline & Subtext */}
      <h2 className="text-xl md:text-3xl font-bold text-center mb-2 mt-8 text-black">
        Manage Projects. Empower Teams.
      </h2>
      <p className="text-gray-500 text-center mb-6 max-w-xl text-base">
        DashFlow helps you ship faster, stay organized, and collaborate smarter — from startups to scale-ups.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="/onboarding">
          <button className="bg-black text-white px-6 py-2.5 rounded-lg font-medium text-base shadow hover:bg-gray-900 transition">
            Get Started Free
          </button>
        </a>
        <a href="mailto:contact@dashflow.dev">
          <button className="bg-white border border-gray-200 text-black px-6 py-2.5 rounded-lg font-medium text-base shadow hover:bg-gray-100 transition">
            Book a Demo
          </button>
        </a>
      </div>
    </section>
  );
}
