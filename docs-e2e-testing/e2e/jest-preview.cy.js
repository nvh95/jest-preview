describe('Tests for Jest Preview', () => {
  beforeEach( function() {
    cy.visit('https://www.jest-preview.com/')
    cy.contains('h1', 'Jest Preview')
  })

  it('Check CTA Get Started button if it works', () => {
    cy.get('.button').click()
    cy.url()
      .should('contain', 'docs/getting-started/intro')
    cy.contains('h1','Introduction')
  })

  it('Check Docs page is present', () => {
    cy.contains("Docs").click()
    cy.url()
      .should('contain', 'docs/getting-started/intro')
    cy.contains('h1','Introduction')
  })
  
  it('Check Blog page is present', () => {
    cy.contains("Blog").click()
    cy.url()
      .should('contain', '/blog')
    cy.contains('Recent posts')
  })
  
  it('Check API page is present', () => {
    cy.contains("API").click()
    cy.url()
      .should('contain', '/api')
    cy.contains('Getting Started')
  })
  
  it('Check Demo link is correct and Demo page is present', () => {
    cy.contains('Demo').invoke('removeAttr', 'target').click()
    cy.url()
      .should('include', 'stackblitz.com/edit/jest-preview')
    cy.contains('Jest Preview')
  })
})
