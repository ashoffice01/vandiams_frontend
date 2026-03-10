"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  cartId: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {

  const [items, setItems] = useState<CartItem[]>([]);

  /* Load cart from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  /* Save cart to localStorage */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  /* Add to cart */
  const addToCart = (item: Omit<CartItem, "quantity">) => {

    setItems((prev) => {

      const existing = prev.find((i) => i.cartId === item.cartId);

      if (existing) {
        return prev.map((i) =>
          i.cartId === item.cartId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });

  };

  /* Remove item */
  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.cartId !== id));
  };

  /* Update quantity */
  const updateQuantity = (id: string, qty: number) => {

    if (qty < 1) return;

    setItems((prev) =>
      prev.map((item) =>
        item.cartId === id
          ? { ...item, quantity: qty }
          : item
      )
    );

  };

  /* Clear cart */
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );

}

export function useCart() {

  const context = useContext(CartContext);

  if (!context) throw new Error("CartProvider missing");

  return context;

}