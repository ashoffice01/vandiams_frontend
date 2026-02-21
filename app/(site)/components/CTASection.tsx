import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative bg-neutral-900 py-24">
      <div className="absolute inset-0 bg-[url('/images/vandiams-footer-bg.jpg')] bg-cover bg-center opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h2 className="font-serif text-4xl mb-6">
          Create Something Truly Yours
        </h2>
        <p className="text-gray-300 mb-10">
          Begin your custom jewelry journey with AI.
        </p>

        <Link
          href="/custom"
          className="inline-block px-12 py-4 bg-white text-black text-sm uppercase tracking-widest"
        >
          Start Designing
        </Link>
      </div>
    </section>
  );
}
