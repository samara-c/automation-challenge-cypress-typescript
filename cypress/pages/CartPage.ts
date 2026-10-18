
export class CartPage {
  private readonly pageTitle = '[data-test="title"]';
  private readonly cartItems = '[data-test="inventory-item-name"]';
  private readonly checkoutButton = '[data-test="checkout"]';
  private readonly continueShoppingButton =
    '[data-test="continue-shopping"]';

  assertPageIsVisible() {
    return cy.get(this.pageTitle)
      .should('be.visible')
      .and('have.text', 'Your Cart');
  }

  assertProductIsInCart(productName: string) {
    return cy.get(this.cartItems)
      .should('contain.text', productName);
  }

  checkout() {
    return cy.get(this.checkoutButton).click();
  }

  continueShopping() {
    return cy.get(this.continueShoppingButton).click();
  }
}
