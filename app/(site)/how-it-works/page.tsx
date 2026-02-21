import { Sparkles, Sliders, Gem, Truck } from "lucide-react";

const steps = [
  {
    title: "Choose or Design",
    text: "Browse curated collections or begin a custom journey using our AI-powered design studio.",
    icon: Sparkles,
  },
  {
    title: "Customize with AI",
    text: "Select diamond shape, metal, setting, and personal preferences — guided by intelligent design.",
    icon: Sliders,
  },
  {
    title: "Crafted by Experts",
    text: "Every design is refined and handcrafted by skilled jewelers using certified lab-grown diamonds.",
    icon: Gem,
  },
  {
    title: "Delivered to You",
    text: "Securely shipped with quality assurance, authenticity certification, and care packaging.",
    icon: Truck,
  },
];

export default function HowItWorksPage() {
  return (
    <section className="bg-neutral-50 py-20 mb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <span className="block text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">
            How It Works
          </span>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
            From Idea to Iconic
          </h1>
          <p className="text-gray-600 text-[15px] leading-relaxed">
            A seamless journey combining intelligent design, expert craftsmanship,
            and responsible luxury.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:grid grid-cols-4 gap-12 relative">
          {/* Line */}
          <div className="absolute top-12 left-0 right-0 h-px bg-gray-300" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="text-center relative">
                {/* Icon */}
                <div className="mx-auto w-16 h-16 rounded-full bg-white border border-gray-300 flex items-center justify-center mb-8 relative z-10">
                  <Icon size={22} strokeWidth={1.25} />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl mb-4">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Flow */}
        <div className="md:hidden space-y-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} strokeWidth={1.25} />
                </div>

                <div>
                  <h3 className="font-serif text-lg mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
