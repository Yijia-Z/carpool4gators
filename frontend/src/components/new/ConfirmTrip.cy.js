import React from 'react';
import { mount } from 'cypress/react18';
import axios from 'axios';
import ConfirmTrip from './ConfirmTrip';

describe('ConfirmTrip Component', () => {
    const tripId = 1;

    beforeEach(() => {
        mount(<ConfirmTrip tripId={tripId} />);
    });

    it('renders the form elements', () => {
        cy.get('form').should('exist');
        cy.get('select[name="rating"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    it('handles form submission', () => {
        cy.intercept('POST', `/api/trips/${tripId}/confirm`, { fixture: 'trip_confirmed.json' }).as('confirmTrip');
        cy.get('select[name="rating"]').select('4');
        cy.get('button[type="submit"]').click();

        cy.wait('@confirmTrip').then(({ request, response }) => {
            expect(request.body).to.deep.equal({
                rating: 4,
            });
            expect(response.statusCode).to.equal(200);
        });

        cy.on('window:alert', (message) => {
            expect(message).to.equal('Trip confirmed and driver rated successfully');
        });
    });
});