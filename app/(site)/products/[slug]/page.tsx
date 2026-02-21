import Image from "next/image";
import { notFound } from "next/navigation";
import { useCart } from "../../context/CartContext";

const products = {
  "classic-solitaire-ring": {
    name: "Classic Solitaire Ring",
    price: "$2,450",
    description:
      "A timeless solitaire ring featuring a lab-grown diamond set in 18k gold.",
    image: "/products/ring-1.jpg",
  },
  "oval-diamond-ring": {
    name: "Oval Diamond Ring",
    price: "$3,100",
    description:
      "Elegant oval-cut diamond ring designed for modern sophistication.",
    image: "/products/ring-2.jpg",
  },
  "halo-engagement-ring": {
    name: "Halo Engagement Ring",
    price: "$3,850",
    description:
      "Brilliant halo setting that maximizes sparkle and brilliance.",
    image: "/products/ring-3.jpg",
  },
};

/* ✅ Required for static export */
export async function generateStaticParams() {
  return Object.keys(products).map((slug) => ({
    slug,
  }));
}

export default function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const product = products[params.slug as keyof typeof products];

  if (!product) {
    notFound();
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16">
      <Image
        src={product.image}
        alt={product.name}
        width={600}
        height={600}
        className="w-full object-cover"
      />

      <ProductInfo
        slug={params.slug}
        product={product}
      />
    </section>
  );
}

/* ✅ Client component separated for cart */
function ProductInfo({
  slug,
  product,
}: {
  slug: string;
  product: {
    name: string;
    price: string;
    description: string;
    image: string;
  };
}) {
  "use client";

  const { addToCart } = useCart();

  return (
    <div>
      <h1 className="font-serif text-4xl">
        {product.name}
      </h1>

      <p className="mt-4 text-xl text-gray-700">
        {product.price}
      </p>

      <p className="mt-6 text-gray-600 leading-relaxed">
        {product.description}
      </p>

      <button
        className="mt-10 px-10 py-4 bg-black text-white text-sm tracking-widest uppercase"
        onClick={() =>
          addToCart({
            productId: slug,
            name: product.name,
            price: product.price,
            image: product.image,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}
