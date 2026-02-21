"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const slides = [
  {
    celebrity: "Sydney Sweeney",
    subtitle: "Wearing Solitaire Engagement Ring",
    productName: "Marquise Lab Grown Diamond Solitaire Engagement Ring",
    productImage: "/images/Sydney_Sweeney_product.jpg",
    heroImage:
      "/images/Sydney_Sweeney.jpg",
    href: "/products",
  },
  {
    celebrity: "Jennifer Lopez",
    subtitle: "Wearing Halo Engagement Ring",
    productName: "Round Halo Engagement Ring",
    productImage: "/images/Jennifer_Lopez_product.jpg",
    heroImage:
      "/images/Jennifer_Lopez.jpg",
    href: "/products",
  },
  {
    celebrity: "Selena Gomez",
    subtitle: "Wearing Cluster Huggies",
    productName: "Cluster Huggies",
    productImage: "/images/cel1_item.jpg",
    heroImage:
      "/images/cel1.jpg",
    href: "/products",
  },
  {
    celebrity: "Ariana Grande",
    subtitle: "Wearing Boundless Stars",
    productName: "Round Stud Earrings",
    productImage: "/images/Ariana_Grande_product.jpg",
    heroImage:
      "/images/Ariana_Grande.jpg",
    href: "/products",
  },
];

export default function CelebrityFeature() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  return (
    <section className="bg-[#faf9f7] py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* 12-column grid */}
        <div className="grid grid-cols-12 gap-5 md:gap-16 sm:gap-0 items-center">
          
          {/* LEFT — CONTENT (3 cols desktop) */}
          <div
            className="
              col-span-12 md:col-span-3
              order-2 md:order-1
              flex flex-col items-center md:items-start
              text-center md:text-left
              space-y-8
            "
          >
            {/* Name */}
            <div className="relative w-full text-center">
              <h2 className="font-serif text-2xl md:text-3xl mb-1">
                {slide.celebrity}
              </h2>
              <p className="text-gray-500 text-sm">
                {slide.subtitle}
              </p>
            </div>

            {/* Product */}
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <Image
                src={slide.productImage}
                alt={slide.productName}
                width={250}
                height={250}
                className="w-full object-contain"
              />

              <div  className="relative w-full text-center">
                <p className="text-sm mb-1">
                  {slide.productName}
                </p>
                <Link
                  href={slide.href}
                  className="text-xs tracking-widest uppercase border-b border-black pb-1"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT — IMAGE (9 cols desktop) */}
          <div
            className="
              col-span-12 md:col-span-9
              order-1 md:order-2
              relative
            "
          >
            <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden">
              <Image
                src={slide.heroImage}
                alt={slide.celebrity}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Navigation */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-3">
              <button
                onClick={() =>
                  setIndex((prev) =>
                    prev === 0 ? slides.length - 1 : prev - 1
                  )
                }
                className="w-9 h-9 md:w-10 md:h-10 border border-black flex items-center justify-center bg-white/80"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                onClick={() =>
                  setIndex((prev) =>
                    prev === slides.length - 1 ? 0 : prev + 1
                  )
                }
                className="w-9 h-9 md:w-10 md:h-10 border border-black flex items-center justify-center bg-white/80"
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
