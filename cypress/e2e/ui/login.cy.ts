
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



  it('deve exibir erro ao informar credenciais inválidas', () => {
    loginPage.login('usuario_invalido', 'senha_invalida');

    loginPage
      .getErrorMessage()
      .should('be.visible')
      .and(
        'contain.text',
        'Username and password do not match any user in this service'
      );
  });

  // Fluxo extra com usuário != de standard_user
  it('deve impedir o login de um usuário bloqueado', () => {
    loginPage.login('locked_out_user', 'secret_sauce');

    loginPage
      .getErrorMessage()
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out');
  });

});
