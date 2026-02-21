"use client";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function ParallaxSection() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.3);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1599643477877-530eb83abc8e)",
          //transform: `translateY(${offset}px)`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-3xl text-center text-white">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Modern Diamond Luxury
          </h2>
          <p className="text-lg text-white-200">
            Designed with intention. Crafted responsibly. Powered by AI.
          </p>
          <p className="mt-20 text-lg text-white-200">
           <Link
              href="/custom"
              className="px-10 py-4 bg-white text-black text-sm uppercase tracking-widest"
            >
              Start Designing
            </Link>
            </p>
        </div>
      </div>
    </section>
  );
}
