describe('Sauce Demo - Página inicial', () => {
  it('deve exibir o formulário de login', () => {
    cy.visit('/');

    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="password"]').should('be.visible');
    cy.get('[data-test="login-button"]').should('be.visible');
  });
});