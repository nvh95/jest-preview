describe('Tests for Jest Preview', () => {
  it('Check Jest Preview website is alive', () => {
    cy.visit('https://www.jest-preview.com/')
    cy.contains('h1', 'Jest Preview')
    cy.contains('Debug your Jest tests. Effortlessly.')
  })
})
