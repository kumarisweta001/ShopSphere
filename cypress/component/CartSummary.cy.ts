import { mount } from 'cypress/vue'
import CartSummary from '../../src/components/CartSummary.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '../../src/stores/cartStore'

describe('CartSummary Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const mockProduct = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    image: 'https://equalexperts.github.io/frontend-take-home-test-data/img/81fPKd-2AYL._AC_SL1500_t.png',
    category: "men's clothing",
    rating: {
      rate: 3.9,
      count: 120
    }
  }

  it('displays empty cart message when cart is empty', () => {
    mount(CartSummary)

    cy.contains('Your cart is empty').should('be.visible')
    cy.contains('₹0.00').should('be.visible')
    cy.get('button').contains('Checkout').should('be.disabled')
  })

  it('displays cart items correctly', () => {
    const wrapper = mount(CartSummary)

    wrapper.then(() => {
      const cartStore = useCartStore()
      cartStore.addToCart(mockProduct)
    })

    cy.contains(mockProduct.title).should('be.visible')
    cy.contains('Qty: 1').should('be.visible')
    cy.contains(`₹${mockProduct.price.toFixed(2)}`).should('be.visible')
    cy.contains('Total').should('be.visible')
    cy.get('.fs-5.fw-bold').contains(`₹${mockProduct.price.toFixed(2)}`).should('be.visible')
    cy.get('button').contains('Checkout').should('not.be.disabled')
  })

  it('displays multiple cart items with correct quantities', () => {
    const wrapper = mount(CartSummary)

    wrapper.then(() => {
      const cartStore = useCartStore()
      cartStore.addToCart(mockProduct)
      cartStore.addToCart(mockProduct)
    })

    cy.contains('Qty: 2').should('be.visible')
    const expectedTotal = (mockProduct.price * 2).toFixed(2)
    cy.get('.fs-5.fw-bold').contains(`₹${expectedTotal}`).should('be.visible')
  })

  it('displays multiple different products', () => {
    const mockProduct2 = {
      id: 2,
      title: 'Second Product',
      description: 'Second description',
      price: 300,
      image: 'https://via.placeholder.com/400',
      category: 'test',
      rating: { rate: 3, count: 30 }
    }

    const wrapper = mount(CartSummary)

    wrapper.then(() => {
      const cartStore = useCartStore()
      cartStore.addToCart(mockProduct)
      cartStore.addToCart(mockProduct2)
    })

    cy.contains(mockProduct.title).should('be.visible')
    cy.contains(mockProduct2.title).should('be.visible')
    cy.get('small.text-muted').should('have.length', 2)
    cy.get('small.text-muted').each(($el) => {
      cy.wrap($el).should('contain', 'Qty: 1')
    })

    const expectedTotal = (mockProduct.price + mockProduct2.price).toFixed(2)
    cy.get('.fs-5.fw-bold').contains(`₹${expectedTotal}`).should('be.visible')
  })

  it('calculates total amount correctly', () => {
    const wrapper = mount(CartSummary)

    wrapper.then(() => {
      const cartStore = useCartStore()
      cartStore.addToCart(mockProduct)
      cartStore.addToCart(mockProduct)
      cartStore.addToCart(mockProduct)
    })

    const expectedTotal = (mockProduct.price * 3).toFixed(2)
    cy.get('.fs-5.fw-bold').contains(`₹${expectedTotal}`).should('be.visible')
  })

  it('truncates long product titles', () => {
    const longTitleProduct = {
      ...mockProduct,
      title: 'This is an extremely long product title that should be truncated to fit'
    }

    const wrapper = mount(CartSummary)

    wrapper.then(() => {
      const cartStore = useCartStore()
      cartStore.addToCart(longTitleProduct)
    })

    cy.get('.text-truncate').should('exist')
  })

  it('has correct heading', () => {
    mount(CartSummary)

    cy.get('.card-title').contains('Your Cart').should('be.visible')
  })

  it('applies correct CSS classes', () => {
    mount(CartSummary)

    cy.get('.card').should('have.class', 'shadow-sm')
    cy.get('.card-body').should('exist')
    cy.get('button').should('have.class', 'btn-primary').and('have.class', 'w-100')
  })

  it('displays items in a list group', () => {
    const wrapper = mount(CartSummary)

    wrapper.then(() => {
      const cartStore = useCartStore()
      cartStore.addToCart(mockProduct)
    })

    cy.get('.list-group').should('exist')
    cy.get('.list-group-item').should('have.length', 1)
  })

  it('displays price per item correctly', () => {
    const wrapper = mount(CartSummary)

    wrapper.then(() => {
      const cartStore = useCartStore()
      cartStore.addToCart(mockProduct)
      cartStore.addToCart(mockProduct)
    })

    const expectedItemTotal = (mockProduct.price * 2).toFixed(2)
    cy.get('.list-group-item .fw-bold').contains(`₹${expectedItemTotal}`).should('be.visible')
  })

  it('checkout button is enabled when cart has items', () => {
    mount(CartSummary).then(() => {
      const cartStore = useCartStore()
      cartStore.addToCart(mockProduct)
    })

    cy.get('button').contains('Checkout').should('not.be.disabled').should('be.visible')
  })
})
