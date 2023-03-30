import React from 'react';
import { mount } from 'cypress/react18';
import axios from 'axios';
import CreateTrip from './CreateTrip';

describe('CreateTrip Component', () => {
    beforeEach(() => {
        mount(<CreateTrip />);
    });

    it('renders the form elements', () => {
        cy.get('form').should('exist');
        cy.get('input[type="text"]').should('have.length', 3);
        cy.get('input[type="date"]').should('exist');
        cy.get('input[type="number"]').should('have.length', 2);
        cy.get('button[type="submit"]').should('exist');
    });

    it('handles form submission', () => {
        cy.intercept('POST', '/api/trips', { fixture: 'trip_created.json' }).as('createTrip');
        cy.get('input[type="text"]').eq(0).type('StartCity');
        cy.get('input[type="text"]').eq(1).type('DestinationCity');
        cy.get('input[type="date"]').type('2023-04-15');
        cy.get('input[type="number"]').eq(0).type('2');
        cy.get('input[type="number"]').eq(1).type('100');
        cy.get('input[type="text"]').eq(2).type('Contact Info');
        cy.get('button[type="submit"]').click();

        cy.wait('@createTrip').then(({ request, response }) => {
            expect(request.body).to.deep.equal({
                start: 'StartCity',
                destination: 'DestinationCity',
                date: '2023-04-15',
                seat_count: '12',
                price: '0100',
                contact_info: 'Contact Info',
            });
            expect(response.statusCode).to.equal(200);
        });

        cy.on('window:alert', (message) => {
            expect(message).to.equal('Trip created successfully');
        });
    });
});