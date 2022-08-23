describe('Tests for Jest Preview', () => {
  it('Check internal pages are present, links and buttons work as expected', () => {
    cy.visit('https://www.jest-preview.com/');
    cy.contains('h1', 'Jest Preview');

    // Check CTA Get Started should direct users to Docs page
    cy.contains('Get Started').click();
    cy.url().should('contain', 'docs/getting-started/intro');
    cy.contains('h1', 'Introduction');

    // Check Docs page is present
    cy.contains('Docs').click();
    cy.url().should('contain', 'docs/getting-started/intro');
    cy.contains('h1', 'Introduction');

    // Check contributing page should have content
    cy.contains('Contributing').click();
    cy.contains('Welcome');

    // Check Blog page is present
    cy.contains('Blog').click();
    cy.url().should('contain', '/blog');
    cy.contains('All posts');

    // Check API page is present
    cy.contains('API').click();
    cy.url().should('contain', '/api');
    cy.contains('Getting Started');

    // Check Demo link is correct
    cy.contains('Demo').should(
      'have.attr',
      'href',
      'https://stackblitz.com/edit/jest-preview?file=src%2FApp.test.tsx,README.md',
    );
  });
});
