describe('Login Process', () => {
  it('Displays a login form to a non authenticated user', () => {
    localStorage.removeItem('signedInUser');
    cy.visit('/');
    cy.contains('label', 'Username');
  });
});
