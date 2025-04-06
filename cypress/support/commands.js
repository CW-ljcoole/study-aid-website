// cypress/support/commands.js
// This file contains custom Cypress commands

// Add command to attach a file to an input
Cypress.Commands.add('attachFile', (selector, fileName) => {
  cy.fixture(fileName).then(fileContent => {
    cy.get(selector).then(input => {
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const testFile = new File([blob], fileName, { type: 'text/plain' });
      const dataTransfer = new DataTransfer();
      
      dataTransfer.items.add(testFile);
      input[0].files = dataTransfer.files;
      input.trigger('change', { force: true });
    });
  });
});

// Add command to check if an element is visible in viewport
Cypress.Commands.add('isVisibleInViewport', { prevSubject: true }, subject => {
  const rect = subject[0].getBoundingClientRect();
  
  expect(rect.top).to.be.at.least(0);
  expect(rect.bottom).to.be.at.most(Cypress.config('viewportHeight'));
  expect(rect.left).to.be.at.least(0);
  expect(rect.right).to.be.at.most(Cypress.config('viewportWidth'));
  
  return subject;
});

// Add command to simulate drawing on canvas
Cypress.Commands.add('drawOnCanvas', (canvasSelector, points) => {
  cy.get(canvasSelector).then($canvas => {
    const canvas = $canvas[0];
    const context = canvas.getContext('2d');
    
    // Start path
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    
    // Draw lines to each point
    for (let i = 1; i < points.length; i++) {
      context.lineTo(points[i].x, points[i].y);
    }
    
    // Finish drawing
    context.stroke();
    
    // Trigger events
    $canvas.trigger('mousedown', { clientX: points[0].x, clientY: points[0].y });
    
    for (let i = 1; i < points.length; i++) {
      $canvas.trigger('mousemove', { clientX: points[i].x, clientY: points[i].y });
    }
    
    $canvas.trigger('mouseup');
  });
});
