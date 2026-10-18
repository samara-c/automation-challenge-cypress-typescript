
import { AuthApi, type AuthTokenResponse } from '../../api/AuthApi';

describe('API - Autenticação', () => {
  const authApi = new AuthApi();

  it('deve gerar um token com credenciais válidas', () => {
    authApi
      .createToken({
        username: 'admin',
        password: 'password123',
      })
      .then((response: Cypress.Response<AuthTokenResponse>) => {
        expect(response.status).to.eq(200);
        expect(response.body.token).to.be.a('string').and.not.be.empty;
      });
  });

  it('deve rejeitar credenciais inválidas', () => {
    authApi
      .createToken({
        username: 'admin',
        password: 'senha-invalida',
      })
      .then((response: Cypress.Response<AuthTokenResponse>) => {
        expect(response.status).to.eq(200);
        expect(response.body.reason).to.eq('Bad credentials');
        expect(response.body).not.to.have.property('token');
      });
  });
});
