import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product } from './productStore';

export type CartItem = Product & { quantity: number };

export const useCartStore = defineStore('cart', () => {
  const items = ref<Record<string, CartItem>>({});

  const cartItems = computed(() => Object.values(items.value) as CartItem[]);
  const totalAmount = computed(() =>
    Object.values(items.value).reduce((sum: number, item: CartItem) => sum + (Number(item.price) || 0) * item.quantity, 0)
  );

  function addToCart(product: Product) {
    const id = product && (product.id ?? product._id ?? product.sku);
    if (!id) return;

    const key = String(id);
    const next = { ...items.value };
    if (!next[key]) {
      next[key] = { ...(product as Product), quantity: 1 } as CartItem;
    } else {
      next[key] = { ...next[key], quantity: next[key].quantity + 1 };
    }

    items.value = next;
  }

  function clearCart() {
    items.value = {};
  }

  return { items, cartItems, totalAmount, addToCart, clearCart };
});
