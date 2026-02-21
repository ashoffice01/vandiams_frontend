"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Collection {
  id: number;
  title: { rendered: string };
  slug: string;
  featured_image_url?: string;
  acf?: {
    link_url?: string;
  };
}

export default function Collections() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    async function fetchCollections() {
      const res = await fetch(
        "https://vandiams.com/cms/wp-json/wp/v2/collection?_embed"
      );
      const data = await res.json();

      const formatted = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        featured_image_url:
          item._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
        acf: item.acf,
      }));

      setCollections(formatted);
    }

    fetchCollections();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -width * 0.8 : width * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 relative">
        <h2 className="text-center tracking-widest text-xl mb-5">
          COLLECTIONS
        </h2>
        <p className="text-center tracking-widest text-md mb-5">
          “Discover thoughtfully curated collections, designed to celebrate modern elegance and personal expression.”
        </p>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-black flex items-center justify-center bg-white"
          >
            ←
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-black flex items-center justify-center bg-white"
          >
            →
          </button>

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
          >
            {collections.map((c, i) => (
              <Link
                key={c.id}
                href={c.acf?.link_url || `/collection/${c.slug}`}
                className={`relative flex-shrink-0 snap-start group
                  ${i === 0 ? "w-[75%]" : "w-[45%]"}
                `}
              >
                <div className="relative w-full h-[520px] overflow-hidden">
                  {c.featured_image_url && (
                    <Image
                      src={c.featured_image_url}
                      alt={c.title.rendered}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                <div className="absolute bottom-10 left-10 text-white">
                  <h3
                    className="font-serif text-3xl mb-4"
                    dangerouslySetInnerHTML={{
                      __html: c.title.rendered,
                    }}
                  />
                  <span className="text-sm tracking-widest border-b border-white pb-1">
                    SHOP NOW
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
