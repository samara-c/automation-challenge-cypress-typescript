
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

describe('Sauce Demo - Checkout', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();

  it('deve concluir uma compra com sucesso', () => {
    
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');

    inventoryPage.assertPageIsVisible();

    
    inventoryPage.addProductToCart('sauce-labs-backpack');
    inventoryPage.openCart();

    
    cartPage.assertPageIsVisible();
    cartPage.assertProductIsInCart('Sauce Labs Backpack');
    cartPage.checkout();

    
    checkoutPage.assertInformationPageIsVisible();

    checkoutPage.fillInformation(
      'Samara',
      'Cardoso',
      '06000-000'
    );

    checkoutPage.continueToOverview();

    
    checkoutPage.assertOverviewIsVisible();
    checkoutPage.assertProductIsInOverview('Sauce Labs Backpack');
    checkoutPage.assertTotalIs('Total: $32.39');

    
    checkoutPage.finishOrder();
    checkoutPage.assertOrderIsComplete();
  });


  it('deve impedir o avanço quando os dados do comprador não forem preenchidos', () => {
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');

    inventoryPage.addProductToCart('sauce-labs-backpack');
    inventoryPage.openCart();

    cartPage.checkout();

    checkoutPage.continueToOverview();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'First Name is required');
  });

});
