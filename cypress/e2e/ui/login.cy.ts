
import { LoginPage } from '../../pages/LoginPage';

describe('Sauce Demo - Login', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('deve realizar login com credenciais válidas', () => {
    loginPage.login('standard_user', 'secret_sauce');

    cy.url().should('include', '/inventory.html');

    cy.get('[data-test="title"]')
      .should('be.visible')
      .and('have.text', 'Products');
  });
});
