import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import CartSummary from '../CartSummary.vue'
import { useCartStore } from '../../stores/cartStore'

describe('CartSummary', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('renders items and total correctly', async () => {
    const store = useCartStore()
    store.addToCart({ id: 'p1', title: 'P1', price: 10 } as any)
    store.addToCart({ id: 'p1', title: 'P1', price: 10 } as any)
    store.addToCart({ id: 'p2', title: 'P2', price: 5 } as any)

    const wrapper = mount(CartSummary)
    const text = wrapper.text()
    expect(text).toContain('Your Cart')
    expect(text).toContain('Qty: 2')
    expect(text).toContain('₹25')
  })
})
