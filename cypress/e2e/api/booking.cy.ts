
import { AuthApi } from '../../api/AuthApi';
import {
  BookingApi,
  type BookingPayload,
} from '../../api/BookingApi';

describe('API - Ciclo de vida de reserva', () => {
  const authApi = new AuthApi();
  const bookingApi = new BookingApi();

  it('deve criar, consultar, atualizar e excluir uma reserva', () => {
    const timestamp = Date.now();

    const booking: BookingPayload = {
      firstname: 'QA',
      lastname: `Teste${timestamp}`,
      totalprice: 250,
      depositpaid: true,
      bookingdates: {
        checkin: '2030-10-01',
        checkout: '2030-10-05',
      },
      additionalneeds: 'Breakfast',
    };

    const updatedBooking: BookingPayload = {
      ...booking,
      firstname: 'Reserva',
      totalprice: 300,
      additionalneeds: 'Breakfast and dinner',
    };

    let token = '';
    let bookingId = 0;

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

        return bookingApi.createBooking(booking);
      })
      .then((createResponse) => {
        expect(createResponse.status).to.eq(200);

        expect(createResponse.body.bookingid)
          .to.be.a('number');

        bookingId = createResponse.body.bookingid;

        expect(createResponse.body.booking.firstname)
          .to.eq(booking.firstname);

        expect(createResponse.body.booking.lastname)
          .to.eq(booking.lastname);

        expect(createResponse.body.booking.totalprice)
          .to.eq(booking.totalprice);

        return bookingApi.getBooking(bookingId);
      })
      .then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body.firstname)
          .to.eq(booking.firstname);
        expect(getResponse.body.lastname)
          .to.eq(booking.lastname);

        return bookingApi.updateBooking(
          bookingId,
          updatedBooking,
          token
        );
      })
      .then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);

        return bookingApi.getBooking(bookingId);
      })
      .then((updatedResponse) => {
        expect(updatedResponse.status).to.eq(200);
        expect(updatedResponse.body.firstname)
          .to.eq(updatedBooking.firstname);
        expect(updatedResponse.body.totalprice)
          .to.eq(updatedBooking.totalprice);
        expect(updatedResponse.body.additionalneeds)
          .to.eq(updatedBooking.additionalneeds);

        return bookingApi.deleteBooking(bookingId, token);
      })
      .then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(201);

        return bookingApi.getBooking(bookingId);
      })
      .then((deletedResponse) => {
        expect(deletedResponse.status).to.eq(404);
      });
  });
});
