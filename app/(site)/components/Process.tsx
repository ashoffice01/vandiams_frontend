import { Sparkles, Pencil, Gem } from "lucide-react";

const steps = [
  {
    title: "Design with AI",
    text: "Upload inspiration or start from scratch with AI guidance.",
    icon: Sparkles,
  },
  {
    title: "Refine & Visualize",
    text: "See your design evolve in real-time 3D previews.",
    icon: Pencil,
  },
  {
    title: "Crafted to Perfection",
    text: "Expert jewelers bring your vision to life responsibly.",
    icon: Gem,
  },
];

export default function Process() {
  return (
    <section className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl text-center mb-20">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-6">
                  <Icon size={40} strokeWidth={1.2} />
                </div>
                <h3 className="font-serif text-xl mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
