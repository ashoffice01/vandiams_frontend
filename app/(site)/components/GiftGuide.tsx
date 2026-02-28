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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          {/* Under 1000 */}
            <div className="relative group overflow-hidden">
            <Link href="/products">
              <img
               src="/gift/under-1000.jpg"
                alt="Essentials"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h3 className="text-lg md:text-2xl font-serif tracking-wide">
                    Gifts Under $1000
                </h3>

                <button className="mt-4 border border-white px-6 py-2 text-sm tracking-wider hover:bg-white hover:text-black transition">
                  SHOP NOW
                </button>
              </div>
            </Link>
          </div>
        

          {/* For Her */}
           <div className="relative group overflow-hidden">
            <Link href="/products">
              <img
               src="/gift/for-her.jpg"
                alt="Essentials"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h3 className="text-lg md:text-2xl font-serif tracking-wide">
                    Gifts For Her
                </h3>

                <button className="mt-4 border border-white px-6 py-2 text-sm tracking-wider hover:bg-white hover:text-black transition">
                  SHOP NOW
                </button>
              </div>
            </Link>
          </div>
          

          {/* For Him */}
          <div className="relative group overflow-hidden">
            <Link href="/products">
              <img
               src="/gift/for-him.jpg"
                alt="Essentials"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h3 className="text-lg md:text-2xl font-serif tracking-wide">
                    Gifts For Him
                </h3>

                <button className="mt-4 border border-white px-6 py-2 text-sm tracking-wider hover:bg-white hover:text-black transition">
                  SHOP NOW
                </button>
              </div>
            </Link>
          </div>
         
        </div>
      </div>
    </section>
  );
}
