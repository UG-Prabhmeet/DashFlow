"use client";

import React from "react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Reliable Support",
      desc: "Our team is always ready to assist with setup, workflows, and scaling – no matter your stage.",
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#e6f0ff" />
          <path
            d="M7 17v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 7a5 5 0 0 0-5 5v2"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 7a5 5 0 0 1 5 5v2"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Streamlined Setup",
      desc: "From workspace creation to team management, DashFlow keeps everything clean and efficient.",
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="4" fill="#111" />
          <circle cx="12" cy="12" r="4" fill="#fff" />
        </svg>
      ),
    },
    {
      title: "Scales With You",
      desc: "Whether you're a solo founder or a fast-growing team, DashFlow adapts as you grow.",
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <rect x="4" y="10" width="16" height="10" rx="3" fill="#e6f0ff" />
          <path
            d="M8 10V8a4 4 0 1 1 8 0v2"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="15" r="1.5" fill="#2563eb" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-4 flex flex-col items-center">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-black">
        Why Teams Love DashFlow
      </h2>
      <p className="text-black text-center mb-10 max-w-xl">
        Trusted by over{" "}
        <span className="font-semibold">2,000+ fast-moving teams</span> to plan,
        execute, and grow without chaos.
      </p>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow border border-gray-100 flex flex-col items-center p-6 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2 text-black">
              {feature.title}
            </h3>
            <p className="text-black text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
