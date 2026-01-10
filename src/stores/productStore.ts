import { defineStore } from 'pinia';
import { ref } from 'vue';

export type Product = {
  id: number | string;
  title: string;
  price: number;
  description?: string;
  image?: string;
  category?: string;
  [key: string]: unknown;
};

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchProducts() {
    loading.value = true;
    try {
      const res = await fetch(
        'https://equalexperts.github.io/frontend-take-home-test-data/products.json'
      );
      const data = (await res.json()) as Product[];
      products.value = data;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      error.value = 'Failed to load products' + (msg || '');
    } finally {
      loading.value = false;
    }
  }

  return { products, loading, error, fetchProducts };
});
