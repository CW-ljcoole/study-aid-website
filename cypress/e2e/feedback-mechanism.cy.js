// cypress/e2e/feedback-mechanism.cy.js
describe('Feedback Mechanism', () => {
  beforeEach(() => {
    // Visit the study tools page before each test
    cy.visit('/study-tools');
    
    // Mock the LLM API responses
    cy.intercept('POST', '/api/llm/generate-flashcards', {
      statusCode: 200,
      body: {
        flashcards: [
          { front: 'Question 1', back: 'Answer 1' },
          { front: 'Question 2', back: 'Answer 2' }
        ]
      }
    }).as('generateFlashcards');
    
    cy.intercept('POST', '/api/llm/process-feedback', {
      statusCode: 200,
      body: {
        updatedContent: 'This is the updated content based on feedback.',
        changes: ['Made content more concise', 'Added more details']
      }
    }).as('processFeedback');
  });

  it('should provide feedback and see updated content', () => {
    // Generate flashcards first
    cy.contains('Generate Flashcards').click();
    cy.wait('@generateFlashcards');
    
    // Find and click the feedback button
    cy.contains('Provide Feedback').click();
    
    // Check that the feedback modal is displayed
    cy.contains('Original Content').should('be.visible');
    
    // Enter feedback
    cy.get('textarea').type('Please make this more concise and add more details.');
    
    // Submit feedback
    cy.contains('Submit Feedback').click();
    
    // Wait for the API call to complete
    cy.wait('@processFeedback');
    
    // Check that the updated content is displayed
    cy.contains('Updated Content').should('be.visible');
    cy.contains('This is the updated content based on feedback.').should('be.visible');
    cy.contains('Changes Made').should('be.visible');
    cy.contains('Made content more concise').should('be.visible');
  });
});
