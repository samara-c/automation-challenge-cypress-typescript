
export class InventoryPage {
    private readonly pageTitle = '[data-test="title"]';
    private readonly cartBadge = '[data-test="shopping-cart-badge"]';

    assertPageIsVisible() {
        return cy.get(this.pageTitle)
            .should('be.visible')
            .and('have.text', 'Products');
    }

    addProductToCart(productId: string) {
        return cy.get(`[data-test="add-to-cart-${productId}"]`)
            .click();
    }

    getCartBadge() {
        return cy.get(this.cartBadge);
    }
    openCart() {
    return cy.get('.shopping_cart_link').click();
}

openMenu() {
  return cy.get('#react-burger-menu-btn').click();
}

logout() {
  return cy.get('[data-test="logout-sidebar-link"]').click();
}
}
