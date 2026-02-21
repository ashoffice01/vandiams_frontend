import Image from "next/image";
import Link from "next/link";

type Product = {
  slug: string;
  name: string;
  price: string;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    // <Link href={`/products/${product.slug}`} className="group block">
    <Link href={`/`} className="group block">
      <div className="overflow-hidden bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-[360px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-sm font-medium tracking-wide">
          {product.name}
        </h3>
        <p className="mt-1 text-gray-600 text-sm">
          {product.price}
        </p>
      </div>
    </Link>
  );
}
