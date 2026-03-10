"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {

  const { items, removeFromCart, updateQuantity, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = items.reduce((sum, item) => {
    const price = Number(item.price.replace(/[^0-9.]/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const handleCheckout = async () => {

    if (!name || !email) {
      setError("Please fill in required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {

      const res = await fetch(
        "https://vandiams.com/cms/wp-json/store/v1/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            items,
            name,
            email,
            phone,
            address
          })
        }
      );

      const data = await res.json();

      if (data.success) {

        clearCart();
        window.location.href = "/success";

      } else {

        setError("Something went wrong. Please try again.");

      }

    } catch {

      setError("Server error. Please try again.");

    }

    setLoading(false);
  };

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

    <section className="max-w-6xl mx-auto px-6 py-24">

      <h1 className="font-serif text-4xl mb-12">
        Shopping Cart
      </h1>


      {/* CART TABLE */}

      <div className="border rounded-lg overflow-hidden">

        <div className="grid grid-cols-12 bg-gray-50 px-6 py-4 text-sm uppercase tracking-widest">

          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Subtotal</div>

        </div>

        {items.map((item) => {

          const price = Number(item.price.replace(/[^0-9.]/g, ""));
          const subtotal = price * item.quantity;

          return (

            <div
              key={item.cartId}
              className="grid grid-cols-12 items-center px-6 py-6 border-t"
            >

              {/* PRODUCT */}

              <div className="col-span-6 flex items-center gap-4">

                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />

                <div>

                  <h3 className="font-medium">
                    {item.name}
                  </h3>

                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="text-xs text-gray-500 hover:text-black mt-1"
                  >
                    Remove
                  </button>

                </div>

              </div>


              {/* PRICE */}

              <div className="col-span-2 text-center text-gray-600">

                ${price.toLocaleString()}

              </div>


              {/* QUANTITY */}

              <div className="col-span-2 flex justify-center">

                <div className="flex border rounded">

                  <button
                    className="px-3 py-1"
                    onClick={() =>
                      updateQuantity(item.cartId, item.quantity - 1)
                    }
                  >
                    −
                  </button>

                  <span className="px-4 py-1 border-x">
                    {item.quantity}
                  </span>

                  <button
                    className="px-3 py-1"
                    onClick={() =>
                      updateQuantity(item.cartId, item.quantity + 1)
                    }
                  >
                    +
                  </button>

                </div>

              </div>


              {/* SUBTOTAL */}

              <div className="col-span-2 text-right font-medium">

                ${subtotal.toLocaleString()}

              </div>

            </div>

          );

        })}

      </div>


      {/* CHECKOUT SECTION */}

      <div className="mt-16 grid md:grid-cols-2 gap-16">

        {/* CUSTOMER INFO */}

        <div>

          <h2 className="font-serif text-2xl mb-8">
            Customer Information
          </h2>

          <div className="space-y-5">

            <input
              required
              placeholder="Full Name"
              className="w-full border px-4 py-3"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <input
              required
              type="email"
              placeholder="Email Address"
              className="w-full border px-4 py-3"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <input
              placeholder="Phone Number"
              className="w-full border px-4 py-3"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />

            <textarea
              rows={3}
              placeholder="Shipping Address"
              className="w-full border px-4 py-3"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
            />

          </div>

        </div>


        {/* ORDER SUMMARY */}

        <div className="border p-8 h-fit">

          <h2 className="font-serif text-xl mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4 text-gray-600">

            <span>Subtotal</span>
            <span>${total.toLocaleString()}</span>

          </div>

          <div className="flex justify-between text-lg font-medium border-t pt-4">

            <span>Total</span>
            <span>${total.toLocaleString()}</span>

          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full mt-8 py-4 bg-black text-white text-sm uppercase tracking-widest"
          >
            {loading ? "Processing Order..." : "Place Order"}
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-4">
              {error}
            </p>
          )}

        </div>

      </div>

    </section>

  );

}