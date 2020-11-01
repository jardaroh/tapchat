describe('Login Process', () => {
  it('Displays a login form to a non authenticated user', () => {
    localStorage.removeItem('signedInUser');
    cy.visit('/');
    cy.contains('label', 'Username');
  });

  it('Display the main app when signing in as any user', () => {
    localStorage.removeItem('signedInUser');
    cy.visit('/');
    cy.get('input').type('test-user').type('{enter}');
    cy.contains('button', 'Sign out');
  });
});
