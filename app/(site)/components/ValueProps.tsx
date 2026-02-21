"use client";

import {
  Sparkles,
  Leaf,
  Box,
  DollarSign,
} from "lucide-react";

const items = [
  {
    title: "Client-Created Designs",
    text: "Every piece starts with your vision, refined by AI and perfected by artisans.",
    icon: Sparkles,
  },
  {
    title: "Ethically Sourced",
    text: "Lab-grown diamonds with full transparency and sustainability.",
    icon: Leaf,
  },
  {
    title: "Real-Time 3D Design",
    text: "Visualize your jewelry instantly with AI-powered previews.",
    icon: Box,
  },
  {
    title: "Transparent Pricing",
    text: "No middlemen. No markups. Just honest luxury.",
    icon: DollarSign,
  },
];

export default function ValueProps() {
  return (
    <section className="relative bg-white/70 py-28">
      {/* subtle divider line */}
           <div className="max-w-7xl mx-auto px-6">
        {/* Optional heading */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            A New Way to Create Jewelry
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Technology, craftsmanship, and responsibility—working together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group text-center transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-black transition">
                    <Icon size={26} strokeWidth={1.3} />
                  </div>
                </div>

                {/* Text */}
                <h3 className="font-serif text-lg mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
