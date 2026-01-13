import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import ProductListView from '../ProductListView.vue'
import { useProductStore } from '../../stores/productStore'
// import * as vueRouter from 'vue-router'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}))

describe('ProductListView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('renders products and calls fetchProducts', async () => {
    const productStore = useProductStore()
    const fake = [
      { id: "1", title: 'A', price: 1 },
      { id: "2", title: 'B', price: 2 },
    ]
    productStore.products = fake
    productStore.fetchProducts = vi.fn()

    const wrapper = mount(ProductListView, {
      global: {
        stubs: ['ProductCard', 'CartSummary', 'router-link'],
      },
    })

    expect(wrapper.text()).toContain('Products List')
    // ensure two product-card stubs rendered
    expect(wrapper.findAll('product-card-stub').length).toBe(2)
    expect(productStore.fetchProducts).toHaveBeenCalled()
  })
})
