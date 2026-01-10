<template>
  <main class="container py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <div class="card">
          <div class="card-body text-center">
            <h3 class="card-title mb-3">Payment</h3>
            <p class="text-muted mb-4">You're about to pay</p>

            <div class="mb-3">
              <div class="fs-4 fw-bold">₹{{ total.toFixed(2) }}</div>
            </div>

            <button class="btn btn-success w-100" @click="pay" :disabled="processing">
              <span v-if="processing">Processing...</span>
              <span v-else>Pay Now</span>
            </button>

            <div v-if="paid" class="alert alert-success mt-3">Payment successful — thank you!</div>

            <router-link to="/" class="btn btn-link mt-2">Back to products</router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';

const router = useRouter();
const cart = useCartStore();

const total = cart.totalAmount;
const processing = ref(false);
const paid = ref(false);

function pay() {
  if (processing.value) return;
  processing.value = true;
  setTimeout(() => {
    cart.clearCart();
    processing.value = false;
    paid.value = true;
    // navigate back to products after short delay
    setTimeout(() => router.push('/'), 1000);
  }, 800);
}
</script>
