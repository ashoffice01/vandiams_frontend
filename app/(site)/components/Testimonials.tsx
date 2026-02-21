"use client";

import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    name: "Carlo",
    date: "02/01/26",
    rating: 5,
    title: "Bought These For My Wife",
    text: "Bought these for my wife a while ago. She absolutely loves them and they've been a staple ever since. Excellent purchase!",
  },
  {
    name: "Carlo",
    date: "02/01/26",
    rating: 5,
    title: "Excellent Purchase!",
    text: "Ordered these a while ago and my wife absolutely loves them. It's been a favorite in her collection!",
  },
  {
    name: "George K.",
    date: "02/01/26",
    rating: 5,
    title: "Amazing Rose Gold Bracelet",
    text: "I bought this for my wife for Valentine's Day. She loved the look and quality. Highly recommend.",
  },
  {
    name: "Emily R.",
    date: "02/02/26",
    rating: 5,
    title: "Beautiful Quality",
    text: "Amazing craftsmanship and fast shipping. Will definitely purchase again.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-black text-sm">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate reviews for infinite effect
  const infiniteReviews = [...reviews, ...reviews];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrame: number;

    const autoScroll = () => {
      if (!isHovered) {
        slider.scrollLeft += 0.5;

        // Reset when halfway (infinite loop illusion)
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#f5f2ec] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-sm font-medium">
            Real Reviews From Real Customers
          </h3>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Stars count={4} />
              <span className="text-gray-600">5501 Reviews</span>
            </div>

            <a href="#" className="underline">
              See All Reviews
            </a>

            <div className="flex gap-2">
              <button onClick={() => scroll("left")}>‹</button>
              <button onClick={() => scroll("right")}>›</button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto no-scrollbar"
        >
          {infiniteReviews.map((review, i) => (
            <div
              key={i}
              className="min-w-[320px] bg-white rounded-lg p-6 shadow-sm border"
            >
              <div className="text-xs text-gray-400 text-right mb-4">
                {review.date}
              </div>

              <h4 className="font-medium">{review.name}</h4>

              <div className="mt-2">
                <Stars count={review.rating} />
              </div>

              <p className="mt-4 font-medium text-sm">
                {review.title}
              </p>

              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
