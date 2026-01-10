import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '../cartStore'
import type { Product } from '../productStore'

describe('cartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds items and increments quantity', () => {
    const store = useCartStore()
    const product: Product = { id: 'p1', title: 'Test', price: 10 }
    store.addToCart(product)
    expect(store.cartItems.length).toBe(1)
    const added = store.cartItems.find((i) => String(i.id) === String(product.id))
    expect(added).toBeDefined()
    expect(added!.quantity).toBe(1)

    store.addToCart(product)
    const added2 = store.cartItems.find((i) => String(i.id) === String(product.id))
    expect(added2).toBeDefined()
    expect(added2!.quantity).toBe(2)
  })

  it('calculates totalAmount correctly', () => {
    const store = useCartStore()
    const a: Product = { id: 'a', title: 'A', price: 5 }
    const b: Product = { id: 'b', title: 'B', price: 2 }
    store.addToCart(a)
    store.addToCart(a)
    store.addToCart(b)
    expect(store.totalAmount).toBeDefined()
    expect(store.totalAmount).toBe(5 * 2 + 2 * 1)
  })
})
