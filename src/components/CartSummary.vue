<template>
  <aside class="card shadow-sm">
    <div class="card-body">
      <h5 class="card-title mb-3">Your Cart</h5>

      <div v-if="!items.length" class="text-muted text-center mb-3">
        Your cart is empty
      </div>

      <ul v-else class="list-group list-group-flush mb-3">
        <li
          v-for="item in items"
          :key="item.id"
          class="list-group-item d-flex justify-content-between align-items-start"
        >
          <div class="ms-2 me-auto">
            <div class="fw-semibold text-truncate" style="max-width:160px">{{ item.title }}</div>
            <small class="text-muted">Qty: {{ item.quantity }}</small>
          </div>
          <div class="fw-bold">₹{{ (item.price * item.quantity).toFixed(2) }}</div>
        </li>
      </ul>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="fw-semibold">Total</div>
        <div class="fs-5 fw-bold">₹{{ total.toFixed(2) }}</div>
      </div>

      <button class="btn btn-primary w-100" :disabled="!items.length" @click="goCheckout">Checkout</button>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '../stores/cartStore';
import { useRouter } from 'vue-router';

const cart = useCartStore();
const items = computed(() => cart.cartItems);
const total = computed(() => cart.totalAmount);

const router = useRouter();
function goCheckout() {
  router.push('/checkout');
}
</script>
