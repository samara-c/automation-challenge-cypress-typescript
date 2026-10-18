
export class CheckoutPage {
  private readonly firstNameInput = '[data-test="firstName"]';
  private readonly lastNameInput = '[data-test="lastName"]';
  private readonly postalCodeInput = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly finishButton = '[data-test="finish"]';
  private readonly pageTitle = '[data-test="title"]';
  private readonly cartItems = '[data-test="inventory-item-name"]';
  private readonly totalLabel = '[data-test="total-label"]';
  private readonly completeHeader = '[data-test="complete-header"]';
  private readonly completeMessage = '[data-test="complete-text"]';

  assertInformationPageIsVisible() {
    cy.url().should('include', '/checkout-step-one.html');

    return cy.get(this.firstNameInput).should('be.visible');
  }

  fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    cy.get(this.firstNameInput).clear().type(firstName);
    cy.get(this.lastNameInput).clear().type(lastName);
    cy.get(this.postalCodeInput).clear().type(postalCode);
  }

  continueToOverview() {
    return cy.get(this.continueButton).click();
  }

  assertOverviewIsVisible() {
    cy.url().should('include', '/checkout-step-two.html');

    return cy.get(this.pageTitle)
      .should('be.visible')
      .and('have.text', 'Checkout: Overview');
  }

  assertProductIsInOverview(productName: string) {
    return cy.get(this.cartItems)
      .should('contain.text', productName);
  }

  assertTotalIs(expectedTotal: string) {
    return cy.get(this.totalLabel)
      .should('be.visible')
      .and('have.text', expectedTotal);
  }

  finishOrder() {
    return cy.get(this.finishButton).click();
  }

  assertOrderIsComplete() {
    cy.url().should('include', '/checkout-complete.html');

    cy.get(this.completeHeader)
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');

    return cy.get(this.completeMessage).should('be.visible');
  }
}
