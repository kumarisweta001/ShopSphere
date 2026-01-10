import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import CartView from '../CartView.vue'
import { useCartStore } from '../../stores/cartStore'

describe('CartView', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('renders items and total', async () => {
    const store = useCartStore()
    store.addToCart({ id: 'x', title: 'X', price: 3 } as any)
    store.addToCart({ id: 'x', title: 'X', price: 3 } as any)

    const wrapper = mount(CartView, {
      global: { plugins: [createPinia()], stubs: ['router-link'] },
    })

    expect(wrapper.text()).toContain('Your Cart')
    expect(wrapper.text()).toContain('Qty: 2')
    expect(wrapper.text()).toContain('₹6.00')
  })
})
