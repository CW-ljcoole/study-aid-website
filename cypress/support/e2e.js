// cypress/support/e2e.js
// This file is processed and loaded automatically before your test files.

// Import commands.js
import './commands';

// Cypress configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

// Add custom assertions
chai.use((_chai, utils) => {
  _chai.Assertion.addMethod('visibleInViewport', function () {
    const subject = this._obj;
    const rect = subject[0].getBoundingClientRect();
    
    this.assert(
      rect.top >= 0 &&
      rect.bottom <= Cypress.config('viewportHeight') &&
      rect.left >= 0 &&
      rect.right <= Cypress.config('viewportWidth'),
      'expected #{this} to be visible in viewport',
      'expected #{this} to not be visible in viewport'
    );
  });
});
