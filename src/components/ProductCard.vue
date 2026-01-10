<template>
  <div class="card h-100">
    <img
      :src="product.image"
      :alt="product.title"
      class="card-img-top product-image"
      @error="onImageError"
    />

    <div class="card-body d-flex flex-column">
      <h6 class="fw-semibold mb-1 text-truncate">
        {{ product.title }}
      </h6>

      <p class="text-muted small mb-2 line-clamp">
        {{ product.description }}
      </p>

      <div class="mt-auto">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="fw-bold">₹{{ product.price }}</span>
        </div>

        <button
          class="btn btn-outline-primary btn-sm w-100"
          @click="add"
          :aria-label="`Add ${product.title} to cart`"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import type { Product } from '../stores/productStore'
// import { ref } from 'vue'

const props = defineProps<{ product: Product }>()
const product = props.product

const cartStore = useCartStore()
const add = () => cartStore.addToCart(product)

const fallback = 'https://via.placeholder.com/400x300?text=No+Image'
function onImageError(e: Event) {
  const img = e.target as HTMLImageElement | null
  if (img && img.src !== fallback) img.src = fallback
}
</script>

<style scoped>
.product-image {
  height: 260px;
  object-fit: contain;
  padding: 1rem;
}

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
