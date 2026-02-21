import ProductCard from "../components/ProductCard";

const products = [
  {
    slug: "classic-solitaire-ring",
    name: "Classic Solitaire Ring",
    price: "$2,450",
    image: "/products/ring-1.jpg",
  },
  {
    slug: "oval-diamond-ring",
    name: "Oval Diamond Ring",
    price: "$3,100",
    image: "/products/ring-2.jpg",
  },
  {
    slug: "halo-engagement-ring",
    name: "Halo Engagement Ring",
    price: "$3,850",
    image: "/products/ring-3.jpg",
  },
];

export default function ProductsPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="font-serif text-4xl mb-12">
        Rings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
