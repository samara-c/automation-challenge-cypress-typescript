
export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthTokenResponse {
  token?: string;
  reason?: string;
}

export class AuthApi {
  private readonly baseUrl: string = Cypress.expose('apiUrl') as string;

  createToken(
    credentials: AuthCredentials
  ): Cypress.Chainable<Cypress.Response<AuthTokenResponse>> {
    return cy.request<AuthTokenResponse>({
      method: 'POST',
      url: `${this.baseUrl}/auth`,
      body: credentials,
      failOnStatusCode: false,
    });
  }
}
