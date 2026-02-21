"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  cartId: string;   // ✅ unique per row
  productId: string;
  name: string;
  price: string;
  image: string;
};


type CartContextType = {
  items: CartItem[];
addToCart: (item: Omit<CartItem, "cartId">) => void;

  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // ✅ Load cart on first render
useEffect(() => {
  const stored = localStorage.getItem("vandiams-cart");
  if (stored) {
    const parsed = JSON.parse(stored);

    const normalized = parsed.map((item: any) => ({
      cartId: item.cartId ?? crypto.randomUUID(),
      productId: item.productId ?? item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    }));

    setItems(normalized);
  }
}, []);


  // ✅ Save cart on change
  useEffect(() => {
    localStorage.setItem("vandiams-cart", JSON.stringify(items));
  }, [items]);

const addToCart = (item: Omit<CartItem, "cartId">) => {
  setItems((prev) => [
    ...prev,
    {
      ...item,
      cartId: crypto.randomUUID(), // ✅ unique
    },
  ]);
};

const removeFromCart = (cartId: string) => {
  setItems((prev) => prev.filter((item) => item.cartId !== cartId));
};

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
