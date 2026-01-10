import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductStore } from '../productStore'

describe('productStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches products from API', async () => {
    const fake = [{ id: 1, title: 'X', price: 1 }]
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ json: () => Promise.resolve(fake) })))

    const store = useProductStore()
    await store.fetchProducts()
    expect(store.products.length).toBeGreaterThan(0)
    expect(store.products[0]?.title).toBe('X')
  })
})
