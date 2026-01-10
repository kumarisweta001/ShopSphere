import { mount } from 'cypress/vue'
import ProductCard from '../../src/components/ProductCard.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('ProductCard Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const mockProduct = {
    id: 1,
    title: 'Test Product',
    description: 'This is a test product description that should be visible on the card',
    price: 999.99,
    image: 'https://via.placeholder.com/400x300?text=Test+Product',
    category: 'test',
    rating: { rate: 4.5, count: 100 }
  }

  it('renders product information correctly', () => {
    mount(ProductCard, {
      props: { product: mockProduct }
    })

    cy.contains(mockProduct.title).should('be.visible')
    cy.contains(mockProduct.description).should('be.visible')
    cy.contains(`₹${mockProduct.price}`).should('be.visible')
    cy.get('.card-img-top')
      .should('have.attr', 'src', mockProduct.image)
      .and('have.attr', 'alt', mockProduct.title)
    cy.get('button').contains('Add to Cart').should('be.visible')
  })

  it('displays fallback image on image error', () => {
    const productWithBrokenImage = {
      ...mockProduct,
      image: 'https://broken-url.com/image.jpg'
    }

    mount(ProductCard, {
      props: { product: productWithBrokenImage }
    })

    cy.get('.card-img-top').then(($img) => {
      $img[0].dispatchEvent(new Event('error'))
    })

    cy.get('.card-img-top').should('have.attr', 'src')
      .and('include', 'placeholder.com')
  })

  it('adds product to cart when button is clicked', () => {
    mount(ProductCard, {
      props: { product: mockProduct }
    })

    cy.get('button').contains('Add to Cart').click()
    cy.get('button').contains('Add to Cart').should('exist')
  })

  it('has proper accessibility attributes', () => {
    mount(ProductCard, {
      props: { product: mockProduct }
    })

    cy.get('button')
      .should('have.attr', 'aria-label')
      .and('include', mockProduct.title)
  })

  it('truncates long product titles', () => {
    const longTitleProduct = {
      ...mockProduct,
      title: 'This is a very long product title that should be truncated to fit within the card layout'
    }

    mount(ProductCard, {
      props: { product: longTitleProduct }
    })

    cy.get('.text-truncate').should('have.class', 'text-truncate')
  })

  it('displays product with minimum required fields', () => {
    const minimalProduct = {
      id: 2,
      title: 'Minimal Product',
      description: 'Minimal description',
      price: 99,
      image: '',
      category: 'test',
      rating: { rate: 0, count: 0 }
    }

    mount(ProductCard, {
      props: { product: minimalProduct }
    })

    cy.contains(minimalProduct.title).should('be.visible')
    cy.contains(`₹${minimalProduct.price}`).should('be.visible')
  })

  it('applies correct CSS classes for layout', () => {
    mount(ProductCard, {
      props: { product: mockProduct }
    })

    cy.get('.card').should('have.class', 'h-100')
    cy.get('.card-body').should('have.class', 'd-flex').and('have.class', 'flex-column')
    cy.get('.product-image').should('exist')
  })

  it('button has correct styling classes', () => {
    mount(ProductCard, {
      props: { product: mockProduct }
    })

    cy.get('button')
      .should('have.class', 'btn')
      .and('have.class', 'btn-outline-primary')
      .and('have.class', 'btn-sm')
      .and('have.class', 'w-100')
  })
})
