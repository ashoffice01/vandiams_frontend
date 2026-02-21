import Link from "next/link";

export default function Hero() {
  const videoId = "6_J9GMgcIEE";

  return (
    <section className="relative w-full overflow-hidden min-h-[calc(100svh-72px)] md:min-h-screen">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <iframe
          className="
            absolute top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[300%] h-[300%]
            md:w-[200%] md:h-[200%]
            lg:w-[120%] lg:h-[120%]
            pointer-events-none
          "
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&playsinline=1&rel=0&modestbranding=1`}
          allow="autoplay; encrypted-media"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[calc(100svh-72px)] items-center justify-center px-6">
        <div className="max-w-3xl text-center text-white">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-6">
            Design Your Own Jewelry with AI
          </h1>

          <p className="text-base sm:text-lg text-gray-200 mb-10">
            Client-created • Ethical sourcing • Real-time AI design
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/custom"
              className="px-10 py-4 bg-white text-black text-sm uppercase tracking-widest"
            >
              Start Designing
            </Link>

            <Link
              href="/products"
              className="px-10 py-4 border border-white text-white text-sm uppercase tracking-widest"
            >
              Shop Best Sellers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
