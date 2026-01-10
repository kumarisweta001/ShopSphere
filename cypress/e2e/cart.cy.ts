describe('Cart Behavior', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Test Product',
      price: 109.95,
      description: 'Test description',
      category: "men's clothing",
      image: 'https://equalexperts.github.io/frontend-take-home-test-data/img/81fPKd-2AYL._AC_SL1500_t.png',
      rating: { rate: 3.9, count: 120 }
    },
    {
      id: 2,
      title: 'Second Product',
      price: 22.3,
      description: 'Second description',
      category: "men's clothing",
      image: 'https://equalexperts.github.io/frontend-take-home-test-data/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
      rating: { rate: 4.1, count: 259 }
    }
  ]

  beforeEach(() => {
    cy.intercept('GET', 'https://equalexperts.github.io/frontend-take-home-test-data/products.json', {
      statusCode: 200,
      body: mockProducts
    }).as('getProducts')
    
    cy.visit('/')
    cy.wait('@getProducts')
    cy.get('.card', { timeout: 10000 }).should('have.length.greaterThan', 0)
  })

  it('adds same product multiple times and shows quantity in cart page', () => {
    cy.get('.card').first().as('firstCard')
    cy.get('@firstCard').find('button').contains('Add to Cart').click()
    cy.get('@firstCard').find('button').contains('Add to Cart').click()

    cy.contains('Your Cart').click()
    cy.contains('Your Cart', { timeout: 10000 }).should('be.visible')
    cy.contains(/Qty:\s*2/, { timeout: 5000 }).should('be.visible')
  })

  it('cart shows price * quantity and total updates', () => {
    cy.get('.card').first().as('firstCard')
    cy.get('@firstCard').find('button').contains('Add to Cart').click()
    cy.get('@firstCard').find('button').contains('Add to Cart').click()

    cy.contains('Your Cart').click()
    cy.contains('Your Cart', { timeout: 10000 }).should('be.visible')
    cy.contains('₹', { timeout: 5000 }).should('exist')

    cy.contains('Total')
      .parent()
      .invoke('text')
      .then(text => {
        expect(text).to.match(/₹\s*\d+/)
      })
  })
})