// cypress/e2e/homepage.cy.js
describe('Homepage', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/');
  });

  it('should load the homepage successfully', () => {
    // Check that the main elements are visible
    cy.contains('h1', 'Study Aid').should('be.visible');
    cy.get('nav').should('be.visible');
  });

  it('should navigate to different sections', () => {
    // Test navigation to Documents section
    cy.contains('Documents').click();
    cy.url().should('include', '/documents');
    
    // Test navigation to Notes section
    cy.contains('Notes').click();
    cy.url().should('include', '/notes');
    
    // Test navigation to Study Tools section
    cy.contains('Study Tools').click();
    cy.url().should('include', '/study-tools');
  });
});
