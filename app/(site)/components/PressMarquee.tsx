import Image from "next/image";

const logos = [
  { name: "Vogue", src: "/press/vogue.jpg" },
  { name: "Forbes", src: "/press/forbes.jpg" },
  { name: "Complex", src: "/press/complex.jpg" },
  { name: "Harper's Bazaar", src: "/press/bazaar.jpg" },
  { name: "Vanity Fair", src: "/press/forbes.jpg" },
  { name: "WWD", src: "/press/complex.jpg" },
  { name: "JCK", src: "/press/vogue.jpg" },
  { name: "Vanity Fair", src: "/press/forbes.jpg" },
  { name: "WWD", src: "/press/complex.jpg" },
  { name: "JCK", src: "/press/vogue.jpg" },
];

export default function PressMarquee() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Track */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-8 opacity-80 hover:opacity-100 transition"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={140}
                height={50}
                className="object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
