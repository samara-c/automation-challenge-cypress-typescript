
export interface BookingDates {
    checkin: string;
    checkout: string;
}

export interface BookingPayload {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDates;
    additionalneeds?: string;
}

export interface CreateBookingResponse {
    bookingid: number;
    booking: BookingPayload;
}

export class BookingApi {
    private readonly baseUrl: string = Cypress.expose('apiUrl') as string;

    createBooking(
        booking: BookingPayload
    ): Cypress.Chainable<Cypress.Response<CreateBookingResponse>> {
        return cy.request<CreateBookingResponse>({
            method: 'POST',
            url: `${this.baseUrl}/booking`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: booking,
            failOnStatusCode: false,
        });
    }

    getBooking(
        bookingId: number
    ): Cypress.Chainable<Cypress.Response<BookingPayload>> {
        return cy.request<BookingPayload>({
            method: 'GET',
            url: `${this.baseUrl}/booking/${bookingId}`,
            headers: {
                Accept: 'application/json',
            },
            failOnStatusCode: false,
        });
    }

    updateBooking(
        bookingId: number,
        booking: BookingPayload,
        token?: string
    ): Cypress.Chainable<Cypress.Response<string>> {
        return cy.request<string>({
            method: 'PUT',
            url: `${this.baseUrl}/booking/${bookingId}`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...(token ? { Cookie: `token=${token}` } : {}),
            },
            body: booking,
            failOnStatusCode: false,
        });
    }

    deleteBooking(
        bookingId: number,
        token?: string
    ): Cypress.Chainable<Cypress.Response<string>> {
        return cy.request<string>({
            method: 'DELETE',
            url: `${this.baseUrl}/booking/${bookingId}`,
            headers: token
                ? { Cookie: `token=${token}` }
                : {},
            failOnStatusCode: false,
        });
    }
}
