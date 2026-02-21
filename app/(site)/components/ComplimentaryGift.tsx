import Link from "next/link";

export default function ComplimentaryGift() {
  return (
    <section className="relative w-full my-10">
      {/* Banner Link */}
      <Link
        href="/special-offers"
        className="block relative"
      >
        {/* Desktop Image */}
        <img
          src="/images/home_banner.jpg"
          alt="Complimentary Diamond Stud Earrings"
          className="hidden md:block w-full h-auto object-cover"
        />

        {/* Mobile Image */}
        <img
          src="/images/home_banner_mobile.jpg"
          alt="Complimentary Diamond Stud Earrings"
          className="block md:hidden w-full h-auto object-cover"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-white text-2xl md:text-4xl font-serif tracking-wide">
            COMPLIMENTARY GIFT
          </h2>

          <p className="text-white mt-4 text-sm md:text-lg leading-relaxed">
            1/2 ct 14K White Gold Diamond Stud Earrings
            <br />
            *with purchase over $2,000+
          </p>
        </div>
      </Link>

      {/* Terms Link */}
      <div className="absolute bottom-4 right-6">
        <Link
          href="/special-offers"
          className="text-white text-xs md:text-sm underline hover:opacity-80"
        >
          *See Terms
        </Link>
      </div>
    </section>
  );
}
