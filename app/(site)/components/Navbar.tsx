"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Navbar */}
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="VANDIAMS"
            width={160}
            height={50}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-7 text-sm uppercase tracking-widest">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>

          {/* Shop Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button className="hover:text-gray-600 transition">
              Shop
            </button>

            {shopOpen && (
              <div className="absolute left-0 top-full w-[720px] bg-white border shadow-xl p-10 grid grid-cols-3 gap-10">
                {/* Engagement Rings */}
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-widest mb-4">
                    Engagement Rings
                  </h4>
                  <ul className="space-y-3 text-sm normal-case">
                    <li><Link href="/products?category=solitaire">Solitaire</Link></li>
                    <li><Link href="/products?category=halo">Halo</Link></li>
                    <li><Link href="/products?category=oval">Oval Cut</Link></li>
                    <li>
                      <Link
                        href="/products"
                        className="text-xs uppercase tracking-widest"
                      >
                        View All →
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Fine Jewelry */}
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-widest mb-4">
                    Fine Jewelry
                  </h4>
                  <ul className="space-y-3 text-sm normal-case">
                    <li><Link href="/products?category=earrings">Earrings</Link></li>
                    <li><Link href="/products?category=bracelets">Bracelets</Link></li>
                    <li><Link href="/products?category=necklaces">Necklaces</Link></li>
                  </ul>
                </div>

                {/* Featured */}
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-widest mb-4">
                    Featured
                  </h4>
                  <ul className="space-y-3 text-sm normal-case">
                    <li><Link href="/products?tag=best-sellers">Best Sellers</Link></li>
                    <li><Link href="/products?tag=new">New Arrivals</Link></li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <Link href="/custom">AI Design Studio</Link>
          <Link href="/how-it-works">How It Works</Link>         
          <Link href="#">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Account Icon */}
          <Link
            href="#"
            className="text-[#b59a6a] text-lg hidden md:flex items-center justify-center w-15 h-15 rounded-full text-gray-700 hover:text-black hover:bg-gray-100 transition"
            aria-label="Account"
          >
            <User size={18} strokeWidth={1.25} />
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="text-[#b59a6a] text-lg relative hidden md:flex items-center justify-center w-15 h-15 rounded-full text-gray-700 hover:text-black hover:bg-gray-100 transition"
            aria-label="Cart"
          >
            <ShoppingBag size={18} strokeWidth={1.25} />

            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          {[
            ["Home", "/"],
            ["About", "/about"],
            ["Shop", "/products"],
            ["AI Design Studio", "/custom"],
            ["How It Works", "/how-it-works"],       
            ["FAQ", "#"],
            ["Contact", "/contact"],
            ["Account", "#"],
            ["Cart", "/cart"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 border-b uppercase tracking-widest text-sm"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
