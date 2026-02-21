import Link from "next/link";

export default function GiftGuide() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-serif tracking-wide mb-12">
          GIFT GUIDE
        </h2>

        {/* Top 2 Large Tiles */}
        <div className="grid grid-cols-2 gap-6">
          {/* Quick Ship */}
          <div className="relative group overflow-hidden">
            <Link href="/products">
              <img
                src="/gift/quick-ship.jpg"
                alt="Quick Ship Gifts"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h3 className="text-lg md:text-2xl font-serif tracking-wide">
                  QUICK SHIP GIFTS
                </h3>

                <button className="mt-4 border border-white px-6 py-2 text-sm tracking-wider hover:bg-white hover:text-black transition">
                  SHOP NOW
                </button>
              </div>
            </Link>
          </div>

          {/* Essentials */}
          <div className="relative group overflow-hidden">
            <Link href="/products">
              <img
                src="/gift/essentials.jpg"
                alt="Essentials"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h3 className="text-lg md:text-2xl font-serif tracking-wide">
                  ESSENTIALS
                </h3>

                <button className="mt-4 border border-white px-6 py-2 text-sm tracking-wider hover:bg-white hover:text-black transition">
                  SHOP NOW
                </button>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom 3 Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {/* Under 1000 */}
          <Link
            href="/"
            className="group"
          >
            <div className="overflow-hidden">
              <img
                src="/gift/under-1000.jpg"
                alt="Gifts Under $1000"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-4 text-sm tracking-wide uppercase text-gray-700 group-hover:text-black">
              Gifts Under $1000
            </p>
          </Link>

          {/* For Her */}
          <Link
            href="/"
            className="group"
          >
            <div className="overflow-hidden">
              <img
                src="/gift/for-her.jpg"
                alt="Gifts For Her"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-4 text-sm tracking-wide uppercase text-gray-700 group-hover:text-black">
              Gifts For Her
            </p>
          </Link>

          {/* For Him */}
          <Link
            href="/"
            className="group"
          >
            <div className="overflow-hidden">
              <img
                src="/gift/for-him.jpg"
                alt="Gifts For Him"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-4 text-sm tracking-wide uppercase text-gray-700 group-hover:text-black">
              Gifts For Him
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
