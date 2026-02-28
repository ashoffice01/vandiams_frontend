"use client";

import Link from "next/link";
import { useRef } from "react";

const categories = [
  {
    title: "Engagement Rings",
    image: "/style/engagement.jpg",
    link: "/products",
  },
  {
    title: "Wedding Rings",
    image: "/style/wedding.jpg",
    link: "/products",
  },
  {
    title: "Earrings",
    image: "/style/earrings.jpg",
    link: "/products",
  },
  {
    title: "Bracelets",
    image: "/style/bracelets.jpg",
    link: "/products",
  },
  {
    title: "Necklaces & Pendants",
    image: "/style/necklaces.jpg",
    link: "/products",
  },
  {
    title: "Gemstones",
    image: "/style/gemstones.jpg",
    link: "/products",
  },
];

export default function ShopByStyle() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: dir === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#f5f2ec] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-serif tracking-wide mb-12">
          SHOP BY STYLE
        </h2>

        {/* Slider */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={cat.link}
                className="min-w-[280px] group"
              >
                <div className="overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <p className="mt-5 text-sm tracking-widest uppercase text-gray-700 group-hover:text-black transition">
                  {cat.title}
                </p>
              </Link>
            ))}
          </div>

          {/* Arrows */}
          <div className="flex justify-end gap-6 mt-6 text-xl">
            <button
              onClick={() => scroll("left")}
              className="text-gray-400 hover:text-black transition"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="text-black"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
