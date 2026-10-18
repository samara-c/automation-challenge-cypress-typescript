
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

describe('Sauce Demo - Carrinho', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');

    inventoryPage.assertPageIsVisible();
  });

  it('deve exibir o produto adicionado ao carrinho', () => {
    inventoryPage.addProductToCart('sauce-labs-backpack');
    inventoryPage.openCart();

    cartPage.assertPageIsVisible();
    cartPage.assertProductIsInCart('Sauce Labs Backpack');
  });
});
