
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

describe('Sauce Demo - Produtos', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');

    inventoryPage.assertPageIsVisible();
  });

  it('deve adicionar um produto ao carrinho', () => {
    inventoryPage.addProductToCart('sauce-labs-backpack');

    inventoryPage.getCartBadge()
      .should('be.visible')
      .and('have.text', '1');
  });
});
