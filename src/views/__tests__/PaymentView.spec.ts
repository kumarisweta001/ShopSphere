import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import PaymentView from '../PaymentView.vue'
import { useCartStore } from '../../stores/cartStore'
import * as vueRouter from 'vue-router'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}))

describe('PaymentView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('processes payment and clears cart and navigates', async () => {
    vi.useFakeTimers()
    const store = useCartStore()
    store.addToCart({ id: 'z', title: 'Z', price: 2 } as any)

    const push = vi.fn()
    vi.mocked(vueRouter.useRouter).mockReturnValue({ push } as any)

    const wrapper = mount(PaymentView, {
      global: { stubs: ['router-link'] },
    })

    await wrapper.find('button').trigger('click')
    // advance timers to let async payment complete (800ms + 1000ms for redirect = 1800ms)
    vi.advanceTimersByTime(1800)

    expect(store.cartItems.length).toBe(0)
    expect(push).toHaveBeenCalledWith('/')
    vi.useRealTimers()
  })
})
