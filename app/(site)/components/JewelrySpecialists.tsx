import Image from "next/image";
import Link from "next/link";

export default function JewelrySpecialists() {
    return (
        <section className="bg-[#f3f1ec] py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

                    {/* LEFT CONTENT — 3 columns */}
                    <div className="md:col-span-4 max-w-md">
                        <h2 className="font-serif text-4xl md:text-5xl leading-tight text-gray-800 mb-8">
                            Meet our <br /> jewelry <br /> specialists
                        </h2>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            Book a Complimentary Virtual or In-Person appointment at one of
                            our stores, and let our jewelry specialists guide you every step
                            of the way.
                        </p>

                        <Link
                            href="/contact"
                            className="inline-block border-b border-black text-sm tracking-widest uppercase pb-1 hover:opacity-70 transition"
                        >
                            Book An Appointment
                        </Link>
                    </div>

                    {/* RIGHT IMAGE — 9 columns */}
                    <div className="relative w-full h-[500px] md:h-[700px] md:col-span-8">
                        <Image
                            src="/specialists/store.jpg"
                            alt="Luxury jewelry store interior"
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* <div className="absolute top-12 left-12 text-white font-serif text-3xl md:text-4xl">
      17 Stores, One Experience
    </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
