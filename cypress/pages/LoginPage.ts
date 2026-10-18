
export class LoginPage {
  private readonly usernameInput = '[data-test="username"]';
  private readonly passwordInput = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';

  visit(): void {
    cy.visit('/');
  }

  login(username: string, password: string): void {
    cy.get(this.usernameInput).clear().type(username);
    cy.get(this.passwordInput).clear().type(password);
    cy.get(this.loginButton).click();
  }

  getErrorMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.errorMessage);
  }
}
