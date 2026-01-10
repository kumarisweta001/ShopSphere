import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProductCard from '../ProductCard.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../../stores/cartStore'

describe('ProductCard', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('calls addToCart when button clicked', async () => {
    const product = { id: 'p1', title: 'P1', price: 9 }
    const wrapper = mount(ProductCard, { props: { product } })
    const store = useCartStore()
    const spy = vi.spyOn(store, 'addToCart')
    await wrapper.find('button').trigger('click')
    expect(spy).toHaveBeenCalledWith(product)
  })
})
