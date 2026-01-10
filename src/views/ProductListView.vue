<template>
  <main class="container-fluid py-4">
    <header class="ee-header mb-4">
      <div class="container d-flex align-items-center py-3">
        <img :src="logo" alt="Equal Experts" class="ee-logo me-3" />

        <!-- Cart icon for small screens -->
        <router-link to="/cart" class="btn btn-outline-light d-lg-none ms-auto position-relative">
          🛒
          <span v-if="count" class="badge bg-danger position-absolute top-0 start-100 translate-middle">{{ count }}</span>
        </router-link>
      </div>
    </header>
      <div class="container py-4">
        <h2><strong>Products List</strong></h2>
        <div class="row">
          <section class="col-12 col-lg-9">
            <div v-if="loading" class="text-center">
              Loading products...
            </div>

            <div class="row g-8">
              <div
                  v-for="product in products"
                  :key="product.id"
                    class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <ProductCard :product="product" />
                </div>
            </div>
          </section>

          <aside class="col-12 col-lg-3 mt-4 mt-lg-0 d-none d-lg-block">
            <div class="position-sticky" style="top: 1rem;">
              <div class="text-lg-end text-center">
                <CartSummary />
              </div>
            </div>
          </aside>
        </div>
      </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStore';
import ProductCard from '@/components/ProductCard.vue';
import CartSummary from '@/components/CartSummary.vue';
import logo from '@/assets/logo-EE.svg';

const productStore = useProductStore();
const cart = useCartStore();

const count = computed(() => cart.cartItems.reduce((s, it) => s + (it.quantity || 0), 0));

onMounted(() => {
  productStore.fetchProducts();
});

const products = computed(() => productStore.products);
const loading = computed(() => productStore.loading);
</script>

<style scoped>
    .ee-header{background:#2f3537;color:#fff}
    .ee-logo{height:56px}
</style>
