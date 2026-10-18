
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

describe('Sauce Demo - Logout', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();

  it('deve encerrar a sessão e retornar à tela de login', () => {
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');

    inventoryPage.assertPageIsVisible();
    inventoryPage.openMenu();

    cy.get('[data-test="logout-sidebar-link"]')
      .should('be.visible');

    inventoryPage.logout();

    cy.url().should('eq', 'https://www.saucedemo.com/');

    cy.get('[data-test="login-button"]')
      .should('be.visible');
  });
});
