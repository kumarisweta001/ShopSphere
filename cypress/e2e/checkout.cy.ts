describe('Checkout Flow', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Test Product',
      price: 109.95,
      description: 'Test description',
      category: "men's clothing",
      image: 'https://equalexperts.github.io/frontend-take-home-test-data/img/81fPKd-2AYL._AC_SL1500_t.png',
      rating: { rate: 3.9, count: 120 }
    }
  ]

  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://equalexperts.github.io/frontend-take-home-test-data/products.json',
      {
        statusCode: 200,
        body: mockProducts
      }
    ).as('getProducts')

    cy.visit('/')
    cy.wait('@getProducts')
    cy.get('.card').should('exist')
  })

  it('can checkout and see success message', () => {
    cy.get('.card').first().as('firstCard')
    cy.get('@firstCard').find('button').contains('Add to Cart').click()

    cy.contains('Your Cart').click()
    cy.contains('Checkout', { timeout: 5000 }).click()

    cy.url().should('include', '/checkout')
    cy.contains('Pay Now').click()

    cy.contains(/success|order placed|thank you/i, { timeout: 5000 }).should('be.visible')
  })
})
