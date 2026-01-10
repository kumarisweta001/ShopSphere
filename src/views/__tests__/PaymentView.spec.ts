import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import PaymentView from '../PaymentView.vue'
import { useCartStore } from '../../stores/cartStore'

describe('PaymentView', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('processes payment and clears cart and navigates', async () => {
    vi.useFakeTimers()
    const store = useCartStore()
    store.addToCart({ id: 'z', title: 'Z', price: 2 } as any)

    const push = vi.fn()
    const wrapper = mount(PaymentView, {
      global: { plugins: [createPinia()], stubs: ['router-link'], mocks: { $router: { push } } },
    })

    await wrapper.find('button').trigger('click')
    // advance timers to let async payment complete (800ms + 1000ms for redirect = 1800ms)
    vi.advanceTimersByTime(1800)

    expect(store.cartItems.length).toBe(0)
    expect(push).toHaveBeenCalled()
    vi.useRealTimers()
  })
})
