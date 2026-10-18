
import { AuthApi } from '../../api/AuthApi';
import {
  BookingApi,
  type BookingPayload,
} from '../../api/BookingApi';

describe('API - Cenários negativos de reservas', () => {
  const authApi = new AuthApi();
  const bookingApi = new BookingApi();

  it('deve retornar 404 ao consultar uma reserva inexistente', () => {
    return bookingApi.getBooking(0).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  describe('Operações sem autenticação', () => {
    let token = '';
    let bookingId: number | undefined;
    let bookingData: BookingPayload;

    beforeEach(() => {
      bookingId = undefined;

      bookingData = {
        firstname: 'QA',
        lastname: `Negativo${Date.now()}`,
        totalprice: 150,
        depositpaid: false,
        bookingdates: {
          checkin: '2030-11-01',
          checkout: '2030-11-05',
        },
        additionalneeds: 'Breakfast',
      };

      return authApi
        .createToken({
          username: 'admin',
          password: 'password123',
        })
        .then((authResponse) => {
          expect(authResponse.status).to.eq(200);
          expect(authResponse.body.token)
            .to.be.a('string')
            .and.not.be.empty;

          token = authResponse.body.token as string;

          return bookingApi.createBooking(bookingData);
        })
        .then((createResponse) => {
          expect(createResponse.status).to.eq(200);
          bookingId = createResponse.body.bookingid;
        });
    });

    afterEach(() => {
      if (bookingId !== undefined) {
        return bookingApi
          .deleteBooking(bookingId, token)
          .then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(201);
          });
      }
    });

    it('deve impedir a atualização de uma reserva sem token', () => {
      expect(bookingId).to.be.a('number');

      return bookingApi
        .updateBooking(
          bookingId as number,
          {
            ...bookingData,
            firstname: 'Alteracao nao autorizada',
          },
          undefined
        )
        .then((response) => {
          expect(response.status).to.eq(403);
        });
    });

    it('deve impedir a exclusão de uma reserva sem token', () => {
      expect(bookingId).to.be.a('number');

      return bookingApi
        .deleteBooking(bookingId as number, undefined)
        .then((response) => {
          expect(response.status).to.eq(403);
        });
    });
  });
});
