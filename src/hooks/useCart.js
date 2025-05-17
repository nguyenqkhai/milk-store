import { useState, useEffect } from "react";

let listeners = [];
let cartCount = 0;

export function setGlobalCartCount(count) {
  cartCount = count;
  listeners.forEach(fn => fn(cartCount));
}

export function useCartCount() {
  const [count, setCount] = useState(cartCount);

  useEffect(() => {
    listeners.push(setCount);
    return () => {
      listeners = listeners.filter(fn => fn !== setCount);
    };
  }, []);

  return [count, setGlobalCartCount];
}