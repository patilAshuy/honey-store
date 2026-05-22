"use client";
import { useState, useEffect } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem) {
      const newCart = cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
      saveCart(newCart);
    } else {
      saveCart([...cart, item]);
    }
  };

  const removeFromCart = (id: string) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    saveCart(cart.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal };
};
