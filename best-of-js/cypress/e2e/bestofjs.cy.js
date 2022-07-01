describe('Tests for BestOfJs', () => {
  it('Check pages are loaded, buttons and links work as expected', () => {
    // Check Home page is present
    cy.visit('https://bestofjs.org/')
    cy.contains('h1', 'The best of JavaScript, HTML and CSS')
  })
})
