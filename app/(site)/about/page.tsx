export default function AboutPage() {
  return (
    <section
      className=" text-center relative bg-neutral-50"
      style={{
        backgroundImage: "url('/images/vandiams-about-bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[0px]" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 py-32">
        {/* Intro */}
        <div className="text-center">
          <span className="block text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">
            Our Story
          </span>

          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
            Modern Diamond Luxury
            <br />
            Responsibly Created
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600 text-[15px] leading-relaxed">
            Where refined design meets innovation, craftsmanship, and conscious
            luxury.
          </p>
        </div>

        {/* Story Content */}
        <div className="bg-white/70 backdrop-blur-sm rounded-sm p-10 md:p-16 shadow-sm space-y-10 text-gray-700 leading-relaxed text-[15px]">
          <p>
            VANDIAMS was born from a meeting of vision and design — where
            entrepreneurship meets artistry.
          </p>

          <p>
            Hanna Vu was born in Hanoi, Vietnam and moved to Miami more than ten
            years ago, building her international business journey. As a global
            entrepreneur, she is passionate about creating brands that combine
            beauty, quality, and accessibility.
          </p>

          <p>
            In Miami, she met French jewelry designer Vanessa Kakon and fell in
            love with her refined, contemporary design style. Her elegant and
            modern aesthetic became the creative foundation of the brand.
          </p>

          <p>
            Together, they created VANDIAMS to bring a new generation of diamond
            luxury to the market — through elevated design, certified lab-grown
            diamonds, and responsible craftsmanship.
          </p>

          <p className="font-medium text-gray-900">
            Modern Diamond Luxury · Responsibly Created
          </p>

          {/* Signature */}
          <div className="pt-10 text-sm text-gray-700">
            <p className="font-medium">Hanna Vu</p>
            <p className="font-medium">Vanessa Kakon</p>
            <p className="italic text-gray-500">
              Co-Founders · Miami
            </p>
          </div>
        </div>

      {/* Brand Cards Section */}
<div className="mt-5">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    {/* Card 1 */}
    <div className="bg-[#fbf9f7] border border-[#e7e1db] shadow-sm p-10 text-left">
      <p className="font-serif tracking-wide text-[#b59a6a] mb-6">
        VANDIAMS
      </p>

      <h3 className="font-serif text-lg mb-1">
        Hanna Vu
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Chief Executive Officer
      </p>

      <div className="text-sm text-gray-600 space-y-2">
        <p>Tel · +1 954 292 1717</p>
        <p>Email · hanna@vandiams.com</p>
        <p>Web · www.vandiams.com</p>
      </div>

      <div className="mt-8 h-[2px] w-12 bg-[#b59a6a]" />
    </div>

    {/* Card 2 */}
    <div className="bg-[#fbf9f7] border border-[#e7e1db] shadow-sm p-10 text-left">
      <p className="font-serif tracking-wide text-[#b59a6a] mb-6">
        VANDIAMS
      </p>

      <h3 className="font-serif text-lg mb-1">
        Vanessa Kakon
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        French Designer · Co-Founder
      </p>

      <div className="text-sm text-gray-600 space-y-2">
        <p>Tel · +1 796 246 9702</p>
        <p>Email · vanessa@vandiams.com</p>
        <p>Web · www.vandiams.com</p>
      </div>

      <div className="mt-8 h-[2px] w-12 bg-[#b59a6a]" />
    </div>

    {/* Card 3 */}
    <div className="bg-[#fbf9f7] border border-[#e7e1db] shadow-sm p-10 text-left">
      <p className="font-serif tracking-wide text-[#b59a6a] mb-6">
        VANDIAMS
      </p>

      <h3 className="font-serif text-lg mb-4">
        Lab-Grown Diamond Certificate
      </h3>

      <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600 mb-6">
        <p>Carat</p>
        <p className="text-right">1.50ct</p>

        <p>Cut</p>
        <p className="text-right">Ideal</p>

        <p>Clarity</p>
        <p className="text-right">VVS1</p>

        <p>Origin</p>
        <p className="text-right">Lab-Grown</p>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        Certified lab-grown diamond.
        Ethical sourcing · Conflict-free
      </p>

      <div className="mt-8 h-[2px] w-12 bg-[#b59a6a]" />
    </div>
  </div>
</div>


        {/* Values */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {[
            {
              title: "Elevated Design",
              text: "Refined, contemporary jewelry designed with timeless intention.",
            },
            {
              title: "Responsible Luxury",
              text: "Certified lab-grown diamonds with transparency and integrity.",
            },
            {
              title: "Crafted With Purpose",
              text: "Designed to celebrate individuality while honoring the planet.",
            },
          ].map((item) => (
            <div key={item.title} className="max-w-sm mx-auto">
              <h3 className="font-serif text-xl mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
