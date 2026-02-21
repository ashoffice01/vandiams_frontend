"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeFromCart } = useCart();

  const total = items.reduce((sum, item) => {
    const price = Number(item.price.replace(/[^0-9.]/g, ""));
    return sum + price;
  }, 0);

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-4xl mb-6">Your Cart</h1>
        <p className="text-gray-600 mb-10">
          Your cart is currently empty.
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-4 bg-black text-white text-sm tracking-widest uppercase"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="font-serif text-4xl mb-12">Your Cart</h1>

      <div className="space-y-8">
        {items.map((item) => (
          <div
            key={item.cartId}
            className="flex items-center gap-6 border-b pb-6"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
              className="object-cover"
            />

            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>
             <button
  className="mt-2 text-xs uppercase tracking-widest text-gray-500 hover:text-black"
  onClick={() => removeFromCart(item.cartId)}
>
  Remove
</button>

            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xl">
          Total: <span className="font-medium">${total.toLocaleString()}</span>
        </p>

        <button
  className="px-10 py-4 bg-black text-white text-sm tracking-widest uppercase"
  onClick={async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();
    window.location.href = data.url;
  }}
>
  Proceed to Checkout
</button>

      </div>
    </section>
  );
}
