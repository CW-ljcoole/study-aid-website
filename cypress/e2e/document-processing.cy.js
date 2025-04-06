// cypress/e2e/document-processing.cy.js
describe('Document Processing', () => {
  beforeEach(() => {
    // Visit the documents page before each test
    cy.visit('/documents');
    
    // Mock the LLM API response
    cy.intercept('POST', '/api/llm/process-document', {
      statusCode: 200,
      body: {
        summary: 'This is a test summary of the document.',
        keyPoints: ['Key point 1', 'Key point 2', 'Key point 3'],
        suggestedTopics: ['Topic 1', 'Topic 2']
      }
    }).as('processDocument');
  });

  it('should upload and process a document', () => {
    // Upload a document
    cy.get('input[type="file"]').attachFile('test-document.txt');
    
    // Click the process button
    cy.contains('Process Document').click();
    
    // Wait for the API call to complete
    cy.wait('@processDocument');
    
    // Check that the results are displayed
    cy.contains('Processing Results').should('be.visible');
    cy.contains('This is a test summary of the document.').should('be.visible');
    cy.contains('Key point 1').should('be.visible');
    cy.contains('Topic 1').should('be.visible');
  });

  it('should generate study materials from a document', () => {
    // Mock the flashcard generation API
    cy.intercept('POST', '/api/llm/generate-flashcards', {
      statusCode: 200,
      body: {
        flashcards: [
          { front: 'Question 1', back: 'Answer 1' },
          { front: 'Question 2', back: 'Answer 2' }
        ]
      }
    }).as('generateFlashcards');
    
    // Upload a document
    cy.get('input[type="file"]').attachFile('test-document.txt');
    
    // Navigate to flashcards
    cy.contains('Generate Flashcards').click();
    
    // Wait for the API call to complete
    cy.wait('@generateFlashcards');
    
    // Check that the flashcards are displayed
    cy.contains('Generated Flashcards').should('be.visible');
    cy.contains('Question 1').should('be.visible');
    cy.contains('Answer 1').should('be.visible');
  });
});
