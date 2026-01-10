describe('Product List Page', () => {
  const products = [
    { id: 1, title: 'Test Product', price: 10, description: 'x', image: '' },
    { id: 2, title: 'Other', price: 5, description: 'y', image: '' },
  ]

  beforeEach(() => {
    cy.intercept('GET', 'https://equalexperts.github.io/frontend-take-home-test-data/products.json', { body: products }).as('getProducts')
    cy.visit('/')
    cy.wait('@getProducts')
  })

  it('shows header and product cards', () => {
    cy.contains('Products List')
    cy.get('.card').should('exist')
    cy.get('.card').should('have.length.greaterThan', 0)
  })

  it('each card shows image, title, price and Add button', () => {
    cy.get('.card').first().within(() => {
      cy.get('img').should('have.attr', 'alt')
      cy.contains('Add to Cart')
      cy.get('h6, h5, h4').should('exist')
      cy.get('span').contains('₹').should('exist')
    })
  })
})