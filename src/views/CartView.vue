<template>
  <main class="container py-4">
    <router-link to="/" class="btn btn-outline-secondary mb-3">← Back to products</router-link>
    <h1 class="h3 mb-4">Your Cart</h1>

    <div v-if="!items.length" class="alert alert-secondary">Your cart is empty</div>

    <div v-else>
      <ul class="list-group mb-3">
        <li v-for="item in items" :key="item.id" class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-semibold">{{ item.title }}</div>
            <small class="text-muted">Qty: {{ item.quantity }}</small>
          </div>
          <div class="fw-bold">₹{{ (item.price * item.quantity).toFixed(2) }}</div>
        </li>
      </ul>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="fw-semibold">Total</div>
        <div class="fs-5 fw-bold">₹{{ total.toFixed(2) }}</div>
      </div>

      <button class="btn btn-primary" @click="goCheckout">Checkout</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '../stores/cartStore';
import { useRouter } from 'vue-router';

const cart = useCartStore();
const items = computed(() => cart.cartItems);
const total = computed(() => cart.totalAmount);

const router = useRouter();
function goCheckout() { router.push('/checkout') }
</script>
